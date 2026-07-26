import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "../../components/Icon.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";

export default function PresentationPreview({
  lesson,
  fields = [],
  open = false,
  onClose,
}) {
  const { t } = useI18n();
  const reactId = useId().replace(/:/g, "");
  const titleId = `${reactId}-presentation-title`;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key !== "Tab") return;
      const focusable = [
        ...(dialogRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || []),
      ].filter((node) => !node.disabled && node.getAttribute("aria-hidden") !== "true");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, open]);

  if (!open) return null;

  const presentation = (
    <section
      ref={dialogRef}
      className="sbf-presentation"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="sbf-presentation__topline">
        <p>{t("common.lesson", { number: lesson.number })}</p>
        <button
          ref={closeRef}
          type="button"
          className="sbf-presentation__close"
          onClick={onClose}
          aria-label={t("presentation.close")}
        >
          <Icon name="close" size={24} />
        </button>
      </div>

      <header className="sbf-presentation__header">
        <div className="sbf-presentation__relief" aria-hidden="true">
          <LessonRelief lesson={lesson} stage={4} filled={8} priority />
        </div>
        <div className="sbf-presentation__title">
          <span>{t("presentation.community")}</span>
          <h2 id={titleId}>{lesson.title}</h2>
          <p>{lesson.verse?.ref}</p>
        </div>
      </header>

      <div className="sbf-presentation__grid">
        {fields.map((field, index) => (
          <article
            key={field.id}
            className="sbf-presentation__field"
            style={{ "--sbf-field-index": index }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{field.label}</h3>
              <p>{field.value}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="sbf-presentation__footer">
        <p>{t("presentation.footer")}</p>
        <cite>{lesson.verse?.ref}</cite>
      </footer>
    </section>
  );

  return typeof document === "undefined"
    ? presentation
    : createPortal(presentation, document.body);
}
