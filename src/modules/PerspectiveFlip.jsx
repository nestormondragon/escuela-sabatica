import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reveal, t, EASE_OUT } from "../lib/motion.js";
import { Insight, SaveBar, Pause } from "./common.jsx";
import Icon from "../components/Icon.jsx";

/* Flip cards: what you see → what Jesus sees. Choose the truth you
   needed, then write an encouraging message. Used for Emmaus. */
export default function PerspectiveFlip({ config, onFill, onSkip }) {
  const [flipped, setFlipped] = useState({});
  const [sel, setSel] = useState(null);
  const [aliento, setAliento] = useState("");

  const allFlipped = config.pairs.every((_, k) => flipped[k]);

  const onCard = (k) => {
    if (!flipped[k]) setFlipped((f) => ({ ...f, [k]: true }));
    else setSel(k);
  };

  const value = sel != null ? config.pairs[sel].sees : "";

  return (
    <div className="stack">
      <p className="prompt-q">{config.prompt}</p>
      {config.hint ? <p className="prompt-hint">{config.hint}</p> : null}

      <div className="stack" style={{ gap: 10 }}>
        {config.pairs.map((p, k) => {
          const isFlipped = !!flipped[k];
          const isSel = sel === k;
          return (
            <motion.button
              key={k}
              onClick={() => onCard(k)}
              whileTap={{ scale: 0.99 }}
              transition={t.tap}
              style={{ perspective: 1000, width: "100%", textAlign: "left", background: "none", border: "none", padding: 0 }}
              aria-label={isFlipped ? p.sees : p.see}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                style={{ position: "relative", transformStyle: "preserve-3d", minHeight: 78 }}
              >
                {/* front: what you see */}
                <div
                  style={{
                    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                    border: "1px solid var(--line)", borderRadius: "var(--r)", padding: "16px 18px",
                    background: "var(--surface)", display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ color: "var(--muted)" }}><Icon name="eye" size={20} /></span>
                  <span className="letter" style={{ fontSize: "1.05rem", color: "var(--text-soft)", fontFamily: "var(--letter)" }}>{p.see}</span>
                </div>
                {/* back: what Jesus sees */}
                <div
                  style={{
                    position: "absolute", inset: 0, transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                    border: isSel ? "1px solid var(--clay)" : "1.5px solid color-mix(in srgb, var(--clay) 40%, transparent)",
                    borderRadius: "var(--r)", padding: "16px 18px",
                    background: "color-mix(in srgb, var(--clay) 10%, transparent)",
                    boxShadow: isSel ? "var(--glow-clay)" : "none",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ color: "var(--clay)" }}><Icon name={isSel ? "check" : "sparkles"} size={20} /></span>
                  <span className="letter" style={{ fontSize: "1.05rem", fontFamily: "var(--letter)" }}>{p.sees}</span>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
      <p className="prompt-hint">{allFlipped ? "Toca la verdad que necesitabas" : "Toca cada carta para girarla"}</p>

      <AnimatePresence>
        {sel != null ? (
          <motion.div className="stack" variants={reveal} initial="initial" animate="animate" key="commit">
            <Insight label="La verdad que sostienes" body={config.pairs[sel].sees} />
            <Pause />
            <p className="story" style={{ borderLeftColor: "var(--clay)" }}>{config.teach}</p>
            <p className="prompt-q" style={{ fontSize: "1.2rem" }}>{config.commit.prompt}</p>
            {config.commit.hint ? <p className="prompt-hint">{config.commit.hint}</p> : null}
            <div className="field">
              <textarea
                rows={3}
                placeholder={config.commit.placeholder}
                value={aliento}
                onChange={(e) => setAliento(e.target.value)}
                maxLength={240}
              />
            </div>
            <SaveBar
              label={config.saveLabel || "Guardar esta pieza"}
              disabled={!value}
              onSave={() => onFill(value, { [config.commit.extraKey]: aliento.trim() }, config.seedSub)}
              onSkip={onSkip}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
