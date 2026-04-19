import { useEffect, useState, useCallback } from "react";
import { DAYS } from "./ui.jsx";

const VALID = new Set(["intro", "anclas", ...DAYS.map((d) => d.key)]);
const LS_KEY = "escuela-sabatica-v4-completed";

function parseHash() {
  const raw = (typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "").toLowerCase();
  return VALID.has(raw) ? raw : "intro";
}

/**
 * useCurrentDay — two-way bound with window.location.hash so the
 * app is deep-linkable and the browser back/forward work naturally.
 */
export function useCurrentDay() {
  const [day, setDay] = useState(() => (typeof window === "undefined" ? "intro" : parseHash()));

  useEffect(() => {
    const onHash = () => setDay(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = useCallback((next) => {
    if (!VALID.has(next)) return;
    if (next === day) return;
    if (typeof window !== "undefined") {
      window.location.hash = next;
      // scroll to top of the new day view
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
    setDay(next);
  }, [day]);

  return [day, go];
}

/**
 * useCompleted — tracks which day keys the reader has finished.
 * Persisted in localStorage so progress survives reloads.
 */
export function useCompleted() {
  const [completed, setCompleted] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  });

  const markComplete = useCallback((key) => {
    setCompleted((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      try {
        window.localStorage.setItem(LS_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted(new Set());
    try {
      window.localStorage.removeItem(LS_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { completed, markComplete, reset };
}

/**
 * useRefrain — fires a short-lived "¡Escrito está!" refrain across
 * the UI. Returns a trigger (timestamp) and a fire() function.
 */
export function useRefrain() {
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setTrigger(0), 3400);
    return () => clearTimeout(t);
  }, [trigger]);
  const fire = useCallback(() => setTrigger(Date.now()), []);
  return { trigger, fire };
}

/**
 * useScrollProgress — returns a 0-100 progress value tied to the
 * document's scroll position.
 */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max <= 0) {
        setP(0);
        return;
      }
      setP((h.scrollTop / max) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}
