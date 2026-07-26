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
import { fillName, lcFirst, weave, warmCue } from "../lib/name.js";
import { capabilityForModule } from "../lib/journeyMeaning.js";
import ArtifactMutation from "../features/episode/ArtifactMutation.jsx";
import { visualForLesson } from "../visual-world/lessonVisualManifest.js";
import RouteLoading from "./RouteLoading.jsx";
import KineticHeading from "../components/KineticHeading.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

export default function EpisodeRoute() {
  const { locale, t } = useI18n();
  const { lessonId, episodeId } = useParams();
  const loaded = useLoadedLesson(lessonId, locale);

  if (loaded.loading) return <RouteLoading label={t("episode.loading")} />;
  if (loaded.error || !loaded.lesson) throw loaded.error;
  return <EpisodeReady lesson={loaded.lesson} episodeId={episodeId} />;
}

function EpisodeReady({ lesson, episodeId }) {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const role = journey.state.profile.role;
  const teacherMode = role === "teacher" || role === "both";
  const requestedDepth =
    search.get("profundidad") || journey.state.profile.preferredDepth || "study";
  const episode = contentForDepth(
    episodeById(lesson, episodeId),
    requestedDepth
  );
  const [mutation, setMutation] = useState(null);
  const readerName = kit.state.userName || selectors.selectProfileName(journey.state);
  /* Only ~1 in 10 authored cues carries a literal {name} token, so most
     episode screens never greeted the reader by name even though a name
     was on file. Weaving the name into whichever cue text IS authored
     (and falling back to a varied warm greeting when there's none at all)
     restores a name on every screen without touching the authored copy. */
  const cue = episode?.cue
    ? episode.cue.includes("{name}")
      ? fillName(episode.cue, readerName)
      : weave(readerName, episode.cue, `${lesson.id}:${episode.id}`)
    : warmCue(readerName, `${lesson.id}:${episode.id}`, locale);

  if (!episode?.id) throw new Error(t("episode.missing"));

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
    const wasFilled = kit.isFilled(episode.slotId);
    const nextFilled = Math.min(
      kit.total,
      kit.filledCount + (wasFilled ? 0 : 1)
    );
    const capability = capabilityForModule(episode.module.type, locale);
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
      lesson,
      filled: nextFilled,
      total: kit.total,
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
          {t("episode.back")}
        </button>

        <header className="episode-heading">
          <span className="route-eyebrow">
            {episode.canonicalDay} · {episode.depth === "minute"
              ? t("common.oneMinute")
              : episode.depth === "deep"
                ? t("common.deep")
                : t("common.study")}
          </span>
          <KineticHeading
            id="episode-title"
            data-route-heading
            motionPreset="compact"
          >
            {episode.title}
          </KineticHeading>
          {cue ? <p>{cue}</p> : null}
        </header>

        {prior ? (
          <PersonalNote>
            {t("episode.prior", {
              value: prior.value,
              label: lcFirst(prior.label),
            })}
          </PersonalNote>
        ) : null}

        {episode.showStory && episode.story ? (
          <div className="episode-story">
            <span>{t("episode.beforeChoosing")}</span>
            <p>{episode.story}</p>
          </div>
        ) : null}

        <div className="episode-interaction">
          <ModuleHost
            module={episode.module}
            onFill={handleFill}
            onSkip={back}
            lessonId={lesson.id}
            slotId={episode.slotId}
            pieceIndex={kit.filledCount}
            materialVerb={visualForLesson(lesson.id).materialVerb}
          />
        </div>

        {teacherMode && episode.facilitator ? (
          <MaestroPanel guide={episode.facilitator} />
        ) : null}
      </article>
    </div>
  );
}
