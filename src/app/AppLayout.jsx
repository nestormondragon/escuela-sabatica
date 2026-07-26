import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppShell from "./AppShell.jsx";
import PageTransition from "./PageTransition.jsx";
import Backdrop from "../components/Backdrop.jsx";
import WorldStage from "../features/world/WorldStage.jsx";
import { currentLessonSummary } from "../content/loadLesson.js";
import {
  lessonManifestForLocale,
  lessonSummaryById,
} from "../content/lessonManifest.generated.js";
import { setHaptics } from "../lib/haptics.js";
import { journeyActions, useJourney } from "../state/journey/index.js";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import { isRemovalLesson } from "../visual-world/lessonVisualManifest.js";

function routeLessonId(pathname) {
  return pathname.match(/^\/(?:leccion|maestro|presentar|sabado)\/(l\d+)/)?.[1] || null;
}

function routeOwnsWorld(pathname) {
  return pathname === "/hoy" || /^\/leccion\/l\d+/.test(pathname);
}

function titleForRoute(nextLocation, t) {
  const path = nextLocation.pathname;
  if (path === "/hoy") return t("route.today");
  if (path === "/mosaico") return t("route.mosaic");
  if (path === "/sabado" || path.startsWith("/sabado/"))
    return t("route.sabbath");
  if (path === "/lecciones") return t("route.lessons");
  if (path === "/ajustes") return t("route.settings");
  if (path.startsWith("/maestro/")) return t("route.teacher");
  if (path.startsWith("/presentar/")) return t("route.presentation");
  if (path.includes("/episodio/")) return t("route.episode");
  if (path.startsWith("/leccion/")) return t("route.lesson");
  return t("route.notFound");
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
  const { locale, t, formatLong } = useI18n();
  const systemDark = useSystemDark();
  const manifest = lessonManifestForLocale(locale);
  const calendarLesson = currentLessonSummary(undefined, locale);
  const selectedId = routeLessonId(location.pathname);
  const lesson = lessonSummaryById(selectedId, locale) || calendarLesson;
  const lessonRecord = journey.state.lessons[lesson.id];
  const filledCount = lessonRecord?.legacyKit
    ? Object.values(lessonRecord.legacyKit.slots || {}).filter(Boolean).length
    : 0;
  const progress = filledCount / 8;
  const previous = manifest[lesson.number - 2] || null;
  const next = manifest[lesson.number] || null;
  const showWorld = routeOwnsWorld(location.pathname);
  const episodeMode = location.pathname.includes("/episodio/");
  const removal = isRemovalLesson(lesson.id);
  const configuredTheme = journey.state.settings.theme;
  const textSize = journey.state.settings.textSize || "normal";
  const resolvedTheme =
    configuredTheme === "auto"
      ? systemDark
        ? "dark"
        : "light"
      : configuredTheme;
  const role = journey.state.profile.role;
  const teacherMode = role === "teacher" || role === "both";

  useEffect(() => {
    const root = document.documentElement;
    const dayMode = resolvedTheme === "light";
    root.dataset.mode = dayMode ? "day" : "night";
    root.dataset.textSize = textSize;
    root.dataset.motion =
      journey.state.settings.reducedMotion === true ? "reduce" : "system";
    root.style.colorScheme = dayMode ? "light" : "dark";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dayMode ? "#d5d5d1" : "#0d0f12");
  }, [journey.state.settings.reducedMotion, resolvedTheme, textSize]);

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
    const routeTitle = titleForRoute(location, t);
    document.title = selectedId
      ? `${routeTitle} · ${lesson.title} · ${t("app.name")}`
      : `${routeTitle} · ${t("app.name")}`;
    // Dispatch only when navigation truly changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, selectedId, calendarLesson.id, lesson.title, t]);

  const getRouteTitle = useCallback(
    (nextLocation) => titleForRoute(nextLocation, t),
    [t]
  );

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
        quarterLabel={t("app.quarter")}
        lessonNumber={lesson.number}
        lessonTitle={lesson.title}
        lessonDate={formatLong(lesson.forDate)}
        progress={progress}
        progressLabel={t(
          removal ? "context.regionsRevealed" : "context.piecesPlaced",
          {
            filled: filledCount,
            total: 8,
          }
        )}
        mode={resolvedTheme === "light" ? "day" : "night"}
        teacherMode={teacherMode}
        onOpenLessons={() => navigate("/lecciones")}
        onToggleMode={toggleTheme}
        onToggleTeacher={toggleTeacher}
        onOpenSettings={() => navigate("/ajustes")}
        getRouteTitle={getRouteTitle}
        mainClassName={showWorld ? "mcv-app-shell__main--world" : ""}
        world={
          showWorld ? (
            <WorldStage
              lesson={lesson}
              filled={filledCount}
              total={8}
              previous={previous}
              next={next}
              compact={episodeMode}
              priority
            />
          ) : null
        }
      >
        {journey.storageError ? (
          <div className="storage-warning" role="alert">
            <strong>{t("app.storage.title")}</strong>
            <span>{t("app.storage.body")}</span>
            <button type="button" onClick={journey.clearStorageError}>
              {t("app.storage.close")}
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
