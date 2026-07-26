import React, { useId, useMemo, useRef, useState } from "react";
import Icon from "../../components/Icon.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";
import { translateMessage } from "../../i18n/messages.js";

function safeFilePart(value) {
  return String(value || "folio")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54) || "folio";
}

export function shareTextFor(lesson, fields, locale = "es") {
  const lines = [
    `${translateMessage(locale, "common.lesson", { number: lesson.number })}: ${lesson.title}`,
    lesson.verse?.ref || "",
    "",
  ];

  fields.forEach((field) => {
    lines.push(field.label, String(field.value || "").trim(), "");
  });

  return lines.join("\n").trim();
}

export async function copyShareText(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard unavailable");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard unavailable");
}

async function renderPreview(node) {
  if (!node) throw new Error("Preview unavailable");
  const { toPng } = await import("html-to-image");
  return toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#191c22",
  });
}

function downloadDataUrl(dataUrl, fileName) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export default function SharePreview({
  lesson,
  fields = [],
  onStatus,
  className = "",
}) {
  const { locale, t } = useI18n();
  const reactId = useId().replace(/:/g, "");
  const titleId = `${reactId}-share-preview-title`;
  const previewRef = useRef(null);
  const [status, setStatus] = useState("");
  const text = useMemo(
    () => shareTextFor(lesson, fields, locale),
    [fields, lesson, locale]
  );
  const fileName = `folio-${safeFilePart(lesson.slug || lesson.title)}.png`;

  const report = (message) => {
    setStatus(message);
    onStatus?.(message);
  };

  const copy = async () => {
    try {
      await copyShareText(text);
      report(t("share.copied"));
    } catch {
      report(t("share.copyFailed"));
    }
  };

  const download = async () => {
    try {
      const dataUrl = await renderPreview(previewRef.current);
      downloadDataUrl(dataUrl, fileName);
      report(t("share.downloaded"));
    } catch {
      report(t("share.imageFailed"));
    }
  };

  const share = async () => {
    try {
      const dataUrl = await renderPreview(previewRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: "image/png" });

      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: `${t("common.lesson", { number: lesson.number })}: ${lesson.title}`,
          text: lesson.verse?.ref || "",
        });
        report(t("share.shared"));
        return;
      }

      downloadDataUrl(dataUrl, fileName);
      report(t("share.downloadFallback"));
    } catch (error) {
      if (error?.name === "AbortError" || error?.name === "NotAllowedError") {
        report(t("share.cancelled"));
        return;
      }
      report(t("share.failed"));
    }
  };

  const print = () => {
    try {
      window.print();
    } catch {
      report(t("share.printHint"));
    }
  };

  return (
    <section
      className={`sbf-share-preview ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="sbf-section-heading">
        <p className="sbf-kicker">{t("share.kicker")}</p>
        <h2 id={titleId}>{t("share.title")}</h2>
        <p>{t("share.body")}</p>
      </div>

      {fields.length ? (
        <>
          <article className="sbf-share-card" ref={previewRef}>
            <div className="sbf-share-card__relief" aria-hidden="true">
              <LessonRelief
                lesson={lesson}
                stage={4}
                filled={8}
                compact
                priority
              />
            </div>
            <header className="sbf-share-card__header">
              <p>{t("app.name")}</p>
              <span>{t("common.lesson", { number: lesson.number })}</span>
              <h3>{lesson.title}</h3>
              <small>{lesson.verse?.ref}</small>
            </header>

            <div className="sbf-share-card__fields">
              {fields.map((field) => (
                <section key={field.id} className="sbf-share-card__field">
                  <h4>{field.label}</h4>
                  <p>{field.value}</p>
                </section>
              ))}
            </div>
          </article>

          <div className="sbf-share-actions" aria-label={t("share.options")}>
            <button type="button" className="sbf-button sbf-button--primary" onClick={share}>
              <Icon name="share" size={18} />
              {t("share.image")}
            </button>
            <button type="button" className="sbf-button" onClick={copy}>
              <Icon name="copy" size={18} />
              {t("share.copy")}
            </button>
            <button type="button" className="sbf-button" onClick={download}>
              <Icon name="download" size={18} />
              {t("share.download")}
            </button>
            <button type="button" className="sbf-button" onClick={print}>
              <Icon name="printer" size={18} />
              {t("share.print")}
            </button>
          </div>
        </>
      ) : (
        <div className="sbf-share-empty">
          <Icon name="lock" size={22} />
          <p>{t("share.empty")}</p>
          <small>{t("share.emptyHelp")}</small>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
