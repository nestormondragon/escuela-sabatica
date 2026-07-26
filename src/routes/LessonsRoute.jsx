import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import {
  lessonManifestForLocale,
} from "../content/lessonManifest.generated.js";
import {
  currentLessonSummary,
  preloadLesson,
} from "../content/loadLesson.js";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import { useJourney } from "../state/journey/index.js";
import { stageIndexFor } from "../components/Centerpiece.jsx";
import LessonRelief from "../visual-world/LessonRelief.jsx";
import { isRemovalLesson } from "../visual-world/lessonVisualManifest.js";

export default function LessonsRoute() {
  const { locale, t, formatLong } = useI18n();
  const { state } = useJourney();
  const lessons = lessonManifestForLocale(locale);
  const current = currentLessonSummary(undefined, locale);

  return (
    <section className="lesson-archive" aria-labelledby="lesson-archive-title">
      <div className="route-eyebrow">{t("lessons.eyebrow")}</div>
      <h1 id="lesson-archive-title" data-route-heading>{t("lessons.title")}</h1>
      <p className="route-deck">{t("lessons.deck")}</p>

      <ol className="lesson-archive__list">
        {lessons.map((lesson) => {
          const removal = isRemovalLesson(lesson.id);
          const record = state.lessons[lesson.id];
          const progress = record?.legacyKit
            ? Object.values(record.legacyKit.slots || {}).filter(Boolean).length
            : 0;
          const isCurrent = lesson.id === current.id;
          return (
            <li key={lesson.id}>
              <Link
                to={`/leccion/${lesson.id}`}
                className="archive-line"
                data-current={isCurrent}
                onMouseEnter={() => preloadLesson(lesson.id, locale)}
                onFocus={() => preloadLesson(lesson.id, locale)}
              >
                <span className="archive-line__relief" aria-hidden="true">
                  <LessonRelief
                    lesson={lesson}
                    stage={stageIndexFor(progress)}
                    compact
                    priority={isCurrent}
                  />
                </span>
                <span className="archive-line__number">
                  {String(lesson.number).padStart(2, "0")}
                </span>
                <span className="archive-line__copy">
                  <span>
                    {isCurrent ? t("common.thisWeek") : formatLong(lesson.forDate)}
                  </span>
                  <strong>{lesson.title}</strong>
                  <em>{lesson.verseRef}</em>
                </span>
                <span className="archive-line__state">
                  {progress
                    ? t(removal ? "common.regions" : "common.pieces", {
                        filled: progress,
                        total: 8,
                      })
                    : t("common.notStarted")}
                </span>
                <Icon name="chevron" size={17} />
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
