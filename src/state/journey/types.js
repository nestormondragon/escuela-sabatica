/**
 * This module contains the JavaScript persistence contract as JSDoc. It has no
 * runtime behavior and can be imported by editors for type discovery.
 *
 * @typedef {"private"|"shareable-choice"|"public-source"|"requires-consent"} FieldPrivacy
 *
 * @template T
 * @typedef {Object} StoredField
 * @property {T} value
 * @property {FieldPrivacy} privacy
 *
 * @typedef {Object} LegacyKitV1
 * @property {1} v
 * @property {boolean} started
 * @property {string} userName
 * @property {string} kitName
 * @property {Record<string, *>} slots
 * @property {Record<string, string[]>} slotTags
 * @property {Record<string, *>} extra
 * @property {number} surpriseIdx
 * @property {boolean} patternSeen
 * @property {number|null} completedAt
 *
 * @typedef {Object} EpisodeProgress
 * @property {"minute"|"study"|"deep"} selectedDepth
 * @property {string|null} [currentStepId]
 * @property {string[]} completedStepIds
 * @property {string[]} attemptIds
 * @property {string[]} revisionIds
 * @property {string[]} draftIds
 * @property {string} startedAt
 * @property {string} updatedAt
 *
 * @typedef {Object} JourneyLesson
 * @property {"not-started"|"active"|"prepared"|"reflected"} status
 * @property {string[]} completedEpisodeIds
 * @property {Record<string, EpisodeProgress>} episodeProgress
 * @property {Array<Object>} investments
 * @property {string|null} sabbathPackId
 * @property {boolean} sourceKitImported
 * @property {LegacyKitV1|null} legacyKit
 *
 * @typedef {Object} JourneyStateV2
 * @property {2} schemaVersion
 * @property {"2026-Q3"} quarterId
 * @property {number} revision
 * @property {string} writerId
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {Object} migration
 * @property {Object} profile
 * @property {StoredField<string>} profile.displayName
 * @property {"participant"|"teacher"|"both"} profile.role
 * @property {"minute"|"study"|"deep"} profile.preferredDepth
 * @property {Object} navigation
 * @property {Record<string, JourneyLesson>} lessons
 * @property {Object} mosaic
 * @property {Record<string, Object>} capabilities
 * @property {Array<Object>} commitments
 * @property {Record<string, Object>} sabbathPacks
 * @property {Object} settings
 * @property {Object} legacy
 *
 * @typedef {Object} JourneyAction
 * @property {string} type
 * @property {Object} [payload]
 * @property {{writerId?: string, updatedAt?: string}} [meta]
 */

export {};
