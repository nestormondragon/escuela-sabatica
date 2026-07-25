import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reveal, t } from "../lib/motion.js";
import { SaveBar, Pause, ChipRow, Verse } from "./common.jsx";
import { buzz } from "../lib/haptics.js";
import Icon from "../components/Icon.jsx";
import { useAppReducedMotion } from "../lib/useAppReducedMotion.js";

/* EGW's dream: climb keeping your eyes UP, leave what you carry at the
   door, and receive "No temas". Press-and-hold to ascend; release and
   you slip. Used for "Lo que dejo en la puerta". */
export default function Stairs({ config, onFill, onSkip }) {
  const reduced = useAppReducedMotion();
  const [phase, setPhase] = useState("climb"); // climb | leave | promise
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const [leave, setLeave] = useState("");
  const [custom, setCustom] = useState("");
  const [promise, setPromise] = useState(null);

  const holding = useRef(false);
  const raf = useRef(null);
  const last = useRef(0);
  const done = useRef(false);

  const tick = useCallback((ts) => {
    if (done.current) return;
    if (!last.current) last.current = ts;
    const dt = ts - last.current;
    last.current = ts;
    setProgress((p) => {
      const dir = holding.current ? dt / 2600 : -dt / 4200;
      let n = Math.min(1, Math.max(0, p + dir));
      if (n >= 1) {
        n = 1;
        holding.current = false;
        done.current = true;
        buzz.success();
        setTimeout(() => setPhase("leave"), 350);
        return n;
      }
      return n;
    });
    if (!done.current && (holding.current || progressRef.current > 0) && phaseRef.current === "climb") {
      raf.current = requestAnimationFrame(tick);
    }
  }, []);

  const climbByKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (done.current) return;
      done.current = true;
      buzz.success();
      setProgress(1);
      setPhase("leave");
    }
  };

  // mirror progress/phase into refs so RAF loop can read latest without restart
  const progressRef = useRef(progress);
  const phaseRef = useRef(phase);
  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const start = (e) => {
    if (reduced) { setProgress(1); setPhase("leave"); return; }
    e.preventDefault();
    holding.current = true;
    last.current = 0;
    buzz.light();
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    holding.current = false;
    last.current = 0;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const leaveValue = (custom.trim() || leave).trim();

  return (
    <div className="stack">
      <AnimatePresence mode="wait">
        {phase === "climb" ? (
          <motion.div key="climb" className="stack" variants={reveal} initial="initial" animate="animate" exit={{ opacity: 0 }}>
            <p className="prompt-q">{config.climbPrompt}</p>
            <p className="prompt-hint">{config.climbHint}</p>
            <StairsArt progress={progress} />
            <button
              onPointerDown={start}
              onPointerUp={stop}
              onPointerLeave={stop}
              onPointerCancel={stop}
              onKeyDown={climbByKey}
              aria-label="Mantén presionado para subir, o pulsa Enter"
              className="btn btn-ghost btn-block"
              style={{ userSelect: "none", touchAction: "none", minHeight: 60, borderColor: "var(--clay)" }}
            >
              <Icon name="chevron" size={18} style={{ transform: "rotate(-90deg)" }} />
              {progress >= 1 ? "Has llegado a la puerta" : "Mantén presionado · vista arriba"}
            </button>
          </motion.div>
        ) : null}

        {phase === "leave" ? (
          <motion.div key="leave" className="stack" variants={reveal} initial="initial" animate="animate" exit={{ opacity: 0 }}>
            <PhasePrompt>{config.leavePrompt}</PhasePrompt>
            <p className="prompt-hint">{config.leaveHint}</p>
            <ChipRow options={config.leaveOptions} value={custom ? "" : leave} onPick={(o) => { setLeave(o); setCustom(""); }} />
            {config.allowCustom ? (
              <div className="field">
                <input type="text" aria-label={config.leavePrompt || config.allowCustom.placeholder} placeholder={config.allowCustom.placeholder} value={custom} onChange={(e) => { setCustom(e.target.value); if (e.target.value) setLeave(""); }} maxLength={60} />
              </div>
            ) : null}
            <SaveBar label="Dejarlo en la puerta" disabled={!leaveValue} onSave={() => setPhase("promise")} onSkip={onSkip} variant="ghost" />
          </motion.div>
        ) : null}

        {phase === "promise" ? (
          <motion.div key="promise" className="stack" variants={reveal} initial="initial" animate="animate" exit={{ opacity: 0 }}>
            <p className="story" style={{ borderLeftColor: "var(--clay)" }}>Dejaste <b>{leaveValue.toLowerCase()}</b> en la puerta. El guía abre, y estás delante de él.</p>
            <PhasePrompt>{config.promisePrompt}</PhasePrompt>
            <div className="opt-list">
              {config.promiseOptions.map((p, k) => (
                <motion.button
                  key={k}
                  className="opt"
                  aria-pressed={promise === k}
                  onClick={() => setPromise(k)}
                  whileTap={{ scale: 0.98 }}
                  transition={t.tap}
                  style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
                >
                  <span className="txt" style={{ fontStyle: "italic" }}>{p.t}</span>
                  {promise === k ? (
                    <span
                      className="is"
                      aria-hidden="true"
                      style={{ color: "var(--text-soft)", fontSize: "0.9rem" }}
                    >
                      {p.w}
                    </span>
                  ) : null}
                </motion.button>
              ))}
            </div>
            <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {promise != null ? config.promiseOptions[promise].w : ""}
            </span>
            <AnimatePresence>
              {promise != null ? (
                <motion.div className="stack" variants={reveal} initial="initial" animate="animate">
                  <Pause />
                  <Verse text={config.verse.text} cite={config.verse.ref} />
                  <SaveBar
                    label={config.saveLabel || "Guardar esta pieza"}
                    onSave={() =>
                      onFill(
                        leaveValue,
                        {
                          [config.promiseExtraKey]: config.promiseOptions[promise].t,
                          ...(custom ? { [config.allowCustom.extraKey]: custom.trim() } : {}),
                        },
                        config.seedSub
                      )
                    }
                    onSkip={onSkip}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function PhasePrompt({ children }) {
  const promptRef = useRef(null);

  useEffect(() => {
    promptRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <p ref={promptRef} className="prompt-q" tabIndex={-1}>
      {children}
    </p>
  );
}

function StairsArt({ progress }) {
  const reactId = useId().replace(/:/g, "");
  const beamId = `${reactId}-beam`;
  // marker climbs a flight of steps as progress 0→1; eyes-up beam at top
  const steps = 6;
  const climbY = 150 - progress * 120;
  const climbX = 40 + progress * 180;
  return (
    <svg viewBox="0 0 280 180" width="100%" style={{ maxWidth: 360, margin: "0 auto", display: "block" }} aria-hidden="true">
      <defs>
        <linearGradient id={beamId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe6ac" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe6ac" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* doorway light at top */}
      <motion.rect x="232" y="6" width="40" height="60" rx="6" fill={`url(#${beamId})`} animate={{ opacity: 0.4 + progress * 0.6 }} />
      <rect x="244" y="10" width="22" height="52" rx="4" fill="none" stroke="var(--clay)" strokeWidth="2" opacity={0.5 + progress * 0.5} />
      {/* steps */}
      {Array.from({ length: steps }).map((_, k) => {
        const x = 30 + k * 36;
        const y = 150 - k * 22;
        return <rect key={k} x={x} y={y} width="44" height="12" rx="2" fill="var(--surface-3)" stroke="var(--line-2)" />;
      })}
      {/* climber */}
      <motion.g animate={{ x: climbX, y: climbY }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
        <circle cx="0" cy="-10" r="6" fill="#e8d4b6" />
        <path d="M-6 -4 Q0 -8 6 -4 L4 8 L-4 8 Z" fill="#314a6b" />
      </motion.g>
    </svg>
  );
}
