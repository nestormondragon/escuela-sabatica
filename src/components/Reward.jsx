import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT, t } from "../lib/motion.js";
import { useLockBodyScroll } from "../lib/useLockBodyScroll.js";
import { firstName } from "../lib/name.js";
import Icon from "./Icon.jsx";

/* =================================================================
   Reward — the "slot filled" moment, shown each time the reader
   advances a section. A piece of the anchor lands, plus a rotating
   reverent line (rewards-of-the-self, never a score).

   Reader-controlled: it no longer auto-dismisses on a timer (that cut
   readers off mid-sentence). It stays until they tap "Continuar", the
   ✕, the backdrop, or press Esc.
   ================================================================= */

export default function Reward({ open, slotLabel, seedSub, verse, name, onClose }) {
  useLockBodyScroll(open);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const fn = firstName(name);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="reward"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          aria-label={`Pieza forjada: ${slotLabel || ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed", inset: 0, zIndex: 90, display: "flex",
            alignItems: "center", justifyContent: "center", padding: 24,
            background: "color-mix(in srgb, var(--bg-0) 62%, transparent)",
            backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={t.springSnap}
            style={{
              position: "relative",
              background: "var(--surface-2)", border: "1px solid var(--line-2)",
              borderRadius: "var(--radius-lg)", padding: "30px 26px 24px", textAlign: "center",
              maxWidth: 340, width: "100%", boxShadow: "var(--shadow-lg)",
            }}
          >
            <button
              className="icon-btn"
              onClick={onClose}
              aria-label="Cerrar"
              title="Cerrar"
              style={{ position: "absolute", top: 6, right: 6, color: "var(--muted)" }}
            >
              <Icon name="close" size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ ...t.springSnap, delay: 0.05 }}
              style={{
                width: 56, height: 56, margin: "0 auto 12px", borderRadius: "50%",
                display: "grid", placeItems: "center", color: "var(--gold)",
                background: "color-mix(in srgb, var(--gold) 16%, transparent)",
                boxShadow: "var(--glow-gold)",
              }}
            >
              <Icon name="anchor" size={28} />
            </motion.div>
            <div style={{ fontFamily: "var(--ui)", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>
              Pieza forjada
            </div>
            <h3 className="serif" style={{ fontSize: "1.3rem", margin: "4px 0 2px" }}>{slotLabel}</h3>
            {seedSub ? <p className="muted" style={{ fontSize: "0.88rem" }}>{seedSub}</p> : null}
            <p className="muted" style={{ fontSize: "0.9rem", marginTop: 6, fontFamily: "var(--scripture)", fontStyle: "italic" }}>
              {fn ? `Bien hecho, ${fn}.` : "Bien hecho."}
            </p>
            {verse ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.4, ease: EASE_OUT }}
                style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}
              >
                <div className="tag" style={{ marginBottom: 5 }}>Una palabra para hoy</div>
                <div className="scripture" style={{ fontSize: "1rem", fontStyle: "italic", color: "var(--text-soft)" }}>{verse}</div>
              </motion.div>
            ) : null}

            <motion.button
              className="btn btn-primary btn-block"
              style={{ marginTop: 18 }}
              whileTap={{ scale: 0.98 }}
              transition={t.tap}
              onClick={onClose}
            >
              Continuar <Icon name="arrow" size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
