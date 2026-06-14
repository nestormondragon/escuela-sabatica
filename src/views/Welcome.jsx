import React, { useState } from "react";
import { motion } from "framer-motion";
import Centerpiece from "../components/Centerpiece.jsx";
import Icon from "../components/Icon.jsx";
import { viewVariants, t, EASE_OUT } from "../lib/motion.js";
import { formatLong } from "../lib/date.js";

/* =================================================================
   Welcome — the first interaction. A calm, personal moment that asks
   the reader's name so the whole experience becomes theirs.
   ================================================================= */
export default function Welcome({ lesson, initialName = "", onContinue }) {
  const [name, setName] = useState(initialName);
  const go = () => onContinue(name.trim());

  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit"
      style={{ minHeight: "calc(100dvh - var(--topbar-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...t.springSoft, delay: 0.05 }}>
        <Centerpiece lesson={lesson} filled={0} size={260} />
      </motion.div>

      <motion.div className="center" style={{ marginTop: 8 }}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE_OUT }}>
        <span className="tag">Lección {lesson.number} · {formatLong(lesson.forDate)}</span>
        <h1 className="serif" style={{ fontSize: "clamp(1.9rem, 7.5vw, 2.7rem)", lineHeight: 1.05, marginTop: 8 }}>
          Esta semana es tuya.
        </h1>
        <p className="lead" style={{ marginTop: 8 }}>
          Vas a construir algo personal, paso a paso. Antes de empezar…
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }} style={{ marginTop: 22 }}>
        <label htmlFor="who" className="prompt-q" style={{ display: "block", marginBottom: 12 }}>¿Cómo te llamas?</label>
        <div style={{ position: "relative", maxWidth: 360, margin: "0 auto" }}>
          <input
            id="who"
            type="text"
            autoComplete="given-name"
            aria-label="Tu nombre"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") go(); }}
            maxLength={32}
            style={{
              width: "100%", textAlign: "center", fontFamily: "var(--scripture)", fontSize: "1.3rem",
              padding: "16px 18px", borderRadius: 16, color: "var(--text)",
              background: "color-mix(in srgb, var(--bg-0) 45%, transparent)",
              border: "1.5px solid var(--line-2)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              boxShadow: "var(--shadow), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          />
        </div>

        <motion.button
          className="btn btn-primary btn-block" style={{ marginTop: 16 }}
          whileTap={{ scale: 0.98 }} transition={t.tap}
          onClick={go}
        >
          {name.trim() ? `Comenzar, ${name.trim()}` : "Comenzar"} <Icon name="arrow" size={18} />
        </motion.button>
        <div className="skip-wrap" style={{ marginTop: 4 }}>
          <button className="skip" onClick={() => onContinue("")}>Prefiero no decirlo</button>
        </div>
        <p className="privacy" style={{ marginTop: 10 }}>
          <Icon name="lock" size={14} /> Privado en este dispositivo
        </p>
      </motion.div>
    </motion.section>
  );
}
