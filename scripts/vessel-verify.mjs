#!/usr/bin/env node
/* =====================================================================
   vessel-verify.mjs

   Renders the real CrackedVessel component in Chromium and WebKit and
   reports structural differences. Screenshots go to design-references/.

   The vessel leans on SVG features whose engine support historically
   differs: nested masks, feTurbulence, mask-on-group, clip-then-filter
   ordering, and CSS custom properties driving keyframe opacity. Those are
   exactly what this checks.

   Run:  node scripts/vessel-verify.mjs
   Needs the dev server on :5173.
   ===================================================================== */

import { chromium, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("design-references/vessel");
fs.mkdirSync(OUT, { recursive: true });

const URL_LAB = "http://localhost:5173/?lab=barro";
const ENGINES = [
  { name: "chromium", launch: chromium },
  { name: "webkit", launch: webkit },
];

/* Structural probe run inside each engine. Returns numbers we can diff
   rather than relying on eyeballing two screenshots. */
const PROBE = () => {
  const host = document.querySelector('[data-reveal="1"]') || document;
  const svg = host.querySelector("svg.vessel");
  if (!svg) return { error: "no vessel" };
  const q = (sel) => svg.querySelector(sel);
  const box = (el) => {
    try {
      const b = el.getBBox();
      return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1));
    } catch { return null; }
  };
  const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  const dupes = ids.length - new Set(ids).size;

  return {
    vessels: document.querySelectorAll("svg.vessel").length,
    duplicateIds: dupes,
    // does the crack mask exist and hold the expected number of holes?
    maskPaths: svg.querySelectorAll('mask[id*="-crack"] path').length,
    hairlines: q('[id*="g-hairlines"]')?.children.length ?? -1,
    contactShadows: q('[id*="g-fracture-shadows"]')?.children.length ?? -1,
    shadowsNested: !!q('[id*="g-body"] [id*="g-fracture-shadows"]'),
    grainFilter: !!q('filter[id*="grain"]'),
    // geometry: if masks/filters silently fail the painted bbox changes
    bodyBox: box(q('[id*="g-body"]')),
    bloomBox: box(q('[id*="g-bloom"]')),
    rimBox: box(q('[id*="g-rim"]')),
    fireAnim: (() => {
      const f = q(".vessel-fire");
      if (!f) return null;
      const cs = getComputedStyle(f);
      return { name: cs.animationName, state: cs.animationPlayState, dur: cs.animationDuration };
    })(),
    // does the custom property actually reach the keyframe?
    fireVar: (() => {
      const f = q(".vessel-fire");
      return f ? getComputedStyle(f).getPropertyValue("--fire").trim() : null;
    })(),
    a11y: {
      role: svg.getAttribute("role"),
      labelledby: !!svg.getAttribute("aria-labelledby"),
      hasTitle: !!svg.querySelector("title"),
      hasDesc: !!svg.querySelector("desc"),
    },
  };
};

const results = {};

for (const eng of ENGINES) {
  const browser = await eng.launch.launch();
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 120)));
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + String(e).slice(0, 120)));

  await page.goto(URL_LAB, { waitUntil: "networkidle" });
  await page.waitForSelector("svg.vessel");
  await page.waitForTimeout(1600); // let the reveal tween settle

  results[eng.name] = await page.evaluate(PROBE);
  results[eng.name].consoleErrors = consoleErrors;

  // full lab
  await page.screenshot({ path: path.join(OUT, `lab-${eng.name}.png`), fullPage: true });

  // the completed vessel, isolated and identically framed
  const complete = page.locator('[data-reveal="1"]').first();
  await complete.screenshot({ path: path.join(OUT, `complete-${eng.name}.png`) });

  // reduced motion
  await ctx.close();
  const ctxRM = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const pageRM = await ctxRM.newPage();
  await pageRM.goto(URL_LAB, { waitUntil: "networkidle" });
  await pageRM.waitForSelector("svg.vessel");
  await pageRM.waitForTimeout(900);
  results[eng.name].reducedMotion = await pageRM.evaluate(() => {
    const f = document.querySelector(".vessel-fire");
    const cs = getComputedStyle(f);
    // the global rule collapses duration; confirm it applied
    return { animDuration: cs.animationDuration, transDuration: cs.transitionDuration };
  });
  await pageRM.screenshot({ path: path.join(OUT, `reduced-${eng.name}.png`), fullPage: true });
  await ctxRM.close();

  await browser.close();
  console.log(`captured ${eng.name}`);
}

/* diff the two structural probes */
const diffs = [];
const a = results.chromium;
const b = results.webkit;
const walk = (pa, pb, keyPath = "") => {
  for (const k of new Set([...Object.keys(pa || {}), ...Object.keys(pb || {})])) {
    const kp = keyPath ? `${keyPath}.${k}` : k;
    const va = pa?.[k];
    const vb = pb?.[k];
    if (va && vb && typeof va === "object" && !Array.isArray(va)) { walk(va, vb, kp); continue; }
    if (JSON.stringify(va) !== JSON.stringify(vb)) diffs.push({ key: kp, chromium: va, webkit: vb });
  }
};
walk(a, b);

console.log("\n=== CHROMIUM ===");
console.log(JSON.stringify(a, null, 2));
console.log("\n=== WEBKIT ===");
console.log(JSON.stringify(b, null, 2));
console.log("\n=== DIFFERENCES ===");
console.log(diffs.length ? JSON.stringify(diffs, null, 2) : "none");

fs.writeFileSync(path.join(OUT, "verify.json"), JSON.stringify({ results, diffs }, null, 2));
console.log(`\nartifacts -> ${OUT}`);
