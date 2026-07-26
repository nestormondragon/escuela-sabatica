import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import {
  buildSabbathPack,
  selectedSabbathFields,
} from "../features/sabbath/SabbathFolio.jsx";
import PresentationPreview from "../features/sabbath/PresentationPreview.jsx";
import { selectors, useJourney } from "../state/journey/index.js";
import RouteLoading from "./RouteLoading.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import { localizeLegacyKit } from "../lib/localizedLegacyKit.js";

export default function PresentationRoute() {
  const { locale, t } = useI18n();
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const loaded = useLoadedLesson(lessonId, locale);
  const journey = useJourney();

  if (loaded.loading) return <RouteLoading label={t("presentation.loading")} />;
  if (loaded.error || !loaded.lesson) throw loaded.error;

  const lesson = loaded.lesson;
  const legacyKit = localizeLegacyKit(
    lesson,
    selectors.selectLegacyKit(journey.state, lessonId)
  );
  const saved = selectors.selectSabbathPack(journey.state, lessonId);
  const pack = buildSabbathPack(lesson, legacyKit, saved, locale);
  const fields = selectedSabbathFields(pack, locale);

  if (!fields.length) {
    return (
      <section className="presentation-empty" aria-labelledby="presentation-empty-title">
        <div className="route-eyebrow">{t("presentation.eyebrow")}</div>
        <h1 id="presentation-empty-title" data-route-heading>{t("presentation.emptyTitle")}</h1>
        <p className="route-deck">{t("presentation.emptyBody")}</p>
        <Link className="btn btn-primary" to={`/sabado/${lesson.id}`}>
          {t("presentation.back")}
          <Icon name="arrow" size={17} />
        </Link>
      </section>
    );
  }

  return (
    <PresentationPreview
      lesson={lesson}
      fields={fields}
      open
      onClose={() => navigate(`/sabado/${lesson.id}`, { replace: true })}
    />
  );
}
