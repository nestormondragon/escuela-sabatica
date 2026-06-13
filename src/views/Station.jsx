import React from "react";
import { motion } from "framer-motion";
import ModuleHost from "../modules/ModuleHost.jsx";
import MaestroPanel from "../components/MaestroPanel.jsx";
import Centerpiece from "../components/Centerpiece.jsx";
import { PersonalNote } from "../modules/common.jsx";
import Icon from "../components/Icon.jsx";
import { viewVariants, t } from "../lib/motion.js";

/* A single station: one day, one decision that forges one piece. */
export default function Station({ lesson, station, state, filledCount, maestro, onFill, onSkip }) {
  const note =
    station.id !== "tormenta" && state.slots.tormenta
      ? `Empezaste nombrando tu tormenta: «${state.slots.tormenta}». Tenla presente aquí.`
      : null;

  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit">
      <button className="skip" onClick={onSkip} style={{ marginBottom: 6 }}>
        <Icon name="arrowLeft" size={16} /> {lesson.ui?.back || "Volver"}
      </button>

      <div style={{ maxWidth: 220, margin: "0 auto 6px" }}>
        <Centerpiece lesson={lesson} filled={filledCount} size={200} />
      </div>

      <div className="kicker" style={{ marginBottom: 12 }}>
        <span className="tag">{station.tag}</span>
        <h1 className="h1 serif" style={{ fontSize: "clamp(1.7rem,6.5vw,2.4rem)" }}>{station.title}</h1>
        <span className="eyebrow">{station.day}</span>
        <div className="hairline" />
      </div>

      {station.story ? <p className="story">{station.story}</p> : null}
      <PersonalNote>{note}</PersonalNote>

      <ModuleHost module={station.module} onFill={onFill} onSkip={onSkip} />

      {maestro ? <MaestroPanel guide={lesson.facilitator?.[station.id]} /> : null}
    </motion.section>
  );
}
