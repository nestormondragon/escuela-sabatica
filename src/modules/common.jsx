import React from "react";
import { motion } from "framer-motion";
import Icon from "../components/Icon.jsx";
import { reveal, listItem, listParent, t } from "../lib/motion.js";
import { useI18n } from "../i18n/LocaleProvider.jsx";

/* shared bits for the station modules */

export function Privacy({ children }) {
  const { t: translate } = useI18n();
  return (
    <div className="privacy">
      <Icon name="lock" size={14} />
      {children || translate("module.private")}
    </div>
  );
}

export function Pause() {
  return (
    <div className="pause">
      <Icon name="mosaic" size={16} />
    </div>
  );
}

export function Insight({ label, body, sub }) {
  return (
    <motion.div className="insight" variants={reveal} initial="initial" animate="animate">
      {label ? <div className="il">{label}</div> : null}
      <div className="ib">{body}</div>
      {sub ? <div className="is">{sub}</div> : null}
    </motion.div>
  );
}

export function SkillBadge({ children }) {
  return (
    <motion.div variants={reveal} initial="initial" animate="animate">
      <span className="skill"><Icon name="sparkles" size={14} /> {children}</span>
    </motion.div>
  );
}

export function Verse({ text, cite }) {
  return (
    <div className="verse">
      {text}
      {cite ? <span className="ref">{cite}</span> : null}
    </div>
  );
}

export function PersonalNote({ children }) {
  if (!children) return null;
  return (
    <div className="personal">
      <Icon name="feather" size={18} />
      <span>{children}</span>
    </div>
  );
}

/* Save / skip action bar */
export function SaveBar({ label, onSave, onSkip, variant = "primary", disabled }) {
  const { t: translate } = useI18n();
  return (
    <div className="stack" style={{ marginTop: 16 }}>
      <motion.button
        className={`btn btn-${variant} btn-block`}
        onClick={onSave}
        disabled={disabled}
        whileTap={{ scale: 0.98 }}
        transition={t.tap}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {label} <Icon name="arrow" size={18} />
      </motion.button>
      {onSkip ? (
        <div className="skip-wrap">
          <button className="skip" onClick={onSkip}>{translate("module.skip")}</button>
        </div>
      ) : null}
    </div>
  );
}

/* A chip row that can prefill a text field */
export function ChipRow({ options, value, onPick }) {
  return (
    <div className="chips">
      {options.map((o) => (
        <motion.button
          key={o}
          className="chip"
          aria-pressed={value === o}
          onClick={() => onPick(o)}
          whileTap={{ scale: 0.96 }}
          transition={t.tap}
        >
          {o}
        </motion.button>
      ))}
    </div>
  );
}

/* Staggered option list (single choice) */
export function OptionList({ options, selectedId, onSelect, getId = (o) => o.id, getLabel = (o) => o.label }) {
  return (
    <motion.div className="opt-list" variants={listParent} initial="hidden" animate="show">
      {options.map((o) => {
        const id = getId(o);
        return (
          <motion.button
            key={id}
            className="opt"
            variants={listItem}
            aria-pressed={selectedId === id}
            onClick={() => onSelect(o)}
            whileTap={{ scale: 0.98 }}
            transition={t.tap}
          >
            <span className="dot" />
            <span className="txt">{getLabel(o)}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
