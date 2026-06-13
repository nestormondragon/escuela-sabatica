import React from "react";
import ChoiceInsight from "./ChoiceInsight.jsx";
import SkillThenCommit from "./SkillThenCommit.jsx";
import PickReveal from "./PickReveal.jsx";
import PerspectiveFlip from "./PerspectiveFlip.jsx";
import Stairs from "./Stairs.jsx";
import AnchorChain from "./AnchorChain.jsx";
import CommitDuo from "./CommitDuo.jsx";

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
export default function ModuleHost({ module, onFill, onSkip }) {
  const Comp = REGISTRY[module.type];
  if (!Comp) {
    return <p className="muted">Módulo no disponible: {module.type}</p>;
  }
  return <Comp config={module} onFill={onFill} onSkip={onSkip} />;
}
