#!/usr/bin/env node
/* =====================================================================
   motif-verify.mjs

   Cross-engine probe for the WHOLE motif family, Chromium vs WebKit.

   The vessel had its own script because it leans on masks and feTurbulence.
   The other motifs lean on different things, and these are the ones with a
   real history of engine divergence:

     transform-box: view-box    used by cruz and the vessel to rotate/scale
                                around a point in user space
     filter: brightness()       a CSS filter applied to SVG nodes (mosaico)
     nested clipPath + gradient carta, alba, retrato
     CSS keyframe classes       .star .ember .halo .tessera .sway driving
                                SVG children
     color-mix() in fills       mosaico tile tone

   Renders every motif at every stage in both engines, diffs a structural
   probe, and pixel-diffs the stage-4 frame.

   Run: node scripts/motif-verify.mjs      (needs the dev server on :5173)
   ===================================================================== */

import { chromium, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("design-references/motifs");
fs.mkdirSync(OUT, { recursive: true });

const MOTIFS = ["mosaico", "cruz", "barro", "carta", "alba", "retrato", "siembra", "muro"];
const ENGINES = [
  { name: "chromium", launch: chromium },
  { name: "webkit", launch: webkit },
];

/* Runs inside the page for one motif's lab row. Returns numbers, not
   impressions, so the two engines can be diffed mechanically. */
const PROBE = () => {
  const figs = [...document.querySelectorAll("section figure")];
  const round = (n) => Math.round(n * 10) / 10;
  const boxOf = (el) => {
    try {
      const b = el.getBBox();
      return [round(b.x), round(b.y), round(b.width), round(b.height)];
    } catch { return null; }
  };
  const stages = figs.slice(0, 5).map((f, i) => {
    const svg = f.querySelector("svg");
    if (!svg) return { stage: i, error: "no svg" };
    const painted = [...svg.querySelectorAll("path,rect,circle,ellipse,line,g")];
    // an element whose transform silently failed shows up as a bbox shift
    const transformed = painted
      .filter((e) => e.style && e.style.transform)
      .map((e) => {
        const cs = getComputedStyle(e);
        return { tb: cs.transformBox, tf: cs.transform.slice(0, 42) };
      });
    return {
      stage: i,
      nodes: painted.length,
      root: boxOf(svg),
      defs: svg.querySelectorAll("defs > *").length,
      gradients: svg.querySelectorAll("linearGradient,radialGradient").length,
      clips: svg.querySelectorAll("clipPath").length,
      masks: svg.querySelectorAll("mask").length,
      filters: svg.querySelectorAll("filter").length,
      // CSS filters applied to SVG children (mosaico tile brightness)
      cssFiltered: painted.filter((e) => e.style?.filter).length,
      transformedCount: transformed.length,
      transformBoxes: [...new Set(transformed.map((t) => t.tb))].sort(),
      // are the keyframe classes actually resolving to running animations?
      anims: [...new Set(
        painted
          .map((e) => getComputedStyle(e).animationName)
          .filter((n) => n && n !== "none")
      )].sort(),
    };
  });
  const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  return { stages, duplicateIds: ids.length - new Set(ids).size };
};

const results = {};
for (const eng of ENGINES) {
  const browser = await eng.launch.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1250, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
  page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 120)));

  results[eng.name] = { consoleErrors: errors, motifs: {} };

  for (const m of MOTIFS) {
    await page.goto(`http://localhost:5173/?lab=${m}`, { waitUntil: "networkidle" });
    await page.waitForSelector("section figure svg");
    await page.waitForTimeout(1500); // let tweens and transitions settle
    results[eng.name].motifs[m] = await page.evaluate(PROBE);
    const row = page.locator("section").first();
    await row.screenshot({ path: path.join(OUT, `${m}-${eng.name}.png`) });
  }
  await ctx.close();
  await browser.close();
  console.log(`captured ${eng.name}`);
}

/* structural diff */
const diffs = [];
for (const m of MOTIFS) {
  const a = results.chromium.motifs[m];
  const b = results.webkit.motifs[m];
  if (a.duplicateIds !== b.duplicateIds) {
    diffs.push({ motif: m, key: "duplicateIds", chromium: a.duplicateIds, webkit: b.duplicateIds });
  }
  a.stages.forEach((sa, i) => {
    const sb = b.stages[i];
    for (const k of Object.keys(sa)) {
      if (k === "stage") continue;
      if (JSON.stringify(sa[k]) !== JSON.stringify(sb[k])) {
        diffs.push({ motif: m, stage: i, key: k, chromium: sa[k], webkit: sb[k] });
      }
    }
  });
}

const dupTotals = {
  chromium: Object.values(results.chromium.motifs).reduce((n, x) => n + x.duplicateIds, 0),
  webkit: Object.values(results.webkit.motifs).reduce((n, x) => n + x.duplicateIds, 0),
};

console.log("\n=== console errors ===");
console.log("chromium:", results.chromium.consoleErrors.length, "| webkit:", results.webkit.consoleErrors.length);
if (results.chromium.consoleErrors.length) console.log(results.chromium.consoleErrors);
if (results.webkit.consoleErrors.length) console.log(results.webkit.consoleErrors);

console.log("\n=== duplicate ids (all motifs) ===");
console.log(dupTotals);

console.log("\n=== transform-box values seen, per motif (stage 4) ===");
for (const m of MOTIFS) {
  const a = results.chromium.motifs[m].stages[4];
  const b = results.webkit.motifs[m].stages[4];
  console.log(`  ${m.padEnd(9)} chromium ${JSON.stringify(a.transformBoxes)}  webkit ${JSON.stringify(b.transformBoxes)}`);
}

console.log("\n=== animations resolving, per motif (stage 4) ===");
for (const m of MOTIFS) {
  const a = results.chromium.motifs[m].stages[4].anims;
  const b = results.webkit.motifs[m].stages[4].anims;
  console.log(`  ${m.padEnd(9)} chromium ${JSON.stringify(a)}  webkit ${JSON.stringify(b)}`);
}

console.log("\n=== STRUCTURAL DIFFERENCES ===");
console.log(diffs.length ? JSON.stringify(diffs, null, 2) : "none");

fs.writeFileSync(path.join(OUT, "motif-verify.json"),
  JSON.stringify({ results, diffs, dupTotals }, null, 2));
console.log(`\nartifacts -> ${OUT}`);
