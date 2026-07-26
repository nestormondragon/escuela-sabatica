import React from "react";
import ChoiceInsight from "./ChoiceInsight.jsx";
import SkillThenCommit from "./SkillThenCommit.jsx";
import PickReveal from "./PickReveal.jsx";
import PerspectiveFlip from "./PerspectiveFlip.jsx";
import Stairs from "./Stairs.jsx";
import AnchorChain from "./AnchorChain.jsx";
import CommitDuo from "./CommitDuo.jsx";
import RestorationRitual from "../features/artifact/RestorationRitual.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import { attachChoiceReferences } from "../lib/localizedLegacyKit.js";

const REGISTRY = {
  choiceInsight: ChoiceInsight,
  skillThenCommit: SkillThenCommit,
  pickReveal: PickReveal,
  perspectiveFlip: PerspectiveFlip,
  stairs: Stairs,
  anchorChain: AnchorChain,
  commitDuo: CommitDuo,
};

/* Renders the right module for a station's module.type. */
export default function ModuleHost({
  module,
  onFill,
  onSkip,
  lessonId,
  slotId,
  pieceIndex = 0,
  materialVerb,
}) {
  const { t } = useI18n();
  const [pending, setPending] = React.useState(null);
  const Comp = REGISTRY[module.type];
  if (!Comp) {
    return <p className="muted">{t("module.unavailable", { type: module.type })}</p>;
  }
  if (pending) {
    return (
      <RestorationRitual
        type={module.type}
        lessonId={lessonId}
        pieceIndex={pieceIndex}
        materialVerb={materialVerb}
        onComplete={() => onFill(...pending)}
        onCancel={() => setPending(null)}
      />
    );
  }
  return (
    <Comp
      config={module}
      onFill={(value, extraPatch, ...rest) =>
        setPending([
          value,
          attachChoiceReferences(module, slotId, value, extraPatch),
          ...rest,
        ])
      }
      onSkip={onSkip}
    />
  );
}
