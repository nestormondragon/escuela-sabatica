const CAPABILITIES = Object.freeze({
  choiceInsight: {
    id: "notice-influence",
    label: "Observar tu respuesta con honestidad",
  },
  skillThenCommit: {
    id: "restorative-discernment",
    label: "Practicar discernimiento y elegir un paso",
  },
  perspectiveFlip: {
    id: "perspective-taking",
    label: "Mirar desde otra perspectiva",
  },
  pickReveal: {
    id: "text-shaped-choice",
    label: "Explorar una decisión a la luz del texto",
  },
  anchorChain: {
    id: "trace-a-sequence",
    label: "Conectar una verdad paso a paso",
  },
  stairs: {
    id: "name-and-release",
    label: "Nombrar y soltar una carga",
  },
  commitDuo: {
    id: "relational-action",
    label: "Convertir una convicción en un paso acompañado",
  },
});

export function capabilityForModule(moduleType) {
  return (
    CAPABILITIES[moduleType] || {
      id: "reflect-and-respond",
      label: "Convertir una lectura en una respuesta",
    }
  );
}

export function latestOpenCommitment(state, lessonId = null) {
  return [...(state?.commitments || [])]
    .filter(
      (commitment) =>
        commitment.status === "open" &&
        (!lessonId || commitment.lessonId !== lessonId)
    )
    .sort(
      (left, right) =>
        Date.parse(right.updatedAt || right.createdAt || 0) -
        Date.parse(left.updatedAt || left.createdAt || 0)
    )[0] || null;
}

export function latestCapability(state) {
  return Object.values(state?.capabilities || {})
    .flatMap((capability) =>
      (capability.evidence || []).map((evidence) => ({
        ...evidence,
        label: evidence.label || capability.label || "",
        practiceCount: capability.evidence.length,
      }))
    )
    .sort(
      (left, right) =>
        Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0)
    )[0] || null;
}

export function latestSavedPhrase(state, lessonId) {
  const slots = state?.lessons?.[lessonId]?.legacyKit?.slots || {};
  return Object.values(slots)
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .at(-1) || "";
}
