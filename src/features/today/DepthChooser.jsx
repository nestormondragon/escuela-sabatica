import React from "react";
import { DEPTHS } from "../../content/legacyEpisodeAdapter.js";

export default function DepthChooser({ value = "study", availability, onChange }) {
  return (
    <fieldset className="depth-chooser">
      <legend className="sr-only">Elige la profundidad de hoy</legend>
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
            onClick={() => enabled && onChange(depth.id)}
          >
            <span>{depth.label}</span>
            <small>{depth.description}</small>
          </button>
        );
      })}
    </fieldset>
  );
}
