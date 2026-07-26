import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { currentLessonSummary } from "../content/loadLesson.js";
import { lessonSummaryById } from "../content/lessonManifest.generated.js";
import { useLoadedLesson } from "../content/useLoadedLesson.js";
import { useJourneyKit } from "../state/useJourneyKit.js";
import {
  journeyActions,
  selectors,
  useJourney,
} from "../state/journey/index.js";
import SabbathFolio from "../features/sabbath/SabbathFolio.jsx";
import LessonRelief from "../visual-world/LessonRelief.jsx";
import RouteLoading from "./RouteLoading.jsx";

export default function SabbathRoute() {
  const { lessonId } = useParams();
  const summary = lessonId
    ? lessonSummaryById(lessonId)
    : currentLessonSummary();
  if (!summary) throw new Error("La lección solicitada no existe");
  const loaded = useLoadedLesson(summary.id);

  if (loaded.loading) return <RouteLoading label="Reuniendo tu folio" />;
  if (loaded.error || !loaded.lesson) throw loaded.error;
  return <SabbathReady lesson={loaded.lesson} />;
}

function SabbathReady({ lesson }) {
  const navigate = useNavigate();
  const journey = useJourney();
  const kit = useJourneyKit(lesson);
  const savedPack = selectors.selectSabbathPack(journey.state, lesson.id);

  if (kit.filledCount === 0) {
    return (
      <section className="sabbath-empty" aria-labelledby="sabbath-empty-title">
        <div className="sabbath-empty__relief" aria-hidden="true">
          <LessonRelief lesson={lesson} stage={0} compact priority />
        </div>
        <div className="route-eyebrow">Sábado</div>
        <h1 id="sabbath-empty-title" data-route-heading>El folio espera tu primera pieza</h1>
        <p className="route-deck">
          Aquí se reunirán tu pregunta, tu oración y tu paso de la semana. No
          tienes que completar todo para traer algo verdadero a la clase.
        </p>
        <Link className="world-action compact" to={`/leccion/${lesson.id}`}>
          <span>Entrar en la lección {lesson.number}</span>
          <Icon name="arrow" size={19} />
        </Link>
      </section>
    );
  }

  return (
    <SabbathFolio
      lesson={lesson}
      legacyKit={kit.state}
      savedPack={savedPack}
      onSavePack={(pack) =>
        journey.dispatch(journeyActions.saveSabbathPack(lesson.id, pack))
      }
      onBack={() => navigate(`/leccion/${lesson.id}`)}
      onPresent={() => navigate(`/presentar/${lesson.id}`)}
    />
  );
}
