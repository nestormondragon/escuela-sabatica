import React from "react";
import { motion } from "framer-motion";
import Centerpiece, { stageIndexFor } from "../components/Centerpiece.jsx";
import SlotList from "../components/SlotList.jsx";
import Odometer from "../components/Odometer.jsx";
import Icon from "../components/Icon.jsx";
import { reveal, t, viewVariants } from "../lib/motion.js";
import { firstName, lcFirst } from "../lib/name.js";

/* The home / spine: the anchor as it stands, the slots, and a
   mid-journey "your pattern" reveal once enough is filled. */
export default function Kit({ lesson, state, filledCount, firstUnfilledId, done, onOpenSlot, onOpenDone }) {
  const total = lesson.slots.length;
  const remaining = total - filledCount;
  const stageLabel = lesson.stageLabel[lesson.stages[stageIndexFor(filledCount)]];
  const showPattern = filledCount >= 4 && !done;
  const ui = lesson.ui || {};
  const fn = firstName(state.userName);
  const doneTitle = ui.doneTitle || "Tu recorrido está completo";
  const title = done
    ? (fn ? `${fn}, ${lcFirst(doneTitle)}` : doneTitle)
    : remaining === 1
      ? (ui.lastPiece || "Falta una pieza")
      : (ui.building || "Cada elección suma una pieza");

  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit">
      <div className="center" style={{ marginBottom: 6 }}>
        <span className="tag">
          {fn && !done ? fn + " · " : ""}{lesson.kitName} · <Odometer value={filledCount} total={total} />
        </span>
      </div>

      <Centerpiece lesson={lesson} filled={filledCount} size={300} />
      <p className="center muted" style={{ fontFamily: "var(--ui)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>
        {stageLabel}
      </p>

      <h1 className="serif center" style={{ fontSize: "clamp(1.5rem,5.5vw,2rem)", marginTop: 8 }}>
        {title}
      </h1>
      <p className="lead center" style={{ marginTop: 4 }}>
        {done ? (ui.doneSub || "Lo construiste tú, con Dios. Ábrelo, guárdalo, compártelo.") : (ui.buildingHint || "Toca la pieza que brilla.")}
      </p>

      {showPattern ? (
        <motion.div
          variants={reveal} initial="initial" animate="animate"
          style={{
            margin: "16px 0", padding: 18, borderRadius: "var(--radius)",
            border: "1px solid var(--line-2)", background: "linear-gradient(160deg, var(--surface-2), var(--bg-2))",
            boxShadow: "var(--shadow)",
          }}
        >
          <div className="tag" style={{ marginBottom: 6 }}>{ui.patternLabel || "Tu patrón"}</div>
          <p className="serif" style={{ fontSize: "1.12rem", lineHeight: 1.5, fontFamily: "var(--scripture)" }}>{lesson.pattern(state)}</p>
        </motion.div>
      ) : null}

      <div style={{ marginTop: 16 }}>
        <SlotList
          slots={lesson.slots}
          values={state.slots}
          firstUnfilledId={firstUnfilledId}
          remaining={remaining}
          onOpen={onOpenSlot}
        />
      </div>

      {done ? (
        <motion.button
          className="btn btn-primary btn-block"
          style={{ marginTop: 22 }}
          whileTap={{ scale: 0.98 }}
          transition={t.tap}
          onClick={onOpenDone}
        >
          {ui.open || "Abrir mi recorrido"} <Icon name="arrow" size={18} />
        </motion.button>
      ) : null}
    </motion.section>
  );
}
