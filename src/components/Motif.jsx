import React from "react";

/* =================================================================
   Motif — the foreground subject that floats over the CSS sky (Backdrop).
   ALL continuous motion is pure CSS (see .mtf-* keyframes in index.css):
   browser-managed across tab visibility, always starts on mount, restarts
   on remount (scene change), and is disabled by prefers-reduced-motion.
   Stage-driven values (0..4) are inline styles that ease via CSS transition.
   No framer-motion, no rAF, no JS visibility gating → no freeze bug.
   ================================================================= */

const EASE = "1s cubic-bezier(0.23,1,0.32,1)";

export default function Motif({ kind = "boat", stageIndex = 0, size = 300 }) {
  const Comp =
    kind === "flame" ? Flame :
    kind === "road" ? Road :
    kind === "seed" ? Seed :
    kind === "sky" ? Sky :
    Boat;
  return (
    <svg
      className="mtf"
      viewBox="0 0 320 300"
      width={size}
      height={(size * 300) / 320}
      aria-hidden="true"
      style={{ maxWidth: "100%", display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        <radialGradient id="mtf-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d4" />
          <stop offset="45%" stopColor="#ffd98a" />
          <stop offset="100%" stopColor="#e6a94b" stopOpacity="0" />
        </radialGradient>
        <filter id="mtf-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <Comp i={stageIndex} />
    </svg>
  );
}

/* ---------- L11 · boat on the sea ---------- */
function Boat({ i }) {
  const head = [20, -8, -11, -13, -15][i];
  const anchor = i >= 2 ? 1 : 0;
  const dove = i >= 4 ? 1 : 0;
  const rain = [0.85, 0.5, 0.16, 0, 0][i];
  const rockDur = `${3.4 - i * 0.45}s`;
  return (
    <g>
      {/* rain (CSS fall, staggered) — fades out toward dawn */}
      <g style={{ opacity: rain, transition: `opacity ${EASE}` }}>
        {Array.from({ length: 24 }).map((_, k) => {
          const x = (k * 137) % 320;
          const y0 = ((k * 53) % 96) + 22;
          return (
            <line key={k} className="rain" x1={x} y1={y0} x2={x - 7} y2={y0 + 20}
              stroke="#a8c0e6" strokeWidth="1.5" strokeLinecap="round"
              style={{ animationDelay: `${(k % 7) * 0.11}s`, animationDuration: `${0.7 + (k % 4) * 0.08}s` }} />
          );
        })}
      </g>

      {/* waves */}
      {[0, 1, 2].map((row) => {
        const yB = 222 + row * 20, h = (8 - i * 1.4) * (1 - row * 0.15);
        const d = `M0 ${yB} C 40 ${yB - h}, 80 ${yB + h}, 120 ${yB} S 200 ${yB - h}, 240 ${yB} S 320 ${yB + h}, 320 ${yB}`;
        return <path key={row} className="wave" d={d} fill="none" stroke="rgba(220,232,250,0.32)" strokeWidth="1.6"
          style={{ animationDelay: `${row * -1.6}s`, animationDuration: `${5 + row}s` }} />;
      })}

      {/* dove of hope (dawn) */}
      <path className="dove" d="M58 64 q12 -9 24 0 q-9 -2 -14 5 q-2 -7 -10 -5 Z" fill="#f6efdd" filter="url(#mtf-glow)"
        style={{ opacity: dove, transition: `opacity ${EASE}` }} />

      {/* boat — CSS rock */}
      <g className="rock" style={{ animationDuration: rockDur }}>
        <line x1="160" y1="150" x2="160" y2="210" stroke="#3a2a18" strokeWidth="3" strokeLinecap="round" />
        <path d="M160 154 L188 192 L160 200 Z" fill="#efe2c6" opacity="0.92" />
        <path d="M120 210 L200 210 L186 230 L134 230 Z" fill="#2c1e10" stroke="#1a1108" strokeWidth="1.5" />
        <g transform="translate(160 202)">
          <g style={{ transform: `rotate(${head}deg)`, transformOrigin: "0px 0px", transition: `transform ${EASE}` }}>
            <circle cx="0" cy="-15" r="6.5" fill="#e8d4b6" />
          </g>
          <path d="M-7 -9 Q0 -13 7 -9 L6 3 L-6 3 Z" fill="#243a55" />
        </g>
        {/* anchor */}
        <g style={{ opacity: anchor, transition: `opacity ${EASE}` }}>
          <line x1="160" y1="230" x2="160" y2="262" stroke="#9fb0c6" strokeWidth="2" strokeDasharray="3 3" />
          <g stroke="#cdd8e8" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="160" cy="264" r="3" /><line x1="160" y1="267" x2="160" y2="285" />
            <line x1="153" y1="272" x2="167" y2="272" /><path d="M149 280 Q160 292 171 280" />
          </g>
        </g>
      </g>
    </g>
  );
}

/* ---------- L12 · a flame that kindles others ---------- */
function Flame({ i }) {
  const grow = [0.62, 0.8, 0.94, 1.06, 1.2][i];
  const lit = i; // side lights kindled
  const sides = [{ x: 96, y: 196 }, { x: 224, y: 196 }, { x: 70, y: 150 }, { x: 250, y: 150 }];
  const emberCount = Math.min(10, i * 2 + 2);
  return (
    <g>
      <circle className="halo" cx="160" cy="170" r="120" fill="url(#mtf-warm)"
        style={{ opacity: 0.2 + i * 0.16, transition: `opacity ${EASE}` }} />

      {sides.map((s, k) => (
        <g key={k} style={{ opacity: k < lit ? 1 : 0.12, transition: `opacity ${EASE}` }}>
          <circle cx={s.x} cy={s.y} r="22" fill="url(#mtf-warm)" opacity={k < lit ? 0.5 : 0} />
          <line x1={s.x} y1={s.y + 6} x2={s.x} y2={s.y + 26} stroke="#5a4326" strokeWidth="3" strokeLinecap="round" />
          <path className={k < lit ? "flame" : ""} d={`M${s.x} ${s.y - 10} q6 8 0 16 q-6 -8 0 -16`} fill="#ffd98a" filter="url(#mtf-glow)"
            style={{ animationDelay: `${k * 0.3}s` }} />
        </g>
      ))}

      {/* rising embers */}
      {Array.from({ length: emberCount }).map((_, k) => {
        const x = 160 + ((k * 47) % 60) - 30;
        return <circle key={k} className="ember" cx={x} cy="196" r={1.2 + (k % 2) * 0.6} fill="#ffd98a"
          style={{ animationDelay: `${(k % 5) * 0.6}s`, animationDuration: `${3.2 + (k % 4) * 0.6}s` }} />;
      })}

      {/* candle */}
      <line x1="160" y1="206" x2="160" y2="252" stroke="#6e5230" strokeWidth="8" strokeLinecap="round" />
      <rect x="150" y="248" width="20" height="8" rx="3" fill="#4a371f" />
      <g style={{ transform: `scale(${grow})`, transformOrigin: "160px 204px", transition: `transform ${EASE}` }}>
        <path className="flame" d="M160 150 C 150 168, 146 184, 160 204 C 174 184, 170 168, 160 150 Z" fill="#ffe6ac" filter="url(#mtf-glow)" />
        <path d="M160 168 C 154 180, 152 190, 160 202 C 168 190, 166 180, 160 168 Z" fill="#fff7e0" />
      </g>
    </g>
  );
}

/* ---------- L13 · a road toward the city of light ---------- */
function Road({ i }) {
  const cityScale = [0.0, 0.35, 0.6, 0.85, 1.15][i];
  const cityGlow = [0.05, 0.2, 0.4, 0.7, 1][i];
  const walk = [0, 0.18, 0.4, 0.62, 0.82][i];
  const fy = 252 - walk * 70;
  const fscale = 1 - walk * 0.45;
  const stars = [0.7, 0.5, 0.3, 0.1, 0][i];
  return (
    <g>
      {/* twinkling stars */}
      <g style={{ opacity: stars, transition: `opacity ${EASE}` }}>
        {[[40, 50], [70, 30], [110, 60], [150, 28], [196, 52], [232, 34], [268, 64], [292, 40], [90, 84], [250, 88]].map(([x, y], k) => (
          <circle key={k} className="star" cx={x} cy={y} r={0.9 + (k % 3) * 0.5} fill="#eef2fb"
            style={{ animationDelay: `${(k % 5) * 0.4}s`, animationDuration: `${2 + (k % 4)}s` }} />
        ))}
        <line className="shoot" x1="40" y1="40" x2="58" y2="48" stroke="#eef2fb" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* city glow */}
      <circle cx="160" cy="150" r="80" fill="url(#mtf-warm)" style={{ opacity: cityGlow, transition: `opacity ${EASE}` }} />

      {/* road */}
      <path d="M120 290 L150 150 L170 150 L200 290 Z" fill="rgba(120,140,180,0.12)" stroke="rgba(200,216,240,0.25)" strokeWidth="1.2" />
      {[0, 1, 2, 3].map((k) => {
        const t = k / 4, y = 290 - t * 138, w = 10 - t * 7;
        return <line key={k} x1={160 - w} y1={y} x2={160 + w} y2={y} stroke="rgba(220,232,250,0.28)" strokeWidth="2" strokeLinecap="round" />;
      })}

      {/* city of light */}
      <g filter="url(#mtf-glow)" style={{ opacity: Math.min(1, cityScale), transform: `scale(${cityScale})`, transformOrigin: "160px 150px", transition: `opacity ${EASE}, transform ${EASE}` }}>
        {[[140, 140, 14], [150, 128, 14], [162, 134, 14], [172, 122, 16], [184, 138, 12]].map(([x, y, h], k) => (
          <rect key={k} x={x} y={y} width="9" height={h + 8} rx="1.5" fill="#ffe6ac" opacity="0.92" />
        ))}
        <rect x="150" y="148" width="22" height="10" rx="2" fill="#fff3d4" />
      </g>

      {/* figure walking toward it */}
      <g style={{ transform: `translateY(${fy - 252}px) scale(${fscale})`, transformOrigin: "160px 252px", transition: `transform ${EASE}` }}>
        <circle cx="160" cy="238" r="6.5" fill="#e8d4b6" />
        <path d="M153 245 Q160 241 167 245 L165 262 L155 262 Z" fill="#243a55" />
      </g>
    </g>
  );
}

/* ---------- seed → tree (humility / the word sown / growth) ---------- */
function Seed({ i }) {
  const grow = [0.02, 0.22, 0.5, 0.8, 1][i]; // trunk + branches scale up
  const leaves = [0, 0, 0.55, 0.9, 1][i];
  const fruit = i >= 4 ? 1 : 0;
  const seedDot = i <= 1 ? 1 : 0;
  const motes = i >= 2 ? (i - 1) * 2 : 0;
  return (
    <g>
      <circle className="halo" cx="160" cy="150" r="120" fill="url(#mtf-warm)"
        style={{ opacity: 0.12 + i * 0.16, transition: `opacity ${EASE}` }} />

      {/* soil */}
      <path d="M60 252 Q160 234 260 252 L260 280 L60 280 Z" fill="#3a2a18" />
      <ellipse cx="160" cy="252" rx="100" ry="11" fill="#46341f" />
      {/* buried seed / first sprout */}
      <g style={{ opacity: seedDot, transition: `opacity ${EASE}` }}>
        <ellipse cx="160" cy="246" rx="5" ry="7" fill="#caa46a" />
        <path d="M160 246 q0 -12 0 -20" stroke="#5b8a3c" strokeWidth="2.5" fill="none" strokeLinecap="round"
          style={{ opacity: i === 1 ? 1 : 0 }} />
      </g>

      {/* trunk + branches (grow) */}
      <g style={{ transform: `scaleY(${grow})`, transformOrigin: "160px 252px", transition: `transform ${EASE}` }}>
        <line x1="160" y1="252" x2="160" y2="132" stroke="#5a3f22" strokeWidth="8" strokeLinecap="round" />
        <line x1="160" y1="172" x2="128" y2="150" stroke="#5a3f22" strokeWidth="5" strokeLinecap="round" />
        <line x1="160" y1="172" x2="192" y2="150" stroke="#5a3f22" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* canopy (sways) */}
      <g className="sway" style={{ opacity: leaves, transition: `opacity ${EASE}` }}>
        <circle cx="160" cy="118" r="44" fill="#4f7a34" />
        <circle cx="126" cy="140" r="30" fill="#5b8a3c" />
        <circle cx="194" cy="140" r="30" fill="#5b8a3c" />
        <g style={{ opacity: fruit, transition: `opacity ${EASE}` }}>
          {[[146, 118], [176, 128], [160, 142], [130, 134], [190, 116]].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="4.2" fill="#e6a94b" />
          ))}
        </g>
      </g>

      {/* rising pollen motes */}
      {Array.from({ length: motes }).map((_, k) => {
        const x = 120 + ((k * 53) % 80);
        return <circle key={k} className="ember" cx={x} cy="190" r="1.6" fill="#cfe0a0"
          style={{ animationDelay: `${(k % 5) * 0.7}s`, animationDuration: `${4 + (k % 3)}s` }} />;
      })}
    </g>
  );
}

/* ---------- starfield → sunrise (self-examination / communion) ---------- */
function Sky({ i }) {
  const dawn = i / 4;
  const sunShift = -(dawn * 120);
  const sun = [0, 0.18, 0.42, 0.7, 1][i];
  const stars = [1, 0.78, 0.5, 0.2, 0][i];
  const rays = [0, 0, 0.2, 0.5, 0.9][i];
  return (
    <g>
      <ellipse cx="160" cy="252" rx="170" ry="70" fill="url(#mtf-warm)"
        style={{ opacity: 0.08 + dawn * 0.7, transition: `opacity ${EASE}` }} />

      <g style={{ opacity: stars, transition: `opacity ${EASE}` }}>
        {[[40, 50], [70, 30], [110, 60], [150, 26], [196, 52], [232, 34], [268, 64], [292, 42], [90, 86], [250, 90], [180, 96], [60, 110]].map(([x, y], k) => (
          <circle key={k} className="star" cx={x} cy={y} r={0.9 + (k % 3) * 0.5} fill="#eef2fb"
            style={{ animationDelay: `${(k % 5) * 0.4}s`, animationDuration: `${2 + (k % 4)}s` }} />
        ))}
        <line className="shoot" x1="40" y1="40" x2="58" y2="48" stroke="#eef2fb" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* rising sun */}
      <g style={{ transform: `translateY(${sunShift}px)`, transformOrigin: "160px 252px", transition: `transform ${EASE}` }}>
        <g style={{ opacity: rays, transition: `opacity ${EASE}` }}>
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k / 10) * Math.PI * 2;
            return <line key={k} x1={160 + Math.cos(a) * 40} y1={252 + Math.sin(a) * 40} x2={160 + Math.cos(a) * 58} y2={252 + Math.sin(a) * 58} stroke="#ffe6ac" strokeWidth="2" strokeLinecap="round" />;
          })}
        </g>
        <circle cx="160" cy="252" r="32" fill="url(#mtf-warm)" style={{ opacity: sun, transition: `opacity ${EASE}` }} />
        <circle cx="160" cy="252" r="17" fill="#fff3d4" style={{ opacity: sun, transition: `opacity ${EASE}` }} />
      </g>
    </g>
  );
}
