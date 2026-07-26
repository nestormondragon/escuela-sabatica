import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import { adaptLessonToEpisodes } from "../content/legacyEpisodeAdapter.js";
import { lessonSummaryById } from "../content/lessonManifest.generated.js";
import { useJourneyKit } from "../state/useJourneyKit.js";
import { useJourney, journeyActions, selectors } from "../state/journey/index.js";
import RouteLoading from "./RouteLoading.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import { capabilityLabelForId } from "../lib/journeyMeaning.js";
import { isRemovalLesson } from "../visual-world/lessonVisualManifest.js";

export default function LessonRoute() {
  const { locale, t } = useI18n();
  const { lessonId } = useParams();
  const summary = lessonSummaryById(lessonId, locale);
  const loaded = useLoadedLesson(lessonId, locale);

  if (!summary) throw new Error(t("lesson.missing"));
  if (loaded.loading) return <RouteLoading />;
  if (loaded.error || !loaded.lesson) throw loaded.error;
  return <LessonReady lesson={loaded.lesson} />;
}

function LessonReady({ lesson }) {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const removal = isRemovalLesson(lesson.id);
  const episodes = adaptLessonToEpisodes(lesson);
  const [nameDraft, setNameDraft] = useState("");
  const profileName = selectors.selectProfileName(journey.state);
  const canPersonalize = kit.filledCount > 0 && !profileName;
  const capabilityLabels = Array.from(
    new Set(
      Object.entries(journey.state.capabilities || {})
        .filter(([, capability]) =>
          (capability.evidence || []).some(
            (evidence) => evidence.lessonId === lesson.id
          )
        )
        .map(([capabilityId]) => capabilityLabelForId(capabilityId, locale))
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
    navigate(`/leccion/${lesson.id}/episodio/${episode.id}`, {
      viewTransition: true,
    });
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
        <div className="route-eyebrow">{t("common.lesson", { number: lesson.number })}</div>
        <h1 id="lesson-title" data-route-heading>{lesson.title}</h1>
        <p className="route-deck">{lesson.subtitle}</p>

        <blockquote className="lesson-verse">
          <p>{lesson.verse.text}</p>
          <cite>{lesson.verse.ref}</cite>
        </blockquote>

        {capabilityLabels.length ? (
          <aside className="lesson-capabilities" aria-label={t("lesson.capabilities")}>
            <span>{t("lesson.capabilitiesHeading")}</span>
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
            <span>{t("lesson.yourJourney")}</span>
            <span>
              {t(removal ? "common.regions" : "common.pieces", {
                filled: kit.filledCount,
                total: kit.total,
              })}
            </span>
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
            <span>{t("lesson.pattern")}</span>
            <p>{lesson.pattern(kit.state)}</p>
          </aside>
        ) : null}

        {canPersonalize ? (
          <section className="personalize-invitation" aria-labelledby="personalize-title">
            <div>
              <span>{t("lesson.yours")}</span>
              <h2 id="personalize-title">{t("lesson.nameTitle")}</h2>
              <p>{t("settings.storage")}</p>
            </div>
            <div className="personalize-invitation__form">
              <label htmlFor="journey-name" className="sr-only">{t("lesson.yourName")}</label>
              <input
                id="journey-name"
                value={nameDraft}
                maxLength={32}
                autoComplete="given-name"
                placeholder={t("lesson.yourName")}
                onChange={(event) => setNameDraft(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && saveName()}
              />
              <button type="button" className="btn btn-primary" onClick={saveName}>
                {t("common.save")}
              </button>
            </div>
          </section>
        ) : null}

        {kit.done ? (
          <Link className="world-action" to={`/sabado/${lesson.id}`}>
            <span>
              <small>{t("lesson.weekReady")}</small>
              {t("lesson.openFolio")}
            </span>
            <Icon name="arrow" size={20} />
          </Link>
        ) : null}
      </section>
    </div>
  );
}
