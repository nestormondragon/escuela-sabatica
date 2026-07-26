import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/Icon.jsx";
import { useAppReducedMotion } from "../../lib/useAppReducedMotion.js";
import { useI18n } from "../../i18n/LocaleProvider.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";
import { isRemovalLesson } from "../../visual-world/lessonVisualManifest.js";
import "./artifact-mutation-v2.css";

const SETTLEMENT_DUST = Object.freeze([
  [-44, -20, 4],
  [-35, 10, 3],
  [-24, -34, 5],
  [-14, 26, 3],
  [-4, -24, 4],
  [7, 31, 3],
  [15, -32, 3],
  [24, 19, 5],
  [33, -14, 3],
  [43, 8, 4],
  [-50, 24, 2],
  [50, -27, 2],
]);

export default function ArtifactMutation({
  lesson,
  filled,
  total,
  label,
  value,
  insight,
  capabilityLabel,
  onContinue,
}) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const reduced = useAppReducedMotion();
  const { t } = useI18n();
  const removal = isRemovalLesson(lesson?.id);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    sectionRef.current?.scrollIntoView({
      block: "start",
      inline: "nearest",
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
      aria-labelledby="artifact-mutation-title"
    >
      <div className="artifact-mutation__world">
        <motion.div
          className="artifact-mutation__relief"
          initial={
            reduced
              ? false
              : { opacity: 0, y: 26, rotateX: 9, scale: 0.88 }
          }
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0 : 0.78,
            delay: reduced ? 0 : 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <LessonRelief
            lesson={lesson}
            filled={filled}
            total={total}
            priority
            className="artifact-mutation__lesson-relief"
          />
        </motion.div>
        <div className="artifact-mutation__impact" aria-hidden="true">
          {SETTLEMENT_DUST.map(([x, y, size], index) => (
            <motion.span
              key={`${x}-${y}`}
              style={{
                "--dust-x": `${x}px`,
                "--dust-y": `${y}px`,
                "--dust-size": `${size}px`,
              }}
              initial={
                reduced ? false : { opacity: 0, x: 0, y: 0, scale: 0.35 }
              }
              animate={
                reduced
                  ? { opacity: 0 }
                  : {
                      opacity: [0, 0.78, 0],
                      x,
                      y,
                      scale: [0.35, 1, 0.15],
                    }
              }
              transition={{
                duration: 0.64,
                delay: 0.58 + index * 0.018,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
          <motion.i
            initial={reduced ? false : { opacity: 0, scaleX: 0.08 }}
            animate={
              reduced
                ? { opacity: 0.22, scaleX: 1 }
                : { opacity: [0, 0.95, 0.22], scaleX: 1 }
            }
            transition={{
              duration: reduced ? 0 : 0.84,
              delay: reduced ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
        <p
          className="artifact-mutation__piece-count"
          role="status"
          aria-live="polite"
        >
          {t(removal ? "common.regions" : "common.pieces", { filled, total })}
        </p>
      </div>
      <p className="artifact-kicker">
        {t(removal ? "artifact.revealed" : "artifact.placed")}
      </p>
      <h1 id="artifact-mutation-title" ref={headingRef} tabIndex={-1}>
        {label}
      </h1>
      <blockquote>{value}</blockquote>
      {insight ? <p className="artifact-mutation-insight">{insight}</p> : null}
      {capabilityLabel ? (
        <p className="artifact-capability">
          <Icon name="spark" size={16} />
          {t("artifact.practice", { label: capabilityLabel })}
        </p>
      ) : null}
      <button type="button" className="world-action compact" onClick={onContinue}>
        <span>{t("artifact.viewChanged")}</span>
        <Icon name="arrow" size={19} />
      </button>
    </motion.section>
  );
}
