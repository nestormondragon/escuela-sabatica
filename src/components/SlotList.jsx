import React from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import { listItem, listParent, t } from "../lib/motion.js";

/* =================================================================
   SlotList — the spine of the anchor. Every slot is visible from the
   start as a ghost silhouette (Zeigarnik open loop). States:
     locked     — not yet reachable (faint, dashed)
     available  — openable now
     current    — the next one to fill (pulses gently)
     filled     — done (shows the chosen value)
   Near completion, locked slots pulse to draw the eye (goal gradient).
   ================================================================= */

export default function SlotList({ slots, values, firstUnfilledId, remaining, onOpen }) {
  const goalGradient = remaining > 0 && remaining <= 2;
  return (
    <motion.div className="stack" variants={listParent} initial="hidden" animate="show" style={{ gap: 10, display: "flex", flexDirection: "column" }}>
      {slots.map((s, idx) => {
        const filled = !!values[s.id];
        const isCurrent = !filled && s.id === firstUnfilledId;
        // a slot is openable if filled, current, or any earlier-than-current
        const currentIdx = slots.findIndex((x) => x.id === firstUnfilledId);
        const open = filled || isCurrent || (currentIdx >= 0 && idx <= currentIdx);
        const state = filled ? "filled" : isCurrent ? "current" : open ? "available" : "locked";

        return (
          <motion.button
            key={s.id}
            variants={listItem}
            layout
            onClick={open ? () => onOpen(s) : undefined}
            disabled={!open}
            aria-disabled={!open}
            whileTap={open ? { scale: 0.98 } : undefined}
            transition={t.tap}
            animate={
              isCurrent
                ? { boxShadow: ["0 0 0 0 rgba(230,178,90,0.0)", "0 0 0 8px rgba(230,178,90,0.0)"], borderColor: "var(--gold)" }
                : goalGradient && state === "locked"
                ? { opacity: [0.5, 0.78, 0.5] }
                : {}
            }
            // pulse loops
            {...(isCurrent
              ? { transition: { boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } } }
              : goalGradient && state === "locked"
              ? { transition: { opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } } }
              : {})}
            style={{
              display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left",
              padding: "14px 16px", borderRadius: 16,
              border: filled
                ? "1.5px solid color-mix(in srgb, var(--gold) 55%, transparent)"
                : isCurrent
                ? "1.5px solid var(--gold)"
                : "1.5px solid var(--line)",
              background: filled
                ? "color-mix(in srgb, var(--gold) 9%, transparent)"
                : "var(--surface)",
              opacity: state === "locked" ? 0.5 : 1,
              cursor: open ? "pointer" : "default",
              boxShadow: isCurrent ? "var(--glow-gold)" : "none",
            }}
          >
            <span
              style={{
                width: 38, height: 38, borderRadius: "50%", flex: "none",
                display: "grid", placeItems: "center",
                background: filled ? "var(--gold-deep)" : "var(--surface-3)",
                color: filled ? "#20140a" : "var(--muted)",
                border: state === "locked" ? "1px dashed var(--faint)" : "none",
              }}
            >
              {filled ? <Icon name="check" size={18} /> : <Icon name={s.icon} size={18} />}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
                {s.label}
              </span>
              <span
                className="serif"
                style={{
                  display: "block", marginTop: 2, fontSize: "1.05rem", lineHeight: 1.25,
                  color: filled ? "var(--text)" : "var(--muted)",
                  fontStyle: filled ? "normal" : "italic",
                  fontFamily: filled ? "var(--scripture)" : "var(--scripture)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}
              >
                {filled ? values[s.id] : isCurrent ? "Toca para forjar esta pieza" : s.teaser}
              </span>
            </span>
            {open && !filled ? (
              <span style={{ flex: "none", color: isCurrent ? "var(--gold)" : "var(--muted)" }}>
                <Icon name="arrow" size={18} />
              </span>
            ) : null}
            {state === "locked" ? (
              <span style={{ flex: "none", color: "var(--faint)" }}><Icon name="lock" size={15} /></span>
            ) : null}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
