/* =================================================================
   name.js — tasteful, safe helpers for personalizing the experience
   with the reader's name. Every helper degrades gracefully when the
   name is empty/blank so the UI never shows "undefined" or an awkward
   blank space.
   ================================================================= */

/* Normalize raw input: collapse whitespace, trim, cap length. */
export function cleanName(raw) {
  return String(raw || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

/* First token only — feels personal and reads well dropped mid-sentence
   ("Sigue, Néstor.") even when the reader typed a full name. */
export function firstName(raw) {
  const c = cleanName(raw);
  return c ? c.split(" ")[0] : "";
}

/* A vocative fragment to splice into a sentence: ", Néstor" or "" .
   Use like: `Bien hecho${vocative(name)}.` */
export function vocative(raw) {
  const f = firstName(raw);
  return f ? `, ${f}` : "";
}

/* Lowercase only the first character (keeps proper nouns intact) so a
   name can prefix an existing sentence: `${fn}, ${lcFirst(sentence)}`. */
export function lcFirst(str) {
  const s = String(str || "");
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function ucFirst(str) {
  const s = String(str || "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* stable small hash from a string seed (for deterministic placement/picks) */
function hashStr(seed) {
  const s = String(seed || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/* Weave the name into a sentence with correct Spanish vocative commas,
   varying placement deterministically by `seed` so adjacent screens differ
   and it never reads like mail-merge. Empty name → the clean sentence.
     placement 0: "Néstor, {sentence}"
     placement 1: "{Sentence}, Néstor."  (only if it ends as a statement)
     placement 2: "{Sentence}"           (name carried elsewhere on screen) */
export function weave(name, sentence, seed) {
  const fn = firstName(name);
  const text = String(sentence || "").trim();
  if (!fn || !text) return text;
  const place = hashStr(seed) % 2; // lead or tail (keep it always present)
  if (place === 0) return `${fn}, ${lcFirst(text)}`;
  const trimmed = text.replace(/[.!?]+$/, "");
  return `${ucFirst(trimmed)}, ${fn}.`;
}

/* A short, reverent, scene-neutral cue that always carries the name —
   used so EVERY station screen greets the reader once, warmly, without
   repeating the same phrasing. Returns "" when there is no name. */
const CUES = [
  (n) => `Detente un momento aquí, ${n}.`,
  (n) => `Respira, ${n}. Esta parte es para ti.`,
  (n) => `Sigamos con calma, ${n}.`,
  (n) => `${n}, deja que esto te hable hoy.`,
  (n) => `Esto es entre tú y Dios, ${n}.`,
  (n) => `Tómate tu tiempo, ${n}.`,
  (n) => `${n}, no hay prisa en este paso.`,
  (n) => `Que estas palabras calen hondo, ${n}.`,
];
export function warmCue(name, seed) {
  const fn = firstName(name);
  if (!fn) return "";
  return CUES[hashStr(seed) % CUES.length](fn);
}
