import { useState } from "react";
import { readJSON, writeJSON } from "../lib/storage.js";
import { todayISO, daysBetween } from "../lib/date.js";

/* =================================================================
   useStreak — a gentle "cadena de gracia". Counts days the reader
   returns, WITHOUT shame: a missed day is silently forgiven (freeze);
   a longer absence softly decays instead of resetting to zero. Never
   gates content. Computed once on mount.
   ================================================================= */

const KEY = "escuela:streak";

export function useStreak() {
  return useState(() => {
    const today = todayISO();
    const prev = readJSON(KEY, null);

    if (!prev) {
      const s = { v: 1, lastVisit: today, current: 1, longest: 1, totalDays: 1 };
      writeJSON(KEY, s);
      return { streak: s, returned: false, firstEver: true };
    }
    if (prev.lastVisit === today) {
      return { streak: prev, returned: false, firstEver: false };
    }

    const gap = daysBetween(prev.lastVisit, today); // >= 1
    let current;
    if (gap <= 2) current = (prev.current || 1) + 1; // consecutive, or 1 forgiven day
    else current = Math.max(1, Math.round((prev.current || 1) * 0.5)); // gentle decay

    const s = {
      v: 1,
      lastVisit: today,
      current,
      longest: Math.max(prev.longest || 1, current),
      totalDays: (prev.totalDays || prev.current || 1) + 1,
    };
    writeJSON(KEY, s);
    return { streak: s, returned: true, firstEver: false, gap };
  })[0];
}

/* Warm, name-aware welcome-back lines (no performance/shame framing). */
const WELCOME = [
  (n) => (n ? `Qué bueno verte de nuevo, ${n}. Tu jornada continúa.` : "Tu jornada continúa."),
  (n) => (n ? `Bienvenido de nuevo, ${n}. Hoy retomamos con calma.` : "Hoy retomamos con calma."),
  (n) => (n ? `Un paso más hacia la esperanza, ${n}.` : "Un paso más hacia la esperanza."),
  (n) => (n ? `Aquí estás otra vez, ${n}. Sigamos donde la luz quedó.` : "Sigamos donde la luz quedó."),
];

export function welcomeBackLine(name, streak) {
  const i = ((streak && streak.current) || 0) % WELCOME.length;
  const base = WELCOME[i](name);
  if (streak && streak.current >= 3) return `${base} · ${streak.current} días contigo`;
  return base;
}
