import React from "react";
import { motion } from "framer-motion";
import Centerpiece, { stageIndexFor } from "../components/Centerpiece.jsx";
import Icon from "../components/Icon.jsx";
import { reveal, t, viewVariants } from "../lib/motion.js";
import { firstName, lcFirst } from "../lib/name.js";

/* =====================================================================
   Kit — the spine of the week.

   Q2 listed the pieces as a vertical checklist. Here the eight pieces are
   a mosaic: a grid of tesserae above, one focused row below for whatever
   comes next. The grid answers "how far along am I" at a glance, and the
   row answers "what do I do now" without making the reader scan a list.

   Only the next piece and the set ones are actionable; the rest stay quiet
   so the screen never reads as a backlog.
   ===================================================================== */

function Tessera({ slot, index, state, isNext, onOpen }) {
  const value = state.slots[slot.id];
  const st = value ? "set" : isNext ? "next" : "locked";
  const label = value
    ? `${slot.label}: ${value}`
    : isNext
    ? `${slot.label}, siguiente pieza`
    : `${slot.label}, aún sin colocar`;

  return (
    <button
      className="tess"
      data-state={st}
      onClick={() => (value || isNext) && onOpen(slot)}
      disabled={st === "locked"}
      aria-label={label}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="n">{index + 1}</span>
      <Icon name={slot.icon} size={19} weight={value ? "fill" : "regular"} />
    </button>
  );
}

export default function Kit({ lesson, state, filledCount, firstUnfilledId, done, onOpenSlot, onOpenDone }) {
  const total = lesson.slots.length;
  const remaining = total - filledCount;
  const stageLabel = lesson.stageLabel[lesson.stages[stageIndexFor(filledCount)]];
  const showPattern = filledCount >= 4 && !done;
  const ui = lesson.ui || {};
  const fn = firstName(state.userName);

  const doneTitle = ui.doneTitle || "Tu recorrido está completo";
  const title = done
    ? fn ? `${fn}, ${lcFirst(doneTitle)}` : doneTitle
    : remaining === 1
    ? ui.lastPiece || "Falta una pieza"
    : ui.building || "Cada elección coloca una pieza";

  const nextSlot = lesson.slots.find((s) => s.id === firstUnfilledId) || null;

  return (
    <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit">
      <Centerpiece lesson={lesson} filled={filledCount} size={252} />

      <div className="center" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span className="tag">{stageLabel}</span>
        <h1 className="h1" style={{ fontSize: "clamp(1.5rem, 5.6vw, 2rem)" }}>{title}</h1>
        <p className="lead" style={{ fontSize: "1.02rem" }}>
          {done
            ? ui.doneSub || "Lo armaste tú, con Dios. Ábrelo, guárdalo, compártelo."
            : ui.buildingHint || "Toca la pieza encendida."}
        </p>
      </div>

      {/* the mosaic itself: progress you can read in one glance */}
      <div>
        <div className="mosaic" role="group" aria-label={`${lesson.kitName}: ${filledCount} de ${total} piezas`}>
          {lesson.slots.map((s, i) => (
            <Tessera
              key={s.id}
              slot={s}
              index={i}
              state={state}
              isNext={s.id === firstUnfilledId}
              onOpen={onOpenSlot}
            />
          ))}
        </div>
        <p className="tag center" style={{ marginTop: 8 }}>
          {fn ? `${fn} · ` : ""}{lesson.kitName} · {filledCount} de {total}
        </p>
      </div>

      {/* the one thing to do next */}
      {!done && nextSlot ? (
        <button className="piece-row" data-current="true" onClick={() => onOpenSlot(nextSlot)}>
          <span className="piece-ico"><Icon name={nextSlot.icon} size={18} /></span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span className="piece-lbl">{nextSlot.label}</span>
            <span className="piece-val ghost">{nextSlot.teaser}</span>
          </span>
          <Icon name="chevron" size={16} style={{ color: "var(--clay)", flex: "none" }} />
        </button>
      ) : null}

      {/* what is already set, in the reader's own words */}
      {filledCount > 0 ? (
        <div className="stack" style={{ gap: 7 }}>
          {lesson.slots
            .filter((s) => state.slots[s.id])
            .map((s) => (
              <button key={s.id} className="piece-row" data-state="set" onClick={() => onOpenSlot(s)}>
                <span className="piece-ico"><Icon name={s.icon} size={18} weight="fill" /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="piece-lbl">{s.label}</span>
                  <span className="piece-val">{state.slots[s.id]}</span>
                </span>
              </button>
            ))}
        </div>
      ) : null}

      {showPattern ? (
        <motion.div variants={reveal} initial="initial" animate="animate" className="detail">
          <div className="meta g">{ui.patternLabel || "Tu patrón"}</div>
          <p className="letter" style={{ fontSize: "1.06rem", lineHeight: 1.6, color: "var(--text-soft)" }}>
            {lesson.pattern(state)}
          </p>
        </motion.div>
      ) : null}

      {done ? (
        <motion.button
          className="btn btn-primary btn-block"
          whileTap={{ scale: 0.97 }}
          transition={t.tap}
          onClick={onOpenDone}
        >
          {ui.open || "Abrir mi mosaico"} <Icon name="arrow" size={18} />
        </motion.button>
      ) : null}
    </motion.section>
  );
}
