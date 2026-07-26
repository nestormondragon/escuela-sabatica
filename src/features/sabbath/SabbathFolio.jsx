import React, { useEffect, useId, useMemo, useState } from "react";
import { Reorder, motion } from "framer-motion";
import { stageIndexFor } from "../../components/Centerpiece.jsx";
import Icon from "../../components/Icon.jsx";
import LessonRelief from "../../visual-world/LessonRelief.jsx";
import PresentationPreview from "./PresentationPreview.jsx";
import SharePreview from "./SharePreview.jsx";
import "./sabbath.css";
import "./sabbath-assembly.css";
import { useI18n } from "../../i18n/LocaleProvider.jsx";
import {
  normalizeLocale,
  translateMessage,
} from "../../i18n/messages.js";
import { lcFirst } from "../../lib/name.js";

const SABBATH_FIELD_SPECS = Object.freeze([
  {
    id: "pattern",
    labelKey: "sbf.field.pattern",
    shortLabelKey: "sbf.field.patternShort",
    rows: 4,
  },
  {
    id: "tarjeta",
    labelKey: "sbf.field.card",
    shortLabelKey: "sbf.field.cardShort",
    rows: 4,
  },
  {
    id: "pregunta",
    labelKey: "sbf.field.question",
    shortLabelKey: "sbf.field.questionShort",
    rows: 4,
  },
  {
    id: "accion24",
    labelKey: "sbf.field.action",
    shortLabelKey: "sbf.field.actionShort",
    rows: 3,
  },
  {
    id: "oracion",
    labelKey: "sbf.field.prayer",
    shortLabelKey: "sbf.field.prayerShort",
    rows: 6,
  },
  {
    id: "aliento",
    labelKey: "sbf.field.encouragement",
    shortLabelKey: "sbf.field.encouragementShort",
    rows: 5,
  },
  {
    id: "verse",
    labelKey: "sbf.field.verse",
    shortLabelKey: "sbf.field.verseShort",
    rows: 3,
    readOnly: true,
  },
  {
    id: "otherPerson",
    labelKey: "sbf.field.person",
    shortLabelKey: "sbf.field.personShort",
    rows: 2,
    otherPerson: true,
  },
]);

export function sabbathFieldsForLocale(locale = "es") {
  return SABBATH_FIELD_SPECS.map((field) => ({
    ...field,
    label: translateMessage(locale, field.labelKey),
    shortLabel: translateMessage(locale, field.shortLabelKey),
  }));
}

export const SABBATH_FIELDS = Object.freeze(sabbathFieldsForLocale("es"));

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

function findOtherPerson(lesson, state, locale) {
  const module = (lesson?.stations || [])
    .map((station) => station.module)
    .find((candidate) => candidate?.personExtraKey);
  if (!module) return null;
  return {
    key: module.personExtraKey,
    label: module.personPrompt || translateMessage(locale, "sbf.field.person"),
    value: state?.extra?.[module.personExtraKey] || "",
  };
}

function incompleteDefaults(lesson, state, verse, locale) {
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

  const label = String(
    latest.label || translateMessage(locale, "sbf.incompleteLabel")
  );
  const sentenceLabel = lcFirst(label);
  const encouragementLead =
    locale === "en"
      ? firstName
        ? `${firstName}, you`
        : translateMessage(locale, "sbf.no")
      : firstName
        ? `${firstName}, no`
        : translateMessage(locale, "sbf.no");

  return {
    pattern: translateMessage(locale, "sbf.partialPattern", {
      answered: answered.length,
      total,
      label: sentenceLabel,
      value: latest.value,
    }),
    oracion: translateMessage(locale, "sbf.partialPrayer", {
      value: latest.value,
    }),
    aliento: translateMessage(locale, "sbf.partialEncouragement", {
      lead: encouragementLead,
      value: latest.value,
    }),
    accion24: "",
    pregunta: translateMessage(locale, "sbf.partialQuestion", {
      value: latest.value,
    }),
    tarjeta: translateMessage(locale, "sbf.partialCard", {
      value: latest.value,
      verse,
    }),
    verse,
  };
}

export function buildSabbathPack(lesson, legacyKit, savedPack, locale = "es") {
  const normalizedLocale = normalizeLocale(locale);
  const fieldsForLocale = sabbathFieldsForLocale(normalizedLocale);
  const state = legacyKit || {};
  const outputs = lesson?.outputs?.(state) || {};
  const savedFields = sourceFields(savedPack);
  const editedFieldIds = new Set(savedPack?.editedFieldIds || []);
  const otherPerson = findOtherPerson(lesson, state, normalizedLocale);
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
          ...incompleteDefaults(lesson, state, verse, normalizedLocale),
          otherPerson: otherPerson?.value || "",
        };
  const fields = {};

  fieldsForLocale.forEach(({ id, readOnly, otherPerson: personField }) => {
    const savedValue = unwrap(savedFields[id]);
    const localeChanged =
      savedPack?.sourceLocale &&
      normalizeLocale(savedPack.sourceLocale) !== normalizedLocale;
    const shouldRegenerate =
      readOnly ||
      (localeChanged && !editedFieldIds.has(id) && !personField);
    fields[id] =
      savedValue === undefined || savedValue === null || shouldRegenerate
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
    sourceLocale: normalizedLocale,
    editedFieldIds: [...editedFieldIds].filter((id) => FIELD_IDS.has(id)),
    sourceFilledCount: filledCount,
    sourceTotalSlots: totalSlots,
    fields,
    fieldLabels: {
      ...(savedPack?.fieldLabels || {}),
      ...(otherPerson ? { otherPerson: otherPerson.label } : {}),
    },
    fieldPrivacy: Object.fromEntries(
      fieldsForLocale.map((field) => [
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

export function selectedSabbathFields(pack, locale = "es") {
  const definitions = new Map(
    sabbathFieldsForLocale(locale).map((definition) => [
      definition.id,
      definition,
    ])
  );
  return (pack?.selectedFieldIds || [])
    .map((id) => definitions.get(id))
    .filter(
      (definition) =>
        definition &&
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
  const { locale, t } = useI18n();
  const reactId = useId().replace(/:/g, "");
  const titleId = `${reactId}-folio-title`;
  const privateTitleId = `${reactId}-private-title`;
  const selectTitleId = `${reactId}-select-title`;
  const studyState = legacyKit || state || {};
  const [pack, setPack] = useState(() =>
    buildSabbathPack(lesson, studyState, savedPack, locale)
  );
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    setPack(buildSabbathPack(lesson, studyState, savedPack, locale));
    setPresentationOpen(false);
    setSaveStatus("");
    // A route change creates a new folio. Edits within the same lesson remain
    // local so a parent persistence render cannot move the textarea cursor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id, locale]);

  const persist = (nextPack, message = t("sbf.saved")) => {
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
      editedFieldIds: Array.from(
        new Set([...(current.editedFieldIds || []), id])
      ),
    }));
    setSaveStatus(t("sbf.pending"));
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

  const reorderSelection = (selectedFieldIds) => {
    persist(
      { ...pack, selectedFieldIds },
      t("sbf.orderSaved")
    );
  };

  const moveSelection = (id, direction) => {
    const next = pack.selectedFieldIds.slice();
    const from = next.indexOf(id);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= next.length) return;
    [next[from], next[to]] = [next[to], next[from]];
    reorderSelection(next);
  };

  const localizedFields = useMemo(
    () => sabbathFieldsForLocale(locale),
    [locale]
  );
  const selectedFields = useMemo(
    () => selectedSabbathFields(pack, locale),
    [locale, pack]
  );
  const visibleFields = useMemo(
    () =>
      localizedFields.filter(
        (field) =>
          field.id !== "otherPerson" ||
          pack.otherPersonSource ||
          pack.fields.otherPerson
      ),
    [localizedFields, pack.fields.otherPerson, pack.otherPersonSource]
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
            {t("sbf.back")}
          </button>

          <div className="sbf-hero__copy">
            <p className="sbf-kicker">{t("sbf.kicker")}</p>
            <h1 id={titleId}>{t("sbf.title")}</h1>
            <p>{t("sbf.deck")}</p>
          </div>

          <div className="sbf-hero__motif" aria-hidden="true">
            <LessonRelief
              lesson={lesson}
              stage={stageIndexFor(pack.sourceFilledCount)}
              filled={pack.sourceFilledCount}
              total={pack.sourceTotalSlots}
              compact
              priority
            />
          </div>
        </header>

        <div className="sbf-privacy-note">
          <Icon name="lock" size={18} />
          <div>
            <strong>{t("sbf.privateTitle")}</strong>
            <p>{t("sbf.privateBody")}</p>
          </div>
        </div>

        <div className="sbf-folio__grid">
          <section className="sbf-editor" aria-labelledby={privateTitleId}>
            <div className="sbf-section-heading">
              <p className="sbf-kicker">{t("sbf.privateTable")}</p>
              <h2 id={privateTitleId}>{t("sbf.wordsTitle")}</h2>
              <p>{t("sbf.wordsBody")}</p>
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
                        ? t("sbf.specialReview")
                        : field.readOnly
                          ? t("sbf.publicSource")
                          : t("sbf.private")}
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
                    onBlur={() => persist(pack, t("sbf.updated"))}
                  />
                  {field.otherPerson ? (
                    <p className="sbf-field-note">
                      {t("sbf.personNote")}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <aside className="sbf-share-builder" aria-labelledby={selectTitleId}>
            <div className="sbf-section-heading">
              <p className="sbf-kicker">{t("sbf.outputSelection")}</p>
              <h2 id={selectTitleId}>{t("sbf.takeTitle")}</h2>
              <p>{t("sbf.takeBody")}</p>
            </div>

            <fieldset className="sbf-selector">
              <legend className="sr-only">{t("sbf.selectedLegend")}</legend>
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
                          ? t("sbf.personWarning")
                          : t("sbf.editedValue")}
                      </small>
                    </span>
                  </label>
                );
              })}
            </fieldset>

            {pack.selectedFieldIds.length ? (
              <section
                className="sbf-assembly"
                aria-labelledby={`${reactId}-assembly-title`}
              >
                <div className="sbf-assembly__heading">
                  <span>{t("sbf.building")}</span>
                  <h3 id={`${reactId}-assembly-title`}>
                    {t("sbf.orderTitle")}
                  </h3>
                  <p>{t("sbf.orderBody")}</p>
                </div>
                <Reorder.Group
                  axis="y"
                  values={pack.selectedFieldIds}
                  onReorder={reorderSelection}
                  className="sbf-assembly__strips"
                >
                  {pack.selectedFieldIds.map((fieldId, index) => {
                    const field = visibleFields.find(
                      (candidate) => candidate.id === fieldId
                    );
                    if (!field) return null;
                    const privateHold =
                      field.otherPerson && !pack.otherPersonConsent;
                    return (
                      <Reorder.Item
                        key={field.id}
                        value={field.id}
                        className="sbf-assembly__strip"
                        data-private-hold={privateHold ? "true" : "false"}
                        whileDrag={{
                          scale: 1.018,
                          rotate: index % 2 ? 0.7 : -0.7,
                          boxShadow: "0 18px 28px rgba(45,32,24,.28)",
                        }}
                        transition={{
                          layout: {
                            type: "spring",
                            stiffness: 420,
                            damping: 36,
                          },
                        }}
                      >
                        <span
                          className="sbf-assembly__grip"
                          aria-hidden="true"
                        >
                          <Icon name="mosaic" size={18} />
                        </span>
                        <span className="sbf-assembly__copy">
                          <strong>
                            {pack.fieldLabels?.[field.id] || field.shortLabel}
                          </strong>
                          <small>
                            {privateHold
                              ? t("sbf.awaiting")
                              : String(pack.fields[field.id] || "").slice(0, 92)}
                          </small>
                        </span>
                        <span className="sbf-assembly__moves">
                          <button
                            type="button"
                            disabled={index === 0}
                            onPointerDown={(event) => event.stopPropagation()}
                            onClick={() => moveSelection(field.id, -1)}
                            aria-label={t("sbf.moveUp", {
                              label: field.shortLabel,
                            })}
                          >
                            <Icon
                              name="chevron"
                              size={15}
                              style={{ transform: "rotate(-90deg)" }}
                            />
                          </button>
                          <button
                            type="button"
                            disabled={
                              index === pack.selectedFieldIds.length - 1
                            }
                            onPointerDown={(event) => event.stopPropagation()}
                            onClick={() => moveSelection(field.id, 1)}
                            aria-label={t("sbf.moveDown", {
                              label: field.shortLabel,
                            })}
                          >
                            <Icon
                              name="chevron"
                              size={15}
                              style={{ transform: "rotate(90deg)" }}
                            />
                          </button>
                        </span>
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
                <motion.div
                  className="sbf-assembly__binding"
                  animate={{
                    scaleX: Math.min(
                      1,
                      0.24 + pack.selectedFieldIds.length * 0.095
                    ),
                    opacity: 0.42 + pack.selectedFieldIds.length * 0.07,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              </section>
            ) : null}

            {hasOtherPersonSelection ? (
              <label className="sbf-consent">
                <input
                  type="checkbox"
                  checked={pack.otherPersonConsent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>
                  {t("sbf.consent")}
                </span>
              </label>
            ) : null}

            <div className="sbf-selection-summary" aria-live="polite">
              <span>{selectedFields.length}</span>
              <p>
                {selectedFields.length === 1
                  ? t("sbf.fieldReady")
                  : t("sbf.fieldsReady")}
              </p>
            </div>

            <button
              type="button"
              className="sbf-button sbf-button--primary sbf-present"
              disabled={!selectionReady}
              onClick={openPresentation}
            >
              <Icon name="sunrise" size={19} />
              {t("sbf.openPresentation")}
            </button>

            {!selectionReady ? (
              <p className="sbf-present-hint">
                {hasOtherPersonSelection && !pack.otherPersonConsent
                  ? t("sbf.confirmReview")
                  : t("sbf.chooseField")}
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
