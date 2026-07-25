/**
 * Field-level privacy vocabulary. These labels describe export behavior, not
 * encryption. Values remain readable to code running on the same origin.
 */
export const PRIVACY = Object.freeze({
  PRIVATE: "private",
  SHAREABLE_CHOICE: "shareable-choice",
  PUBLIC_SOURCE: "public-source",
  REQUIRES_CONSENT: "requires-consent",
});

const LEVELS = new Set(Object.values(PRIVACY));

/** Wrap a stored value with its privacy policy. */
export function storedField(value, privacy = PRIVACY.PRIVATE) {
  if (!LEVELS.has(privacy)) {
    throw new TypeError(`Unsupported privacy level: ${String(privacy)}`);
  }
  return { value, privacy };
}

export const privateField = (value) => storedField(value, PRIVACY.PRIVATE);
export const shareableField = (value) =>
  storedField(value, PRIVACY.SHAREABLE_CHOICE);
export const publicSourceField = (value) =>
  storedField(value, PRIVACY.PUBLIC_SOURCE);
export const consentField = (value) =>
  storedField(value, PRIVACY.REQUIRES_CONSENT);

/** True when a value follows the StoredField persistence contract. */
export function isStoredField(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      Object.prototype.hasOwnProperty.call(value, "value") &&
      LEVELS.has(value.privacy)
  );
}

/** Read a wrapped value without weakening its stored privacy metadata. */
export function unwrapField(field, fallback = null) {
  return isStoredField(field) ? field.value : fallback;
}

/**
 * Return a share-safe object from an allowlisted collection of stored fields.
 *
 * Public source fields are included automatically. Shareable fields require
 * their path in `selectedPaths`. Consent fields additionally require their
 * path in `consentedPaths`. Private fields never leave through this helper.
 */
export function serializeShareFields(
  fields,
  { selectedPaths = [], consentedPaths = [] } = {}
) {
  const selected = new Set(selectedPaths);
  const consented = new Set(consentedPaths);
  const output = {};

  Object.entries(fields || {}).forEach(([path, field]) => {
    if (!isStoredField(field)) return;
    if (field.privacy === PRIVACY.PUBLIC_SOURCE) {
      output[path] = field.value;
      return;
    }
    if (
      field.privacy === PRIVACY.SHAREABLE_CHOICE &&
      selected.has(path)
    ) {
      output[path] = field.value;
      return;
    }
    if (
      field.privacy === PRIVACY.REQUIRES_CONSENT &&
      selected.has(path) &&
      consented.has(path)
    ) {
      output[path] = field.value;
    }
  });

  return output;
}

/** Honest storage disclosure for settings and export surfaces. */
export const LOCAL_STORAGE_NOTICE =
  "Guardado en este navegador. Otra persona que use este perfil del navegador podría verlo.";
