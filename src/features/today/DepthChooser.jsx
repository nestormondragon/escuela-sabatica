import React from "react";
import { motion } from "framer-motion";
import { DEPTHS } from "../../content/legacyEpisodeAdapter.js";
import { useArtifactProgress } from "../artifact/ArtifactProgressContext.jsx";
import "./depth-motion.css";
import { useI18n } from "../../i18n/LocaleProvider.jsx";

export default function DepthChooser({ value = "study", availability, onChange }) {
  const { t } = useI18n();
  const artifact = useArtifactProgress();

  React.useEffect(() => {
    artifact.setDepth(value);
  }, [artifact, value]);

  const change = (depthId) => {
    artifact.setDepth(depthId);
    onChange(depthId);
  };

  return (
    <fieldset className="depth-chooser">
      <legend className="depth-chooser__legend">{t("today.chooseDepth")}</legend>
      {Object.values(DEPTHS).map((depth) => {
        const enabled = availability?.[depth.id] !== false;
        return (
          <button
            key={depth.id}
            type="button"
            className="depth-choice"
            data-active={value === depth.id}
            aria-pressed={value === depth.id}
            disabled={!enabled}
            onClick={() => enabled && change(depth.id)}
          >
            {value === depth.id ? (
              <motion.i
                className="depth-choice__inlay"
                layoutId="depth-choice-inlay"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            ) : null}
            <span>{t(`common.${depth.id === "minute" ? "oneMinute" : depth.id}`)}</span>
            <small>{t(`depth.${depth.id}Description`)}</small>
          </button>
        );
      })}
    </fieldset>
  );
}
