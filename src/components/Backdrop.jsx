import React from "react";
import { MATERIAL_TEXTURES } from "../assets/generated/visualManifest.generated.js";

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
  // The clay seam is the room's one warm source. Progress strengthens its
  // reflected light without turning the entire wall into a generic halo.
  const lume = (0.08 + 0.22 * p).toFixed(3);
  const materialStyle = {
    "--lume": lume,
    "--backdrop-basalt": `url("${MATERIAL_TEXTURES.basaltInk}")`,
    "--backdrop-limestone": `url("${MATERIAL_TEXTURES.coolLimestone}")`,
    "--backdrop-grout": `url("${MATERIAL_TEXTURES.darkGrout}")`,
    "--backdrop-clay": `url("${MATERIAL_TEXTURES.firedTerracotta}")`,
  };

  return (
    <div className="backdrop" style={materialStyle} aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-grain" />
      <div className="bg-tess" />
      <div className="bg-lume" />
      <div className="bg-scrim" />
    </div>
  );
}
