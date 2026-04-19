import React, { useState } from "react";
import { motion } from "framer-motion";
import { SceneShell, DAY_META, DAY_KEYS, BottomSheet, Flame } from "../ui.jsx";

/* =================================================================
   HOME · Lesson Map
   Card grid of all 7 days + Anclas. Tap any tile to enter that scene.
   ================================================================= */

const ANCLAS_TILE = {
  key: "anclas",
  roman: "✦",
  date: "Cierre",
  title: "Anclas de la semana",
  subtitle: "Fija las verdades al corazón",
};

export default function Home({ onSwipe, onPick, completed, onRestart }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const tiles = [...DAY_KEYS.map((k) => DAY_META[k]), ANCLAS_TILE];

  return (
    <SceneShell screenKey="home" onSwipe={onSwipe}>
      {/* TITLE BAND */}
      <div className="flex flex-col items-center text-center mb-3">
        <div className="flex items-center gap-2">
          <Flame size={22} />
          <div className="eyebrow" style={{ color: "#a67f1c" }}>
            Lección 4 · 25 abril 2026
          </div>
        </div>
        <h1
          className="font-display c-parchment mt-2"
          style={{
            fontSize: "clamp(28px, 7.5vw, 38px)",
            lineHeight: 1.05,
            fontWeight: 500,
          }}
        >
          El Papel de la Biblia
        </h1>
        <p
          className="font-body c-muted mt-1.5 italic"
          style={{ fontSize: 13, maxWidth: 320 }}
        >
          Una semana, ocho escenas. Toca cualquier día para entrar.
        </p>
      </div>

      {/* MEMORY VERSE PILL */}
      <div className="card card-gold px-4 py-3 mb-4 mx-auto" style={{ maxWidth: 480 }}>
        <div className="scripture-ref mb-1">Versículo · Hebreos 4:12</div>
        <div className="font-display c-ink" style={{ fontSize: 15, lineHeight: 1.4 }}>
          "La palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos."
        </div>
      </div>

      {/* GRID OF SCENES */}
      <div
        className="grid mx-auto w-full"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          maxWidth: 480,
          flex: 1,
          minHeight: 0,
          alignContent: "start",
          overflowY: "auto",
        }}
      >
        {tiles.map((d, i) => {
          const isDone = completed.has(d.key);
          return (
            <motion.button
              key={d.key}
              onClick={() => onPick(d.key)}
              data-done={isDone}
              className="tile text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
              style={{ aspectRatio: "1 / 1.05" }}
              aria-label={`Ir a ${d.title}`}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-display c-gold"
                  style={{ fontSize: 18, lineHeight: 1 }}
                >
                  {d.roman}
                </span>
                {isDone ? (
                  <span
                    className="rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      background: "#a67f1c",
                    }}
                    aria-label="Completado"
                  />
                ) : null}
              </div>

              <div>
                <div
                  className="font-sc c-muted"
                  style={{ fontSize: 9, letterSpacing: "0.18em" }}
                >
                  {d.date}
                </div>
                <div
                  className="font-display c-parchment mt-0.5"
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.15,
                  }}
                >
                  {d.title}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <button className="btn-ghost" onClick={() => setAboutOpen(true)}>
          Sobre la lección
        </button>
        {completed.size > 0 ? (
          <button className="btn-ghost" onClick={onRestart}>
            Reiniciar
          </button>
        ) : null}
      </div>

      <BottomSheet
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="Sobre esta lección"
      >
        <p className="mb-3">
          Lección 4 del trimestre · Escuela Sabática para Maestros · semana del{" "}
          <em>18 al 25 de abril de 2026</em>.
        </p>
        <p className="mb-3">
          Cada día es una escena interactiva. Toca, arrastra o mantén presionado para
          revelar la verdad del día. Puedes ir directo a cualquier día desde la barra
          de abajo o desde esta pantalla.
        </p>
        <p className="mb-3" style={{ fontStyle: "italic" }}>
          "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
          <br />
          <span className="scripture-ref">Salmo 119:105</span>
        </p>
        <p className="c-muted" style={{ fontSize: 13 }}>
          Tu progreso se guarda automáticamente en este dispositivo. Reiniciar lo
          borra para volver a empezar.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}
