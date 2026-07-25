import React, { useState } from "react";
import { ChipRow, SaveBar, Pause } from "./common.jsx";

/* Two commitments: a concrete step + someone to encourage.
   Used for "Mi paso de la semana". */
export default function CommitDuo({ config, onFill, onSkip }) {
  const [chosen, setChosen] = useState("");
  const [step, setStep] = useState("");
  const [person, setPerson] = useState("");
  const stepValue = (step.trim() || chosen).trim();

  return (
    <div className="stack">
      <p className="prompt-q">{config.stepPrompt}</p>
      {config.stepHint ? <p className="prompt-hint">{config.stepHint}</p> : null}
      <ChipRow options={config.stepOptions} value={step ? "" : chosen} onPick={(o) => { setChosen(o); setStep(""); }} />
      <div className="field">
        <input
          type="text"
          aria-label={config.stepPrompt}
          placeholder={config.stepPlaceholder}
          value={step}
          onChange={(e) => { setStep(e.target.value); if (e.target.value) setChosen(""); }}
          maxLength={90}
        />
      </div>

      <Pause />

      <p className="prompt-q" style={{ fontSize: "1.2rem" }}>{config.personPrompt}</p>
      {config.personHint ? <p className="prompt-hint">{config.personHint}</p> : null}
      <div className="field">
        <input
          type="text"
          aria-label={config.personPrompt}
          placeholder={config.personPlaceholder}
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          maxLength={60}
        />
      </div>

      <SaveBar
        label={config.saveLabel || "Guardar y cerrar"}
        disabled={!stepValue}
        onSave={() =>
          onFill(stepValue, { [config.stepExtraKey]: stepValue, [config.personExtraKey]: person.trim() }, config.seedSub)
        }
        onSkip={onSkip}
      />
    </div>
  );
}
