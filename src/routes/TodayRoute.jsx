import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentLessonSummary } from "../content/loadLesson.js";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import {
  adaptLessonToEpisodes,
  firstIncompleteEpisode,
} from "../content/legacyEpisodeAdapter.js";
import { LESSON_MANIFEST } from "../content/lessonManifest.generated.js";
import { useJourney, journeyActions, selectors } from "../state/journey/index.js";
import { useJourneyKit } from "../state/useJourneyKit.js";
import { fillName } from "../lib/name.js";
import {
  latestOpenCommitment,
  latestSavedPhrase,
} from "../lib/journeyMeaning.js";
import Icon from "../components/Icon.jsx";
import DailySpark from "../features/today/DailySpark.jsx";
import ReturnThread from "../features/today/ReturnThread.jsx";
import IntentionalExit from "../features/episode/IntentionalExit.jsx";
import RouteLoading from "./RouteLoading.jsx";

export default function TodayRoute() {
  const summary = currentLessonSummary();
  const loaded = useLoadedLesson(summary.id);

  if (loaded.loading) return <RouteLoading label="Preparando la chispa de hoy" />;
  if (loaded.error || !loaded.lesson) {
    throw loaded.error || new Error("No se pudo abrir la lección de hoy");
  }
  return <TodayReady lesson={loaded.lesson} />;
}

function TodayReady({ lesson }) {
  const navigate = useNavigate();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const [depth, setDepth] = useState(
    journey.state.profile.preferredDepth || "study"
  );
  const [paused, setPaused] = useState(false);
  const episode = firstIncompleteEpisode(lesson, kit.state.slots);
  const episodeIndex = episode
    ? adaptLessonToEpisodes(lesson).findIndex(
        (candidate) => candidate.id === episode.id
      )
    : -1;

  const previous = LESSON_MANIFEST[lesson.number - 2] || null;
  const returnItem = useMemo(() => {
    const commitment = latestOpenCommitment(journey.state);
    if (commitment?.action?.value) {
      return {
        kind: "commitment",
        id: commitment.id,
        label: "Un paso que dejaste abierto",
        body: `Te propusiste «${commitment.action.value}». Puede seguir en camino sin convertirse en una deuda.`,
      };
    }

    const previousPhrase = previous
      ? latestSavedPhrase(journey.state, previous.id)
      : "";
    if (previousPhrase) {
      return {
        kind: "echo",
        label: "Una pieza vuelve",
        body: `La lección anterior dejó «${previousPhrase}». Hoy puede adquirir otro significado.`,
      };
    }

    return null;
  }, [journey.state, previous]);

  const resolveReturn = (commitmentId) => {
    journey.dispatch(
      journeyActions.updateCommitment(commitmentId, {
        status: "completed",
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
  };

  const begin = () => {
    if (!episode) return;
    kit.start();
    journey.dispatch(
      journeyActions.setProfile({ preferredDepth: depth })
    );
    journey.dispatch(
      journeyActions.navigate(
        `/leccion/${lesson.id}/episodio/${episode.id}`,
        { lessonId: lesson.id, episodeId: episode.id }
      )
    );
    navigate(
      `/leccion/${lesson.id}/episodio/${episode.id}?profundidad=${depth}`
    );
  };

  if (paused) {
    return (
      <div className="route-focus">
        <IntentionalExit
          title="La piedra queda en su sitio"
          body="No hay una racha que proteger. Cuando regreses, encontrarás esta misma pregunta y tu mosaico tal como lo dejaste."
          onContinue={() => setPaused(false)}
          onClose={() => setPaused(false)}
        />
      </div>
    );
  }

  if (kit.done || !episode) {
    return (
      <div className="route-experience route-experience--today">
        <section className="daily-spark" aria-labelledby="daily-complete-title">
          <div className="daily-spark-meta">
            <span>Semana preparada</span>
            <span>{lesson.verse.ref}</span>
          </div>
          <h1
            id="daily-complete-title"
            className="daily-spark-question"
            data-route-heading
          >
            Tu folio ya tiene forma
          </h1>
          <p className="daily-spark-cue">
            Tus ocho piezas permanecen en el mosaico. Ahora puedes decidir qué
            llevar a la conversación del sábado y qué conservar en privado.
          </p>
          <ReturnThread item={returnItem} onResolve={resolveReturn} />
          <button
            className="world-action"
            type="button"
            onClick={() => navigate(`/sabado/${lesson.id}`)}
          >
            <span>
              <small>Tu síntesis de la semana</small>
              Abrir el folio del sábado
            </span>
            <Icon name="arrow" size={20} />
          </button>
          <button
            className="quiet-exit"
            type="button"
            onClick={() => navigate("/mosaico")}
          >
            Ver el mosaico del trimestre
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="route-experience route-experience--today">
      <DailySpark
        lesson={lesson}
        episode={{
          ...episode,
          cue: episode.cue
            ? fillName(
                episode.cue,
                kit.state.userName || selectors.selectProfileName(journey.state)
              )
            : "",
          canonicalDay:
            episodeIndex === 7
              ? "Viernes"
              : episode.canonicalDay,
        }}
        depth={depth}
        onDepthChange={setDepth}
        onBegin={begin}
        onFinishToday={() => setPaused(true)}
        returnItem={returnItem}
        onResolveReturn={resolveReturn}
      />
    </div>
  );
}
