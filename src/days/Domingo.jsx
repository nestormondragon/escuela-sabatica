import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SceneShell,
  SceneHeader,
  BottomSheet,
  DAY_META,
} from "../ui.jsx";

/* =================================================================
   DOMINGO · El arma más poderosa — V6
   The sword is the instrument, not the reward.
   User grips the hilt; the blade ignites in their hand; they drag
   it through the air and each distraction they cross splits along
   the slash line, burns at the edges, and disperses as ash.
   Underneath each cut, a deeper strategy surfaces in-stage.
   When all four have fallen, Heb 4:12 inscribes letter by letter.
   ================================================================= */

const DISTRACTIONS = [
  {
    key: "afanes",
    label: "Afanes",
    drift: "drift-curve-a",
    pos: { top: "12%", left: "10%" },
    deeper:
      "La urgencia desplaza a la importancia. Lo que grita hoy entierra lo que resuena siempre.",
  },
  {
    key: "apatia",
    label: "Apatía",
    drift: "drift-curve-b",
    pos: { top: "10%", right: "10%" },
    deeper:
      "La familiaridad apaga el asombro. Lo conocido se vuelve invisible — y lo invisible ya no interrumpe.",
  },
  {
    key: "cansancio",
    label: "Cansancio",
    drift: "drift-curve-c",
    pos: { top: "32%", left: "14%" },
    deeper:
      "El cansancio nunca niega la Palabra; solo la aplaza. Pero la obediencia diferida es desobediencia elegante.",
  },
  {
    key: "duda",
    label: "Duda",
    drift: "drift-curve-d",
    pos: { top: "34%", right: "12%" },
    deeper:
      "La duda no ataca la fe — ataca la atención. Si no llegas a escuchar, no tendrás qué creer.",
  },
];

const HEB_TEXT =
  "Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; penetra hasta partir el alma y el espíritu, y discierne los pensamientos y las intenciones del corazón.";

export default function Domingo({
  onSwipe,
  onMarkComplete,
  onRefrain,
  goTo,
  completed,
}) {
  const meta = DAY_META.domingo;

  // cut state per distraction: "resting" | "cutting" | "gone"
  const [cuts, setCuts] = useState(() => ({
    afanes: "resting",
    apatia: "resting",
    cansancio: "resting",
    duda: "resting",
  }));

  // which deeper lines are surfaced
  const [surfaced, setSurfaced] = useState(() => new Set());

  // grip state: is the user holding the sword?
  const [gripping, setGripping] = useState(false);
  const [ignited, setIgnited] = useState(false);
  const [swordOffset, setSwordOffset] = useState({ x: 0, y: 0 });
  const [aureoles, setAureoles] = useState([]); // transient rings on grip

  // slash trail segments { id, x1, y1, x2, y2 }
  const [trail, setTrail] = useState([]);
  const trailCounter = useRef(0);
  const ashCounter = useRef(0);
  const [ashes, setAshes] = useState([]); // {id, x, y, ax}

  // refs
  const stageRef = useRef(null);
  const swordRef = useRef(null);
  const distractionRefs = useRef({});
  const gripOriginRef = useRef({ x: 0, y: 0, stageX: 0, stageY: 0 });
  const lastPointRef = useRef(null);

  // "all cut" detection + transitions
  const allCut =
    cuts.afanes === "gone" &&
    cuts.apatia === "gone" &&
    cuts.cansancio === "gone" &&
    cuts.duda === "gone";

  // inscription state (letter-by-letter Heb 4:12)
  const [inscribeOn, setInscribeOn] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // when all cut, trigger refrain + mark complete + start inscription
  useEffect(() => {
    if (!allCut) return;
    if (!completed.has(meta.key)) onMarkComplete(meta.key);
    onRefrain && onRefrain();
    const t = setTimeout(() => setInscribeOn(true), 650);
    return () => clearTimeout(t);
  }, [allCut, completed, meta.key, onMarkComplete, onRefrain]);

  /* ---- hit test: is the point (sx, sy) inside an undissolved distraction? ---- */
  const hitTest = useCallback(
    (sx, sy) => {
      for (const d of DISTRACTIONS) {
        if (cuts[d.key] !== "resting") continue;
        const el = distractionRefs.current[d.key];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        // shrink rect slightly to avoid edge-triggering
        const pad = 4;
        if (
          sx >= r.left + pad &&
          sx <= r.right - pad &&
          sy >= r.top + pad &&
          sy <= r.bottom - pad
        ) {
          return d;
        }
      }
      return null;
    },
    [cuts]
  );

  /* ---- trigger a cut: split + burn + ash + surface deeper line ---- */
  const cutDistraction = useCallback((d) => {
    setCuts((prev) =>
      prev[d.key] === "resting" ? { ...prev, [d.key]: "cutting" } : prev
    );

    // spawn ash specks from the distraction's current position
    const el = distractionRefs.current[d.key];
    const stage = stageRef.current;
    if (el && stage) {
      const r = el.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sr.left;
      const cy = r.top + r.height / 2 - sr.top;
      const newAshes = [];
      for (let i = 0; i < 7; i++) {
        ashCounter.current += 1;
        newAshes.push({
          id: ashCounter.current,
          x: cx + (Math.random() - 0.5) * 40,
          y: cy + (Math.random() - 0.5) * 16,
          ax: (Math.random() - 0.5) * 36,
        });
      }
      setAshes((prev) => [...prev, ...newAshes]);
      setTimeout(() => {
        setAshes((prev) => prev.filter((a) => !newAshes.find((n) => n.id === a.id)));
      }, 1900);
    }

    // after split animation, mark gone and surface the deeper line
    setTimeout(() => {
      setCuts((prev) =>
        prev[d.key] === "cutting" ? { ...prev, [d.key]: "gone" } : prev
      );
      setSurfaced((prev) => {
        const next = new Set(prev);
        next.add(d.key);
        return next;
      });
    }, 1400);
  }, []);

  /* ---- pointer handlers on the sword ---- */
  const onHiltPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const stage = stageRef.current;
    if (!stage) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) { /* noop */ }

    const sr = stage.getBoundingClientRect();
    gripOriginRef.current = {
      x: e.clientX,
      y: e.clientY,
      stageX: sr.left,
      stageY: sr.top,
    };
    lastPointRef.current = { x: e.clientX - sr.left, y: e.clientY - sr.top };

    setGripping(true);
    setIgnited(true);

    // aureole flash on grip
    const id = Date.now();
    setAureoles((prev) => [...prev, { id }]);
    setTimeout(() => {
      setAureoles((prev) => prev.filter((a) => a.id !== id));
    }, 920);
  };

  const onHiltPointerMove = (e) => {
    if (!gripping) return;
    const stage = stageRef.current;
    if (!stage) return;
    const sr = stage.getBoundingClientRect();
    const origin = gripOriginRef.current;

    const sx = e.clientX;
    const sy = e.clientY;

    // sword offset from rest (how far finger has moved)
    setSwordOffset({ x: sx - origin.x, y: sy - origin.y });

    // add a slash trail segment from last point to current, in stage coords
    const stageX = sx - sr.left;
    const stageY = sy - sr.top;
    const last = lastPointRef.current;
    if (last) {
      const dx = stageX - last.x;
      const dy = stageY - last.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > 16) {
        trailCounter.current += 1;
        const seg = {
          id: trailCounter.current,
          x1: last.x,
          y1: last.y,
          x2: stageX,
          y2: stageY,
        };
        setTrail((prev) => [...prev.slice(-20), seg]);
        setTimeout(() => {
          setTrail((prev) => prev.filter((s) => s.id !== seg.id));
        }, 720);
        lastPointRef.current = { x: stageX, y: stageY };
      }
    }

    // hit test against distractions
    const hit = hitTest(sx, sy);
    if (hit) cutDistraction(hit);
  };

  const onHiltPointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) { /* noop */ }
    setGripping(false);
    // sword springs back to rest (kept ignited so user sees they wielded it)
    setSwordOffset({ x: 0, y: 0 });
    lastPointRef.current = null;
  };

  return (
    <SceneShell
      screenKey="domingo"
      onSwipe={onSwipe}
      dragDisabled={gripping}
    >
      <SceneHeader meta={meta} onOpenMore={() => setMoreOpen(true)} />

      <div
        ref={stageRef}
        className="v6-stage"
        style={{ position: "relative" }}
      >
        {/* Instruction (subtle, top) */}
        <motion.div
          key={allCut ? "done-hint" : "grip-hint"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sc c-muted grip-hint"
          style={{
            position: "absolute",
            top: 6,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 10.5,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          {allCut
            ? "La espada cumplió su oficio"
            : gripping
            ? "Llévala hacia cada distracción"
            : "Sostén la espada · luego arrástrala"}
        </motion.div>

        {/* Drifting distractions */}
        <AnimatePresence>
          {DISTRACTIONS.map((d) => {
            const state = cuts[d.key];
            if (state === "gone") return null;
            const isCutting = state === "cutting";
            const commonStyle = {
              top: d.pos.top,
              left: d.pos.left,
              right: d.pos.right,
            };
            if (isCutting) {
              // render two halves that animate apart
              return (
                <React.Fragment key={`${d.key}-cut`}>
                  <div
                    className="distraction-token cut-half-top"
                    style={{
                      ...commonStyle,
                      clipPath: "polygon(0 0, 100% 0, 100% 48%, 0 48%)",
                    }}
                  >
                    {d.label}
                  </div>
                  <div
                    className="distraction-token cut-half-bottom"
                    style={{
                      ...commonStyle,
                      clipPath: "polygon(0 52%, 100% 52%, 100% 100%, 0 100%)",
                    }}
                  >
                    {d.label}
                  </div>
                </React.Fragment>
              );
            }
            return (
              <motion.div
                key={d.key}
                ref={(el) => (distractionRefs.current[d.key] = el)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: DISTRACTIONS.indexOf(d) * 0.08 + 0.1,
                  duration: 0.5,
                }}
                className={`distraction-token ${d.drift}`}
                style={commonStyle}
              >
                {d.label}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Surfaced deeper lines (appear where each distraction was) */}
        {DISTRACTIONS.map((d, i) => {
          if (!surfaced.has(d.key)) return null;
          // tile positions in lower half as they surface
          const col = i % 2;
          const row = Math.floor(i / 2);
          return (
            <div
              key={`${d.key}-line`}
              className="surface-line"
              style={{
                position: "absolute",
                top: `${18 + row * 13}%`,
                left: col === 0 ? "6%" : "52%",
                width: "42%",
                color: "#2a2018",
                fontFamily: "'Fraunces', serif",
                fontSize: 12.5,
                lineHeight: 1.32,
                fontStyle: "italic",
                pointerEvents: "none",
              }}
            >
              <div
                className="font-sc c-gold"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  marginBottom: 3,
                  fontStyle: "normal",
                }}
              >
                {d.label.toUpperCase()}
              </div>
              {d.deeper}
            </div>
          );
        })}

        {/* Slash trail */}
        {trail.map((s) => {
          const dx = s.x2 - s.x1;
          const dy = s.y2 - s.y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <div
              key={s.id}
              className="slash-trail-seg"
              style={{
                position: "absolute",
                left: s.x1,
                top: s.y1,
                width: len,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 50%",
              }}
            />
          );
        })}

        {/* Ash specks (rise out of cut distractions) */}
        {ashes.map((a) => (
          <span
            key={a.id}
            className="ash-speck"
            style={{
              left: a.x,
              top: a.y,
              "--ax": `${a.ax}px`,
            }}
          />
        ))}

        {/* Heb 4:12 inscription in center after all cuts */}
        {inscribeOn ? <Inscription text={HEB_TEXT} /> : null}

        {/* Sword + ambient hum at bottom center (hidden once inscription is done) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: allCut ? "-40%" : "4%",
            transform: `translate(calc(-50% + ${swordOffset.x}px), ${swordOffset.y}px)`,
            transition: gripping
              ? "none"
              : "bottom 700ms ease, transform 360ms cubic-bezier(0.22,0.9,0.4,1)",
            zIndex: 5,
            touchAction: "none",
          }}
        >
          {/* ambient hum glow at hilt */}
          {!allCut ? <div className="sword-hum" style={{ left: "50%", top: "82%" }} /> : null}
          {/* aureole flashes on grip */}
          {aureoles.map((a) => (
            <span
              key={a.id}
              className="sword-aureole"
              style={{
                left: "50%",
                top: "82%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <SwordSvg ignited={ignited} gripping={gripping} />
          {/* invisible hilt handle - this is the actual touch target */}
          <div
            onPointerDown={onHiltPointerDown}
            onPointerMove={onHiltPointerMove}
            onPointerUp={onHiltPointerUp}
            onPointerCancel={onHiltPointerUp}
            style={{
              position: "absolute",
              left: "50%",
              top: "72%",
              transform: "translate(-50%, 0)",
              width: 76,
              height: 78,
              borderRadius: 14,
              touchAction: "none",
              cursor: gripping ? "grabbing" : "grab",
              // keep it invisible but ensure it sits on top for touch
              background: "transparent",
            }}
            aria-label="Empuñar la espada"
          />
        </div>

        {/* CTA after inscription */}
        <AnimatePresence>
          {inscribeOn ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HEB_TEXT.length * 0.026 + 0.4, duration: 0.6 }}
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                zIndex: 6,
              }}
            >
              <div
                className="font-display c-gold"
                style={{
                  fontSize: 13,
                  fontStyle: "italic",
                  textAlign: "center",
                  maxWidth: 320,
                  lineHeight: 1.35,
                }}
              >
                La espada no fue para colgarla — fue para empuñarla.
              </div>
              <button
                className="btn-ghost"
                style={{ fontSize: 10, letterSpacing: "0.3em" }}
                onClick={() => goTo("lunes")}
              >
                continuar · lunes →
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Secondary commentary — only opens if user wants more context */}
      <BottomSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title="La espada del Espíritu"
      >
        <p className="mb-3">
          Pablo escribe desde la cárcel a los efesios describiendo la armadura
          del cristiano (Ef 6:10-17). De todas las piezas —cinto, coraza,
          calzado, escudo, yelmo— solo <em>una</em> es ofensiva: la espada. Y
          la espada <em>es la palabra de Dios</em>.
        </p>
        <p className="mb-3">
          En griego, la palabra para «palabra» aquí es <em>rhêma</em> — no solo
          el texto abstracto (<em>logos</em>), sino la palabra <em>dicha</em>,
          aplicada, en el momento exacto. La Biblia se convierte en arma cuando
          la <em>pronuncias</em> en el día, no solo cuando la lees el sábado.
        </p>
        <p className="mb-3">
          Mira cómo lo hizo Jesús en el desierto (Mateo 4:1-11): tres
          tentaciones, tres «escrito está». No argumentos, no debate — la
          espada desenvainada.
        </p>
        <p className="c-muted">
          Las cuatro distracciones de este día no son pecados dramáticos. Son
          estrategias. El enemigo no suele atacar tu doctrina — ataca tu
          atención. Y si no llegas a escuchar la Palabra, no tendrás qué
          empuñar.
        </p>
      </BottomSheet>
    </SceneShell>
  );
}

/* -----------------------------------------------------------------
   SwordSvg — dim at rest, ignites when gripped
   ----------------------------------------------------------------- */
function SwordSvg({ ignited, gripping }) {
  return (
    <svg
      width={92}
      height={230}
      viewBox="0 0 92 230"
      aria-hidden="true"
      className={ignited ? "blade-ignited" : ""}
      style={{
        display: "block",
        opacity: ignited ? 1 : 0.65,
        transition: "opacity 420ms ease",
      }}
    >
      <defs>
        <linearGradient id="blade-v6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={ignited ? "#fff8e1" : "#d9cfb9"} />
          <stop offset="40%" stopColor={ignited ? "#ffe6a8" : "#b8a986"} />
          <stop offset="70%" stopColor={ignited ? "#f1c05a" : "#8a7656"} />
          <stop offset="100%" stopColor={ignited ? "#a67f1c" : "#6b5a42"} />
        </linearGradient>
        <radialGradient id="pommel-v6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ignited ? "#f1c05a" : "#6b5a42"} />
          <stop offset="100%" stopColor="#2a1a10" />
        </radialGradient>
      </defs>
      {/* blade — long, tapered */}
      <polygon
        points="46,4 52,150 46,160 40,150"
        fill="url(#blade-v6)"
        stroke="#4a3b1a"
        strokeWidth="0.6"
      />
      {/* blade highlight */}
      {ignited ? (
        <polygon
          points="46,6 48,150 46,158 44,150"
          fill="#fff8e1"
          opacity="0.7"
        />
      ) : null}
      {/* crossguard */}
      <rect
        x="18"
        y="160"
        width="56"
        height="8"
        rx="2"
        fill={ignited ? "#a67f1c" : "#5a4a2a"}
        stroke="#2a1a10"
        strokeWidth="0.6"
      />
      {/* crossguard flourishes */}
      <circle cx="20" cy="164" r="2.2" fill={ignited ? "#f1c05a" : "#6b5a42"} />
      <circle cx="72" cy="164" r="2.2" fill={ignited ? "#f1c05a" : "#6b5a42"} />
      {/* handle wrap */}
      <rect x="41" y="168" width="10" height="40" fill="#2a1a10" />
      <line x1="41" y1="176" x2="51" y2="176" stroke="#6b5a42" strokeWidth="0.6" />
      <line x1="41" y1="184" x2="51" y2="184" stroke="#6b5a42" strokeWidth="0.6" />
      <line x1="41" y1="192" x2="51" y2="192" stroke="#6b5a42" strokeWidth="0.6" />
      <line x1="41" y1="200" x2="51" y2="200" stroke="#6b5a42" strokeWidth="0.6" />
      {/* pommel */}
      <circle
        cx="46"
        cy="215"
        r="8"
        fill="url(#pommel-v6)"
        stroke="#2a1a10"
        strokeWidth="0.8"
      />
      {/* pommel gem */}
      <circle
        cx="46"
        cy="215"
        r="2.4"
        fill={ignited ? "#fff4d8" : "#4a3b1a"}
      />
      {/* soft blade glow when ignited */}
      {ignited ? (
        <ellipse
          cx="46"
          cy="80"
          rx="18"
          ry="78"
          fill="#f1c05a"
          opacity={gripping ? 0.28 : 0.18}
        />
      ) : null}
    </svg>
  );
}

/* -----------------------------------------------------------------
   Inscription — Heb 4:12 surfaces letter-by-letter in center.
   ----------------------------------------------------------------- */
function Inscription({ text }) {
  const ref = "Hebreos 4:12";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(88%, 420px)",
        textAlign: "center",
        zIndex: 4,
      }}
    >
      <div
        className="scripture-ref"
        style={{ marginBottom: 10, letterSpacing: "0.32em" }}
      >
        {ref}
      </div>
      <div
        className="font-display c-ink"
        style={{
          fontSize: "clamp(16px, 4.6vw, 20px)",
          lineHeight: 1.38,
          fontWeight: 500,
        }}
      >
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="inscribe-letter"
            style={{
              animationDelay: `${i * 0.026}s`,
              whiteSpace: ch === " " ? "pre" : "normal",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
