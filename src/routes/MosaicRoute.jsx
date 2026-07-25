import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { LESSON_MANIFEST } from "../content/lessonManifest.generated.js";
import { currentLessonSummary, preloadLesson } from "../content/loadLesson.js";
import QuarterMosaic from "../features/mosaic/QuarterMosaic.jsx";
import { useJourney } from "../state/journey/index.js";

export default function MosaicRoute() {
  const navigate = useNavigate();
  const { state } = useJourney();
  const current = currentLessonSummary();
  const [selectedId, setSelectedId] = useState(current.id);
  const selected =
    LESSON_MANIFEST.find((lesson) => lesson.id === selectedId) || current;

  const progressByLesson = useMemo(
    () =>
      Object.fromEntries(
        LESSON_MANIFEST.map((lesson) => {
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
    [current.id, state.lessons]
  );
  const selectedConnectionCount =
    state.mosaic.panels[selected.id]?.connectionIds?.length || 0;

  const select = (lesson) => {
    preloadLesson(lesson.id);
    if (selectedId === lesson.id) {
      navigate(`/leccion/${lesson.id}`);
      return;
    }
    setSelectedId(lesson.id);
  };

  return (
    <section className="mosaic-route" aria-labelledby="mosaic-route-title">
      <div className="mosaic-route__intro">
        <div>
          <div className="route-eyebrow">Trece semanas · una historia</div>
          <h1 id="mosaic-route-title" data-route-heading>Tu Corinto está tomando forma</h1>
        </div>
        <p>
          No son trece tareas separadas. Cada panel conserva una decisión y
          cambia lo que puedes reconocer en el siguiente.
        </p>
      </div>

      <QuarterMosaic
        lessons={LESSON_MANIFEST}
        progressByLesson={progressByLesson}
        currentLessonId={current.id}
        activeLessonId={
          LESSON_MANIFEST.find(
            (lesson) => state.lessons[lesson.id]?.status === "active"
          )?.id || current.id
        }
        selectedLessonId={selectedId}
        onNavigate={select}
        heading="Trece paneles, una sola obra"
        description="Selecciona una piedra para acercarla. Vuelve a seleccionarla para entrar en la lección."
      />

      <aside className="mosaic-selection" aria-live="polite">
        <div>
          <span>Panel {String(selected.number).padStart(2, "0")}</span>
          <h2>{selected.title}</h2>
          <p>{selected.subtitle}</p>
          {selectedConnectionCount ? (
            <p className="mosaic-selection__connection">
              <Icon name="path" size={15} />
              {selectedConnectionCount === 1
                ? "Este panel ya está unido a otra lección."
                : `Este panel conserva ${selectedConnectionCount} uniones con otras lecciones.`}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="world-action compact"
          onClick={() => navigate(`/leccion/${selected.id}`)}
        >
          <span>Entrar en esta lección</span>
          <Icon name="arrow" size={19} />
        </button>
      </aside>
    </section>
  );
}
