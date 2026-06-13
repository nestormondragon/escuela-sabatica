/* =================================================================
   palettes.js — per-motif sky/shader palette used by the Backdrop.
   One palette per visual motif so any lesson that picks a motif gets a
   coherent "darkness → light" colour journey for free. [r,g,b] are 0..1.
   ================================================================= */

export const MOTIF_PALETTES = {
  // night storm → warm dawn over a sea (Contratiempos)
  boat: {
    sunX: 0.72, hasSea: true, lightning: true,
    stormTop: [0.027, 0.043, 0.078], stormBot: [0.086, 0.141, 0.231],
    dawnTop: [0.227, 0.290, 0.470], dawnBot: [0.941, 0.760, 0.466],
    sun: [1.0, 0.85, 0.55],
  },
  // dark → warm amber glow, a light kindled (the Word / sharing / prayer-altar)
  flame: {
    sunX: 0.5, hasSea: false, lightning: false,
    stormTop: [0.04, 0.035, 0.05], stormBot: [0.10, 0.08, 0.07],
    dawnTop: [0.20, 0.13, 0.10], dawnBot: [0.96, 0.72, 0.42],
    sun: [1.0, 0.80, 0.45],
  },
  // night → golden city of light on the horizon (the way / return / eternity)
  road: {
    sunX: 0.5, hasSea: false, lightning: false,
    stormTop: [0.03, 0.04, 0.10], stormBot: [0.07, 0.09, 0.18],
    dawnTop: [0.16, 0.20, 0.42], dawnBot: [0.97, 0.80, 0.52],
    sun: [1.0, 0.86, 0.58],
  },
  // dark soil → green growth → golden light from above (humility / the word sown)
  seed: {
    sunX: 0.5, hasSea: false, lightning: false,
    stormTop: [0.05, 0.06, 0.05], stormBot: [0.10, 0.11, 0.07],
    dawnTop: [0.34, 0.46, 0.28], dawnBot: [0.95, 0.84, 0.46],
    sun: [1.0, 0.88, 0.5],
  },
  // deep starfield → sunrise (self-examination in the light / communion)
  sky: {
    sunX: 0.5, hasSea: false, lightning: false,
    stormTop: [0.02, 0.03, 0.08], stormBot: [0.06, 0.08, 0.16],
    dawnTop: [0.22, 0.26, 0.48], dawnBot: [0.97, 0.78, 0.52],
    sun: [1.0, 0.84, 0.56],
  },
};

export function paletteFor(motif) {
  return MOTIF_PALETTES[motif] || MOTIF_PALETTES.boat;
}
