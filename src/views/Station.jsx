import React from "react";
import { motion } from "framer-motion";
import ModuleHost from "../modules/ModuleHost.jsx";
import MaestroPanel from "../components/MaestroPanel.jsx";
import Centerpiece from "../components/Centerpiece.jsx";
import { PersonalNote } from "../modules/common.jsx";
import Icon from "../components/Icon.jsx";
import { viewVariants } from "../lib/motion.js";
import { warmCue, fillName } from "../lib/name.js";

/* A single station: one day, one decision that forges one piece.
   Every station greets the reader by name once (authored station.cue if
   present, else a varied reverent fallback) — natural, never mail-merge. */
export default function Station({ lesson, station, state, filledCount, maestro, onFill, onSkip }) {
  const cue = station.cue
    ? fillName(station.cue, state.userName)
    : warmCue(state.userName, lesson.id + ":" + station.id);

  // contextual callback to an earlier answer (no name — the cue carries it)
  const note =
    station.id !== "tormenta" && state.slots.tormenta
      ? `Lo que nombraste como tu tormenta —«${state.slots.tormenta}»— sigue presente aquí.`
      : null;

  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit">
      <button className="skip" onClick={onSkip} style={{ marginBottom: 6 }}>
        <Icon name="arrowLeft" size={16} /> {lesson.ui?.back || "Volver"}
      </button>

      <div style={{ maxWidth: 220, margin: "0 auto 6px" }}>
        <Centerpiece lesson={lesson} filled={filledCount} size={200} />
      </div>

      <div className="kicker" style={{ marginBottom: 10 }}>
        <span className="tag">{station.tag}</span>
        <h1 className="h1" style={{ fontSize: "clamp(1.7rem,6.5vw,2.4rem)" }}>{station.title}</h1>
        <span className="eyebrow">{station.day}</span>
        <div className="hairline" />
      </div>

      {cue ? (
        <p className="letter center" style={{ fontFamily: "var(--letter)", fontStyle: "italic", color: "var(--clay)", margin: "0 auto 10px", maxWidth: "32ch" }}>
          {cue}
        </p>
      ) : null}

      {station.story ? <p className="story">{station.story}</p> : null}
      <PersonalNote>{note}</PersonalNote>

      <ModuleHost module={station.module} onFill={onFill} onSkip={onSkip} />

      {maestro ? <MaestroPanel guide={lesson.facilitator?.[station.id]} /> : null}
    </motion.section>
  );
}
