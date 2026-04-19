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
   MIÉRCOLES · 22 de abril
   "Requerimientos bíblicos"
   The sword that divides — and the mirror that sees.
   Verse: Hebreos 4:12 (reprise)
   ================================================================ */

const ATTITUDES = [
  { key: "hambre",      name: "Hambre",               survives: true,  note: "La que pide más." },
  { key: "rendicion",   name: "Rendición",            survives: true,  note: "La que dice: hágase." },
  { key: "obediencia",  name: "Obediencia",           survives: true,  note: "La que actúa lo leído." },
  { key: "humildad",    name: "Humildad",             survives: true,  note: "La que deja ser corregida." },
  { key: "autojust",    name: "Auto-justificación",   survives: false, note: "«Eso no es para mí, es para otros»." },
  { key: "selectividad",name: "Selectividad",         survives: false, note: "Solo lo que confirma lo que ya creo." },
  { key: "cinismo",     name: "Cinismo",              survives: false, note: "Léo para refutar, no para recibir." },
  { key: "miedo",       name: "Miedo a cambiar",      survives: false, note: "Preferir la ceguera conocida." },
];

function HeartBeforeAfter({ chosen, swordDrawn }) {
  return (
    <div className="relative mx-auto" style={{ width: "min(90vw, 460px)" }}>
      <div className="relative ar-square">
        {/* Heart shape background */}
        <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="heartGrad" cx="0.5" cy="0.4" r="0.55">
              <stop offset="0%" stopColor="#f2d370" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#a67f1c" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8b2635" stopOpacity="0.08" />
            </radialGradient>
          </defs>
          <path
            d="M150 260 C60 200 20 140 60 90 C85 60 130 70 150 110 C170 70 215 60 240 90 C280 140 240 200 150 260 Z"
            fill="url(#heartGrad)"
            stroke="#a67f1c"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Scattered attitudes inside heart */}
        <div className="absolute inset-0">
          {chosen.map((k, i) => {
            const a = ATTITUDES.find((x) => x.key === k);
            if (!a) return null;
            const angle = (i / chosen.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 28;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            let state = "pre"; // pre, surviving, falling
            if (swordDrawn) state = a.survives ? "surviving" : "falling";

            return (
              <motion.div
                key={a.key}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  state === "falling"
                    ? { opacity: 0, y: 80, scale: 0.7 }
                    : state === "surviving"
                    ? { opacity: 1, scale: 1.05, y: 0 }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                transition={{ duration: 0.9, delay: state === "falling" ? 0.6 : 0.3 }}
                className="absolute font-sc fs-10 t-wide-3 no-select"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  padding: "6px 10px",
                  border: `1px solid ${state === "surviving" ? "#a67f1c" : state === "falling" ? "#8b2635" : "rgba(166,127,28,0.35)"}`,
                  background: state === "surviving" ? "rgba(166,127,28,0.12)" : "rgba(250,247,240,0.9)",
                  color: state === "falling" ? "#8b2635" : "#1a1510",
                  whiteSpace: "nowrap",
                }}
              >
                {a.name.toUpperCase()}
              </motion.div>
            );
          })}
        </div>

        {/* The sword that passes through */}
        <AnimatePresence>
          {swordDrawn && (
            <motion.div
              initial={{ opacity: 0, x: -120, rotate: 15 }}
              animate={{ opacity: [0, 1, 1, 0.6], x: 0, rotate: 15 }}
              transition={{ duration: 2, times: [0, 0.25, 0.75, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <svg viewBox="0 0 40 300" style={{ height: "110%" }}>
                <g fill="none" stroke="#a67f1c" strokeWidth="2">
                  <line x1="20" y1="10" x2="20" y2="230" />
                  <polyline points="20,230 8,248 20,262 32,248 20,230" />
                  <line x1="4" y1="230" x2="36" y2="230" />
                  <circle cx="20" cy="276" r="5" />
                  <line x1="20" y1="282" x2="20" y2="294" />
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Miercoles({ onComplete, onOpenPicker, onRefrain }) {
  const day = dayByKey("miercoles");
  const [selected, setSelected] = useState([]);
  const [swordDrawn, setSwordDrawn] = useState(false);
  const [mirrorRead, setMirrorRead] = useState(false);

  const toggle = (k) => {
    if (swordDrawn) return;
    setSelected((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : prev.length < 4 ? [...prev, k] : prev
    );
  };

  const passSword = () => {
    if (selected.length < 1) return;
    setSwordDrawn(true);
    if (onRefrain) setTimeout(() => onRefrain(), 1100);
  };

  const reset = () => {
    setSelected([]);
    setSwordDrawn(false);
  };

  const survivors = selected
    .map((k) => ATTITUDES.find((a) => a.key === k))
    .filter((a) => a && a.survives);
  const fallen = selected
    .map((k) => ATTITUDES.find((a) => a.key === k))
    .filter((a) => a && !a.survives);

  return (
    <div className="relative">
      <DayChrome day={day} onOpenPicker={onOpenPicker} />
      <div className="day-container">
        <DayHeader day={day} />

        {/* Hook */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <Reveal>
            <Eyebrow>UNA PALABRA QUE EXIGE RESPUESTA</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3 mb-8">
              La Biblia no pide que la <em>admires</em>.
              <br />
              <span className="italic c-gold">Pide que le respondas.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-6">
              Leer la Escritura sin cambiar no es neutro — es peligroso. Jesús dijo
              que quien oye y no obedece construye sobre arena (Mt 7:26). Santiago
              dijo que quien se mira en el espejo y se olvida del rostro que vio
              está <em>engañado</em>.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <VerseCard cite="HEBREOS 4:12" large>
              La palabra de Dios es viva y eficaz, más cortante que toda espada
              de dos filos; y <span className="c-gold">penetra hasta partir el alma y el espíritu</span>,
              las coyunturas y los tuétanos, y <span className="c-gold">discierne los pensamientos y las intenciones del corazón</span>.
            </VerseCard>
          </Reveal>
        </section>

        {/* Heart interactive */}
        <section className="relative py-12 md:py-20 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow tone="rubric">EL CORAZÓN QUE TRAES</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Elige cuatro actitudes. Pasa <span className="italic c-gold">la espada</span>.
                </h3>
                <p className="font-body italic c-parchment-75 mt-4 max-w-xl mx-auto">
                  ¿Con qué actitudes vienes a leer la Biblia? Toca cuatro — las
                  que reconoces en ti. Después, deja que Hebreos 4:12 las divida.
                </p>
              </div>
            </Reveal>

            {!swordDrawn && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {ATTITUDES.map((a) => {
                    const isOn = selected.includes(a.key);
                    return (
                      <button
                        key={a.key}
                        onClick={() => toggle(a.key)}
                        disabled={!isOn && selected.length >= 4}
                        className={`text-left border p-4 transition-all ${
                          isOn
                            ? "b-gold bg-gold-10"
                            : selected.length >= 4
                            ? "b-stone-40 opacity-50"
                            : "b-stone-40 hover:b-gold hover-lift"
                        }`}
                      >
                        <div className={`font-sc fs-10 t-wide-3 ${isOn ? "c-gold" : "c-gold-60"}`}>
                          {isOn ? "ELEGIDA" : "TOCAR"}
                        </div>
                        <div className={`font-display text-lg lh-105 mt-1 ${isOn ? "c-parchment" : "c-parchment-80"}`}>
                          {a.name}
                        </div>
                        <div className={`font-body italic text-sm mt-1 ${isOn ? "c-parchment-85" : "c-ash"}`}>
                          {a.note}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center">
                  <button
                    onClick={passSword}
                    disabled={selected.length === 0}
                    className="nav-btn primary hover-lift"
                  >
                    <span>Pasar la espada · {selected.length} / 4</span>
                    <span aria-hidden>⚔</span>
                  </button>
                </div>
              </>
            )}

            {swordDrawn && (
              <>
                <HeartBeforeAfter chosen={selected} swordDrawn={swordDrawn} />

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="mt-12 max-w-3xl mx-auto grid md:grid-cols-2 gap-6"
                >
                  <div className="border-l-2 b-gold-30 pl-5 bg-gold-10 py-4">
                    <div className="font-sc fs-10 t-wide-3 c-gold mb-3">
                      QUEDARON EN PIE · {survivors.length}
                    </div>
                    {survivors.length === 0 && (
                      <div className="font-body italic c-parchment-75">
                        Ninguna de las actitudes que trajiste resistió el filo.
                        Eso también es una respuesta — y un buen comienzo.
                      </div>
                    )}
                    <ul className="space-y-2">
                      {survivors.map((a) => (
                        <li key={a.key} className="font-display c-parchment text-lg">
                          ✦ {a.name}{" "}
                          <span className="font-body italic c-parchment-75 text-base">
                            — {a.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l-2 b-rubric-50 pl-5 bg-rubric-10 py-4">
                    <div className="font-sc fs-10 t-wide-3 c-rubric mb-3">
                      CAYERON · {fallen.length}
                    </div>
                    {fallen.length === 0 && (
                      <div className="font-body italic c-parchment-75">
                        Trajiste solo actitudes que sobreviven al filo.
                        Revísalo con honestidad — ¿de verdad ninguna?
                      </div>
                    )}
                    <ul className="space-y-2">
                      {fallen.map((a) => (
                        <li key={a.key} className="font-display c-parchment text-lg line-through" style={{ textDecorationColor: "#8b2635" }}>
                          ✕ {a.name}{" "}
                          <span className="font-body italic c-parchment-75 text-base no-underline">
                            — {a.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  className="mt-8 text-center"
                >
                  <button onClick={reset} className="font-sc fs-10 t-wide-3 c-ash hover:c-gold border-b b-stone-40 hover:b-gold pb-1">
                    Volver a elegir
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* James 1 mirror */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Eyebrow>EL ESPEJO DE SANTIAGO</Eyebrow>
                <h3 className="font-display c-parchment text-3xl md:text-5xl font-light lh-105 mt-3">
                  Dos hombres se miran. <span className="italic c-gold">Solo uno cambia.</span>
                </h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-10">
              <Reveal>
                <div className="border b-stone-50 p-6 md:p-8 h-full">
                  <div className="font-sc fs-10 t-wide-3 c-ash mb-3">EL QUE SE OLVIDA</div>
                  <div className="font-display text-2xl c-parchment mb-4 lh-105">
                    Se mira. <span className="italic">Ve algo.</span> Se va.
                  </div>
                  <p className="font-body c-parchment-85 leading-relaxed">
                    Ve la mancha. Nota el cabello revuelto. Reconoce el rasgo.
                    Pero sale, y lo que vio se desvanece antes de llegar a la puerta.
                    Este — dice Santiago — se <span className="c-rubric">engaña a sí mismo</span>.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className={`border p-6 md:p-8 h-full transition-all ${mirrorRead ? "b-gold bg-gold-10" : "b-stone-50 hover-lift cursor-pointer"}`}
                     onClick={() => setMirrorRead(true)}
                     role="button"
                     tabIndex={0}
                     onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setMirrorRead(true)}
                >
                  <div className={`font-sc fs-10 t-wide-3 mb-3 ${mirrorRead ? "c-gold" : "c-ash"}`}>
                    EL QUE HACE LA PALABRA
                  </div>
                  <div className="font-display text-2xl c-parchment mb-4 lh-105">
                    Se mira. <span className="italic c-gold">Actúa lo que ve.</span> Es bienaventurado.
                  </div>
                  {!mirrorRead ? (
                    <div className="font-sc fs-10 t-wide-3 c-gold">TOCA PARA ABRIR EL TEXTO</div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <VerseCard cite="SANTIAGO 1:22-25">
                        Sed hacedores de la palabra, y no tan solamente oidores,
                        engañándoos a vosotros mismos. Porque si alguno es oidor
                        de la palabra pero no hacedor, será semejante al hombre
                        que considera en un espejo su rostro natural. Se considera
                        a sí mismo, y se va, y luego olvida cómo era. Mas el que
                        mira atentamente en la perfecta ley, la de la libertad,
                        y persevera en ella, <span className="c-gold">éste será
                        bienaventurado en lo que hace</span>.
                      </VerseCard>
                    </motion.div>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <KeyPoint label="EL PUNTO">
                La Biblia no te evalúa por cuánto sabes. Te evalúa por cuánto
                <span className="c-gold italic"> haces con lo que sabes</span>.
                El lector olvidadizo y el discípulo fiel tienen la misma biblia
                abierta — y terminan en lugares distintos.
              </KeyPoint>
            </Reveal>
          </div>
        </section>

        {/* Ps 119:11 */}
        <section className="relative py-12 md:py-16 px-6 md:px-12 bg-midnight border-t border-b b-gold-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow>CÓMO SE RECIBE</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display c-parchment text-2xl md:text-4xl font-light lh-105 mt-3 mb-6">
                El salmista tiene <span className="italic c-gold">un verbo</span> para esto.
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <VerseCard cite="SALMO 119:11" large>
                En mi corazón he <span className="c-gold">guardado</span> tus dichos,
                para no pecar contra ti.
              </VerseCard>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-body c-parchment-85 text-lg leading-relaxed mt-6">
                «Guardado» — atesorado, protegido, escondido como un tesoro.
                No es memorización mecánica: es <em>posesión del corazón</em>.
                La Palabra guardada es munición en la hora de la tentación,
                consuelo en la hora del dolor, luz en la hora de la duda.
              </p>
            </Reveal>
          </div>
        </section>

        {/* White quote */}
        <section className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Quote cite="ELENA G. DE WHITE · EL DESEADO DE TODAS LAS GENTES, P. 390">
                La Biblia es su propio expositor. Debe comparar escritura con escritura.
                El que estudia debe aprender a ver la Palabra como un todo, y discernir
                la relación de sus partes. Pero — sobre todo — debe ponerla en práctica.
                Saber sin obedecer es saber en vano.
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
                Una orden concreta. <span className="italic c-gold">Una hoy.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body c-parchment-80 text-lg leading-relaxed mb-5">
                Antes de dormir hoy, escoge <em>un</em> mandato bíblico que has
                estado aplazando. No necesita ser el más grande. Solo uno.
                Y hazlo antes de que amanezca mañana.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <KeyPoint>
                Puede ser perdonar, pedir perdón, callar, hablar, dar, dejar,
                comenzar, parar. Lo que has estado leyendo sin hacer — hazlo
                hoy. La espada no corta para matar; <span className="c-gold italic">corta para sanar</span>.
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
                Pero dos personas leen el mismo texto y reciben cosas distintas.
                <br />
                <span className="c-gold">¿Por qué?</span>
              </p>
              <p className="font-body italic c-ash text-base mt-4">
                Mañana: la condición del corazón.
              </p>
            </div>
          </Reveal>
        </section>

        <DayCompleteNavigator
          currentKey="miercoles"
          onNext={() => onComplete("miercoles")}
          onPick={onOpenPicker}
        />
      </div>
    </div>
  );
}
