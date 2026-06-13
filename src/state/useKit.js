import { useCallback, useMemo, useRef, useState } from "react";
import { readJSON, writeJSON, remove } from "../lib/storage.js";

/* =================================================================
   useKit — per-lesson artifact state.
   The "kit" is the keepable object the reader builds: a set of named
   slots filled by their own choices, plus free-text "extra" fields
   that feed the final shareable outputs.

   Persisted per lesson under  escuela:kit:<lessonId>
   ================================================================= */

const VERSION = 1;
const keyFor = (lessonId) => `escuela:kit:${lessonId}`;

function freshState(slotIds) {
  const slots = {};
  slotIds.forEach((id) => (slots[id] = null));
  return {
    v: VERSION,
    started: false,
    kitName: "",
    slots,
    extra: {},
    surpriseIdx: 0,
    patternSeen: false,
    completedAt: null,
  };
}

function hydrate(lessonId, slotIds) {
  const base = freshState(slotIds);
  const saved = readJSON(keyFor(lessonId), null);
  if (!saved || saved.v !== VERSION) return base;
  return {
    ...base,
    ...saved,
    slots: { ...base.slots, ...(saved.slots || {}) },
    extra: { ...base.extra, ...(saved.extra || {}) },
  };
}

export function useKit(lessonId, slotIds) {
  const [state, setState] = useState(() => hydrate(lessonId, slotIds));
  const events = useRef([]);

  const commit = useCallback(
    (updater) => {
      setState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        writeJSON(keyFor(lessonId), next);
        return next;
      });
    },
    [lessonId]
  );

  const track = useCallback((name, payload) => {
    try {
      events.current.push({ event: name, ts: Date.now(), payload: payload ?? null });
    } catch {
      /* ignore */
    }
  }, []);

  const fillSlot = useCallback(
    (slotId, value, extraPatch) => {
      let wasFresh = false;
      commit((prev) => {
        wasFresh = !prev.slots[slotId];
        return {
          ...prev,
          slots: { ...prev.slots, [slotId]: value },
          extra: extraPatch ? { ...prev.extra, ...extraPatch } : prev.extra,
        };
      });
      track("slot_filled:" + slotId, value);
      return wasFresh;
    },
    [commit, track]
  );

  const setExtra = useCallback(
    (patch) => commit((prev) => ({ ...prev, extra: { ...prev.extra, ...patch } })),
    [commit]
  );

  const setKitName = useCallback(
    (name) => commit((prev) => ({ ...prev, kitName: name })),
    [commit]
  );

  const start = useCallback(
    () => commit((prev) => ({ ...prev, started: true })),
    [commit]
  );

  const bumpSurprise = useCallback(() => {
    let idx = 0;
    commit((prev) => {
      idx = prev.surpriseIdx || 0;
      return { ...prev, surpriseIdx: idx + 1 };
    });
    return idx;
  }, [commit]);

  const markPatternSeen = useCallback(
    () => commit((prev) => (prev.patternSeen ? prev : { ...prev, patternSeen: true })),
    [commit]
  );

  const markComplete = useCallback(
    () =>
      commit((prev) =>
        prev.completedAt ? prev : { ...prev, completedAt: Date.now() }
      ),
    [commit]
  );

  const reset = useCallback(() => {
    remove(keyFor(lessonId));
    events.current = [];
    setState(freshState(slotIds));
  }, [lessonId, slotIds]);

  const derived = useMemo(() => {
    const filledCount = slotIds.filter((id) => state.slots[id]).length;
    const firstUnfilled = slotIds.find((id) => !state.slots[id]) || null;
    const done = filledCount === slotIds.length;
    return { filledCount, firstUnfilled, done, total: slotIds.length };
  }, [state.slots, slotIds]);

  const isFilled = useCallback((id) => !!state.slots[id], [state.slots]);

  return {
    state,
    ...derived,
    isFilled,
    fillSlot,
    setExtra,
    setKitName,
    start,
    bumpSurprise,
    markPatternSeen,
    markComplete,
    reset,
    track,
    events,
  };
}
