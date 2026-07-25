import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import {
  LESSON_MANIFEST,
} from "../content/lessonManifest.generated.js";
import {
  currentLessonSummary,
  preloadLesson,
} from "../content/loadLesson.js";
import { formatLong } from "../lib/date.js";
import { useJourney } from "../state/journey/index.js";

export default function LessonsRoute() {
  const { state } = useJourney();
  const current = currentLessonSummary();

  return (
    <section className="lesson-archive" aria-labelledby="lesson-archive-title">
      <div className="route-eyebrow">13 semanas · 1 y 2 Corintios</div>
      <h1 id="lesson-archive-title" data-route-heading>Las cartas abiertas</h1>
      <p className="route-deck">
        Explora cualquier lección. La fecha sugiere un lugar de entrada, pero
        nunca cierra las demás.
      </p>

      <ol className="lesson-archive__list">
        {LESSON_MANIFEST.map((lesson) => {
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
                onMouseEnter={() => preloadLesson(lesson.id)}
                onFocus={() => preloadLesson(lesson.id)}
              >
                <span className="archive-line__number">
                  {String(lesson.number).padStart(2, "0")}
                </span>
                <span className="archive-line__copy">
                  <span>
                    {isCurrent ? "Esta semana" : formatLong(lesson.forDate)}
                  </span>
                  <strong>{lesson.title}</strong>
                  <em>{lesson.verseRef}</em>
                </span>
                <span className="archive-line__state">
                  {progress ? `${progress} de 8` : "Sin empezar"}
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
