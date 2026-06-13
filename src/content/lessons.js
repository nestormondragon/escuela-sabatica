import { pickLessonForDate, todayISO } from "../lib/date.js";
import l1 from "./l1.js";
import l2 from "./l2.js";
import l3 from "./l3.js";
import l4 from "./l4.js";
import l5 from "./l5.js";
import l6 from "./l6.js";
import l7 from "./l7.js";
import l8 from "./l8.js";
import l9 from "./l9.js";
import l10 from "./l10.js";
import l11 from "./l11.js";
import l12 from "./l12.js";
import l13 from "./l13.js";

/* =================================================================
   lessons.js — the quarter registry + "which lesson today?"

   Q2 2026 runs as weekly units closing on consecutive Saturdays.
   All 13 lessons are fully authored and run on the same engine.
   Date routing picks the lesson whose week contains today (preferring
   the one that *closes* on a Saturday). An override lets the reader
   open any lesson from the picker.
   ================================================================= */

// Closing Saturdays for Q2 2026 (Lección 1 … 13).
const FOR_DATES = [
  "2026-04-04", "2026-04-11", "2026-04-18", "2026-04-25",
  "2026-05-02", "2026-05-09", "2026-05-16", "2026-05-23",
  "2026-05-30", "2026-06-06", "2026-06-13", "2026-06-20",
  "2026-06-27",
];

// Every lesson, keyed by number — all complete.
const FULL = { 1: l1, 2: l2, 3: l3, 4: l4, 5: l5, 6: l6, 7: l7, 8: l8, 9: l9, 10: l10, 11: l11, 12: l12, 13: l13 };

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
    title: `Lección ${number}`,
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
