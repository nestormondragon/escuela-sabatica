import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import { adaptLessonToEpisodes } from "../content/legacyEpisodeAdapter.js";
import { lessonSummaryById } from "../content/lessonManifest.generated.js";
import { useJourneyKit } from "../state/useJourneyKit.js";
import { useJourney, journeyActions, selectors } from "../state/journey/index.js";
import RouteLoading from "./RouteLoading.jsx";

export default function LessonRoute() {
  const { lessonId } = useParams();
  const summary = lessonSummaryById(lessonId);
  const loaded = useLoadedLesson(lessonId);

  if (!summary) throw new Error("La lección solicitada no existe");
  if (loaded.loading) return <RouteLoading />;
  if (loaded.error || !loaded.lesson) throw loaded.error;
  return <LessonReady lesson={loaded.lesson} />;
}

function LessonReady({ lesson }) {
  const navigate = useNavigate();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const episodes = adaptLessonToEpisodes(lesson);
  const [nameDraft, setNameDraft] = useState("");
  const profileName = selectors.selectProfileName(journey.state);
  const canPersonalize = kit.filledCount > 0 && !profileName;
  const capabilityLabels = Array.from(
    new Set(
      Object.values(journey.state.capabilities || {})
        .flatMap((capability) => capability.evidence || [])
        .filter((evidence) => evidence.lessonId === lesson.id)
        .map((evidence) => evidence.label)
        .filter(Boolean)
    )
  );

  const openEpisode = (episode) => {
    kit.start();
    journey.dispatch(
      journeyActions.navigate(
        `/leccion/${lesson.id}/episodio/${episode.id}`,
        { lessonId: lesson.id, episodeId: episode.id }
      )
    );
    navigate(`/leccion/${lesson.id}/episodio/${episode.id}`);
  };

  const saveName = () => {
    const clean = nameDraft.trim();
    if (!clean) return;
    kit.setUserName(clean);
    setNameDraft("");
  };

  return (
    <div className="route-experience">
      <section className="lesson-path" aria-labelledby="lesson-title">
        <div className="route-eyebrow">Lección {lesson.number}</div>
        <h1 id="lesson-title" data-route-heading>{lesson.title}</h1>
        <p className="route-deck">{lesson.subtitle}</p>

        <blockquote className="lesson-verse">
          <p>{lesson.verse.text}</p>
          <cite>{lesson.verse.ref}</cite>
        </blockquote>

        {capabilityLabels.length ? (
          <aside className="lesson-capabilities" aria-label="Prácticas ejercitadas">
            <span>Lo que ya estás aprendiendo a hacer</span>
            <ul>
              {capabilityLabels.map((label) => (
                <li key={label}>
                  <Icon name="spark" size={14} />
                  {label}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="lesson-thread">
          <div className="lesson-thread__head">
            <span>Tu recorrido</span>
            <span>{kit.filledCount} de {kit.total} piezas</span>
          </div>
          <ol>
            {episodes.map((episode, index) => {
              const value = kit.state.slots[episode.slotId];
              const isNext = episode.slotId === kit.firstUnfilled;
              return (
                <li key={episode.id}>
                  <button
                    type="button"
                    className="episode-line"
                    data-state={value ? "complete" : isNext ? "next" : "open"}
                    onClick={() => openEpisode(episode)}
                  >
                    <span className="episode-line__index">
                      {value ? <Icon name="check" size={15} weight="bold" /> : index + 1}
                    </span>
                    <span className="episode-line__copy">
                      <span>{episode.canonicalDay}</span>
                      <strong>{episode.title}</strong>
                      {value ? <em>{String(value)}</em> : null}
                    </span>
                    <Icon name="chevron" size={16} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {kit.filledCount >= 4 ? (
          <aside className="pattern-inscription">
            <span>El patrón que está apareciendo</span>
            <p>{lesson.pattern(kit.state)}</p>
          </aside>
        ) : null}

        {canPersonalize ? (
          <section className="personalize-invitation" aria-labelledby="personalize-title">
            <div>
              <span>Esto ya es tuyo</span>
              <h2 id="personalize-title">¿Quieres ponerle tu nombre?</h2>
              <p>Es opcional y se guarda solo en este navegador.</p>
            </div>
            <div className="personalize-invitation__form">
              <label htmlFor="journey-name" className="sr-only">Tu nombre</label>
              <input
                id="journey-name"
                value={nameDraft}
                maxLength={32}
                autoComplete="given-name"
                placeholder="Tu nombre"
                onChange={(event) => setNameDraft(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && saveName()}
              />
              <button type="button" className="btn btn-primary" onClick={saveName}>
                Guardar
              </button>
            </div>
          </section>
        ) : null}

        {kit.done ? (
          <Link className="world-action" to={`/sabado/${lesson.id}`}>
            <span>
              <small>Tu semana está preparada</small>
              Abrir el folio del sábado
            </span>
            <Icon name="arrow" size={20} />
          </Link>
        ) : null}
      </section>
    </div>
  );
}
