import React from "react";
import Icon from "../components/Icon.jsx";
import { formatShort } from "../lib/date.js";

/* The quarter schedule. Today's lesson is marked; tap any to jump. */
export default function LessonPicker({ lessons, activeId, todayId, onPick }) {
  return (
    <div className="stack" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p className="muted" style={{ fontSize: "0.86rem", marginBottom: 4 }}>
        La app abre la lección de esta semana automáticamente. También puedes elegir otra.
      </p>
      {lessons.map((l) => {
        const isToday = l.id === todayId;
        const isActive = l.id === activeId;
        return (
          <button
            key={l.id}
            onClick={() => onPick(l.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12, textAlign: "left", width: "100%",
              padding: "13px 15px", borderRadius: "var(--r)",
              border: isActive ? "1px solid var(--clay)" : "1px solid var(--line)",
              background: isActive ? "color-mix(in srgb, var(--clay) 10%, transparent)" : "var(--surface)",
              opacity: l.complete ? 1 : 0.7,
            }}
          >
            <span style={{ width: 40, height: 40, borderRadius: "var(--r-sm)", flex: "none", display: "grid", placeItems: "center", background: "var(--surface-3)", color: l.complete ? "var(--clay)" : "var(--muted)", fontFamily: "var(--ui)", fontWeight: 700 }}>
              {l.number}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="letter" style={{ display: "block", fontSize: "1.06rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.title}</span>
              <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "0.7rem", color: "var(--muted)" }}>
                {formatShort(l.forDate)}
                {isToday ? " · esta semana" : ""}
                {!l.complete ? " · próximamente" : ""}
              </span>
            </span>
            {isToday ? <span style={{ color: "var(--clay)" }}><Icon name="mosaic" size={16} /></span> : l.complete ? <Icon name="arrow" size={16} style={{ color: "var(--muted)" }} /> : <Icon name="lock" size={14} style={{ color: "var(--faint)" }} />}
          </button>
        );
      })}
    </div>
  );
}
