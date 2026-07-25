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

export default function PresentationRoute() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const loaded = useLoadedLesson(lessonId);
  const journey = useJourney();

  if (loaded.loading) return <RouteLoading label="Preparando la presentación" />;
  if (loaded.error || !loaded.lesson) throw loaded.error;

  const lesson = loaded.lesson;
  const legacyKit = selectors.selectLegacyKit(journey.state, lessonId);
  const saved = selectors.selectSabbathPack(journey.state, lessonId);
  const pack = buildSabbathPack(lesson, legacyKit, saved);
  const fields = selectedSabbathFields(pack);

  if (!fields.length) {
    return (
      <section className="presentation-empty" aria-labelledby="presentation-empty-title">
        <div className="route-eyebrow">Vista para presentar</div>
        <h1 id="presentation-empty-title" data-route-heading>Primero elige qué mostrar</h1>
        <p className="route-deck">
          La presentación no toma contenido privado por defecto. Selecciona
          campos en el folio del sábado.
        </p>
        <Link className="btn btn-primary" to={`/sabado/${lesson.id}`}>
          Volver al folio
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
