import assert from "node:assert/strict";
import test from "node:test";
import {
  JOURNEY_BACKUP_KEY,
  JOURNEY_KEY,
} from "../../src/state/journey/constants.js";
import {
  buildJourneyFromLegacy,
  loadOrMigrateJourney,
} from "../../src/state/journey/migration.js";
import {
  PRIVACY,
  consentField,
  privateField,
  publicSourceField,
  serializeShareFields,
  shareableField,
} from "../../src/state/journey/privacy.js";
import {
  compareJourneyFreshness,
  journeyActions,
  journeyReducer,
} from "../../src/state/journey/reducer.js";
import {
  createEmptyJourneyState,
  validateJourneyState,
} from "../../src/state/journey/schema.js";
import {
  JOURNEY_WRITE_CODES,
  JourneyWriteError,
  createMemoryStorage,
  ensureLegacyBackup,
  readJourneyState,
  writeJourneyState,
} from "../../src/state/journey/storage.js";
import {
  exportJourneyArchive,
  exportShareSelection,
  importJourneyArchive,
} from "../../src/state/journey/transfer.js";

const NOW = "2026-07-25T12:00:00.000Z";

function legacyFixture() {
  return {
    "escuela:kit:l1": JSON.stringify({
      v: 1,
      started: true,
      userName: "Néstor",
      kitName: "Una carta viva",
      slots: { claim: "La gracia sostiene", action: null },
      slotTags: { claim: ["theme:grace"] },
      extra: { prayer: "Dame sabiduría" },
      surpriseIdx: 2,
      patternSeen: true,
      completedAt: null,
    }),
    "escuela:settings": JSON.stringify({
      maestro: true,
      haptics: false,
      lessonOverride: "l4",
      mode: "day",
    }),
    "escuela:streak": JSON.stringify({
      v: 1,
      lastVisit: "2026-07-25",
      current: 4,
      longest: 7,
      totalDays: 18,
    }),
    "escuela:future-compatible": "raw value that is not JSON",
    "other:key": "leave me alone",
  };
}

test("migration preserves every v1 key and captures exact raw escuela values", () => {
  const initial = legacyFixture();
  const storage = createMemoryStorage(initial);
  const before = { ...initial };
  const result = loadOrMigrateJourney(storage, {
    now: NOW,
    writerId: "test-writer",
  });

  assert.equal(result.migrated, true);
  assert.equal(result.recovered, false);
  Object.entries(before).forEach(([key, raw]) => {
    assert.equal(storage.getItem(key), raw, `${key} changed during migration`);
  });

  const backup = JSON.parse(storage.getItem(JOURNEY_BACKUP_KEY));
  assert.deepEqual(backup.legacySnapshot.entries, {
    "escuela:future-compatible": before["escuela:future-compatible"],
    "escuela:kit:l1": before["escuela:kit:l1"],
    "escuela:settings": before["escuela:settings"],
    "escuela:streak": before["escuela:streak"],
  });

  const state = result.state;
  assert.equal(state.schemaVersion, 2);
  assert.equal(state.quarterId, "2026-Q3");
  assert.equal(state.profile.displayName.value, "Néstor");
  assert.equal(state.profile.displayName.privacy, PRIVACY.PRIVATE);
  assert.equal(state.profile.role, "teacher");
  assert.equal(state.settings.theme, "light");
  assert.equal(state.settings.haptics, false);
  assert.equal(state.navigation.lessonOverride, "l4");
  assert.equal(state.lessons.l1.status, "active");
  assert.equal(state.lessons.l1.sourceKitImported, true);
  assert.deepEqual(state.lessons.l1.legacyKit.extra, {
    prayer: "Dame sabiduría",
  });
  assert.equal(state.lessons.l1.investments.length, 1);
  assert.equal(state.mosaic.panels.l1.legacyProgress.stage, 2);
  assert.equal(validateJourneyState(state).ok, true);
});

test("migration is idempotent and does not refresh the legacy snapshot", () => {
  const storage = createMemoryStorage(legacyFixture());
  const first = loadOrMigrateJourney(storage, {
    now: NOW,
    writerId: "first",
  });
  const firstPrimary = storage.getItem(JOURNEY_KEY);
  const firstBackup = storage.getItem(JOURNEY_BACKUP_KEY);

  storage.setItem(
    "escuela:kit:l1",
    JSON.stringify({ v: 1, started: false, slots: {} })
  );
  const second = loadOrMigrateJourney(storage, {
    now: "2026-07-26T12:00:00.000Z",
    writerId: "second",
  });

  assert.equal(second.migrated, false);
  assert.deepEqual(second.state, first.state);
  assert.equal(storage.getItem(JOURNEY_KEY), firstPrimary);
  assert.equal(storage.getItem(JOURNEY_BACKUP_KEY), firstBackup);
});

test("buildJourneyFromLegacy is pure with respect to storage", () => {
  const initial = legacyFixture();
  const storage = createMemoryStorage(initial);
  const state = buildJourneyFromLegacy(storage, {
    now: NOW,
    writerId: "pure-test",
  });
  assert.equal(storage.getItem(JOURNEY_KEY), null);
  assert.equal(storage.getItem(JOURNEY_BACKUP_KEY), null);
  assert.equal(state.migration.sourceKeys.length, 3);
});

test("verified writes raise a typed mismatch error", () => {
  const base = createMemoryStorage();
  ensureLegacyBackup(base, { now: NOW });
  const broken = {
    get length() {
      return base.length;
    },
    key: (index) => base.key(index),
    getItem: (key) => base.getItem(key),
    removeItem: (key) => base.removeItem(key),
    setItem(key, value) {
      base.setItem(key, key === JOURNEY_KEY ? `${value}x` : value);
    },
  };

  assert.throws(
    () =>
      writeJourneyState(
        broken,
        createEmptyJourneyState({ now: NOW, writerId: "write-test" }),
        { now: NOW }
      ),
    (error) =>
      error instanceof JourneyWriteError &&
      error.code === JOURNEY_WRITE_CODES.READBACK_MISMATCH &&
      error.key === JOURNEY_KEY
  );
});

test("a corrupt primary recovers from lastKnownGood", () => {
  const storage = createMemoryStorage();
  const initial = createEmptyJourneyState({ now: NOW, writerId: "one" });
  writeJourneyState(storage, initial, { now: NOW });
  const next = journeyReducer(
    initial,
    {
      ...journeyActions.navigate("/mosaico"),
      meta: {
        writerId: "two",
        updatedAt: "2026-07-25T12:01:00.000Z",
      },
    }
  );
  writeJourneyState(storage, next, {
    now: "2026-07-25T12:01:00.000Z",
  });
  storage.setItem(JOURNEY_KEY, "{broken");

  const result = readJourneyState(storage, { recover: true });
  assert.equal(result.recovered, true);
  assert.deepEqual(result.state, initial);
  assert.deepEqual(JSON.parse(storage.getItem(JOURNEY_KEY)), initial);
});

test("unrecoverable corruption remains byte-for-byte untouched", () => {
  const storage = createMemoryStorage({
    [JOURNEY_KEY]: "{unfinished",
  });
  assert.throws(
    () => loadOrMigrateJourney(storage, { now: NOW, writerId: "blocked" }),
    (error) =>
      error instanceof JourneyWriteError &&
      error.code === JOURNEY_WRITE_CODES.CORRUPT_RECORD
  );
  assert.equal(storage.getItem(JOURNEY_KEY), "{unfinished");
  assert.equal(storage.getItem(JOURNEY_BACKUP_KEY), null);
});

test("reducer increments revisions and rejects stale storage events", () => {
  const state = createEmptyJourneyState({ now: NOW, writerId: "alpha" });
  const changed = journeyReducer(state, {
    ...journeyActions.navigate("/leccion/l4", { lessonId: "l4" }),
    meta: {
      writerId: "alpha",
      updatedAt: "2026-07-25T12:01:00.000Z",
    },
  });
  assert.equal(changed.revision, 1);
  assert.equal(changed.navigation.lastLessonId, "l4");

  const stale = {
    ...changed,
    revision: 0,
    updatedAt: "2026-07-25T13:00:00.000Z",
  };
  assert.equal(
    journeyReducer(changed, journeyActions.reconcileExternal(stale)),
    changed
  );

  const fresh = {
    ...changed,
    revision: 2,
    writerId: "beta",
    updatedAt: "2026-07-25T12:02:00.000Z",
  };
  assert.equal(compareJourneyFreshness(fresh, changed) > 0, true);
  assert.equal(
    journeyReducer(changed, journeyActions.reconcileExternal(fresh)),
    fresh
  );
});

test("private fields never enter the selective share payload", () => {
  const fields = {
    title: publicSourceField("Lección 4"),
    insight: shareableField("La gracia sostiene"),
    prayer: privateField("Una oración personal"),
    person: consentField("Ana"),
  };
  const safe = serializeShareFields(fields, {
    selectedPaths: ["insight", "prayer", "person"],
    consentedPaths: [],
  });
  assert.deepEqual(safe, {
    title: "Lección 4",
    insight: "La gracia sostiene",
  });

  const consented = exportShareSelection({
    fields,
    selectedPaths: ["person"],
    consentedPaths: ["person"],
    publicContext: { lessonId: "l4" },
  });
  assert.equal(consented.fields.person, "Ana");
  assert.equal(consented.fields.prayer, undefined);
});

test("private archive export and import round trip a valid state", () => {
  const state = createEmptyJourneyState({ now: NOW, writerId: "archive" });
  const raw = exportJourneyArchive(state, { now: NOW, pretty: false });
  assert.deepEqual(importJourneyArchive(raw), state);
});
