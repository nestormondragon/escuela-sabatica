import React from "react";
import { motion } from "framer-motion";
import Icon from "../components/Icon.jsx";
import { viewVariants, t } from "../lib/motion.js";
import { formatLong } from "../lib/date.js";

/* Shown for a registered-but-not-yet-authored lesson. */
export default function Stub({ lesson, todayLesson, onGoToday, onOpenLessons }) {
  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit" style={{ textAlign: "center" }}>
      <div className="kicker">
        <span className="tag">Lección {lesson.number} · {formatLong(lesson.forDate)}</span>
        <h1 className="h1">{lesson.title}</h1>
        <div className="hairline" />
      </div>
      <div style={{ margin: "20px auto", width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--clay)", background: "color-mix(in srgb, var(--clay) 12%, transparent)" }}>
        <Icon name="mosaic" size={30} />
      </div>
      <p className="lead">Esta experiencia se está preparando. Cada semana se añade la lección correspondiente como un recorrido para forjar tu propio artefacto.</p>

      {todayLesson && todayLesson.id !== lesson.id ? (
        <motion.button className="btn btn-primary btn-block" style={{ marginTop: 20 }} whileTap={{ scale: 0.98 }} transition={t.tap} onClick={onGoToday}>
          Ir a la lección de esta semana · {todayLesson.title} <Icon name="arrow" size={18} />
        </motion.button>
      ) : null}
      <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={onOpenLessons}>
        <Icon name="book" size={16} /> Ver todas las lecciones
      </button>
    </motion.section>
  );
}
