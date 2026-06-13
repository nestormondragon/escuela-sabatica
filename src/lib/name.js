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
