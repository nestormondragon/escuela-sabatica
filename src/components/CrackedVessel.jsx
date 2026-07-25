import React, { useEffect, useId, useRef, useState } from "react";

/* =====================================================================
   CrackedVessel — narrative artwork for 2 Corintios 4:7,
   "tenemos este tesoro en vasos de barro".

   Construction notes: docs/SVG-DESIGN.md
   Quality rubric:     docs/svg-quality-rubric.md

   Load-bearing decisions:

   - The fracture is a MASK. Ceramic is painted through a mask that
     subtracts tapered fracture shapes; fire is painted behind the ceramic
     and clipped to the silhouette, so light is only visible through the
     openings. That is what makes it read as broken pottery rather than a
     glowing line drawn on the surface.

   - A stroke cannot taper (stroke-width is constant along a path), so each
     fracture is a FILLED sliver built from a centreline plus a per-point
     width profile.

   - The reveal is a separate mechanism from the geometry. Each fracture's
     filled sliver stays mounted; a centreline stroked with pathLength="1"
     and an animated stroke-dashoffset acts as its reveal mask, so the crack
     propagates from origin to tip. The centreline stroke is never visible;
     it exists only to drive the mask.

   - Every gradient / mask / clip / filter id is namespaced with useId().
     Multiple vessels render on one page and duplicate ids silently resolve
     to whichever definition appeared first in the document.
   ===================================================================== */

/* --- geometry ------------------------------------------------------- */

// Hand-thrown silhouette, deliberately not mirrored: the right side runs
// 1 to 3% wider so it reads as formed by hand rather than by a compass.
const BODY =
  "M 134 110 " +
  "C 116 126, 96 160, 86 200 " +
  "C 78 238, 85 280, 107 303 " +
  "C 121 317, 140 323, 160 323 " +
  "C 181 323, 202 316, 217 302 " +
  "C 240 278, 246 235, 238 198 " +
  "C 228 158, 206 125, 187 110 Z";

const NECK = "M 134 110 C 136 96, 137 84, 137 72 L 184 72 C 184 84, 185 96, 187 110 Z";

// Small, tucked to the shoulder, drawn before the body so it occludes their
// inner edge. Large circular handles were what read as ears in v1.
const HANDLE_L =
  "M 138 98 C 118 96, 99 110, 95 138 C 93 155, 98 168, 105 175 " +
  "L 115 167 C 109 160, 106 150, 108 138 C 111 120, 123 111, 140 112 Z";
const HANDLE_R =
  "M 183 98 C 203 96, 222 110, 226 138 C 228 155, 223 168, 216 175 " +
  "L 206 167 C 212 160, 215 150, 213 138 C 210 120, 198 111, 181 112 Z";

/* Fracture set.
   `at`       stage at which this fracture begins to propagate
   `junction` where along the PRIMARY this branch departs, 0..1 of its
              length, used to delay the branch until the primary arrives
   `hair`     surface damage only: never subtracts ceramic, never shows fire

   All terminals are kept inside the silhouette. v1's branch-left ended at
   x=77 where the body edge is x=86, which produced a sharp glowing line
   floating outside the vessel once bloom was applied. */
const FRACTURES = [
  {
    id: "primary",
    pts: [[140, 148], [133, 168], [146, 190], [132, 214], [147, 240], [130, 266], [143, 288], [136, 305]],
    w: [7.4, 6.3, 5.2, 4.6, 3.5, 2.5, 1.5, 0.8],
    at: 0,
  },
  {
    id: "branch-left",
    pts: [[146, 190], [124, 200], [107, 203], [93, 197]],
    w: [4.0, 2.9, 1.7, 0.8],
    at: 1,
    junction: 0.28,
  },
  {
    id: "branch-right",
    pts: [[147, 240], [175, 250], [198, 244], [219, 251]],
    w: [3.5, 2.5, 1.5, 0.75],
    at: 2,
    junction: 0.56,
  },
  {
    id: "branch-foot",
    pts: [[130, 266], [113, 279], [100, 289]],
    w: [2.3, 1.3, 0.75],
    at: 3,
    junction: 0.74,
  },
  { id: "hair-a", pts: [[133, 168], [114, 177]], w: [1.2, 0.4], at: 1, junction: 0.14, hair: true },
  { id: "hair-b", pts: [[132, 214], [150, 224]], w: [1.0, 0.35], at: 2, junction: 0.42, hair: true },
  { id: "hair-c", pts: [[143, 288], [157, 299]], w: [1.0, 0.35], at: 3, junction: 0.88, hair: true },
];

/* Closed, tapered sliver from a centreline plus per-point widths. Edges stay
   polygonal on purpose: ceramic fractures in straight runs with abrupt
   direction changes; smoothing them reads as a river, not a break. */
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

/* Truncate a centreline (and its width profile) at a fraction of its arc
   length, interpolating the final point and width.

   This is the reveal mechanism. The intended approach was a centreline
   stroked with pathLength="1" and an animated stroke-dashoffset used as a
   mask, but a <g mask> nested INSIDE a <mask> is ignored by Chromium: with
   the reveal mask's stroke set to none the fracture still rendered in full,
   proving the nested mask never applied. Truncating the geometry instead is
   engine-proof, is genuinely directional (origin to tip), and keeps the
   filled sliver as the geometry that removes ceramic. */
function truncate(points, widths, p) {
  const q = Math.max(0, Math.min(1, p));
  if (q >= 1) return { pts: points, ws: widths };
  const segs = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    segs.push(d);
    total += d;
  }
  if (q <= 0 || total === 0) return { pts: [], ws: [] };
  const target = total * q;
  const pts = [points[0]];
  const ws = [widths[0]];
  let acc = 0;
  for (let i = 0; i < segs.length; i++) {
    if (acc + segs[i] < target) {
      acc += segs[i];
      pts.push(points[i + 1]);
      ws.push(widths[i + 1]);
      continue;
    }
    const f = segs[i] === 0 ? 0 : (target - acc) / segs[i];
    const [ax, ay] = points[i];
    const [bx, by] = points[i + 1];
    pts.push([ax + (bx - ax) * f, ay + (by - ay) * f]);
    ws.push(widths[i] + (widths[i + 1] - widths[i]) * f);
    break;
  }
  return { pts, ws };
}

/* Offset a centreline perpendicular to its direction, for a one-sided
   contact shadow that hugs the lower edge of an opening. */
function offsetLine(points, dist) {
  const n = points.length;
  return points.map(([x, y], i) => {
    const [px, py] = points[Math.max(0, i - 1)];
    const [qx, qy] = points[Math.min(n - 1, i + 1)];
    let dx = qx - px;
    let dy = qy - py;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    return [x - dy * dist, y + dx * dist];
  });
}

const polyline = (pts) => `M ${pts.map((p) => `${p[0]} ${p[1]}`).join(" L ")}`;
const scale = (ws, k) => ws.map((w) => w * k);

// Total reveal time for the primary fracture. Branches wait until the
// primary has actually reached their junction, then lag slightly behind it.
const REVEAL_MS = 700;
const BRANCH_LAG_MS = 90; // spec: 50 to 120ms after the junction is reached

const easeOut = (x) => 1 - Math.pow(1 - x, 3);

/* Drives each fracture's reveal progress toward its target.

   This is a one-shot transition, not an ambient loop, so a rAF tween is
   appropriate: the project's hard rule (all looping motion must be CSS so it
   can never be stalled by a visibility flag) governs perpetual animation.
   The tween is self-cancelling, snaps to the target under reduced motion,
   and holds its final value if the frame loop is ever interrupted. */
function useFractureReveal(targets, reduced) {
  const [progress, setProgress] = useState(targets);
  const raf = useRef(null);
  const from = useRef(targets);
  const key = JSON.stringify(targets);

  useEffect(() => {
    if (reduced) {
      setProgress(targets);
      from.current = targets;
      return;
    }
    const start = performance.now();
    const a = from.current;
    const b = targets;
    const total = REVEAL_MS + Math.max(0, ...Object.values(b).map((v) => v.delay));

    const tick = (now) => {
      const elapsed = now - start;
      const next = {};
      let done = true;
      for (const id of Object.keys(b)) {
        const { value: to, delay } = b[id];
        const fromV = a[id]?.value ?? 0;
        const local = Math.max(0, Math.min(1, (elapsed - delay) / REVEAL_MS));
        const v = fromV + (to - fromV) * easeOut(local);
        next[id] = { value: v, delay };
        if (local < 1) done = false;
      }
      setProgress(next);
      if (!done && elapsed < total + 60) raf.current = requestAnimationFrame(tick);
      else { from.current = b; }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reduced]);

  return progress;
}

/* --- component ------------------------------------------------------ */

export default function CrackedVessel({
  stage = 0,
  size = 260,
  variant = "auto",
  debug = false,
  revealOverride = null,
  title = "Vasija de barro agrietada",
  desc = "Una vasija de barro hecha a mano, con una grieta profunda por la que se ve la luz que arde dentro.",
}) {
  const raw = useId().replace(/:/g, "");
  const uid = (n) => `${raw}-${n}`;
  const s = Math.max(0, Math.min(4, stage));
  const t = s / 4;

  /* variant="auto" measures the RENDERED width, not the size prop, because
     CSS (max-width, flex, grid) routinely renders an element far smaller
     than the size it was asked for. First paint uses the prop, then the
     observer corrects it. */
  const svgRef = useRef(null);
  const [renderedW, setRenderedW] = useState(null);
  useEffect(() => {
    if (variant !== "auto" || !svgRef.current || typeof ResizeObserver === "undefined") return;
    const el = svgRef.current;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width;
      if (w) setRenderedW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [variant]);

  const effectiveW = renderedW ?? size;
  const compact = variant === "compact" || (variant === "auto" && effectiveW < 96);

  // Below ~96px the fine work turns to mud: drop grain, hairlines and the
  // outer branches, and open the primary wider to hold the silhouette.
  const shown = FRACTURES.filter((f) => {
    if (!compact) return true;
    return f.id === "primary" || f.id === "branch-left";
  });
  const holes = shown.filter((f) => !f.hair); // hairlines never pierce the wall

  const openOf = (f) => Math.max(0, Math.min(1, s - f.at));
  const widthK = (f) => {
    const base = 0.32 + openOf(f) * 0.68;
    return compact && f.id === "primary" ? base * 1.25 : base;
  };

  // A branch does not start until the primary has actually reached its
  // junction, then lags slightly behind the arriving fracture front.
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const targets = {};
  shown.forEach((f) => {
    targets[f.id] = {
      value: openOf(f) > 0 ? 1 : 0,
      delay: f.junction != null ? Math.round(REVEAL_MS * f.junction) + BRANCH_LAG_MS : 0,
    };
  });
  const reveal = useFractureReveal(targets, reduced);
  /* revealOverride pins the propagation front for capture and testing. It is
     not used by the app; the lab uses it to photograph real intermediate
     frames of this component rather than a recreation of it. */
  const progressOf = (f) =>
    revealOverride != null
      ? Math.max(0, Math.min(1,
          (revealOverride * (REVEAL_MS + (targets[f.id]?.delay ?? 0)) - (targets[f.id]?.delay ?? 0)) / REVEAL_MS))
      : reveal[f.id]?.value ?? 0;

  /* The revealed geometry for a fracture: centreline truncated at the current
     reveal front, with its width profile interpolated to match. Every
     consumer (the mask hole, the contact shadow, the bloom source, the debug
     overlay) derives from this one call so they can never disagree. */
  const geomOf = (f, widthScale = 1) => {
    const { pts, ws } = truncate(f.pts, f.w, progressOf(f));
    if (pts.length < 2) return null;
    return { d: sliver(pts, scale(ws, widthK(f) * widthScale)), pts, ws };
  };

  return (
    <svg
      ref={svgRef}
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
        <linearGradient id={uid("clay")} x1="14%" y1="6%" x2="86%" y2="94%">
          <stop offset="0%" stopColor="#c07b52" />
          <stop offset="30%" stopColor="#9d5836" />
          <stop offset="64%" stopColor="#6b3a24" />
          <stop offset="100%" stopColor="#3b2116" />
        </linearGradient>
        <linearGradient id={uid("clayDark")} x1="10%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#8a4d31" />
          <stop offset="100%" stopColor="#331c12" />
        </linearGradient>
        <linearGradient id={uid("rim")} x1="4%" y1="0%" x2="96%" y2="100%">
          <stop offset="0%" stopColor="#cf8a5f" />
          <stop offset="52%" stopColor="#9d5836" />
          <stop offset="100%" stopColor="#4a2818" />
        </linearGradient>
        {/* Hot centre placed behind the primary fracture's run, not at the
            geometric middle, so light seen through the gap is the bright
            part of the flame rather than its dim edge. */}
        <radialGradient id={uid("fire")} cx="42%" cy="44%" r="58%">
          <stop offset="0%" stopColor="#fff6e4" />
          <stop offset="22%" stopColor="#ffd398" />
          <stop offset="52%" stopColor="#f98f4c" />
          <stop offset="100%" stopColor="#b8431f" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id={uid("bounce")} cx="42%" cy="60%" r="46%">
          <stop offset="0%" stopColor="#ff9a5e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff9a5e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={uid("shadow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

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
        <filter id={uid("bloom")} x="-40%" y="-30%" width="180%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={uid("soft")} x="-30%" y="-20%" width="160%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>

        <clipPath id={uid("bodyClip")}>
          <path d={BODY} />
        </clipPath>

        {/* THE crack. Ceramic is painted through this mask; black subtracts.
            The subtracting shape is the TRUNCATED sliver, so the opening
            propagates from origin to tip. Hairlines are deliberately absent:
            they are surface damage and must not open the wall. */}
        <mask id={uid("crack")} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="360">
          <rect x="0" y="0" width="320" height="360" fill="black" />
          <path d={BODY} fill="white" />
          <path d={NECK} fill="white" />
          {holes.map((f) => {
            const g = geomOf(f);
            return g ? <path key={f.id} d={g.d} fill="black" /> : null;
          })}
        </mask>
      </defs>

      {/* 1. cast shadow */}
      <g id={uid("g-shadow")}>
        <ellipse cx="162" cy="330" rx="86" ry="15" fill={`url(#${uid("shadow")})`} />
      </g>

      {/* 2. handles, behind the body so it occludes their inner edge */}
      <g id={uid("g-handles")} fill={`url(#${uid("clayDark")})`}>
        <path d={HANDLE_L} />
        <path d={HANDLE_R} />
      </g>

      {/* 3. the fire, clipped to the silhouette. It burns before the first
             fracture opens: the treasure was always in the jar. */}
      <g id={uid("g-fire")} clipPath={`url(#${uid("bodyClip")})`}>
        <ellipse
          cx="146" cy="228" rx="112" ry="126"
          fill={`url(#${uid("fire")})`}
          className="vessel-fire"
          style={{ "--fire": 0.72 + t * 0.28, transition: "opacity 900ms var(--ease-out)" }}
        />
      </g>

      {/* 4. the ceramic, painted through the crack mask. Everything that must
             never appear inside an opening lives in here, because the mask
             removes it along with the clay. */}
      <g id={uid("g-body")} mask={`url(#${uid("crack")})`}>
        <path d={BODY} fill={`url(#${uid("clay")})`} />
        <path d={NECK} fill={`url(#${uid("clay")})`} />

        <g clipPath={`url(#${uid("bodyClip")})`}>
          {/* throwing rings */}
          {[150, 168, 186, 204, 222, 240, 258, 276, 294].map((y, i) => (
            <ellipse key={y} cx="160" cy={y}
                     rx={94 - Math.abs(y - 232) * 0.34} ry="3"
                     fill="none" stroke="#2d1810"
                     strokeWidth={i % 2 ? 1 : 1.5} opacity="0.14" />
          ))}
          {/* occlusion down the unlit side */}
          <path d="M 196 108 C 232 140, 254 216, 236 316 L 300 316 L 300 100 Z"
                fill="#2a1710" opacity="0.34" />
          {/* blurred sheen so it sits on the form rather than reading as a line */}
          <path d="M 134 124 C 108 146, 92 182, 90 224 C 89 254, 94 280, 104 300
                   L 126 292 C 116 268, 112 244, 113 222 C 116 184, 126 152, 148 130 Z"
                fill="#dc9a6d" opacity="0.22" filter={`url(#${uid("soft")})`} />
          {/* coral bounce from the fire onto nearby clay */}
          <ellipse cx="140" cy="228" rx="104" ry="112"
                   fill={`url(#${uid("bounce")})`}
                   style={{ opacity: t * 0.9, transition: "opacity 900ms var(--ease-out)" }} />
          {!compact ? (
            <path d={BODY} fill="#f0d2b8" opacity="0.10" filter={`url(#${uid("grain")})`} />
          ) : null}

          {/* hairlines: surface damage, drawn ON the clay, never piercing it */}
          <g id={uid("g-hairlines")}>
            {shown.filter((f) => f.hair).map((f) => {
              const { pts, ws } = truncate(f.pts, f.w, progressOf(f));
              if (pts.length < 2) return null;
              return (
                <path key={f.id} d={sliver(pts, scale(ws, widthK(f)))}
                      fill="#2a1610" opacity="0.62" />
              );
            })}
          </g>

          {/* One-sided contact shadow hugging the lower edge of each opening.
              It lives INSIDE the masked ceramic group, so the crack mask
              removes it wherever the wall is gone: it can touch the edge of
              an opening but can never fill it. */}
          <g id={uid("g-fracture-shadows")}>
            {holes.map((f) => {
              const { pts, ws } = truncate(f.pts, f.w, progressOf(f));
              if (pts.length < 2) return null;
              return (
                <path
                  key={f.id}
                  d={sliver(offsetLine(pts, 2.2), scale(ws, widthK(f) * 0.62))}
                  fill="#1d0f09"
                  opacity={0.42 * openOf(f)}
                />
              );
            })}
          </g>
        </g>
      </g>

      {/* 5. bloom. The sharp source is clipped to the silhouette FIRST, then
             the whole group is blurred, so spill comes from the blur rather
             than from geometry escaping the vessel. */}
      <g id={uid("g-bloom")}
         filter={`url(#${uid("bloom")})`}
         style={{ opacity: t, transition: "opacity 900ms var(--ease-out)" }}>
        <g clipPath={`url(#${uid("bodyClip")})`}>
          {holes.map((f) => {
            const g = geomOf(f, 1.35);
            return g ? <path key={f.id} d={g.d} fill="#ff8f4a" opacity="0.5" /> : null;
          })}
        </g>
      </g>

      {/* 6. neck, rim, dark interior */}
      <g id={uid("g-rim")}>
        <path d="M 118 76 C 118 61, 202 61, 202 76 C 202 87, 118 87, 118 76 Z"
              fill={`url(#${uid("rim")})`} />
        <ellipse cx="160" cy="73.5" rx="30" ry="8.5" fill="#22120c" />
        <ellipse cx="160" cy="73.5" rx="30" ry="8.5" fill="none"
                 stroke="#c9825a" strokeWidth="1.2" opacity="0.45" />
        <ellipse cx="160" cy="74" rx="24" ry="6" fill="#ffbe83"
                 style={{ opacity: Math.max(0, t - 0.45) * 1.2, transition: "opacity 900ms var(--ease-out)" }} />
        <path d="M 122 72 C 128 66, 192 66, 198 72" fill="none"
              stroke="#e8b184" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* debug overlay: silhouette, centrelines, unblurred bloom source */}
      {debug ? (
        <g id={uid("g-debug")} pointerEvents="none">
          <path d={BODY} fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.9" />
          <g>
            {shown.map((f) => (
              <g key={f.id}>
                <path d={polyline(f.pts)} fill="none" stroke="#00e5ff"
                      strokeWidth="0.8" strokeDasharray="3 2" opacity="0.9" />
                {f.pts.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="1.8"
                          fill={f.hair ? "#ffd400" : "#ff00d4"} />
                ))}
              </g>
            ))}
          </g>
          {/* unblurred bloom source, to confirm nothing escapes the silhouette */}
          <g opacity="0.95">
            {holes.map((f) => {
              const g = geomOf(f, 1.35);
              return g ? <path key={f.id} d={g.d} fill="none" stroke="#ffffff"
                               strokeWidth="0.6" /> : null;
            })}
          </g>
        </g>
      ) : null}
    </svg>
  );
}
