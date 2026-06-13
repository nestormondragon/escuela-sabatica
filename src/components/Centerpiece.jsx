import React from "react";
import Motif from "./Motif.jsx";

/* Maps how many slots are filled (0..total) to a 5-stage scene index. */
export function stageIndexFor(filled) {
  if (filled <= 0) return 0;
  if (filled <= 2) return 1;
  if (filled <= 4) return 2;
  if (filled <= 6) return 3;
  return 4;
}

/* The foreground subject (boat / flame / road) floating over the CSS
   Backdrop sky. The backdrop owns the sky/light; this owns the story.
   All motion is CSS (see Motif) — no visibility gating, so it always runs. */
export default function Centerpiece({ lesson, filled = 0, size = 300 }) {
  const kind = lesson?.scene?.motif || "boat";
  return <Motif kind={kind} stageIndex={stageIndexFor(filled)} size={size} />;
}
