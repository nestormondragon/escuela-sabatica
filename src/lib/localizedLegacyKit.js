/*
 * Persist authored choices by a structural reference as well as by their
 * visible label. The legacy slot value remains intact for backwards
 * compatibility, while the reference lets another locale resolve the same
 * authored option without translating user-written text.
 */

const SLOT_REF_PREFIX = "__i18nChoice:";
const EXTRA_REF_PREFIX = "__i18nExtra:";

function findStringPath(value, target, path = []) {
  if (typeof value === "string") return value === target ? path : null;
  if (!value || typeof value !== "object") return null;

  const entries = Array.isArray(value)
    ? value.map((item, index) => [index, item])
    : Object.entries(value);

  for (const [key, item] of entries) {
    const found = findStringPath(item, target, [...path, key]);
    if (found) return found;
  }
  return null;
}

function valueAtPath(value, path) {
  if (!Array.isArray(path)) return null;
  let cursor = value;
  for (const key of path) {
    if (!cursor || typeof cursor !== "object") return null;
    cursor = cursor[key];
  }
  return typeof cursor === "string" ? cursor : null;
}

export function attachChoiceReferences(module, slotId, value, extraPatch) {
  const patch = extraPatch ? { ...extraPatch } : {};
  if (!module || !slotId) return Object.keys(patch).length ? patch : null;

  const slotPath = findStringPath(module, value);
  if (slotPath) patch[`${SLOT_REF_PREFIX}${slotId}`] = slotPath;

  Object.entries(extraPatch || {}).forEach(([key, extraValue]) => {
    if (typeof extraValue !== "string") return;
    const extraPath = findStringPath(module, extraValue);
    if (extraPath) {
      patch[`${EXTRA_REF_PREFIX}${slotId}:${key}`] = extraPath;
    }
  });

  return Object.keys(patch).length ? patch : null;
}

export function localizeLegacyKit(lesson, legacyKit) {
  if (!legacyKit || !lesson) return legacyKit;
  const slots = { ...(legacyKit.slots || {}) };
  const extra = { ...(legacyKit.extra || {}) };

  (lesson.stations || []).forEach((station) => {
    const slotId = station.slot;
    if (!slotId || !station.module) return;

    const slotPath = extra[`${SLOT_REF_PREFIX}${slotId}`];
    const localizedSlot = valueAtPath(station.module, slotPath);
    if (localizedSlot) slots[slotId] = localizedSlot;

    Object.keys(extra).forEach((key) => {
      const marker = `${EXTRA_REF_PREFIX}${slotId}:`;
      if (!key.startsWith(marker)) return;
      const extraKey = key.slice(marker.length);
      const localizedExtra = valueAtPath(station.module, extra[key]);
      if (localizedExtra) extra[extraKey] = localizedExtra;
    });
  });

  return { ...legacyKit, slots, extra };
}
