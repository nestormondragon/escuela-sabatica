import React from "react";

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
function Barro({ s }) {
  const t = s / 4;
  const CRACKS = [
    "M80 60 L73 82 L79 100",
    "M80 60 L89 78 L84 98 L90 114",
    "M73 82 L61 93",
    "M89 78 L101 89",
  ];
  return (
    <svg viewBox="0 0 160 160" className="mtf" aria-hidden="true">
      <defs>
        <radialGradient id="ba-inner" cx="50%" cy="52%" r="46%">
          <stop offset="0%" stopColor="var(--clay-hi)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ba-body">
          <path d="M60 50 Q50 72 54 94 Q58 118 80 126 Q102 118 106 94 Q110 72 100 50 Z" />
        </clipPath>
      </defs>

      <ellipse cx="80" cy="88" rx="52" ry="44" fill="url(#ba-inner)"
               className={s >= 3 ? "halo" : undefined}
               style={{ opacity: t * 0.72, transition: `opacity ${EASE}` }} />

      {/* handles: what makes it read as an amphora rather than a capsule */}
      <path d="M60 56 Q44 60 46 74 Q47 84 54 88" fill="none"
            style={{ stroke: "var(--line-2)", strokeWidth: 3, strokeLinecap: "round" }} />
      <path d="M100 56 Q116 60 114 74 Q113 84 106 88" fill="none"
            style={{ stroke: "var(--line-2)", strokeWidth: 3, strokeLinecap: "round" }} />

      {/* the vessel */}
      <path d="M60 50 Q50 72 54 94 Q58 118 80 126 Q102 118 106 94 Q110 72 100 50 Z"
            style={{ fill: "var(--bg-2)", stroke: "var(--line-2)", strokeWidth: 1.6 }} />
      {/* neck and lip */}
      <path d="M70 38 L68 50 L92 50 L90 38 Z"
            style={{ fill: "var(--bg-2)", stroke: "var(--line-2)", strokeWidth: 1.4 }} />
      <rect x="64" y="32" width="32" height="7" rx="1.5"
            style={{ fill: "var(--surface-3)", stroke: "var(--line-2)", strokeWidth: 1.2 }} />
      {/* foot */}
      <rect x="70" y="126" width="20" height="4" rx="1"
            style={{ fill: "var(--surface-3)" }} />

      <g clipPath="url(#ba-body)">
        {CRACKS.map((d, i) => {
          const open = Math.max(0, Math.min(1, s - i));
          return (
            <path key={i} d={d} fill="none" strokeLinecap="round"
                  style={{
                    stroke: "var(--clay-hi)",
                    strokeWidth: 1.2 + open * 1.5,
                    opacity: open,
                    filter: open > 0 ? "drop-shadow(0 0 4px var(--clay))" : "none",
                    transition: `opacity ${EASE}, stroke-width ${EASE}`,
                  }} />
          );
        })}
      </g>
    </svg>
  );
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
      <Cmp s={clamp(stageIndex)} />
    </div>
  );
}
