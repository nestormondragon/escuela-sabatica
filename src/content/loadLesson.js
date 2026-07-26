import { pickLessonForDate, todayISO } from "../lib/date.js";
import {
  lessonManifestForLocale,
  lessonSummaryById,
  normalizeContentLocale,
} from "./lessonManifest.generated.js";

const LOADERS = {
  es: {
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
  },
  en: {
    l1: () => import("./en/l1.js"),
    l2: () => import("./en/l2.js"),
    l3: () => import("./en/l3.js"),
    l4: () => import("./en/l4.js"),
    l5: () => import("./en/l5.js"),
    l6: () => import("./en/l6.js"),
    l7: () => import("./en/l7.js"),
    l8: () => import("./en/l8.js"),
    l9: () => import("./en/l9.js"),
    l10: () => import("./en/l10.js"),
    l11: () => import("./en/l11.js"),
    l12: () => import("./en/l12.js"),
    l13: () => import("./en/l13.js"),
  },
};

const cache = new Map();

export function currentLessonSummary(dateISO = todayISO(), locale = "es") {
  const manifest = lessonManifestForLocale(locale);
  return pickLessonForDate(manifest, dateISO) || manifest[0];
}

export async function loadLesson(id, locale = "es") {
  const normalizedLocale = normalizeContentLocale(locale);
  const summary = lessonSummaryById(id, normalizedLocale);
  const loader = LOADERS[normalizedLocale]?.[id];
  if (!summary || !loader) throw new Error(`Unknown lesson: ${id}`);

  const cacheKey = `${normalizedLocale}:${id}`;
  if (!cache.has(cacheKey)) {
    cache.set(
      cacheKey,
      loader().then((module) => ({
        ...module.default,
        forDate: module.default.forDate || summary.forDate,
        weekStart: module.default.weekStart || summary.weekStart,
        locale: normalizedLocale,
        complete: true,
      }))
    );
  }
  return cache.get(cacheKey);
}

export function preloadLesson(id, locale = "es") {
  const normalizedLocale = normalizeContentLocale(locale);
  if (LOADERS[normalizedLocale]?.[id]) void loadLesson(id, normalizedLocale);
}
