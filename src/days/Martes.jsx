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
   MARTES · 21 de abril
   "La verdad bíblica"
   Purified seven times — Psalm 12:6
   Verse: Salmo 12:6
   ================================================================ */

/* Each firing removes one kind of dross. The seventh reveals the pure word. */
const DROSS = [
  { name: "Opinión", note: "«A mí me parece que…»" },
  { name: "Rumor", note: "«Dijeron que…»" },
  { name: "Media verdad", note: "Verdad con los hechos convenientes." },
  { name: "Prejuicio", note: "Conclusión antes del estudio." },
  { name: "Miedo", note: "Lo que desearías que fuera cierto o falso." },
  { name: "Costumbre", note: "«Siempre ha sido así»." },
  { name: "Ego", note: "«Yo ya sabía…»" },
];

function Crucible({ firings, onFire, allFired }) {
  return (
    <div className="relative mx-auto max-w-lg">
      {/* Flames beneath */}
      <div className="flex justify-center gap-4 mb-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: firings > 0 ? [0.6, 1, 0.6] : 0.2,
              scale: firings > 0 ? [0.85, 1.05, 0.85] : 1,
            }}
            transition={{ duration: 0.8 + i * 0.15, repeat: Infinity }}
            className="w-6 h-10"
          >
            <svg viewBox="0 0 40 60" className="w-full h-full">
              <path
                d="M20 58 C8 52 6 40 12 30 C14 34 16 34 17 32 C16 24 20 16 20 8 C22 16 28 20 29 28 C31 25 33 26 33 30 C37 40 34 52 20 58 Z"
                fill={firings > 0 ? "#a67f1c" : "#c5b8a3"}
                opacity="0.9"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Crucible */}
      <div
        className="relative mx-auto"
        style={{ width: 280, height: 220 }}
      >
        <svg viewBox="0 0 280 220" className="w-full h-full">
          <defs>
            <radialGradient id="molten" cx="0.5" cy="0.35" r="0.6">
              <stop offset="0%" stopColor="#f2d370" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#a67f1c" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6b4e0e" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          {/* Crucible body */}
          <path
            d="M40 60 L240 60 L220 190 L60 190 Z"
            fill="#2a2118"
            stroke="#1a1510"
            strokeWidth="2"
          />
          {/* Lip */}
          <path
            d="M36 55 L244 55 L244 68 L36 68 Z"
            fill="#3a2e20"
            stroke="#1a1510"
            strokeWidth="1.5"
          />
          {/* Molten contents */}
          <clipPath id="pot">
            <path d="M40 62 L240 62 L220 188 L60 188 Z" />
          </clipPath>
          <g clipPath="url(#pot)">
            <rect x="40" y="65" width="200" height="125" fill="url(#molten)" />
            {/* Silver surface as firings increase */}
            <motion.rect
              x="40"
              y="65"
              width="200"
              height="20"
              animate={{ opacity: firings / 7 }}
              fill="#e8e2d1"
            />
          </g>
        </svg>

        {/* Floating dross labels */}
        <div className="absolute inset-0 pointer-events-none">
          {DROSS.map((d, i) => {
            const burnt = i < firings;
            const x = 20 + (i * 36) % 220;
            const y = 80 + ((i * 17) % 90);
            return (
              <motion.div
                key={d.name}
                animate={{
                  opacity: burnt ? 0 : 0.95,
                  y: burnt ? -40 : 0,
                  scale: burnt ? 0.6 : 1,
                }}
                transition={{ duration: 0.9 }}
                className="absolute font-sc fs-10 t-wide-2"
                style={{
                  left: x,
                  top: y,
                  color: burnt ? "#faf7f0" : "#e8e2d1",
                  textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                }}
              >
                · {d.name.toUpperCase()} ·
              </motion.div>
            );
          })}
        </div>

        {/* Center — the revealed Word */}
        {allFired && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="font-display italic text-center px-6"
              style={{
                color: "#1a1510",
                background: "rgba(250,247,240,0.94)",
                padding: "14px 20px",
                border: "1px solid rgba(166,127,28,0.5)",
              }}
            >
              <div className="fs-10 t-wide-3 c-gold font-sc not-italic mb-1">PLATA PURA</div>
              <div className="text-lg md:text-xl">«Las palabras de Jehová son limpias».</div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-6">
        {!allFired ? (
          <button
            onClick={onFire}
            disabled={firings >= 7}
            className="nav-btn primary hover-lift"
          >
            <span>{firings === 0 ? "Encender el fuego" : `Refinar otra vez · ${firings} / 7`}</span>
            <span aria-hidden>✦</span>
          </button>
        ) : (
          <div className="font-sc fs-10 t-wide-4 c-gold">SIETE VECES · PURIFICADA</div>
        )}
      </div>
    </div>
  );
}

export default function Martes({ onComplete, onOpenPicker }) {
  const day = dayByKey("martes");
  const [firings, setFirings] = useState(0);
  const allFired = firings >= 7;

  return (
    <div className="relative">
      <DayChrome day={day} onOpenPicker={onOpenPicker} />
      <div className="day-container">
        <DayHeader day={day} />

        {/* Hook */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <Reveal>
            <Eyebrow>UNA IDEA ANTIGUA</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              En el siglo XXI, <span className="italic c-gold">la verdad</span>
              {" "}se volvió <span className="c-rubric">una opinión</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
              «Eso será tu verdad, no la mía». «Lo que es verdad para ti no tiene
              por qué serlo para mí». «Cada uno tiene su versión». Frases
              cotidianas — y, sin embargo, cuando te cruzan en rojo, te
              diagnostican mal, o te mienten en un contrato, la verdad
              <em> vuelve a existir</em>.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-body c-parchment-85 text-lg leading-relaxed mb-6">
              La Escritura no flirtea con el relativismo. La Palabra afirma que
              existe una verdad — y que ha sido <em>purificada</em>, no inventada.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <VerseCard cite="SALMO 12:6" large>
              Las palabras de Jehová son palabras limpias, como plata refinada
              en horno de tierra, <span className="c-gold">purificada siete veces</span>.
            </VerseCard>
          </Reveal>
        </section>

        {/* Crucible interactive */}
        <section className="relative py-12 md:py-20 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow tone="rubric">LA FRAGUA</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Siete fuegos. Siete <span className="italic c-gold">purificaciones</span>.
                </h3>
                <p className="font-body italic c-parchment-75 mt-4 max-w-xl mx-auto">
                  Cada pasada del fuego remueve una forma en que las mentiras
                  se cuelan en tu lectura. Enciende el fuego. Siete veces.
                </p>
              </div>
            </Reveal>

            <Crucible
              firings={firings}
              allFired={allFired}
              onFire={() => setFirings((n) => Math.min(7, n + 1))}
            />

            <AnimatePresence>
              {allFired && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="max-w-2xl mx-auto mt-12"
                >
                  <KeyPoint>
                    Lo que queda después de siete fuegos es
                    {" "}<span className="c-gold italic">plata que puede llamarse pura</span>.
                    Así es la Palabra: probada, refinada, sin impurezas. La
                    verdad de Dios no teme el escrutinio — lo invita.
                  </KeyPoint>
                </motion.div>
              )}
            </AnimatePresence>

            {firings > 0 && firings < 7 && (
              <div className="mt-10 max-w-xl mx-auto text-center">
                <div className="font-sc fs-10 t-wide-3 c-gold mb-2">FUEGO {firings} · QUEMÓ</div>
                <div className="font-display italic c-parchment text-lg md:text-xl">
                  {DROSS[firings - 1].name}
                </div>
                <div className="font-body italic c-parchment-75 mt-1">{DROSS[firings - 1].note}</div>
              </div>
            )}
          </div>
        </section>

        {/* Truth cluster */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Eyebrow>TRES VECES DICE JESÚS «VERDAD»</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Y no una teoría — <span className="italic c-gold">una persona</span>.
                </h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  ref: "JUAN 14:6",
                  t: "Yo soy el camino, y la verdad, y la vida.",
                  n: "La verdad es una Persona.",
                },
                {
                  ref: "JUAN 17:17",
                  t: "Santifícalos en tu verdad; tu palabra es verdad.",
                  n: "La verdad es una Palabra.",
                },
                {
                  ref: "JUAN 8:32",
                  t: "Conoceréis la verdad, y la verdad os hará libres.",
                  n: "La verdad es una libertad.",
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

            <Reveal delay={0.3}>
              <div className="mt-12 max-w-3xl mx-auto">
                <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed">
                  Esto cambia todo. La verdad no es una lista que se aprende —
                  es un Rostro que se encuentra. Cuando la Palabra dice «la verdad»,
                  no describe un sistema. Describe a <span className="c-gold italic">Jesús hablando</span>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Isaías 55 — the word that returns full */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow>LA PALABRA QUE VUELVE CARGADA</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-4xl font-light lh-105 mt-3 mb-6">
                Dios hace <span className="italic c-gold">una promesa</span> sobre su palabra.
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <VerseCard cite="ISAÍAS 55:10-11" large>
                Como desciende de los cielos la lluvia y la nieve, y no vuelve
                allá, sino que riega la tierra… así será mi palabra que sale
                de mi boca; <span className="c-gold">no volverá a mí vacía</span>,
                sino que hará lo que yo quiero, y será prosperada en aquello
                para que la envié.
              </VerseCard>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-body c-parchment-85 text-lg leading-relaxed mt-6">
                La palabra de Dios viene con un mandato. Hace algo. No es decorativa.
                Cuando entra en una vida — aun cuando la vida no parezca responder —
                trabaja. Cuando vuelve al cielo, vuelve <em>cargada</em>: de cosechas,
                de corazones, de cambios. Nunca vacía.
              </p>
            </Reveal>
          </div>
        </section>

        {/* White quote */}
        <section className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Quote cite="ELENA G. DE WHITE · SER SEMEJANTE A JESÚS, P. 266">
                La Palabra de Dios es la verdad eterna. No hay contradicción entre
                el Antiguo y el Nuevo Testamento. Ambos son la voz de Dios. Las
                profecías se cumplen; las promesas se confirman; las advertencias
                no fallan. Toda Escritura está en armonía, porque viene del mismo Autor.
              </Quote>
            </Reveal>
          </div>
        </section>

        {/* Reflection */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-midnight border-t b-gold-10">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <Eyebrow>PARA HOY</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-3xl font-light lh-105 mt-3 mb-5">
                ¿Cuál de las siete <em>escorias</em> está contaminando
                {" "}<span className="italic c-gold">tu</span> lectura de la Biblia?
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <ol className="font-body c-parchment-85 text-lg leading-relaxed space-y-1 mb-6 ml-4">
                {DROSS.map((d, i) => (
                  <li key={d.name}>
                    <span className="c-gold">{i + 1}.</span>{" "}
                    <span className="font-display italic">{d.name}</span>
                    <span className="c-ash"> — {d.note}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.3}>
              <KeyPoint>
                Esta semana, cuando abras la Biblia, pide que el fuego pase
                por <em>una</em> de estas impurezas. No puedes purificarte a
                ti mismo. Pero puedes <span className="c-gold italic">abrirte</span> al fuego.
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
                Si la Palabra es pura, <span className="c-gold">te va a cortar</span>.
                <br />
                Mañana: la espada de dos filos.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="martes"
          onNext={() => onComplete("martes")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
