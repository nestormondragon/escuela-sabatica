import { pickLessonForDate, todayISO } from "../lib/date.js";
import { LESSON_MANIFEST, lessonSummaryById } from "./lessonManifest.generated.js";

const LOADERS = {
  l1: () => import("./l1.js"),
  l2: () => import("./l2.js"),
  l3: () => import("./l3.js"),
  l4: () => import("./l4.js"),
  l5: () => import("./l5.js"),
  l6: () => import("./l6.js"),
  l7: () => import("./l7.js"),
  l8: () => import("./l8.js"),
  l9: () => import("./l9.js"),
  l10: () => import("./l10.js"),
  l11: () => import("./l11.js"),
  l12: () => import("./l12.js"),
  l13: () => import("./l13.js"),
};

const cache = new Map();

export function currentLessonSummary(dateISO = todayISO()) {
  return pickLessonForDate(LESSON_MANIFEST, dateISO) || LESSON_MANIFEST[0];
}

export async function loadLesson(id) {
  const summary = lessonSummaryById(id);
  if (!summary || !LOADERS[id]) throw new Error(`Lección desconocida: ${id}`);
  if (!cache.has(id)) {
    cache.set(
      id,
      LOADERS[id]().then((module) => ({
        ...module.default,
        forDate: module.default.forDate || summary.forDate,
        weekStart: module.default.weekStart || summary.weekStart,
        complete: true,
      }))
    );
  }
  return cache.get(id);
}

export function preloadLesson(id) {
  if (LOADERS[id]) void loadLesson(id);
}
