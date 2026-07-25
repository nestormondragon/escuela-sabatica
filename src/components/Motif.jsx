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
/* Real tesserae: hand-cut stone set in grout, each tile slightly off-true,
   each with its own tone. The figure that resolves out of the field is a
   cross (1 Cor. 1:10, one image out of many fragments).

   v1 was rounded rectangles of one colour, which read as a loading grid.
   The difference here is grout showing between the pieces, a bevel on every
   tile so it has thickness, and per-tile colour variation from the seeded
   jitter, which is what a mosaic actually looks like up close. */
function Mosaico({ s }) {
  const t = s / 4;
  const COLS = 7;
  const ROWS = 8;
  const CELL = 15.5;
  const GAP = 1.9;
  const OX = 80 - (COLS * CELL) / 2;
  const OY = 78 - (ROWS * CELL) / 2;

  // the Latin cross carried by the figure tiles
  const inFigure = (c, r) => (c === 3 && r >= 1 && r <= 6) || (r === 3 && c >= 1 && c <= 5);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      const fig = inFigure(c, r);
      // field tiles settle early, the figure resolves last
      const arrive = fig
        ? Math.max(0, Math.min(1, (s - 1.2) / 2.2))
        : Math.max(0, Math.min(1, s / 1.8));
      const dx = jitter(i * 3 + 1) * 22 * (1 - arrive);
      const dy = jitter(i * 3 + 2) * 22 * (1 - arrive);
      const x = OX + c * CELL + dx;
      const y = OY + r * CELL + dy;
      // stone tone: the field is cool and quiet, the figure warms to clay
      const warm = fig ? 26 + arrive * 68 : 10 + arrive * 16;
      const shade = 0.82 + jitter(i * 3 + 3) * 0.18;
      tiles.push({ i, x, y, fig, arrive, warm, shade });
    }
  }

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <radialGradient id="mo-lume" cx="50%" cy="46%" r="54%">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
        {/* grout: the dark bed the tesserae are pressed into */}
        <linearGradient id="mo-grout" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#16181d" />
          <stop offset="100%" stopColor="#0e1014" />
        </linearGradient>
      </defs>

      {/* the mortar bed, sized to the finished panel */}
      <rect x={OX - 3} y={OY - 3} width={COLS * CELL + 6} height={ROWS * CELL + 6}
            rx="2" fill="url(#mo-grout)"
            style={{ opacity: 0.42 + t * 0.5, transition: `opacity ${EASE}` }} />

      <circle cx="80" cy="78" r="68" fill="url(#mo-lume)"
              style={{ opacity: 0.2 + t * 0.8, transition: `opacity ${EASE}` }} />

      {tiles.map(({ i, x, y, fig, arrive, warm, shade }) => {
        const w = CELL - GAP;
        return (
          <g key={i}
             className={s >= 4 && fig ? "tessera glowing" : "tessera"}
             style={{
               opacity: 0.3 + arrive * 0.7,
               transform: `rotate(${jitter(i * 5) * (1 - arrive) * 14 + jitter(i * 7) * 2.5}deg)`,
               transformBox: "fill-box", transformOrigin: "50% 50%",
               transition: `opacity ${EASE}, transform ${EASE}`,
               animationDelay: `${(i % 6) * 0.3}s`,
             }}>
            {/* the cut face */}
            <path d={tessera(x, y, w, w, i)}
                  style={{
                    fill: `color-mix(in srgb, var(--clay) ${warm}%, #313640)`,
                    filter: `brightness(${shade.toFixed(2)})`,
                    transition: `fill ${EASE}`,
                  }} />
            {/* bevel: light catches the top-left cut, shadow sits bottom-right,
                which is what gives each piece its thickness */}
            <path d={`M ${x + 0.6} ${y + w - 0.6} L ${x + 0.6} ${y + 0.6} L ${x + w - 0.6} ${y + 0.6}`}
                  fill="none" stroke="#ffffff" strokeWidth="0.9" opacity={0.16 * arrive} />
            <path d={`M ${x + w - 0.6} ${y + 0.6} L ${x + w - 0.6} ${y + w - 0.6} L ${x + 0.6} ${y + w - 0.6}`}
                  fill="none" stroke="#000000" strokeWidth="0.9" opacity={0.28 * arrive} />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------- cruz */
/* Rough-hewn timber, not a symbol. Two squared beams with visible grain, end
   grain on the cut faces, a lap joint at the crossing and a lashing over it.

   v1 was a flat plus sign in the accent colour, which read as a pharmacy
   icon. The fix is material (grain, tone, end grain), depth (a side face on
   each beam) and asymmetry (the timber is not machined). */
function Cruz({ s }) {
  const t = s / 4;
  const rise = Math.max(0, Math.min(1, s / 2.2));        // upright goes up first
  const cross = Math.max(0, Math.min(1, (s - 1.4) / 2)); // then the crossbeam
  const lit = Math.max(0, Math.min(1, (s - 2.6) / 1.4)); // then the light on it

  const GRAIN = [0.18, 0.34, 0.52, 0.68, 0.84];

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <linearGradient id="cz-wood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a5a3a" />
          <stop offset="42%" stopColor="#6b422a" />
          <stop offset="100%" stopColor="#3a2116" />
        </linearGradient>
        <linearGradient id="cz-wood-h" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a5a3a" />
          <stop offset="45%" stopColor="#6b422a" />
          <stop offset="100%" stopColor="#3a2116" />
        </linearGradient>
        <radialGradient id="cz-halo" cx="50%" cy="40%" r="52%">
          <stop offset="0%" stopColor="var(--clay-hi)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="66" r="62" fill="url(#cz-halo)"
              className={s >= 3 ? "halo" : undefined}
              style={{ opacity: lit * 0.95, transition: `opacity ${EASE}` }} />

      {/* The beam starts felled, lying on the ground ("madero desnudo"), and
          is raised on its foot. Rotating rather than scaling means stage 0
          shows a real timber instead of a stub of one. */}
      <g style={{
        transform: `rotate(${(1 - rise) * -82}deg)`,
        transformBox: "view-box", transformOrigin: "80px 140px",
        transition: `transform ${EASE}`,
      }}>
        {/* side face, giving the beam depth */}
        <path d="M 88 30 L 93 33 L 93 141 L 88 140 Z" fill="#2e1a11" />
        {/* front face */}
        <rect x="71" y="30" width="17" height="110" fill="url(#cz-wood)" />
        {/* end grain on the top cut */}
        <path d="M 71 30 L 88 30 L 93 33 L 76 33 Z" fill="#8a5a3a" opacity="0.85" />
        {/* grain */}
        {GRAIN.map((g, i) => (
          <path key={i}
                d={`M ${72 + g * 15} 32 C ${71 + g * 15} 60, ${73 + g * 15} 96, ${72 + g * 15} 138`}
                fill="none" stroke="#2a170f" strokeWidth={i % 2 ? 0.5 : 0.8} opacity="0.32" />
        ))}
      </g>

      {/* crossbeam: carried up and laid across, so it grows from the centre */}
      <g style={{
        transform: `scaleX(${0.08 + cross * 0.92})`,
        transformBox: "view-box", transformOrigin: "80px 62px",
        transition: `transform ${EASE}`,
      }}>
        <path d="M 34 70 L 37 74 L 126 74 L 123 70 Z" fill="#2e1a11" />
        <rect x="34" y="54" width="92" height="16" fill="url(#cz-wood-h)" />
        <path d="M 34 54 L 34 70 L 37 74 L 37 58 Z" fill="#7d5233" opacity="0.8" />
        {GRAIN.map((g, i) => (
          <path key={i}
                d={`M 36 ${55.5 + g * 13} C 62 ${54.5 + g * 13}, 98 ${56.5 + g * 13}, 124 ${55.5 + g * 13}`}
                fill="none" stroke="#2a170f" strokeWidth={i % 2 ? 0.5 : 0.8} opacity="0.3" />
        ))}
      </g>

      {/* lashing over the lap joint, once both beams are there */}
      <g style={{ opacity: cross, transition: `opacity ${EASE}` }}>
        {[57.5, 62, 66.5].map((y, i) => (
          <g key={y}>
            <path d={`M ${69 - i * 0.5} ${y} C 74 ${y - 1.3}, 86 ${y - 1.3}, ${91 + i * 0.5} ${y}`}
                  fill="none" stroke="#4a3320" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
            <path d={`M ${69 - i * 0.5} ${y - 0.5} C 74 ${y - 1.8}, 86 ${y - 1.8}, ${91 + i * 0.5} ${y - 0.5}`}
                  fill="none" stroke="#8a6a44" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
          </g>
        ))}
      </g>

      {/* motes lifting off the timber once the light is on it */}
      {s >= 3 &&
        [0, 1, 2].map((i) => (
          <circle key={i} className="ember" r="1.1" cx={62 + i * 17} cy={124}
                  style={{ fill: "var(--clay-hi)", opacity: 0.7,
                           animationDelay: `${i * 1.35}s` }} />
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
/* A papyrus sheet: horizontal fibre, a curling lower edge, ink that behaves
   like writing rather than tidy bars, and a wax seal with a pressed
   impression and real thickness (2 Cor. 3:2, "ustedes son nuestra carta").

   v1 was a grey rectangle with even grey bars and a flat disc. */
function Carta({ s }) {
  const t = s / 4;
  const unroll = Math.max(0, Math.min(1, s / 1.6));
  const sealed = Math.max(0, Math.min(1, (s - 3) / 1));

  /* Ink laid down line by line, broken into words of uneven length so it
     reads as writing. Deterministic, so the letter never reshuffles. */
  const LINES = [];
  for (let i = 0; i < 7; i++) {
    const y = 56 + i * 9.5;
    const words = [];
    let x = 52;
    let k = 0;
    while (x < 104 && k < 6) {
      const w = 5 + Math.abs(jitter(i * 11 + k)) * 12;
      if (x + w > 106) break;
      words.push([x, w]);
      x += w + 2.6;
      k++;
    }
    LINES.push({ y, words, at: i * 0.42 });
  }

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <linearGradient id="ca-pap" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#d8c39a" />
          <stop offset="55%" stopColor="#c2a878" />
          <stop offset="100%" stopColor="#9c8154" />
        </linearGradient>
        <linearGradient id="ca-curl" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a7047" />
          <stop offset="100%" stopColor="#c2a878" />
        </linearGradient>
        <radialGradient id="ca-wax" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#e0785c" />
          <stop offset="70%" stopColor="#a8331f" />
          <stop offset="100%" stopColor="#6b1f12" />
        </radialGradient>
        <radialGradient id="ca-lume" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ca-sheet">
          <path d="M 44 30 L 116 30 L 116 118 C 100 124, 60 124, 44 118 Z" />
        </clipPath>
      </defs>

      <circle cx="80" cy="76" r="64" fill="url(#ca-lume)"
              style={{ opacity: 0.28 + t * 0.72, transition: `opacity ${EASE}` }} />

      {/* the sheet, unrolling downward from the top edge */}
      <g style={{
        transform: `scaleY(${0.22 + unroll * 0.78})`,
        transformBox: "view-box", transformOrigin: "80px 30px",
        transition: `transform ${EASE}`,
      }}>
        <path d="M 44 30 L 116 30 L 116 118 C 100 124, 60 124, 44 118 Z"
              fill="url(#ca-pap)" />
        <g clipPath="url(#ca-sheet)">
          {/* papyrus is laid in strips, so the fibre runs both ways */}
          {[36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116].map((y) => (
            <line key={y} x1="44" y1={y} x2="116" y2={y}
                  stroke="#8a7047" strokeWidth="0.55" opacity="0.28" />
          ))}
          {[52, 62, 72, 82, 92, 102, 112].map((x) => (
            <line key={x} x1={x} y1="30" x2={x} y2="124"
                  stroke="#8a7047" strokeWidth="0.4" opacity="0.14" />
          ))}
          {/* the sheet curls, so the lower edge falls into shadow */}
          <path d="M 44 108 C 60 116, 100 116, 116 108 L 116 124 L 44 124 Z"
                fill="url(#ca-curl)" opacity="0.5" />
        </g>

        {/* the writing */}
        {LINES.map((ln, i) => {
          const shown = Math.max(0, Math.min(1, s - ln.at * 0.9));
          return (
            <g key={i} style={{ opacity: shown, transition: `opacity ${EASE}` }}>
              {ln.words.map(([x, w], k) => (
                <rect key={k} x={x} y={ln.y} width={w * shown} height="1.9" rx="0.9"
                      fill="#3d2f1c" opacity="0.72"
                      style={{ transition: `width ${EASE}` }} />
              ))}
            </g>
          );
        })}
      </g>

      {/* wax seal: pressed, so it has a raised rim, an impression and a
          shadow where it sits proud of the sheet */}
      <g style={{ opacity: Math.max(0, Math.min(1, (s - 2.2) / 1.2)),
                  transition: `opacity ${EASE}` }}>
        <ellipse cx="80" cy="127" rx="15" ry="4" fill="#000" opacity="0.32" />
        <path d="M 66 120 C 64 112, 70 106, 80 106 C 90 106, 96 112, 94 120
                 C 92 127, 86 130, 80 130 C 74 130, 68 127, 66 120 Z"
              fill="url(#ca-wax)" />
        {/* the impression: a chi-rho suggestion, struck into the wax */}
        <path d="M 80 111 L 80 125 M 75 115 C 78 112, 84 113, 83 117 C 82 120, 78 120, 76 119"
              fill="none" stroke="#5e1a0f" strokeWidth="1.6"
              strokeLinecap="round" opacity="0.75" />
        <path d="M 69 114 C 71 109, 76 107, 80 107" fill="none"
              stroke="#f0a184" strokeWidth="1.5" strokeLinecap="round"
              opacity={0.5 + sealed * 0.4} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- alba */
/* Dawn between fluted Corinthian columns (1 Cor. 15). The columns get real
   architecture: a stepped base, a fluted shaft that tapers, and a capital
   with acanthus suggestion. v1 was four plain rectangles with cap slabs. */
function Alba({ s }) {
  const t = s / 4;
  const COLS = [30, 56, 104, 130];
  const FLUTE = [-3.5, 0, 3.5];

  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <linearGradient id="al-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#131a2a" />
          <stop offset="55%" stopColor="#3a2a3a" />
          <stop offset="100%" stopColor="#8a4a35" />
        </linearGradient>
        <radialGradient id="al-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d6" />
          <stop offset="34%" stopColor="#ffc98a" />
          <stop offset="70%" stopColor="#e8763f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e8763f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="al-stone" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9aa0a8" />
          <stop offset="38%" stopColor="#6e747d" />
          <stop offset="100%" stopColor="#3a3e46" />
        </linearGradient>
        <clipPath id="al-frame"><rect x="0" y="0" width="160" height="132" /></clipPath>
      </defs>

      <g clipPath="url(#al-frame)">
        {/* the sky warms as the night ends */}
        <rect x="0" y="0" width="160" height="132" fill="url(#al-sky)" />
        {/* "noche cerrada": the warmth in the sky gradient is veiled until
            the light actually arrives, so stage 0 is night rather than dusk */}
        <rect x="0" y="0" width="160" height="132" fill="#0b0d13"
              style={{ opacity: Math.max(0, 0.82 - t * 0.92), transition: `opacity ${EASE}` }} />

        {/* stars, put out by the light */}
        {[[40, 30], [66, 20], [96, 26], [122, 36], [52, 44], [110, 48], [80, 16]].map(([x, y], i) => (
          <circle key={i} className="star" cx={x} cy={y} r="1.1"
                  style={{
                    fill: "#e9e7e2",
                    opacity: Math.max(0, 1 - t * 1.6) * 0.85,
                    transition: `opacity ${EASE}`,
                    animationDelay: `${i * 0.6}s`,
                  }} />
        ))}

        {/* the sun clearing the horizon between the middle columns */}
        <circle cx="80" cy={144 - t * 56} r="30" fill="url(#al-sun)"
                className={s >= 3 ? "halo" : undefined}
                style={{ opacity: 0.05 + t * 0.95, transition: `cy ${EASE}, opacity ${EASE}` }} />

        {COLS.map((x, i) => {
          const w = 15;
          return (
            <g key={x}>
              {/* stepped base */}
              <rect x={x - 4} y="120" width={w + 8} height="5" fill="#2f333a" />
              <rect x={x - 2} y="115" width={w + 4} height="5" fill="#41464e" />
              {/* fluted shaft, tapering slightly toward the capital */}
              <path d={`M ${x} 118 L ${x + 1.2} 44 L ${x + w - 1.2} 44 L ${x + w} 118 Z`}
                    fill="url(#al-stone)" />
              {FLUTE.map((f, k) => (
                <line key={k} x1={x + w / 2 + f} y1="46" x2={x + w / 2 + f * 1.15} y2="117"
                      stroke="#2b2f35" strokeWidth="1" opacity="0.42" />
              ))}
              {/* capital: abacus over an acanthus bell */}
              <path d={`M ${x - 1} 44 C ${x + 2} 36, ${x + w - 2} 36, ${x + w + 1} 44 Z`}
                    fill="#5c626b" />
              <path d={`M ${x + 1} 42 C ${x + 4} 37, ${x + 6} 39, ${x + 5} 43
                        M ${x + w - 1} 42 C ${x + w - 4} 37, ${x + w - 6} 39, ${x + w - 5} 43`}
                    fill="none" stroke="#8f959e" strokeWidth="0.9" opacity="0.6" />
              <rect x={x - 3} y="31" width={w + 6} height="5" rx="0.8" fill="#767c85" />
              {/* the lit edge, stronger on the columns nearest the sun */}
              <rect x={x + 0.6} y="44" width="1.6" height="74"
                    fill="#f0c79a"
                    style={{
                      opacity: t * (i === 1 || i === 2 ? 0.55 : 0.28),
                      transition: `opacity ${EASE}`,
                    }} />
            </g>
          );
        })}
      </g>

      {/* the stylobate the colonnade stands on */}
      <rect x="8" y="125" width="144" height="4" rx="1" fill="#2f333a" />
      <rect x="4" y="129" width="152" height="4" rx="1" fill="#252930" />
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
