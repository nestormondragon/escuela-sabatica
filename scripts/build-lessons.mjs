#!/usr/bin/env node
/* =====================================================================
   build-lessons.mjs

   Turns authored lesson drafts (JSON) into the runtime lesson modules in
   src/content/. Authoring and rendering are deliberately decoupled: drafts
   describe a lesson in plain data, this script reconciles that data with
   what each module component actually reads, then validates hard.

   Run:  node scripts/build-lessons.mjs [draftDir]

   The base draft directory is Spanish. A sibling `en/` directory contains
   the English edition. Both editions keep the same lesson ids, route slugs,
   station ids, slot ids, and option ids so saved journey data remains
   language-neutral.
   ===================================================================== */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const allowPartial = args.includes("--allow-partial");
const draftArg = args.find((arg) => !arg.startsWith("--"));
const draftDir = path.resolve(draftArg || "drafts/q3-2026");
const outDir = path.resolve("src/content");
const LOCALES = [
  { id: "es", draftDir, outDir },
  { id: "en", draftDir: path.join(draftDir, "en"), outDir: path.join(outDir, "en") },
];
const FOR_DATES = [
  "2026-07-04", "2026-07-11", "2026-07-18", "2026-07-25",
  "2026-08-01", "2026-08-08", "2026-08-15", "2026-08-22",
  "2026-08-29", "2026-09-05", "2026-09-12", "2026-09-19",
  "2026-09-26",
];

function minusDays(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d - n);
  const pad = (value) => String(value).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
}

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
const NORMALIZE_COPY = {
  es: {
    chainComplete: "La cadena está completa.",
    climbPrompt: "Sube, escalón por escalón.",
    climbHint: "Mantén presionado para subir.",
    promisePrompt: "¿Qué le prometes hoy?",
  },
  en: {
    chainComplete: "The chain is complete.",
    climbPrompt: "Climb one step at a time.",
    climbHint: "Press and hold to climb.",
    promisePrompt: "What will you promise God today?",
  },
};

function normalizeModule(m, lesson, id, locale) {
  const mod = { ...m };
  const copy = NORMALIZE_COPY[locale] || NORMALIZE_COPY.es;

  if (mod.type === "anchorChain") {
    if (!mod.chain && Array.isArray(mod.links)) {
      mod.chain = mod.links.map((l) => ({ word: l.word ?? l.t, line: l.line ?? l.fb }));
      note(id, "anchorChain: links -> chain");
    }
    delete mod.links;
    if (!mod.climax) mod.climax = copy.chainComplete;
    if (mod.allowCustom && !mod.allowCustom.extraKey) {
      mod.allowCustom.extraKey = `${id}Propio`;
    }
  }

  if (mod.type === "stairs") {
    if (!mod.climbPrompt) {
      mod.climbPrompt =
        mod.steps?.[0]?.t || mod.prompt || copy.climbPrompt;
      note(id, "stairs: synthesised climbPrompt");
    }
    if (!mod.climbHint) {
      mod.climbHint = mod.hint || copy.climbHint;
    }
    if (!mod.promisePrompt) mod.promisePrompt = mod.prompt || copy.promisePrompt;
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

/* ---- bilingual parity -------------------------------------------------
   Translated drafts may change authored prose, but never the identifiers
   that connect a saved journey to its station/module. The object topology
   must also stay aligned so a feature does not silently disappear in one
   language. */
const STABLE_KEYS = new Set([
  "number", "slug", "motif", "id", "n", "icon", "type", "stationId",
  "extraKey", "personExtraKey", "stepExtraKey", "promiseExtraKey", "a",
  "privacy",
]);

function compareParity(source, translated, id, trace = []) {
  const here = trace.join(".") || "(root)";
  if (Array.isArray(source)) {
    if (!Array.isArray(translated)) {
      fail(id, `locale parity: ${here} changed from array`);
      return;
    }
    if (source.length !== translated.length) {
      fail(id, `locale parity: ${here} length ${translated.length}, expected ${source.length}`);
      return;
    }
    source.forEach((value, index) =>
      compareParity(value, translated[index], id, [...trace, String(index)])
    );
    return;
  }
  if (source && typeof source === "object") {
    if (!translated || typeof translated !== "object" || Array.isArray(translated)) {
      fail(id, `locale parity: ${here} changed from object`);
      return;
    }
    const sourceKeys = Object.keys(source).sort();
    const translatedKeys = Object.keys(translated).sort();
    if (sourceKeys.join("\0") !== translatedKeys.join("\0")) {
      const missing = sourceKeys.filter((key) => !translatedKeys.includes(key));
      const added = translatedKeys.filter((key) => !sourceKeys.includes(key));
      fail(
        id,
        `locale parity: ${here} keys differ` +
          `${missing.length ? `; missing ${missing.join(", ")}` : ""}` +
          `${added.length ? `; added ${added.join(", ")}` : ""}`
      );
      return;
    }
    sourceKeys.forEach((key) =>
      compareParity(source[key], translated[key], id, [...trace, key])
    );
    return;
  }

  const key = trace.at(-1);
  const parentKey = trace.at(-2);
  const stableArray = parentKey === "stages" || parentKey === "tags";
  if ((STABLE_KEYS.has(key) || stableArray) && source !== translated) {
    fail(id, `locale parity: ${here} changed stable value "${source}" -> "${translated}"`);
  }
}

function parseDraft(src, id) {
  try {
    return JSON.parse(fs.readFileSync(src, "utf8"));
  } catch (error) {
    fail(id, `draft does not parse: ${error.message}`);
    return null;
  }
}

function normalizeDraft(draft, id, locale) {
  const d = walk(draft, dedash);
  d.stations = (d.stations || []).map((station) => ({
    ...station,
    module: normalizeModule(station.module || {}, d, station.id, locale),
  }));
  validate(d, id);
  return d;
}

function manifestEntry(d, n, locale) {
  const id = `l${n}`;
  const forDate = FOR_DATES[n - 1];
  return {
    id,
    number: n,
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    forDate,
    weekStart: minusDays(forDate, 7),
    motif: d.motif,
    arc: id === "l4" ? "restore" : "reveal",
    kitName: d.kitName,
    verseRef: d.verseRef,
    locale,
  };
}

/* ---- build ----------------------------------------------------------- */
const sourceDrafts = new Map();
for (let n = 1; n <= 13; n++) {
  const id = `l${n}`;
  const source = parseDraft(path.join(draftDir, `${id}.json`), id);
  if (source) sourceDrafts.set(id, source);
}

const manifests = { es: [], en: [] };
for (const locale of LOCALES) {
  if (locale.id !== "es" && !fs.existsSync(locale.draftDir)) continue;
  fs.mkdirSync(locale.outDir, { recursive: true });
  let built = 0;

  for (let n = 1; n <= 13; n++) {
    const id = `l${n}`;
    const src = path.join(locale.draftDir, `${id}.json`);
    if (!fs.existsSync(src)) {
      if (!allowPartial || locale.id === "es") fail(`${locale.id}:${id}`, "draft file missing");
      continue;
    }

    const raw = parseDraft(src, `${locale.id}:${id}`);
    if (!raw) continue;
    if (locale.id !== "es" && sourceDrafts.has(id)) {
      compareParity(sourceDrafts.get(id), raw, `${locale.id}:${id}`);
    }

    const d = normalizeDraft(raw, `${locale.id}:${id}`, locale.id);
    const importPath = locale.id === "es"
      ? "../engine/makeLesson.js"
      : "../../engine/makeLesson.js";
    const edition = locale.id === "es"
      ? `Lección ${n} · Q3 2026 · 1 y 2 Corintios`
      : `Lesson ${n} · Q3 2026 · 1 and 2 Corinthians`;
    const body = JSON.stringify(d, null, 2);
    const output = `import { makeLesson } from "${importPath}";

/* ${edition}
   Authored from the official quarterly, then adapted for this engine.
   Generated by scripts/build-lessons.mjs. Edit the draft, not this file. */
export default makeLesson(
${body}
);
`;
    fs.writeFileSync(path.join(locale.outDir, `${id}.js`), output);
    manifests[locale.id].push(manifestEntry(d, n, locale.id));
    built++;
  }

  console.log(`built ${built}/13 ${locale.id} lesson modules -> ${locale.outDir}`);
}

if (notes.length) {
  console.log(`\nnormalised (${notes.length}):`);
  notes.forEach((message) => console.log("  " + message));
}
if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`);
  problems.forEach((problem) => console.log("  x " + problem));
  process.exit(1);
}

const manifestOut = `/* Generated by scripts/build-lessons.mjs.
   Full lesson bodies are loaded on demand by loadLesson.js.
   LESSON_MANIFEST remains the Spanish alias for legacy imports. */

export const LESSON_MANIFEST_ES = ${JSON.stringify(manifests.es, null, 2)};

export const LESSON_MANIFEST_EN = ${JSON.stringify(manifests.en, null, 2)};

export const LESSON_MANIFESTS = Object.freeze({
  es: LESSON_MANIFEST_ES,
  en: LESSON_MANIFEST_EN,
});

export const LESSON_MANIFEST = LESSON_MANIFEST_ES;

export function normalizeContentLocale(locale) {
  return locale === "en" ? "en" : "es";
}

export function lessonManifestForLocale(locale = "es") {
  const normalized = normalizeContentLocale(locale);
  const manifest = LESSON_MANIFESTS[normalized];
  return manifest.length === LESSON_MANIFEST_ES.length
    ? manifest
    : LESSON_MANIFEST_ES;
}

export function lessonSummaryById(id, locale = "es") {
  return lessonManifestForLocale(locale).find((lesson) => lesson.id === id) || null;
}
`;
fs.writeFileSync(path.join(outDir, "lessonManifest.generated.js"), manifestOut);
console.log("\nall available drafts valid.");
