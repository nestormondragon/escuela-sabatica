import { JOURNEY_ACTIONS, JOURNEY_LESSON_IDS } from "./constants.js";
import { isStoredField, privateField } from "./privacy.js";

const unique = (values) => Array.from(new Set(values));

function stamp(state, next, meta = {}) {
  return {
    ...next,
    schemaVersion: state.schemaVersion,
    quarterId: state.quarterId,
    createdAt: state.createdAt,
    revision: state.revision + 1,
    writerId: meta.writerId || state.writerId,
    updatedAt: meta.updatedAt || new Date().toISOString(),
  };
}

/** Compare revision clocks, then timestamps, then writer ids. */
export function compareJourneyFreshness(left, right) {
  if (left.revision !== right.revision) return left.revision - right.revision;
  const time = Date.parse(left.updatedAt) - Date.parse(right.updatedAt);
  if (time !== 0 && !Number.isNaN(time)) return time;
  return String(left.writerId).localeCompare(String(right.writerId));
}

/** Pure reducer for all durable JourneyState mutations. */
export function journeyReducer(state, action) {
  const payload = action?.payload || {};
  switch (action?.type) {
    case JOURNEY_ACTIONS.NAVIGATE:
      return stamp(
        state,
        {
          ...state,
          navigation: {
            ...state.navigation,
            lastRoute: payload.route || state.navigation.lastRoute,
            lastLessonId:
              payload.lessonId === undefined
                ? state.navigation.lastLessonId
                : payload.lessonId,
            lastEpisodeId:
              payload.episodeId === undefined
                ? state.navigation.lastEpisodeId
                : payload.episodeId,
          },
        },
        action.meta
      );

    case JOURNEY_ACTIONS.SET_PROFILE: {
      const patch = { ...payload.patch };
      if (
        Object.prototype.hasOwnProperty.call(patch, "displayName") &&
        !isStoredField(patch.displayName)
      ) {
        patch.displayName = privateField(patch.displayName ?? "");
      }
      return stamp(
        state,
        { ...state, profile: { ...state.profile, ...patch } },
        action.meta
      );
    }

    case JOURNEY_ACTIONS.SET_SETTINGS:
      return stamp(
        state,
        { ...state, settings: { ...state.settings, ...payload.patch } },
        action.meta
      );

    case JOURNEY_ACTIONS.MERGE_LESSON: {
      if (!JOURNEY_LESSON_IDS.includes(payload.lessonId)) return state;
      return stamp(
        state,
        {
          ...state,
          lessons: {
            ...state.lessons,
            [payload.lessonId]: {
              ...state.lessons[payload.lessonId],
              ...payload.patch,
            },
          },
        },
        action.meta
      );
    }

    case JOURNEY_ACTIONS.SAVE_EPISODE_PROGRESS: {
      const lesson = state.lessons[payload.lessonId];
      if (!lesson || !payload.episodeId) return state;
      const previous = lesson.episodeProgress[payload.episodeId] || {};
      return stamp(
        state,
        {
          ...state,
          lessons: {
            ...state.lessons,
            [payload.lessonId]: {
              ...lesson,
              status: lesson.status === "not-started" ? "active" : lesson.status,
              episodeProgress: {
                ...lesson.episodeProgress,
                [payload.episodeId]: { ...previous, ...payload.progress },
              },
            },
          },
        },
        action.meta
      );
    }

    case JOURNEY_ACTIONS.SET_PANEL: {
      const panel = state.mosaic.panels[payload.lessonId];
      if (!panel) return state;
      return stamp(
        state,
        {
          ...state,
          mosaic: {
            ...state.mosaic,
            panels: {
              ...state.mosaic.panels,
              [payload.lessonId]: { ...panel, ...payload.patch },
            },
          },
        },
        action.meta
      );
    }

    case JOURNEY_ACTIONS.RECORD_CAPABILITY: {
      if (!payload.capabilityId || !payload.evidence) return state;
      const previous = state.capabilities[payload.capabilityId] || {
        evidence: [],
        lastPracticedAt: null,
      };
      const existingIds = new Set(previous.evidence.map((item) => item.id));
      const evidence = existingIds.has(payload.evidence.id)
        ? previous.evidence
        : [...previous.evidence, payload.evidence];
      return stamp(
        state,
        {
          ...state,
          capabilities: {
            ...state.capabilities,
            [payload.capabilityId]: {
              evidence,
              lastPracticedAt:
                payload.evidence.createdAt || action.meta?.updatedAt,
            },
          },
        },
        action.meta
      );
    }

    case JOURNEY_ACTIONS.ADD_COMMITMENT:
      if (!payload.commitment?.id) return state;
      if (state.commitments.some((item) => item.id === payload.commitment.id))
        return state;
      return stamp(
        state,
        { ...state, commitments: [...state.commitments, payload.commitment] },
        action.meta
      );

    case JOURNEY_ACTIONS.UPDATE_COMMITMENT: {
      const index = state.commitments.findIndex(
        (item) => item.id === payload.id
      );
      if (index < 0) return state;
      const commitments = state.commitments.slice();
      commitments[index] = { ...commitments[index], ...payload.patch };
      return stamp(state, { ...state, commitments }, action.meta);
    }

    case JOURNEY_ACTIONS.SAVE_SABBATH_PACK:
      if (!payload.lessonId) return state;
      return stamp(
        state,
        {
          ...state,
          sabbathPacks: {
            ...state.sabbathPacks,
            [payload.lessonId]: payload.pack,
          },
          lessons: state.lessons[payload.lessonId]
            ? {
                ...state.lessons,
                [payload.lessonId]: {
                  ...state.lessons[payload.lessonId],
                  sabbathPackId: payload.lessonId,
                },
              }
            : state.lessons,
        },
        action.meta
      );

    case JOURNEY_ACTIONS.REVEAL_CONNECTION:
      if (!payload.connectionId) return state;
      return stamp(
        state,
        {
          ...state,
          mosaic: {
            ...state.mosaic,
            revealedConnectionIds: unique([
              ...state.mosaic.revealedConnectionIds,
              payload.connectionId,
            ]),
          },
        },
        action.meta
      );

    case JOURNEY_ACTIONS.REPLACE_FROM_IMPORT:
      return stamp(
        state,
        {
          ...payload.state,
          revision: state.revision,
          createdAt: state.createdAt,
        },
        action.meta
      );

    case JOURNEY_ACTIONS.RECONCILE_EXTERNAL:
      return payload.state &&
        compareJourneyFreshness(payload.state, state) > 0
        ? payload.state
        : state;

    default:
      return state;
  }
}

/** Action creators keep route and UI modules independent of reducer strings. */
export const journeyActions = Object.freeze({
  navigate: (route, { lessonId, episodeId } = {}) => ({
    type: JOURNEY_ACTIONS.NAVIGATE,
    payload: { route, lessonId, episodeId },
  }),
  setProfile: (patch) => ({
    type: JOURNEY_ACTIONS.SET_PROFILE,
    payload: { patch },
  }),
  setSettings: (patch) => ({
    type: JOURNEY_ACTIONS.SET_SETTINGS,
    payload: { patch },
  }),
  mergeLesson: (lessonId, patch) => ({
    type: JOURNEY_ACTIONS.MERGE_LESSON,
    payload: { lessonId, patch },
  }),
  saveEpisodeProgress: (lessonId, episodeId, progress) => ({
    type: JOURNEY_ACTIONS.SAVE_EPISODE_PROGRESS,
    payload: { lessonId, episodeId, progress },
  }),
  setPanel: (lessonId, patch) => ({
    type: JOURNEY_ACTIONS.SET_PANEL,
    payload: { lessonId, patch },
  }),
  recordCapability: (capabilityId, evidence) => ({
    type: JOURNEY_ACTIONS.RECORD_CAPABILITY,
    payload: { capabilityId, evidence },
  }),
  addCommitment: (commitment) => ({
    type: JOURNEY_ACTIONS.ADD_COMMITMENT,
    payload: { commitment },
  }),
  updateCommitment: (id, patch) => ({
    type: JOURNEY_ACTIONS.UPDATE_COMMITMENT,
    payload: { id, patch },
  }),
  saveSabbathPack: (lessonId, pack) => ({
    type: JOURNEY_ACTIONS.SAVE_SABBATH_PACK,
    payload: { lessonId, pack },
  }),
  revealConnection: (connectionId) => ({
    type: JOURNEY_ACTIONS.REVEAL_CONNECTION,
    payload: { connectionId },
  }),
  replaceFromImport: (state) => ({
    type: JOURNEY_ACTIONS.REPLACE_FROM_IMPORT,
    payload: { state },
  }),
  reconcileExternal: (state) => ({
    type: JOURNEY_ACTIONS.RECONCILE_EXTERNAL,
    payload: { state },
  }),
});
