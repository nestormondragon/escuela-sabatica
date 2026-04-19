import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SceneShell,
  SceneHeader,
  BottomSheet,
  Takeover,
  ProgressDots,
  DAY_META,
} from "../ui.jsx";

/* =================================================================
   MARTES · La verdad bíblica
   Scene: crucible at bottom-center, 7 dross labels floating above.
   Tap a dross → it falls into the crucible (flash + dissolve).
   All 7 gone → "plata pura" + Salmo 12:6 takeover.
   ================================================================= */

const DROSS = [
  "Opinión",
  "Rumor",
  "Media verdad",
  "Prejuicio",
  "Miedo",
  "Costumbre",
  "Ego",
];

export default function Martes({
  onSwipe,
  onMarkComplete,
  goTo,
  completed,
}) {
  const meta = DAY_META.martes;
  const [burned, setBurned] = useState(() => new Set());
  const [takeover, setTakeover] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const all = burned.size === DROSS.length;

  useEffect(() => {
    if (all) {
      if (!completed.has(meta.key)) onMarkComplete(meta.key);
      const t = setTimeout(() => setTakeover(true), 900);
      return () => clearTimeout(t);
    }
  }, [all, completed, meta.key, onMarkComplete]);

  const burn = (d) => {
    setBurned((prev) => {
      if (prev.has(d)) return prev;
      const next = new Set(prev);
      next.add(d);
      return next;
    });
  };

  return (
    <SceneShell screenKey="martes" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div className="scene-stage" style={{ position: "relative" }}>
        {/* Dross labels above */}
        <div
          className="flex flex-wrap items-center justify-center w-full"
          style={{ gap: 8, maxWidth: 400, minHeight: 120 }}
        >
          <AnimatePresence>
            {DROSS.map((d) => {
              if (burned.has(d)) return null;
              return (
                <motion.button
                  key={d}
                  onClick={() => burn(d)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 180,
                    scale: 0.6,
                    filter: "blur(10px)",
                  }}
                  transition={{ duration: 0.55 }}
                  className="font-sc"
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(139,38,53,0.08)",
                    border: "1px solid rgba(139,38,53,0.32)",
                    color: "#5a1a22",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  aria-label={`Quemar ${d}`}
                >
                  {d}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Instruction */}
        <div
          className="font-sc c-muted my-3 text-center"
          style={{ fontSize: 11, letterSpacing: "0.2em" }}
        >
          {all
            ? "Queda solo plata pura"
            : "Toca cada escoria · el fuego la consumirá"}
        </div>

        {/* Crucible */}
        <Crucible full={all} firing={burned.size} />

        {/* Progress */}
        <div className="mt-3">
          <ProgressDots total={DROSS.length} done={burned.size} />
        </div>
      </div>

      <Takeover
        show={takeover}
        vref="Salmo 12:6"
        text="Las palabras del Señor son palabras puras, plata refinada en horno de tierra, purificada siete veces."
        cta={
          <div className="flex flex-col items-center gap-2">
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("miercoles")}
            >
              Seguir · Miércoles →
            </button>
            <button className="btn-ghost" onClick={() => setTakeover(false)}>
              Quedarme aquí
            </button>
          </div>
        }
      />

      <BottomSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title="La verdad que no se encoge"
      >
        <p className="mb-3">
          Jesús dice <em>tres veces</em> «verdad» — no por énfasis, sino por
          arquitectura:
        </p>
        <p className="mb-1 font-display" style={{ fontSize: 17 }}>
          «Yo soy… la verdad.»
          <span className="scripture-ref ml-2">Juan 14:6</span>
        </p>
        <p className="mb-1 font-display" style={{ fontSize: 17 }}>
          «Tu palabra es verdad.»
          <span className="scripture-ref ml-2">Juan 17:17</span>
        </p>
        <p className="mb-3 font-display" style={{ fontSize: 17 }}>
          «La verdad os hará libres.»
          <span className="scripture-ref ml-2">Juan 8:32</span>
        </p>
        <p className="c-muted">
          Una persona (Jesús), una fuente (la Palabra), un resultado (libertad).
          La verdad no es una opinión bien argumentada — es un <em>alguien</em>
          que se revela en un <em>libro</em>, y te cambia.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Crucible SVG ---- */
function Crucible({ full, firing }) {
  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 160,
      }}
    >
      {/* fire underneath */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -4,
          transform: "translateX(-50%)",
          width: 100,
          height: 30,
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="ember"
            style={{
              position: "absolute",
              left: `${i * 18 + 4}px`,
              bottom: 2,
              width: 4,
              height: 10,
              borderRadius: 999,
              background:
                i % 2 === 0
                  ? "rgba(241,192,90,0.9)"
                  : "rgba(139,38,53,0.75)",
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      <svg
        width="200"
        height="160"
        viewBox="0 0 200 160"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bowl-v5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1a10" />
            <stop offset="100%" stopColor="#5a3b1a" />
          </linearGradient>
          <radialGradient id="molten-v5" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={full ? "#fff4d8" : "#f1c05a"} />
            <stop offset="60%" stopColor={full ? "#f1c05a" : "#c9751a"} />
            <stop offset="100%" stopColor={full ? "#a67f1c" : "#8b2635"} />
          </radialGradient>
        </defs>

        {/* bowl */}
        <path
          d="M30 60 Q 100 150, 170 60 L 160 50 L 40 50 Z"
          fill="url(#bowl-v5)"
          stroke="#1a1510"
          strokeWidth="1.5"
        />
        {/* rim */}
        <ellipse cx="100" cy="50" rx="65" ry="10" fill="#1a1510" />
        {/* molten */}
        <ellipse cx="100" cy="50" rx="60" ry="7" fill="url(#molten-v5)" />

        {/* firing flash */}
        <AnimatePresence>
          {firing > 0 ? (
            <motion.ellipse
              key={firing}
              cx="100"
              cy="50"
              rx="50"
              ry="8"
              fill="#fff4d8"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.6 }}
            />
          ) : null}
        </AnimatePresence>
      </svg>

      {/* pure-silver label */}
      <AnimatePresence>
        {full ? (
          <motion.div
            className="font-sc c-gold"
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textShadow: "0 0 12px rgba(166,127,28,0.6)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            PLATA PURA
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
