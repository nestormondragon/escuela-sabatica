import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Privacy, Insight, OptionList, SaveBar, Pause } from "./common.jsx";

/* Pick one option → a tailored insight → save it to the anchor.
   Used for "Mi tormenta" and "Mi primera reacción". */
export default function ChoiceInsight({ config, onFill, onSkip }) {
  const [picked, setPicked] = useState(null);

  return (
    <div className="stack">
      {config.privacy ? <Privacy /> : null}
      <p className="prompt-q">{config.prompt}</p>
      {config.hint ? <p className="prompt-hint">{config.hint}</p> : null}

      <OptionList options={config.options} selectedId={picked?.id} onSelect={setPicked} />

      <AnimatePresence mode="wait">
        {picked ? (
          <div className="stack" key={picked.id}>
            <Insight label="Para ti" body={picked.insight} />
            {config.closing ? (
              <>
                <Pause />
                <p className="story" style={{ borderLeftColor: "var(--gold)" }}>{config.closing}</p>
              </>
            ) : null}
            <SaveBar
              label={config.saveLabel || "Guardar en mi ancla"}
              onSave={() => onFill(picked.label, null, config.seedSub, picked.tags)}
              onSkip={onSkip}
            />
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
