import React from "react";
import Icon from "./Icon.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

/* =================================================================
   MaestroPanel — facilitator guide for the active station, shown
   inline when "Modo maestro" is on. Helps a teacher lead the class.
   ================================================================= */

const ROWS = [
  ["apertura", "maestro.opening"],
  ["seguimiento", "maestro.followup"],
  ["ilustracion", "maestro.illustration"],
  ["transicion", "maestro.transition"],
  ["actividad", "maestro.activity"],
  ["cierre", "maestro.closing"],
];

export default function MaestroPanel({ guide }) {
  const { t } = useI18n();
  if (!guide) return null;
  return (
    <div
      style={{
        margin: "18px 0 4px", border: "1px dashed color-mix(in srgb, var(--clay) 45%, transparent)",
        borderRadius: "var(--r)", overflow: "hidden",
        background: "color-mix(in srgb, var(--clay) 6%, transparent)",
      }}
    >
      <div
        style={{
          padding: "12px 16px", display: "flex", alignItems: "center", gap: 8,
          fontFamily: "var(--ui)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          fontSize: "0.7rem", color: "var(--clay)", background: "color-mix(in srgb, var(--clay) 10%, transparent)",
        }}
      >
        <Icon name="book" size={16} /> {t("maestro.heading")}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 13 }}>
        {ROWS.map(([key, label]) =>
          guide[key] ? (
            <div key={key}>
              <div style={{ fontFamily: "var(--ui)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                {t(label)}
              </div>
              <p style={{ marginTop: 3, color: "var(--text-soft)", fontFamily: "var(--letter)" }}>{guide[key]}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
