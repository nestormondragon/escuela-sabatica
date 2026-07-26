import React from "react";
import { GearSix } from "@phosphor-icons/react";
import Icon from "../components/Icon.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

function UtilityButton({
  label,
  compactLabel,
  icon,
  onClick,
  pressed,
  children,
}) {
  if (typeof onClick !== "function") return null;

  return (
    <button
      type="button"
      className="mcv-context-rail__utility"
      onClick={onClick}
      aria-label={label}
      title={label}
      {...(typeof pressed === "boolean" ? { "aria-pressed": pressed } : {})}
    >
      {icon}
      <span className="mcv-context-rail__utility-label">
        {compactLabel || children}
      </span>
    </button>
  );
}

/**
 * Compact lesson context on mobile and a persistent navigation rail on desktop.
 * All mutations stay in the owner through callbacks.
 */
export default function ContextRail({
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
  navigation,
}) {
  const { t } = useI18n();
  const lessonLabel =
    lessonNumber == null
      ? t("context.chooseLesson")
      : t("context.lesson", { number: lessonNumber });
  const clampedProgress =
    typeof progress === "number" ? Math.max(0, Math.min(1, progress)) : null;

  return (
    <aside className="mcv-context-rail" aria-label={t("context.label")}>
      <div className="mcv-context-rail__brand">
        <span className="mcv-context-rail__eyebrow">{t("context.corinth")}</span>
        <span className="mcv-context-rail__quarter">
          {quarterLabel || t("app.quarter")}
        </span>
      </div>

      <button
        type="button"
        className="mcv-context-rail__lesson"
        onClick={onOpenLessons}
        disabled={typeof onOpenLessons !== "function"}
        aria-label={t("context.openLessonPicker", { lesson: lessonLabel })}
      >
        <span className="mcv-context-rail__lesson-copy">
          <span className="mcv-context-rail__lesson-number">
            {lessonLabel}
          </span>
          {lessonTitle ? (
            <span className="mcv-context-rail__lesson-title">
              {lessonTitle}
            </span>
          ) : null}
          {lessonDate ? (
            <span className="mcv-context-rail__lesson-date">{lessonDate}</span>
          ) : null}
        </span>
        {typeof onOpenLessons === "function" ? (
          <Icon
            name="chevron"
            size={15}
            className="mcv-context-rail__lesson-caret"
          />
        ) : null}
      </button>

      {clampedProgress != null ? (
        <div
          className="mcv-context-rail__progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(clampedProgress * 100)}
          aria-label={progressLabel || t("context.lessonProgress")}
        >
          <span
            className="mcv-context-rail__progress-fill"
            style={{ "--mcv-progress": clampedProgress }}
          />
        </div>
      ) : null}

      <div className="mcv-context-rail__navigation">{navigation}</div>

      <div
        className="mcv-context-rail__utilities"
        role="toolbar"
        aria-label={t("context.tools")}
      >
        <UtilityButton
          label={mode === "day" ? t("context.useNight") : t("context.useDay")}
          compactLabel={mode === "day" ? t("context.night") : t("context.day")}
          onClick={onToggleMode}
          pressed={mode === "day"}
          icon={<Icon name={mode === "day" ? "moon" : "sun"} size={19} />}
        />
        <UtilityButton
          label={
            teacherMode
              ? t("context.teacherOff")
              : t("context.teacherOn")
          }
          compactLabel={t("context.teacher")}
          onClick={onToggleTeacher}
          pressed={teacherMode}
          icon={<Icon name="book" size={19} />}
        />
        <UtilityButton
          label={t("context.openSettings")}
          compactLabel={t("context.settings")}
          onClick={onOpenSettings}
          icon={
            <GearSix
              size={19}
              weight="regular"
              aria-hidden="true"
              focusable="false"
            />
          }
        />
      </div>
    </aside>
  );
}
