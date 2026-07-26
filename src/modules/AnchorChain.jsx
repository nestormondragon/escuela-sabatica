import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reveal, t, EASE_OUT } from "../lib/motion.js";
import { SaveBar, ChipRow, Pause } from "./common.jsx";
import { buzz } from "../lib/haptics.js";
import Icon from "../components/Icon.jsx";
import { useAppReducedMotion } from "../lib/useAppReducedMotion.js";
import { useI18n } from "../i18n/LocaleProvider.jsx";

/* Romans 5:3-5 forged link by link, then drop the anchor (press &
   hold) on the hope you choose. Used for "Mi esperanza". */
export default function AnchorChain({ config, onFill, onSkip }) {
  const { t: translate } = useI18n();
  const [forged, setForged] = useState(0); // how many links forged
  const total = config.chain.length;
  const allForged = forged >= total;
  const [hope, setHope] = useState("");
  const [custom, setCustom] = useState("");
  const value = (custom.trim() || hope).trim();
  const hopePromptRef = useRef(null);
  const focusHopePrompt = useRef(false);

  const forge = () => {
    if (forged < total) {
      if (forged + 1 >= total) focusHopePrompt.current = true;
      buzz.light();
      setForged((f) => f + 1);
    }
  };

  useEffect(() => {
    if (!allForged || !focusHopePrompt.current) return;
    hopePromptRef.current?.focus({ preventScroll: true });
    focusHopePrompt.current = false;
  }, [allForged]);

  return (
    <div className="stack">
      <p className="prompt-q">{allForged ? config.climax : translate("module.buildChain")}</p>
      {!allForged ? <p className="prompt-hint">{translate("module.tapNextLink")}</p> : null}

      <div className="stack" style={{ gap: 0 }}>
        {config.chain.map((link, k) => {
          const isForged = k < forged;
          const isNext = k === forged;
          return (
            <div key={k}>
              {k > 0 ? (
                <div style={{ height: 18, display: "flex", justifyContent: "center" }}>
                  <motion.div
                    initial={false}
                    animate={{ scaleY: isForged ? 1 : 0.18, opacity: isForged ? 1 : 0.3 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    style={{ width: 2, height: "100%", background: "var(--clay)", transformOrigin: "top" }}
                  />
                </div>
              ) : null}
              <motion.button
                onClick={isNext ? forge : undefined}
                disabled={!isNext}
                whileTap={isNext ? { scale: 0.98 } : undefined}
                transition={t.tap}
                data-pulse={isNext ? "glow" : undefined}
                style={{
                  width: "100%", textAlign: "left", padding: "13px 16px", borderRadius: "var(--r)",
                  border: isForged ? "1px solid var(--clay)" : isNext ? "1px solid var(--clay)" : "1px dashed var(--line)",
                  background: isForged ? "color-mix(in srgb, var(--clay) 10%, transparent)" : "var(--surface)",
                  opacity: isForged || isNext ? 1 : 0.45,
                  cursor: isNext ? "pointer" : "default",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: isForged ? "var(--clay)" : "var(--muted)" }}>
                    <Icon name={isForged ? "check" : "spark"} size={16} />
                  </span>
                  <span className="letter" style={{ fontSize: "1.1rem" }}>{link.word}</span>
                </div>
                <AnimatePresence>
                  {isForged ? (
                    <motion.p variants={reveal} initial="initial" animate="animate" className="is" style={{ marginTop: 6, color: "var(--text-soft)", fontFamily: "var(--letter)" }}>
                      {link.line}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {allForged ? (
          <motion.div className="stack" variants={reveal} initial="initial" animate="animate">
            <Pause />
            <p ref={hopePromptRef} className="prompt-q" tabIndex={-1} style={{ fontSize: "1.2rem" }}>{config.prompt}</p>
            {config.hint ? <p className="prompt-hint">{config.hint}</p> : null}
            <ChipRow options={config.options} value={custom ? "" : hope} onPick={(o) => { setHope(o); setCustom(""); }} />
            <div className="field">
              <input type="text" aria-label={config.prompt || config.allowCustom.placeholder} placeholder={config.allowCustom.placeholder} value={custom} onChange={(e) => { setCustom(e.target.value); if (e.target.value) setHope(""); }} maxLength={90} />
            </div>
            <HoldToSeal
              disabled={!value}
              label={translate("module.holdSeal")}
              onComplete={() => onFill(value, custom ? { [config.allowCustom.extraKey]: value } : null, config.seedSub)}
            />
            <div className="skip-wrap"><button className="skip" onClick={onSkip}>{translate("module.skip")}</button></div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* press-and-hold to seal a commitment (asymmetric: slow fill, snap back) */
function HoldToSeal({ onComplete, label, disabled }) {
  const { t: translate } = useI18n();
  const reduced = useAppReducedMotion();
  const [fill, setFill] = useState(0);
  const holding = useRef(false);
  const raf = useRef(null);
  const last = useRef(0);
  const fired = useRef(false);

  const tick = useCallback((ts) => {
    if (!last.current) last.current = ts;
    const dt = ts - last.current; last.current = ts;
    setFill((p) => {
      const dir = holding.current ? dt / 1500 : -dt / 350;
      let n = Math.min(1, Math.max(0, p + dir));
      if (n >= 1 && !fired.current) { fired.current = true; holding.current = false; buzz.success(); onComplete(); return 1; }
      return n;
    });
    if (holding.current || fillRef.current > 0) raf.current = requestAnimationFrame(tick);
  }, [onComplete]);

  const fillRef = useRef(0);
  useEffect(() => { fillRef.current = fill; }, [fill]);

  const start = (e) => {
    if (disabled || fired.current) return;
    if (reduced) { fired.current = true; buzz.success(); onComplete(); return; }
    e.preventDefault(); holding.current = true; last.current = 0; buzz.light();
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick);
  };
  const stop = () => { holding.current = false; last.current = 0; cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick); };
  const onKey = (e) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !fired.current) {
      e.preventDefault(); fired.current = true; buzz.success(); onComplete();
    }
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <button
      onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
      onKeyDown={onKey}
      aria-label={translate("module.holdOrEnter", { label })}
      className="btn btn-primary btn-block"
      disabled={disabled}
      style={{ position: "relative", overflow: "hidden", userSelect: "none", touchAction: "none", opacity: disabled ? 0.5 : 1, minHeight: 56 }}
    >
      <span style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.25)", transform: `scaleX(${fill})`, transformOrigin: "left", transition: holding.current ? "none" : "transform 0.2s ease" }} />
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 9 }}>
        <Icon name="check" size={18} weight="bold" /> {label}
      </span>
    </button>
  );
}
