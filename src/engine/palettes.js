/* =====================================================================
   palettes.js — per-motif scene metadata.

   Q2 drove a tweened sky from these values (storm colours, sun position,
   lightning). Q3's backdrop is architectural rather than meteorological:
   one still wall lit by a single clay light that grows with progress. So
   a scene now only declares which image it is and how the centrepiece
   should be lit, and the whole product keeps one accent.
   ===================================================================== */

export const MOTIFS = [
  "mosaico", "cruz", "barro", "carta", "alba", "retrato", "siembra", "muro",
];

const SCENES = {
  // fragments finding their place in one image (1 Cor. 1:10)
  mosaico: { motif: "mosaico", lightY: 0.46, lightSpread: 0.52 },
  // the beam that looked like foolishness (1 Cor. 1:18)
  cruz:    { motif: "cruz",    lightY: 0.44, lightSpread: 0.50 },
  // the jar: L10 breaks open to let the treasure out, L4 is reformed into a
  // temple. Same craft, opposite direction, selected by the lesson's `arc`.
  barro:   { motif: "barro",   lightY: 0.54, lightSpread: 0.46 },
  // the letter read by everyone who knows you (2 Cor. 3:2)
  carta:   { motif: "carta",   lightY: 0.50, lightSpread: 0.48 },
  // the morning that makes the whole gospel stand (1 Cor. 15)
  alba:    { motif: "alba",    lightY: 0.62, lightSpread: 0.56 },
  // 1 Cor. 13 as a portrait worked up from charcoal to full light
  retrato: { motif: "retrato", lightY: 0.42, lightSpread: 0.48 },
  // the closed fist that opens and sows (2 Cor. 8-9)
  siembra: { motif: "siembra", lightY: 0.56, lightSpread: 0.52 },
  // the stronghold taken down to the rock that was holding it up (2 Cor. 10:4)
  muro:    { motif: "muro",    lightY: 0.60, lightSpread: 0.50 },
};

export function paletteFor(motif) {
  return SCENES[motif] || SCENES.mosaico;
}
