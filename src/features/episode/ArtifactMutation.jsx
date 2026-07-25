import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/Icon.jsx";

export default function ArtifactMutation({
  label,
  value,
  insight,
  capabilityLabel,
  onContinue,
}) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.section
      className="artifact-mutation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-live="polite"
      aria-labelledby="artifact-mutation-title"
    >
      <div className="artifact-mutation-seam" aria-hidden="true">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
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
