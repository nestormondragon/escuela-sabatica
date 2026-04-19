import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ============================================================
   Shared UI — motifs and chrome that recur across every day.
   ============================================================ */

/* Day metadata -------------------------------------------------- */
export const DAYS = [
  { key: "sabado",    label: "Sábado",    date: "18 de abril",  roman: "I",   title: "Un libro que sobrevive",        subtitle: "Introducción · Por qué este libro importa",              verse: "Hebreos 4:12" },
  { key: "domingo",   label: "Domingo",   date: "19 de abril",  roman: "II",  title: "El arma más poderosa",          subtitle: "La Escritura como espada en la guerra del alma",         verse: "2 Timoteo 3:15-17" },
  { key: "lunes",     label: "Lunes",     date: "20 de abril",  roman: "III", title: "La autoridad de las Escrituras", subtitle: "¿Quién gobierna tu fe?",                                  verse: "Juan 17:17" },
  { key: "martes",    label: "Martes",    date: "21 de abril",  roman: "IV",  title: "La verdad bíblica",             subtitle: "Purificada siete veces",                                  verse: "Salmo 12:6" },
  { key: "miercoles", label: "Miércoles", date: "22 de abril",  roman: "V",   title: "Requerimientos bíblicos",       subtitle: "La espada que divide",                                    verse: "Hebreos 4:12" },
  { key: "jueves",    label: "Jueves",    date: "23 de abril",  roman: "VI",  title: "La condición del corazón",      subtitle: "La tierra donde cae la semilla",                          verse: "Jeremías 15:16" },
  { key: "viernes",   label: "Viernes",   date: "24 de abril",  roman: "VII", title: "Para estudiar y meditar",       subtitle: "De la abundancia del corazón, habla la boca",             verse: "Mateo 12:34" },
];

export const dayIndex = (k) => DAYS.findIndex((d) => d.key === k);
export const dayByKey = (k) => DAYS.find((d) => d.key === k);

/* ============================================================
   Flame — small, persistent, upper-right. A memory cue:
   "¿No es mi palabra como fuego?" (Jer 23:29)
   ============================================================ */
export function Flame({ size = 36 }) {
  return (
    <div className="pointer-events-none" style={{ width: size, height: size * 1.35 }}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rg-flame rounded-full" style={{ filter: "blur(6px)" }} />
        <div className="absolute inset-0 flame-dance">
          <svg viewBox="0 0 40 54" className="w-full h-full">
            <defs>
              <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#8b2635" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#a67f1c" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f2d370" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M20 52 C6 46 4 34 10 24 C12 28 14 28 15 25 C14 18 18 10 20 4 C22 12 28 16 29 24 C31 21 33 22 33 26 C37 34 34 46 20 52 Z"
              fill="url(#flameGrad)"
            />
            <path
              d="M20 44 C14 41 13 34 16 28 C17 30 19 30 19 28 C19 24 21 18 20 14 C23 20 26 24 26 30 C28 31 27 37 20 44 Z"
              fill="#faf7f0"
              opacity="0.35"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SwordWatermark — persistent fixed background element
   ============================================================ */
export function SwordWatermark() {
  return <div className="sword-watermark" aria-hidden="true" />;
}

/* ============================================================
   RefrainMark — appears on trigger. The chorus of the week:
   "¡Escrito está!" — Jesus's weapon against temptation (Mt 4).
   ============================================================ */
export function RefrainMark({ trigger }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key={trigger}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="font-sc c-gold t-wide-38 text-xl md:text-3xl refrain-fade">
            ¡ESCRITO ESTÁ!
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Reveal — in-view animation wrapper
   ============================================================ */
export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.9, 0.4, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Eyebrow — tiny all-caps label over section titles
   ============================================================ */
export function Eyebrow({ children, tone = "gold" }) {
  const color = tone === "rubric" ? "c-rubric" : "c-gold";
  return <div className={`font-sc fs-10 t-wide-35 ${color}`}>{children}</div>;
}

/* ============================================================
   VerseCard — scripture display
   ============================================================ */
export function VerseCard({ children, cite, large = false, tone = "gold", emphasis }) {
  const border = tone === "rubric" ? "b-rubric-50" : "b-gold-30";
  return (
    <figure className={`relative border-l-2 ${border} pl-6 py-3 max-w-3xl`}>
      <blockquote
        className={`font-body italic c-parchment-95 ${large ? "text-2xl md:text-3xl leading-snug" : "text-xl leading-relaxed"}`}
      >
        {emphasis ? (
          <>
            {children}
          </>
        ) : (
          children
        )}
      </blockquote>
      {cite && (
        <figcaption className={`font-sc text-xs not-italic mt-3 block ${tone === "rubric" ? "c-rubric" : "c-gold"}`}>
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/* ============================================================
   Quote — Ellen White / supporting quotes
   ============================================================ */
export function Quote({ children, cite }) {
  return (
    <figure className="max-w-3xl">
      <blockquote className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed italic">
        <span className="c-gold font-display text-3xl md:text-4xl leading-none align-top mr-1">“</span>
        {children}
        <span className="c-gold font-display text-3xl md:text-4xl leading-none align-bottom ml-1">”</span>
      </blockquote>
      {cite && (
        <figcaption className="font-sc text-xs mt-4 c-ash t-wide-2">{cite}</figcaption>
      )}
    </figure>
  );
}

/* ============================================================
   DayHeader — title block at the top of every day
   ============================================================ */
export function DayHeader({ day }) {
  return (
    <header className="relative pt-16 md:pt-24 pb-10 md:pb-16 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="absolute top-0 left-0 right-0 h-24 g-day-top" />
      <Reveal>
        <div className="flex items-center gap-4 mb-8">
          <div className="font-sc fs-11 t-wide-35 c-gold-80">{day.roman}</div>
          <div className="h-px flex-1 bg-gold-10" style={{ maxWidth: 120 }} />
          <div className="font-sc fs-11 t-wide-35 c-ash">{day.label} · {day.date}</div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-display c-parchment text-4xl md:text-6xl lg:text-7xl font-light lh-105 mb-4">
          {day.title}
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="font-body italic c-parchment-75 text-lg md:text-xl max-w-2xl">
          {day.subtitle}
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 border b-gold-15 bg-gold-10">
          <div className="w-1.5 h-1.5 rounded-full bg-gold pulse-dot" />
          <span className="font-sc fs-11 t-wide-3 c-gold">Versículo guía · {day.verse}</span>
        </div>
      </Reveal>
    </header>
  );
}

/* ============================================================
   KeyPoint — highlighted takeaway box
   ============================================================ */
export function KeyPoint({ label = "RECUERDA", children }) {
  return (
    <div className="border-l-2 b-gold-30 pl-6 py-4 bg-gold-10 max-w-2xl">
      <div className="font-sc fs-10 t-wide-35 c-gold mb-2">{label}</div>
      <div className="font-body c-parchment text-lg md:text-xl leading-relaxed">{children}</div>
    </div>
  );
}

/* ============================================================
   DayCompleteNavigator — the gate between days
   ============================================================ */
export function DayCompleteNavigator({ currentKey, onNext, onPick }) {
  const idx = dayIndex(currentKey);
  const isLast = idx === DAYS.length - 1;
  const nextDay = !isLast ? DAYS[idx + 1] : null;

  return (
    <section className="relative mt-16 md:mt-24 mb-8 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="relative border-t b-gold-15 pt-10">
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rotate-45 border b-gold-15 bg-night"
          aria-hidden="true"
        />

        <Reveal>
          <div className="text-center mb-8">
            <div className="font-sc fs-10 t-wide-4 c-gold mb-3">HAS COMPLETADO</div>
            <div className="font-display c-parchment text-2xl md:text-3xl italic">
              {DAYS[idx].label} · {DAYS[idx].title}
            </div>
            <div className="font-sc fs-10 t-wide-3 c-ash mt-4">
              Día {idx + 1} de 7 · Sigue el ritmo que te sirva
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {nextDay ? (
            <button className="nav-btn primary hover-lift" onClick={onNext}>
              <span>Continuar al {nextDay.label.toLowerCase()}</span>
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button className="nav-btn primary hover-lift" onClick={onNext}>
              <span>Cerrar con las Anclas de la semana</span>
              <span aria-hidden="true">✦</span>
            </button>
          )}
          <button className="nav-btn hover-lift" onClick={onPick}>
            <span>Ir a otro día</span>
          </button>
        </div>

        <Reveal delay={0.3}>
          <p className="text-center mt-8 font-body italic c-ash text-sm md:text-base max-w-xl mx-auto">
            Un día a la vez. La Palabra se graba por repetición, no por prisa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   DayPicker — modal with all seven days + closing
   ============================================================ */
export function DayPicker({ open, currentKey, completed, onPick, onClose, onGoToAnchors }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-night/95 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          className="relative min-h-screen flex flex-col items-center justify-start py-16 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-4xl">
            <div className="flex items-start justify-between mb-10">
              <div>
                <div className="font-sc fs-11 t-wide-35 c-gold mb-3">ÍNDICE DE LA SEMANA</div>
                <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105">
                  Lección 4 · <span className="italic c-gold">El Papel de la Biblia</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="font-sc fs-11 t-wide-3 c-ash hover:c-gold border b-stone-40 hover:b-gold px-4 py-2 transition-colors"
              >
                CERRAR ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAYS.map((d) => {
                const done = completed.has(d.key);
                const isCurrent = d.key === currentKey;
                return (
                  <button
                    key={d.key}
                    onClick={() => onPick(d.key)}
                    className={`picker-card no-select ${done ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="font-sc fs-11 t-wide-3 c-gold-80 mt-1 w-8 shrink-0">{d.roman}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <div className="font-sc fs-11 t-wide-3 c-ash">{d.label} · {d.date}</div>
                          {done && (
                            <div className="font-sc fs-10 t-wide-3 c-gold">· LEÍDO</div>
                          )}
                          {isCurrent && !done && (
                            <div className="font-sc fs-10 t-wide-3 c-rubric">· ACTUAL</div>
                          )}
                        </div>
                        <div className="font-display text-xl md:text-2xl c-parchment lh-105 mt-2">
                          {d.title}
                        </div>
                        <div className="font-body italic c-parchment-75 text-base mt-2 leading-snug">
                          {d.subtitle}
                        </div>
                        <div className="font-sc fs-10 t-wide-3 c-gold mt-3">· {d.verse}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                onClick={onGoToAnchors}
                className="picker-card w-full no-select"
                style={{ background: "rgba(166,127,28,0.06)", borderColor: "rgba(166,127,28,0.55)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="font-sc fs-11 t-wide-3 c-gold-80 mt-1 w-8 shrink-0">✦</div>
                  <div className="flex-1">
                    <div className="font-sc fs-11 t-wide-3 c-gold">CIERRE</div>
                    <div className="font-display text-xl md:text-2xl c-parchment lh-105 mt-2">
                      Anclas de la semana
                    </div>
                    <div className="font-body italic c-parchment-75 text-base mt-2">
                      Siete verdades que se graban en el corazón · para llevar.
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-12 text-center">
              <p className="font-body italic c-ash max-w-xl mx-auto">
                Esta lección está pensada para vivirse un día a la vez. Puedes volver a cualquier día cuando quieras.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   ReadingIndicator — a soft progress bar at top-left
   ============================================================ */
export function ReadingIndicator({ progress }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-40 pointer-events-none">
      <div
        className="h-full bg-gold transition-all duration-300"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%`, opacity: 0.5 }}
      />
    </div>
  );
}

/* ============================================================
   DayChrome — fixed chrome on every day view:
   flame + small label + "ir al índice" + back-to-top
   ============================================================ */
export function DayChrome({ day, onOpenPicker }) {
  return (
    <>
      {/* Top-right flame + day label */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-3 pointer-events-none">
        <div className="pointer-events-auto">
          <Flame size={28} />
        </div>
        <button
          onClick={onOpenPicker}
          className="pointer-events-auto border b-gold-15 hover:b-gold bg-night/85 backdrop-blur-sm px-3 py-2 font-sc fs-10 t-wide-3 c-ash hover:c-gold transition-colors"
          aria-label="Abrir índice de la semana"
        >
          <span className="hidden sm:inline">{day.label.toUpperCase()} · </span>
          <span>{day.roman} / VII</span>
        </button>
      </div>
    </>
  );
}
