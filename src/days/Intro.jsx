import React, { useState } from "react";
import { motion } from "framer-motion";
import { DAYS, Flame } from "../ui.jsx";

/* ============================================================
   Intro — the cover. Introduces the lesson, frames the journey,
   and hands the reader to Sábado when they're ready.
   ============================================================ */
export default function Intro({ onStart, onPick, hasProgress }) {
  const [openIndex, setOpenIndex] = useState(false);

  return (
    <section className="relative min-h-screen bg-night flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 vsq-70 rg-page-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
          <Flame size={64} />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4 }}
          className="font-sc fs-11 t-wide-38 c-gold mb-4"
        >
          ESCUELA SABÁTICA · PARA MAESTROS
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.4 }}
          className="font-sc fs-10 t-wide-35 c-ash mb-10"
        >
          LECCIÓN 4 · PARA EL 25 DE ABRIL DE 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.8 }}
          className="font-display c-parchment text-5xl md:text-7xl lg:text-8xl font-light lh-95 mb-8"
        >
          El Papel <span className="italic c-gold">de la</span>
          <br />
          <span className="ink-breathe">Biblia</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="max-w-xl mx-auto"
        >
          <p className="font-body italic c-parchment-85 text-lg md:text-xl leading-relaxed mb-10">
            Siete días. Un libro. Una voz que no se apaga.
            <br className="hidden md:inline" />
            Camina esta semana un día a la vez —
            y deja que la Palabra haga su obra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <button className="nav-btn primary hover-lift" onClick={() => onStart("sabado")}>
            <span>{hasProgress ? "Continuar la lectura" : "Comenzar · Sábado 18"}</span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            className="nav-btn hover-lift"
            onClick={() => setOpenIndex((v) => !v)}
          >
            <span>{openIndex ? "Ocultar índice" : "Ver los siete días"}</span>
          </button>
        </motion.div>

        {/* Tiny inline preview of the seven days */}
        {openIndex && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto"
          >
            {DAYS.map((d) => (
              <button
                key={d.key}
                onClick={() => onPick(d.key)}
                className="picker-card no-select"
              >
                <div className="flex items-start gap-3">
                  <div className="font-sc fs-10 t-wide-3 c-gold mt-1 w-6">{d.roman}</div>
                  <div>
                    <div className="font-sc fs-10 t-wide-3 c-ash">{d.label}</div>
                    <div className="font-display c-parchment text-lg leading-tight">{d.title}</div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 2, delay: 3 }}
          className="mt-16 font-sc fs-10 t-wide-3 c-ash"
        >
          ✦ &nbsp; HEBREOS 4:12 &nbsp; ✦ &nbsp; LA PALABRA ES VIVA &nbsp; ✦
        </motion.div>
      </div>
    </section>
  );
}
