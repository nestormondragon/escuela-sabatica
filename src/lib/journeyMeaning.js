const CAPABILITIES = Object.freeze({
  choiceInsight: {
    id: "notice-influence",
    es: "Observar tu respuesta con honestidad",
    en: "Notice your response honestly",
  },
  skillThenCommit: {
    id: "restorative-discernment",
    es: "Practicar discernimiento y elegir un paso",
    en: "Practice discernment and choose a step",
  },
  perspectiveFlip: {
    id: "perspective-taking",
    es: "Mirar desde otra perspectiva",
    en: "See from another perspective",
  },
  pickReveal: {
    id: "text-shaped-choice",
    es: "Explorar una decisión a la luz del texto",
    en: "Explore a decision in light of the text",
  },
  anchorChain: {
    id: "trace-a-sequence",
    es: "Conectar una verdad paso a paso",
    en: "Connect a truth step by step",
  },
  stairs: {
    id: "name-and-release",
    es: "Nombrar y soltar una carga",
    en: "Name and release a burden",
  },
  commitDuo: {
    id: "relational-action",
    es: "Convertir una convicción en un paso acompañado",
    en: "Turn a conviction into an accompanied step",
  },
});

const FALLBACK_CAPABILITY = Object.freeze({
  id: "reflect-and-respond",
  es: "Convertir una lectura en una respuesta",
  en: "Turn a reading into a response",
});

function localizedCapability(capability, locale) {
  return {
    id: capability.id,
    label: locale === "en" ? capability.en : capability.es,
  };
}

export function capabilityForModule(moduleType, locale = "es") {
  return localizedCapability(
    CAPABILITIES[moduleType] || FALLBACK_CAPABILITY,
    locale
  );
}

export function capabilityLabelForId(capabilityId, locale = "es") {
  const capability =
    Object.values(CAPABILITIES).find((entry) => entry.id === capabilityId) ||
    FALLBACK_CAPABILITY;
  return localizedCapability(capability, locale).label;
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
