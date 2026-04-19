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
   JUEVES · 23 de abril
   "La condición del corazón"
   The soil where the seed falls.
   Verse: Jeremías 15:16
   ================================================================ */

/* Two readers — same verse, different fruit */
const SAMPLE_VERSE = {
  text: "Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto; porque separados de mí nada podéis hacer.",
  ref: "JUAN 15:5",
};

function ReadersSplit() {
  const [focus, setFocus] = useState("both"); // "natural" | "spiritual" | "both"
  return (
    <div>
      <div className="flex justify-center gap-2 mb-6">
        {[
          { k: "both", label: "Ambos" },
          { k: "natural", label: "Solo el natural" },
          { k: "spiritual", label: "Solo el espiritual" },
        ].map((b) => (
          <button
            key={b.k}
            onClick={() => setFocus(b.k)}
            className={`font-sc fs-10 t-wide-3 px-3 py-2 border transition-all ${
              focus === b.k ? "b-gold c-gold bg-gold-10" : "b-stone-40 c-ash hover:b-gold hover:c-gold"
            }`}
          >
            {b.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Natural reader */}
        <motion.div
          animate={{ opacity: focus === "spiritual" ? 0.25 : 1 }}
          transition={{ duration: 0.5 }}
          className="border b-stone-50 p-5 md:p-7 bg-parchment-deep"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-stone" />
            <div className="font-sc fs-10 t-wide-3 c-ash">EL LECTOR NATURAL</div>
          </div>
          <p className="font-body c-parchment-85 italic leading-relaxed mb-5">
            Lee la frase, la procesa, la archiva. Reconoce el lenguaje — «vid,
            pámpanos, fruto» — y piensa: <span className="c-ash">«bonita metáfora agrícola»</span>.
            No nota urgencia. No nota dependencia. No nota que el versículo
            está diciendo algo sobre su vida aquí, ahora.
          </p>
          <div className="border-t b-stone-40 pt-4">
            <div className="font-sc fs-10 t-wide-3 c-ash mb-2">LE PARECE:</div>
            <div className="font-display italic c-parchment-85 text-base md:text-lg leading-snug">
              «Texto religioso. Metáfora conocida. Siguiente.»
            </div>
          </div>
          <div className="mt-5 font-sc fs-10 t-wide-3 c-rubric">· FRUTO: NINGUNO ·</div>
        </motion.div>

        {/* Spiritual reader */}
        <motion.div
          animate={{ opacity: focus === "natural" ? 0.25 : 1 }}
          transition={{ duration: 0.5 }}
          className="border b-gold bg-gold-10 p-5 md:p-7 relative"
        >
          <div className="absolute inset-0 rg-page-glow pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-gold pulse-dot" />
              <div className="font-sc fs-10 t-wide-3 c-gold">EL LECTOR ESPIRITUAL</div>
            </div>
            <p className="font-body c-parchment-90 italic leading-relaxed mb-5">
              Lee la misma frase. Se detiene en <span className="c-gold">«permanece en mí»</span>.
              Reconoce que ha intentado dar fruto por su cuenta esta semana —
              y ha fracasado. Entiende que la Biblia no le está hablando de
              uvas; le está diciendo que <em>sin la Vid, no hay nada</em>. El texto
              se convierte en oración. La oración en rendición.
            </p>
            <div className="border-t b-gold-30 pt-4">
              <div className="font-sc fs-10 t-wide-3 c-gold mb-2">LE PARECE:</div>
              <div className="font-display italic c-parchment text-base md:text-lg leading-snug">
                «Señor, me estás diciendo a mí. Perdón por intentarlo sola.»
              </div>
            </div>
            <div className="mt-5 font-sc fs-10 t-wide-3 c-gold">· FRUTO: MUCHO ·</div>
          </div>
        </motion.div>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 max-w-2xl mx-auto text-center">
          <VerseCard cite="1 CORINTIOS 2:14">
            El hombre natural no percibe las cosas que son del Espíritu de Dios,
            porque para él son locura, y no las puede entender, porque se han
            de discernir espiritualmente.
          </VerseCard>
        </div>
      </Reveal>
    </div>
  );
}

/* The four soils of Matthew 13 */
const SOILS = [
  {
    name: "El camino",
    short: "Nada penetra.",
    body:
      "La semilla cae sobre un suelo endurecido por el paso. La Palabra llega — pero rebota. Las aves se la llevan antes de que tenga tiempo de hundirse. Hay corazones así hoy: duros por la repetición, inmunes por la familiaridad, protegidos por el cinismo.",
    fruit: "—",
  },
  {
    name: "Suelo rocoso",
    short: "Brota rápido, muere rápido.",
    body:
      "La semilla germina con entusiasmo, pero no tiene raíz. En cuanto llega la prueba o la persecución, se marchita. Son los lectores emocionales: se inflaman con un sermón y se enfrían con un inconveniente.",
    fruit: "Hoja sin raíz",
  },
  {
    name: "Entre espinos",
    short: "Las preocupaciones ahogan.",
    body:
      "La semilla crece, pero compite con espinas: afanes, riquezas, deleites. El versículo que te habló el domingo no encuentra espacio para madurar entre las presiones del martes. No hay fruto no porque la semilla sea mala — sino porque el jardín está sobrepoblado.",
    fruit: "Planta sin fruto",
  },
  {
    name: "Tierra buena",
    short: "Recibe. Retiene. Produce.",
    body:
      "La semilla cae en tierra preparada — corazón humilde, mente quieta, oídos atentos. Allí germina, crece, madura. Y produce fruto «a treinta, a sesenta, a ciento por uno». La misma semilla que no dio nada en otro terreno, aquí lo da todo.",
    fruit: "30 · 60 · 100",
  },
];

function FourSoils() {
  const [active, setActive] = useState(3);
  return (
    <div className="max-w-4xl mx-auto">
      <Reveal>
        <div className="text-center mb-10">
          <Eyebrow>LA PARÁBOLA QUE EXPLICA TODO</Eyebrow>
          <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
            Cuatro suelos. <span className="italic c-gold">Una sola semilla.</span>
          </h3>
          <p className="font-body italic c-parchment-75 mt-4 max-w-2xl mx-auto">
            Jesús contó esta parábola a multitudes. La semilla es la Palabra.
            Los suelos son los corazones. Y el fruto depende del terreno — no del sembrador.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-4 gap-2 mb-8">
        {SOILS.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setActive(i)}
            className={`text-left border p-4 transition-all hover-lift ${
              active === i ? "b-gold bg-gold-10" : "b-stone-40 hover:b-gold"
            }`}
          >
            <div className={`font-sc fs-10 t-wide-3 ${active === i ? "c-gold" : "c-gold-60"}`}>
              SUELO {String(i + 1).padStart(2, "0")}
            </div>
            <div className={`font-display text-lg lh-105 mt-2 ${active === i ? "c-parchment" : "c-parchment-80"}`}>
              {s.name}
            </div>
            <div className={`font-body italic text-sm mt-1 ${active === i ? "c-parchment-85" : "c-ash"}`}>
              {s.short}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="border-l-2 b-gold pl-6 md:pl-8 py-4 max-w-3xl"
        >
          <div className="font-sc fs-10 t-wide-3 c-gold mb-2">
            {SOILS[active].name.toUpperCase()} · FRUTO: {SOILS[active].fruit}
          </div>
          <p className="font-body c-parchment-90 text-lg md:text-xl leading-relaxed">
            {SOILS[active].body}
          </p>
        </motion.div>
      </AnimatePresence>

      <Reveal delay={0.2}>
        <div className="mt-10 max-w-3xl">
          <VerseCard cite="MATEO 13:23">
            El que fue sembrado en buena tierra, éste es el que oye y entiende
            la palabra, <span className="c-gold">y da fruto</span>.
          </VerseCard>
        </div>
      </Reveal>
    </div>
  );
}

/* "I ate your words" — Jer 15:16 interactive */
const DEVOURABLE = [
  { t: "«Nada me separará del amor de Cristo»", ref: "Romanos 8:39" },
  { t: "«Todo lo puedo en Cristo que me fortalece»", ref: "Filipenses 4:13" },
  { t: "«El gozo de Jehová es mi fortaleza»", ref: "Nehemías 8:10" },
  { t: "«En silencio y en esperanza será mi fortaleza»", ref: "Isaías 30:15" },
  { t: "«Échame, Señor, del caudal de tu Palabra»", ref: "Salmo 119:18" },
];

function EatTheWords() {
  const [eaten, setEaten] = useState([]);
  const done = eaten.length === DEVOURABLE.length;
  return (
    <div className="max-w-3xl mx-auto">
      <Reveal>
        <div className="text-center mb-10">
          <Eyebrow tone="rubric">EL VERBO DE JEREMÍAS</Eyebrow>
          <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
            «<span className="italic c-gold">Comí</span> tus palabras.»
          </h3>
          <p className="font-body italic c-parchment-75 mt-4 max-w-2xl mx-auto">
            Jeremías no dijo «leí» ni «estudié». Dijo: comí. La Palabra no
            se admira desde fuera — se ingiere. Se mastica, se digiere, se
            vuelve parte de lo que eres.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <VerseCard cite="JEREMÍAS 15:16" large>
          Fueron halladas tus palabras, y yo las <span className="c-gold">comí</span>;
          y tu palabra me fue por gozo y por alegría de mi corazón.
        </VerseCard>
      </Reveal>

      <div className="mt-10 space-y-3">
        {DEVOURABLE.map((v, i) => {
          const isEaten = eaten.includes(i);
          return (
            <motion.button
              key={i}
              onClick={() => !isEaten && setEaten((prev) => [...prev, i])}
              disabled={isEaten}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`w-full text-left border p-5 transition-all ${
                isEaten ? "b-gold bg-gold-10 opacity-95" : "b-stone-40 hover:b-gold hover-lift"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`font-display text-2xl shrink-0 ${isEaten ? "c-gold" : "c-stone"}`}>
                  {isEaten ? "✦" : "·"}
                </div>
                <div className="flex-1">
                  <div className={`font-body italic text-base md:text-lg leading-relaxed ${isEaten ? "c-parchment" : "c-parchment-80"}`}>
                    {v.t}
                  </div>
                  <div className={`font-sc fs-10 t-wide-3 mt-2 ${isEaten ? "c-gold" : "c-ash"}`}>
                    {v.ref} {isEaten ? "· COMIDA" : "· TOCAR PARA COMER"}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-10"
          >
            <KeyPoint>
              Imagina que estas cinco frases fueran tu alimento espiritual esta semana
              — no para recitarlas, sino para <span className="c-gold italic">vivirlas</span>.
              Así es como Jeremías sobrevivió cuando todos lo abandonaron.
            </KeyPoint>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Jueves({ onComplete, onOpenPicker }) {
  const day = dayByKey("jueves");

  return (
    <div className="relative">
      <DayChrome day={day} onOpenPicker={onOpenPicker} />
      <div className="day-container">
        <DayHeader day={day} />

        {/* Hook */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <Reveal>
            <Eyebrow>UNA OBSERVACIÓN PASTORAL</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              Dos personas leen el mismo versículo.
              <br />
              <span className="italic c-gold">Una llora. La otra bosteza.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
              No es que el texto sea distinto. No es que una de ellas sea más
              inteligente. Es que <em>el terreno donde cae la palabra</em> está
              en condiciones diferentes. Lo que importa no es solo lo que lees
              — es con qué corazón lo lees.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-body c-parchment-85 text-lg leading-relaxed">
              Hoy la lección es sobre el <span className="c-gold italic">suelo</span>.
              Y el suelo — bendito sea — se puede preparar.
            </p>
          </Reveal>
        </section>

        {/* Sample verse frame */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow>MISMO TEXTO · DOS CORAZONES</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Observa el mismo versículo <span className="italic c-gold">desde dos silencios</span>.
                </h3>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-3xl mx-auto mb-10">
                <VerseCard cite={SAMPLE_VERSE.ref} large>
                  {SAMPLE_VERSE.text}
                </VerseCard>
              </div>
            </Reveal>

            <ReadersSplit />
          </div>
        </section>

        {/* Four soils */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <FourSoils />
        </section>

        {/* Ellen White */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow tone="rubric">TESTIMONIO</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5">
                <Quote cite="ELENA G. DE WHITE · LA EDUCACIÓN, P. 191">
                  La mente necesita ser controlada y disciplinada para poder estudiar
                  con provecho. Es posible leer las Escrituras sin recibir de ellas
                  impresión alguna. La oración ferviente, unida a una vida consagrada,
                  abrirá los tesoros espirituales de la Palabra.
                </Quote>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Eat the words */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <EatTheWords />
        </section>

        {/* Reflection */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-midnight border-t b-gold-10">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <Eyebrow>PARA HOY</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-3xl font-light lh-105 mt-3 mb-5">
                ¿Qué condición tiene <span className="italic c-gold">tu suelo</span> hoy?
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body c-parchment-80 text-lg leading-relaxed mb-5">
                Duro por la rutina. Pedregoso por las pruebas sin raíz. Ahogado
                por los afanes. O bueno, aunque cansado. Diagnostícalo con honestidad.
                La tierra no se culpa — se prepara.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <KeyPoint>
                Antes de abrir la Biblia mañana, haz <em>una</em> cosa nueva: pide
                en voz alta que Dios prepare el suelo antes de sembrar la semilla.
                «Señor, abre mis ojos — y mi corazón.»
              </KeyPoint>
            </Reveal>
          </div>
        </section>

        {/* Bridge */}
        <section className="pb-8 md:pb-12 px-6 md:px-12">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <Eyebrow>LO QUE VIENE</Eyebrow>
              <p className="font-display italic c-parchment-85 text-xl md:text-2xl lh-105 mt-4">
                Y cuando la Palabra entra en el corazón —
                <br />
                <span className="c-gold">sale por la boca</span>.
              </p>
              <p className="font-body italic c-ash text-base mt-4">
                Mañana: lo que la semana ha producido.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="jueves"
          onNext={() => onComplete("jueves")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
