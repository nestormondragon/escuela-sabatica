#!/usr/bin/env node
/* =====================================================================
   vessel-compare.mjs

   Captures the vessel at three points in its history under IDENTICAL
   conditions (same viewport, background, app state, scale, DPR), so the
   comparison is meaningful rather than three differently-framed pictures.

   Each version is rendered from a real git worktree running its own vite
   server, so what is captured is the actual production component of that
   commit, not a recreation.

     original  217efa4  the vessel that prompted the redesign
     v1        79c5eab  first rebuild (tagged vessel-v1)
     v2        HEAD     after the review corrections

   Run:  node scripts/vessel-compare.mjs
   ===================================================================== */

import { chromium } from "playwright";
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("design-references/vessel");
fs.mkdirSync(OUT, { recursive: true });
const REPO = process.cwd();
const NODE_BIN = "/tmp/node-v20.18.1-darwin-arm64/bin";

const VERSIONS = [
  { key: "original", ref: "217efa4", port: 5191 },
  { key: "v1", ref: "79c5eab", port: 5192 },
  { key: "v2", ref: "HEAD", port: 5193 },
];

// identical capture conditions for every version
const VIEWPORT = { width: 430, height: 860 };
const DSF = 2;

// seed the same lesson + progress in every version
const SEED = () => {
  localStorage.clear();
  localStorage.setItem("escuela:settings", JSON.stringify({
    v: 1, mode: "night", maestro: false, lessonOverride: "l4",
  }));
  localStorage.setItem("escuela:kit:l4", JSON.stringify({
    v: 1, started: true, userName: "Néstor",
    slots: {
      influencia: "Las pantallas de la madrugada",
      tolerancia: "Mirar para otro lado",
      restauracion: "Buscar restaurar",
      pleito: "Ceder antes que ganar",
      pertenencia: "No soy mío",
    },
    slotTags: {}, extra: {}, surpriseIdx: 5,
  }));
};

// framer's entrance freezes in a headless tab; neutralise via stylesheet only
const UNFREEZE = () => {
  const s = document.createElement("style");
  s.textContent = ".view{opacity:1 !important;transform:none !important}";
  document.head.appendChild(s);
};

const servers = [];
function serve(dir, port) {
  const p = spawn(`${NODE_BIN}/node`,
    ["node_modules/vite/bin/vite.js", "--port", String(port), "--strictPort"],
    { cwd: dir, stdio: "ignore", env: { ...process.env, PATH: `${NODE_BIN}:${process.env.PATH}` } });
  servers.push(p);
  return p;
}

const wt = path.join("/tmp", "vessel-wt");
fs.rmSync(wt, { recursive: true, force: true });

try {
  for (const v of VERSIONS) {
    if (v.ref === "HEAD") { v.dir = REPO; continue; }
    const dir = path.join(wt, v.key);
    execSync(`git worktree add -f --detach "${dir}" ${v.ref}`, { stdio: "ignore" });
    // share the installed dependencies rather than reinstalling per worktree
    fs.symlinkSync(path.join(REPO, "node_modules"), path.join(dir, "node_modules"));
    v.dir = dir;
  }

  for (const v of VERSIONS) serve(v.dir, v.port);
  await new Promise((r) => setTimeout(r, 6000));

  const browser = await chromium.launch();
  for (const v of VERSIONS) {
    const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: DSF });
    const page = await ctx.newPage();
    const url = `http://localhost:${v.port}/`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(SEED);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    await page.evaluate(UNFREEZE);
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(OUT, `app-${v.key}.png`) });
    const cp = page.locator(".cp").first();
    if (await cp.count()) {
      await cp.screenshot({ path: path.join(OUT, `motif-${v.key}.png`) });
    }
    console.log(`captured ${v.key} (${v.ref})`);
    await ctx.close();
  }
  await browser.close();
} finally {
  servers.forEach((p) => { try { p.kill(); } catch {} });
  for (const v of VERSIONS) {
    if (v.ref === "HEAD" || !v.dir) continue;
    try { execSync(`git worktree remove -f "${v.dir}"`, { stdio: "ignore" }); } catch {}
  }
  fs.rmSync(wt, { recursive: true, force: true });
}
console.log(`\nartifacts -> ${OUT}`);
