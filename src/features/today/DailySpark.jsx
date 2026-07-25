import React from "react";
import { motion } from "framer-motion";
import Icon from "../../components/Icon.jsx";
import { useAppReducedMotion } from "../../lib/useAppReducedMotion.js";
import DepthChooser from "./DepthChooser.jsx";
import ReturnThread from "./ReturnThread.jsx";

export default function DailySpark({
  lesson,
  episode,
  depth,
  onDepthChange,
  onBegin,
  onFinishToday,
  returnItem,
  onResolveReturn,
}) {
  const reduced = useAppReducedMotion();

  return (
    <section className="daily-spark" aria-labelledby="daily-spark-title">
      <div className="daily-spark-thread" aria-hidden="true" />
      <div className="daily-spark-meta">
        <span>{episode?.canonicalDay || "Hoy"}</span>
        <span>{lesson.verse.ref}</span>
      </div>

      <ReturnThread item={returnItem} onResolve={onResolveReturn} />

      <motion.h1
        id="daily-spark-title"
        className="daily-spark-question"
        initial={
          reduced ? false : { clipPath: "inset(0 0 100% 0)", y: 8 }
        }
        animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
        transition={{
          duration: reduced ? 0 : 0.48,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {episode?.title || lesson.subtitle}
      </motion.h1>

      <p className="daily-spark-cue">
        {episode?.cue || lesson.subtitle}
      </p>

      <DepthChooser
        value={depth}
        availability={episode?.depthAvailability}
        onChange={onDepthChange}
      />

      <button className="world-action" type="button" onClick={onBegin}>
        <span>
          <small>Tu siguiente pieza</small>
          Abrir la chispa de hoy
        </span>
        <Icon name="arrow" size={20} />
      </button>

      <button className="quiet-exit" type="button" onClick={onFinishToday}>
        Terminar por hoy
      </button>
    </section>
  );
}
