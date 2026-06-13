import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion.js";

/* =================================================================
   Motif — the foreground subject that floats over the AtmosphereShader.
   No sky here (the shader owns light/colour); just the silhouette +
   glowing accents that react to stageIndex (0..4).
   ================================================================= */

const TR = { duration: 1.0, ease: EASE_OUT };

export default function Motif({ kind = "boat", stageIndex = 0, animate = true, size = 300 }) {
  const i = stageIndex;
  const Comp = kind === "flame" ? Flame : kind === "road" ? Road : Boat;
  return (
    <svg viewBox="0 0 320 300" width={size} height={(size * 300) / 320} aria-hidden="true"
      style={{ maxWidth: "100%", display: "block", margin: "0 auto", overflow: "visible" }}>
      <defs>
        <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d4" /><stop offset="45%" stopColor="#ffd98a" />
          <stop offset="100%" stopColor="#e6a94b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Comp i={i} animate={animate} />
    </svg>
  );
}

/* ---------- L11 · boat on the sea ---------- */
function Boat({ i, animate }) {
  const head = [20, -8, -11, -13, -15][i];
  const anchor = i >= 2 ? 1 : 0;
  const dove = i >= 4 ? 1 : 0;
  const rain = [0.85, 0.45, 0.12, 0, 0][i];
  const rockDur = 2.4 + i * 0.7, rock = 5 - i;
  return (
    <g>
      {/* rain */}
      <motion.g initial={false} animate={{ opacity: rain }} transition={TR}>
        {[40, 80, 120, 160, 200, 240, 280, 60, 140, 220].map((x, k) => (
          <motion.line key={k} x1={x} y1={(k % 3) * 16 + 40} x2={x - 4} y2={(k % 3) * 16 + 60}
            stroke="#a2bbe0" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"
            initial={false} animate={animate ? { y: [0, 22] } : { y: 0 }}
            transition={animate ? { duration: 0.5, repeat: Infinity, ease: "linear" } : { duration: 0 }} />
        ))}
      </motion.g>

      {/* waves */}
      {[0, 1, 2].map((row) => {
        const yB = 222 + row * 20, h = (8 - i * 1.4) * (1 - row * 0.15);
        const d = `M0 ${yB} C 40 ${yB - h}, 80 ${yB + h}, 120 ${yB} S 200 ${yB - h}, 240 ${yB} S 320 ${yB + h}, 320 ${yB}`;
        return <motion.path key={row} d={d} fill="none" stroke="rgba(220,232,250,0.32)" strokeWidth="1.6"
          initial={false} animate={animate ? { x: [0, row % 2 ? 10 : -10, 0] } : { x: 0 }}
          transition={animate ? { duration: 5 + row, ease: "easeInOut", repeat: Infinity } : { duration: 0 }} />;
      })}

      {/* dove */}
      <motion.path d="M58 64 q12 -9 24 0 q-9 -2 -14 5 q-2 -7 -10 -5 Z" fill="#f6efdd" filter="url(#soft-glow)"
        initial={false} animate={animate && dove ? { opacity: dove, x: [0, 12, 0], y: [0, -6, 0] } : { opacity: dove }}
        transition={animate ? { duration: 6, ease: "easeInOut", repeat: Infinity } : TR} />

      {/* boat (rocks with the sea) */}
      <motion.g initial={false}
        animate={animate ? { rotate: [-rock, rock, -rock], y: [0, i < 2 ? 4 : 1.5, 0] } : { rotate: 0, y: 0 }}
        transition={animate ? { duration: rockDur, ease: "easeInOut", repeat: Infinity } : TR}
        style={{ transformOrigin: "160px 222px" }}>
        <line x1="160" y1="150" x2="160" y2="210" stroke="#3a2a18" strokeWidth="3" strokeLinecap="round" />
        <path d="M160 154 L188 192 L160 200 Z" fill="#efe2c6" opacity="0.92" />
        <path d="M120 210 L200 210 L186 230 L134 230 Z" fill="#2c1e10" stroke="#1a1108" strokeWidth="1.5" />
        <g transform="translate(160 202)">
          <motion.g initial={false} animate={{ rotate: head }} transition={TR} style={{ transformOrigin: "0px 0px" }}>
            <circle cx="0" cy="-15" r="6.5" fill="#e8d4b6" />
          </motion.g>
          <path d="M-7 -9 Q0 -13 7 -9 L6 3 L-6 3 Z" fill="#243a55" />
        </g>
        {/* anchor */}
        <motion.g initial={false} animate={{ opacity: anchor }} transition={TR}>
          <motion.line x1="160" y1="230" x2="160" y2="262" stroke="#9fb0c6" strokeWidth="2" strokeDasharray="3 3"
            initial={false} animate={{ pathLength: anchor }} transition={TR} />
          <g stroke="#cdd8e8" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="160" cy="264" r="3" /><line x1="160" y1="267" x2="160" y2="285" />
            <line x1="153" y1="272" x2="167" y2="272" /><path d="M149 280 Q160 292 171 280" />
          </g>
        </motion.g>
      </motion.g>
    </g>
  );
}

/* ---------- L12 · a flame that kindles others ---------- */
function Flame({ i, animate }) {
  const grow = [0.6, 0.78, 0.92, 1.05, 1.18][i];
  const lit = i; // how many side-lights are kindled (0..4)
  const sides = [
    { x: 96, y: 196 }, { x: 224, y: 196 }, { x: 70, y: 150 }, { x: 250, y: 150 },
  ];
  return (
    <g>
      {/* halo */}
      <motion.circle cx="160" cy="170" r="120" fill="url(#warm)" initial={false}
        animate={animate ? { opacity: [0.18 + i * 0.16, 0.28 + i * 0.16, 0.18 + i * 0.16], scale: [0.94, 1, 0.94] } : { opacity: 0.2 + i * 0.16 }}
        transition={animate ? { duration: 7, ease: "easeInOut", repeat: Infinity } : TR}
        style={{ transformOrigin: "160px 170px" }} />

      {/* side lights kindle one by one */}
      {sides.map((s, k) => (
        <motion.g key={k} initial={false} animate={{ opacity: k < lit ? 1 : 0.12 }} transition={TR}>
          <circle cx={s.x} cy={s.y} r="22" fill="url(#warm)" opacity={k < lit ? 0.55 : 0} />
          <line x1={s.x} y1={s.y + 6} x2={s.x} y2={s.y + 26} stroke="#5a4326" strokeWidth="3" strokeLinecap="round" />
          <motion.path d={`M${s.x} ${s.y - 10} q6 8 0 16 q-6 -8 0 -16`} fill="#ffd98a" filter="url(#soft-glow)"
            initial={false} animate={animate && k < lit ? { scaleY: [1, 1.18, 1] } : {}}
            transition={animate ? { duration: 1.6 + k * 0.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }} />
        </motion.g>
      ))}

      {/* central candle */}
      <line x1="160" y1="206" x2="160" y2="252" stroke="#6e5230" strokeWidth="8" strokeLinecap="round" />
      <rect x="150" y="248" width="20" height="8" rx="3" fill="#4a371f" />
      <motion.g initial={false} animate={{ scale: grow }} transition={TR} style={{ transformOrigin: "160px 200px" }}>
        <motion.path d="M160 150 C 150 168, 146 184, 160 204 C 174 184, 170 168, 160 150 Z" fill="#ffe6ac" filter="url(#soft-glow)"
          initial={false} animate={animate ? { scaleY: [1, 1.1, 0.98, 1], scaleX: [1, 0.96, 1.02, 1] } : {}}
          transition={animate ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
          style={{ transformOrigin: "160px 200px" }} />
        <path d="M160 168 C 154 180, 152 190, 160 202 C 168 190, 166 180, 160 168 Z" fill="#fff7e0" />
      </motion.g>
    </g>
  );
}

/* ---------- L13 · a road toward the city of light ---------- */
function Road({ i, animate }) {
  const cityScale = [0.0, 0.35, 0.6, 0.85, 1.15][i];
  const cityGlow = [0.05, 0.2, 0.4, 0.7, 1][i];
  const walk = [0, 0.18, 0.4, 0.62, 0.82][i];
  const fx = 160 + (160 - 160) * 0; // figure stays centered on path
  const fy = 252 - walk * 70;
  const fscale = 1 - walk * 0.45;
  const stars = [0.6, 0.45, 0.25, 0.08, 0][i];
  return (
    <g>
      {/* stars fade as it brightens */}
      <motion.g initial={false} animate={{ opacity: stars }} transition={TR}>
        {[[60, 50], [110, 34], [210, 44], [262, 30], [150, 60], [240, 70]].map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r="1.2" fill="#dfe7f5" />
        ))}
      </motion.g>

      {/* city glow on the horizon */}
      <motion.circle cx="160" cy="150" r="80" fill="url(#warm)" initial={false}
        animate={{ opacity: cityGlow }} transition={TR} />

      {/* the road (perspective) */}
      <path d="M120 290 L150 150 L170 150 L200 290 Z" fill="rgba(120,140,180,0.12)" stroke="rgba(200,216,240,0.25)" strokeWidth="1.2" />
      {[0, 1, 2, 3].map((k) => {
        const t = k / 4, y = 290 - t * 138, w = 10 - t * 7;
        return <line key={k} x1={160 - w} y1={y} x2={160 + w} y2={y} stroke="rgba(220,232,250,0.28)" strokeWidth="2" strokeLinecap="round" />;
      })}

      {/* the city of light */}
      <motion.g initial={false} animate={{ opacity: Math.min(1, cityScale), scale: cityScale }} transition={TR} style={{ transformOrigin: "160px 150px" }} filter="url(#soft-glow)">
        {[[140, 140, 14], [150, 128, 14], [162, 134, 14], [172, 122, 16], [184, 138, 12]].map(([x, y, h], k) => (
          <rect key={k} x={x} y={y} width="9" height={h + 8} rx="1.5" fill="#ffe6ac" opacity="0.92" />
        ))}
        <rect x="150" y="148" width="22" height="10" rx="2" fill="#fff3d4" />
      </motion.g>

      {/* figure walking toward it */}
      <motion.g initial={false} animate={{ x: 0, y: fy - 252, scale: fscale, opacity: 1 }} transition={TR} style={{ transformOrigin: "160px 252px" }}>
        <circle cx="160" cy="238" r="6.5" fill="#e8d4b6" />
        <path d="M153 245 Q160 241 167 245 L165 262 L155 262 Z" fill="#243a55" />
      </motion.g>
    </g>
  );
}
