import React, { forwardRef } from "react";
import Icon from "../../components/Icon.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";
import { isRemovalLesson } from "../../visual-world/lessonVisualManifest.js";

/*
 * One physical panel in the quarter artifact.
 *
 * The button remains rectangular so its keyboard outline and touch target are
 * never clipped. The irregular stone face is drawn by CSS beneath it.
 */
const MosaicPanel = forwardRef(function MosaicPanel(
  {
    lesson,
    panel,
    selected = false,
    tabIndex = -1,
    onSelect,
    onKeyDown,
    idPrefix = "quarter-mosaic",
  },
  ref
) {
  const { t } = useI18n();
  const removal = isRemovalLesson(lesson.id);
  const stateId = `${idPrefix}-${lesson.id}-state`;
  const stageLabel =
    lesson.stageLabel?.[lesson.stages?.[panel.stageIndex]] ||
    t("mosaic.stage", { stage: panel.stageIndex + 1, total: 5 });

  const labelParts = [
    `${t("common.lesson", { number: lesson.number })}, ${lesson.title}`,
    panel.statusLabel,
    t(removal ? "common.regions" : "common.pieces", {
      filled: panel.filledCount,
      total: panel.total,
    }),
    stageLabel,
  ].filter(Boolean);

  return (
    <button
      ref={ref}
      type="button"
      className="qm-panel"
      data-selected={String(selected)}
      data-current={String(panel.current)}
      data-completed={String(panel.completed)}
      data-active={String(panel.active)}
      data-upcoming={String(panel.upcoming)}
      data-revisited={String(panel.revisited)}
      data-connected={String(panel.connected)}
      data-motif={lesson.scene?.motif || lesson.motif || lesson.centerpiece || "mosaico"}
      aria-current={panel.current ? "step" : undefined}
      aria-pressed={selected}
      aria-label={labelParts.join(". ")}
      aria-describedby={stateId}
      tabIndex={tabIndex}
      onClick={(event) => onSelect?.(lesson, panel, event)}
      onKeyDown={onKeyDown}
    >
      <span className="qm-panel__stone" aria-hidden="true" />

      <span className="qm-panel__number" aria-hidden="true">
        {String(lesson.number).padStart(2, "0")}
      </span>

      <span className="qm-panel__state-mark" aria-hidden="true">
        {panel.completed ? (
          <Icon name="check" size={16} weight="bold" />
        ) : panel.revisited ? (
          <Icon name="refresh" size={15} weight="bold" />
        ) : panel.current ? (
          <span className="qm-panel__current-dot" />
        ) : panel.connected ? (
          <Icon name="path" size={15} weight="bold" />
        ) : null}
      </span>

      <span className="qm-panel__art" aria-hidden="true">
        <LessonRelief
          lesson={lesson}
          stage={panel.stageIndex}
          filled={panel.filledCount}
          total={panel.total}
          compact
          priority={selected || panel.current}
          className="qm-panel__relief"
        />
      </span>

      <span className="qm-panel__copy">
        <span className="qm-panel__eyebrow">
          {panel.primaryStatus}
        </span>
        <span className="qm-panel__title">{lesson.title}</span>
        <span className="qm-panel__stage">{stageLabel}</span>
      </span>

      <span
        className="qm-panel__meter"
        aria-hidden="true"
      >
        {Array.from({ length: panel.total }, (_, index) => (
          <i
            key={index}
            data-set={String(index < panel.filledCount)}
            aria-hidden="true"
          />
        ))}
      </span>

      <span id={stateId} className="qm-sr-only">
        {panel.statusLabel}. {stageLabel}.
      </span>
    </button>
  );
});

export default MosaicPanel;
