import React from "react";
import Icon from "./Icon.jsx";

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
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="icon-btn" onClick={onHome} aria-label="Mi ancla" title="Mi ancla">
          <Icon name="anchor" size={21} />
        </button>
        <button
          className="brand"
          onClick={onOpenLessons}
          style={{ textAlign: "left", cursor: "pointer", flexDirection: "row", alignItems: "center", gap: 8 }}
          aria-label="Elegir lección"
          title="Elegir lección"
        >
          <span style={{ minWidth: 0 }}>
            <span className="ttl" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {title}
              <Icon name="chevron" size={14} style={{ transform: "rotate(90deg)", color: "var(--gold)", flex: "none" }} />
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
          onClick={onToggleMaestro}
          aria-label="Modo maestro"
          title="Guía para dirigir la clase"
        >
          <span className="track"><span className="knob" /></span>
        </button>
      </div>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </header>
  );
}
