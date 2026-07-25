import React from "react";
import { Outlet } from "react-router-dom";
import ContextRail from "./ContextRail.jsx";
import PrimaryNav from "./PrimaryNav.jsx";
import RouteAnnouncer from "./RouteAnnouncer.jsx";
import "./app-shell.css";

/**
 * Responsive application frame.
 *
 * Pass `world` when a surface benefits from the desktop world and study split.
 * Without it, the route owns the full canvas width.
 */
export default function AppShell({
  children,
  world,
  quarterLabel,
  lessonNumber,
  lessonTitle,
  lessonDate,
  progress,
  progressLabel,
  mode = "night",
  teacherMode = false,
  onOpenLessons,
  onToggleMode,
  onToggleTeacher,
  onOpenSettings,
  getRouteTitle,
  mainClassName = "",
}) {
  const content = children ?? <Outlet />;
  const navigation = <PrimaryNav variant="rail" />;

  return (
    <div className="mcv-app-shell">
      <a className="mcv-skip-link" href="#contenido-principal">
        Saltar al contenido
      </a>

      <div className="mcv-app-shell__frame">
        <ContextRail
          quarterLabel={quarterLabel}
          lessonNumber={lessonNumber}
          lessonTitle={lessonTitle}
          lessonDate={lessonDate}
          progress={progress}
          progressLabel={progressLabel}
          mode={mode}
          teacherMode={teacherMode}
          onOpenLessons={onOpenLessons}
          onToggleMode={onToggleMode}
          onToggleTeacher={onToggleTeacher}
          onOpenSettings={onOpenSettings}
          navigation={navigation}
        />

        <main
          id="contenido-principal"
          className={`mcv-app-shell__main ${mainClassName}`.trim()}
          tabIndex={-1}
        >
          {world ? (
            <div className="mcv-app-shell__split">
              <aside
                className="mcv-app-shell__world"
                aria-label="Mosaico y motivo de la lección"
              >
                {world}
              </aside>
              <div className="mcv-app-shell__canvas">{content}</div>
            </div>
          ) : (
            content
          )}
        </main>
      </div>

      <div className="mcv-app-shell__dock">
        <PrimaryNav variant="dock" />
      </div>

      <RouteAnnouncer getRouteTitle={getRouteTitle} />
    </div>
  );
}
