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

function renderTemplate(tpl, data, state) {
  const slots = (state && state.slots) || {};
  const name = firstName(state && state.userName);
  let s = String(tpl || "");

  s = s.replace(/\{slot:([a-zA-Z0-9_]+)(\|lower)?\}/g, (_m, id, lo) => {
    const v = slots[id] || "";
    return lo ? lcFirst(v) : v;
  });
  s = s.replace(/\{verseRef\}/g, data.verse.ref).replace(/\{verse\}/g, data.verse.text);

  if (name) {
    s = s.replace(/\{name\}/g, name);
  } else {
    // no name → remove the vocative cleanly, no stray commas
    s = s.replace(/\{name\}\s*,\s*/g, "").replace(/\s*,\s*\{name\}/g, "").replace(/\{name\}/g, "");
    s = s.charAt(0).toUpperCase() + s.slice(1);
  }
  return s.replace(/\s{2,}/g, " ").trim();
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
    scene: { motif: d.motif, shader: paletteFor(d.motif) },
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
