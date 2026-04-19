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
   LUNES · La autoridad de las Escrituras
   Scene: 2×2 door grid. 3 wrong doors (razón / tradición / experiencia)
   → tap shakes the door and shows its "trampa". 4th door (La Palabra)
   stays dim until the other 3 are tested; then glows gold. Tap it →
   Juan 17:17 takeover.
   ================================================================= */

const FALSE_DOORS = [
  {
    key: "razon",
    label: "Razón",
    sub: "Humana",
    trap: "La razón es un don, pero es limitada y caída. Lo que hoy llamamos lógica mañana cambia. Isaías 55:8-9: «Mis pensamientos no son vuestros pensamientos.»",
  },
  {
    key: "tradicion",
    label: "Tradición",
    sub: "Nuestros padres",
    trap: "Jesús mismo rechazó la sola tradición: «Así invalidáis la palabra de Dios con vuestra tradición» (Mateo 15:6). Las costumbres pueden ser buenas, pero no son la autoridad final.",
  },
  {
    key: "experiencia",
    label: "Experiencia",
    sub: "Lo que siento",
    trap: "El corazón es engañoso (Jeremías 17:9). Los sentimientos cambian con el clima; la verdad no. Una experiencia sin la Palabra es un barco sin timón.",
  },
];

const TRUE_DOOR = {
  key: "palabra",
  label: "La Palabra",
  sub: "Sola Scriptura",
  verse: "Santificalos en tu verdad; tu palabra es verdad.",
  ref: "Juan 17:17",
};

export default function Lunes({
  onSwipe,
  onMarkComplete,
  goTo,
  completed,
}) {
  const meta = DAY_META.lunes;
  const [opened, setOpened] = useState(() => new Set()); // false doors opened
  const [shakeKey, setShakeKey] = useState(null);
  const [active, setActive] = useState(null); // door obj in sheet
  const [sheetOpen, setSheetOpen] = useState(false);
  const [takeover, setTakeover] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const allTraps = opened.size === FALSE_DOORS.length;

  const openFalse = (d) => {
    setShakeKey(d.key);
    setTimeout(() => setShakeKey(null), 500);
    setActive(d);
    setSheetOpen(true);
    setOpened((prev) => {
      if (prev.has(d.key)) return prev;
      const next = new Set(prev);
      next.add(d.key);
      return next;
    });
  };

  const openTrue = () => {
    if (!allTraps) return;
    if (!completed.has(meta.key)) onMarkComplete(meta.key);
    setTakeover(true);
  };

  useEffect(() => {
    // auto-mark complete when all 3 traps opened
    if (allTraps && !completed.has(meta.key)) onMarkComplete(meta.key);
  }, [allTraps, completed, meta.key, onMarkComplete]);

  return (
    <SceneShell screenKey="lunes" onSwipe={onSwipe}>
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div className="scene-stage">
        {/* Prompt */}
        <div className="text-center mb-3">
          <div
            className="font-sc c-muted"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            ¿En qué confías para saber la verdad?
          </div>
          <div
            className="font-display c-ink mt-1"
            style={{ fontSize: 16, fontWeight: 500 }}
          >
            Prueba cada puerta
          </div>
        </div>

        {/* 2×2 door grid */}
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            maxWidth: 360,
          }}
        >
          {FALSE_DOORS.map((d) => (
            <Door
              key={d.key}
              label={d.label}
              sub={d.sub}
              tested={opened.has(d.key)}
              shake={shakeKey === d.key}
              kind="false"
              onClick={() => openFalse(d)}
            />
          ))}
          <Door
            label={TRUE_DOOR.label}
            sub={TRUE_DOOR.sub}
            tested={false}
            kind="true"
            unlocked={allTraps}
            onClick={openTrue}
          />
        </div>

        {/* Hint */}
        <div
          className="font-sc c-muted mt-4 text-center"
          style={{ fontSize: 10, letterSpacing: "0.2em" }}
        >
          {allTraps
            ? "La cuarta puerta está lista"
            : `${opened.size} / 3 trampas vistas`}
        </div>
      </div>

      <Takeover
        show={takeover}
        vref={TRUE_DOOR.ref}
        text={TRUE_DOOR.verse}
        cta={
          <div className="flex flex-col items-center gap-2">
            <div
              className="font-sc c-gold mb-1"
              style={{ fontSize: 10, letterSpacing: "0.3em" }}
            >
              · Sola Scriptura ·
            </div>
            <button
              className="btn-primary"
              data-gold="true"
              onClick={() => goTo("martes")}
            >
              Seguir · Martes →
            </button>
            <button className="btn-ghost" onClick={() => setTakeover(false)}>
              Quedarme aquí
            </button>
          </div>
        }
      />

      <BottomSheet
        open={sheetOpen && !!active}
        onClose={() => setSheetOpen(false)}
        title={active ? `${active.label}` : ""}
      >
        {active ? (
          <>
            <div className="eyebrow c-rubric mb-1">La trampa</div>
            <p className="mb-3" style={{ fontSize: 15.5 }}>
              {active.trap}
            </p>
            <p className="c-muted" style={{ fontSize: 13 }}>
              Ninguna de las tres es mala por sí sola — pero ninguna es{" "}
              <em>la autoridad final</em>.
            </p>
          </>
        ) : null}
      </BottomSheet>

      <BottomSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title="Sola Scriptura"
      >
        <p className="mb-3">
          El 31 de octubre de 1517, Martín Lutero clavó 95 tesis en la puerta de la
          iglesia de Wittenberg. El conflicto central no era sobre indulgencias —
          era sobre <em>autoridad</em>.
        </p>
        <p className="mb-3 italic">
          «Mi conciencia está cautiva a la Palabra de Dios. No puedo retractarme de
          nada. Aquí estoy. No puedo hacer otra cosa. Dios me ayude.»
        </p>
        <div className="scripture-ref mb-3">Lutero · Worms · 1521</div>
        <p>
          <em>Sola Scriptura</em> no es que la Biblia sea la <em>única</em> fuente
          de sabiduría, sino que es la <em>única autoridad final</em>. Razón,
          tradición, experiencia — todas pasan por el filtro de la Palabra, no al
          revés.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* ---- Door component ---- */
function Door({
  label,
  sub,
  tested,
  shake,
  kind,
  unlocked,
  onClick,
}) {
  const isTrue = kind === "true";
  const disabled = isTrue && !unlocked;

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={shake ? "shake-x" : ""}
      style={{
        position: "relative",
        aspectRatio: "2 / 3",
        borderRadius: "14px 14px 4px 4px",
        border: isTrue
          ? unlocked
            ? "2px solid #a67f1c"
            : "1px dashed rgba(166,127,28,0.35)"
          : tested
          ? "1px solid rgba(139,38,53,0.4)"
          : "1px solid rgba(26,21,16,0.18)",
        background: isTrue
          ? unlocked
            ? "linear-gradient(180deg, #f9ebc4 0%, #e8cf7c 100%)"
            : "rgba(166,127,28,0.04)"
          : tested
          ? "rgba(139,38,53,0.06)"
          : "#f4ede0",
        padding: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        overflow: "hidden",
        transition: "all 300ms ease",
      }}
      animate={
        isTrue && unlocked
          ? { boxShadow: "0 0 24px rgba(166,127,28,0.45)" }
          : { boxShadow: "0 0 0 rgba(166,127,28,0)" }
      }
      aria-label={label}
    >
      {/* door knob */}
      <span
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          width: 6,
          height: 6,
          borderRadius: 999,
          background: isTrue ? "#a67f1c" : "#6b5a42",
        }}
      />
      {/* door content */}
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div
          className="font-sc"
          style={{
            fontSize: 9,
            letterSpacing: "0.22em",
            color: isTrue ? "#7a5e12" : "#6b5a42",
          }}
        >
          {sub}
        </div>
        <div
          className="font-display mt-1"
          style={{
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 1.1,
            color: isTrue ? "#5a4a10" : tested ? "#8b2635" : "#2a2018",
          }}
        >
          {label}
        </div>
        {tested ? (
          <div
            className="font-sc mt-2 c-rubric"
            style={{ fontSize: 9, letterSpacing: "0.2em" }}
          >
            TRAMPA
          </div>
        ) : null}
        {isTrue && unlocked ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sc c-gold mt-2"
              style={{ fontSize: 9, letterSpacing: "0.22em" }}
            >
              ABRE
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>
    </motion.button>
  );
}
