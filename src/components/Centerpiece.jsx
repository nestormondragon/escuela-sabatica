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

   A single clay bloom sits behind it and strengthens as pieces are set, so
   the subject reads as lit from within rather than pasted onto a flat page.
   All motion is CSS (see .cp-bloom and the .mtf rules), so nothing here
   depends on a JS visibility flag and the scene is never stuck dark. */
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
