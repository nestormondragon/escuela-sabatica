import { useEffect, useState, useCallback, useRef } from "react";
import { SCREENS } from "./ui.jsx";

/* =================================================================
   HOOKS · V5
   ================================================================= */

const VALID_KEYS = SCREENS.map((s) => s.key);
const COMPLETED_KEY = "escuela-sabatica-v5-completed";

function getHashKey() {
  if (typeof window === "undefined") return "home";
  const raw = (window.location.hash || "").replace(/^#\/?/, "");
  const k = raw.toLowerCase();
  return VALID_KEYS.includes(k) ? k : "home";
}

/* ---- current screen key, synced with URL hash ---- */
export function useCurrentScreen() {
  const [key, setKey] = useState(getHashKey);

  useEffect(() => {
    const onHash = () => setKey(getHashKey());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = useCallback((k) => {
    if (!VALID_KEYS.includes(k)) return;
    // Use replace-style hash to avoid history spam on swipe
    window.location.hash = `#/${k}`;
    setKey(k);
    // Reset scroll on change (each scene is its own viewport)
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return [key, go];
}

/* ---- completed set, persisted ---- */
export function useCompleted() {
  const [completed, setCompleted] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = window.localStorage.getItem(COMPLETED_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  const persist = useCallback((setObj) => {
    try {
      window.localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(Array.from(setObj))
      );
    } catch {
      /* ignore */
    }
  }, []);

  const markComplete = useCallback(
    (k) => {
      setCompleted((prev) => {
        if (prev.has(k)) return prev;
        const next = new Set(prev);
        next.add(k);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    const next = new Set();
    setCompleted(next);
    persist(next);
  }, [persist]);

  return { completed, markComplete, reset };
}

/* ---- refrain (brief "¡ESCRITO ESTÁ!" flash) ---- */
export function useRefrain() {
  const [trigger, setTrigger] = useState(0);
  const fire = useCallback(() => setTrigger((t) => t + 1), []);
  useEffect(() => {
    if (!trigger) return;
    const id = setTimeout(() => setTrigger(0), 2800);
    return () => clearTimeout(id);
  }, [trigger]);
  return { trigger, fire };
}

/* ---- tap-and-hold press (for Anclas: ring fills, fires onComplete) ----
   Returns props to spread on the element, and fill% (0..1).
*/
export function useHoldPress({ duration = 900, onComplete } = {}) {
  const [fill, setFill] = useState(0);
  const [active, setActive] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const doneRef = useRef(false);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setActive(false);
    if (!doneRef.current) setFill(0);
  }, []);

  const tick = useCallback(() => {
    const t = (performance.now() - startRef.current) / duration;
    const clamped = Math.min(1, Math.max(0, t));
    setFill(clamped);
    if (clamped >= 1) {
      doneRef.current = true;
      setActive(false);
      if (onComplete) onComplete();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [duration, onComplete]);

  const start = useCallback(
    (e) => {
      if (doneRef.current) return;
      // Prevent default to avoid text selection
      if (e && e.preventDefault) e.preventDefault();
      setActive(true);
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlers = {
    onPointerDown: start,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
  };

  return { handlers, fill, active, done: doneRef.current };
}
