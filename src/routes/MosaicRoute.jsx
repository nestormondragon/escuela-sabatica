import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { lessonManifestForLocale } from "../content/lessonManifest.generated.js";
import { currentLessonSummary, preloadLesson } from "../content/loadLesson.js";
import QuarterMosaic from "../features/mosaic/QuarterMosaic.jsx";
import { useJourney } from "../state/journey/index.js";
import { useI18n } from "../i18n/LocaleProvider.jsx";

export default function MosaicRoute() {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const { state } = useJourney();
  const lessons = lessonManifestForLocale(locale);
  const current = currentLessonSummary(undefined, locale);
  const [selectedId, setSelectedId] = useState(current.id);
  const selected =
    lessons.find((lesson) => lesson.id === selectedId) || current;

  const progressByLesson = useMemo(
    () =>
      Object.fromEntries(
        lessons.map((lesson) => {
          const record = state.lessons[lesson.id];
          const panel = state.mosaic.panels[lesson.id];
          const legacy = record?.legacyKit;
          const filledCount = legacy
            ? Object.values(legacy.slots || {}).filter(Boolean).length
            : 0;
          return [
            lesson.id,
            {
              filledCount,
              total: 8,
              started: record?.status !== "not-started",
              completed: ["prepared", "reflected"].includes(record?.status),
              completedAt: legacy?.completedAt,
              active: record?.status === "active",
              current: lesson.id === current.id,
              connected: Boolean(panel?.connectionIds?.length),
              connectionCount: panel?.connectionIds?.length || 0,
              updatedAt: record?.episodeProgress
                ? Math.max(
                    0,
                    ...Object.values(record.episodeProgress).map((entry) =>
                      Date.parse(entry.committedAt || entry.updatedAt || 0)
                    )
                  )
                : 0,
            },
          ];
        })
      ),
    [current.id, lessons, state.lessons]
  );
  const selectedConnectionCount =
    state.mosaic.panels[selected.id]?.connectionIds?.length || 0;

  const select = (lesson) => {
    preloadLesson(lesson.id, locale);
    if (selectedId === lesson.id) {
      navigate(`/leccion/${lesson.id}`, { viewTransition: true });
      return;
    }
    setSelectedId(lesson.id);
  };

  return (
    <section className="mosaic-route" aria-labelledby="mosaic-route-title">
      <div className="mosaic-route__intro">
        <div>
          <div className="route-eyebrow">{t("mosaic.eyebrow")}</div>
          <h1 id="mosaic-route-title" data-route-heading>{t("mosaic.title")}</h1>
        </div>
        <p>{t("mosaic.deck")}</p>
      </div>

      <QuarterMosaic
        lessons={lessons}
        progressByLesson={progressByLesson}
        currentLessonId={current.id}
        activeLessonId={
          lessons.find(
            (lesson) => state.lessons[lesson.id]?.status === "active"
          )?.id || current.id
        }
        selectedLessonId={selectedId}
        connectionIds={state.mosaic.revealedConnectionIds}
        onNavigate={select}
        heading={t("mosaic.heading")}
        description={t("mosaic.description")}
      />

      <aside className="mosaic-selection" aria-live="polite">
        <div>
          <span>{t("mosaic.panel", {
            number: String(selected.number).padStart(2, "0"),
          })}</span>
          <h2>{selected.title}</h2>
          <p>{selected.subtitle}</p>
          {selectedConnectionCount ? (
            <p className="mosaic-selection__connection">
              <Icon name="path" size={15} />
              {selectedConnectionCount === 1
                ? t("mosaic.oneConnection")
                : t("mosaic.connections", { count: selectedConnectionCount })}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="world-action compact"
          onClick={() =>
            navigate(`/leccion/${selected.id}`, { viewTransition: true })
          }
        >
          <span>{t("mosaic.enter")}</span>
          <Icon name="arrow" size={19} />
        </button>
      </aside>
    </section>
  );
}
