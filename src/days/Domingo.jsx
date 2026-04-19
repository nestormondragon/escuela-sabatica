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
   DOMINGO · El arma más poderosa
   Scene: sword silhouette at center (dim), 4 distractions float
   around it. Tap a distraction → dissolves in smoke. All 4 silenced
   → sword ignites + Ef 6:17 takeover.
   ================================================================= */

const DISTRACTIONS = [
  {
    key: "afanes",
    label: "Afanes",
    gloss: "Trabajo, urgencias, cuentas sin pagar",
    anti: "«No os afanéis por vuestra vida…» — Mateo 6:25",
  },
  {
    key: "apatia",
    label: "Apatía",
    gloss: "No siento ganas, no pasa nada",
    anti: "«Velad y orad…» — Marcos 14:38",
  },
  {
    key: "cansancio",
    label: "Cansancio",
    gloss: "Ya leí esto, ya estoy cansado",
    anti: "«Venid a mí, todos los que estáis cansados…» — Mateo 11:28",
  },
  {
    key: "duda",
    label: "Duda",
    gloss: "¿Y si no es verdad? ¿Y si no aplica?",
    anti: "«Toda la Escritura es inspirada…» — 2 Timoteo 3:16",
  },
];

// positions for the 4 chips around center (percent of stage)
const POS = [
  { top: "8%",  left: "10%" },
  { top: "10%", right: "10%" },
  { bottom: "18%", left: "8%" },
  { bottom: "16%", right: "8%" },
];

export default function Domingo({
  onSwipe,
  onMarkComplete,
  onRefrain,
  goTo,
  completed,
}) {
  const meta = DAY_META.domingo;
  const [silenced, setSilenced] = useState(() => new Set());
  const [active, setActive] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [takeover, setTakeover] = useState(false);

  const all = silenced.size === DISTRACTIONS.length;

  useEffect(() => {
    if (all) {
      const t1 = setTimeout(() => {
        onRefrain && onRefrain();
      }, 350);
      const t2 = setTimeout(() => setTakeover(true), 900);
      if (!completed.has(meta.key)) onMarkComplete(meta.key);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [all, completed, meta.key, onMarkComplete, onRefrain]);

  const silence = (key) => {
    setActive(key);
    setSheetOpen(true);
    setSilenced((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const current = DISTRACTIONS.find((d) => d.key === active);

  return (
    <SceneShell screenKey="domingo" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div
        className="scene-stage"
        style={{ position: "relative", width: "100%" }}
      >
        {/* Sword at center */}
        <SwordSvg lit={all} />

        {/* Hint */}
        <div
          className="font-sc c-muted mt-2"
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textAlign: "center",
          }}
        >
          {all
            ? "La espada está en tu mano"
            : "Toca cada distracción para disolverla"}
        </div>

        {/* 4 floating distractions */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          <AnimatePresence>
            {DISTRACTIONS.map((d, i) =>
              silenced.has(d.key) ? (
                <motion.div
                  key={`${d.key}-smoke`}
                  className="absolute"
                  style={{ ...POS[i], pointerEvents: "none" }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.4, filter: "blur(12px)" }}
                  transition={{ duration: 0.7 }}
                >
                  <DistractionChip label={d.label} />
                </motion.div>
              ) : (
                <motion.button
                  key={d.key}
                  className="absolute drift-slow"
                  style={{ ...POS[i], pointerEvents: "auto" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.15, duration: 0.45 }}
                  onClick={() => silence(d.key)}
                  aria-label={`Silenciar ${d.label}`}
                >
                  <DistractionChip label={d.label} />
                </motion.button>
              )
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3">
          <ProgressDots total={DISTRACTIONS.length} done={silenced.size} />
        </div>
      </div>

      <Takeover
        show={takeover}
        vref="Efesios 6:17"
        text="Tomad la espada del Espíritu, que es la palabra de Dios."
        cta={
          <div className="flex flex-col items-center gap-2">
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("lunes")}
            >
              Seguir · Lunes →
            </button>
            <button className="btn-ghost" onClick={() => setTakeover(false)}>
              Quedarme aquí
            </button>
          </div>
        }
      />

      <BottomSheet
        open={sheetOpen && !!current}
        onClose={() => setSheetOpen(false)}
        title={current ? current.label : ""}
      >
        {current ? (
          <>
            <p className="mb-3" style={{ fontSize: 15.5 }}>
              {current.gloss}
            </p>
            <div className="scripture-ref mb-1">Contrapeso</div>
            <p className="font-display c-ink" style={{ fontSize: 17, lineHeight: 1.4 }}>
              {current.anti}
            </p>
            <p className="c-muted mt-4" style={{ fontSize: 13 }}>
              Cuando esta distracción vuelva, vuelve tú a este verso.
            </p>
          </>
        ) : null}
      </BottomSheet>

      <BottomSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title="La espada del Espíritu"
      >
        <p className="mb-3">
          Pablo escribe desde la cárcel a los efesios describiendo la armadura
          del cristiano (Ef 6:10-17). De todas las piezas —cinto, coraza, calzado,
          escudo, yelmo— solo <em>una</em> es ofensiva: la espada. Y la espada
          <em> es la palabra de Dios</em>.
        </p>
        <p className="mb-3">
          En griego la palabra para «palabra» aquí es <em>rhêma</em> — no solo el
          texto abstracto (<em>logos</em>) sino la palabra dicha, aplicada, en
          momento exacto. La Biblia se convierte en arma cuando la <em>pronuncias</em>
          en el día, no solo cuando la lees el sábado.
        </p>
        <p className="c-muted">
          Mira cómo lo hizo Jesús en el desierto (Mateo 4:1-11): tres tentaciones,
          tres «escrito está». No argumentos, no debate — la espada desenvainada.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Smoke-chip (label floating, ready to dissolve) ---- */
function DistractionChip({ label }) {
  return (
    <div
      className="font-sc"
      style={{
        padding: "9px 14px",
        borderRadius: 999,
        background: "rgba(139,38,53,0.10)",
        border: "1px solid rgba(139,38,53,0.35)",
        color: "#5a1a22",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}

/* ---- Sword SVG (dim → ignited) ---- */
function SwordSvg({ lit }) {
  return (
    <motion.svg
      width={90}
      height={240}
      viewBox="0 0 90 240"
      aria-hidden="true"
      initial={{ opacity: 0.35 }}
      animate={{ opacity: lit ? 1 : 0.35 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="blade-v5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={lit ? "#fff8e1" : "#d9cfb9"} />
          <stop offset="50%" stopColor={lit ? "#f1c05a" : "#a79877"} />
          <stop offset="100%" stopColor={lit ? "#a67f1c" : "#6b5a42"} />
        </linearGradient>
      </defs>
      {/* blade */}
      <polygon points="45,8 52,160 45,170 38,160" fill="url(#blade-v5)" stroke="#4a3b1a" strokeWidth="0.8" />
      {/* crossguard */}
      <rect x="20" y="168" width="50" height="7" rx="2" fill={lit ? "#a67f1c" : "#5a4a2a"} />
      {/* handle */}
      <rect x="41" y="175" width="8" height="36" fill="#2a1a10" />
      {/* pommel */}
      <circle cx="45" cy="216" r="7" fill={lit ? "#a67f1c" : "#6b5a42"} stroke="#2a1a10" strokeWidth="1" />
      {/* glow */}
      <AnimatePresence>
        {lit ? (
          <motion.ellipse
            cx="45"
            cy="90"
            rx="28"
            ry="90"
            fill="#a67f1c"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        ) : null}
      </AnimatePresence>
    </motion.svg>
  );
}
