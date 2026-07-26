import React, { useEffect, useId, useMemo, useState } from "react";
import { stageIndexFor } from "../../components/Centerpiece.jsx";
import Icon from "../../components/Icon.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";
import PresentationPreview from "./PresentationPreview.jsx";
import SharePreview from "./SharePreview.jsx";
import "./sabbath.css";

export const SABBATH_FIELDS = Object.freeze([
  {
    id: "pattern",
    label: "El patrón que vi",
    shortLabel: "Patrón",
    rows: 4,
  },
  {
    id: "tarjeta",
    label: "Mi frase para llevar",
    shortLabel: "Frase",
    rows: 4,
  },
  {
    id: "pregunta",
    label: "Mi pregunta para la clase",
    shortLabel: "Pregunta",
    rows: 4,
  },
  {
    id: "accion24",
    label: "Mi paso de 24 horas",
    shortLabel: "Paso",
    rows: 3,
  },
  {
    id: "oracion",
    label: "Mi oración",
    shortLabel: "Oración",
    rows: 6,
  },
  {
    id: "aliento",
    label: "Mi mensaje de aliento",
    shortLabel: "Mensaje",
    rows: 5,
  },
  {
    id: "verse",
    label: "Texto bíblico",
    shortLabel: "Versículo",
    rows: 3,
    readOnly: true,
  },
  {
    id: "otherPerson",
    label: "Persona que nombré",
    shortLabel: "Nombre personal",
    rows: 2,
    otherPerson: true,
  },
]);

const FIELD_IDS = new Set(SABBATH_FIELDS.map((field) => field.id));

function unwrap(value) {
  if (
    value &&
    typeof value === "object" &&
    Object.prototype.hasOwnProperty.call(value, "value")
  ) {
    return value.value;
  }
  return value;
}

function sourceFields(savedPack) {
  return (
    savedPack?.fields ||
    savedPack?.drafts ||
    savedPack?.outputs ||
    {}
  );
}

function findOtherPerson(lesson, state) {
  const module = (lesson?.stations || [])
    .map((station) => station.module)
    .find((candidate) => candidate?.personExtraKey);
  if (!module) return null;
  return {
    key: module.personExtraKey,
    label: module.personPrompt || "Persona que nombré",
    value: state?.extra?.[module.personExtraKey] || "",
  };
}

function incompleteDefaults(lesson, state, verse) {
  const answered = (lesson?.slots || [])
    .map((slot) => ({
      ...slot,
      value: String(state?.slots?.[slot.id] || "").trim(),
    }))
    .filter((slot) => slot.value);
  const latest = answered.at(-1);
  const total = lesson?.slots?.length || 8;
  const firstName = String(state?.userName || "").trim().split(/\s+/)[0];

  if (!latest) {
    return {
      pattern: "",
      oracion: "",
      aliento: "",
      accion24: "",
      pregunta: "",
      tarjeta: "",
      verse,
    };
  }

  const label = String(latest.label || "esta parte de tu semana").toLowerCase();
  const encouragementLead = firstName ? `${firstName}, no` : "No";

  return {
    pattern: `Has colocado ${answered.length} de ${total} piezas. Hasta aquí pudiste nombrar ${label}: «${latest.value}».`,
    oracion: `Señor, te entrego lo que ya pude nombrar: «${latest.value}». Sigue formando en mí lo que todavía no sé decir. Amén.`,
    aliento: `${encouragementLead} tienes que terminar todo hoy. Haber nombrado «${latest.value}» ya es una forma de traerlo a la luz.`,
    accion24: "",
    pregunta: `¿Qué cambia en tu semana al reconocer «${latest.value}»?`,
    tarjeta: `La pieza que llevo por ahora: «${latest.value}».\nVersículo: ${verse}`,
    verse,
  };
}

export function buildSabbathPack(lesson, legacyKit, savedPack) {
  const state = legacyKit || {};
  const outputs = lesson?.outputs?.(state) || {};
  const savedFields = sourceFields(savedPack);
  const otherPerson = findOtherPerson(lesson, state);
  const verse = lesson?.verse
    ? `«${lesson.verse.text}» (${lesson.verse.ref})`
    : "";
  const filledCount = (lesson?.slots || []).filter(
    (slot) => String(state?.slots?.[slot.id] || "").trim()
  ).length;
  const totalSlots = lesson?.slots?.length || 8;
  const completeDefaults = {
    pattern: lesson?.pattern?.(state) || "",
    oracion: outputs.oracion || "",
    aliento: outputs.aliento || "",
    accion24: outputs.accion24 || "",
    pregunta: outputs.pregunta || "",
    tarjeta: outputs.tarjeta || "",
    verse,
    otherPerson: otherPerson?.value || "",
  };
  const defaults =
    filledCount === totalSlots
      ? completeDefaults
      : {
          ...completeDefaults,
          ...incompleteDefaults(lesson, state, verse),
          otherPerson: otherPerson?.value || "",
        };
  const fields = {};

  SABBATH_FIELDS.forEach(({ id }) => {
    const savedValue = unwrap(savedFields[id]);
    fields[id] =
      savedValue === undefined || savedValue === null
        ? defaults[id]
        : String(savedValue);
  });

  const rawSelection =
    savedPack?.selectedFieldIds ||
    savedPack?.shareSelection ||
    savedPack?.selectedFields ||
    [];

  return {
    ...(savedPack || {}),
    version: 1,
    lessonId: lesson.id,
    sourceFilledCount: filledCount,
    sourceTotalSlots: totalSlots,
    fields,
    fieldLabels: {
      ...(savedPack?.fieldLabels || {}),
      ...(otherPerson ? { otherPerson: otherPerson.label } : {}),
    },
    fieldPrivacy: Object.fromEntries(
      SABBATH_FIELDS.map((field) => [
        field.id,
        field.otherPerson
          ? "requires-consent"
          : field.readOnly
            ? "public-source"
            : "shareable-choice",
      ])
    ),
    otherPersonSource:
      otherPerson || savedPack?.otherPersonSource || null,
    selectedFieldIds: Array.isArray(rawSelection)
      ? rawSelection.filter((id) => FIELD_IDS.has(id))
      : [],
    otherPersonConsent: Boolean(savedPack?.otherPersonConsent),
    updatedAt: savedPack?.updatedAt || null,
  };
}

export function selectedSabbathFields(pack) {
  const selected = new Set(pack?.selectedFieldIds || []);
  return SABBATH_FIELDS.filter(
    (definition) =>
      selected.has(definition.id) &&
      (!definition.otherPerson || pack?.otherPersonConsent)
  )
    .map((definition) => ({
      ...definition,
      label: pack?.fieldLabels?.[definition.id] || definition.label,
      value: String(pack?.fields?.[definition.id] || "").trim(),
    }))
    .filter((field) => field.value);
}

export default function SabbathFolio({
  lesson,
  legacyKit,
  state,
  savedPack,
  onSavePack,
  onBack,
  onPresent,
}) {
  const reactId = useId().replace(/:/g, "");
  const titleId = `${reactId}-folio-title`;
  const privateTitleId = `${reactId}-private-title`;
  const selectTitleId = `${reactId}-select-title`;
  const studyState = legacyKit || state || {};
  const [pack, setPack] = useState(() =>
    buildSabbathPack(lesson, studyState, savedPack)
  );
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    setPack(buildSabbathPack(lesson, studyState, savedPack));
    setPresentationOpen(false);
    setSaveStatus("");
    // A route change creates a new folio. Edits within the same lesson remain
    // local so a parent persistence render cannot move the textarea cursor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  const persist = (nextPack, message = "Cambios guardados en este navegador") => {
    const saved = {
      ...nextPack,
      updatedAt: new Date().toISOString(),
    };
    setPack(saved);
    onSavePack?.(saved);
    setSaveStatus(message);
    return saved;
  };

  const updateField = (id, value) => {
    setPack((current) => ({
      ...current,
      fields: { ...current.fields, [id]: value },
    }));
    setSaveStatus("Cambios pendientes");
  };

  const toggleSelection = (id) => {
    const current = new Set(pack.selectedFieldIds);
    if (current.has(id)) current.delete(id);
    else current.add(id);
    persist({
      ...pack,
      selectedFieldIds: [...current],
      otherPersonConsent:
        id === "otherPerson" && !current.has("otherPerson")
          ? false
          : pack.otherPersonConsent,
    });
  };

  const setConsent = (checked) => {
    persist({ ...pack, otherPersonConsent: checked });
  };

  const selectedFields = useMemo(() => selectedSabbathFields(pack), [pack]);
  const visibleFields = useMemo(
    () =>
      SABBATH_FIELDS.filter(
        (field) =>
          field.id !== "otherPerson" ||
          pack.otherPersonSource ||
          pack.fields.otherPerson
      ),
    [pack.fields.otherPerson, pack.otherPersonSource]
  );
  const hasOtherPersonSelection =
    pack.selectedFieldIds.includes("otherPerson");
  const selectionReady =
    selectedFields.length > 0 &&
    (!hasOtherPersonSelection || pack.otherPersonConsent);

  const openPresentation = () => {
    if (!selectionReady) return;
    onPresent?.({
      lessonId: lesson.id,
      fields: selectedFields,
      pack,
    });
    setPresentationOpen(true);
  };

  const back = () => {
    persist(pack);
    onBack?.();
  };

  return (
    <>
      <section className="sbf-folio" aria-labelledby={titleId}>
        <header className="sbf-hero">
          <button type="button" className="sbf-back" onClick={back}>
            <Icon name="arrowLeft" size={18} />
            Volver
          </button>

          <div className="sbf-hero__copy">
            <p className="sbf-kicker">Tu síntesis de la semana</p>
            <h1 id={titleId}>Folio del sábado</h1>
            <p>
              Reúne lo que descubriste, decide qué llevar a la clase y deja lo
              demás en privado.
            </p>
          </div>

          <div className="sbf-hero__motif" aria-hidden="true">
            <LessonRelief
              lesson={lesson}
              stage={stageIndexFor(pack.sourceFilledCount)}
              compact
              priority
            />
          </div>
        </header>

        <div className="sbf-privacy-note">
          <Icon name="lock" size={18} />
          <div>
            <strong>Privado hasta que tú elijas.</strong>
            <p>
              Editar este folio no comparte nada. La presentación usa solo los
              campos que marques de forma explícita.
            </p>
          </div>
        </div>

        <div className="sbf-folio__grid">
          <section className="sbf-editor" aria-labelledby={privateTitleId}>
            <div className="sbf-section-heading">
              <p className="sbf-kicker">Mesa privada</p>
              <h2 id={privateTitleId}>Ponlo en tus palabras</h2>
              <p>
                Estas frases se armaron con tus respuestas. Puedes corregirlas
                sin cambiar el resto de tu recorrido.
              </p>
            </div>

            <div className="sbf-editor__fields">
              {visibleFields.map((field) => (
                <article
                  key={field.id}
                  className="sbf-edit-field"
                  data-other-person={field.otherPerson ? "true" : undefined}
                >
                  <div className="sbf-edit-field__heading">
                    <label htmlFor={`${reactId}-${field.id}`}>
                      {pack.fieldLabels?.[field.id] || field.label}
                    </label>
                    <span>
                      {field.otherPerson
                        ? "Revisión especial"
                        : field.readOnly
                          ? "Fuente pública"
                          : "Privado"}
                    </span>
                  </div>
                  <textarea
                    id={`${reactId}-${field.id}`}
                    rows={field.rows}
                    value={pack.fields[field.id]}
                    readOnly={field.readOnly}
                    onChange={(event) =>
                      updateField(field.id, event.target.value)
                    }
                    onBlur={() => persist(pack, "Folio actualizado")}
                  />
                  {field.otherPerson ? (
                    <p className="sbf-field-note">
                      Antes de compartir, pide permiso o cambia el nombre por
                      una referencia anónima.
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <aside className="sbf-share-builder" aria-labelledby={selectTitleId}>
            <div className="sbf-section-heading">
              <p className="sbf-kicker">Selección de salida</p>
              <h2 id={selectTitleId}>¿Qué quieres llevar?</h2>
              <p>
                Nada está seleccionado al abrir el folio. Marca únicamente lo
                que quieras mostrar.
              </p>
            </div>

            <fieldset className="sbf-selector">
              <legend className="sr-only">Campos elegidos para presentar</legend>
              {visibleFields.map((field) => {
                const checked = pack.selectedFieldIds.includes(field.id);
                return (
                  <label
                    key={field.id}
                    className="sbf-selector__choice"
                    data-checked={checked ? "true" : "false"}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSelection(field.id)}
                    />
                    <span className="sbf-selector__mark" aria-hidden="true">
                      {checked ? <Icon name="check" size={16} weight="bold" /> : null}
                    </span>
                    <span>
                      <strong>{field.shortLabel}</strong>
                      <small>
                        {field.otherPerson
                          ? "Puede contener detalles de otra persona"
                          : "Se mostrará tal como quedó editado"}
                      </small>
                    </span>
                  </label>
                );
              })}
            </fieldset>

            {hasOtherPersonSelection ? (
              <label className="sbf-consent">
                <input
                  type="checkbox"
                  checked={pack.otherPersonConsent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>
                  Revisé este campo. Tengo permiso para mostrarlo o lo dejé
                  anónimo.
                </span>
              </label>
            ) : null}

            <div className="sbf-selection-summary" aria-live="polite">
              <span>{selectedFields.length}</span>
              <p>
                {selectedFields.length === 1
                  ? "campo listo para presentar"
                  : "campos listos para presentar"}
              </p>
            </div>

            <button
              type="button"
              className="sbf-button sbf-button--primary sbf-present"
              disabled={!selectionReady}
              onClick={openPresentation}
            >
              <Icon name="sunrise" size={19} />
              Abrir modo presentación
            </button>

            {!selectionReady ? (
              <p className="sbf-present-hint">
                {hasOtherPersonSelection && !pack.otherPersonConsent
                  ? "Confirma la revisión del mensaje antes de presentar."
                  : "Elige al menos un campo para continuar."}
              </p>
            ) : null}

            <p className="sbf-save-status" aria-live="polite">
              {saveStatus}
            </p>
          </aside>
        </div>

        <SharePreview lesson={lesson} fields={selectedFields} />
      </section>

      <PresentationPreview
        lesson={lesson}
        fields={selectedFields}
        open={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />
    </>
  );
}
