import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Centerpiece from "../../components/Centerpiece.jsx";
import Icon from "../../components/Icon.jsx";
import { useAppReducedMotion } from "../../lib/useAppReducedMotion.js";

export default function WorldStage({
  lesson,
  filled = 0,
  total = 8,
  previous,
  next,
  compact = false,
}) {
  const reduced = useAppReducedMotion();
  return (
    <section
      className={`world-stage${compact ? " is-compact" : ""}`}
      aria-label={`Panel de la lección ${lesson.number}. ${filled} de ${total} piezas colocadas.`}
    >
      <div className="world-stage__seam world-stage__seam--top" aria-hidden="true" />
      <div className="world-stage__neighbors" aria-hidden="true">
        <span>{previous ? String(previous.number).padStart(2, "0") : ""}</span>
        <span>{next ? String(next.number).padStart(2, "0") : ""}</span>
      </div>

      <motion.div
        className="world-stage__panel"
        initial={reduced ? false : { opacity: 0, y: 6, scale: 0.965 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduced ? 0 : 0.42,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <span className="world-stage__number">
          {String(lesson.number).padStart(2, "0")}
        </span>
        <div className="world-stage__motif">
          <Centerpiece
            lesson={{
              ...lesson,
              scene: {
                motif: lesson.scene?.motif || lesson.motif,
                arc: lesson.scene?.arc || lesson.arc,
              },
            }}
            filled={filled}
            size={compact ? 180 : 330}
          />
        </div>
        <div className="world-stage__caption">
          <span>{lesson.kitName}</span>
          <span>{filled} de {total}</span>
        </div>
      </motion.div>

      <div className="world-stage__seam world-stage__seam--down" aria-hidden="true" />

      <Link className="world-stage__mosaic-link" to="/mosaico">
        Ver el mosaico completo
        <Icon name="arrow" size={16} />
      </Link>
    </section>
  );
}
