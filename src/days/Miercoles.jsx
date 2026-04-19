import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SceneShell,
  SceneHeader,
  BottomSheet,
  Takeover,
  DAY_META,
} from "../ui.jsx";

/* =================================================================
   MIÉRCOLES · Requerimientos bíblicos
   Scene: a heart silhouette at center, 8 attitude chips above.
   Tap chip → it moves into the heart (tap again to remove).
   After selecting exactly any 4 attitudes, "Pasar la espada" appears.
   Sword animates across the heart: SURVIVORS (the 4 good) stay gold,
   FALLEN (the 4 bad) burn with line-through.
   All 8 get judged, even if user didn't pick the right 4.
   Santiago 1:22 takeover.
   ================================================================= */

const ATTITUDES = [
  { key: "hambre",    label: "Hambre por la Palabra",    good: true  },
  { key: "rendicion", label: "Rendición",                 good: true  },
  { key: "obediencia",label: "Obediencia",                good: true  },
  { key: "humildad",  label: "Humildad",                  good: true  },
  { key: "autojust",  label: "Auto-justificación",        good: false },
  { key: "selec",     label: "Selectividad",              good: false },
  { key: "cinismo",   label: "Cinismo",                   good: false },
  { key: "miedo",     label: "Miedo a cambiar",           good: false },
];

export default function Miercoles({
  onSwipe,
  onMarkComplete,
  onRefrain,
  goTo,
  completed,
}) {
  const meta = DAY_META.miercoles;
  const [picked, setPicked] = useState(() => new Set());
  const [sworded, setSworded] = useState(false);
  const [swordPhase, setSwordPhase] = useState(0); // 0 idle, 1 slash, 2 settled
  const [takeover, setTakeover] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const toggle = (key) => {
    if (sworded) return;
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else if (next.size < 4) next.add(key);
      return next;
    });
  };

  const readyToSword = picked.size === 4 && !sworded;

  const passSword = () => {
    setSworded(true);
    setSwordPhase(1);
    setTimeout(() => setSwordPhase(2), 650);
    setTimeout(() => {
      onRefrain && onRefrain();
    }, 900);
    if (!completed.has(meta.key)) onMarkComplete(meta.key);
  };

  useEffect(() => {
    if (!sworded) return;
    const t = setTimeout(() => setTakeover(true), 1400);
    return () => clearTimeout(t);
  }, [sworded]);

  const reset = () => {
    setPicked(new Set());
    setSworded(false);
    setSwordPhase(0);
    setTakeover(false);
  };

  return (
    <SceneShell screenKey="miercoles" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div className="scene-stage">
        {/* Instruction */}
        <div
          className="font-sc c-muted text-center mb-2"
          style={{ fontSize: 11, letterSpacing: "0.2em" }}
        >
          {sworded
            ? "La espada ha pasado"
            : `Elige 4 actitudes para tu corazón (${picked.size}/4)`}
        </div>

        {/* Attitude chips */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: 6, maxWidth: 440 }}
        >
          {ATTITUDES.map((a) => {
            const isPicked = picked.has(a.key);
            const judged = sworded && isPicked;
            const survives = judged && a.good;
            const falls = judged && !a.good;
            return (
              <motion.button
                key={a.key}
                onClick={() => toggle(a.key)}
                animate={{
                  scale: falls ? 0.9 : 1,
                  opacity: falls ? 0.35 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="font-sc"
                disabled={sworded && !isPicked}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: sworded ? "default" : "pointer",
                  border: survives
                    ? "1px solid #a67f1c"
                    : falls
                    ? "1px dashed rgba(139,38,53,0.5)"
                    : isPicked
                    ? "1px solid rgba(26,21,16,0.45)"
                    : "1px solid rgba(166,127,28,0.28)",
                  background: survives
                    ? "rgba(166,127,28,0.25)"
                    : falls
                    ? "rgba(139,38,53,0.08)"
                    : isPicked
                    ? "#1a1510"
                    : "rgba(166,127,28,0.06)",
                  color: survives
                    ? "#7a5e12"
                    : falls
                    ? "#8b2635"
                    : isPicked
                    ? "#faf7f0"
                    : "#2a2018",
                  textDecoration: falls ? "line-through" : "none",
                  transition: "all 300ms ease",
                }}
              >
                {a.label}
              </motion.button>
            );
          })}
        </div>

        {/* Heart + sword stage */}
        <div style={{ position: "relative", width: 220, height: 220, marginTop: 12 }}>
          <HeartSvg active={picked.size > 0} glow={swordPhase === 2} />
          <AnimatePresence>
            {swordPhase > 0 ? (
              <motion.div
                key="sword-pass"
                initial={{ x: -220, opacity: 0 }}
                animate={{ x: 220, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 0.9, 0.4, 1] }}
                style={{
                  position: "absolute",
                  top: "40%",
                  left: 0,
                  width: 220,
                  height: 6,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(241,192,90,0.0) 10%, rgba(241,192,90,1) 50%, rgba(241,192,90,0.0) 90%, transparent 100%)",
                  boxShadow: "0 0 18px rgba(241,192,90,0.8)",
                  borderRadius: 999,
                }}
              />
            ) : null}
          </AnimatePresence>
        </div>

        {/* Action */}
        <div className="mt-3 flex items-center gap-2">
          {!sworded ? (
            <button
              className="btn-primary"
              data-gold="true"
              disabled={!readyToSword}
              style={{
                opacity: readyToSword ? 1 : 0.45,
                cursor: readyToSword ? "pointer" : "not-allowed",
              }}
              onClick={readyToSword ? passSword : undefined}
            >
              Pasar la espada
            </button>
          ) : (
            <button className="btn-ghost" onClick={reset}>
              Volver a intentar
            </button>
          )}
        </div>
      </div>

      <Takeover
        show={takeover}
        vref="Santiago 1:22"
        text="Sed hacedores de la palabra, y no tan solamente oidores, engañándoos a vosotros mismos."
        cta={
          <div className="flex flex-col items-center gap-2">
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("jueves")}
            >
              Seguir · Jueves →
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
        title="Lo que la Palabra pide de ti"
      >
        <p className="mb-3">
          La Biblia no es un libro de consulta. Es un espejo (Stg 1:23-25) que
          pide cuatro respuestas antes de entregar su fruto:
        </p>
        <ul className="mb-3" style={{ paddingLeft: 18 }}>
          <li className="mb-1"><strong>Hambre</strong> — «como niños recién nacidos, desead…» 1 Pe 2:2</li>
          <li className="mb-1"><strong>Rendición</strong> — «aparta los ojos de la vanidad…» Sal 119:37</li>
          <li className="mb-1"><strong>Obediencia</strong> — «Sé hacedor de la palabra» Stg 1:22</li>
          <li className="mb-1"><strong>Humildad</strong> — «al humilde enseñará su carrera» Sal 25:9</li>
        </ul>
        <p className="c-muted">
          Las otras cuatro —auto-justificación, selectividad, cinismo, miedo a
          cambiar— no son pecados dramáticos. Son <em>filtros</em> que apagan la
          Palabra antes de que toque el corazón.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Heart SVG ---- */
function HeartSvg({ active, glow }) {
  return (
    <motion.svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      aria-hidden="true"
      animate={
        glow
          ? { filter: "drop-shadow(0 0 24px rgba(166,127,28,0.55))" }
          : { filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }
      }
      transition={{ duration: 0.8 }}
    >
      <defs>
        <radialGradient id="heart-v5" cx="50%" cy="45%" r="60%">
          <stop
            offset="0%"
            stopColor={glow ? "#fff4d8" : active ? "#f4ede0" : "#ebe2cf"}
          />
          <stop
            offset="100%"
            stopColor={glow ? "#a67f1c" : "#d9cfb9"}
          />
        </radialGradient>
      </defs>
      <path
        d="M110 180 C 20 130, 20 60, 70 50 C 95 45, 110 65, 110 80 C 110 65, 125 45, 150 50 C 200 60, 200 130, 110 180 Z"
        fill="url(#heart-v5)"
        stroke={glow ? "#a67f1c" : "#6b5a42"}
        strokeWidth="1.2"
      />
    </motion.svg>
  );
}
