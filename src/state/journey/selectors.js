import { JOURNEY_LESSON_IDS } from "./constants.js";
import { unwrapField } from "./privacy.js";

export const selectProfileName = (state) =>
  unwrapField(state?.profile?.displayName, "");

export const selectCurrentLessonId = (state) =>
  state?.navigation?.lessonOverride ||
  state?.navigation?.lastLessonId ||
  null;

export const selectLesson = (state, lessonId) =>
  state?.lessons?.[lessonId] || null;

export const selectLegacyKit = (state, lessonId) =>
  selectLesson(state, lessonId)?.legacyKit || null;

export const selectPanel = (state, lessonId) =>
  state?.mosaic?.panels?.[lessonId] || null;

export const selectSabbathPack = (state, lessonId) =>
  state?.sabbathPacks?.[lessonId] || null;

/** Quarter summary based on meaningful lesson states, never points or rank. */
export function selectQuarterProgress(state) {
  const lessons = JOURNEY_LESSON_IDS.map((id) => state?.lessons?.[id]).filter(
    Boolean
  );
  const started = lessons.filter((lesson) => lesson.status !== "not-started")
    .length;
  const prepared = lessons.filter((lesson) =>
    ["prepared", "reflected"].includes(lesson.status)
  ).length;
  const reflected = lessons.filter(
    (lesson) => lesson.status === "reflected"
  ).length;
  return {
    totalLessons: JOURNEY_LESSON_IDS.length,
    startedLessons: started,
    preparedLessons: prepared,
    reflectedLessons: reflected,
  };
}

/**
 * Resolve a useful next step without imposing a streak. The UI owns the
 * Spanish label while this selector returns stable domain intent.
 */
export function selectNextLessonAction(state, preferredLessonId = null) {
  const current =
    preferredLessonId ||
    selectCurrentLessonId(state) ||
    JOURNEY_LESSON_IDS.find(
      (lessonId) => state?.lessons?.[lessonId]?.status === "active"
    ) ||
    JOURNEY_LESSON_IDS.find(
      (lessonId) => state?.lessons?.[lessonId]?.status === "not-started"
    ) ||
    JOURNEY_LESSON_IDS[0];
  const lesson = selectLesson(state, current);
  if (!lesson) return null;

  const episodes = Object.entries(lesson.episodeProgress || {});
  const unfinished = episodes.find(([, progress]) => {
    const currentStep = progress?.currentStepId;
    return currentStep && !progress.completedStepIds?.includes(currentStep);
  });
  if (unfinished) {
    return {
      kind: "resume-episode",
      lessonId: current,
      episodeId: unfinished[0],
      stepId: unfinished[1].currentStepId,
    };
  }
  if (lesson.status === "prepared" || lesson.status === "reflected") {
    return { kind: "open-sabbath-pack", lessonId: current };
  }
  return {
    kind: lesson.status === "active" ? "resume-lesson" : "start-lesson",
    lessonId: current,
  };
}

export const selectors = Object.freeze({
  selectProfileName,
  selectCurrentLessonId,
  selectLesson,
  selectLegacyKit,
  selectPanel,
  selectSabbathPack,
  selectQuarterProgress,
  selectNextLessonAction,
});
