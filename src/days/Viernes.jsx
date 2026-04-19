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
   VIERNES · Para estudiar y meditar
   Scene: a clock-face at center, 6 daily moments placed around it.
   Tap a moment to cycle its verdict (· / SANA / PUNZANTE / SILENCIO).
   A tally appears on the face. At any time pick your compromiso from
   a row of 7 chips. Picking → Salmo 119:105 takeover.
   ================================================================= */

const MOMENTS = [
  { key: "despertar", label: "Al despertar",    angle:  -90 },
  { key: "cocina",    label: "En la cocina",    angle:  -30 },
  { key: "trafico",   label: "En el tráfico",   angle:   30 },
  { key: "mensaje",   label: "Un mensaje",      angle:   90 },
  { key: "deOtros",   label: "Hablar de otros", angle:  150 },
  { key: "silencio",  label: "En silencio",     angle: -150 },
];

const VERDICTS = ["·", "sana", "punzante", "silencio"];

const COMPROMISOS = [
  "Leer un capítulo cada día",
  "Memorizar un verso",
  "Orar antes de abrir",
  "Una obediencia concreta",
  "Compartir con una persona",
  "Reemplazar un minuto de pantalla",
  "Volver cuando me distraiga",
];

export default function Viernes({
  onSwipe,
  onMarkComplete,
  goTo,
  completed,
}) {
  const meta = DAY_META.viernes;
  const [verdicts, setVerdicts] = useState({});
  const [compromiso, setCompromiso] = useState(null);
  const [takeover, setTakeover] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const cycle = (k) => {
    setVerdicts((prev) => {
      const curr = prev[k] || "·";
      const idx = VERDICTS.indexOf(curr);
      const next = VERDICTS[(idx + 1) % VERDICTS.length];
      return { ...prev, [k]: next };
    });
  };

  const pick = (c) => {
    setCompromiso(c);
    if (!completed.has(meta.key)) onMarkComplete(meta.key);
    setTimeout(() => setTakeover(true), 700);
  };

  const tally = MOMENTS.reduce(
    (acc, m) => {
      const v = verdicts[m.key] || "·";
      if (v === "sana") acc.sana += 1;
      else if (v === "punzante") acc.punzante += 1;
      else if (v === "silencio") acc.silencio += 1;
      return acc;
    },
    { sana: 0, punzante: 0, silencio: 0 }
  );

  return (
    <SceneShell screenKey="viernes" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div className="scene-stage">
        <div
          className="font-sc c-muted text-center mb-2"
          style={{ fontSize: 11, letterSpacing: "0.2em" }}
        >
          24 horas · toca cada momento · clasifica tus palabras
        </div>

        {/* Clock face with moments orbiting */}
        <ClockFace moments={MOMENTS} verdicts={verdicts} onTap={cycle} tally={tally} />

        {/* Compromiso row */}
        <div className="w-full mt-4 max-w-sm">
          <div
            className="font-sc c-muted text-center mb-2"
            style={{ fontSize: 11, letterSpacing: "0.22em" }}
          >
            {compromiso
              ? "Compromiso · elegido"
              : "Elige un compromiso para la semana"}
          </div>
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: 6 }}
          >
            {COMPROMISOS.map((c) => (
              <button
                key={c}
                onClick={() => pick(c)}
                className="chip"
                data-done={compromiso === c}
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.08em",
                  textTransform: "none",
                  padding: "8px 11px",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Takeover
        show={takeover}
        vref="Salmo 119:105"
        text="Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
        cta={
          <div className="flex flex-col items-center gap-2">
            {compromiso ? (
              <div
                className="font-sc c-gold mb-1"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Esta semana · {compromiso}
              </div>
            ) : null}
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("anclas")}
            >
              Ir a las anclas →
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
        title="Para estudiar y meditar"
      >
        <p className="mb-3">
          La lámpara del Salmo 119 no ilumina el horizonte — ilumina{" "}
          <em>tus pies</em>. La Palabra es para <em>este paso</em>.
        </p>
        <p className="mb-3">
          Por eso este día es una auditoría pequeña: ¿qué clase de palabras
          salieron de mí en las últimas 24 horas? No para condenarte; para
          volver. El Salmo 19:14 lo reza así:
        </p>
        <p className="font-display mb-3" style={{ fontSize: 16 }}>
          «Sean gratos los dichos de mi boca y la meditación de mi corazón
          delante de ti, oh Señor.»
        </p>
        <p className="c-muted">
          Un compromiso específico es mejor que siete promesas vagas. La fe se
          ejerce en lo concreto.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Clock Face with 6 moment nodes ---- */
function ClockFace({ moments, verdicts, onTap, tally }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;

  const colorFor = (v) => {
    if (v === "sana") return "#a67f1c";
    if (v === "punzante") return "#8b2635";
    if (v === "silencio") return "#6b5a42";
    return "rgba(26,21,16,0.35)";
  };

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {/* dial */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 8}
          fill="rgba(166,127,28,0.04)"
          stroke="rgba(166,127,28,0.2)"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r - 20}
          fill="#faf7f0"
          stroke="rgba(26,21,16,0.08)"
        />
        {/* tally numbers inside */}
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          fontFamily="'Cormorant SC', serif"
          fontSize="10"
          letterSpacing="0.2em"
          fill="#6b5a42"
        >
          LAS 24h
        </text>
        <text
          x={cx - 30}
          y={cy + 14}
          textAnchor="middle"
          fontFamily="'Fraunces', serif"
          fontSize="18"
          fill="#a67f1c"
          fontWeight="500"
        >
          {tally.sana}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fontFamily="'Fraunces', serif"
          fontSize="18"
          fill="#8b2635"
          fontWeight="500"
        >
          {tally.punzante}
        </text>
        <text
          x={cx + 30}
          y={cy + 14}
          textAnchor="middle"
          fontFamily="'Fraunces', serif"
          fontSize="18"
          fill="#6b5a42"
          fontWeight="500"
        >
          {tally.silencio}
        </text>
        <text
          x={cx - 30}
          y={cy + 26}
          textAnchor="middle"
          fontFamily="'Cormorant SC', serif"
          fontSize="7"
          letterSpacing="0.2em"
          fill="#6b5a42"
        >
          SANAS
        </text>
        <text
          x={cx}
          y={cy + 26}
          textAnchor="middle"
          fontFamily="'Cormorant SC', serif"
          fontSize="7"
          letterSpacing="0.2em"
          fill="#6b5a42"
        >
          PUNZAN
        </text>
        <text
          x={cx + 30}
          y={cy + 26}
          textAnchor="middle"
          fontFamily="'Cormorant SC', serif"
          fontSize="7"
          letterSpacing="0.2em"
          fill="#6b5a42"
        >
          SILEN
        </text>
      </svg>

      {/* 6 moment buttons positioned around the clock */}
      {moments.map((m) => {
        const rad = (m.angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        const v = verdicts[m.key] || "·";
        return (
          <button
            key={m.key}
            onClick={() => onTap(m.key)}
            style={{
              position: "absolute",
              left: x - 38,
              top: y - 18,
              width: 76,
              padding: "6px 4px",
              borderRadius: 999,
              background: v === "·" ? "rgba(166,127,28,0.08)" : colorFor(v),
              border: `1px solid ${v === "·" ? "rgba(166,127,28,0.28)" : colorFor(v)}`,
              color: v === "·" ? "#2a2018" : "#faf7f0",
              fontFamily: "'Cormorant SC', serif",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 260ms ease",
            }}
            aria-label={m.label}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
