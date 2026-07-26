import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const EMPTY_PREVIEW = Object.freeze({
  lessonId: null,
  pieceIndex: null,
  verb: "idle",
  progress: 0,
  phase: "idle",
});

const ArtifactProgressContext = createContext(null);

export function ArtifactProgressProvider({ children }) {
  const [preview, setPreview] = useState(EMPTY_PREVIEW);
  const [depth, setDepth] = useState("study");

  const begin = useCallback((next) => {
    setPreview({
      ...EMPTY_PREVIEW,
      ...next,
      progress: 0,
      phase: "active",
    });
  }, []);

  const update = useCallback((progress) => {
    setPreview((current) => ({
      ...current,
      progress: Math.max(0, Math.min(1, Number(progress) || 0)),
    }));
  }, []);

  const settle = useCallback(() => {
    setPreview((current) => ({ ...current, progress: 1, phase: "settling" }));
  }, []);

  const clear = useCallback(() => setPreview(EMPTY_PREVIEW), []);

  const value = useMemo(
    () => ({
      preview,
      depth,
      setDepth,
      begin,
      update,
      settle,
      clear,
    }),
    [begin, clear, depth, preview, settle, update]
  );

  return (
    <ArtifactProgressContext.Provider value={value}>
      {children}
    </ArtifactProgressContext.Provider>
  );
}

export function useArtifactProgress() {
  const value = useContext(ArtifactProgressContext);
  if (!value) {
    throw new Error(
      "useArtifactProgress must be used inside ArtifactProgressProvider"
    );
  }
  return value;
}
