import React, { useState, useMemo } from "react";
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
   DOMINGO · 19 de abril
   "El arma más poderosa"
   The Scripture as spiritual weapon
   Verse: 2 Timoteo 3:15-17
   ================================================================ */

const DISTRACTIONS = [
  {
    key: "negocios",
    name: "Negocios",
    verb: "Callar",
    tag: "«Mañana leo, hoy no alcanzo».",
    body:
      "La agenda nunca termina. Lo urgente desplaza lo importante. Y la voz que te hablaría por la mañana se apaga antes de que abras el libro.",
  },
  {
    key: "apatia",
    name: "Apatía",
    verb: "Despertar",
    tag: "«Ya lo he leído antes».",
    body:
      "La familiaridad mata la atención. La Biblia se vuelve un objeto del paisaje, no una voz. La sequedad espiritual no es escasez de información — es escasez de hambre.",
  },
  {
    key: "cansancio",
    name: "Cansancio",
    verb: "Descansar",
    tag: "«No puedo más hoy».",
    body:
      "El alma exhausta no puede escuchar bien. Pero la Palabra también nutre — no es una tarea más. Es maná, no trabajo.",
  },
  {
    key: "duda",
    name: "Duda",
    verb: "Confiar",
    tag: "«¿Y si no es para mí?».",
    body:
      "La sospecha intelectualiza lo que debería orar. El enemigo no teme a tus preguntas — teme a tu confianza. «Si alguno quisiere hacer su voluntad, conocerá si la doctrina es de Dios» (Jn 7:17).",
  },
];

function CompassOfDistractions({ silenced, onSilence }) {
  const allDown = silenced.length === DISTRACTIONS.length;
  return (
    <div className="relative mx-auto" style={{ width: "min(92vw, 520px)" }}>
      <div className="relative ar-square">
        {/* Center emblem */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: allDown ? 1.05 : 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={`relative rounded-full border transition-all duration-700 flex items-center justify-center ${
              allDown ? "b-gold bg-gold-10 gold-aura" : "b-stone-50 bg-night-60"
            }`}
            style={{ width: "40%", height: "40%" }}
          >
            {allDown ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center px-3"
              >
                <svg viewBox="0 0 40 80" className="w-8 md:w-10 mx-auto">
                  <g fill="none" stroke="#a67f1c" strokeWidth="1.5">
                    <line x1="20" y1="4" x2="20" y2="60" />
                    <polyline points="20,60 12,66 20,72 28,66 20,60" fill="rgba(166,127,28,0.15)" />
                    <line x1="10" y1="60" x2="30" y2="60" />
                    <circle cx="20" cy="76" r="2" />
                  </g>
                </svg>
                <div className="font-sc fs-10 t-wide-3 c-gold mt-2">LA PALABRA</div>
              </motion.div>
            ) : (
              <div className="text-center px-3">
                <div className="font-display italic c-parchment text-xl md:text-2xl">Palabra</div>
                <div className="font-sc fs-10 t-wide-3 c-gold mt-1">DE DIOS</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Four blades */}
        {DISTRACTIONS.map((d, i) => {
          const angle = (i * 90) - 90; // top, right, bottom, left
          const isDown = silenced.includes(d.key);
          const rad = (angle * Math.PI) / 180;
          const distance = 36; // % from center
          const x = 50 + Math.cos(rad) * distance;
          const y = 50 + Math.sin(rad) * distance;
          return (
            <motion.button
              key={d.key}
              onClick={() => onSilence(d.key)}
              disabled={isDown}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: isDown ? 0.85 : 1,
                rotate: isDown ? [0, 10, -10, 0] : [0, 4, -4, 0],
              }}
              transition={{
                scale: { duration: 0.4 },
                rotate: { duration: isDown ? 0.6 : 6, repeat: isDown ? 0 : Infinity, ease: "easeInOut" },
              }}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                width: "36%",
              }}
              className={`group text-center transition-all ${
                isDown ? "opacity-40 cursor-default" : "cursor-pointer hover-lift"
              }`}
            >
              <div
                className={`border p-3 md:p-4 bg-night/90 backdrop-blur-sm transition-all ${
                  isDown ? "b-gold-15" : "b-rubric-30 hover:b-rubric"
                }`}
              >
                <div
                  className={`font-sc fs-10 t-wide-3 ${
                    isDown ? "c-gold" : "c-rubric"
                  }`}
                >
                  {isDown ? "· SILENCIADO ·" : "· DISTRACCIÓN ·"}
                </div>
                <div
                  className={`font-display text-base md:text-xl leading-tight mt-1 ${
                    isDown ? "c-ash line-through" : "c-parchment"
                  }`}
                >
                  {d.name}
                </div>
                <div className="font-body italic text-xs md:text-sm c-parchment-70 mt-2 leading-snug">
                  {d.tag}
                </div>
                {!isDown && (
                  <div className="font-sc fs-10 t-wide-3 c-gold mt-3 group-hover:c-rubric transition-colors">
                    {d.verb} ✕
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Status text */}
      <div className="text-center mt-8">
        {allDown ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="font-sc fs-11 t-wide-4 c-gold mb-3">LA ESPADA ESTÁ EN TU MANO</div>
            <p className="font-body italic c-parchment-90 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Cuando las distracciones se callan, la voz que queda es
              la de <span className="c-gold">Dios</span>.
            </p>
          </motion.div>
        ) : (
          <div className="font-sc fs-10 t-wide-3 c-ash">
            TOCA CADA DISTRACCIÓN PARA SILENCIARLA · {silenced.length} / 4
          </div>
        )}
      </div>
    </div>
  );
}

/* Four purposes from 2 Tim 3:16 */
const PURPOSES = [
  {
    key: "ensenar",
    gk: "didaskalía",
    name: "Enseñar",
    short: "Te dice lo que es verdad.",
    body:
      "La Biblia no es una colección de sugerencias. Es el maestro que te dice qué es real: quién es Dios, quién eres tú, cuál es el problema, cuál es la solución. No deduces estas cosas — te son enseñadas.",
    verse: "«Toda la Escritura es inspirada por Dios».",
    ref: "2 Timoteo 3:16a",
  },
  {
    key: "redarguir",
    gk: "elegmós",
    name: "Redargüir",
    short: "Te dice lo que está mal.",
    body:
      "Redargüir significa confrontar con evidencia. La Escritura muestra el pecado como el espejo muestra la cara sucia. No es para herir — es para despertar. Sin esta función, la religión se vuelve terapia sin cura.",
    verse: "«Útil para enseñar, para redargüir…».",
    ref: "2 Timoteo 3:16b",
  },
  {
    key: "corregir",
    gk: "epanórthosis",
    name: "Corregir",
    short: "Te muestra cómo volver.",
    body:
      "Corregir significa enderezar lo torcido. No basta con saber que algo está mal — hace falta saber cómo se endereza. La Escritura da la dirección correcta: arrepentimiento, restitución, gracia, camino.",
    verse: "«…para corregir, para instruir en justicia».",
    ref: "2 Timoteo 3:16c",
  },
  {
    key: "instruir",
    gk: "paideía",
    name: "Instruir en justicia",
    short: "Te forma en cómo vivir.",
    body:
      "Paideia — la palabra griega — describía la formación del carácter durante años: disciplina, repetición, ejemplo. La Escritura no produce cristianos instantáneos; produce discípulos formados con paciencia.",
    verse: "«A fin de que el hombre de Dios sea perfecto, enteramente preparado».",
    ref: "2 Timoteo 3:17",
  },
];

function FourPurposes() {
  const [active, setActive] = useState(0);
  return (
    <div className="max-w-5xl mx-auto">
      <Reveal>
        <div className="text-center mb-10 md:mb-14">
          <Eyebrow>CUATRO USOS · 2 TIMOTEO 3:16-17</Eyebrow>
          <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
            Un libro <span className="italic c-gold">que hace cuatro cosas</span>.
          </h3>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-4 gap-3 mb-10">
        {PURPOSES.map((p, i) => (
          <button
            key={p.key}
            onClick={() => setActive(i)}
            className={`text-left border hover-lift p-5 transition-all ${
              active === i ? "b-gold bg-gold-10" : "b-stone-40 hover:b-gold"
            }`}
          >
            <div className={`font-sc fs-10 t-wide-3 ${active === i ? "c-gold" : "c-gold-60"}`}>
              {String(i + 1).padStart(2, "0")} · {p.gk.toUpperCase()}
            </div>
            <div
              className={`font-display text-xl lh-105 mt-2 ${
                active === i ? "c-parchment" : "c-parchment-80"
              }`}
            >
              {p.name}
            </div>
            <div
              className={`font-body italic text-base mt-2 ${
                active === i ? "c-parchment-85" : "c-ash"
              }`}
            >
              {p.short}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto border-l-2 b-gold pl-6 md:pl-8 py-4"
        >
          <div className="font-sc fs-10 t-wide-3 c-gold mb-2">
            {PURPOSES[active].name.toUpperCase()}
          </div>
          <p className="font-body c-parchment-90 text-lg md:text-xl leading-relaxed mb-5">
            {PURPOSES[active].body}
          </p>
          <blockquote className="font-display italic c-parchment text-lg md:text-xl leading-snug border-t b-gold-15 pt-4">
            {PURPOSES[active].verse}
          </blockquote>
          <div className="font-sc fs-10 t-wide-3 c-gold mt-2">{PURPOSES[active].ref}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Domingo({ onComplete, onOpenPicker, onRefrain }) {
  const day = dayByKey("domingo");
  const [silenced, setSilenced] = useState([]);
  const allDown = silenced.length === DISTRACTIONS.length;

  const silence = (k) => {
    setSilenced((prev) => {
      if (prev.includes(k)) return prev;
      const next = [...prev, k];
      if (next.length === DISTRACTIONS.length && onRefrain) onRefrain();
      return next;
    });
  };

  return (
    <div className="relative">
      <DayChrome day={day} onOpenPicker={onOpenPicker} />
      <div className="day-container">
        <DayHeader day={day} />

        {/* -------- Hook -------- */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <Reveal>
            <Eyebrow>LA ESTRATEGIA NÚMERO UNO</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              El enemigo del alma tiene <span className="italic c-gold">un plan</span>.
              <br />
              Y siempre comienza con <span className="c-rubric">lo mismo</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
              Antes de poder tumbarte, tiene que silenciar tu Biblia. No quemarla — solo
              callarla. Cubrirla. Postergarla. Distraerte lo suficiente como para que
              mañana decidas lo mismo. La batalla de hoy no es contra grandes pecados —
              es contra pequeñas cosas que apagan la voz.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <VerseCard cite="EFESIOS 6:17">
              Tomad la espada del Espíritu, <span className="c-gold">que es la palabra de Dios</span>.
            </VerseCard>
          </Reveal>
        </section>

        {/* -------- Compass interactive -------- */}
        <section className="relative py-12 md:py-20 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Eyebrow tone="rubric">EL CAMPO DE BATALLA</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Cuatro vientos contra <span className="italic c-gold">tu altar</span>.
                </h3>
                <p className="font-body italic c-parchment-75 mt-4 max-w-xl mx-auto">
                  Nombra las distracciones que te callan. Silencia cada una.
                  Ve qué aparece cuando todas se apagan.
                </p>
              </div>
            </Reveal>

            <CompassOfDistractions silenced={silenced} onSilence={silence} />

            <AnimatePresence>
              {allDown && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-12 max-w-2xl mx-auto"
                >
                  <VerseCard cite="HEBREOS 4:12">
                    La palabra de Dios es viva y eficaz, más cortante que
                    toda espada de dos filos.
                  </VerseCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* -------- 2 Tim 3:15-17 four purposes -------- */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <FourPurposes />
        </section>

        {/* -------- Pauline framing -------- */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow>EL CONTEXTO</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-4xl font-light lh-105 mt-3 mb-6">
                Pablo escribe estas palabras <span className="italic c-gold">desde una celda</span>.
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
                2 Timoteo es la última carta de Pablo antes de morir. Le escribe a
                Timoteo — su discípulo joven — desde una prisión romana. Sabe que
                pronto será ejecutado. Y en sus últimas palabras, ¿qué le recomienda
                para los días oscuros que vienen?
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <VerseCard cite="2 TIMOTEO 3:15" large>
                Que desde la niñez has sabido las Sagradas Escrituras, las cuales
                te pueden hacer sabio para la salvación.
              </VerseCard>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="font-body c-parchment-85 text-lg leading-relaxed mt-6">
                Un hombre a punto de morir le dice a un hombre a punto de liderar:
                <span className="c-gold"> vuelve a la Biblia</span>. No a una estrategia
                nueva. No a una moda. A lo que has sabido desde niño.
              </p>
            </Reveal>
          </div>
        </section>

        {/* -------- White quote -------- */}
        <section className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow tone="rubric">TESTIMONIO</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5">
                <Quote cite="ELENA G. DE WHITE · EXALTAD A JESÚS, P. 278">
                  Tan solo los que hayan fortalecido su intelecto mediante las verdades
                  de la Biblia podrán resistir en el último gran conflicto. La Palabra
                  de Dios es la única defensa contra los engaños de Satanás.
                </Quote>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------- Reflective decision -------- */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-midnight border-t b-gold-10">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <Eyebrow>PARA HOY</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-3xl font-light lh-105 mt-3 mb-5">
                ¿Cuál es <span className="italic c-gold">tu</span> distracción número uno?
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body c-parchment-80 text-lg leading-relaxed mb-5">
                No contestes con la respuesta correcta. Contesta con la honesta. El
                primer paso para empuñar la espada es saber exactamente qué te la
                quita de la mano.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <KeyPoint>
                Esta semana, cuando sientas la distracción ganando, di en voz alta una
                sola frase: <span className="italic c-gold">«Escrito está»</span>. Fue
                lo que dijo Jesús. Tres veces. Y el diablo se fue.
              </KeyPoint>
            </Reveal>
          </div>
        </section>

        {/* -------- Bridge -------- */}
        <section className="pb-8 md:pb-12 px-6 md:px-12">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <Eyebrow>LO QUE VIENE</Eyebrow>
              <p className="font-display italic c-parchment-85 text-xl md:text-2xl lh-105 mt-4">
                Pero hay una pregunta anterior a <em>cómo</em> usar la espada:
                <br />
                <span className="c-gold">¿quién te dijo que es la espada?</span>
              </p>
              <p className="font-body italic c-ash text-base mt-4">
                Mañana: la autoridad de las Escrituras.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="domingo"
          onNext={() => onComplete("domingo")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
