#!/usr/bin/env node
/* =====================================================================
   build-lessons.mjs

   Turns authored lesson drafts (JSON) into the runtime lesson modules in
   src/content/. Authoring and rendering are deliberately decoupled: drafts
   describe a lesson in plain data, this script reconciles that data with
   what each module component actually reads, then validates hard.

   Run:  node scripts/build-lessons.mjs <draftDir>
   ===================================================================== */

import fs from "node:fs";
import path from "node:path";

const draftDir = process.argv[2] || "/tmp/q3out";
const outDir = path.resolve("src/content");

/* Glyph names Icon.jsx can actually render. Keep in sync with ICON_NAMES. */
const ICONS = new Set([
  "cloud","sun","moon","star","anchor","flame","fire","book","heart","shield",
  "key","door","seed","leaf","mountain","path","eye","hand","crown","gift",
  "scroll","cup","bread","water","cross","people","voice","clock","map",
  "compass","feather","wave","rock","release","footstep","sunrise",
  "handshake","chat","users","sparkles","spark",
]);

const TAG_NS = {
  react: ["withdraw","apathy","pride","control","doubt","fear"],
  theme: ["faith","relationship","self","word","humility","prayer","grace",
          "hope","sin","service","unity","cross","love","resurrection",
          "mission","generosity","truth"],
  posture: ["avoidant","seeking","clinging","proud","surrendering","humble"],
  tone: ["tender","raw","resolute"],
};

const problems = [];
const notes = [];
const fail = (id, m) => problems.push(`[${id}] ${m}`);
const note = (id, m) => notes.push(`[${id}] ${m}`);

/* ---- dash purge -----------------------------------------------------
   Em and en dashes are banned in visible copy. Rather than reject a draft
   over punctuation, rewrite it: a dash pair acting as parenthesis becomes
   commas, a lone dash becomes a colon or a period depending on position. */
function dedash(s) {
  if (typeof s !== "string" || !/[—–]/.test(s)) return s;
  return s
    // « text » — Ref   →   « text » (Ref)
    .replace(/\s*[—–]\s*\(?([\wÁÉÍÓÚÑáéíóúñ.\s]+\d+:\s*\d+[-,\d\s]*)\)?\s*$/u, " ($1)")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/,\s*,/g, ",")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function walk(node, fn) {
  if (typeof node === "string") return fn(node);
  if (Array.isArray(node)) return node.map((v) => walk(v, fn));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = walk(v, fn);
    return out;
  }
  return node;
}

/* ---- module normalisation -------------------------------------------
   Drafts were authored against a simplified spec; the components read a
   slightly different shape. Reconcile here so either form works. */
function normalizeModule(m, lesson, id) {
  const mod = { ...m };

  if (mod.type === "anchorChain") {
    if (!mod.chain && Array.isArray(mod.links)) {
      mod.chain = mod.links.map((l) => ({ word: l.word ?? l.t, line: l.line ?? l.fb }));
      note(id, "anchorChain: links -> chain");
    }
    delete mod.links;
    if (!mod.climax) mod.climax = "La cadena está completa.";
    if (mod.allowCustom && !mod.allowCustom.extraKey) {
      mod.allowCustom.extraKey = `${id}Propio`;
    }
  }

  if (mod.type === "stairs") {
    if (!mod.climbPrompt) {
      mod.climbPrompt =
        mod.steps?.[0]?.t || mod.prompt || "Sube, escalón por escalón.";
      note(id, "stairs: synthesised climbPrompt");
    }
    if (!mod.climbHint) {
      mod.climbHint = mod.hint || "Mantén presionado para subir.";
    }
    if (!mod.promisePrompt) mod.promisePrompt = mod.prompt || "¿Qué le prometes hoy?";
    if (!mod.promiseOptions) {
      const src = mod.options || [];
      mod.promiseOptions = src.map((o) =>
        typeof o === "string" ? { t: o, w: "" } : { t: o.t ?? String(o), w: o.w ?? "" }
      );
      note(id, "stairs: options -> promiseOptions");
    }
    mod.promiseOptions = mod.promiseOptions.map((o) => ({ t: o.t, w: o.w ?? "" }));
    if (!mod.promiseExtraKey) {
      mod.promiseExtraKey = mod.allowCustom2?.extraKey || `${id}Promesa`;
    }
    if (!mod.verse) {
      mod.verse = { text: lesson.verseText, ref: lesson.verseRef };
      note(id, "stairs: fell back to lesson verse");
    }
    // the leave-phase custom input needs a key to store under
    if (mod.allowCustom && !mod.allowCustom.extraKey) {
      mod.allowCustom.extraKey = mod.allowCustom2?.extraKey || `${id}Dejado`;
    }
    delete mod.steps;
    delete mod.allowCustom2;
    delete mod.options;
  }

  if (mod.type === "pickReveal" || mod.type === "choiceInsight") {
    if (mod.allowCustom && !mod.allowCustom.extraKey) {
      mod.allowCustom.extraKey = `${id}Propio`;
    }
  }

  if (mod.type === "perspectiveFlip") {
    if (mod.commit && !mod.commit.extraKey) mod.commit.extraKey = `${id}Aliento`;
  }

  if (mod.type === "skillThenCommit") {
    if (mod.commit && !mod.commit.extraKey) mod.commit.extraKey = `${id}Paso`;
  }

  return mod;
}

/* ---- validation ------------------------------------------------------ */
function validate(d, id) {
  const need = ["number","slug","title","subtitle","kitName","artifactNoun","motif",
                "stages","stageLabels","verseRef","verseText","promise","ui","slots",
                "stations","encourage","discussion","facilitator","patternTemplate",
                "outOracion","outAliento","outAccion24","outPregunta","outTarjeta"];
  need.forEach((k) => { if (d[k] === undefined) fail(id, `missing field: ${k}`); });

  if (d.slots?.length !== 8) fail(id, `expected 8 slots, got ${d.slots?.length}`);
  if (d.stations?.length !== 8) fail(id, `expected 8 stations, got ${d.stations?.length}`);
  if (d.stages?.length !== 5) fail(id, `expected 5 stages, got ${d.stages?.length}`);
  if (d.stageLabels?.length !== 5) fail(id, `expected 5 stageLabels`);

  const slotIds = (d.slots || []).map((s) => s.id);
  (d.stations || []).forEach((st, i) => {
    if (st.id !== slotIds[i]) fail(id, `station[${i}].id "${st.id}" != slot[${i}].id "${slotIds[i]}"`);
    if (!st.module?.type) fail(id, `station ${st.id} has no module type`);
    if (!/\{name\}/.test(st.cue || "")) fail(id, `station ${st.id} cue is missing {name}`);
  });

  (d.slots || []).forEach((s) => {
    if (!ICONS.has(s.icon)) fail(id, `slot ${s.id} uses unknown icon "${s.icon}"`);
  });

  // every {slot:x} must resolve to a real slot or a captured extra key
  const extras = new Set();
  JSON.stringify(d).replace(/"(?:person|step|promise)?[eE]xtraKey":"([^"]+)"/g,
    (_m, k) => { extras.add(k); return _m; });
  const known = new Set([...slotIds, ...extras]);
  ["patternTemplate","outOracion","outAliento","outAccion24","outPregunta","outTarjeta"]
    .forEach((f) => {
      const v = d[f] || "";
      for (const m of v.matchAll(/\{slot:([a-zA-Z0-9_]+)/g)) {
        if (!known.has(m[1])) fail(id, `${f} references unknown slot "${m[1]}"`);
      }
    });

  // tag vocabulary
  (d.stations || []).forEach((st) => {
    (st.module?.options || []).forEach((o) => {
      (o.tags || []).forEach((t) => {
        const [ns, val] = String(t).split(":");
        if (!TAG_NS[ns] || !TAG_NS[ns].includes(val)) fail(id, `bad tag "${t}" on ${st.id}`);
      });
      if (st.module.type === "choiceInsight" && !(o.tags || []).length) {
        fail(id, `choiceInsight option "${o.id}" on ${st.id} has no tags`);
      }
    });
  });

  const types = new Set((d.stations || []).map((s) => s.module?.type));
  if (types.size < 4) fail(id, `only ${types.size} distinct module types (need 4+)`);
  const last = d.stations?.[7]?.module?.type;
  if (last !== "commitDuo") note(id, `last station is ${last}, not commitDuo`);

  const dashes = (JSON.stringify(d).match(/[—–]/g) || []).length;
  if (dashes) fail(id, `${dashes} em/en dashes survived the purge`);
}

/* ---- build ----------------------------------------------------------- */
let built = 0;
for (let n = 1; n <= 13; n++) {
  const src = path.join(draftDir, `l${n}.json`);
  if (!fs.existsSync(src)) { fail(`l${n}`, "draft file missing"); continue; }

  let d;
  try {
    d = JSON.parse(fs.readFileSync(src, "utf8"));
  } catch (e) {
    fail(`l${n}`, `draft does not parse: ${e.message}`);
    continue;
  }

  const id = `l${n}`;
  d = walk(d, dedash);
  d.stations = (d.stations || []).map((st) => ({
    ...st,
    module: normalizeModule(st.module || {}, d, st.id),
  }));

  validate(d, id);

  const body = JSON.stringify(d, null, 2);
  const out = `import { makeLesson } from "../engine/makeLesson.js";

/* Lección ${n} · Q3 2026 · 1 y 2 Corintios
   Authored from the official quarterly, then adapted for this engine.
   Generated by scripts/build-lessons.mjs. Edit the draft, not this file. */
export default makeLesson(
${body}
);
`;
  fs.writeFileSync(path.join(outDir, `l${n}.js`), out);
  built++;
}

console.log(`built ${built}/13 lesson modules -> ${outDir}`);
if (notes.length) {
  console.log(`\nnormalised (${notes.length}):`);
  notes.forEach((n) => console.log("  " + n));
}
if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`);
  problems.forEach((p) => console.log("  x " + p));
  process.exit(1);
}
console.log("\nall drafts valid.");
