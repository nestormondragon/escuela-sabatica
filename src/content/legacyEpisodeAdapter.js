const CANONICAL_DAYS = {
  es: [
    "Sábado de apertura",
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Profundizar",
    "Viernes",
  ],
  en: [
    "Opening Sabbath",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Go deeper",
    "Friday",
  ],
};

export const DEPTHS = {
  minute: {
    id: "minute",
    label: "1 minuto",
    description: "Pregunta, decisión y una pieza",
  },
  study: {
    id: "study",
    label: "Estudiar",
    description: "Contexto, ejercicio y descubrimiento",
  },
  deep: {
    id: "deep",
    label: "A fondo",
    description: "Recorrido completo y guía de diálogo",
  },
};

export function adaptLessonToEpisodes(lesson) {
  const days = CANONICAL_DAYS[lesson?.locale === "en" ? "en" : "es"];
  return lesson.stations.map((station, index) => ({
    id: station.id,
    index,
    canonicalDay: days[index] || station.day,
    title: station.title,
    tag: station.tag,
    cue: station.cue,
    story: station.story,
    module: station.module,
    slotId: station.slot,
    slot: lesson.slots.find((candidate) => candidate.id === station.slot) || null,
    facilitator: lesson.facilitator?.[station.id] || null,
    depthAvailability: {
      minute: true,
      study: true,
      deep: Boolean(lesson.facilitator?.[station.id] || station.story),
    },
  }));
}

export function firstIncompleteEpisode(lesson, slots = {}) {
  const episodes = adaptLessonToEpisodes(lesson);
  return episodes.find((episode) => !slots[episode.slotId]) || null;
}

export function episodeById(lesson, episodeId) {
  return adaptLessonToEpisodes(lesson).find((episode) => episode.id === episodeId) || null;
}

export function contentForDepth(episode, depth) {
  const selected = DEPTHS[depth] ? depth : "study";
  return {
    ...episode,
    depth: selected,
    showStory: selected !== "minute",
  };
}
