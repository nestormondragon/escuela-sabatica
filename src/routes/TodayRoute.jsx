import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentLessonSummary } from "../content/loadLesson.js";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import {
  adaptLessonToEpisodes,
  firstIncompleteEpisode,
} from "../content/legacyEpisodeAdapter.js";
import { lessonManifestForLocale } from "../content/lessonManifest.generated.js";
import { useJourney, journeyActions, selectors } from "../state/journey/index.js";
import { useJourneyKit } from "../state/useJourneyKit.js";
import { fillName, weave, warmCue } from "../lib/name.js";
import {
  latestOpenCommitment,
  latestSavedPhrase,
} from "../lib/journeyMeaning.js";
import Icon from "../components/Icon.jsx";
import DailySpark from "../features/today/DailySpark.jsx";
import ReturnThread from "../features/today/ReturnThread.jsx";
import IntentionalExit from "../features/episode/IntentionalExit.jsx";
import RouteLoading from "./RouteLoading.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import { isRemovalLesson } from "../visual-world/lessonVisualManifest.js";

export default function TodayRoute() {
  const { locale, t } = useI18n();
  const summary = currentLessonSummary(undefined, locale);
  const loaded = useLoadedLesson(summary.id, locale);

  if (loaded.loading) return <RouteLoading label={t("today.loading")} />;
  if (loaded.error || !loaded.lesson) {
    throw loaded.error || new Error(t("today.openError"));
  }
  return <TodayReady lesson={loaded.lesson} />;
}

function TodayReady({ lesson }) {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const removal = isRemovalLesson(lesson.id);
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

  const previous = lessonManifestForLocale(locale)[lesson.number - 2] || null;
  const returnItem = useMemo(() => {
    const commitment = latestOpenCommitment(journey.state);
    if (commitment?.action?.value) {
      return {
        kind: "commitment",
        id: commitment.id,
        label: t("today.openStep"),
        body: t("today.openStepBody", { value: commitment.action.value }),
      };
    }

    const previousPhrase = previous
      ? latestSavedPhrase(journey.state, previous.id)
      : "";
    if (previousPhrase) {
      return {
        kind: "echo",
        label: t("today.echo"),
        body: t("today.echoBody", { value: previousPhrase }),
      };
    }

    return null;
  }, [journey.state, previous, t]);

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
      `/leccion/${lesson.id}/episodio/${episode.id}?profundidad=${depth}`,
      { viewTransition: true }
    );
  };

  if (paused) {
    return (
      <div className="route-focus">
        <IntentionalExit
          title={t("today.pauseTitle")}
          body={t("today.pauseBody")}
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
            <span>{t("today.weekReady")}</span>
            <span>{lesson.verse.ref}</span>
          </div>
          <h1
            id="daily-complete-title"
            className="daily-spark-question"
            data-route-heading
          >
            {t("today.folioReady")}
          </h1>
          <p className="daily-spark-cue">
            {t(removal ? "today.completeRegionsBody" : "today.completeBody")}
          </p>
          <ReturnThread item={returnItem} onResolve={resolveReturn} />
          <button
            className="world-action"
            type="button"
            onClick={() => navigate(`/sabado/${lesson.id}`)}
          >
            <span>
              <small>{t("today.weekSummary")}</small>
              {t("today.openFolio")}
            </span>
            <Icon name="arrow" size={20} />
          </button>
          <button
            className="quiet-exit"
            type="button"
            onClick={() => navigate("/mosaico")}
          >
            {t("today.viewMosaic")}
          </button>
        </section>
      </div>
    );
  }

  const readerName = kit.state.userName || selectors.selectProfileName(journey.state);
  const dailyCue = episode.cue
    ? episode.cue.includes("{name}")
      ? fillName(episode.cue, readerName)
      : weave(readerName, episode.cue, `${lesson.id}:${episode.id}`)
    : warmCue(readerName, `${lesson.id}:${episode.id}`, locale);

  return (
    <div className="route-experience route-experience--today">
      <DailySpark
        lesson={lesson}
        episode={{
          ...episode,
          cue: dailyCue,
          canonicalDay:
            episodeIndex === 7
              ? t("today.friday")
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
