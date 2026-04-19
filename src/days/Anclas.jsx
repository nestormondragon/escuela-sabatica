import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SceneShell,
  SceneHeader,
  BottomSheet,
  Takeover,
} from "../ui.jsx";
import { useHoldPress } from "../hooks.js";

/* =================================================================
   ANCLAS · Cierre
   Scene: 7 anchor cards (one per day) + a final anchor for the week.
   TAP-AND-HOLD on each anchor → a ring fills, the anchor ignites and
   "se fija al corazón". All 7 fixed → Salmo 119:105 takeover + bendición.
   ================================================================= */

const ANCHORS = [
  { key: "sabado",    roman: "I",   title: "Sobrevive",  vref: "Isaías 40:8",     line: "La palabra de Dios permanece para siempre." },
  { key: "domingo",   roman: "II",  title: "Es arma",    vref: "Efesios 6:17",    line: "La espada del Espíritu es la palabra de Dios." },
  { key: "lunes",     roman: "III", title: "Es autoridad", vref: "Juan 17:17",    line: "Tu palabra es verdad." },
  { key: "martes",    roman: "IV",  title: "Es pura",    vref: "Salmo 12:6",      line: "Plata refinada siete veces." },
  { key: "miercoles", roman: "V",   title: "Pide respuesta", vref: "Santiago 1:22", line: "Sé hacedor de la palabra." },
  { key: "jueves",    roman: "VI",  title: "Pide corazón", vref: "Marcos 4:20",   line: "Los que oyen, reciben y dan fruto." },
  { key: "viernes",   roman: "VII", title: "Es lámpara", vref: "Salmo 119:105",   line: "Lámpara a mis pies, lumbrera a mi camino." },
];

export default function Anclas({
  onSwipe,
  onMarkComplete,
  onRefrain,
  onRestart,
  goTo,
  completed,
}) {
  const [fixed, setFixed] = useState(() => new Set());
  const [takeover, setTakeover] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeRead, setActiveRead] = useState(null);

  const all = fixed.size === ANCHORS.length;

  const fix = (key) => {
    setFixed((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  useEffect(() => {
    if (all) {
      if (!completed.has("anclas")) onMarkComplete("anclas");
      onRefrain && onRefrain();
      const t = setTimeout(() => setTakeover(true), 900);
      return () => clearTimeout(t);
    }
  }, [all, completed, onMarkComplete, onRefrain]);

  const meta = {
    roman: "✦",
    date: "Cierre · semana completa",
    title: "Anclas de la semana",
    subtitle: "Mantén presionada cada ancla para fijarla al corazón",
  };

  return (
    <SceneShell screenKey="anclas" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div className="scene-stage">
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            maxWidth: 440,
          }}
        >
          {ANCHORS.map((a) => (
            <AnchorCard
              key={a.key}
              anchor={a}
              fixed={fixed.has(a.key)}
              onFixed={() => fix(a.key)}
              onRead={() => setActiveRead(a)}
            />
          ))}
          {/* final spacer card: count */}
          <div
            className="card flex flex-col items-center justify-center"
            style={{
              padding: 8,
              aspectRatio: "1 / 1.15",
              background: "rgba(166,127,28,0.08)",
              borderColor: "rgba(166,127,28,0.35)",
            }}
          >
            <div
              className="font-display c-gold"
              style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}
            >
              {fixed.size}
            </div>
            <div
              className="font-sc c-muted"
              style={{ fontSize: 8, letterSpacing: "0.25em", marginTop: 4 }}
            >
              DE 7
            </div>
            <div
              className="font-sc c-muted"
              style={{ fontSize: 8, letterSpacing: "0.22em", marginTop: 6, textAlign: "center" }}
            >
              ANCLADAS
            </div>
          </div>
        </div>
      </div>

      <Takeover
        show={takeover}
        vref="Salmo 119:105"
        text="Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
      >
        <div
          className="font-sc c-gold mt-6"
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          De tu mente · a tu corazón
        </div>
        <div className="flex flex-col items-center gap-2 mt-5">
          <button className="btn-primary" data-gold="true" onClick={() => goTo("home")}>
            Ir al mapa
          </button>
          <button className="btn-ghost" onClick={() => goTo("sabado")}>
            Volver a un día
          </button>
          <button className="btn-ghost" onClick={onRestart}>
            Reiniciar la semana
          </button>
        </div>
      </Takeover>

      <BottomSheet
        open={!!activeRead}
        onClose={() => setActiveRead(null)}
        title={activeRead ? activeRead.title : ""}
      >
        {activeRead ? (
          <>
            <div className="scripture-ref mb-1">{activeRead.vref}</div>
            <p className="font-display c-ink" style={{ fontSize: 17, lineHeight: 1.45 }}>
              {activeRead.line}
            </p>
            <p className="c-muted mt-4" style={{ fontSize: 13 }}>
              Mantén presionada la tarjeta hasta que el círculo se llene y el ancla
              se encienda.
            </p>
          </>
        ) : null}
      </BottomSheet>

      <BottomSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title="Siete anclas, una semana"
      >
        <p className="mb-3">
          En la navegación antigua, el ancla no impedía moverse — sostenía al
          barco cuando la tormenta intentaba arrastrarlo. La Palabra hace lo
          mismo. Después de esta semana, cuando llegue un miércoles en la
          oficina o un jueves en el hospital o un viernes en la cocina, vuelves
          a estas siete anclas.
        </p>
        <p className="italic">
          «Esperanza que tenemos como segura y firme ancla del alma.»
        </p>
        <div className="scripture-ref mb-3">Hebreos 6:19</div>
        <p className="c-muted">
          La Palabra no te da una posición cómoda; te da una <em>sujeción</em>.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- AnchorCard with tap-and-hold to fix ---- */
function AnchorCard({ anchor, fixed, onFixed, onRead }) {
  const { handlers, fill, active } = useHoldPress({
    duration: 900,
    onComplete: onFixed,
  });

  const progress = fixed ? 1 : fill;
  const dash = 2 * Math.PI * 26; // r = 26

  return (
    <div
      {...handlers}
      className="card tap-target"
      onDoubleClick={onRead}
      style={{
        padding: 8,
        aspectRatio: "1 / 1.15",
        position: "relative",
        overflow: "hidden",
        background: fixed ? "rgba(166,127,28,0.12)" : "#faf7f0",
        border: fixed
          ? "1px solid rgba(166,127,28,0.55)"
          : "1px solid rgba(26,21,16,0.08)",
        boxShadow: fixed ? "0 0 14px rgba(166,127,28,0.25)" : "none",
        transition: "background 300ms ease, box-shadow 400ms ease, border 300ms ease",
        userSelect: "none",
        touchAction: "manipulation",
      }}
      aria-label={anchor.title}
    >
      <div
        className="font-display c-gold"
        style={{ fontSize: 11, letterSpacing: "0.14em" }}
      >
        {anchor.roman}
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 2 }}>
        <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          {/* hold ring */}
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="rgba(26,21,16,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke={fixed ? "#a67f1c" : active ? "#a67f1c" : "transparent"}
            strokeWidth="2"
            strokeDasharray={dash}
            strokeDashoffset={dash * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 30 30)"
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
          {/* anchor icon */}
          <g
            stroke={fixed ? "#a67f1c" : "#6b5a42"}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          >
            <circle cx="30" cy="19" r="3" />
            <line x1="30" y1="22" x2="30" y2="40" />
            <line x1="25" y1="26" x2="35" y2="26" />
            <path d="M20 38 Q 30 46 40 38" />
          </g>
        </svg>
      </div>

      <div
        className="font-display c-parchment text-center mt-1"
        style={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.15,
          padding: "0 2px",
        }}
      >
        {anchor.title}
      </div>

      <AnimatePresence>
        {fixed ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sc c-gold text-center mt-1"
            style={{ fontSize: 8, letterSpacing: "0.22em" }}
          >
            ANCLADA
          </motion.div>
        ) : (
          <div
            className="font-sc c-muted text-center mt-1"
            style={{ fontSize: 8, letterSpacing: "0.22em" }}
          >
            MANTÉN
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
