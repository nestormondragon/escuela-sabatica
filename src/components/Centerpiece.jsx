import React from "react";
import Motif from "./Motif.jsx";

/* Maps how many pieces are set (0..total) onto the 5-stage scene index. */
export function stageIndexFor(filled) {
  if (filled <= 0) return 0;
  if (filled <= 2) return 1;
  if (filled <= 4) return 2;
  if (filled <= 6) return 3;
  return 4;
}

/* The centrepiece: the image the reader is assembling.

   A single static clay bloom sits behind it and strengthens as pieces are set, so
   the subject reads as lit from within rather than pasted onto a flat page.
   The motif alone owns any ambient loop, so the world never has two competing
   breathing motions. Nothing here depends on a JS visibility flag. */
export default function Centerpiece({ lesson, filled = 0, size = 260 }) {
  const kind = lesson?.scene?.motif || lesson?.centerpiece || "mosaico";
  const stage = stageIndexFor(filled);
  const bloom = (0.30 + 0.16 * stage).toFixed(2);

  return (
    <div className="cp" style={{ "--cp-bloom": bloom, width: size, maxWidth: "100%" }}>
      <div className="cp-bloom" aria-hidden="true" />
      <Motif kind={kind} stageIndex={stage} size={size}
             arc={lesson?.scene?.arc || "reveal"} />
    </div>
  );
}
