import { useCallback, useMemo } from "react";
import {
  journeyActions,
  useJourney,
} from "./journey/index.js";

function emptyLegacyKit(lesson) {
  return {
    v: 1,
    started: false,
    userName: "",
    kitName: lesson.kitName || "",
    slots: Object.fromEntries(lesson.slots.map((slot) => [slot.id, null])),
    slotTags: {},
    extra: {},
    surpriseIdx: 0,
    patternSeen: false,
    completedAt: null,
  };
}
export function useJourneyKit(lesson) {
  const { state, dispatch } = useJourney();
  const lessonRecord = state.lessons[lesson.id];
  const legacyKit = useMemo(
    () => lessonRecord?.legacyKit || emptyLegacyKit(lesson),
    [lesson, lessonRecord?.legacyKit]
  );
  const slotIds = useMemo(
    () => lesson.slots.map((slot) => slot.id),
    [lesson.slots]
  );

  const commitLegacy = useCallback(
    (next, lessonPatch = {}) => {
      dispatch(
        journeyActions.mergeLesson(lesson.id, {
          ...lessonPatch,
          legacyKit: next,
          sourceKitImported: true,
        })
      );
    },
    [dispatch, lesson.id]
  );

  const fillSlot = useCallback(
    (slotId, value, extraPatch, tags) => {
      const fresh = !legacyKit.slots[slotId];
      const slots = { ...legacyKit.slots, [slotId]: value };
      const filledCount = slotIds.filter((id) => Boolean(slots[id])).length;
      const done = filledCount === slotIds.length;
      const now = new Date().toISOString();
      const next = {
        ...legacyKit,
        started: true,
        slots,
        slotTags:
          tags === undefined
            ? legacyKit.slotTags
            : { ...legacyKit.slotTags, [slotId]: tags || [] },
        extra: extraPatch
          ? { ...legacyKit.extra, ...extraPatch }
          : legacyKit.extra,
        completedAt: done
          ? legacyKit.completedAt || Date.now()
          : legacyKit.completedAt,
      };
      const investmentId = `journey:${lesson.id}:${slotId}`;
      const previousInvestments = lessonRecord?.investments || [];
      const investment = {
        id: investmentId,
        kind: "episode-investment",
        slotId,
        value: {
          value,
          privacy: "private",
          updatedAt: now,
        },
        tags: tags || [],
        updatedAt: now,
      };
      const investments = [
        ...previousInvestments.filter((item) => item.id !== investmentId),
        investment,
      ];
      commitLegacy(next, {
        status: done ? "prepared" : "active",
        investments,
      });
      dispatch(
        journeyActions.saveEpisodeProgress(lesson.id, slotId, {
          status: "complete",
          committedAt: now,
          value,
        })
      );
      dispatch(
        journeyActions.setPanel(lesson.id, {
          state: done ? "prepared" : "in-progress",
          inscription: {
            value: String(value),
            privacy: "private",
            updatedAt: now,
          },
          legacyProgress: {
            filledCount,
            totalSlots: slotIds.length,
            stage: Math.min(4, Math.round((filledCount / slotIds.length) * 4)),
          },
        })
      );
      return fresh;
    },
    [
      commitLegacy,
      dispatch,
      legacyKit,
      lesson.id,
      lessonRecord?.investments,
      slotIds,
    ]
  );

  const setExtra = useCallback(
    (patch) => commitLegacy({ ...legacyKit, extra: { ...legacyKit.extra, ...patch } }),
    [commitLegacy, legacyKit]
  );

  const setKitName = useCallback(
    (kitName) => commitLegacy({ ...legacyKit, kitName }),
    [commitLegacy, legacyKit]
  );

  const setUserName = useCallback(
    (userName) => {
      commitLegacy({ ...legacyKit, userName });
      dispatch(
        journeyActions.setProfile({
          displayName: {
            value: userName,
            privacy: "private",
            updatedAt: new Date().toISOString(),
          },
        })
      );
    },
    [commitLegacy, dispatch, legacyKit]
  );

  const start = useCallback(
    () =>
      commitLegacy(
        { ...legacyKit, started: true },
        { status: lessonRecord?.status === "prepared" ? "prepared" : "active" }
      ),
    [commitLegacy, legacyKit, lessonRecord?.status]
  );

  const bumpSurprise = useCallback(() => {
    const index = legacyKit.surpriseIdx || 0;
    commitLegacy({ ...legacyKit, surpriseIdx: index + 1 });
    return index;
  }, [commitLegacy, legacyKit]);

  const markPatternSeen = useCallback(
    () => {
      if (!legacyKit.patternSeen) {
        commitLegacy({ ...legacyKit, patternSeen: true });
      }
    },
    [commitLegacy, legacyKit]
  );

  const markComplete = useCallback(
    () => {
      if (legacyKit.completedAt) return;
      commitLegacy(
        { ...legacyKit, completedAt: Date.now(), started: true },
        { status: "prepared" }
      );
      dispatch(
        journeyActions.setPanel(lesson.id, {
          state: "prepared",
        })
      );
    },
    [commitLegacy, dispatch, legacyKit, lesson.id]
  );

  const reset = useCallback(() => {
    const next = emptyLegacyKit(lesson);
    commitLegacy(next, {
      status: "not-started",
      completedEpisodeIds: [],
      episodeProgress: {},
      investments: [],
      sabbathPackId: null,
    });
    dispatch(
      journeyActions.setPanel(lesson.id, {
        state: "unstarted",
        inscription: null,
        evidenceIds: [],
        connectionIds: [],
        legacyProgress: {
          filledCount: 0,
          totalSlots: slotIds.length,
          stage: 0,
        },
      })
    );
  }, [commitLegacy, dispatch, lesson, slotIds.length]);

  const derived = useMemo(() => {
    const filledCount = slotIds.filter((id) => Boolean(legacyKit.slots[id])).length;
    return {
      filledCount,
      firstUnfilled: slotIds.find((id) => !legacyKit.slots[id]) || null,
      done: filledCount === slotIds.length,
      total: slotIds.length,
    };
  }, [legacyKit.slots, slotIds]);

  return {
    state: legacyKit,
    ...derived,
    isFilled: (id) => Boolean(legacyKit.slots[id]),
    fillSlot,
    setExtra,
    setKitName,
    setUserName,
    start,
    bumpSurprise,
    markPatternSeen,
    markComplete,
    reset,
  };
}
