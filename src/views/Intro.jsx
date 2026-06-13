import React from "react";
import { motion } from "framer-motion";
import Centerpiece from "../components/Centerpiece.jsx";
import Icon from "../components/Icon.jsx";
import { listItem, listParent, t, viewVariants } from "../lib/motion.js";
import { formatLong } from "../lib/date.js";
import { persistent } from "../lib/storage.js";
import { firstName, lcFirst, fillName } from "../lib/name.js";

/* The opening promise + the empty kit (ghost slots visible). The name
   has already been given on the Welcome screen, so here we greet. */
export default function Intro({ lesson, userName, onStart }) {
  const fn = firstName(userName);
  // Promise may embed {name} (ported lessons) — resolve it; otherwise prepend
  // the name as a warm vocative (hand-authored l11/12/13 have no token).
  const promiseText = /\{name\}/.test(lesson.promise)
    ? fillName(lesson.promise, userName)
    : fn
    ? `${fn}, ${lcFirst(lesson.promise)}`
    : lesson.promise;

  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit">
      <div className="kicker">
        <span className="tag">Lección {lesson.number} · {formatLong(lesson.forDate)}</span>
        <h1 className="h1 serif">{lesson.title}</h1>
        <span className="sub">{lesson.subtitle}</span>
        <div className="hairline" />
      </div>

      <Centerpiece lesson={lesson} filled={0} size={300} />

      <p className="lead center serif" style={{ fontSize: "1.16rem", color: "var(--text)", marginTop: 16, fontFamily: "var(--scripture)" }}>
        {promiseText}
      </p>

      <div className="verse" style={{ marginTop: 16 }}>
        {lesson.verse.text}
        <span className="ref">{lesson.verse.ref}</span>
      </div>

      <p className="tag center" style={{ margin: "20px 0 10px" }}>{lesson.ui?.emptyKit || "Tu recorrido"} · 0 de {lesson.slots.length}</p>
      <motion.div variants={listParent} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {lesson.slots.map((s) => (
          <motion.div
            key={s.id}
            variants={listItem}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 15px",
              borderRadius: 14, border: "1.5px dashed var(--line)", background: "var(--surface)", opacity: 0.62,
            }}
          >
            <span style={{ width: 34, height: 34, borderRadius: "50%", flex: "none", display: "grid", placeItems: "center", color: "var(--muted)", border: "1px dashed var(--faint)" }}>
              <Icon name={s.icon} size={17} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>{s.label}</span>
              <span className="serif" style={{ display: "block", fontStyle: "italic", color: "var(--muted)", fontFamily: "var(--scripture)" }}>{s.teaser}</span>
            </span>
            <Icon name="lock" size={14} style={{ color: "var(--faint)" }} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn btn-primary btn-block"
        style={{ marginTop: 18 }}
        whileTap={{ scale: 0.98 }}
        transition={t.tap}
        onClick={onStart}
      >
        {lesson.ui?.start || "Empezar"} <Icon name="arrow" size={18} />
      </motion.button>

      <p className="tag center" style={{ marginTop: 16, opacity: 0.7, color: "var(--muted)" }}>
        {persistent ? "Tu progreso se guarda en este dispositivo." : "El almacenamiento no está disponible; durará esta sesión."}
      </p>
    </motion.section>
  );
}
