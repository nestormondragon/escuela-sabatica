import {
  DEPTHS,
  JOURNEY_LESSON_IDS,
  JOURNEY_QUARTER_ID,
  JOURNEY_SCHEMA_VERSION,
  LESSON_STATUSES,
  LOCALES,
  ROLES,
  THEMES,
  TEXT_SIZES,
} from "./constants.js";
import { isStoredField, privateField } from "./privacy.js";

const object = (value) =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));
const iso = (value) =>
  typeof value === "string" && !Number.isNaN(Date.parse(value));

/** Error raised when durable journey data does not match schema v2. */
export class JourneyValidationError extends Error {
  constructor(errors) {
    super(`JourneyState v2 validation failed: ${errors.join("; ")}`);
    this.name = "JourneyValidationError";
    this.code = "INVALID_JOURNEY_STATE";
    this.errors = errors;
  }
}

/** Create the canonical empty lesson record. */
export function createEmptyLesson() {
  return {
    status: "not-started",
    completedEpisodeIds: [],
    episodeProgress: {},
    investments: [],
    sabbathPackId: null,
    sourceKitImported: false,
    legacyKit: null,
  };
}

/** Create the canonical empty mosaic panel record. */
export function createEmptyPanel() {
  return {
    state: "unstarted",
    inscription: null,
    evidenceIds: [],
    connectionIds: [],
  };
}

/**
 * Create a serializable JourneyState v2. `now` and `writerId` are injectable
 * so migrations and tests remain deterministic.
 */
export function createEmptyJourneyState({
  now = new Date().toISOString(),
  writerId = "bootstrap",
} = {}) {
  const lessons = {};
  const panels = {};
  JOURNEY_LESSON_IDS.forEach((lessonId) => {
    lessons[lessonId] = createEmptyLesson();
    panels[lessonId] = createEmptyPanel();
  });

  return {
    schemaVersion: JOURNEY_SCHEMA_VERSION,
    quarterId: JOURNEY_QUARTER_ID,
    revision: 0,
    writerId,
    createdAt: now,
    updatedAt: now,
    migration: {
      sourceVersion: 1,
      completedAt: null,
      sourceKeys: [],
    },
    profile: {
      displayName: privateField(""),
      role: "participant",
      preferredDepth: "study",
      rhythm: {
        weeklyTarget: 4,
        preferredTimes: [],
        remindersEnabled: false,
      },
    },
    navigation: {
      lastRoute: "/hoy",
      lastLessonId: null,
      lastEpisodeId: null,
      lessonOverride: null,
    },
    lessons,
    mosaic: {
      panels,
      revealedConnectionIds: [],
    },
    capabilities: {},
    commitments: [],
    sabbathPacks: {},
    settings: {
      theme: "dark",
      textSize: "normal",
      locale: "es",
      reducedMotion: "system",
      haptics: true,
      streakVisible: false,
    },
    legacy: {
      settings: null,
      streak: null,
    },
  };
}

/** Validate a persisted state without mutating it. */
export function validateJourneyState(state) {
  const errors = [];
  if (!object(state)) return { ok: false, errors: ["state must be an object"] };
  if (state.schemaVersion !== JOURNEY_SCHEMA_VERSION)
    errors.push("schemaVersion must be 2");
  if (state.quarterId !== JOURNEY_QUARTER_ID)
    errors.push("quarterId must be 2026-Q3");
  if (!Number.isInteger(state.revision) || state.revision < 0)
    errors.push("revision must be a nonnegative integer");
  if (typeof state.writerId !== "string") errors.push("writerId must be a string");
  if (!iso(state.createdAt)) errors.push("createdAt must be an ISO date");
  if (!iso(state.updatedAt)) errors.push("updatedAt must be an ISO date");
  if (!object(state.migration)) errors.push("migration must be an object");
  else {
    if (state.migration.sourceVersion !== 1)
      errors.push("migration.sourceVersion must be 1");
    if (
      state.migration.completedAt !== null &&
      !iso(state.migration.completedAt)
    )
      errors.push("migration.completedAt must be null or an ISO date");
    if (
      !Array.isArray(state.migration.sourceKeys) ||
      state.migration.sourceKeys.some((key) => typeof key !== "string")
    )
      errors.push("migration.sourceKeys must be a string array");
  }

  if (!object(state.profile)) errors.push("profile must be an object");
  else {
    if (!isStoredField(state.profile.displayName))
      errors.push("profile.displayName must be a stored field");
    if (!ROLES.includes(state.profile.role))
      errors.push("profile.role is invalid");
    if (!DEPTHS.includes(state.profile.preferredDepth))
      errors.push("profile.preferredDepth is invalid");
    if (!object(state.profile.rhythm))
      errors.push("profile.rhythm must be an object");
    else {
      if (
        !Number.isInteger(state.profile.rhythm.weeklyTarget) ||
        state.profile.rhythm.weeklyTarget < 0 ||
        state.profile.rhythm.weeklyTarget > 7
      )
        errors.push("profile.rhythm.weeklyTarget is invalid");
      if (!Array.isArray(state.profile.rhythm.preferredTimes))
        errors.push("profile.rhythm.preferredTimes must be an array");
      if (typeof state.profile.rhythm.remindersEnabled !== "boolean")
        errors.push("profile.rhythm.remindersEnabled must be boolean");
    }
  }

  if (!object(state.navigation))
    errors.push("navigation must be an object");
  else if (typeof state.navigation.lastRoute !== "string")
    errors.push("navigation.lastRoute must be a string");
  else {
    ["lastLessonId", "lastEpisodeId", "lessonOverride"].forEach((key) => {
      const value = state.navigation[key];
      if (value !== null && typeof value !== "string")
        errors.push(`navigation.${key} must be null or a string`);
    });
  }

  if (!object(state.lessons)) errors.push("lessons must be an object");
  else {
    JOURNEY_LESSON_IDS.forEach((lessonId) => {
      const lesson = state.lessons[lessonId];
      if (!object(lesson)) {
        errors.push(`lessons.${lessonId} must exist`);
        return;
      }
      if (!LESSON_STATUSES.includes(lesson.status))
        errors.push(`lessons.${lessonId}.status is invalid`);
      if (!Array.isArray(lesson.completedEpisodeIds))
        errors.push(`lessons.${lessonId}.completedEpisodeIds must be an array`);
      if (!object(lesson.episodeProgress))
        errors.push(`lessons.${lessonId}.episodeProgress must be an object`);
      else {
        Object.entries(lesson.episodeProgress).forEach(
          ([episodeId, progress]) => {
            if (!object(progress)) {
              errors.push(
                `lessons.${lessonId}.episodeProgress.${episodeId} must be an object`
              );
              return;
            }
            if (
              progress.selectedDepth !== undefined &&
              !DEPTHS.includes(progress.selectedDepth)
            )
              errors.push(
                `lessons.${lessonId}.episodeProgress.${episodeId}.selectedDepth is invalid`
              );
            [
              "completedStepIds",
              "attemptIds",
              "revisionIds",
              "draftIds",
            ].forEach((key) => {
              if (
                progress[key] !== undefined &&
                !Array.isArray(progress[key])
              )
                errors.push(
                  `lessons.${lessonId}.episodeProgress.${episodeId}.${key} must be an array`
                );
            });
          }
        );
      }
      if (!Array.isArray(lesson.investments))
        errors.push(`lessons.${lessonId}.investments must be an array`);
      else {
        lesson.investments.forEach((investment, index) => {
          if (!object(investment) || typeof investment.id !== "string")
            errors.push(
              `lessons.${lessonId}.investments.${index} is invalid`
            );
          else if (!isStoredField(investment.value))
            errors.push(
              `lessons.${lessonId}.investments.${index}.value must be a stored field`
            );
        });
      }
      if (typeof lesson.sourceKitImported !== "boolean")
        errors.push(`lessons.${lessonId}.sourceKitImported must be boolean`);
      if (lesson.legacyKit !== null && !object(lesson.legacyKit))
        errors.push(`lessons.${lessonId}.legacyKit must be null or an object`);
    });
  }

  if (!object(state.mosaic) || !object(state.mosaic.panels))
    errors.push("mosaic.panels must be an object");
  else {
    JOURNEY_LESSON_IDS.forEach((lessonId) => {
      const panel = state.mosaic.panels[lessonId];
      if (!object(panel))
        errors.push(`mosaic.panels.${lessonId} must exist`);
      else {
        if (typeof panel.state !== "string")
          errors.push(`mosaic.panels.${lessonId}.state must be a string`);
        if (panel.inscription !== null && !isStoredField(panel.inscription))
          errors.push(
            `mosaic.panels.${lessonId}.inscription must be a stored field or null`
          );
        if (!Array.isArray(panel.evidenceIds))
          errors.push(`mosaic.panels.${lessonId}.evidenceIds must be an array`);
        if (!Array.isArray(panel.connectionIds))
          errors.push(
            `mosaic.panels.${lessonId}.connectionIds must be an array`
          );
      }
    });
    if (!Array.isArray(state.mosaic.revealedConnectionIds))
      errors.push("mosaic.revealedConnectionIds must be an array");
  }

  if (!object(state.capabilities))
    errors.push("capabilities must be an object");
  if (!Array.isArray(state.commitments))
    errors.push("commitments must be an array");
  if (!object(state.sabbathPacks))
    errors.push("sabbathPacks must be an object");
  if (!object(state.legacy)) errors.push("legacy must be an object");

  if (!object(state.settings)) errors.push("settings must be an object");
  else {
    if (!THEMES.includes(state.settings.theme))
      errors.push("settings.theme is invalid");
    // textSize was added after JourneyState v2 shipped. An absent value keeps
    // existing v2 records valid; consumers resolve it to the normal default.
    if (
      state.settings.textSize !== undefined &&
      !TEXT_SIZES.includes(state.settings.textSize)
    )
      errors.push("settings.textSize is invalid");
    // locale was added after JourneyState v2 shipped. Keep older v2 records
    // valid and resolve an absent locale to Spanish in the UI.
    if (
      state.settings.locale !== undefined &&
      !LOCALES.includes(state.settings.locale)
    )
      errors.push("settings.locale is invalid");
    if (
      state.settings.reducedMotion !== "system" &&
      typeof state.settings.reducedMotion !== "boolean"
    )
      errors.push("settings.reducedMotion is invalid");
    if (typeof state.settings.haptics !== "boolean")
      errors.push("settings.haptics must be boolean");
    if (typeof state.settings.streakVisible !== "boolean")
      errors.push("settings.streakVisible must be boolean");
  }

  return { ok: errors.length === 0, errors };
}

/** Throw a typed validation error when a state is not persistable. */
export function assertValidJourneyState(state) {
  const result = validateJourneyState(state);
  if (!result.ok) throw new JourneyValidationError(result.errors);
  return state;
}
