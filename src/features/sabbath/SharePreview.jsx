import React, { useId, useMemo, useRef, useState } from "react";
import Icon from "../../components/Icon.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";

function safeFilePart(value) {
  return String(value || "folio")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54) || "folio";
}

export function shareTextFor(lesson, fields) {
  const lines = [
    `Lección ${lesson.number}: ${lesson.title}`,
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
  const reactId = useId().replace(/:/g, "");
  const titleId = `${reactId}-share-preview-title`;
  const previewRef = useRef(null);
  const [status, setStatus] = useState("");
  const text = useMemo(() => shareTextFor(lesson, fields), [fields, lesson]);
  const fileName = `folio-${safeFilePart(lesson.slug || lesson.title)}.png`;

  const report = (message) => {
    setStatus(message);
    onStatus?.(message);
  };

  const copy = async () => {
    try {
      await copyShareText(text);
      report("Selección copiada");
    } catch {
      report("No se pudo copiar aquí");
    }
  };

  const download = async () => {
    try {
      const dataUrl = await renderPreview(previewRef.current);
      downloadDataUrl(dataUrl, fileName);
      report("Imagen descargada");
    } catch {
      report("No se pudo crear la imagen aquí");
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
          title: `Lección ${lesson.number}: ${lesson.title}`,
          text: lesson.verse?.ref || "",
        });
        report("Imagen compartida");
        return;
      }

      downloadDataUrl(dataUrl, fileName);
      report("La imagen se descargó para que puedas compartirla");
    } catch (error) {
      if (error?.name === "AbortError" || error?.name === "NotAllowedError") {
        report("Compartir cancelado");
        return;
      }
      report("No se pudo compartir la imagen aquí");
    }
  };

  const print = () => {
    try {
      window.print();
    } catch {
      report("Usa la opción de imprimir del navegador");
    }
  };

  return (
    <section
      className={`sbf-share-preview ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="sbf-section-heading">
        <p className="sbf-kicker">Vista elegida</p>
        <h2 id={titleId}>Así sale de tu dispositivo</h2>
        <p>
          Solo aparece lo que marcaste. Tus demás respuestas permanecen en tu
          folio privado.
        </p>
      </div>

      {fields.length ? (
        <>
          <article className="sbf-share-card" ref={previewRef}>
            <div className="sbf-share-card__relief" aria-hidden="true">
              <LessonRelief lesson={lesson} stage={4} compact priority />
            </div>
            <header className="sbf-share-card__header">
              <p>Escuela Sabática</p>
              <span>Lección {lesson.number}</span>
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

          <div className="sbf-share-actions" aria-label="Opciones para compartir">
            <button type="button" className="sbf-button sbf-button--primary" onClick={share}>
              <Icon name="share" size={18} />
              Compartir imagen
            </button>
            <button type="button" className="sbf-button" onClick={copy}>
              <Icon name="copy" size={18} />
              Copiar texto
            </button>
            <button type="button" className="sbf-button" onClick={download}>
              <Icon name="download" size={18} />
              Descargar imagen
            </button>
            <button type="button" className="sbf-button" onClick={print}>
              <Icon name="printer" size={18} />
              Imprimir
            </button>
          </div>
        </>
      ) : (
        <div className="sbf-share-empty">
          <Icon name="lock" size={22} />
          <p>Nada está preparado para compartir.</p>
          <small>Elige al menos un campo en la sección anterior.</small>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
