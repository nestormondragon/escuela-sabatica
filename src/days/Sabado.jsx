import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SceneShell,
  SceneHeader,
  BottomSheet,
  ProgressDots,
  Takeover,
  DAY_META,
} from "../ui.jsx";

/* =================================================================
   SÁBADO · Un libro que sobrevive
   Scene: Bible at center, 6 historic moments as pills around it.
   Tap a pill → opens a bottom sheet with QUÉ PASÓ / DESPUÉS.
   All 6 revealed → Heb 4:12 takeover.
   ================================================================= */

const MOMENTS = [
  {
    key: "diocleciano",
    year: "303",
    label: "Diocleciano",
    what: "El emperador Diocleciano decreta quemar cada copia de las Escrituras en todo el Imperio Romano.",
    after:
      "Veintidós años después, Constantino ordena imprimir Biblias a costa del tesoro imperial.",
  },
  {
    key: "wycliffe",
    year: "1380",
    label: "Wycliffe",
    what: "Juan Wycliffe traduce la Biblia al inglés. La iglesia le persigue; mueren copistas por leerla.",
    after:
      "Treinta y un años después de su muerte desentierran sus huesos y los queman, pero sus ideas ya corren por toda Europa.",
  },
  {
    key: "tyndale",
    year: "1536",
    label: "Tyndale",
    what: "William Tyndale es estrangulado y quemado en la hoguera por traducir el Nuevo Testamento al inglés.",
    after:
      "Tres años después el rey Enrique VIII autoriza oficialmente una Biblia en inglés, basada en el trabajo de Tyndale.",
  },
  {
    key: "voltaire",
    year: "1760",
    label: "Voltaire",
    what: "Voltaire declara: «En cien años la Biblia será una curiosidad de museo».",
    after:
      "Cien años después, su propia casa en Ginebra se usa como centro de impresión de Biblias para toda Europa.",
  },
  {
    key: "urss",
    year: "1917",
    label: "URSS",
    what: "El estado soviético prohíbe oficialmente la Biblia durante setenta años.",
    after:
      "Tras la caída del muro, Biblias inundan Rusia como nunca antes en su historia.",
  },
  {
    key: "hoy",
    year: "Hoy",
    label: "Tus manos",
    what: "En tu teléfono, en tu mesa, en tu idioma, abierta. Sin imperio que la prohíba.",
    after:
      "La pregunta ya no es si sobrevive. La pregunta es qué harás con ella en esta semana.",
  },
];

export default function Sabado({
  onSwipe,
  onMarkComplete,
  goTo,
  completed,
}) {
  const meta = DAY_META.sabado;
  const [revealed, setRevealed] = useState(() => new Set());
  const [active, setActive] = useState(null); // moment key
  const [sheetOpen, setSheetOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const allRevealed = revealed.size === MOMENTS.length;

  useEffect(() => {
    if (allRevealed && !completed.has(meta.key)) {
      onMarkComplete(meta.key);
    }
  }, [allRevealed, completed, meta.key, onMarkComplete]);

  const openMoment = (key) => {
    setActive(key);
    setSheetOpen(true);
    setRevealed((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const current = useMemo(
    () => MOMENTS.find((m) => m.key === active) || null,
    [active]
  );

  return (
    <SceneShell screenKey="sabado" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      {/* CENTRAL STAGE */}
      <div className="scene-stage">
        {/* Bible at center */}
        <BibleSvg glow={allRevealed} />

        {/* Caption */}
        <div className="text-center mt-2 mb-2">
          <div
            className="font-sc c-muted"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            {allRevealed
              ? "Seis imperios, un libro"
              : "Toca cada momento histórico"}
          </div>
        </div>

        {/* Six moments grid */}
        <div
          className="w-full grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            maxWidth: 420,
          }}
        >
          {MOMENTS.map((m) => {
            const isDone = revealed.has(m.key);
            return (
              <button
                key={m.key}
                className="chip flex-col"
                data-done={isDone}
                onClick={() => openMoment(m.key)}
                style={{
                  flexDirection: "column",
                  padding: "10px 6px",
                  lineHeight: 1.1,
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: 13,
                    color: isDone ? "#7a5e12" : "#2a2018",
                    fontWeight: 500,
                  }}
                >
                  {m.year}
                </div>
                <div
                  className="font-sc"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    marginTop: 2,
                  }}
                >
                  {m.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-3">
          <ProgressDots total={MOMENTS.length} done={revealed.size} />
        </div>
      </div>

      {/* TAKEOVER when all revealed */}
      <Takeover
        show={allRevealed}
        vref="Hebreos 4:12"
        text="La palabra de Dios es viva y eficaz, más cortante que toda espada de dos filos."
        cta={
          <div className="flex flex-col items-center gap-2">
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("domingo")}
            >
              Seguir · Domingo →
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                setRevealed(new Set());
              }}
            >
              Volver a explorar
            </button>
          </div>
        }
      />

      {/* BOTTOM SHEET · moment detail */}
      <BottomSheet
        open={sheetOpen && !!current}
        onClose={() => setSheetOpen(false)}
        title={current ? `${current.year} · ${current.label}` : ""}
      >
        {current ? (
          <>
            <div className="eyebrow mb-1">Lo que pasó</div>
            <p className="mb-4" style={{ fontSize: 15.5 }}>
              {current.what}
            </p>
            <div className="eyebrow mb-1" style={{ color: "#a67f1c" }}>
              Lo que pasó después
            </div>
            <p className="font-display c-ink" style={{ fontSize: 16, lineHeight: 1.45 }}>
              {current.after}
            </p>
          </>
        ) : null}
      </BottomSheet>

      {/* BOTTOM SHEET · más contexto */}
      <BottomSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title="Un libro que sobrevive"
      >
        <p className="mb-3">
          Ningún libro antiguo ha enfrentado tantos intentos de destrucción como la
          Biblia. Imperios, emperadores, filósofos e ideologías han declarado su
          fin — y sin embargo sigue abriéndose cada día en millones de hogares.
        </p>
        <p className="mb-3 italic">
          "Se secará la hierba, se marchitará la flor; pero la palabra del Dios
          nuestro permanece para siempre."
        </p>
        <div className="scripture-ref mb-3">Isaías 40:8</div>
        <p className="c-muted">
          Esta semana la arqueología histórica prepara el terreno: si tantos
          quisieron silenciarla, es porque es <em>viva</em>. Mañana vemos por qué
          temen — porque es <em>arma</em>.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Bible SVG · small, stylized ---- */
function BibleSvg({ glow }) {
  return (
    <motion.svg
      width={140}
      height={140}
      viewBox="0 0 140 140"
      aria-hidden="true"
      animate={glow ? { filter: "drop-shadow(0 0 18px rgba(166,127,28,0.55))" } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* cover */}
      <rect
        x="26"
        y="28"
        width="88"
        height="86"
        rx="4"
        fill="#5a1a22"
        stroke="#3a0f18"
        strokeWidth="1"
      />
      {/* pages */}
      <rect x="32" y="32" width="76" height="78" fill="#f7efd8" />
      <rect x="32" y="32" width="76" height="78" fill="none" stroke="#e2d3a8" strokeWidth="0.5" />
      {/* spine highlight */}
      <rect x="24" y="28" width="4" height="86" fill="#3a0f18" />
      {/* cross */}
      <path
        d="M70 50 L70 80 M58 62 L82 62"
        stroke={glow ? "#a67f1c" : "#7a5e12"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* aura ring */}
      <AnimatePresence>
        {glow ? (
          <motion.circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke="#a67f1c"
            strokeWidth="1"
            initial={{ opacity: 0, r: 52 }}
            animate={{ opacity: 0.6, r: 62 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
          />
        ) : null}
      </AnimatePresence>
    </motion.svg>
  );
}
