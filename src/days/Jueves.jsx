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
   JUEVES · La condición del corazón
   Scene: 4 soil patches (camino / rocoso / espinos / tierra buena).
   Tap a soil → a short animation of the seed's fate plays inside the
   patch, with a short caption. A "¿Cuál eres hoy?" prompt lets the
   user pick one. Pick → Jeremías 15:16 takeover.
   ================================================================= */

const SOILS = [
  {
    key: "camino",
    label: "Camino",
    fate: "Las aves vienen y se la llevan",
    note: "Llega la palabra y Satanás la quita del corazón antes que eche raíz. Marcos 4:15.",
  },
  {
    key: "rocoso",
    label: "Pedregal",
    fate: "Nace, pero se seca sin raíz",
    note: "Reciben con gozo, pero al llegar la aflicción se escandalizan. Marcos 4:17.",
  },
  {
    key: "espinos",
    label: "Espinos",
    fate: "Crece, pero los afanes la ahogan",
    note: "Las riquezas, los afanes y las otras codicias ahogan la palabra. Marcos 4:19.",
  },
  {
    key: "buena",
    label: "Tierra buena",
    fate: "Fructifica a treinta, a sesenta, a ciento",
    note: "Los que oyen la palabra, la reciben y dan fruto. Marcos 4:20.",
  },
];

export default function Jueves({
  onSwipe,
  onMarkComplete,
  goTo,
  completed,
}) {
  const meta = DAY_META.jueves;
  const [explored, setExplored] = useState(() => new Set());
  const [activeFate, setActiveFate] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [takeover, setTakeover] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const allExplored = explored.size === SOILS.length;

  const explore = (k) => {
    setActiveFate(k);
    setExplored((prev) => {
      if (prev.has(k)) return prev;
      const next = new Set(prev);
      next.add(k);
      return next;
    });
  };

  const pick = (k) => {
    setChosen(k);
    if (!completed.has(meta.key)) onMarkComplete(meta.key);
    setTimeout(() => setTakeover(true), 700);
  };

  useEffect(() => {
    if (!activeFate) return;
    const t = setTimeout(() => setActiveFate(null), 2200);
    return () => clearTimeout(t);
  }, [activeFate]);

  return (
    <SceneShell screenKey="jueves" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div className="scene-stage">
        <div
          className="font-sc c-muted text-center mb-2"
          style={{ fontSize: 11, letterSpacing: "0.2em" }}
        >
          Toca cada suelo · la semilla actúa
        </div>

        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            maxWidth: 400,
          }}
        >
          {SOILS.map((s) => (
            <SoilPatch
              key={s.key}
              soil={s}
              explored={explored.has(s.key)}
              animating={activeFate === s.key}
              onClick={() => explore(s.key)}
            />
          ))}
        </div>

        {/* Pick your soil */}
        <div className="w-full mt-4 max-w-sm">
          <div
            className="font-sc c-muted text-center mb-2"
            style={{ fontSize: 11, letterSpacing: "0.22em" }}
          >
            {allExplored ? "¿Cuál eres hoy?" : "Explora las cuatro primero"}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SOILS.map((s) => {
              const isChosen = chosen === s.key;
              const canPick = allExplored && !chosen;
              return (
                <button
                  key={s.key}
                  onClick={canPick ? () => pick(s.key) : undefined}
                  className="chip"
                  data-done={isChosen}
                  disabled={!canPick && !isChosen}
                  style={{
                    opacity: !allExplored ? 0.4 : 1,
                    cursor: canPick || isChosen ? "pointer" : "not-allowed",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Takeover
        show={takeover}
        vref="Jeremías 15:16"
        text="Fueron halladas tus palabras, y yo las comí; y tu palabra me fue por gozo y por alegría de mi corazón."
        cta={
          <div className="flex flex-col items-center gap-2">
            {chosen ? (
              <div
                className="font-sc c-gold mb-1"
                style={{ fontSize: 10, letterSpacing: "0.3em" }}
              >
                Hoy · {SOILS.find((s) => s.key === chosen)?.label}
              </div>
            ) : null}
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("viernes")}
            >
              Seguir · Viernes →
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
        title="Los cuatro suelos"
      >
        <p className="mb-3">
          Jesús cuenta la parábola del sembrador en Marcos 4 (también Mateo 13,
          Lucas 8) y luego la explica. El sembrador siempre siembra bien; la
          semilla siempre es buena. Lo único que cambia es <em>el terreno</em>.
        </p>
        <p className="mb-3 italic">
          «El que tiene oídos para oír, oiga.»
        </p>
        <p>
          No eres un solo suelo para siempre. Hay días de camino, días de
          espinos. La pregunta útil es: <em>hoy</em>, ¿qué está pasando con las
          semillas que caen en mí?
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Soil patch with animated seed fate ---- */
function SoilPatch({ soil, explored, animating, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="card tap-target text-left"
      style={{
        padding: 12,
        height: 130,
        position: "relative",
        overflow: "hidden",
        background:
          soil.key === "buena"
            ? "linear-gradient(180deg, #f4ede0 0%, #e5d9b8 100%)"
            : soil.key === "espinos"
            ? "linear-gradient(180deg, #f4ede0 0%, #d9c9a5 100%)"
            : soil.key === "rocoso"
            ? "linear-gradient(180deg, #f4ede0 0%, #cdbfa0 100%)"
            : "linear-gradient(180deg, #f4ede0 0%, #c5b690 100%)",
        border: explored
          ? "1px solid rgba(166,127,28,0.45)"
          : "1px solid rgba(26,21,16,0.1)",
      }}
    >
      <div
        className="font-sc"
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "#6b5a42",
          textTransform: "uppercase",
        }}
      >
        {soil.label}
      </div>

      {/* animated seed area */}
      <div
        style={{
          position: "absolute",
          inset: "28px 8px 28px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SeedAnimation soilKey={soil.key} playing={animating} />
      </div>

      <div
        className="font-body"
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 8,
          fontSize: 11.5,
          fontStyle: "italic",
          color: "#2a2018",
          lineHeight: 1.25,
        }}
      >
        {soil.fate}
      </div>
    </motion.button>
  );
}

/* ---- Seed animation per soil ---- */
function SeedAnimation({ soilKey, playing }) {
  // We always render a static hint; when playing, run the fate.
  if (soilKey === "camino") {
    return (
      <div style={{ position: "relative", width: 50, height: 40 }}>
        {/* seed */}
        <motion.span
          animate={
            playing
              ? { y: [0, 0, 0], opacity: [1, 1, 0] }
              : { y: 0, opacity: 0.8 }
          }
          transition={{ duration: 1.6 }}
          style={{
            position: "absolute",
            left: 22,
            top: 20,
            width: 6,
            height: 8,
            borderRadius: 999,
            background: "#6b4a10",
            display: "block",
          }}
        />
        {/* bird */}
        <motion.span
          initial={{ x: -50, opacity: 0 }}
          animate={playing ? { x: 60, opacity: [0, 1, 0] } : { x: -50, opacity: 0 }}
          transition={{ duration: 1.6 }}
          style={{
            position: "absolute",
            top: 2,
            left: 0,
            fontSize: 18,
            display: "block",
          }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
      </div>
    );
  }
  if (soilKey === "rocoso") {
    return (
      <motion.div
        style={{
          width: 16,
          height: 2,
          background: "#6b4a10",
          position: "relative",
        }}
        animate={playing ? { height: [2, 14, 14, 2], opacity: [1, 1, 0.4, 0.2] } : { height: 6 }}
        transition={{ duration: 1.8 }}
      />
    );
  }
  if (soilKey === "espinos") {
    return (
      <div style={{ position: "relative", width: 60, height: 40 }}>
        {/* growing sprout */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 2,
            left: 28,
            width: 4,
            background: "#4a6b1a",
          }}
          animate={playing ? { height: [2, 22] } : { height: 10 }}
          transition={{ duration: 1.2 }}
        />
        {/* thorns closing in */}
        <motion.span
          style={{
            position: "absolute",
            left: 6,
            bottom: 0,
            color: "#6b2a1a",
            fontSize: 14,
          }}
          animate={playing ? { x: [-6, 18] } : { x: -6 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
        <motion.span
          style={{
            position: "absolute",
            right: 6,
            bottom: 0,
            color: "#6b2a1a",
            fontSize: 14,
          }}
          animate={playing ? { x: [6, -18] } : { x: 6 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
      </div>
    );
  }
  // buena
  return (
    <div style={{ position: "relative", width: 60, height: 40 }}>
      <motion.div
        style={{
          position: "absolute",
          bottom: 2,
          left: 28,
          width: 4,
          background: "#4a6b1a",
        }}
        animate={playing ? { height: [2, 30] } : { height: 14 }}
        transition={{ duration: 1.2 }}
      />
      <motion.span
        style={{
          position: "absolute",
          bottom: 28,
          left: 20,
          fontSize: 18,
          color: "#a67f1c",
        }}
        animate={playing ? { opacity: [0, 1], scale: [0.4, 1] } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        aria-hidden="true"
      >
        ✿
      </motion.span>
    </div>
  );
}
