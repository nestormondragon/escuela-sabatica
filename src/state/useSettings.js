import { useCallback, useEffect, useState } from "react";
import { readJSON, writeJSON } from "../lib/storage.js";
import { setHaptics } from "../lib/haptics.js";

/* =================================================================
   useSettings — global, cross-lesson preferences.
   - maestro:   "Modo maestro" facilitator guide on/off
   - haptics:   tactile feedback on/off
   - lessonOverride: manually-chosen lesson id (else auto by date)
   ================================================================= */

const KEY = "escuela:settings";
const DEFAULTS = { maestro: false, haptics: true, lessonOverride: null, mode: "night" };

export function useSettings() {
  const [settings, setSettings] = useState(() => ({
    ...DEFAULTS,
    ...readJSON(KEY, {}),
  }));

  useEffect(() => {
    setHaptics(settings.haptics);
  }, [settings.haptics]);

  const update = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      writeJSON(KEY, next);
      return next;
    });
  }, []);

  return {
    settings,
    toggleMaestro: () => update({ maestro: !settings.maestro }),
    toggleHaptics: () => update({ haptics: !settings.haptics }),
    toggleMode: () => update({ mode: settings.mode === "day" ? "night" : "day" }),
    setLessonOverride: (id) => update({ lessonOverride: id }),
  };
}
