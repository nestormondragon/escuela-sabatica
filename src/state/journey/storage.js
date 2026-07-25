import {
  JOURNEY_BACKUP_KEY,
  JOURNEY_KEY,
  LEGACY_PREFIX,
} from "./constants.js";
import {
  assertValidJourneyState,
  validateJourneyState,
} from "./schema.js";

export const JOURNEY_WRITE_CODES = Object.freeze({
  SERIALIZE_FAILED: "SERIALIZE_FAILED",
  WRITE_FAILED: "WRITE_FAILED",
  READBACK_FAILED: "READBACK_FAILED",
  READBACK_MISSING: "READBACK_MISSING",
  READBACK_MISMATCH: "READBACK_MISMATCH",
  INVALID_READBACK: "INVALID_READBACK",
  CORRUPT_RECORD: "CORRUPT_RECORD",
});

/** Typed persistence failure suitable for recoverable UI. */
export class JourneyWriteError extends Error {
  constructor(code, key, message, cause = null) {
    super(message);
    this.name = "JourneyWriteError";
    this.code = code;
    this.key = key;
    this.cause = cause;
  }
}

/** Minimal localStorage-compatible in-memory adapter for fallback and tests. */
export function createMemoryStorage(initialEntries = {}) {
  const values = new Map(
    Object.entries(initialEntries).map(([key, value]) => [key, String(value)])
  );
  return {
    persistent: false,
    get length() {
      return values.size;
    },
    key(index) {
      return Array.from(values.keys())[index] ?? null;
    },
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
    clear() {
      values.clear();
    },
  };
}

const fallbackStorage = createMemoryStorage();

/**
 * Return browser localStorage when it accepts a verified probe, otherwise a
 * session-only memory adapter. The fallback never claims persistence.
 */
export function createBrowserStorage() {
  if (typeof window === "undefined") return fallbackStorage;
  let local;
  try {
    local = window.localStorage;
  } catch {
    return fallbackStorage;
  }
  if (!local) return fallbackStorage;
  const probe = "__escuela_journey_probe__";
  try {
    local.setItem(probe, probe);
    if (local.getItem(probe) !== probe) throw new Error("probe");
    local.removeItem(probe);
    return local;
  } catch {
    return fallbackStorage;
  }
}

function rawWriteChecked(storage, key, raw) {
  try {
    storage.setItem(key, raw);
  } catch (cause) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.WRITE_FAILED,
      key,
      `Could not write ${key}`,
      cause
    );
  }

  let readback;
  try {
    readback = storage.getItem(key);
  } catch (cause) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.READBACK_FAILED,
      key,
      `Could not read back ${key}`,
      cause
    );
  }
  if (readback === null) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.READBACK_MISSING,
      key,
      `Readback was missing for ${key}`
    );
  }
  if (readback !== raw) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.READBACK_MISMATCH,
      key,
      `Readback did not match the write for ${key}`
    );
  }
}

/** Enumerate exact raw legacy strings without parsing or altering them. */
export function captureLegacyEntries(storage) {
  const entries = {};
  const length = Number(storage.length) || 0;
  for (let index = 0; index < length; index += 1) {
    const key = storage.key(index);
    if (
      !key ||
      !key.startsWith(LEGACY_PREFIX) ||
      key === JOURNEY_KEY ||
      key === JOURNEY_BACKUP_KEY
    )
      continue;
    const raw = storage.getItem(key);
    if (raw !== null) entries[key] = raw;
  }
  return Object.fromEntries(
    Object.entries(entries).sort(([left], [right]) => left.localeCompare(right))
  );
}

/**
 * Ensure the backup envelope contains the immutable pre-migration snapshot.
 * Existing valid snapshots are never replaced on later migrations.
 */
export function ensureLegacyBackup(
  storage,
  { now = new Date().toISOString() } = {}
) {
  const existingRaw = storage.getItem(JOURNEY_BACKUP_KEY);
  if (existingRaw) {
    try {
      const existing = JSON.parse(existingRaw);
      if (existing?.legacySnapshot?.entries) return existing;
    } catch {
      // A corrupt backup must not be silently overwritten.
    }
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.CORRUPT_RECORD,
      JOURNEY_BACKUP_KEY,
      "The journey backup record is corrupt"
    );
  }

  const envelope = {
    schemaVersion: 2,
    quarterId: "2026-Q3",
    legacySnapshot: {
      capturedAt: now,
      entries: captureLegacyEntries(storage),
    },
    lastKnownGood: null,
  };
  rawWriteChecked(storage, JOURNEY_BACKUP_KEY, JSON.stringify(envelope));
  return envelope;
}

function readBackup(storage) {
  const raw = storage.getItem(JOURNEY_BACKUP_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Persist a validated state, keeping the preceding valid primary record as
 * lastKnownGood. Both backup and primary writes use exact readback checks.
 */
export function writeJourneyState(
  storage,
  state,
  { now = new Date().toISOString() } = {}
) {
  assertValidJourneyState(state);
  let raw;
  try {
    raw = JSON.stringify(state);
  } catch (cause) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.SERIALIZE_FAILED,
      JOURNEY_KEY,
      "JourneyState could not be serialized",
      cause
    );
  }

  let backup = readBackup(storage);
  if (!backup?.legacySnapshot?.entries) {
    backup = ensureLegacyBackup(storage, { now });
  }

  const currentRaw = storage.getItem(JOURNEY_KEY);
  if (currentRaw && currentRaw !== raw) {
    try {
      const current = JSON.parse(currentRaw);
      if (validateJourneyState(current).ok) {
        const nextBackup = {
          ...backup,
          lastKnownGood: { capturedAt: now, raw: currentRaw },
        };
        rawWriteChecked(
          storage,
          JOURNEY_BACKUP_KEY,
          JSON.stringify(nextBackup)
        );
      }
    } catch {
      // Preserve the prior backup when the current primary is not trustworthy.
    }
  }

  rawWriteChecked(storage, JOURNEY_KEY, raw);
  let parsed;
  try {
    parsed = JSON.parse(storage.getItem(JOURNEY_KEY));
  } catch (cause) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.INVALID_READBACK,
      JOURNEY_KEY,
      "JourneyState readback was not valid JSON",
      cause
    );
  }
  const validation = validateJourneyState(parsed);
  if (!validation.ok) {
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.INVALID_READBACK,
      JOURNEY_KEY,
      validation.errors.join("; ")
    );
  }
  return parsed;
}

/**
 * Read JourneyState v2. When requested, recover a corrupt primary from the
 * last known good record without touching any v1 key.
 */
export function readJourneyState(storage, { recover = true } = {}) {
  const raw = storage.getItem(JOURNEY_KEY);
  if (!raw) return { state: null, recovered: false };
  try {
    const state = JSON.parse(raw);
    assertValidJourneyState(state);
    return { state, recovered: false };
  } catch (cause) {
    const backup = recover ? readBackup(storage) : null;
    const fallbackRaw = backup?.lastKnownGood?.raw;
    if (fallbackRaw) {
      try {
        const recoveredState = JSON.parse(fallbackRaw);
        assertValidJourneyState(recoveredState);
        rawWriteChecked(storage, JOURNEY_KEY, fallbackRaw);
        return { state: recoveredState, recovered: true };
      } catch {
        // Fall through to the typed corruption error.
      }
    }
    throw new JourneyWriteError(
      JOURNEY_WRITE_CODES.CORRUPT_RECORD,
      JOURNEY_KEY,
      "The journey record is corrupt and no valid recovery exists",
      cause
    );
  }
}

/** Remove only v2 journey records. Legacy kit, settings, and streak remain. */
export function removeJourneyState(storage, { includeBackup = false } = {}) {
  storage.removeItem(JOURNEY_KEY);
  if (includeBackup) storage.removeItem(JOURNEY_BACKUP_KEY);
}
