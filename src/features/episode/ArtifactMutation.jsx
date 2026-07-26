import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/Icon.jsx";
import { useAppReducedMotion } from "../../lib/useAppReducedMotion.js";

export default function ArtifactMutation({
  label,
  value,
  insight,
  capabilityLabel,
  onContinue,
}) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const reduced = useAppReducedMotion();

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    sectionRef.current?.scrollIntoView({
      block: "start",
      behavior: reduced ? "auto" : "smooth",
    });
  }, [reduced]);

  return (
    <motion.section
      ref={sectionRef}
      className="artifact-mutation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-live="polite"
      aria-labelledby="artifact-mutation-title"
    >
      <div className="artifact-mutation__placement" aria-hidden="true">
        <motion.span
          className="artifact-mutation__tessera"
          initial={
            reduced
              ? false
              : { opacity: 0, y: -34, rotate: -7, scale: 0.72 }
          }
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0 : 0.48,
            delay: reduced ? 0 : 0.08,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
        <motion.span
          className="artifact-mutation__contact-light"
          initial={reduced ? false : { opacity: 0, scaleX: 0.18 }}
          animate={{ opacity: [0, 1, 0.22], scaleX: 1 }}
          transition={{
            duration: reduced ? 0 : 0.72,
            delay: reduced ? 0 : 0.38,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      </div>
      <div className="artifact-mutation-seam" aria-hidden="true">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: reduced ? 0 : 0.72,
            delay: reduced ? 0 : 0.16,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      </div>
      <p className="artifact-kicker">Pieza colocada</p>
      <h2 id="artifact-mutation-title" ref={headingRef} tabIndex={-1}>
        {label}
      </h2>
      <blockquote>{value}</blockquote>
      {insight ? <p className="artifact-mutation-insight">{insight}</p> : null}
      {capabilityLabel ? (
        <p className="artifact-capability">
          <Icon name="spark" size={16} />
          Práctica ejercitada: {capabilityLabel}
        </p>
      ) : null}
      <button type="button" className="world-action compact" onClick={onContinue}>
        <span>Ver el mosaico cambiado</span>
        <Icon name="arrow" size={19} />
      </button>
    </motion.section>
  );
}
