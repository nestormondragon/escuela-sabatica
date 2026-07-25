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

/* =====================================================================
   lessons.js — the quarter registry and "which lesson is it today?"

   Q3 2026 walks 1 and 2 Corintios: Paul writing into a fractured church.
   Thirteen weekly units, each closing on a Sabbath. Date routing picks
   the lesson whose week contains today; the picker can override it.
   ===================================================================== */

// Closing Sabbaths for Q3 2026 (Lección 1 through 13).
const FOR_DATES = [
  "2026-07-04", "2026-07-11", "2026-07-18", "2026-07-25",
  "2026-08-01", "2026-08-08", "2026-08-15", "2026-08-22",
  "2026-08-29", "2026-09-05", "2026-09-12", "2026-09-19",
  "2026-09-26",
];

const FULL = { 1: l1, 2: l2, 3: l3, 4: l4, 5: l5, 6: l6, 7: l7,
               8: l8, 9: l9, 10: l10, 11: l11, 12: l12, 13: l13 };

function minusDays(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d - n);
  const p = (x) => String(x).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}`;
}

export const LESSONS = FOR_DATES.map((forDate, i) => {
  const full = FULL[i + 1];
  return {
    ...full,
    forDate: full.forDate || forDate,
    weekStart: full.weekStart || minusDays(full.forDate || forDate, 7),
    complete: true,
  };
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
