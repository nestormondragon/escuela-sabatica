/* =================================================================
   date.js — "what lesson is it today?"
   Sabbath-School lessons run a week: an intro Sabbath (Sat) through
   the closing Sabbath ("Para el …"). A lesson is active across that
   window. On a Saturday two windows touch — we prefer the lesson that
   *closes* that day (the one being completed).
   All math is done in LOCAL time so it matches the reader's calendar.
   ================================================================= */

export function todayISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse YYYY-MM-DD to a local Date at midnight. */
export function parseISO(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function daysBetween(aISO, bISO) {
  const a = parseISO(aISO);
  const b = parseISO(bISO);
  if (!a || !b) return Infinity;
  return Math.round((b - a) / 86400000);
}

/**
 * Choose the lesson for a given date.
 * @param {Array} lessons  registry (each has weekStart + forDate ISO)
 * @param {string} dateISO today
 * @returns {object|null}
 */
export function pickLessonForDate(lessons, dateISO) {
  if (!lessons || !lessons.length) return null;
  const date = parseISO(dateISO);

  const within = lessons.filter((l) => {
    const s = parseISO(l.weekStart);
    const e = parseISO(l.forDate);
    return s && e && date >= s && date <= e;
  });

  if (within.length) {
    // Prefer the lesson closing today; else the most recently started.
    const closing = within.find((l) => l.forDate === dateISO);
    if (closing) return closing;
    return within.sort(
      (a, b) => parseISO(b.weekStart) - parseISO(a.weekStart)
    )[0];
  }

  // Outside every window → clamp to nearest by closing date.
  const sorted = [...lessons].sort(
    (a, b) => parseISO(a.forDate) - parseISO(b.forDate)
  );
  if (date < parseISO(sorted[0].weekStart)) return sorted[0];
  const last = sorted[sorted.length - 1];
  if (date > parseISO(last.forDate)) return last;

  let best = sorted[0];
  let bestGap = Infinity;
  for (const l of sorted) {
    const gap = Math.abs(daysBetween(l.forDate, dateISO));
    if (gap < bestGap) {
      bestGap = gap;
      best = l;
    }
  }
  return best;
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function formatLong(iso) {
  const d = parseISO(iso);
  if (!d) return "";
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

export function formatShort(iso) {
  const d = parseISO(iso);
  if (!d) return "";
  return `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}`;
}
