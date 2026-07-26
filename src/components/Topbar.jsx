import React from "react";
import Icon from "./Icon.jsx";
import { useToast } from "./Toast.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

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
  const { t } = useI18n();
  const toast = useToast();
  const handleMaestro = () => {
    onToggleMaestro();
    // Immediate, visible confirmation — the facilitator guide only renders
    // inside a station, so without this the toggle felt like it did nothing.
    toast(
      maestro
        ? t("legacy.teacherOff")
        : t("legacy.teacherOn")
    );
  };
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="icon-btn" onClick={onHome} aria-label={t("legacy.myMosaic")} title={t("legacy.myMosaic")}>
          <Icon name="mosaic" size={20} />
        </button>
        <button
          className="brand"
          onClick={onOpenLessons}
          style={{ textAlign: "left", cursor: "pointer", flexDirection: "row", alignItems: "center", gap: 8, minHeight: 44 }}
          aria-label={t("context.chooseLesson")}
          title={t("context.chooseLesson")}
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
          aria-label={mode === "day" ? t("context.useNight") : t("context.useDay")}
          title={mode === "day" ? t("context.useNight") : t("context.useDay")}
        >
          <Icon name={mode === "day" ? "moon" : "sun"} size={19} />
        </button>

        <button
          className="switch"
          aria-pressed={maestro}
          onClick={handleMaestro}
          aria-label={t("maestro.heading")}
          title={t("maestro.heading")}
        >
          <span className="switch-label">{t("context.teacher")}</span>
          <span className="track"><span className="knob" /></span>
        </button>
      </div>
      <div className="progress">
        <div
          className="progress-fill"
          style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress))})` }}
        />
      </div>
    </header>
  );
}
