import React from "react";
import Icon from "../../components/Icon.jsx";

/*
 * A visible text-first alternative to the spatial artifact. The closed
 * details element stays out of the accessibility tree, while the visual
 * mosaic itself remains a semantic ordered list.
 */
export default function SemanticMosaicList({
  items,
  selectedLessonId,
  onSelect,
  defaultOpen = false,
  className = "",
}) {
  return (
    <details className={`qm-list ${className}`.trim()} open={defaultOpen || undefined}>
      <summary>
        <span>Ver el trimestre como lista</span>
        <Icon name="chevron" size={16} />
      </summary>

      <ol>
        {items.map(({ lesson, panel }) => {
          const selected = lesson.id === selectedLessonId;
          return (
            <li key={lesson.id} data-selected={String(selected)}>
              <button
                type="button"
                aria-current={panel.current ? "step" : undefined}
                aria-pressed={selected}
                onClick={(event) => onSelect?.(lesson, panel, event)}
              >
                <span className="qm-list__number" aria-hidden="true">
                  {String(lesson.number).padStart(2, "0")}
                </span>
                <span className="qm-list__copy">
                  <strong>{lesson.title}</strong>
                  <span>
                    {panel.statusLabel}. {panel.filledCount} de {panel.total} piezas.
                  </span>
                </span>
                <span className="qm-list__mark" aria-hidden="true">
                  {panel.completed ? (
                    <Icon name="check" size={17} weight="bold" />
                  ) : (
                    <Icon name="chevron" size={16} />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
