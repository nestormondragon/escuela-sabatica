import React from "react";

/* =====================================================================
   Backdrop — the wall the mosaic is set into.

   Q2's backdrop was weather: a storm tweening to dawn, with drifting
   clouds and lightning. This quarter is architectural instead. The ground
   is still: quarried stone, a faint tessellated floor, and one field of
   clay light that grows as the reader sets each piece.

   The field stays still and changes only when progress changes, leaving the
   active motif as the viewport's sole ambient-motion owner.
   ===================================================================== */

export default function Backdrop({ stage = 0 }) {
  const p = Math.max(0, Math.min(1, stage));
  // the light in the room grows as the image comes together
  const lume = (0.14 + 0.34 * p).toFixed(3);

  return (
    <div className="backdrop" style={{ "--lume": lume }} aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-tess" />
      <div className="bg-lume" />
      <div className="bg-scrim" />
      <div className="bg-grain" />
    </div>
  );
}
