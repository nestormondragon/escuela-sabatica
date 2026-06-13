import { pickLessonForDate, todayISO } from "../lib/date.js";
import l11 from "./l11.js";
import l12 from "./l12.js";
import l13 from "./l13.js";

/* =================================================================
   lessons.js — the quarter registry + "which lesson today?"

   Q2 2026 runs as weekly units closing on consecutive Saturdays.
   Three known anchors fix the cadence exactly:
     · Lección 4  — "El Papel de la Biblia" — 25 abr 2026
     · Lección 10 — "El Camino de Regreso"  —  6 jun 2026
     · Lección 11 — "Contratiempos"          — 13 jun 2026  (esta semana)

   Fully-authored lessons live in FULL. Every other week is registered
   as a graceful stub so date-routing and the schedule work all quarter;
   add its station data later and it "lights up" automatically.
   ================================================================= */

// Closing Saturdays for Q2 2026 (Lección 1 … 13).
const FOR_DATES = [
  "2026-04-04", "2026-04-11", "2026-04-18", "2026-04-25",
  "2026-05-02", "2026-05-09", "2026-05-16", "2026-05-23",
  "2026-05-30", "2026-06-06", "2026-06-13", "2026-06-20",
  "2026-06-27",
];

// Titles we can state truthfully; others stay generic until authored.
const TITLES = {
  4: "El Papel de la Biblia",
  10: "El Camino de Regreso",
  11: "Contratiempos",
  12: "Compártelo",
  13: "Hacia la Eternidad",
};

// Fully-built lesson experiences, keyed by lesson number.
const FULL = { 11: l11, 12: l12, 13: l13 };

function minusDays(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d - n);
  const p = (x) => String(x).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}`;
}

function stub(number, forDate) {
  return {
    id: `l${number}`,
    number,
    quarter: "2026-Q2",
    weekStart: minusDays(forDate, 7),
    forDate,
    title: TITLES[number] || `Lección ${number}`,
    subtitle: "Esta experiencia se está preparando.",
    complete: false,
  };
}

export const LESSONS = FOR_DATES.map((forDate, i) => {
  const number = i + 1;
  const full = FULL[number];
  if (full) {
    return {
      ...full,
      title: TITLES[number] || full.title,
      forDate: full.forDate || forDate,
      weekStart: full.weekStart || minusDays(full.forDate || forDate, 7),
      complete: true,
    };
  }
  return stub(number, forDate);
});

export function lessonById(id) {
  return LESSONS.find((l) => l.id === id) || null;
}

/** The lesson for today (local date), respecting an optional override. */
export function currentLesson(overrideId, dateISO = todayISO()) {
  if (overrideId) {
    const o = lessonById(overrideId);
    if (o) return o;
  }
  return pickLessonForDate(LESSONS, dateISO) || LESSONS[0];
}
