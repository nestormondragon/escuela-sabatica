import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import MaestroPanel from "../components/MaestroPanel.jsx";
import ModuleHost from "../modules/ModuleHost.jsx";
import { PersonalNote } from "../modules/common.jsx";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import {
  contentForDepth,
  episodeById,
} from "../content/legacyEpisodeAdapter.js";
import { useJourneyKit } from "../state/useJourneyKit.js";
import {
  useJourney,
  journeyActions,
  selectors,
} from "../state/journey/index.js";
import { fillName } from "../lib/name.js";
import { capabilityForModule } from "../lib/journeyMeaning.js";
import ArtifactMutation from "../features/episode/ArtifactMutation.jsx";
import RouteLoading from "./RouteLoading.jsx";

export default function EpisodeRoute() {
  const { lessonId, episodeId } = useParams();
  const loaded = useLoadedLesson(lessonId);

  if (loaded.loading) return <RouteLoading label="Abriendo la mesa de estudio" />;
  if (loaded.error || !loaded.lesson) throw loaded.error;
  return <EpisodeReady lesson={loaded.lesson} episodeId={episodeId} />;
}

function EpisodeReady({ lesson, episodeId }) {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const requestedDepth =
    search.get("profundidad") || journey.state.profile.preferredDepth || "study";
  const episode = contentForDepth(
    episodeById(lesson, episodeId),
    requestedDepth
  );
  const [mutation, setMutation] = useState(null);
  const cue = episode?.cue
    ? fillName(
        episode.cue,
        kit.state.userName || selectors.selectProfileName(journey.state)
      )
    : "";

  if (!episode?.id) throw new Error("El episodio solicitado no existe");

  const prior = useMemo(() => {
    const index = lesson.stations.findIndex((station) => station.id === episode.id);
    if (index <= 0) return null;
    for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
      const station = lesson.stations[cursor];
      const value = kit.state.slots[station.slot];
      if (value) {
        const slot = lesson.slots.find((candidate) => candidate.id === station.slot);
        return { label: slot?.label || station.title, value };
      }
    }
    return null;
  }, [episode.id, kit.state.slots, lesson.slots, lesson.stations]);

  const back = () => navigate(`/leccion/${lesson.id}`);

  const saveCommitment = (value, extraPatch) => {
    if (episode.module.type !== "commitDuo") return;
    const id = `commitment:${lesson.id}:${episode.id}`;
    const existing = journey.state.commitments.find((item) => item.id === id);
    const commitment = {
      id,
      lessonId: lesson.id,
      episodeId: episode.id,
      status: "open",
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      action: {
        value,
        privacy: "private",
      },
      person: {
        value:
          extraPatch?.[episode.module.personExtraKey] || "",
        privacy: "requires-consent",
      },
    };
    journey.dispatch(
      existing
        ? journeyActions.updateCommitment(id, commitment)
        : journeyActions.addCommitment(commitment)
    );
  };

  const handleFill = (value, extraPatch, seedSub, tags) => {
    const slot = episode.slot;
    const recordedAt = new Date().toISOString();
    const capability = capabilityForModule(episode.module.type);
    const previousLessonId =
      lesson.number > 1 ? `l${lesson.number - 1}` : null;
    const previousPanel = previousLessonId
      ? journey.state.mosaic.panels[previousLessonId]
      : null;
    const currentPanel = journey.state.mosaic.panels[lesson.id];
    const previousHasWork = previousLessonId
      ? Object.values(
          journey.state.lessons[previousLessonId]?.legacyKit?.slots || {}
        ).some(Boolean)
      : false;

    kit.fillSlot(episode.slotId, value, extraPatch, tags);
    saveCommitment(value, extraPatch);
    journey.dispatch(
      journeyActions.recordCapability(capability.id, {
        id: `capability:${lesson.id}:${episode.id}`,
        lessonId: lesson.id,
        episodeId: episode.id,
        label: capability.label,
        createdAt: recordedAt,
      })
    );

    if (kit.filledCount === 0 && previousHasWork) {
      const connectionId = `${previousLessonId}:to:${lesson.id}`;
      journey.dispatch(journeyActions.revealConnection(connectionId));
      journey.dispatch(
        journeyActions.setPanel(previousLessonId, {
          connectionIds: Array.from(
            new Set([...(previousPanel?.connectionIds || []), connectionId])
          ),
        })
      );
      journey.dispatch(
        journeyActions.setPanel(lesson.id, {
          connectionIds: Array.from(
            new Set([...(currentPanel?.connectionIds || []), connectionId])
          ),
        })
      );
    }

    setMutation({
      label: slot?.label || episode.title,
      value,
      insight: seedSub,
      capabilityLabel: capability.label,
    });
  };

  if (mutation) {
    return (
      <div className="route-experience">
        <ArtifactMutation
          {...mutation}
          onContinue={() => navigate(`/leccion/${lesson.id}`)}
        />
      </div>
    );
  }

  return (
    <div className="route-experience">
      <article className="episode-canvas" aria-labelledby="episode-title">
        <button type="button" className="route-back" onClick={back}>
          <Icon name="arrowLeft" size={17} />
          Volver a la lección
        </button>

        <header className="episode-heading">
          <span className="route-eyebrow">
            {episode.canonicalDay} · {episode.depth === "minute" ? "1 minuto" : episode.depth === "deep" ? "A fondo" : "Estudiar"}
          </span>
          <h1 id="episode-title" data-route-heading>{episode.title}</h1>
          {cue ? <p>{cue}</p> : null}
        </header>

        {prior ? (
          <PersonalNote>
            Antes colocaste «{prior.value}» en {prior.label.toLowerCase()}. Mira
            qué cambia cuando lo traes hasta esta pregunta.
          </PersonalNote>
        ) : null}

        {episode.showStory && episode.story ? (
          <div className="episode-story">
            <span>Antes de elegir</span>
            <p>{episode.story}</p>
          </div>
        ) : null}

        <div className="episode-interaction">
          <ModuleHost
            module={episode.module}
            onFill={handleFill}
            onSkip={back}
          />
        </div>

        {episode.showFacilitator && episode.facilitator ? (
          <MaestroPanel guide={episode.facilitator} />
        ) : null}
      </article>
    </div>
  );
}
