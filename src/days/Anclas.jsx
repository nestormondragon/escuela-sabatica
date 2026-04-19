import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DayChrome,
  Eyebrow,
  Reveal,
  VerseCard,
  Quote,
  KeyPoint,
  Flame,
} from "../ui.jsx";

/* =================================================================
   ANCLAS DE LA SEMANA
   The closing — seven anchors to move from mind to heart.
   ================================================================ */

const ANCHORS = [
  {
    n: "I",
    day: "SÁBADO",
    title: "Está viva",
    body:
      "La Biblia no es un libro antiguo. Es Palabra viva. Ha sobrevivido imperios, prohibiciones y profecías de su muerte — porque quien habla en ella no ha muerto.",
    verse: "La palabra de Dios es viva y eficaz.",
    ref: "Hebreos 4:12",
  },
  {
    n: "II",
    day: "DOMINGO",
    title: "Es tu arma",
    body:
      "En la guerra espiritual no hay otra espada. El enemigo no teme tu inteligencia, tu moral, tu religión — teme la Palabra que se pronuncia, se recuerda, se cree.",
    verse: "Tomad la espada del Espíritu, que es la palabra de Dios.",
    ref: "Efesios 6:17",
  },
  {
    n: "III",
    day: "LUNES",
    title: "Es la autoridad",
    body:
      "No la razón, no la tradición, no la experiencia. La Escritura es la norma sobre la cual todo lo demás se mide — incluyendo lo que tú crees sobre Dios.",
    verse: "Santifícalos en tu verdad; tu palabra es verdad.",
    ref: "Juan 17:17",
  },
  {
    n: "IV",
    day: "MARTES",
    title: "Es pura",
    body:
      "Refinada siete veces, probada sin hallarle defecto. Puedes confiarle lo que más tema perderías. No te engañará. Lo que dice, cumple.",
    verse: "Las palabras de Jehová son palabras limpias.",
    ref: "Salmo 12:6",
  },
  {
    n: "V",
    day: "MIÉRCOLES",
    title: "Te corta",
    body:
      "No para matar — para operar. Lo que hay entre tú y Cristo, la espada lo divide. Obedece lo que lees. La Biblia no premia admiradores; forma discípulos.",
    verse: "Sed hacedores de la palabra, y no tan solamente oidores.",
    ref: "Santiago 1:22",
  },
  {
    n: "VI",
    day: "JUEVES",
    title: "Pide suelo",
    body:
      "El mismo versículo cae en dos corazones y produce frutos distintos. Prepara la tierra. Pídele a Dios que ablande lo endurecido antes de sembrar la semilla.",
    verse: "Fueron halladas tus palabras, y yo las comí.",
    ref: "Jeremías 15:16",
  },
  {
    n: "VII",
    day: "VIERNES",
    title: "Sale por tu boca",
    body:
      "Lo que llena tu corazón se reporta en tus palabras. Si la Escritura es tu abundancia, tus palabras lo dirán. Si es otra cosa — también.",
    verse: "De la abundancia del corazón habla la boca.",
    ref: "Mateo 12:34",
  },
];

function AnchorCard({ a, fixed, onFix, i }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: i * 0.08 }}
      onClick={onFix}
      className={`group relative w-full text-left border p-5 md:p-6 transition-all hover-lift ${
        fixed ? "b-gold bg-gold-10" : "b-stone-40 hover:b-gold bg-night"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <svg
            viewBox="0 0 60 60"
            className={`w-10 h-10 md:w-12 md:h-12 transition-all ${fixed ? "" : "opacity-60"}`}
          >
            <g fill="none" stroke={fixed ? "#a67f1c" : "#a59584"} strokeWidth="1.5">
              <circle cx="30" cy="12" r="5" />
              <line x1="30" y1="17" x2="30" y2="48" />
              <path d="M15 40 C15 50 24 55 30 55 C36 55 45 50 45 40" />
              <line x1="22" y1="22" x2="38" y2="22" />
            </g>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-sc fs-10 t-wide-3 ${fixed ? "c-gold" : "c-gold-60"}`}>
            {a.n} · {a.day}
          </div>
          <div
            className={`font-display text-xl md:text-2xl lh-105 mt-1 ${
              fixed ? "c-parchment" : "c-parchment-80"
            }`}
          >
            {a.title}
          </div>
          <p
            className={`font-body text-base md:text-lg leading-relaxed mt-3 ${
              fixed ? "c-parchment-90" : "c-parchment-75"
            }`}
          >
            {a.body}
          </p>
          <div className={`mt-4 pt-4 border-t ${fixed ? "b-gold-15" : "b-stone-40"}`}>
            <blockquote className={`font-body italic text-base md:text-lg leading-snug ${fixed ? "c-parchment" : "c-parchment-80"}`}>
              «{a.verse}»
            </blockquote>
            <div className={`font-sc fs-10 t-wide-3 mt-2 ${fixed ? "c-gold" : "c-ash"}`}>
              {a.ref}
            </div>
          </div>
          <div className={`mt-4 font-sc fs-10 t-wide-3 transition-colors ${fixed ? "c-gold" : "c-stone group-hover:c-gold"}`}>
            {fixed ? "· FIJADA AL CORAZÓN ·" : "· TOCAR PARA FIJAR AL CORAZÓN ·"}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function Anclas({ onRestart, onPick, onOpenPicker, onRefrain }) {
  const [fixed, setFixed] = useState(new Set());

  const fixOne = (i) => {
    setFixed((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      if (next.size === ANCHORS.length && onRefrain) {
        setTimeout(() => onRefrain(), 500);
      }
      return next;
    });
  };

  const allFixed = fixed.size === ANCHORS.length;

  return (
    <div className="relative">
      <DayChrome
        day={{ roman: "✦", label: "Anclas" }}
        onOpenPicker={onOpenPicker}
      />
      <div className="day-container">
        {/* Header */}
        <header className="relative pt-16 md:pt-24 pb-10 md:pb-16 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-24 g-day-top" />
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="font-sc fs-11 t-wide-35 c-gold-80">✦</div>
              <div className="h-px flex-1 bg-gold-10" style={{ maxWidth: 120 }} />
              <div className="font-sc fs-11 t-wide-35 c-ash">CIERRE DE LA SEMANA</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display c-parchment text-5xl md:text-7xl font-light lh-105 mb-4">
              Anclas <span className="italic c-gold">de la semana</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body italic c-parchment-75 text-lg md:text-xl max-w-2xl">
              Siete verdades — una por día. Ancla la semana en el lugar correcto:
              no en tu mente, en tu <span className="c-gold">corazón</span>.
            </p>
          </Reveal>
        </header>

        {/* Why anchors */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-10">
          <Reveal>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
              Un ancla mantiene el barco en su lugar cuando la marea empuja.
              En los próximos días, algo empujará: el ruido, el cansancio, la
              distracción, la duda. Estas siete frases son anclas — las echas
              al fondo del corazón y te mantienen donde la Palabra te puso.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <VerseCard cite="HEBREOS 6:19" large>
              La cual tenemos como <span className="c-gold">ancla del alma</span>,
              segura y firme, y que penetra hasta dentro del velo.
            </VerseCard>
          </Reveal>
        </section>

        {/* The seven anchors */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow>LAS SIETE</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Toca cada una. Fíjala <span className="italic c-gold">al corazón</span>.
                </h3>
                <p className="font-body italic c-parchment-75 mt-4">
                  {fixed.size} / 7 fijadas
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4">
              {ANCHORS.map((a, i) => (
                <AnchorCard
                  key={i}
                  a={a}
                  i={i}
                  fixed={fixed.has(i)}
                  onFix={() => fixOne(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final blessing when all seven fixed */}
        <AnimatePresence>
          {allFixed && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="py-16 md:py-24 px-6 md:px-12"
            >
              <div className="max-w-3xl mx-auto relative">
                <div className="absolute inset-0 -inset-x-8 rg-page-glow pointer-events-none" />
                <div className="relative text-center">
                  <div className="flex justify-center mb-6">
                    <Flame size={48} />
                  </div>
                  <Eyebrow>BENDICIÓN DE CIERRE</Eyebrow>
                  <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-4 mb-8">
                    De tu <span className="italic c-gold">mente</span> — a tu{" "}
                    <span className="italic c-rubric">corazón</span>.
                  </h3>
                  <p className="font-body c-parchment-90 text-lg md:text-xl leading-relaxed mb-8">
                    Has recorrido siete días. Has leído, respondido, respondido con
                    silencio, respondido con espada. Ahora — la parte más importante
                    es la que ya no depende de leer: deja que la Palabra{" "}
                    <span className="c-gold italic">haga</span>.
                  </p>
                  <div className="border-l-2 b-gold pl-6 py-3 max-w-2xl mx-auto text-left mb-8">
                    <blockquote className="font-display italic c-parchment text-xl md:text-2xl leading-snug">
                      «Lámpara es a mis pies tu palabra, y lumbrera a mi camino.»
                    </blockquote>
                    <div className="font-sc fs-10 t-wide-3 c-gold mt-3">SALMO 119:105</div>
                  </div>
                  <p className="font-body italic c-parchment-85 text-lg leading-relaxed max-w-xl mx-auto">
                    Vete en paz. Y que la Palabra que has escuchado — viva, eficaz,
                    purificada siete veces — sea <span className="c-gold">tu pan esta semana</span>.
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* White quote */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Quote cite="ELENA G. DE WHITE · EL CAMINO A CRISTO, P. 89">
                Cuando os entreguéis a la lectura diaria de la Biblia como alimento
                espiritual, la Palabra llegará a ser para vuestra alma lo que el pan
                es para el cuerpo. Y Cristo morará en vosotros, y vosotros en él.
              </Quote>
            </Reveal>
          </div>
        </section>

        {/* Final actions */}
        <section className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <Eyebrow>HASTA EL PRÓXIMO SÁBADO</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-4xl font-light lh-105 mt-3 mb-8">
                La lección termina aquí —
                <br />
                <span className="italic c-gold">la vida que produce, no.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="nav-btn hover-lift" onClick={onOpenPicker}>
                  <span>Volver a un día</span>
                </button>
                <button className="nav-btn primary hover-lift" onClick={onRestart}>
                  <span>Volver al principio</span>
                  <span aria-hidden>↺</span>
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sc fs-10 t-wide-3 c-ash mt-12">
                ✦ &nbsp; LECCIÓN 4 · EL PAPEL DE LA BIBLIA · 25 DE ABRIL DE 2026 &nbsp; ✦
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
