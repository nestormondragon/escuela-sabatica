import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DayHeader,
  DayCompleteNavigator,
  DayChrome,
  Eyebrow,
  Reveal,
  VerseCard,
  Quote,
  KeyPoint,
  dayByKey,
} from "../ui.jsx";

/* =================================================================
   VIERNES · 24 de abril
   "Para estudiar y meditar"
   From the abundance of the heart, the mouth speaks — Matt 12:34
   Verse: Mateo 12:34
   ================================================================ */

const MOMENTS = [
  {
    ctx: "Al despertar",
    prompt: "Tu primera palabra del día — ¿fue queja, gratitud o ninguna?",
  },
  {
    ctx: "En la cocina / la mesa",
    prompt: "Con los que desayunaste — ¿sembraste, discutiste, ignoraste?",
  },
  {
    ctx: "En el tráfico / en la fila",
    prompt: "Cuando alguien te cortó — ¿qué saliste a decir (o a pensar)?",
  },
  {
    ctx: "En el mensaje que enviaste",
    prompt: "Ese chat, ese comentario — ¿edificó o arañó?",
  },
  {
    ctx: "Cuando hablaste de alguien",
    prompt: "De una persona ausente — ¿la cubriste, la expusiste, la nombraste con cariño?",
  },
  {
    ctx: "En lo que no dijiste",
    prompt: "Ese silencio — ¿fue cobardía, sabiduría, o indiferencia?",
  },
];

const VERDICTS = [
  { k: "sana",     label: "SANA",      color: "#a67f1c", note: "Edificó · trajo vida" },
  { k: "punz",     label: "PUNZANTE",  color: "#8b2635", note: "Hirió · trajo muerte" },
  { k: "silencio", label: "SILENCIO",  color: "#6b5d4f", note: "Ni lo uno ni lo otro" },
];

function WordsAudit() {
  const [choices, setChoices] = useState({}); // { idx: "sana" | "punz" | "silencio" }
  const pick = (idx, k) => setChoices((prev) => ({ ...prev, [idx]: k }));
  const done = Object.keys(choices).length === MOMENTS.length;
  const sana = Object.values(choices).filter((v) => v === "sana").length;
  const punz = Object.values(choices).filter((v) => v === "punz").length;
  const sil = Object.values(choices).filter((v) => v === "silencio").length;

  return (
    <div className="max-w-3xl mx-auto">
      <Reveal>
        <div className="text-center mb-10">
          <Eyebrow tone="rubric">AUDITORÍA DE 24 HORAS</Eyebrow>
          <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
            Rebobina el día. <span className="italic c-gold">Oye tus palabras.</span>
          </h3>
          <p className="font-body italic c-parchment-75 mt-4 max-w-2xl mx-auto">
            Seis momentos del día de ayer. Para cada uno, marca con honestidad:
            ¿tus palabras fueron sanas, punzantes, o hubo silencio?
            Nadie ve esto más que tú.
          </p>
        </div>
      </Reveal>

      <div className="space-y-4">
        {MOMENTS.map((m, i) => {
          const choice = choices[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`border p-5 transition-all ${choice ? "b-gold bg-gold-10" : "b-stone-40"}`}
            >
              <div className="flex items-start gap-4">
                <div className={`font-sc fs-10 t-wide-3 w-20 shrink-0 ${choice ? "c-gold" : "c-gold-60"}`}>
                  {String(i + 1).padStart(2, "0")} / 06
                </div>
                <div className="flex-1">
                  <div className="font-sc fs-10 t-wide-3 c-ash mb-1">{m.ctx.toUpperCase()}</div>
                  <div className="font-body c-parchment-90 text-base md:text-lg leading-relaxed mb-4">
                    {m.prompt}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {VERDICTS.map((v) => {
                      const isOn = choice === v.k;
                      return (
                        <button
                          key={v.k}
                          onClick={() => pick(i, v.k)}
                          className={`font-sc fs-10 t-wide-3 px-3 py-2 border transition-all ${
                            isOn ? "" : "c-ash hover-gold"
                          }`}
                          style={{
                            borderColor: isOn ? v.color : "rgba(165,149,132,0.4)",
                            color: isOn ? v.color : undefined,
                            background: isOn ? `${v.color}14` : "transparent",
                          }}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-12"
          >
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              <div className="border b-gold p-5 text-center bg-gold-10">
                <div className="font-display text-4xl md:text-5xl c-gold">{sana}</div>
                <div className="font-sc fs-10 t-wide-3 c-gold mt-2">SANAS</div>
              </div>
              <div className="border b-rubric p-5 text-center bg-rubric-10">
                <div className="font-display text-4xl md:text-5xl c-rubric">{punz}</div>
                <div className="font-sc fs-10 t-wide-3 c-rubric mt-2">PUNZANTES</div>
              </div>
              <div className="border b-stone-50 p-5 text-center">
                <div className="font-display text-4xl md:text-5xl c-ash">{sil}</div>
                <div className="font-sc fs-10 t-wide-3 c-ash mt-2">SILENCIO</div>
              </div>
            </div>
            <KeyPoint>
              No es un veredicto moral — es un diagnóstico del corazón.
              «De la abundancia del corazón habla la boca» (Mt 12:34).
              Lo que dijiste ayer es <span className="c-gold italic">un
              informe de lo que tenías dentro</span>. La semana que viene,
              la Palabra quiere cambiar esa abundancia.
            </KeyPoint>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 5 discussion questions (flip cards) */
const QUESTIONS = [
  {
    q: "¿Por qué crees que la estrategia #1 del enemigo contra el cristiano es silenciar su lectura de la Biblia?",
    prompt:
      "Piensa en qué cambia en tu vida cuando llevas dos semanas sin abrir la Escritura. Compáralo con qué cambia cuando llevas dos semanas abriéndola a diario.",
  },
  {
    q: "¿Cuál es la diferencia entre creer lo que dice la Biblia y someterte a su autoridad?",
    prompt:
      "Alguien puede «estar de acuerdo» con la Biblia intelectualmente y vivir como si no existiera. La autoridad real se mide en las decisiones, no en las afirmaciones.",
  },
  {
    q: "¿Cuándo has sentido que un pasaje conocido «te cortó como espada de dos filos»?",
    prompt:
      "Describe a tu clase un momento concreto en que un versículo te confrontó — no te consoló, te confrontó — y lo que hiciste con ese corte.",
  },
  {
    q: "¿Qué distingue al «lector natural» del «lector espiritual» en la vida real?",
    prompt:
      "1 Corintios 2:14 afirma que la diferencia no es intelectual sino espiritual. ¿Cómo se ve eso en la práctica del lunes por la mañana?",
  },
  {
    q: "Si «de la abundancia del corazón habla la boca» — ¿qué está diciendo tu boca sobre tu corazón esta semana?",
    prompt:
      "Esta es la pregunta más incómoda de la lección. Y también la más útil. El remedio no es vigilar la boca — es llenar el corazón de otra cosa.",
  },
];

function DiscussionQuestions() {
  const [opened, setOpened] = useState(null);
  return (
    <div className="max-w-4xl mx-auto">
      <Reveal>
        <div className="text-center mb-10">
          <Eyebrow>PARA LA CLASE</Eyebrow>
          <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
            Cinco preguntas para <span className="italic c-gold">abrir el círculo</span>.
          </h3>
        </div>
      </Reveal>

      <div className="space-y-3">
        {QUESTIONS.map((q, i) => {
          const isOpen = opened === i;
          return (
            <motion.button
              key={i}
              onClick={() => setOpened(isOpen ? null : i)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`w-full text-left border p-5 md:p-6 transition-all ${
                isOpen ? "b-gold bg-gold-10" : "b-stone-40 hover:b-gold hover-lift"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`font-sc fs-10 t-wide-3 w-8 shrink-0 mt-1 ${isOpen ? "c-gold" : "c-gold-60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg md:text-xl c-parchment lh-105">
                    {q.q}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t b-gold-15">
                          <div className="font-sc fs-10 t-wide-3 c-gold mb-2">UN HILO PARA JALAR</div>
                          <p className="font-body italic c-parchment-85 text-base md:text-lg leading-relaxed">
                            {q.prompt}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={`font-display text-2xl shrink-0 ${isOpen ? "c-gold" : "c-stone"}`}>
                  {isOpen ? "−" : "+"}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* Commitment */
const COMMITMENTS = [
  "Leer la Biblia antes de abrir el teléfono cada mañana.",
  "Memorizar Hebreos 4:12 · palabra por palabra, esta semana.",
  "Hacer hoy mismo el mandato que he estado aplazando.",
  "Pedir a Dios cada día que prepare el suelo antes de la lectura.",
  "Reemplazar una hora de pantalla por una hora de Escritura.",
  "Compartir un versículo con alguien que no conoce a Dios.",
  "Callar una palabra punzante que hubiera dicho sin pensar.",
];

function Commitment() {
  const [picked, setPicked] = useState(null);
  return (
    <div className="max-w-2xl mx-auto">
      <Reveal>
        <Eyebrow>DE ESTA SEMANA HACIA LA SIGUIENTE</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="font-display c-parchment text-2xl md:text-3xl font-light lh-105 mt-3 mb-5">
          Escoge <span className="italic c-gold">una</span> cosa.
          No siete. Una.
        </h3>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="font-body c-parchment-80 text-lg leading-relaxed mb-6">
          La Palabra se graba por obediencia concreta. Elige lo que vas a practicar
          hasta el próximo sábado. Guárdalo en tu memoria. Anótalo si hace falta.
        </p>
      </Reveal>
      <div className="space-y-2">
        {COMMITMENTS.map((c, i) => {
          const isOn = picked === i;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={`w-full text-left border p-4 transition-all ${
                isOn ? "b-gold bg-gold-10" : "b-stone-40 hover:b-gold hover-lift"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-4 h-4 rounded-full border shrink-0 mt-1 ${isOn ? "bg-gold b-gold" : "b-stone-50"}`} />
                <div className={`font-body ${isOn ? "c-parchment" : "c-parchment-85"} text-base md:text-lg leading-relaxed`}>
                  {c}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 border-l-2 b-gold pl-5 py-3 bg-gold-10"
        >
          <div className="font-sc fs-10 t-wide-3 c-gold mb-2">TU COMPROMISO</div>
          <div className="font-display italic c-parchment text-lg md:text-xl leading-snug">
            {COMMITMENTS[picked]}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Viernes({ onComplete, onOpenPicker }) {
  const day = dayByKey("viernes");

  return (
    <div className="relative">
      <DayChrome day={day} onOpenPicker={onOpenPicker} />
      <div className="day-container">
        <DayHeader day={day} />

        {/* Hook */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <Reveal>
            <Eyebrow>UN PRINCIPIO INCÓMODO</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              Jesús dijo que lo que <em>sale</em> de la boca
              <br />
              es <span className="italic c-gold">un reporte</span> de lo que
              <span className="c-rubric"> hay</span> en el corazón.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <VerseCard cite="MATEO 12:34" large>
              Generación de víboras, ¿cómo podéis hablar lo bueno, siendo malos?
              Porque <span className="c-gold">de la abundancia del corazón habla la boca</span>.
            </VerseCard>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mt-8">
              Esta semana la lección no fue sobre técnicas de estudio bíblico.
              Fue sobre <span className="c-gold italic">qué está llenando tu corazón</span> —
              porque lo que lo llena, sale. En palabras, en silencios, en decisiones.
            </p>
          </Reveal>
        </section>

        {/* Words audit */}
        <section className="relative py-12 md:py-20 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <WordsAudit />
        </section>

        {/* Semana en resumen */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow>LA SEMANA EN SEIS FRASES</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Lo que aprendimos <span className="italic c-gold">juntos</span>.
                </h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {[
                { d: "SÁBADO", p: "Un libro que sobrevive — porque está vivo (Heb 4:12)." },
                { d: "DOMINGO", p: "La estrategia del enemigo es silenciarlo (2 Tim 3:15-17)." },
                { d: "LUNES", p: "La autoridad final es la Palabra, no nosotros (Jn 17:17)." },
                { d: "MARTES", p: "Su verdad está purificada siete veces (Sal 12:6)." },
                { d: "MIÉRCOLES", p: "Exige respuesta — no solo lectura (Stg 1:22)." },
                { d: "JUEVES", p: "El suelo del corazón determina el fruto (Mt 13)." },
              ].map((r, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="border-l-2 b-gold-30 pl-5">
                    <div className="font-sc fs-10 t-wide-3 c-gold mb-2">{r.d}</div>
                    <div className="font-display italic c-parchment text-lg md:text-xl leading-snug">
                      {r.p}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Discussion questions */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <DiscussionQuestions />
        </section>

        {/* White quote */}
        <section className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow tone="rubric">TESTIMONIO DE CIERRE</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5">
                <Quote cite="ELENA G. DE WHITE · EL DESEADO DE TODAS LAS GENTES, P. 301">
                  La Palabra de Dios, recibida en el alma, modela los pensamientos,
                  y entra en el desarrollo del carácter. Llevando el Espíritu Santo
                  consigo, la verdad santifica la vida, y produce en nosotros el
                  querer como el hacer por su buena voluntad.
                </Quote>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Commitment */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-midnight border-t b-gold-10">
          <Reveal>
            <Commitment />
          </Reveal>
        </section>

        {/* Bridge to anchors */}
        <section className="pb-8 md:pb-12 px-6 md:px-12">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <Eyebrow>LO QUE QUEDA POR LLEVAR</Eyebrow>
              <p className="font-display italic c-parchment-85 text-xl md:text-2xl lh-105 mt-4">
                Siete días, siete anclas.
                <br />
                <span className="c-gold">Pásalas de la mente al corazón.</span>
              </p>
              <p className="font-body italic c-ash text-base mt-4">
                El cierre: las Anclas de la semana.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="viernes"
          onNext={() => onComplete("viernes")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
