import React from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import MaestroPanel from "../components/MaestroPanel.jsx";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import { adaptLessonToEpisodes } from "../content/legacyEpisodeAdapter.js";
import LessonRelief from "../visual-world/LessonRelief.jsx";
import RouteLoading from "./RouteLoading.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

export default function TeacherRoute() {
  const { locale, t } = useI18n();
  const { lessonId } = useParams();
  const loaded = useLoadedLesson(lessonId, locale);

  if (loaded.loading) return <RouteLoading label={t("teacher.loading")} />;
  if (loaded.error || !loaded.lesson) throw loaded.error;

  const lesson = loaded.lesson;
  const episodes = adaptLessonToEpisodes(lesson);

  return (
    <section className="teacher-route" aria-labelledby="teacher-title">
      <div className="route-eyebrow">{t("teacher.eyebrow", { number: lesson.number })}</div>
      <h1 id="teacher-title" data-route-heading>{lesson.title}</h1>
      <p className="route-deck">{t("teacher.deck")}</p>

      <div className="teacher-opening">
        <div className="teacher-opening__relief" aria-hidden="true">
          <LessonRelief lesson={lesson} stage={4} compact priority />
        </div>
        <blockquote>
          {lesson.verse.text}
          <cite>{lesson.verse.ref}</cite>
        </blockquote>
        <Link to={`/presentar/${lesson.id}`} className="btn btn-primary">
          {t("teacher.presentation")}
          <Icon name="arrow" size={17} />
        </Link>
      </div>

      <ol className="teacher-plan">
        {episodes.map((episode, index) => (
          <li key={episode.id}>
            <div className="teacher-plan__number">{index + 1}</div>
            <div>
              <span>{episode.canonicalDay}</span>
              <h2>{episode.title}</h2>
              {episode.story ? <p>{episode.story}</p> : null}
              {episode.facilitator ? (
                <MaestroPanel guide={episode.facilitator} />
              ) : null}
              <Link to={`/leccion/${lesson.id}/episodio/${episode.id}?profundidad=deep`}>
                {t("teacher.openEpisode")}
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <section className="teacher-discussion" aria-labelledby="discussion-title">
        <span>{t("teacher.dialogue")}</span>
        <h2 id="discussion-title">{t("teacher.questions")}</h2>
        <ol>
          {lesson.discussion.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>
    </section>
  );
}
