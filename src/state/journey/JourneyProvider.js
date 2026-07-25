import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { JOURNEY_KEY } from "./constants.js";
import { loadOrMigrateJourney } from "./migration.js";
import {
  compareJourneyFreshness,
  journeyActions,
  journeyReducer,
} from "./reducer.js";
import {
  assertValidJourneyState,
  createEmptyJourneyState,
} from "./schema.js";
import {
  createBrowserStorage,
  removeJourneyState,
  writeJourneyState,
} from "./storage.js";
import {
  exportJourneyArchive,
  importJourneyArchive,
} from "./transfer.js";

const JourneyContext = createContext(null);
const systemClock = () => new Date();

function toISO(value) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}

function makeWriterId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `journey-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function storageIsPersistent(storage) {
  if (storage?.persistent === false) return false;
  if (storage?.persistent === true) return true;
  if (typeof window === "undefined") return false;
  try {
    return Boolean(window.localStorage) && storage === window.localStorage;
  } catch {
    return false;
  }
}

function getWindowStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Owns the one durable JourneyState v2 reducer and cross-tab reconciliation.
 * `storage` and `clock` are injectable for deterministic tests.
 */
export function JourneyProvider({
  children,
  storage: storageProp,
  clock = systemClock,
  writerId: writerIdProp,
}) {
  const storage = useMemo(
    () => storageProp || createBrowserStorage(),
    [storageProp]
  );
  const [writerId] = useState(() => writerIdProp || makeWriterId());
  const [boot] = useState(() => {
    const now = toISO(clock());
    try {
      return {
        ...loadOrMigrateJourney(storage, { now, writerId }),
        error: null,
      };
    } catch (error) {
      return {
        state: createEmptyJourneyState({ now, writerId }),
        migrated: false,
        recovered: false,
        error,
      };
    }
  });
  const [state, baseDispatch] = useReducer(journeyReducer, boot.state);
  const [storageError, setStorageError] = useState(boot.error);
  const lastPersisted = useRef(
    boot.error ? null : JSON.stringify(boot.state)
  );
  const stateRef = useRef(state);
  stateRef.current = state;
  const writesBlocked = useRef(Boolean(boot.error));

  const dispatch = useCallback(
    (action) => {
      baseDispatch({
        ...action,
        meta: {
          ...(action.meta || {}),
          writerId,
          updatedAt: toISO(clock()),
        },
      });
    },
    [clock, writerId]
  );

  useEffect(() => {
    const raw = JSON.stringify(state);
    // A corrupt or failed migration remains untouched until an explicit
    // recovery action. Rendering a fresh fallback must never overwrite it.
    if (writesBlocked.current) return;
    if (raw === lastPersisted.current) return;
    try {
      const saved = writeJourneyState(storage, state, {
        now: toISO(clock()),
      });
      lastPersisted.current = JSON.stringify(saved);
      setStorageError(null);
    } catch (error) {
      setStorageError(error);
    }
  }, [clock, state, storage]);

  useEffect(() => {
    const local = getWindowStorage();
    if (!local || storage !== local) return undefined;
    const reconcile = (event) => {
      if (event.key !== JOURNEY_KEY || !event.newValue) return;
      try {
        const incoming = JSON.parse(event.newValue);
        assertValidJourneyState(incoming);
        const comparison = compareJourneyFreshness(
          incoming,
          stateRef.current
        );
        if (comparison > 0) {
          writesBlocked.current = false;
          lastPersisted.current = event.newValue;
          baseDispatch(journeyActions.reconcileExternal(incoming));
        } else if (comparison < 0) {
          const saved = writeJourneyState(storage, stateRef.current, {
            now: toISO(clock()),
          });
          lastPersisted.current = JSON.stringify(saved);
          setStorageError(null);
        }
      } catch (error) {
        setStorageError(error);
      }
    };
    window.addEventListener("storage", reconcile);
    return () => window.removeEventListener("storage", reconcile);
  }, [clock, storage]);

  const exportArchive = useCallback(
    (options) => exportJourneyArchive(state, options),
    [state]
  );

  const importArchive = useCallback(
    (raw) => {
      const imported = importJourneyArchive(raw);
      writesBlocked.current = false;
      dispatch(journeyActions.replaceFromImport(imported));
      return imported;
    },
    [dispatch]
  );

  const removeJourney = useCallback(
    ({ includeBackup = false } = {}) => {
      removeJourneyState(storage, { includeBackup });
      writesBlocked.current = false;
      lastPersisted.current = null;
      baseDispatch(
        journeyActions.replaceFromImport(
          createEmptyJourneyState({
            now: toISO(clock()),
            writerId,
          })
        )
      );
    },
    [clock, storage, writerId]
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
      persistent: storageIsPersistent(storage),
      migrated: boot.migrated,
      recovered: boot.recovered,
      storageError,
      clearStorageError: () => setStorageError(null),
      exportArchive,
      importArchive,
      removeJourney,
    }),
    [
      boot.migrated,
      boot.recovered,
      dispatch,
      exportArchive,
      importArchive,
      removeJourney,
      state,
      storage,
      storageError,
    ]
  );

  return createElement(JourneyContext.Provider, { value }, children);
}

/** Read JourneyState and durable actions from the nearest provider. */
export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney must be used inside JourneyProvider");
  }
  return context;
}
