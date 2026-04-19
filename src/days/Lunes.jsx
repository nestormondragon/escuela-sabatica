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
   LUNES · 20 de abril
   "La autoridad de las Escrituras"
   Who governs your faith?
   Verse: Juan 17:17
   ================================================================ */

const DOORS = [
  {
    key: "razon",
    name: "La razón humana",
    tag: "«Si no puedo explicarlo, no lo creo».",
    diagnosis:
      "La razón es útil como sirviente, peligrosa como dueña. Cuando tu intelecto decide qué creer, terminas adorando un Dios reducido a tu tamaño — es decir, ya no adoras a Dios. Adoras una idea.",
    flaw: "Un laberinto que siempre regresa al centro: tú.",
    verse:
      "«Fiaos de Jehová con todo vuestro corazón, y no os apoyéis en vuestra propia prudencia».",
    ref: "Proverbios 3:5",
  },
  {
    key: "tradicion",
    name: "La tradición",
    tag: "«Siempre lo hemos creído así».",
    diagnosis:
      "La tradición repite lo que vino antes — pero no puede juzgarse a sí misma. Cuando la costumbre de los padres se vuelve la autoridad final, la verdad se congela. Jesús llamó a esto «anular el mandamiento de Dios por la tradición de los hombres» (Mr 7:13).",
    flaw: "Un círculo que solo señala a sí mismo.",
    verse:
      "«No añadas a sus palabras, para que no te reprenda, y seas hallado mentiroso».",
    ref: "Proverbios 30:6",
  },
  {
    key: "experiencia",
    name: "La experiencia personal",
    tag: "«Yo lo siento así, entonces es así».",
    diagnosis:
      "La experiencia es real, pero el corazón es engañoso (Jer 17:9). Lo que sientes hoy puede contradecir lo que sentirás mañana. La experiencia no puede corregirse a sí misma — necesita un espejo externo, una medida más alta que ella.",
    flaw: "Un espejo que solo refleja la cara del que mira.",
    verse:
      "«Engañoso es el corazón más que todas las cosas, y perverso; ¿quién lo conocerá?».",
    ref: "Jeremías 17:9",
  },
];

function Door({ d, opened, onOpen, i }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
      onClick={onOpen}
      className={`relative w-full text-left border p-5 md:p-6 transition-all hover-lift ${
        opened ? "b-rubric bg-rubric-10" : "b-stone-40 hover:b-rubric bg-night"
      }`}
    >
      {/* Door icon */}
      <div className="flex items-start gap-5">
        <div
          className={`shrink-0 border transition-all ${
            opened ? "b-rubric bg-rubric-15" : "b-stone-50 bg-night-60"
          }`}
          style={{ width: 44, height: 64 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ rotateY: opened ? -65 : 0 }}
              style={{ transformOrigin: "left center", width: "100%", height: "100%" }}
              className={`relative ${opened ? "" : "hover:brightness-110"}`}
            >
              <div
                className={`w-full h-full border-r ${opened ? "b-rubric" : "b-stone-50"}`}
                style={{
                  background: opened
                    ? "linear-gradient(to bottom, rgba(139,38,53,0.12), rgba(139,38,53,0.04))"
                    : "linear-gradient(to bottom, #ede5d3, #d6cdb6)",
                }}
              >
                <div
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                    opened ? "bg-rubric" : "bg-ash"
                  }`}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className={`font-sc fs-10 t-wide-3 ${opened ? "c-rubric" : "c-gold-60"}`}>
            PUERTA {String(i + 1).padStart(2, "0")} · {opened ? "ABIERTA" : "CERRADA"}
          </div>
          <div
            className={`font-display text-xl md:text-2xl lh-105 mt-1 ${
              opened ? "c-parchment" : "c-parchment-80"
            }`}
          >
            {d.name}
          </div>
          <div
            className={`font-body italic text-base mt-1 ${
              opened ? "c-parchment-85" : "c-ash"
            }`}
          >
            {d.tag}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {opened && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t b-rubric-30">
              <div className="font-sc fs-10 t-wide-3 c-rubric mb-2">LA TRAMPA</div>
              <p className="font-body c-parchment-90 text-base md:text-lg leading-relaxed mb-5">
                {d.diagnosis}
              </p>
              <div className="font-display italic c-rubric text-lg md:text-xl leading-snug mb-5">
                {d.flaw}
              </div>
              <div className="font-sc fs-10 t-wide-3 c-gold mb-2">LO QUE DICE LA ESCRITURA</div>
              <blockquote className="font-body italic c-parchment-90 border-l-2 b-gold-30 pl-4 text-base md:text-lg leading-relaxed">
                {d.verse}
                <div className="font-sc text-xs not-italic mt-2 c-gold t-wide-2">{d.ref}</div>
              </blockquote>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function FourthDoor({ ready, opened, onOpen }) {
  if (!ready) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mt-8"
    >
      <div className="absolute -inset-4 rg-page-glow pointer-events-none gold-aura rounded-lg" />
      <button
        onClick={onOpen}
        className={`relative w-full text-left border-2 p-6 md:p-8 transition-all hover-lift bg-night ${
          opened ? "b-gold" : "b-gold-50 hover:b-gold"
        }`}
      >
        <div className="flex items-start gap-5">
          <div
            className="shrink-0 border b-gold bg-gold-10 relative"
            style={{ width: 52, height: 76 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ rotateY: opened ? -75 : 0 }}
                style={{ transformOrigin: "left center", width: "100%", height: "100%" }}
              >
                <div
                  className="w-full h-full border-r b-gold"
                  style={{
                    background: opened
                      ? "radial-gradient(ellipse at right, rgba(242,211,112,0.6), rgba(166,127,28,0.1))"
                      : "linear-gradient(to bottom, #e8d9a8, #c9a855)",
                  }}
                />
              </motion.div>
            </div>
          </div>

          <div className="flex-1">
            <div className="font-sc fs-10 t-wide-3 c-gold">PUERTA IV · LA QUE ESTABA DETRÁS DE TODAS</div>
            <div className="font-display text-2xl md:text-3xl lh-105 mt-1 c-parchment">
              <span className="italic c-gold">La Palabra</span>
            </div>
            <div className="font-body italic text-base md:text-lg mt-2 c-parchment-85">
              «Santifícalos en tu verdad; tu palabra es verdad».
            </div>
          </div>
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t b-gold-30">
                <p className="font-body c-parchment-90 text-lg md:text-xl leading-relaxed mb-5">
                  Las otras tres puertas pueden ser útiles como lámparas pequeñas.
                  Ninguna puede ser <span className="c-gold italic">el sol</span>. Solo
                  hay una luz que no viene de ti, que no te mira a ti, que no te
                  devuelve a ti — que te saca.
                </p>
                <VerseCard cite="JUAN 17:17" large>
                  Santifícalos en tu verdad; <span className="c-gold">tu palabra es verdad</span>.
                </VerseCard>
                <p className="font-body c-parchment-85 text-lg mt-6 leading-relaxed">
                  Jesús no dice «tu palabra <em>contiene</em> la verdad». Dice «tu
                  palabra <em>es</em> la verdad». La Escritura no es un
                  recipiente de la verdad: <span className="c-gold">es la verdad misma</span>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function Lunes({ onComplete, onOpenPicker }) {
  const day = dayByKey("lunes");
  const [opened, setOpened] = useState(new Set());
  const [fourthOpened, setFourthOpened] = useState(false);
  const ready = opened.size === DOORS.length;

  const openDoor = (k) => {
    setOpened((prev) => {
      const next = new Set(prev);
      next.add(k);
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
            <Eyebrow>UNA PREGUNTA INCÓMODA</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              Cada día estás creyendo <span className="italic c-gold">a alguien</span>.
              <br />
              La pregunta es — <span className="c-rubric">¿a quién?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
              Nadie cree por fe en nada. Todos confiamos en <em>algo</em> para
              decidir qué es real. El ateo confía en su razón. El religioso
              puede confiar en su iglesia. El moderno confía en sus sentimientos.
              La pregunta de hoy es: <span className="c-gold">¿de dónde saca tu fe su autoridad?</span>
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-body italic c-parchment-80 text-lg leading-relaxed">
              Hay cuatro puertas. Tres prometen dar acceso a la verdad. Una dice
              ser la verdad. Abramos las cuatro.
            </p>
          </Reveal>
        </section>

        {/* -------- The doors -------- */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow tone="rubric">TRES CAMINOS QUE NO LLEGAN</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-4xl font-light lh-105 mt-3">
                  Ábrelas. Mira qué hay dentro.
                </h3>
              </div>
            </Reveal>

            <div className="space-y-4">
              {DOORS.map((d, i) => (
                <Door
                  key={d.key}
                  d={d}
                  i={i}
                  opened={opened.has(d.key)}
                  onOpen={() => openDoor(d.key)}
                />
              ))}
            </div>

            <FourthDoor
              ready={ready}
              opened={fourthOpened}
              onOpen={() => setFourthOpened(true)}
            />

            {ready && !fourthOpened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-6 font-sc fs-10 t-wide-3 c-gold"
              >
                · APARECE UNA CUARTA PUERTA · TÓCALA ·
              </motion.div>
            )}
          </div>
        </section>

        {/* -------- Scripture cluster -------- */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow>TRES TESTIGOS</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  La Biblia habla <span className="italic c-gold">de sí misma</span>.
                </h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  ref: "PROVERBIOS 30:5",
                  t: "Toda palabra de Dios es limpia; él es escudo a los que en él esperan.",
                  n: "Es pura — sin mezcla.",
                },
                {
                  ref: "SALMO 12:6",
                  t: "Las palabras de Jehová son palabras limpias, como plata refinada en horno de tierra, purificada siete veces.",
                  n: "Es purificada — probada siete veces.",
                },
                {
                  ref: "1 TESALONICENSES 2:13",
                  t: "Cuando recibisteis la palabra de Dios… la recibisteis no como palabra de hombres, sino según es en verdad, la palabra de Dios.",
                  n: "Es divina — no humana.",
                },
              ].map((v, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="border-l-2 b-gold-30 pl-5 h-full">
                    <div className="font-sc fs-10 t-wide-3 c-gold mb-3">{v.ref}</div>
                    <blockquote className="font-body italic c-parchment-95 text-base md:text-lg leading-relaxed mb-4">
                      {v.t}
                    </blockquote>
                    <div className="font-display italic c-parchment text-base md:text-lg">{v.n}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------- Historical anchor -------- */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow tone="rubric">UN MOMENTO EN LA HISTORIA</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-4xl font-light lh-105 mt-3 mb-6">
                Wittenberg, 1517. Un clavo. Noventa y cinco tesis.
                <br />
                <span className="italic c-gold">Sola Scriptura.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
                Cuando Martín Lutero fue llamado a retractarse ante el emperador más
                poderoso de su tiempo, respondió: «A menos que sea convencido por
                testimonio de las Escrituras o por razón evidente — pues no creo ni
                en papas ni en concilios solos, ya que es sabido que con frecuencia
                se han equivocado y contradicho entre sí — mi conciencia está cautiva
                a la Palabra de Dios. <span className="c-gold italic">Aquí estoy. No puedo hacer otra cosa.</span>»
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-body c-parchment-85 text-lg leading-relaxed">
                No era la razón de Lutero contra la tradición de Roma. Era la Palabra
                contra todo lo demás. Cinco siglos después, la iglesia existe porque
                un hombre se paró detrás de la cuarta puerta.
              </p>
            </Reveal>
          </div>
        </section>

        {/* -------- White quote -------- */}
        <section className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Quote cite="ELENA G. DE WHITE · EL CONFLICTO DE LOS SIGLOS, P. 595">
                No hay otro libro que tan plenamente eduque el intelecto, que tan
                eficazmente fortalezca los principios, que tan efectivamente ennoblezca
                el alma. Sigan los niños el ejemplo del niño Jesús y aprendan de la
                Palabra de Dios.
              </Quote>
            </Reveal>
          </div>
        </section>

        {/* -------- Decision -------- */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-midnight border-t b-gold-10">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <Eyebrow>PARA HOY</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-3xl font-light lh-105 mt-3 mb-5">
                Identifica <span className="italic c-gold">una creencia</span> que
                tienes sin fundamento bíblico claro.
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body c-parchment-80 text-lg leading-relaxed mb-5">
                Puede ser una convicción moral, una costumbre religiosa, una idea
                sobre Dios o sobre ti. ¿Viene de la tradición? ¿De la experiencia?
                ¿De tu razón? ¿O de la Palabra?
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <KeyPoint>
                No tienes que cambiarla hoy. Solo nómbrala. Ponla en la mesa.
                Esta semana deja que la Escritura <em>la visite</em> — y ve qué pasa.
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
                Pero si la Palabra es la verdad —
                <br />
                <span className="c-gold">¿de qué está hecha esa verdad?</span>
              </p>
              <p className="font-body italic c-ash text-base mt-4">
                Mañana: la verdad bíblica, purificada siete veces.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="lunes"
          onNext={() => onComplete("lunes")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
