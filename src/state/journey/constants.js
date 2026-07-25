/** Durable identity for the Q3 2026 journey record. */
export const JOURNEY_SCHEMA_VERSION = 2;
export const JOURNEY_QUARTER_ID = "2026-Q3";
export const JOURNEY_KEY = "escuela:journey:2026-Q3";
export const JOURNEY_BACKUP_KEY = "escuela:journey:2026-Q3:backup";
export const LEGACY_PREFIX = "escuela:";

/** Stable lesson ids for the quarter. */
export const JOURNEY_LESSON_IDS = Object.freeze(
  Array.from({ length: 13 }, (_, index) => `l${index + 1}`)
);

export const DEPTHS = Object.freeze(["minute", "study", "deep"]);
export const ROLES = Object.freeze(["participant", "teacher", "both"]);
export const THEMES = Object.freeze(["auto", "light", "dark"]);
export const LESSON_STATUSES = Object.freeze([
  "not-started",
  "active",
  "prepared",
  "reflected",
]);

export const JOURNEY_ACTIONS = Object.freeze({
  NAVIGATE: "journey/navigate",
  SET_PROFILE: "journey/set-profile",
  SET_SETTINGS: "journey/set-settings",
  MERGE_LESSON: "journey/merge-lesson",
  SAVE_EPISODE_PROGRESS: "journey/save-episode-progress",
  SET_PANEL: "journey/set-panel",
  RECORD_CAPABILITY: "journey/record-capability",
  ADD_COMMITMENT: "journey/add-commitment",
  UPDATE_COMMITMENT: "journey/update-commitment",
  SAVE_SABBATH_PACK: "journey/save-sabbath-pack",
  REVEAL_CONNECTION: "journey/reveal-connection",
  REPLACE_FROM_IMPORT: "journey/replace-from-import",
  RECONCILE_EXTERNAL: "journey/reconcile-external",
});
