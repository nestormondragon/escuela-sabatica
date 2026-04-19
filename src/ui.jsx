import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =================================================================
   UI PRIMITIVES · V5
   Mobile-first single-screen shell + shared components.
   ================================================================= */

/* -----------------------------------------------------------------
   SCREENS — the 9 destinations (home + 7 days + anclas)
   ----------------------------------------------------------------- */
export const SCREENS = [
  { key: "home",      short: "✦",  label: "Inicio",    full: "Mapa",        roman: "✦"   },
  { key: "sabado",    short: "S",  label: "Sábado",    full: "Sábado 18",   roman: "I"   },
  { key: "domingo",   short: "D",  label: "Domingo",   full: "Domingo 19",  roman: "II"  },
  { key: "lunes",     short: "L",  label: "Lunes",     full: "Lunes 20",    roman: "III" },
  { key: "martes",    short: "M",  label: "Martes",    full: "Martes 21",   roman: "IV"  },
  { key: "miercoles", short: "X",  label: "Miércoles", full: "Miércoles 22",roman: "V"   },
  { key: "jueves",    short: "J",  label: "Jueves",    full: "Jueves 23",   roman: "VI"  },
  { key: "viernes",   short: "V",  label: "Viernes",   full: "Viernes 24",  roman: "VII" },
  { key: "anclas",    short: "⚓", label: "Anclas",    full: "Anclas",      roman: "✦"   },
];

/* DAY_META — richer metadata used inside each scene */
export const DAY_META = {
  sabado: {
    key: "sabado",
    roman: "I",
    date: "Sábado 18 · abril",
    title: "Un libro que sobrevive",
    subtitle: "La Palabra atraviesa los siglos",
    verse: { ref: "Hebreos 4:12", text: "Porque la palabra de Dios es viva y eficaz…" },
  },
  domingo: {
    key: "domingo",
    roman: "II",
    date: "Domingo 19 · abril",
    title: "El arma más poderosa",
    subtitle: "La espada del Espíritu",
    verse: { ref: "Efesios 6:17", text: "…tomad la espada del Espíritu, que es la palabra de Dios." },
  },
  lunes: {
    key: "lunes",
    roman: "III",
    date: "Lunes 20 · abril",
    title: "La autoridad de las Escrituras",
    subtitle: "¿En qué confías para la verdad?",
    verse: { ref: "Juan 17:17", text: "Tu palabra es verdad." },
  },
  martes: {
    key: "martes",
    roman: "IV",
    date: "Martes 21 · abril",
    title: "La verdad bíblica",
    subtitle: "Plata refinada siete veces",
    verse: { ref: "Salmo 12:6", text: "Las palabras del Señor son palabras puras…" },
  },
  miercoles: {
    key: "miercoles",
    roman: "V",
    date: "Miércoles 22 · abril",
    title: "Requerimientos bíblicos",
    subtitle: "Lo que la Palabra pide de ti",
    verse: { ref: "Santiago 1:22", text: "Sed hacedores de la palabra, y no tan solamente oidores…" },
  },
  jueves: {
    key: "jueves",
    roman: "VI",
    date: "Jueves 23 · abril",
    title: "La condición del corazón",
    subtitle: "Cuatro suelos, una semilla",
    verse: { ref: "Jeremías 15:16", text: "Fueron halladas tus palabras, y yo las comí…" },
  },
  viernes: {
    key: "viernes",
    roman: "VII",
    date: "Viernes 24 · abril",
    title: "Para estudiar y meditar",
    subtitle: "Un compromiso para esta semana",
    verse: { ref: "Salmo 119:105", text: "Lámpara es a mis pies tu palabra." },
  },
};

export const DAY_KEYS = [
  "sabado","domingo","lunes","martes","miercoles","jueves","viernes",
];

/* adjacency for swipe */
export const SCREEN_ORDER = SCREENS.map((s) => s.key);
export function neighborKey(currentKey, direction) {
  const idx = SCREEN_ORDER.indexOf(currentKey);
  if (idx < 0) return null;
  const next = direction === "next" ? idx + 1 : idx - 1;
  if (next < 0 || next >= SCREEN_ORDER.length) return null;
  return SCREEN_ORDER[next];
}

/* -----------------------------------------------------------------
   FLAME — small ambient SVG
   ----------------------------------------------------------------- */
export function Flame({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 40 50"
      className="flame-dance"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="flameGrad-v5" cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor="#fff4d8" stopOpacity="1" />
          <stop offset="45%" stopColor="#f1c05a" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#a67f1c" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#8b2635" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <path
        d="M20 4 C 14 14, 8 18, 8 28 C 8 37, 13 46, 20 46 C 27 46, 32 37, 32 28 C 32 22, 28 18, 24 12 C 23 16, 21 18, 20 18 C 19 15, 20 10, 20 4 Z"
        fill="url(#flameGrad-v5)"
      />
      <ellipse cx="20" cy="48" rx="6" ry="1.2" fill="#1a1510" opacity="0.25" />
    </svg>
  );
}

/* -----------------------------------------------------------------
   REFRAIN MARK — brief "¡ESCRITO ESTÁ!" flash
   ----------------------------------------------------------------- */
export function RefrainMark({ trigger }) {
  return (
    <AnimatePresence>
      {trigger ? (
        <motion.div
          key={`refrain-${trigger}`}
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 90 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="refrain-flash font-sc c-gold"
            style={{ fontSize: "clamp(22px, 6vw, 36px)" }}
          >
            ¡ESCRITO · ESTÁ!
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -----------------------------------------------------------------
   DAY STRIP — persistent bottom navigator
   ----------------------------------------------------------------- */
export function DayStrip({ currentKey, completed, onPick }) {
  return (
    <nav className="day-strip" aria-label="Día">
      {SCREENS.map((s) => {
        const isActive = s.key === currentKey;
        const isDone = completed.has(s.key);
        return (
          <button
            key={s.key}
            className="day-pill"
            data-active={isActive}
            data-done={isDone}
            onClick={() => onPick(s.key)}
            aria-label={s.label}
            aria-current={isActive ? "page" : undefined}
          >
            {isActive ? s.label : s.short}
          </button>
        );
      })}
    </nav>
  );
}

/* -----------------------------------------------------------------
   SCENE HEADER — compact day title + "más" button
   ----------------------------------------------------------------- */
export function SceneHeader({ meta, onOpenMore, rightSlot }) {
  return (
    <header className="flex items-start justify-between gap-3 mb-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-display c-gold" style={{ fontSize: 16 }}>
            {meta.roman}
          </span>
          <span className="eyebrow" style={{ color: "#6b5a42" }}>
            {meta.date}
          </span>
        </div>
        <h1
          className="font-display c-parchment mt-0.5"
          style={{ fontSize: "clamp(22px, 5.8vw, 28px)", lineHeight: 1.1, fontWeight: 500 }}
        >
          {meta.title}
        </h1>
        {meta.subtitle ? (
          <p className="font-body c-muted mt-1" style={{ fontSize: 13, fontStyle: "italic" }}>
            {meta.subtitle}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2 pt-1">
        {rightSlot}
        {onOpenMore ? (
          <button
            className="btn-ghost"
            style={{ padding: "7px 12px", minHeight: 36, fontSize: 10 }}
            onClick={onOpenMore}
            aria-label="Leer más"
          >
            Leer más
          </button>
        ) : null}
      </div>
    </header>
  );
}

/* -----------------------------------------------------------------
   SCENE SHELL — full-viewport canvas with horizontal swipe
   ----------------------------------------------------------------- */
export function SceneShell({ screenKey, onSwipe, children }) {
  const handleDragEnd = (_e, info) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    const threshold = 70;
    if (dx <= -threshold || vx < -500) onSwipe("next");
    else if (dx >= threshold || vx > 500) onSwipe("prev");
  };

  return (
    <motion.div
      key={screenKey}
      className="scene-canvas scene-enter"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.16}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 0.9, 0.4, 1] }}
    >
      <div className="sword-bg" />
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   BOTTOM SHEET — overlay drawer for "Leer más"
   ----------------------------------------------------------------- */
export function BottomSheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="sheet-scrim"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 0.9, 0.4, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <div className="sheet-handle" />
            {title ? (
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display c-parchment" style={{ fontSize: 20, fontWeight: 500 }}>
                  {title}
                </h3>
                <button
                  className="btn-ghost"
                  style={{ padding: "6px 12px", minHeight: 32, fontSize: 10 }}
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </div>
            ) : null}
            <div className="font-body c-ink" style={{ fontSize: 15, lineHeight: 1.55 }}>
              {children}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* -----------------------------------------------------------------
   PROGRESS DOTS (used inside scenes for "3/6 revelados")
   ----------------------------------------------------------------- */
export function ProgressDots({ total, done }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="inline-block rounded-full"
          style={{
            width: 6,
            height: 6,
            background: i < done ? "#a67f1c" : "rgba(26,21,16,0.18)",
            transition: "background 240ms ease",
          }}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------
   VERSE BADGE — small inline ref
   ----------------------------------------------------------------- */
export function VerseBadge({ ref: vref, text }) {
  return (
    <div
      className="card px-3 py-2"
      style={{ background: "rgba(166,127,28,0.06)" }}
    >
      <div className="scripture-ref mb-0.5">{vref}</div>
      {text ? (
        <div className="font-body c-ink" style={{ fontSize: 13, fontStyle: "italic" }}>
          {text}
        </div>
      ) : null}
    </div>
  );
}

/* -----------------------------------------------------------------
   TAKEOVER — full-scene verse reveal
   ----------------------------------------------------------------- */
export function Takeover({ show, vref, text, cta, children }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="takeover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-center max-w-md"
          >
            <div className="scripture-ref mb-3">{vref}</div>
            <div className="scripture font-display">{text}</div>
            {children ? <div className="mt-6">{children}</div> : null}
            {cta ? <div className="mt-6">{cta}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
