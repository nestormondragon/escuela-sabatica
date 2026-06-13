import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { listItem, listParent, reveal, t } from "../lib/motion.js";
import { SaveBar, Pause } from "./common.jsx";

/* Tap each option to reveal its meaning; keep the one you'll hold.
   Optionally write your own. Used for "Mi declaración" (Job). */
export default function PickReveal({ config, onFill, onSkip }) {
  const [sel, setSel] = useState(null); // index or "custom"
  const [custom, setCustom] = useState("");

  const isCustom = sel === "custom";
  const item = typeof sel === "number" ? config.items[sel] : null;
  const value = isCustom ? custom.trim() : item ? item.t : "";

  return (
    <div className="stack">
      <p className="prompt-q">{config.prompt}</p>
      {config.hint ? <p className="prompt-hint">{config.hint}</p> : null}

      <motion.div className="opt-list" variants={listParent} initial="hidden" animate="show">
        {config.items.map((it, k) => (
          <motion.button
            key={k}
            className="opt"
            variants={listItem}
            aria-pressed={sel === k}
            onClick={() => setSel(k)}
            whileTap={{ scale: 0.98 }}
            transition={t.tap}
          >
            <span className="dot" />
            <span className="txt" style={{ fontStyle: "italic" }}>{it.t}</span>
          </motion.button>
        ))}
        {config.allowCustom ? (
          <motion.button
            className="opt"
            variants={listItem}
            aria-pressed={isCustom}
            onClick={() => setSel("custom")}
            whileTap={{ scale: 0.98 }}
            transition={t.tap}
          >
            <span className="dot" />
            <span className="txt">✎ {config.allowCustom.label}</span>
          </motion.button>
        ) : null}
      </motion.div>

      <AnimatePresence mode="wait">
        {item ? (
          <motion.div key={"i" + sel} className="detail" variants={reveal} initial="initial" animate="animate" exit={{ opacity: 0 }}>
            <div className="meta">{item.ref}</div>
            <p style={{ color: "var(--text-soft)", fontFamily: "var(--scripture)" }}>{item.meaning}</p>
          </motion.div>
        ) : null}
        {isCustom ? (
          <motion.div key="custom" className="field" variants={reveal} initial="initial" animate="animate">
            <textarea
              rows={2}
              placeholder={config.allowCustom.placeholder}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              maxLength={120}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {sel != null ? (
        <>
          {config.closing ? (<><Pause /><p className="story" style={{ borderLeftColor: "var(--gold)" }}>{config.closing}</p></>) : null}
          <SaveBar
            label={config.chooseLabel || "Guardar en mi ancla"}
            disabled={!value}
            onSave={() =>
              onFill(value, isCustom ? { [config.allowCustom.extraKey]: value } : null, config.seedSub)
            }
            onSkip={onSkip}
          />
        </>
      ) : null}
    </div>
  );
}
