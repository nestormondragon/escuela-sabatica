import React from "react";
import Icon from "./Icon.jsx";
import { useToast } from "./Toast.jsx";

/* =================================================================
   Topbar — home/kit button, lesson brand, theme + maestro toggles,
   and the thin progress thread.
   ================================================================= */

export default function Topbar({
  title,
  subtitle,
  progress = 0,
  mode,
  onToggleMode,
  maestro,
  onToggleMaestro,
  onHome,
  onOpenLessons,
}) {
  const toast = useToast();
  const handleMaestro = () => {
    onToggleMaestro();
    // Immediate, visible confirmation — the facilitator guide only renders
    // inside a station, so without this the toggle felt like it did nothing.
    toast(
      maestro
        ? "Modo maestro desactivado"
        : "Modo maestro activado · guía para dirigir la clase"
    );
  };
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="icon-btn" onClick={onHome} aria-label="Mi ancla" title="Mi ancla">
          <Icon name="mosaic" size={20} />
        </button>
        <button
          className="brand"
          onClick={onOpenLessons}
          style={{ textAlign: "left", cursor: "pointer", flexDirection: "row", alignItems: "center", gap: 8, minHeight: 44 }}
          aria-label="Elegir lección"
          title="Elegir lección"
        >
          <span style={{ minWidth: 0 }}>
            <span className="ttl" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {title}
              <Icon name="chevron" size={14} style={{ transform: "rotate(90deg)", color: "var(--clay)", flex: "none" }} />
            </span>
            {subtitle ? <span className="sub2">{subtitle}</span> : null}
          </span>
        </button>

        <button
          className="icon-btn"
          onClick={onToggleMode}
          aria-label={mode === "day" ? "Modo noche" : "Modo día"}
          title={mode === "day" ? "Modo noche" : "Modo día"}
        >
          <Icon name={mode === "day" ? "moon" : "sun"} size={19} />
        </button>

        <button
          className="switch"
          aria-pressed={maestro}
          onClick={handleMaestro}
          aria-label="Modo maestro · guía para dirigir la clase"
          title="Modo maestro · guía para dirigir la clase"
        >
          <span className="switch-label">Maestro</span>
          <span className="track"><span className="knob" /></span>
        </button>
      </div>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </header>
  );
}
