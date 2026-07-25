import {
  JOURNEY_QUARTER_ID,
  JOURNEY_SCHEMA_VERSION,
} from "./constants.js";
import { serializeShareFields } from "./privacy.js";
import { assertValidJourneyState } from "./schema.js";

export const JOURNEY_EXPORT_FORMAT = "escuela-journey-private-backup";

/**
 * Serialize a full private backup for an explicit device export. This is not
 * a sharing serializer and intentionally retains every StoredField.
 */
export function exportJourneyArchive(
  state,
  { now = new Date().toISOString(), pretty = true } = {}
) {
  assertValidJourneyState(state);
  return JSON.stringify(
    {
      format: JOURNEY_EXPORT_FORMAT,
      schemaVersion: JOURNEY_SCHEMA_VERSION,
      quarterId: JOURNEY_QUARTER_ID,
      exportedAt: now,
      state,
    },
    null,
    pretty ? 2 : 0
  );
}

/**
 * Parse and validate a private backup without persisting it. Callers should
 * show a preview and require confirmation before dispatching the result.
 */
export function importJourneyArchive(input) {
  const archive = typeof input === "string" ? JSON.parse(input) : input;
  if (
    !archive ||
    archive.format !== JOURNEY_EXPORT_FORMAT ||
    archive.schemaVersion !== JOURNEY_SCHEMA_VERSION ||
    archive.quarterId !== JOURNEY_QUARTER_ID
  ) {
    throw new TypeError("Unsupported journey archive");
  }
  return assertValidJourneyState(archive.state);
}

/**
 * Build a selective sharing payload from an explicit map of StoredFields.
 * Private values are excluded even when their paths appear in the selection.
 */
export function exportShareSelection({
  fields,
  selectedPaths = [],
  consentedPaths = [],
  publicContext = {},
}) {
  return {
    quarterId: JOURNEY_QUARTER_ID,
    context: { ...publicContext },
    fields: serializeShareFields(fields, {
      selectedPaths,
      consentedPaths,
    }),
  };
}
