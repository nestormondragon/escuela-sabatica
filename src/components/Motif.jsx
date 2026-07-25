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
function Barro({ s, size, arc }) {
  return <CrackedVessel stage={s} size={size} variant="auto" arc={arc} />;
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

/* ---------------------------------------------------------------- retrato */
/* 1 Corintios 13 read as a portrait rather than a poem: a blank canvas, a
   charcoal contour, shadows, colour, and finally a face in full light.
   The face is deliberately icon-like rather than a likeness. An abstracted
   contour is both achievable and historically apt for this setting; a
   half-attempted realistic portrait would read as a mistake. */
function Retrato({ s }) {
  const t = s / 4;
  const charcoal = Math.max(0, Math.min(1, s));           // 0 -> 1 across stage 1
  const shadow = Math.max(0, Math.min(1, s - 1));
  const colour = Math.max(0, Math.min(1, s - 2));
  const light = Math.max(0, Math.min(1, s - 3));

  /* Three-quarter view, asymmetric on purpose. A symmetrical head-and-
     shoulders with arc eyes and a curved mouth is the generic user-avatar
     placeholder, which is what the first attempt looked like. There are no
     drawn features here at all: the face is built from planes of light and
     shadow, the way a painter blocks one in. */
  const HEAD = "M 84 46 C 100 47, 108 60, 107 77 C 106 92, 99 106, 87 111 " +
               "C 74 116, 62 108, 58 94 C 54 78, 60 58, 72 50 C 76 47, 80 46, 84 46 Z";
  // Closed for the fill. Its start/end tuck up behind the head so the closing
  // segment is hidden; NECK_LINE is the open version used for the charcoal,
  // because stroking a closed path drew a box across the throat.
  const NECK_SH = "M 78 100 C 78 116, 76 121, 72 124 C 58 130, 44 138, 40 152 " +
                  "L 122 152 C 118 136, 104 128, 94 123 C 89 120, 88 114, 88 100 Z";
  const NECK_LINE = "M 76 112 C 75 118, 73 122, 70 125 C 57 131, 44 138, 40 152 " +
                    "M 122 152 C 118 136, 104 128, 94 123 C 90 120, 89 116, 89 111";
  // planes: the shadowed side of the face and the hollow under the cheek
  const PLANE_SHADOW = "M 87 111 C 99 106, 106 92, 107 77 C 108 60, 100 47, 84 46 " +
                       "C 92 58, 95 76, 92 92 C 90 101, 89 107, 87 111 Z";
  const PLANE_CHEEK = "M 66 84 C 72 92, 80 96, 88 94 C 84 102, 74 104, 66 98 Z";

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <linearGradient id="rt-skin" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#d9a077" />
          <stop offset="55%" stopColor="#b3714b" />
          <stop offset="100%" stopColor="#6d4029" />
        </linearGradient>
        <radialGradient id="rt-halo" cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor="var(--clay-hi)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
        {/* paint stays on the canvas; without this the shoulders run off it */}
        <clipPath id="rt-canvas">
          <rect x="26" y="20" width="108" height="132" rx="1" />
        </clipPath>
      </defs>

      {/* the canvas: present from the first stage, because the lesson opens
          on an empty one */}
      <rect x="26" y="20" width="108" height="132" rx="1"
            fill="var(--surface-3)" stroke="var(--line-2)" strokeWidth="1.4" />
      {/* weave, so it reads as canvas rather than paper */}
      <g opacity="0.16">
        {[36, 48, 60, 72, 84, 96, 108, 120, 132, 144].map((y) => (
          <line key={y} x1="27" y1={y} x2="133" y2={y} stroke="#2d1810" strokeWidth="0.5" />
        ))}
      </g>

      <circle cx="80" cy="70" r="52" fill="url(#rt-halo)"
              className={s >= 4 ? "halo" : undefined}
              style={{ opacity: light, transition: `opacity ${EASE}` }} />

      {/* colour laid in, clipped to the canvas so nothing spills past it */}
      <g clipPath="url(#rt-canvas)"
         style={{ opacity: colour, transition: `opacity ${EASE}` }}>
        <path d={NECK_SH} fill="url(#rt-skin)" opacity="0.92" />
        <path d={HEAD} fill="url(#rt-skin)" />
      </g>

      {/* the shadow planes: this is what makes it a modelled head rather than
          a flat symbol, and they arrive before the colour does */}
      <g clipPath="url(#rt-canvas)"
         style={{ opacity: shadow, transition: `opacity ${EASE}` }}>
        <path d={PLANE_SHADOW} fill="#371d12" opacity="0.5" />
        <path d={PLANE_CHEEK} fill="#371d12" opacity="0.34" />
        <path d="M 94 123 C 104 128, 118 136, 122 152 L 96 152 Z"
              fill="#371d12" opacity="0.35" />
      </g>

      {/* the charcoal underdrawing: contour and the two axes a painter lays
          down first. No eyes, no mouth: those would make it a cartoon. */}
      <g fill="none" stroke="#241309" strokeLinecap="round" clipPath="url(#rt-canvas)"
         style={{ opacity: 0.3 + charcoal * 0.5, transition: `opacity ${EASE}` }}>
        <path d={HEAD} strokeWidth="1.5" />
        <path d={NECK_LINE} strokeWidth="1.3" opacity="0.8" />
        {/* brow line and centre line, the painter's construction marks */}
        <path d="M 62 76 C 74 71, 92 70, 104 74" strokeWidth="0.9" opacity="0.5" />
        <path d="M 78 52 C 84 68, 85 86, 82 104" strokeWidth="0.9" opacity="0.45" />
      </g>

      {/* the light finally falling on the lit plane */}
      <g clipPath="url(#rt-canvas)"
         style={{ opacity: light, transition: `opacity ${EASE}` }}>
        <path d="M 72 50 C 62 58, 57 74, 59 90 C 63 78, 68 62, 78 53 Z"
              fill="#f0c49c" opacity="0.55" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- siembra */
/* 2 Corintios 8 and 9: a closed fist opens, the grain falls, the furrow joins
   others, and the sowing is complete. The hand is a simplified silhouette
   read from the side, which is legible at small sizes where an anatomical
   hand would turn to mud. */
function Siembra({ s }) {
  const open = Math.max(0, Math.min(1, s));        // fist -> open palm
  const falling = Math.max(0, Math.min(1, s - 1)); // grain leaves the hand
  const furrow = Math.max(0, Math.min(1, s - 2));  // ground receives it
  const sprout = Math.max(0, Math.min(1, s - 3));  // it comes up

  const SEEDS = [[74, 74], [86, 78], [80, 86], [92, 88], [68, 84]];

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <linearGradient id="sb-hand" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#c98a63" />
          <stop offset="60%" stopColor="#9a5c3c" />
          <stop offset="100%" stopColor="#5c3323" />
        </linearGradient>
        <radialGradient id="sb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="86" r="62" fill="url(#sb-glow)"
              style={{ opacity: 0.3 + sprout * 0.7, transition: `opacity ${EASE}` }} />

      {/* the hand. Closed, the fingers curl over the palm; open, they fall
          away and the grain is free to go. */}
      <g style={{ transform: `rotate(${-8 + open * 8}deg)`, transformBox: "fill-box",
                  transformOrigin: "50% 50%", transition: `transform ${EASE}` }}>
        <path d="M 52 58 C 46 62, 44 72, 48 80 C 52 88, 62 92, 74 92
                 C 86 92, 96 88, 100 80 C 104 72, 102 62, 96 58 Z"
              fill="url(#sb-hand)" />
        {/* fingers: curled in at first, opening outward */}
        {[0, 1, 2, 3].map((i) => (
          <path key={i}
                d={`M ${58 + i * 11} 60 C ${56 + i * 11} ${70 - open * 8}, ${58 + i * 11} ${80 - open * 14}, ${64 + i * 11} ${82 - open * 16}`}
                fill="none" stroke="#5c3323" strokeWidth="3.4" strokeLinecap="round"
                style={{ opacity: 0.85, transition: `d ${EASE}` }} />
        ))}
      </g>

      {/* grain: held tight, then falling */}
      {SEEDS.map(([x, y], i) => (
        <ellipse key={i}
                 cx={x + (i - 2) * falling * 5}
                 cy={y + falling * (34 + i * 6)}
                 rx="2.6" ry="3.6"
                 style={{
                   fill: "var(--clay-hi)",
                   opacity: 0.35 + open * 0.65,
                   transform: `rotate(${i * 24}deg)`,
                   transformBox: "fill-box", transformOrigin: "50% 50%",
                   transition: `cx ${EASE}, cy ${EASE}, opacity ${EASE}`,
                 }} />
      ))}

      {/* the furrow, and the neighbouring furrows it joins */}
      <g style={{ opacity: furrow, transition: `opacity ${EASE}` }}>
        <path d="M 24 132 C 52 124, 108 124, 136 132" fill="none"
              stroke="#4a2a1c" strokeWidth="5" strokeLinecap="round" />
        <path d="M 30 142 C 56 135, 104 135, 130 142" fill="none"
              stroke="#3a2015" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* what comes up is not the sower's doing, so it arrives last */}
      <g style={{ opacity: sprout, transition: `opacity ${EASE}` }}>
        {[52, 80, 108].map((x, i) => (
          <g key={x} className="sway" style={{ animationDelay: `${i * 0.6}s` }}>
            <path d={`M ${x} 130 L ${x} ${112 - i % 2 * 4}`} fill="none"
                  stroke="var(--clay)" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx={x - 5} cy={116 - (i % 2) * 4} rx="5" ry="3"
                     fill="var(--clay)" opacity="0.85" />
            <ellipse cx={x + 5} cy={112 - (i % 2) * 4} rx="5" ry="3"
                     fill="var(--clay-hi)" opacity="0.75" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- muro */
/* 2 Corintios 10:4. The stronghold is the reader's own defence, so it is
   dismantled course by course until only bedrock is left, and the bedrock
   turns out to be the refuge. Blocks leave from the top down, which is how
   a wall actually comes apart. */
function Muro({ s }) {
  const t = s / 4;
  // eight blocks in four courses; higher courses fall first
  const BLOCKS = [
    [44, 44, 34, 18, 3], [80, 44, 34, 18, 3],
    [36, 64, 30, 18, 2], [68, 64, 30, 18, 2], [100, 64, 26, 18, 2],
    [44, 84, 34, 18, 1], [80, 84, 34, 18, 1],
  ];

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <linearGradient id="mu-stone" x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#7c8087" />
          <stop offset="60%" stopColor="#4e535b" />
          <stop offset="100%" stopColor="#2c3036" />
        </linearGradient>
        <linearGradient id="mu-rock" x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="#c07b52" />
          <stop offset="55%" stopColor="#8a4d31" />
          <stop offset="100%" stopColor="#43241a" />
        </linearGradient>
        <radialGradient id="mu-refuge" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="var(--clay-hi)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the refuge behind: only visible once the wall stops hiding it */}
      <circle cx="80" cy="104" r="56" fill="url(#mu-refuge)"
              className={s >= 4 ? "halo" : undefined}
              style={{ opacity: Math.max(0, (s - 2) / 2), transition: `opacity ${EASE}` }} />

      {/* the courses of the wall, taken down from the top */}
      {BLOCKS.map(([x, y, w, h, course], i) => {
        // course 3 goes at stage 1, course 2 at stage 2, course 1 at stage 3
        const gone = Math.max(0, Math.min(1, s - (4 - course)));
        return (
          <g key={i} style={{
            opacity: 1 - gone,
            transform: `translateY(${gone * -14}px) rotate(${gone * (i % 2 ? 9 : -9)}deg)`,
            transformBox: "fill-box", transformOrigin: "50% 50%",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}>
            <rect x={x} y={y} width={w} height={h} rx="1.5"
                  fill="url(#mu-stone)" stroke="#20242a" strokeWidth="1" />
            <line x1={x + 3} y1={y + 4} x2={x + w - 4} y2={y + 4}
                  stroke="#9aa0a8" strokeWidth="0.8" opacity="0.28" />
          </g>
        );
      })}

      {/* the first crack in the defence, before any block moves */}
      <path d="M 78 44 L 74 62 L 82 78 L 76 102"
            fill="none" stroke="#1a1d22" strokeWidth="1.8" strokeLinecap="round"
            style={{ opacity: s >= 1 && s < 3 ? 1 : 0, transition: `opacity ${EASE}` }} />

      {/* bedrock: always there, revealed as the wall comes off it */}
      <path d="M 30 128 C 40 108, 58 100, 80 100 C 102 100, 120 108, 130 128 Z"
            fill="url(#mu-rock)"
            style={{ opacity: 0.35 + t * 0.65, transition: `opacity ${EASE}` }} />
      <path d="M 30 128 C 40 108, 58 100, 80 100" fill="none"
            stroke="#d09a72" strokeWidth="1.6" strokeLinecap="round"
            style={{ opacity: Math.max(0, (s - 2) / 2) * 0.7, transition: `opacity ${EASE}` }} />

      {/* ground line */}
      <rect x="18" y="128" width="124" height="2.5" rx="1.2" fill="var(--line-2)" />
    </svg>
  );
}

const KINDS = {
  mosaico: Mosaico, cruz: Cruz, barro: Barro, carta: Carta, alba: Alba,
  retrato: Retrato, siembra: Siembra, muro: Muro,
};

export default function Motif({ kind, stageIndex = 0, size = 220, arc = "reveal" }) {
  const Cmp = KINDS[kind] || Mosaico;
  return (
    <div style={{ width: size, maxWidth: "100%", margin: "0 auto", lineHeight: 0 }}>
      {/* size is passed through so artwork can drop detail at small sizes */}
      <Cmp s={clamp(stageIndex)} size={size} arc={arc} />
    </div>
  );
}
