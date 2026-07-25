import React, { useId } from "react";

/* =====================================================================
   CrackedVessel — the narrative artwork for 2 Corintios 4:7,
   "tenemos este tesoro en vasos de barro".

   Construction notes live in docs/SVG-DESIGN.md. The short version:

   - The fracture is a MASK, not a drawn line. The ceramic is painted
     through a mask that subtracts tapered fracture shapes, so the crack is
     a real opening. Fire is painted behind the ceramic and clipped to the
     silhouette, so it can only be seen through those openings. That is why
     it reads as broken pottery rather than a glowing symbol printed on top.
   - Fracture widths taper from ~7 units at the origin to <1 at the tips.
     A stroke cannot do this (stroke-width is constant), so every fracture
     is a filled sliver built from a centreline plus a per-point width.
   - Every gradient / mask / clip / filter id is namespaced per instance via
     useId(). Several vessels render on one page (the kit, the ceremony, the
     keepsake card, the review lab) and duplicate ids silently resolve to
     whichever definition came first in the document.
   ===================================================================== */

/* --- geometry ------------------------------------------------------- */

// Hand-thrown silhouette. Deliberately not mirrored: the right side sits
// 1 to 3% wider so the vessel reads as formed by hand, not by a compass.
const BODY =
  "M 134 110 " +
  "C 116 126, 96 160, 86 200 " +
  "C 78 238, 85 280, 107 303 " +
  "C 121 317, 140 323, 160 323 " +
  "C 181 323, 202 316, 217 302 " +
  "C 240 278, 246 235, 238 198 " +
  "C 228 158, 206 125, 187 110 Z";

const NECK = "M 134 110 C 136 96, 137 84, 137 72 L 184 72 C 184 84, 185 96, 187 110 Z";

// Handles are small, tucked close to the shoulder, and drawn before the body
// so it occludes their inner edge. Kept deliberately subordinate: a storage
// jar's handles are for lifting, not for decoration, and large circular ones
// were what made the first version read as ears.
const HANDLE_L =
  "M 138 98 C 118 96, 99 110, 95 138 C 93 155, 98 168, 105 175 " +
  "L 115 167 C 109 160, 106 150, 108 138 C 111 120, 123 111, 140 112 Z";
const HANDLE_R =
  "M 183 98 C 203 96, 222 110, 226 138 C 228 155, 223 168, 216 175 " +
  "L 206 167 C 212 160, 215 150, 213 138 C 210 120, 198 111, 181 112 Z";

/* Fractures: centreline + per-point width, and the stage each one opens at.
   The primary starts high on the left shoulder, changes direction seven
   times, and wanders across the belly rather than falling straight. */
const FRACTURES = [
  {
    id: "primary",
    pts: [[140, 148], [133, 168], [146, 190], [132, 214], [147, 240], [130, 266], [143, 288], [136, 305]],
    w: [7.4, 6.3, 5.2, 4.6, 3.5, 2.5, 1.5, 0.8],
    at: 0,
  },
  {
    id: "branch-left",
    pts: [[146, 190], [118, 203], [96, 207], [77, 200]],
    w: [4.0, 2.9, 1.7, 0.8],
    at: 1,
  },
  {
    id: "branch-right",
    pts: [[147, 240], [177, 251], [203, 244], [225, 253]],
    w: [3.5, 2.5, 1.5, 0.75],
    at: 2,
  },
  {
    id: "branch-foot",
    pts: [[130, 266], [109, 281], [93, 293]],
    w: [2.3, 1.3, 0.75],
    at: 3,
  },
  // hairlines: present early, never wide enough to show fire
  { id: "hair-a", pts: [[133, 168], [112, 177]], w: [1.2, 0.4], at: 1, hair: true },
  { id: "hair-b", pts: [[132, 214], [151, 225]], w: [1.0, 0.35], at: 2, hair: true },
  { id: "hair-c", pts: [[143, 288], [159, 301]], w: [1.0, 0.35], at: 3, hair: true },
];

/* Build a closed, tapered sliver from a centreline and per-point widths.
   Edges stay polygonal on purpose: ceramic fractures in straight runs with
   abrupt direction changes, and rounding them reads as a river, not a break. */
function sliver(points, widths) {
  const n = points.length;
  const a = [];
  const b = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = points[i];
    const [px, py] = points[Math.max(0, i - 1)];
    const [qx, qy] = points[Math.min(n - 1, i + 1)];
    let dx = qx - px;
    let dy = qy - py;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    const w = Math.max(0, widths[i] ?? 0) / 2;
    a.push([x - dy * w, y + dx * w]);
    b.push([x + dy * w, y - dx * w]);
  }
  const f = (p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  return `M ${a.map(f).join(" L ")} L ${b.reverse().map(f).join(" L ")} Z`;
}

const scale = (ws, k) => ws.map((w) => w * k);

/* --- component ------------------------------------------------------ */

export default function CrackedVessel({
  stage = 0,
  size = 260,
  variant = "auto",
  title = "Vasija de barro agrietada",
  desc = "Una vasija de barro hecha a mano, con una grieta profunda por la que se ve la luz que arde dentro.",
}) {
  const raw = useId().replace(/:/g, "");
  const uid = (n) => `${raw}-${n}`;
  const s = Math.max(0, Math.min(4, stage));
  const t = s / 4;

  // Below ~96px the fine work turns to mud, so drop texture, hairlines and
  // the outer branches, and open the primary wider to hold the silhouette.
  const compact = variant === "compact" || (variant === "auto" && size < 96);

  const active = FRACTURES.filter((f) => {
    if (!compact) return true;
    return f.id === "primary" || f.id === "branch-left";
  });

  const openOf = (f) => Math.max(0, Math.min(1, s - f.at));
  const widthK = (f) => {
    const o = openOf(f);
    const base = 0.32 + o * 0.68;
    return compact && f.id === "primary" ? base * 1.25 : base;
  };

  return (
    <svg
      viewBox="0 0 320 360"
      width={size}
      height={(size * 360) / 320}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${uid("t")} ${uid("d")}`}
      className="vessel vessel-enter"
      style={{ display: "block", maxWidth: "100%", height: "auto", overflow: "visible" }}
    >
      <title id={uid("t")}>{title}</title>
      <desc id={uid("d")}>{desc}</desc>

      <defs>
        {/* fired clay: warm light from the upper left, burnt umber falling
            into warm charcoal on the lower right */}
        <linearGradient id={uid("clay")} x1="14%" y1="6%" x2="86%" y2="94%">
          <stop offset="0%" stopColor="#c07b52" />
          <stop offset="30%" stopColor="#9d5836" />
          <stop offset="64%" stopColor="#6b3a24" />
          <stop offset="100%" stopColor="#3b2116" />
        </linearGradient>
        {/* handles and foot sit deeper in shadow */}
        <linearGradient id={uid("clayDark")} x1="10%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#8a4d31" />
          <stop offset="100%" stopColor="#331c12" />
        </linearGradient>
        {/* the lip catches the most light */}
        <linearGradient id={uid("rim")} x1="4%" y1="0%" x2="96%" y2="100%">
          <stop offset="0%" stopColor="#cf8a5f" />
          <stop offset="52%" stopColor="#9d5836" />
          <stop offset="100%" stopColor="#4a2818" />
        </linearGradient>
        {/* Fire inside the vessel. The hot centre is placed deliberately
            behind the primary fracture's main run, not at the geometric
            middle, so the light the reader sees through the opening is the
            bright part of the flame rather than its dim edge. */}
        <radialGradient id={uid("fire")} cx="42%" cy="44%" r="58%">
          <stop offset="0%" stopColor="#fff6e4" />
          <stop offset="22%" stopColor="#ffd398" />
          <stop offset="52%" stopColor="#f98f4c" />
          <stop offset="100%" stopColor="#b8431f" stopOpacity="0.7" />
        </radialGradient>
        {/* coral bounce thrown back onto the clay near the opening */}
        <radialGradient id={uid("bounce")} cx="42%" cy="60%" r="46%">
          <stop offset="0%" stopColor="#ff9a5e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff9a5e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={uid("shadow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        {/* restrained clay grain: broad organic variation, not static */}
        {!compact ? (
          <filter id={uid("grain")} x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028 0.05"
                          numOctaves="3" seed="7" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" result="g" />
            <feComponentTransfer in="g" result="c">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feComposite in="c" in2="SourceGraphic" operator="in" />
          </filter>
        ) : null}
        {/* tight bloom only, so light does not become a generic halo */}
        <filter id={uid("bloom")} x="-40%" y="-30%" width="180%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={uid("soft")} x="-30%" y="-20%" width="160%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>

        <clipPath id={uid("bodyClip")}>
          <path d={BODY} />
        </clipPath>

        {/* THE crack: ceramic is painted through this mask, so black shapes
            become genuine openings rather than paint on the surface */}
        <mask id={uid("crack")} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="360">
          <rect x="0" y="0" width="320" height="360" fill="black" />
          <path d={BODY} fill="white" />
          <path d={NECK} fill="white" />
          {active.map((f) => {
            const o = openOf(f);
            if (o <= 0) return null;
            return (
              <path
                key={f.id}
                d={sliver(f.pts, scale(f.w, widthK(f)))}
                fill="black"
                style={{ transition: `opacity 700ms var(--ease-out)` }}
              />
            );
          })}
        </mask>
      </defs>

      {/* 1. cast shadow, grounding the vessel */}
      <g id={uid("g-shadow")}>
        <ellipse cx="162" cy="330" rx="86" ry="15" fill={`url(#${uid("shadow")})`} />
      </g>

      {/* 2. handles, behind the body so it occludes their inner edge */}
      <g id={uid("g-handles")} fill={`url(#${uid("clayDark")})`}>
        <path d={HANDLE_L} />
        <path d={HANDLE_R} />
      </g>

      {/* 3. the fire, clipped to the silhouette so it can only escape
             through the openings the mask cuts in the ceramic. It is already
             burning before the first fracture opens: the treasure was always
             in the jar, the crack is only what lets it out. */}
      <g id={uid("g-fire")} clipPath={`url(#${uid("bodyClip")})`}>
        <ellipse
          cx="146" cy="228" rx="112" ry="126"
          fill={`url(#${uid("fire")})`}
          className="vessel-fire"
          style={{ "--fire": 0.72 + t * 0.28, transition: "opacity 900ms var(--ease-out)" }}
        />
      </g>

      {/* 4. the ceramic, painted through the crack mask */}
      <g id={uid("g-body")} mask={`url(#${uid("crack")})`}>
        <path d={BODY} fill={`url(#${uid("clay")})`} />
        <path d={NECK} fill={`url(#${uid("clay")})`} />

        <g clipPath={`url(#${uid("bodyClip")})`}>
          {/* throwing rings from the wheel */}
          {[150, 168, 186, 204, 222, 240, 258, 276, 294].map((y, i) => (
            <ellipse key={y} cx="160" cy={y}
                     rx={94 - Math.abs(y - 232) * 0.34} ry="3"
                     fill="none" stroke="#2d1810"
                     strokeWidth={i % 2 ? 1 : 1.5} opacity="0.14" />
          ))}
          {/* occlusion down the unlit side */}
          <path d="M 196 108 C 232 140, 254 216, 236 316 L 300 316 L 300 100 Z"
                fill="#2a1710" opacity="0.34" />
          {/* soft sheen on the lit shoulder, blurred so it sits on the form */}
          <path d="M 134 124 C 108 146, 92 182, 90 224 C 89 254, 94 280, 104 300
                   L 126 292 C 116 268, 112 244, 113 222 C 116 184, 126 152, 148 130 Z"
                fill="#dc9a6d" opacity="0.22" filter={`url(#${uid("soft")})`} />
          {/* coral bounce from the fire onto nearby clay */}
          <ellipse cx="140" cy="228" rx="104" ry="112"
                   fill={`url(#${uid("bounce")})`}
                   style={{ opacity: t * 0.9, transition: "opacity 900ms var(--ease-out)" }} />
          {/* clay grain */}
          {!compact ? (
            <path d={BODY} fill="#f0d2b8" opacity="0.10" filter={`url(#${uid("grain")})`} />
          ) : null}
        </g>
      </g>

      {/* 5. bloom: a little light spills past the ceramic edge, kept tight */}
      <g id={uid("g-bloom")} style={{ opacity: t, transition: "opacity 900ms var(--ease-out)" }}>
        {active.filter((f) => !f.hair && openOf(f) > 0).map((f) => (
          <path key={f.id}
                d={sliver(f.pts, scale(f.w, widthK(f) * 1.35))}
                fill="#ff8f4a" opacity="0.5" filter={`url(#${uid("bloom")})`} />
        ))}
      </g>

      {/* 6. fracture edges: a thin dark lip where the sherd lifts away, which
             is what gives the opening ceramic thickness */}
      <g id={uid("g-fracture-shadows")} clipPath={`url(#${uid("bodyClip")})`}>
        {active.map((f) => {
          const o = openOf(f);
          if (o <= 0) return null;
          return (
            <path
              key={f.id}
              d={sliver(f.pts.map(([x, y]) => [x + 1.5, y + 1.8]), scale(f.w, widthK(f) * 0.42))}
              fill="#1d0f09"
              opacity={0.34 * o}
            />
          );
        })}
      </g>

      {/* 7. neck, rim and the dark interior */}
      <g id={uid("g-rim")}>
        <path d="M 118 76 C 118 61, 202 61, 202 76 C 202 87, 118 87, 118 76 Z"
              fill={`url(#${uid("rim")})`} />
        <ellipse cx="160" cy="73.5" rx="30" ry="8.5" fill="#22120c" />
        <ellipse cx="160" cy="73.5" rx="30" ry="8.5" fill="none"
                 stroke="#c9825a" strokeWidth="1.2" opacity="0.45" />
        {/* light climbing out of the mouth once the fire is well up */}
        <ellipse cx="160" cy="74" rx="24" ry="6"
                 fill="#ffbe83"
                 style={{ opacity: Math.max(0, t - 0.45) * 1.2, transition: "opacity 900ms var(--ease-out)" }} />
        {/* catch-light along the lip */}
        <path d="M 122 72 C 128 66, 192 66, 198 72" fill="none"
              stroke="#e8b184" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  );
}
