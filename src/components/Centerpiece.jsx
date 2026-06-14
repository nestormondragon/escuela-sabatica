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

/* The foreground subject (boat / flame / road / seed / sky) floating over
   the CSS Backdrop sky. The backdrop owns the sky/light; this owns the
   story. Behind the motif sits a scene-tinted bloom that breathes (pure
   CSS) and brightens as more pieces are forged — so the subject feels lit
   from within and the screen never reads flat. All motion is CSS (see
   Motif + .cp-bloom) — no visibility gating, so it always runs. */
export default function Centerpiece({ lesson, filled = 0, size = 300 }) {
  const kind = lesson?.scene?.motif || "boat";
  const stage = stageIndexFor(filled);
  const sun = lesson?.scene?.shader?.sun || [1, 0.85, 0.55];
  const glow = `rgba(${Math.round(sun[0] * 255)},${Math.round(sun[1] * 255)},${Math.round(sun[2] * 255)},0.55)`;
  // bloom strengthens with progress (darkness → light)
  const bloom = (0.34 + 0.16 * stage).toFixed(2);
  return (
    <div className="cp" style={{ "--cp-glow": glow, "--cp-bloom": bloom, width: size, maxWidth: "100%" }}>
      <div className="cp-bloom" aria-hidden="true" />
      <Motif kind={kind} stageIndex={stage} size={size} />
    </div>
  );
}
