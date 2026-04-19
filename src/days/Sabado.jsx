import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
   SÁBADO · 18 de abril
   "Un libro que sobrevive"
   Introduction · Why this book matters
   Memory verse: Hebreos 4:12
   ================================================================ */

const MOMENTS = [
  {
    year: "303 d.C.",
    place: "Imperio Romano",
    title: "El edicto de Diocleciano",
    short: "Orden de quemar toda Escritura cristiana.",
    body:
      "El emperador Diocleciano firmó un edicto que ordenaba quemar cada copia de las Escrituras en todo el imperio. Casas fueron registradas. Pergaminos fueron arrojados al fuego en plazas públicas. Se acuñaron monedas conmemorando la «extinción del nombre cristiano».",
    outcome:
      "Diez años después, Constantino legalizó la fe. Las monedas de Diocleciano hoy son objeto de subasta. Las Escrituras que intentó destruir se imprimen hoy en más de 3.400 lenguas.",
  },
  {
    year: "1380",
    place: "Inglaterra",
    title: "La traducción prohibida de Wycliffe",
    short: "Su Biblia fue declarada ilegal. Sus huesos, desenterrados.",
    body:
      "John Wycliffe tradujo la Biblia al inglés para que el campesino pudiera leerla. Murió de causas naturales, pero décadas después el Concilio de Constanza lo declaró hereje: ordenaron desenterrar sus huesos, quemarlos, y arrojar las cenizas al río Swift.",
    outcome:
      "«El río Swift llevó sus cenizas al río Severn, el Severn al mar, y el mar al mundo entero». Hoy la Biblia en inglés es el libro más leído de la historia.",
  },
  {
    year: "1536",
    place: "Vilvoorde, Flandes",
    title: "William Tyndale en la hoguera",
    short: "Estrangulado y quemado por traducir la Biblia al inglés.",
    body:
      "William Tyndale fue traicionado, encarcelado 500 días, y finalmente atado a un poste. Sus últimas palabras, según testigos, fueron una oración: «Señor, abre los ojos del rey de Inglaterra». Luego fue estrangulado y su cuerpo quemado.",
    outcome:
      "Tres años después, Enrique VIII autorizó la Gran Biblia en inglés — traducción basada casi literalmente en la de Tyndale. Su oración fue respondida.",
  },
  {
    year: "1760",
    place: "París",
    title: "La profecía de Voltaire",
    short: "«En 100 años la Biblia será una curiosidad».",
    body:
      "Voltaire, el filósofo más influyente de su siglo, predijo que dentro de cien años la Biblia sería olvidada, conocida solo por coleccionistas. Escribió cartas celebrando el ocaso inminente del cristianismo.",
    outcome:
      "Cincuenta años después de su muerte, la casa donde vivió fue usada por la Sociedad Bíblica de Ginebra para imprimir Biblias. La imprenta zumbaba donde él había escrito contra el Libro.",
  },
  {
    year: "1917-1989",
    place: "Unión Soviética",
    title: "Setenta años de silencio oficial",
    short: "Millones de Biblias confiscadas. Creyentes encarcelados.",
    body:
      "El régimen soviético confiscó Biblias, cerró imprentas, y envió creyentes al Gulag. Una generación entera creció sin acceso legal al libro. En 1961 Kruschev prometió «mostrar al último cristiano por televisión».",
    outcome:
      "Cuando cayó el Muro en 1989, salieron a la luz iglesias clandestinas, Biblias copiadas a mano, y versículos memorizados en secreto. Hoy Rusia imprime Biblias por millones.",
  },
  {
    year: "Hoy",
    place: "tus manos",
    title: "El libro llegó hasta ti",
    short: "Alguien sangró para que puedas abrir esta página.",
    body:
      "Imperios cayeron. Filósofos murieron. Regímenes se desvanecieron. Y el libro — copiado en cuevas, escondido en graneros, memorizado en celdas, traducido por hombres con la espalda ardiente — llegó hasta ti en tu idioma, sin costo, en cualquier momento.",
    outcome:
      "La pregunta de esta semana no es si la Biblia sobrevivirá. La pregunta es qué harás con ella.",
  },
];

function MomentCard({ m, i, open, onOpen }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      onClick={onOpen}
      className={`relative text-left w-full border hover-lift px-5 py-5 transition-all ${
        open ? "b-gold bg-gold-10" : "b-stone-40 bg-night hover:b-gold"
      }`}
    >
      <div className="flex items-baseline gap-4">
        <div className={`font-sc fs-11 t-wide-3 shrink-0 ${open ? "c-gold" : "c-gold-60"}`}>
          {m.year}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-display text-lg md:text-xl lh-105 ${open ? "c-parchment" : "c-parchment-80"}`}>
            {m.title}
          </div>
          <div className={`font-body italic text-base mt-1 ${open ? "c-parchment-85" : "c-ash"}`}>
            {m.short}
          </div>
        </div>
        <div className={`font-display text-2xl shrink-0 ${open ? "c-gold" : "c-stone"}`}>
          {open ? "−" : "+"}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t b-gold-15">
              <div className="font-sc fs-10 t-wide-3 c-gold mb-2">LO QUE PASÓ</div>
              <p className="font-body c-parchment-90 text-base md:text-lg leading-relaxed mb-5">
                {m.body}
              </p>
              <div className="font-sc fs-10 t-wide-3 c-rubric mb-2">LO QUE PASÓ DESPUÉS</div>
              <p className="font-body c-parchment-85 italic text-base md:text-lg leading-relaxed">
                {m.outcome}
              </p>
              <div className="mt-4 text-xs font-sc c-ash t-wide-2">{m.place.toUpperCase()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* HebreosViva — interactive memory-verse reveal. Words of Heb 4:12
   emerge one by one; key words pulse gold. */
function HebreosViva() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const words = [
    { w: "Porque", hi: false },
    { w: "la", hi: false },
    { w: "palabra", hi: true },
    { w: "de", hi: false },
    { w: "Dios", hi: true },
    { w: "es", hi: false },
    { w: "viva", hi: true },
    { w: "y", hi: false },
    { w: "eficaz,", hi: true },
    { w: "más", hi: false },
    { w: "cortante", hi: true },
    { w: "que", hi: false },
    { w: "toda", hi: false },
    { w: "espada", hi: true },
    { w: "de", hi: false },
    { w: "dos", hi: false },
    { w: "filos.", hi: true },
  ];

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto py-10 md:py-16">
      <div className="absolute inset-0 rg-page-glow pointer-events-none" />
      <div className="relative">
        <div className="text-center mb-8">
          <Eyebrow>VERSÍCULO PARA MEMORIZAR</Eyebrow>
        </div>
        <p className="font-display c-parchment text-2xl md:text-4xl lg:text-5xl leading-snug text-center">
          {words.map((t, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              className={`inline-block mr-[0.28em] ${t.hi ? "c-gold italic ink-breathe" : "c-parchment"}`}
            >
              {t.w}
            </motion.span>
          ))}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.8 }}
          className="text-center mt-8 font-sc fs-11 t-wide-3 c-gold"
        >
          HEBREOS 4:12
        </motion.div>
      </div>
    </div>
  );
}

/* Reflection — an open prompt (no saving, just a local textarea) */
function Reflection() {
  const [text, setText] = useState("");
  return (
    <div className="max-w-2xl mx-auto">
      <Eyebrow>UNA PAUSA PARA TI</Eyebrow>
      <h3 className="font-display c-parchment text-2xl md:text-3xl font-light lh-105 mt-3 mb-5">
        ¿Por qué este libro te importa <span className="italic c-gold">a ti</span> esta semana?
      </h3>
      <p className="font-body c-parchment-80 text-base md:text-lg leading-relaxed mb-5">
        No respondas con la respuesta correcta. Responde con la verdad.
        Lo que escribas aquí no sale de tu pantalla — es una pausa honesta.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Esta semana la Biblia me importa porque…"
        className="w-full font-body c-parchment bg-night border b-gold-15 focus:b-gold px-4 py-3 text-base md:text-lg leading-relaxed outline-none"
      />
      <div className="mt-2 font-sc fs-10 t-wide-2 c-ash">
        {text.trim().length > 0 ? "· Guárdala en tu corazón ·" : "\u00A0"}
      </div>
    </div>
  );
}

export default function Sabado({ onComplete, onOpenPicker }) {
  const day = dayByKey("sabado");
  const [openMoment, setOpenMoment] = useState(0);

  return (
    <div className="relative">
      <DayChrome day={day} onOpenPicker={onOpenPicker} />
      <div className="day-container">
        <DayHeader day={day} />

        {/* -------- Opening: Lam 3:22-23 -------- */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <Reveal>
            <Eyebrow>UN LIBRO DIFERENTE</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              De todos los libros que han sido escritos,
              <br />
              <span className="italic c-gold">uno sigue hablando</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-8">
              Ha sido prohibido, quemado, ridiculizado y enterrado. Imperios lo han declarado
              extinto. Filósofos han anunciado su muerte. Regímenes lo han confiscado. Y sin
              embargo — está aquí, en este momento, en tu mano.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <VerseCard cite="LAMENTACIONES 3:22-23" large>
              Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron
              sus compasiones. <span className="c-gold">Nuevas son cada mañana</span>; grande
              es tu fidelidad.
            </VerseCard>
          </Reveal>
        </section>

        {/* -------- Timeline -------- */}
        <section className="relative py-12 md:py-20 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <Eyebrow>LÍNEA DE TIEMPO</Eyebrow>
                <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Seis veces intentaron <span className="italic c-gold">callarlo</span>.
                </h2>
                <p className="font-body italic c-parchment-75 mt-4 max-w-xl mx-auto">
                  Toca cada momento. Lee lo que pasó. Luego lee lo que pasó <em>después</em>.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-3 md:gap-4">
              {MOMENTS.map((m, i) => (
                <MomentCard
                  key={i}
                  m={m}
                  i={i}
                  open={openMoment === i}
                  onOpen={() => setOpenMoment(openMoment === i ? -1 : i)}
                />
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-12 md:mt-16 max-w-2xl mx-auto">
                <KeyPoint>
                  Seis siglos, seis continentes, seis intentos distintos — y el libro
                  llegó. No es un libro común. <span className="c-gold italic">Sobrevive
                  porque está vivo.</span>
                </KeyPoint>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------- Memory verse moment -------- */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <HebreosViva />
        </section>

        {/* -------- White quote -------- */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow tone="rubric">UN TESTIMONIO</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5">
                <Quote cite="ELENA G. DE WHITE · EL CONFLICTO DE LOS SIGLOS, P. 8">
                  La Biblia ha sido siempre para el cristiano el arma más poderosa
                  en su guerra contra el mal, contra el error, contra la desesperación.
                  Ningún otro libro ha recibido tantos ataques. Ninguno ha resistido tantos.
                </Quote>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------- Reflection -------- */}
        <section className="py-16 md:py-20 px-6 md:px-12">
          <Reveal>
            <Reflection />
          </Reveal>
        </section>

        {/* -------- Bridge to Domingo -------- */}
        <section className="pb-8 md:pb-12 px-6 md:px-12">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <Eyebrow>LO QUE VIENE</Eyebrow>
              <p className="font-display italic c-parchment-85 text-xl md:text-2xl lh-105 mt-4">
                Si un libro ha sobrevivido tanto, quizá es porque es
                <span className="c-gold"> un arma</span>. Mañana: por qué Pablo la llama
                <span className="font-body"> la espada del Espíritu</span>.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="sabado"
          onNext={() => onComplete("sabado")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
