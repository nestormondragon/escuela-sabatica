import React from "react";
import CrackedVessel from "./CrackedVessel.jsx";

/* =====================================================================
   Motif — the centrepiece that grows as the reader sets each piece.

   Five images, all drawn from 1 and 2 Corinthians:
     mosaico  scattered tesserae converging into one figure (1 Cor. 1:10)
     cruz     a cross resolving out of fragments (1 Cor. 1:18)
     barro    a clay jar whose cracks are where the light escapes (2 Cor. 4:7)
     carta    a letter unrolling, its seal warming (2 Cor. 3:2)
     alba     dawn rising between Corinthian columns (1 Cor. 15)

   Architecture (load-bearing, do not regress):
   - Every ambient loop is a CSS class defined in index.css. Nothing here
     gates motion on a JS visibility flag, so animation starts on mount,
     restarts on remount, and pauses/resumes with the tab automatically.
   - Stage-driven values (0..4) ride inline `transition`, which the global
     prefers-reduced-motion rule zeroes along with the keyframes.
   - SVG transforms use transform-box: fill-box with percentage origins,
     one transform per keyframe (iOS Safari requirement).
   ===================================================================== */

const EASE = "1100ms cubic-bezier(0.23, 1, 0.32, 1)";
const clamp = (n) => Math.max(0, Math.min(4, n));

/* ---------------------------------------------------------------------
   Shape primitives
   ---------------------------------------------------------------------
   A stroke cannot taper: stroke-width is constant along a path. A real
   fracture is widest where it opened first and narrows to nothing at the
   tip, so cracks here are FILLED slivers generated from a centreline plus
   a per-point width. Same reason the edges are polygonal rather than
   smoothed: ceramic breaks in straight runs with sudden direction changes.

   sliver() walks the centreline, computes the normal at each point from
   the neighbouring segment direction, offsets both sides by half the
   local width, and closes the loop back along the other side. */
function sliver(points, widths) {
  const n = points.length;
  const a = [];
  const b = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = points[i];
    const [px, py] = points[Math.max(0, i - 1)];
    const [nx2, ny2] = points[Math.min(n - 1, i + 1)];
    let dx = nx2 - px;
    let dy = ny2 - py;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    const w = (widths[i] ?? 1) / 2;
    a.push([x - dy * w, y + dx * w]);
    b.push([x + dy * w, y - dx * w]);
  }
  const fmt = (p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  return `M ${a.map(fmt).join(" L ")} L ${b.reverse().map(fmt).join(" L ")} Z`;
}

/* Scale a width profile so a crack can open progressively. */
const widen = (ws, k) => ws.map((w) => w * k);

/* Deterministic pseudo-random in [-1, 1] from an integer seed. Mosaic
   tesserae are hand-cut, so every tile needs its own irregularity, but it
   must be stable across renders or the wall would shimmer on every paint. */
function jitter(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/* A single cut tessera: a quadrilateral whose corners are nudged off true so
   no two tiles are identical, the way a real mosaic reads up close. */
function tessera(x, y, w, h, seed) {
  const j = (n, amt) => jitter(seed * 7 + n) * amt;
  const p = [
    [x + j(1, 0.9), y + j(2, 0.9)],
    [x + w + j(3, 0.9), y + j(4, 0.9)],
    [x + w + j(5, 0.9), y + h + j(6, 0.9)],
    [x + j(7, 0.9), y + h + j(8, 0.9)],
  ];
  return `M ${p.map((q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(" L ")} Z`;
}

/* ---------------------------------------------------------------- mosaico */
/* Tesserae start scattered and dim. As stages advance they slide onto the
   grid, warm to clay, and resolve into a cross standing in the centre. */
function Mosaico({ s }) {
  const TILES = [
    [1, 0, -14, -9], [2, 0, 12, -11], [0, 1, -16, 4], [1, 1, -5, -4],
    [2, 1, 6, -6], [3, 1, 15, 7], [1, 2, -8, 9], [2, 2, 9, 10],
    [0, 3, -15, -8], [1, 3, -4, 12], [2, 3, 5, 11], [3, 3, 16, -5],
    [1, 4, -11, 8], [2, 4, 10, 9],
  ];
  const CROSS = new Set([0, 1, 3, 4, 6, 7, 9, 10, 12, 13]);
  const t = s / 4;
  const cell = 21;
  const ox = 29;
  const oy = 15;

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <radialGradient id="mo-lume" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="76" r="66" fill="url(#mo-lume)"
              style={{ opacity: 0.25 + t * 0.75, transition: `opacity ${EASE}` }} />

      {TILES.map(([cx, cy, dx, dy], i) => {
        const inFigure = CROSS.has(i);
        const arrive = inFigure ? Math.max(0, (s - 1) / 3) : Math.min(1, s / 2);
        const x = ox + cx * cell + dx * (1 - arrive);
        const y = oy + cy * cell + dy * (1 - arrive);
        const lit = inFigure ? arrive : arrive * 0.42;
        return (
          <rect
            key={i}
            x={x} y={y} width={cell - 4} height={cell - 4} rx="1.5"
            className={s >= 4 && inFigure ? "tessera glowing" : "tessera"}
            style={{
              fill: `color-mix(in srgb, var(--clay) ${18 + lit * 74}%, var(--bg-2))`,
              stroke: "var(--line-2)",
              strokeWidth: 0.6,
              opacity: 0.4 + arrive * 0.6,
              transform: `rotate(${(1 - arrive) * (i % 2 ? 7 : -7)}deg)`,
              transformBox: "fill-box",
              transformOrigin: "50% 50%",
              transition: `transform ${EASE}, opacity ${EASE}, fill ${EASE}`,
              animationDelay: `${(i % 5) * 0.32}s`,
            }}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------- cruz */
function Cruz({ s }) {
  const t = s / 4;
  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <radialGradient id="cr-halo" cx="50%" cy="44%" r="50%">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="72" r="60" fill="url(#cr-halo)"
              className={s >= 3 ? "halo" : undefined}
              style={{ opacity: t * 0.95, transition: `opacity ${EASE}` }} />

      <rect x="73" y="24" width="14" height="104" rx="1"
            style={{
              fill: `color-mix(in srgb, var(--clay) ${26 + t * 70}%, var(--bg-2))`,
              transform: `scaleY(${0.16 + t * 0.84})`,
              transformBox: "fill-box", transformOrigin: "50% 34%",
              transition: `transform ${EASE}, fill ${EASE}`,
            }} />
      <rect x="38" y="56" width="84" height="13" rx="1"
            style={{
              fill: `color-mix(in srgb, var(--clay) ${26 + t * 70}%, var(--bg-2))`,
              transform: `scaleX(${0.12 + Math.max(0, (s - 0.5) / 3.5) * 0.88})`,
              transformBox: "fill-box", transformOrigin: "50% 50%",
              transition: `transform ${EASE}, fill ${EASE}`,
            }} />

      {s >= 2 &&
        [0, 1, 2].map((i) => (
          <circle key={i} className="ember" r="1.9"
                  cx={62 + i * 18} cy={116}
                  style={{ fill: "var(--clay-hi)", animationDelay: `${i * 1.15}s` }} />
        ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ barro */
/* The clay jar is the quarter's one piece of narrative artwork, so it lives
   in its own component with its own construction notes (docs/SVG-DESIGN.md).
   Everything else here is a supporting scene. */
function Barro({ s, size }) {
  return <CrackedVessel stage={s} size={size} variant="auto" />;
}

/* ------------------------------------------------------------------ carta */
function Carta({ s }) {
  const t = s / 4;
  const LINES = [
    [56, 62, 46], [56, 71, 52], [56, 80, 38],
    [56, 89, 50], [56, 98, 44], [56, 107, 30],
  ];
  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <radialGradient id="ca-lume" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="82" r="60" fill="url(#ca-lume)"
              style={{ opacity: 0.3 + t * 0.7, transition: `opacity ${EASE}` }} />

      <rect x="48" y="44" width="64" height="80" rx="1.5"
            style={{
              fill: "var(--surface-3)", stroke: "var(--line-2)", strokeWidth: 1.3,
              transform: `scaleY(${0.2 + t * 0.8})`,
              transformBox: "fill-box", transformOrigin: "50% 0%",
              transition: `transform ${EASE}`,
            }} />

      {LINES.map(([x, y, w], i) => {
        const shown = Math.max(0, Math.min(1, s - i * 0.62));
        return (
          <rect key={i} x={x} y={y} height="2.4" rx="1.2" width={w}
                style={{
                  fill: "var(--muted)",
                  opacity: shown * 0.85,
                  transform: `scaleX(${shown})`,
                  transformBox: "fill-box", transformOrigin: "0% 50%",
                  transition: `transform ${EASE}, opacity ${EASE}`,
                }} />
        );
      })}

      <circle cx="80" cy="124" r="11"
              className={s >= 4 ? "halo" : undefined}
              style={{
                fill: `color-mix(in srgb, var(--clay) ${34 + t * 66}%, var(--bg-2))`,
                stroke: "var(--clay-deep)", strokeWidth: 1.2,
                transition: `fill ${EASE}`,
              }} />
      <path d="M75 124 L79 128 L86 120" fill="none" strokeLinecap="round" strokeLinejoin="round"
            style={{
              stroke: "var(--clay-ink)", strokeWidth: 1.8,
              opacity: s >= 4 ? 1 : 0, transition: `opacity ${EASE}`,
            }} />
    </svg>
  );
}

/* ------------------------------------------------------------------- alba */
function Alba({ s }) {
  const t = s / 4;
  const COLS = [30, 52, 108, 130];
  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <radialGradient id="al-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--clay-hi)" stopOpacity="1" />
          <stop offset="60%" stopColor="var(--clay)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {[[40, 34], [66, 24], [96, 30], [122, 40], [54, 48], [110, 52]].map(([x, y], i) => (
        <circle key={i} className="star" cx={x} cy={y} r="1.3"
                style={{
                  fill: "var(--text-soft)",
                  opacity: Math.max(0, 1 - t * 1.5) * 0.8,
                  transition: `opacity ${EASE}`,
                  animationDelay: `${i * 0.7}s`,
                }} />
      ))}

      <circle cx="80" cy={128 - t * 46} r="30" fill="url(#al-sun)"
              className={s >= 3 ? "halo" : undefined}
              style={{ opacity: 0.2 + t * 0.8, transition: `opacity ${EASE}` }} />

      {COLS.map((x, i) => (
        <g key={i}>
          <rect x={x} y="56" width="13" height="62"
                style={{
                  fill: `color-mix(in srgb, var(--surface-3) ${100 - t * 26}%, var(--clay))`,
                  transition: `fill ${EASE}`,
                }} />
          <rect x={x - 3} y="52" width="19" height="5" rx="1" style={{ fill: "var(--surface-3)" }} />
          <rect x={x - 3} y="117" width="19" height="4" rx="1" style={{ fill: "var(--surface-3)" }} />
        </g>
      ))}

      <rect x="10" y="120" width="140" height="2" rx="1" style={{ fill: "var(--line-2)" }} />
    </svg>
  );
}

const KINDS = { mosaico: Mosaico, cruz: Cruz, barro: Barro, carta: Carta, alba: Alba };

export default function Motif({ kind, stageIndex = 0, size = 220 }) {
  const Cmp = KINDS[kind] || Mosaico;
  return (
    <div style={{ width: size, maxWidth: "100%", margin: "0 auto", lineHeight: 0 }}>
      {/* size is passed through so artwork can drop detail at small sizes */}
      <Cmp s={clamp(stageIndex)} size={size} />
    </div>
  );
}
