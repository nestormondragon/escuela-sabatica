import {
  JOURNEY_LESSON_IDS,
  JOURNEY_QUARTER_ID,
  JOURNEY_SCHEMA_VERSION,
} from "./constants.js";
import { privateField, shareableField } from "./privacy.js";
import { createEmptyJourneyState } from "./schema.js";
import {
  ensureLegacyBackup,
  readJourneyState,
  writeJourneyState,
} from "./storage.js";

const kitKey = (lessonId) => `escuela:kit:${lessonId}`;

function parseRaw(storage, key) {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function copy(value, fallback) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return fallback;
  }
}

function mapKit(lessonId, kit) {
  if (!kit || kit.v !== 1) return null;
  const slots = copy(kit.slots || {}, {});
  const slotTags = copy(kit.slotTags || {}, {});
  const extra = copy(kit.extra || {}, {});
  const filledEntries = Object.entries(slots).filter(([, value]) =>
    Boolean(value)
  );
  const totalSlots = Object.keys(slots).length;
  const filledCount = filledEntries.length;
  const done = totalSlots > 0 && filledCount === totalSlots;

  return {
    lesson: {
      status: kit.completedAt || done
        ? "prepared"
        : kit.started || filledCount > 0
          ? "active"
          : "not-started",
      completedEpisodeIds: [],
      episodeProgress: {},
      investments: filledEntries.map(([slotId, value]) => ({
        id: `legacy:${lessonId}:${slotId}`,
        kind: "legacy-slot",
        slotId,
        value: privateField(copy(value, value)),
        tags: copy(slotTags[slotId] || [], []),
      })),
      sabbathPackId: null,
      sourceKitImported: true,
      legacyKit: {
        v: 1,
        started: Boolean(kit.started),
        userName: kit.userName || "",
        kitName: kit.kitName || "",
        slots,
        slotTags,
        extra,
        surpriseIdx: Number.isFinite(kit.surpriseIdx)
          ? kit.surpriseIdx
          : 0,
        patternSeen: Boolean(kit.patternSeen),
        completedAt: kit.completedAt ?? null,
      },
    },
    panel: {
      state: kit.completedAt || done
        ? "prepared"
        : kit.started || filledCount > 0
          ? "in-progress"
          : "unstarted",
      inscription: kit.kitName
        ? shareableField(kit.kitName)
        : null,
      evidenceIds: filledEntries.map(
        ([slotId]) => `legacy:${lessonId}:${slotId}`
      ),
      connectionIds: [],
      legacyProgress: {
        filledCount,
        totalSlots,
        stage: totalSlots
          ? Math.min(4, Math.round((filledCount / totalSlots) * 4))
          : 0,
      },
    },
    userName: kit.userName || "",
  };
}

/**
 * Convert current v1 records into one additive quarter record.
 *
 * V1 keys remain the legacy write authority until a caller explicitly cuts a
 * lesson over. This function only reads them and records an exact raw backup.
 */
export function buildJourneyFromLegacy(
  storage,
  { now = new Date().toISOString(), writerId = "migration" } = {}
) {
  const state = createEmptyJourneyState({ now, writerId });
  const sourceKeys = [];
  let firstName = "";

  JOURNEY_LESSON_IDS.forEach((lessonId) => {
    const key = kitKey(lessonId);
    const kit = parseRaw(storage, key);
    if (storage.getItem(key) !== null) sourceKeys.push(key);
    const mapped = mapKit(lessonId, kit);
    if (!mapped) return;
    state.lessons[lessonId] = mapped.lesson;
    state.mosaic.panels[lessonId] = mapped.panel;
    if (!firstName && mapped.userName.trim()) firstName = mapped.userName.trim();
  });

  const settingsKey = "escuela:settings";
  const settings = parseRaw(storage, settingsKey);
  if (storage.getItem(settingsKey) !== null) sourceKeys.push(settingsKey);
  if (settings && typeof settings === "object") {
    state.profile.role = settings.maestro ? "teacher" : "participant";
    state.settings.theme =
      settings.mode === "day"
        ? "light"
        : settings.mode === "night"
          ? "dark"
          : "auto";
    state.settings.haptics =
      typeof settings.haptics === "boolean" ? settings.haptics : true;
    state.navigation.lessonOverride = settings.lessonOverride ?? null;
    state.navigation.lastLessonId = settings.lessonOverride ?? null;
    state.legacy.settings = copy(settings, null);
  }

  const streakKey = "escuela:streak";
  const streak = parseRaw(storage, streakKey);
  if (storage.getItem(streakKey) !== null) sourceKeys.push(streakKey);
  if (streak && typeof streak === "object") {
    state.legacy.streak = copy(streak, null);
  }

  state.profile.displayName = privateField(firstName);
  state.migration = {
    sourceVersion: 1,
    completedAt: now,
    sourceKeys: sourceKeys.sort(),
  };
  return state;
}

/**
 * Load the existing v2 state or perform one verified migration. Repeated
 * calls return the same stored state and never re-import or mutate v1 data.
 */
export function loadOrMigrateJourney(
  storage,
  { now = new Date().toISOString(), writerId = "migration" } = {}
) {
  const existing = readJourneyState(storage, { recover: true });
  if (existing.state) {
    return {
      state: existing.state,
      migrated: false,
      recovered: existing.recovered,
    };
  }

  ensureLegacyBackup(storage, { now });
  const state = buildJourneyFromLegacy(storage, { now, writerId });
  const persisted = writeJourneyState(storage, state, { now });
  return { state: persisted, migrated: true, recovered: false };
}

/** Narrow guard useful to importers and diagnostics. */
export function isJourneyV2(value) {
  return (
    value?.schemaVersion === JOURNEY_SCHEMA_VERSION &&
    value?.quarterId === JOURNEY_QUARTER_ID
  );
}
