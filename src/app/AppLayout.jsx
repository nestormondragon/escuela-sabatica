import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppShell from "./AppShell.jsx";
import PageTransition from "./PageTransition.jsx";
import Backdrop from "../components/Backdrop.jsx";
import { currentLessonSummary } from "../content/loadLesson.js";
import { lessonSummaryById } from "../content/lessonManifest.generated.js";
import { formatLong } from "../lib/date.js";
import { setHaptics } from "../lib/haptics.js";
import { journeyActions, useJourney } from "../state/journey/index.js";

function routeLessonId(pathname) {
  return pathname.match(/^\/(?:leccion|maestro|presentar|sabado)\/(l\d+)/)?.[1] || null;
}

function titleForRoute(nextLocation) {
  const path = nextLocation.pathname;
  if (path === "/hoy") return "Hoy";
  if (path === "/mosaico") return "Mosaico del trimestre";
  if (path === "/sabado" || path.startsWith("/sabado/"))
    return "Folio del sábado";
  if (path === "/lecciones") return "Lecciones del trimestre";
  if (path === "/ajustes") return "Ajustes y privacidad";
  if (path.startsWith("/maestro/")) return "Guía para el maestro";
  if (path.startsWith("/presentar/")) return "Vista para presentar";
  if (path.includes("/episodio/")) return "Episodio de estudio";
  if (path.startsWith("/leccion/")) return "Recorrido de la lección";
  return "Escuela Sabática";
}

function useSystemDark() {
  const [dark, setDark] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = (event) => setDark(event.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return dark;
}

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const journey = useJourney();
  const systemDark = useSystemDark();
  const calendarLesson = currentLessonSummary();
  const selectedId = routeLessonId(location.pathname);
  const lesson = lessonSummaryById(selectedId) || calendarLesson;
  const lessonRecord = journey.state.lessons[lesson.id];
  const filledCount = lessonRecord?.legacyKit
    ? Object.values(lessonRecord.legacyKit.slots || {}).filter(Boolean).length
    : 0;
  const progress = filledCount / 8;
  const configuredTheme = journey.state.settings.theme;
  const resolvedTheme =
    configuredTheme === "auto"
      ? systemDark
        ? "dark"
        : "light"
      : configuredTheme;
  const role = journey.state.profile.role;
  const teacherMode = role === "teacher" || role === "both";

  useEffect(() => {
    document.documentElement.dataset.mode =
      resolvedTheme === "light" ? "day" : "night";
    document.documentElement.dataset.motion =
      journey.state.settings.reducedMotion === true ? "reduce" : "system";
    document.documentElement.style.colorScheme =
      resolvedTheme === "light" ? "light" : "dark";
  }, [journey.state.settings.reducedMotion, resolvedTheme]);

  useEffect(() => {
    setHaptics(journey.state.settings.haptics);
  }, [journey.state.settings.haptics]);

  useEffect(() => {
    journey.dispatch(
      journeyActions.navigate(location.pathname + location.search, {
        lessonId: selectedId || calendarLesson.id,
        episodeId:
          location.pathname.match(/\/episodio\/([^/]+)/)?.[1] || null,
      })
    );
    const routeTitle = titleForRoute(location);
    document.title = selectedId
      ? `${routeTitle} · ${lesson.title} · Escuela Sabática`
      : `${routeTitle} · Escuela Sabática`;
    // Dispatch only when navigation truly changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, selectedId, calendarLesson.id, lesson.title]);

  const toggleTheme = () => {
    journey.dispatch(
      journeyActions.setSettings({
        theme: resolvedTheme === "light" ? "dark" : "light",
      })
    );
  };

  const toggleTeacher = () => {
    journey.dispatch(
      journeyActions.setProfile({
        role: teacherMode ? "participant" : "both",
      })
    );
    if (!teacherMode) navigate(`/maestro/${lesson.id}`);
    else if (location.pathname.startsWith("/maestro/")) {
      navigate(`/leccion/${lesson.id}`);
    }
  };

  const motionMode = useMemo(() => {
    if (journey.state.settings.reducedMotion === true) return "always";
    if (journey.state.settings.reducedMotion === false) return "never";
    return "user";
  }, [journey.state.settings.reducedMotion]);

  return (
    <MotionConfig reducedMotion={motionMode}>
      <Backdrop stage={progress} />
      <AppShell
        quarterLabel="3er trimestre 2026"
        lessonNumber={lesson.number}
        lessonTitle={lesson.title}
        lessonDate={formatLong(lesson.forDate)}
        progress={progress}
        progressLabel={`${filledCount} de 8 piezas colocadas`}
        mode={resolvedTheme === "light" ? "day" : "night"}
        teacherMode={teacherMode}
        onOpenLessons={() => navigate("/lecciones")}
        onToggleMode={toggleTheme}
        onToggleTeacher={toggleTeacher}
        onOpenSettings={() => navigate("/ajustes")}
        getRouteTitle={titleForRoute}
      >
        {journey.storageError ? (
          <div className="storage-warning" role="alert">
            <strong>No pudimos confirmar el guardado.</strong>
            <span>
              Puedes seguir leyendo, pero descarga un respaldo antes de cerrar.
            </span>
            <button type="button" onClick={journey.clearStorageError}>
              Cerrar aviso
            </button>
          </div>
        ) : null}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </AppShell>
    </MotionConfig>
  );
}
