import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stageIndexFor } from "../../components/Centerpiece.jsx";
import Icon from "../../components/Icon.jsx";
import { useAppReducedMotion } from "../../lib/useAppReducedMotion.js";
import LessonRelief from "../../visual-world/LessonRelief.jsx";

export default function WorldStage({
  lesson,
  filled = 0,
  total = 8,
  previous,
  next,
  compact = false,
  priority = false,
}) {
  const reduced = useAppReducedMotion();
  const stage = stageIndexFor(filled);

  return (
    <section
      className={`world-stage${compact ? " is-compact" : ""}`}
      data-stage={stage}
      aria-label={`Panel de la lección ${lesson.number}. ${filled} de ${total} piezas colocadas.`}
    >
      <motion.div
        className="world-stage__architecture"
        initial={reduced ? false : { opacity: 0, y: 8, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduced ? 0 : 0.52,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div className="world-stage__lintel">
          <span>Corinto</span>
          <i aria-hidden="true" />
          <span>Lección {lesson.number}</span>
        </div>

        <div className="world-stage__neighbor world-stage__neighbor--previous" aria-hidden="true">
          {previous ? String(previous.number).padStart(2, "0") : ""}
        </div>
        <div className="world-stage__neighbor world-stage__neighbor--next" aria-hidden="true">
          {next ? String(next.number).padStart(2, "0") : ""}
        </div>

        <div className="world-stage__panel">
          <span className="world-stage__number" aria-hidden="true">
            {String(lesson.number).padStart(2, "0")}
          </span>
          <LessonRelief
            lesson={lesson}
            stage={stage}
            compact={compact}
            priority={priority}
          />
          <span className="world-stage__restoration-line" aria-hidden="true" />
        </div>

        <div className="world-stage__caption">
          <span>
            <small>El objeto que estás formando</small>
            {lesson.kitName}
          </span>
          <span>
            <small>{lesson.verseRef}</small>
            {filled} de {total}
          </span>
        </div>

        <div
          className="world-stage__tesserae"
          role="progressbar"
          aria-label="Piezas colocadas"
          aria-valuemin="0"
          aria-valuemax={total}
          aria-valuenow={filled}
          aria-valuetext={`${filled} de ${total} piezas colocadas`}
        >
          {Array.from({ length: total }, (_, index) => (
            <i key={index} data-set={String(index < filled)} aria-hidden="true" />
          ))}
        </div>
      </motion.div>

      <Link className="world-stage__mosaic-link" to="/mosaico">
        <span>Ver el muro completo</span>
        <Icon name="arrow" size={16} />
      </Link>
    </section>
  );
}
