import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reveal } from "../lib/motion.js";
import { Insight, SkillBadge, SaveBar, ChipRow, Pause } from "./common.jsx";
import Icon from "../components/Icon.jsx";

/* A short discernment drill, then a personal commitment.
   Used for "Mi paso de fe" (toque de fe vs roce casual). */
export default function SkillThenCommit({ config, onFill, onSkip }) {
  const { skill, commit } = config;
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(null); // {ok}
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const round = skill.rounds[i];

  const answer = (catIdx) => {
    if (answered) return;
    const ok = catIdx === round.a;
    if (ok) setScore((s) => s + 1);
    setAnswered({ ok });
  };
  const next = () => {
    if (i < skill.rounds.length - 1) { setI(i + 1); setAnswered(null); }
    else setDone(true);
  };

  return (
    <div className="stack">
      <p className="prompt-q">{skill.prompt}</p>
      {skill.hint ? <p className="prompt-hint">{skill.hint}</p> : null}

      {!done ? (
        <motion.div className="seqcard" key={i} variants={reveal} initial="initial" animate="animate">
          <div className="seqcount">Frase {i + 1} de {skill.rounds.length}</div>
          <p className="statementtxt">{round.t}</p>
          <div className="cat-btns">
            {skill.cats.map((c, k) => {
              const isAns = answered != null;
              const isCorrect = k === round.a;
              return (
                <button
                  key={k}
                  className="cat-btn"
                  onClick={() => answer(k)}
                  style={
                    isAns
                      ? {
                          borderColor: isCorrect ? "var(--teal)" : "var(--line)",
                          background: isCorrect ? "color-mix(in srgb, var(--teal) 16%, transparent)" : "var(--surface)",
                          opacity: isCorrect ? 1 : 0.6,
                          pointerEvents: "none",
                        }
                      : undefined
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {answered ? (
              <motion.div variants={reveal} initial="initial" animate="animate">
                <div className={`fb ${answered.ok ? "ok" : "no"}`}>
                  {answered.ok ? "✓ " : "→ "}{round.fb}
                </div>
                <div style={{ textAlign: "right", marginTop: 10 }}>
                  <button className="btn btn-ghost" onClick={next} style={{ minHeight: 44, padding: "10px 18px" }}>
                    {i < skill.rounds.length - 1 ? "Siguiente" : "Ver lo que aprendí"} <Icon name="arrow" size={16} />
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : (
        <Committer
          skill={skill}
          commit={commit}
          score={score}
          onFill={onFill}
          onSkip={onSkip}
          seedSub={config.seedSub}
          saveLabel={config.saveLabel}
        />
      )}
    </div>
  );
}

function Committer({ skill, commit, score, onFill, onSkip, seedSub, saveLabel }) {
  const [chosen, setChosen] = useState("");
  const [text, setText] = useState("");
  const value = (text.trim() || chosen).trim();

  return (
    <motion.div className="stack" variants={reveal} initial="initial" animate="animate">
      <SkillBadge>{skill.badge}</SkillBadge>
      <Insight label={`Discerniste ${score} de ${skill.rounds.length}`} body={skill.summary} />
      <Pause />
      <p className="prompt-q">{commit.prompt}</p>
      {commit.hint ? <p className="prompt-hint">{commit.hint}</p> : null}
      {commit.options ? (
        <ChipRow options={commit.options} value={chosen} onPick={(o) => { setChosen(o); setText(""); }} />
      ) : null}
      <div className="field">
        <input
          type="text"
          placeholder={commit.placeholder}
          value={text}
          onChange={(e) => { setText(e.target.value); if (e.target.value) setChosen(""); }}
          maxLength={90}
        />
      </div>
      <SaveBar
        label={saveLabel || "Guardar en mi ancla"}
        disabled={!value}
        onSave={() => onFill(value, { [commit.extraKey]: value }, seedSub)}
        onSkip={onSkip}
      />
    </motion.div>
  );
}
