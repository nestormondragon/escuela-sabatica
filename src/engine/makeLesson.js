import { firstName, lcFirst } from "../lib/name.js";
import { paletteFor } from "./palettes.js";

/* =================================================================
   makeLesson — turns a pure-data lesson draft (from the content
   pipeline) into the runtime lesson object the engine expects,
   identical in shape to the hand-authored l11/l12/l13.

   Templates are data, rendered at runtime with the reader's answers:
     {name}            → reader's first name (gracefully omitted if none)
     {slot:ID}         → the value saved in slot ID
     {slot:ID|lower}   → same, first letter lowercased (mid-sentence)
     {verse} {verseRef}→ the memory verse text / reference
   ================================================================= */

/* Resolve one id from slots, falling back to extra (free-text fields like
   commitDuo's personExtraKey live in `extra`, not `slots`). Modifiers after
   the id, pipe-separated: `lower` (lowercase first letter for mid-sentence)
   and `or:DEFAULT` (use DEFAULT when the value is empty — so a sentence that
   names a person still reads well when that optional field was left blank). */
function resolveToken(id, mods, slots, extra) {
  let v = slots[id];
  if (v === undefined || v === null || v === "") v = extra[id];
  v = v == null ? "" : String(v);
  let lower = false;
  let fallback = null;
  for (const mod of mods) {
    if (mod === "lower") lower = true;
    else if (mod.startsWith("or:")) fallback = mod.slice(3);
  }
  if (!v && fallback != null) v = fallback;
  if (lower) v = lcFirst(v);
  return v;
}

function renderTemplate(tpl, data, state) {
  const slots = (state && state.slots) || {};
  const extra = (state && state.extra) || {};
  const name = firstName(state && state.userName);
  let s = String(tpl || "");

  s = s.replace(/\{verseRef\}/g, data.verse.ref).replace(/\{verse\}/g, data.verse.text);

  // {slot:id}, {slot:id|lower}, {slot:id|or:default}, combos
  s = s.replace(/\{slot:([a-zA-Z0-9_]+)((?:\|[^}|]+)*)\}/g, (_m, id, modstr) =>
    resolveToken(id, modstr ? modstr.split("|").filter(Boolean) : [], slots, extra)
  );

  if (name) {
    s = s.replace(/\{name\}/g, name);
  } else {
    // no name → remove the vocative cleanly, no stray commas
    s = s.replace(/\{name\}\s*,\s*/g, "").replace(/\s*,\s*\{name\}/g, "").replace(/\{name\}/g, "");
  }

  // bare {id} tokens (resolve from slots/extra); unknown ids fall through
  s = s.replace(/\{([a-zA-Z0-9_]+)((?:\|[^}|]+)*)\}/g, (m, id, modstr) =>
    id in slots || id in extra
      ? resolveToken(id, modstr ? modstr.split("|").filter(Boolean) : [], slots, extra)
      : m
  );

  // safety net: never leak an unresolved token; tidy whitespace/orphans
  s = s
    .replace(/\{[^{}]*\}/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?»])/g, "$1")
    .replace(/«\s+/g, "«")
    // A template may supply a connector ("sostener que ...") while the saved
    // answer already begins with the same word ("que Cristo no está dividido").
    // Collapse the duplicate: these function words are never validly doubled
    // in Spanish, and the alternative is authoring every option around the
    // template that happens to quote it.
    .replace(/\b(que|de|en|con|por|para|a|y|o)\s+\1\b/gi, "$1")
    .trim();
  if (!name) s = s.charAt(0).toUpperCase() + s.slice(1);
  return s;
}

export function makeLesson(d) {
  const stageLabel = {};
  d.stages.forEach((id, i) => (stageLabel[id] = d.stageLabels[i] || id));

  const facilitator = {};
  (d.facilitator || []).forEach((f) => {
    const { stationId, ...rest } = f;
    facilitator[stationId] = rest;
  });

  const slots = d.slots.map((s) => ({ ...s, station: s.id }));
  const stations = d.stations.map((s) => ({ ...s, slot: s.id }));

  const verse = { ref: d.verseRef, text: d.verseText };

  return {
    id: "l" + d.number,
    number: d.number,
    quarter: "2026-Q2",
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    kitName: d.kitName,
    artifact: { noun: d.artifactNoun },
    ui: d.ui,
    centerpiece: d.motif,
    // `arc` lets two lessons share one motif while telling opposite stories
    scene: { motif: d.motif, arc: d.arc || "reveal", shader: paletteFor(d.motif) },
    stages: d.stages,
    stageLabel,
    verse,
    promise: d.promise,
    slots,
    stations,
    encourage: d.encourage,
    discussion: d.discussion,
    facilitator,
    pattern(state) {
      return renderTemplate(d.patternTemplate, { verse }, state);
    },
    outputs(state) {
      const ctx = { verse };
      return {
        oracion: renderTemplate(d.outOracion, ctx, state),
        aliento: renderTemplate(d.outAliento, ctx, state),
        accion24: renderTemplate(d.outAccion24, ctx, state),
        pregunta: renderTemplate(d.outPregunta, ctx, state),
        tarjeta: renderTemplate(d.outTarjeta, ctx, state),
      };
    },
  };
}
