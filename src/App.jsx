import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/* =================================================================
   EL PAPEL DE LA BIBLIA — v3 (cache-bust rename)
   Escuela Sabática para Maestros · Lección 4 · 25 de abril de 2026

   Light parchment-and-ink palette.
   Root component: LeccionBibliaV3  (renamed from BibleLessonExperience
   to force the Claude app WebView to treat this as a new artifact
   and bypass the stale cache that was still serving the old navy bundle.)
   ================================================================ */

const GlobalStyles = () => {
  React.useEffect(() => {
    const id = "lesson-global-styles-v3";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500&family=Cormorant+SC:wght@400;500&display=swap');

    /* Safety fallback */
    body, #root, [data-lesson-root] { color: #1a1510 !important; background-color: #faf7f0 !important; }
    [data-lesson-root] * { color: inherit; }

    html, body, #root { background: #faf7f0; }

    .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
    .font-body { font-family: 'EB Garamond', serif; }
    .font-sc { font-family: 'Cormorant SC', serif; letter-spacing: 0.12em; }

    @keyframes inkBreathe {
      0%, 100% { text-shadow: 0 0 0 transparent; }
      50% { text-shadow: 0 0 24px rgba(166, 127, 28, 0.4); }
    }
    .ink-breathe { animation: inkBreathe 5s ease-in-out infinite; }

    @keyframes candleFlicker {
      0%, 100% { opacity: 0.85; }
      45% { opacity: 1; }
      50% { opacity: 0.7; }
      55% { opacity: 0.95; }
    }
    .candle-flicker { animation: candleFlicker 4s ease-in-out infinite; }

    @keyframes goldAura {
      0%, 100% { box-shadow: 0 0 60px 0 rgba(166, 127, 28, 0.15); }
      50% { box-shadow: 0 0 120px 20px rgba(166, 127, 28, 0.35); }
    }
    .gold-aura { animation: goldAura 7s ease-in-out infinite; }

    /* Letter spacing */
    .t-wide-2 { letter-spacing: 0.2em; }
    .t-wide-3 { letter-spacing: 0.3em; }
    .t-wide-32 { letter-spacing: 0.32em; }
    .t-wide-35 { letter-spacing: 0.35em; }
    .t-wide-38 { letter-spacing: 0.38em; }
    .t-wide-4 { letter-spacing: 0.4em; }

    /* Font sizes */
    .fs-9 { font-size: 9px; }
    .fs-10 { font-size: 10px; }
    .fs-11 { font-size: 11px; }

    /* Line heights */
    .lh-95 { line-height: 0.95; }
    .lh-105 { line-height: 1.05; }

    /* Aspect ratios */
    .ar-square { aspect-ratio: 1 / 1; }
    .ar-1-2 { aspect-ratio: 1 / 2; }
    .ar-3-4 { aspect-ratio: 3 / 4; }
    .ar-3-5 { aspect-ratio: 3 / 5; }

    /* Viewport squares */
    .vsq-35 { width: 35vw; height: 35vw; }
    .vsq-70 { width: 70vw; height: 70vw; }

    /* Positions */
    .pos-top-22 { top: 22%; }
    .pos-top-55 { top: 55%; }

    .inset-p-8 { top: 8%; right: 8%; bottom: 8%; left: 8%; }
    .inset-p-16 { top: 16%; right: 16%; bottom: 16%; left: 16%; }
    .inset-p-32 { top: 32%; right: 32%; bottom: 32%; left: 32%; }

    /* Grids */
    .gt-sidebar { display: grid; grid-template-columns: 1fr; gap: 3rem; }
    @media (min-width: 768px) {
      .gt-sidebar-420 { grid-template-columns: 420px 1fr; }
    }

    /* Radial gradients (light palette) */
    .rg-candle-1 { background: radial-gradient(circle, rgba(160,120,48,0.2), rgba(166,127,28,0.05), transparent 70%); }
    .rg-candle-2 { background: radial-gradient(circle, rgba(160,120,48,0.35), transparent 70%); }
    .rg-dim-bible { background: radial-gradient(circle, transparent 30%, rgba(26,21,16,0.35) 70%); }
    .rg-page-glow { background: radial-gradient(circle at center, rgba(166,127,28,0.12), transparent 70%); }

    /* Linear gradients (light palette) */
    .g-chapter-div { background: linear-gradient(to right, rgba(166,127,28,0.6), rgba(166,127,28,0.15), transparent); }
    .g-scroll-hint { background: linear-gradient(to bottom, rgba(166,127,28,0.7), transparent); }
    .g-gold-night { background: linear-gradient(to bottom right, rgba(166,127,28,0.15), #faf7f0); }
    .g-midnight-fade { background: linear-gradient(to bottom right, #f2ede1, #faf7f0); }
    .g-rubric-fade { background: linear-gradient(to bottom right, rgba(139,38,53,0.08), #faf7f0); }
    .g-gold-10-b { background: linear-gradient(to bottom, rgba(166,127,28,0.1), transparent); }
    .g-gold-10-br { background: linear-gradient(to bottom right, rgba(166,127,28,0.1), transparent); }
    .g-vitality { background: linear-gradient(to right, #8b2635, #a67f1c, #d4a02a); }
    .g-heart-gold { background: linear-gradient(to right, rgba(166,127,28,0.2), transparent); }
    .g-heart-rubric { background: linear-gradient(to right, rgba(139,38,53,0.2), transparent); }

    /* ====== Color utilities (all !important; all light-theme remapped) ====== */
    /* Primary text: warm near-black */
    .c-parchment { color: #1a1510 !important; }
    .c-parchment-70 { color: rgba(26,21,16,0.70) !important; }
    .c-parchment-75 { color: rgba(26,21,16,0.75) !important; }
    .c-parchment-80 { color: rgba(26,21,16,0.80) !important; }
    .c-parchment-85 { color: rgba(26,21,16,0.85) !important; }
    .c-parchment-90 { color: rgba(26,21,16,0.90) !important; }
    .c-parchment-95 { color: rgba(26,21,16,0.95) !important; }

    /* Secondary muted text */
    .c-ash { color: #6b5d4f !important; }
    .c-ash-80 { color: rgba(107,93,79,0.80) !important; }

    /* Gold (accent) darkened for white */
    .c-gold { color: #a67f1c !important; }
    .c-gold-60 { color: rgba(166,127,28,0.60) !important; }
    .c-gold-80 { color: rgba(166,127,28,0.80) !important; }
    .c-gold-90 { color: rgba(166,127,28,0.90) !important; }

    /* Rubric red stays */
    .c-rubric { color: #8b2635 !important; }
    .c-rubric-80 { color: rgba(139,38,53,0.80) !important; }

    /* Stone / slate muted grays */
    .c-stone { color: #a59584 !important; }

    /* Backgrounds — section surfaces */
    .bg-night { background-color: #faf7f0; }
    .bg-midnight { background-color: #f2ede1; }
    .bg-night-60 { background-color: rgba(165,140,95,0.12); }

    /* Borders */
    .b-gold { border-color: #a67f1c; }
    .b-gold-10 { border-color: rgba(166,127,28,0.20); }
    .b-gold-15 { border-color: rgba(166,127,28,0.25); }
    .b-gold-20 { border-color: rgba(166,127,28,0.30); }
    .b-gold-25 { border-color: rgba(166,127,28,0.35); }
    .b-gold-30 { border-color: rgba(166,127,28,0.45); }
    .b-gold-40 { border-color: rgba(166,127,28,0.55); }
    .b-gold-50 { border-color: rgba(166,127,28,0.65); }

    .b-rubric { border-color: #8b2635; }
    .b-rubric-30 { border-color: rgba(139,38,53,0.30); }
    .b-rubric-50 { border-color: rgba(139,38,53,0.50); }

    .b-stone-40 { border-color: rgba(165,149,132,0.40); }
    .b-stone-50 { border-color: rgba(165,149,132,0.50); }
    .b-ash { border-color: #8a7a68; }

    .bg-rubric-15 { background-color: rgba(139,38,53,0.15); }
    .bg-rubric-10 { background-color: rgba(139,38,53,0.10); }
    .bg-gold-10 { background-color: rgba(166,127,28,0.10); }
    .bg-stone-30 { background-color: rgba(165,149,132,0.30); }
    .bg-gold { background-color: #a67f1c; }
    .bg-stone { background-color: #a59584; }
    .bg-ash { background-color: #8a7a68; }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f0ebe0; }
    ::-webkit-scrollbar-thumb { background: #c5b8a3; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #a59584; }

    button:focus-visible, [role="button"]:focus-visible {
      outline: 1px solid #a67f1c;
      outline-offset: 4px;
    }

    .parchment-grain::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: 0.08;
      z-index: 100;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      mix-blend-mode: multiply;
    }
  `;
    document.head.appendChild(el);
    return () => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    };
  }, []);
  return null;
};

/* ==== Shared components ==== */

const ChapterMark = ({ num, title }) => (
  <div className="flex items-center gap-4 mb-10">
    <div className="font-sc fs-11 t-wide-32 c-gold">
      · {num.toString().padStart(2, "0")} ·
    </div>
    <div className="h-px flex-1 g-chapter-div" />
    <div className="font-sc fs-10 t-wide-32 c-gold-60">{title}</div>
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-14">
    <h2 className="font-display c-parchment text-4xl md:text-6xl font-light lh-105">
      {children}
    </h2>
    {subtitle && (
      <p className="font-body italic c-ash text-lg md:text-xl mt-5 max-w-3xl leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Scripture = ({ reference, children, large = false, rubric = true }) => (
  <blockquote className={`relative border-l-2 ${rubric ? "b-rubric" : "b-gold"} pl-6 my-8`}>
    <p className={`font-body italic c-parchment-95 ${large ? "text-2xl md:text-3xl leading-snug" : "text-xl leading-relaxed"}`}>
      {children}
    </p>
    <cite className={`font-sc text-xs not-italic mt-3 block ${rubric ? "c-rubric" : "c-gold"}`}>
      ― {reference}
    </cite>
  </blockquote>
);

const RevealText = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ==== Chapter 0 — Overture ==== */

const Overture = ({ onBegin }) => {
  const { scrollYProgress } = useScroll();
  const bookOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const bookScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.2]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-night">
      <motion.div style={{ opacity: bookOpacity, scale: bookScale }} className="absolute inset-0">
        <div className="absolute left-1/2 pos-top-55 -translate-x-1/2 -translate-y-1/2 vsq-70 rounded-full blur-3xl rg-candle-1" />
        <div className="absolute left-1/2 pos-top-55 -translate-x-1/2 -translate-y-1/2 vsq-35 rounded-full blur-2xl rg-candle-2 candle-flicker" />
      </motion.div>

      <svg className="absolute left-1/2 pos-top-22 -translate-x-1/2 w-32 h-32 opacity-20" viewBox="0 0 100 100">
        <motion.path d="M 50 20 L 50 80 M 30 50 L 70 50" stroke="#a67f1c" strokeWidth="0.6" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5 }} />
        <motion.circle cx="50" cy="50" r="18" stroke="#a67f1c" strokeWidth="0.4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 2 }} />
      </svg>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, letterSpacing: "0.15em" }} animate={{ opacity: 1, letterSpacing: "0.38em" }}
          transition={{ duration: 2.8, delay: 0.3 }} className="font-sc c-gold text-xs md:text-sm mb-8">
          ESCUELA SABÁTICA PARA MAESTROS · LECCIÓN IV
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2.2, delay: 1 }}
          className="font-display c-parchment text-5xl md:text-8xl font-light lh-95">
          El Papel <span className="italic c-gold font-light">de la</span>
          <br />
          Biblia
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2.4 }}
          className="mt-12 max-w-xl mx-auto">
          <p className="font-body italic c-ash text-xl md:text-2xl leading-relaxed">
            Un libro prohibido. Copiado en secreto. Contrabandeado.
            Hombres han muerto para que llegara hasta nosotros. Este es
            el mapa del tesoro por el que murieron.
          </p>
        </motion.div>

        <motion.button onClick={onBegin} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.8 }} whileHover={{ scale: 1.03 }}
          className="mt-16 font-sc c-gold-80 text-sm t-wide-32 hover:c-gold transition-colors">
          <span className="block">ABRIR EL LIBRO</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 h-12 w-px g-scroll-hint mx-auto" />
        </motion.button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-sc c-stone fs-10 t-wide-35">PARA EL 25 DE ABRIL DE MMXXVI</p>
      </div>
    </section>
  );
};

/* ==== Chapter 1 — Un libro diferente ==== */

const UnLibroDiferente = () => {
  const [revealed, setRevealed] = useState({});
  const toggle = (key) => setRevealed({ ...revealed, [key]: !revealed[key] });

  const facts = [
    { k: "prohibido", label: "Prohibido", detail: "Durante gran parte de la historia medieval, la Biblia en lengua vernácula fue ilegal. Poseerla podía costar la vida." },
    { k: "contrabando", label: "Contrabandeado", detail: "En el siglo XVI, los Tyndale Bibles eran introducidos en Inglaterra escondidos en fardos de tela. William Tyndale fue estrangulado y quemado por traducirla." },
    { k: "copiado", label: "Copiado en secreto", detail: "Monasterios enteros pasaron siglos copiando manuscritos a mano, a luz de vela, para que el texto no se perdiera." },
    { k: "publicado", label: "El libro más publicado", detail: "Más de cinco mil millones de copias impresas. Traducido a más de tres mil idiomas. Ningún otro libro se le acerca." },
    { k: "antiguo", label: "Uno de los más antiguos", detail: "Los manuscritos más antiguos de partes del Antiguo Testamento datan de más de dos mil años atrás — y aún hoy los leemos." },
    { k: "muerto", label: "Algunos murieron", detail: "Wycliffe, Huss, Tyndale, y miles más sin nombre: murieron no por un libro cualquiera, sino por este. ¿Por qué?" },
  ];

  return (
    <section className="relative py-32 px-6 bg-night border-t b-gold-10">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={1} title="La pregunta que debe hacerse primero" />
        <SectionTitle subtitle="Antes de preguntar qué hace la Biblia, preguntemos por qué un libro — solo uno — ha sido perseguido con tal ferocidad a lo largo de los siglos.">
          Un libro <span className="italic c-gold font-display">diferente</span>.
        </SectionTitle>

        <RevealText>
          <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl">
            Sin duda posees una, o quizás varias. Pero la Biblia que descansa sobre tu mesa de noche tiene un linaje escrito con sangre. Haz clic sobre cada hecho para recordar por qué.
          </p>
        </RevealText>

        <div className="grid md:grid-cols-3 gap-3">
          {facts.map((f, i) => (
            <motion.button key={f.k} onClick={() => toggle(f.k)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`text-left p-6 border transition-all duration-500 ${revealed[f.k] ? "b-gold bg-midnight" : "b-stone-40 hover:b-ash"}`}>
              <div className={`font-sc fs-10 t-wide-3 mb-3 ${revealed[f.k] ? "c-gold" : "c-stone"}`}>
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div className={`font-display text-xl leading-tight mb-3 ${revealed[f.k] ? "c-gold" : "c-parchment-80"}`}>
                {f.label}
              </div>
              <AnimatePresence>
                {revealed[f.k] && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }}
                    className="font-body italic c-parchment-80 text-base leading-relaxed overflow-hidden">
                    {f.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <RevealText delay={0.3}>
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="font-sc fs-10 t-wide-35 c-rubric mb-4">LA PREGUNTA DIRECTA</div>
            <p className="font-display italic c-parchment text-2xl md:text-3xl leading-snug mb-6">
              ¿Qué lugar ocupa este libro en tu vida?
            </p>
            <p className="font-body c-parchment-75 text-lg leading-relaxed">
              ¿La lees, o está juntando polvo cerca de tu cama? ¿Estás demasiado ocupado para dedicarle tiempo? ¿Demasiado cansado para abrir sus páginas?
            </p>
            <p className="font-body c-gold text-lg leading-relaxed mt-6">
              Si la respuesta te incomoda, sigue leyendo. La causa de tu incomodidad tiene nombre — y lo exploraremos a continuación.
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 2 — La estrategia N°1 de Satanás ==== */

const EstrategiaSatanas = () => {
  const [active, setActive] = useState(null);
  const [visited, setVisited] = useState(new Set());

  const tactics = [
    { k: "negocios", label: "Los negocios", position: { top: "0%", left: "50%", transform: "translateX(-50%)" },
      detail: "Llena cada hora con tareas importantes. Nunca hay tiempo, y siempre hay algo más urgente que la Palabra. La urgencia sustituye a la importancia.", angle: 0 },
    { k: "apatia", label: "La apatía", position: { top: "50%", right: "0%", transform: "translateY(-50%)" },
      detail: "Nada más. Nada menos. «Ya sé lo que dice». «Luego la leo». «No hoy». La indiferencia no niega a Dios — simplemente no lo busca.", angle: 90 },
    { k: "cansancio", label: "El cansancio", position: { bottom: "0%", left: "50%", transform: "translateX(-50%)" },
      detail: "No tienes energía. Los ojos pesan. El día fue agotador. «Mañana sí». Pero mañana será igual, y pasado mañana también.", angle: 180 },
    { k: "duda", label: "La duda", position: { top: "50%", left: "0%", transform: "translateY(-50%)" },
      detail: "«¿Y si es mito?». «¿Y si no es confiable?». «¿Y si no tiene nada para mí?». La duda impide la obediencia — porque primero paraliza la atención.", angle: 270 },
  ];

  const handleSelect = (k) => {
    setActive(k);
    setVisited(new Set([...visited, k]));
  };

  const bibleDimness = visited.size / 4;

  return (
    <section className="relative py-32 px-6 bg-midnight">
      <div className="max-w-6xl mx-auto">
        <ChapterMark num={2} title="Domingo · El arma más poderosa" />
        <SectionTitle subtitle="«Mantener a las personas lejos de la Biblia mediante los negocios, la apatía, el cansancio o la duda es su estrategia número uno.»">
          La estrategia <span className="italic c-gold font-display">número uno</span>.
        </SectionTitle>

        <RevealText>
          <p className="font-body c-parchment-85 text-lg leading-relaxed max-w-3xl mb-12">
            De todas las armas que Satanás despliega contra nosotros, esta es la primera: mantenernos lejos de la Biblia. No necesita convencerte de que es falsa. Solo necesita que no la abras.
          </p>
        </RevealText>

        <div className="relative mx-auto w-full max-w-2xl ar-square my-20">
          <div className="absolute inset-0 border b-gold-15 rounded-full" />
          <div className="absolute inset-p-8 border b-gold-25 rounded-full" />
          <div className="absolute inset-p-16 border b-gold-10 rounded-full" />

          <motion.div animate={{ opacity: 1 - bibleDimness * 0.75 }} transition={{ duration: 1 }}
            className="absolute inset-p-32 rounded-full g-gold-night flex items-center justify-center border b-gold-40 gold-aura">
            <div className="text-center">
              <div className="font-display italic c-parchment text-xl md:text-2xl">Palabra</div>
              <div className="font-sc fs-9 t-wide-3 c-gold mt-1">DE DIOS</div>
            </div>
          </motion.div>

          <motion.div animate={{ opacity: bibleDimness * 0.6 }}
            className="absolute inset-0 rounded-full pointer-events-none rg-dim-bible" />

          {tactics.map((t) => {
            const isActive = active === t.k;
            const isVisited = visited.has(t.k);
            return (
              <button key={t.k} onClick={() => handleSelect(t.k)} style={t.position}
                className={`absolute w-28 md:w-36 p-3 md:p-4 -translate-x-1/2 -translate-y-1/2 border transition-all duration-500 ${
                  isActive ? "b-rubric bg-rubric-15"
                    : isVisited ? "b-gold-50 bg-midnight"
                    : "b-stone-50 hover:b-ash bg-night-60"
                }`}>
                <div className={`font-sc fs-9 t-wide-3 mb-1 ${isActive ? "c-rubric" : "c-stone"}`}>
                  · {isVisited ? "VISTO" : "TÁCTICA"} ·
                </div>
                <div className={`font-display text-lg leading-tight ${isActive ? "c-parchment" : isVisited ? "c-gold" : "c-ash"}`}>
                  {t.label}
                </div>
              </button>
            );
          })}

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {tactics.map((t, i) => {
              const angle = (t.angle - 90) * (Math.PI / 180);
              const x = 50 + Math.cos(angle) * 38;
              const y = 50 + Math.sin(angle) * 38;
              return (
                <line key={i} x1={50} y1={50} x2={x} y2={y}
                  stroke={visited.has(t.k) ? "#8b2635" : "#a59584"}
                  strokeWidth="0.15"
                  strokeDasharray={visited.has(t.k) ? "0" : "0.5,0.5"}
                  opacity={visited.has(t.k) ? 0.4 : 0.25} />
              );
            })}
          </svg>
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mt-8 p-8 border-l-2 b-rubric bg-night-60">
              <div className="font-sc fs-10 t-wide-35 c-rubric mb-3">CÓMO OPERA</div>
              <h3 className="font-display c-parchment text-3xl mb-4">
                {tactics.find((t) => t.k === active).label}
              </h3>
              <p className="font-body c-parchment-85 text-lg leading-relaxed">
                {tactics.find((t) => t.k === active).detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {visited.size === 4 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-20 p-10 md:p-14 border b-gold-40 g-midnight-fade max-w-3xl mx-auto">
              <div className="font-sc fs-10 t-wide-35 c-gold mb-4">NOTA ESTO</div>
              <p className="font-body c-parchment text-xl md:text-2xl leading-relaxed italic">
                Las cuatro tácticas tienen algo en común: ninguna niega la Biblia. Todas simplemente impiden que la abras.
              </p>
              <div className="h-px w-24 bg-gold my-6" style={{ opacity: 0.5 }} />
              <p className="font-body c-parchment-85 text-lg leading-relaxed">
                Satanás, que fue querubín protector antes de su caída, conoce el poder de la Palabra de Dios{" "}
                <span className="c-gold">por experiencia propia</span>. Sabe que la poderosa Palabra de Dios lo hace impotente.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <RevealText delay={0.4}>
          <Scripture reference="Efesios 6:17" large rubric={false}>
            Tomad… la espada del Espíritu, que es la palabra de Dios.
          </Scripture>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 3 — Las cuatro funciones ==== */

const CuatroFunciones = () => {
  const [open, setOpen] = useState(0);

  const functions = [
    { n: "I", greek: "διδασκαλίαν", translit: "didaskalían", name: "Enseñar",
      body: "La Escritura nos enseña lo que no sabríamos de otra manera — quién es Dios, quiénes somos, de dónde venimos, a dónde vamos. Sin ella, cada generación debería descubrir estas verdades desde cero.",
      example: "Jesús, enseñando a los de Emaús: «comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían» (Luc. 24:27)." },
    { n: "II", greek: "ἐλεγμόν", translit: "elegmón", name: "Redargüir",
      body: "La Escritura nos expone. Como un espejo sin misericordia pero sin crueldad, nos muestra lo que hay en nosotros que preferiríamos no ver. El profeta Natán no necesitó inventar nada — solo contó la historia, y David se condenó a sí mismo.",
      example: "Natán a David: «Tú eres aquel hombre» (2 Sam. 12:7). La Palabra, bien aplicada, produce el mismo colapso salvador." },
    { n: "III", greek: "ἐπανόρθωσιν", translit: "epanórthōsin", name: "Corregir",
      body: "Literalmente, «enderezar de nuevo lo torcido». La Escritura no se limita a señalar el error — nos muestra cómo volver al camino recto. No es un juez punitivo: es un instructor paciente.",
      example: "Pablo a Pedro en Antioquía, corrigiendo su hipocresía frente a los gentiles (Gál. 2:11-14). Una corrección directa, basada en la verdad del evangelio." },
    { n: "IV", greek: "παιδείαν", translit: "paideían", name: "Instruir en justicia",
      body: "Más que transmitir datos: formar el carácter. «Paideía» era el programa completo de educación griega para formar a un ciudadano. La Escritura forma al santo — no solo lo informa, lo moldea.",
      example: "Timoteo, instruido «desde la niñez» en las Sagradas Escrituras (2 Tim. 3:15). La instrucción sostenida produce sabiduría para la salvación." },
  ];

  return (
    <section className="relative py-32 px-6 bg-night border-t b-gold-10">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={3} title="Lunes · La autoridad de las Escrituras" />
        <SectionTitle subtitle="«Toda la Escritura es inspirada por Dios, y útil…» Pablo nombra cuatro funciones. En griego, cada una es específica.">
          Las cuatro <span className="italic c-gold font-display">funciones</span>.
        </SectionTitle>

        <RevealText>
          <Scripture reference="2 Timoteo 3:16-17" large>
            Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.
          </Scripture>
        </RevealText>

        <div className="mt-12 space-y-4">
          {functions.map((f, i) => (
            <motion.div key={f.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`border transition-colors ${open === i ? "b-gold" : "b-stone-40"}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 md:p-8 flex items-baseline gap-6 text-left">
                <div className={`font-display text-4xl md:text-5xl italic ${open === i ? "c-gold" : "c-stone"}`}>
                  {f.n}
                </div>
                <div className="flex-1">
                  <div className={`font-display text-2xl md:text-3xl ${open === i ? "c-parchment" : "c-ash"}`}>
                    {f.name}
                  </div>
                  <div className={`font-body italic text-sm mt-1 ${open === i ? "c-gold" : "c-stone"}`}>
                    {f.greek} · <span className="font-body not-italic">{f.translit}</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }}
                  className={`text-3xl font-thin ${open === i ? "c-gold" : "c-stone"}`}>
                  +
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 pl-16 md:pl-24">
                      <p className="font-body c-parchment-90 text-lg leading-relaxed mb-6">{f.body}</p>
                      <div className="pt-6 border-t b-gold-20">
                        <div className="font-sc fs-10 t-wide-3 c-rubric mb-2">EJEMPLO BÍBLICO</div>
                        <p className="font-body italic c-parchment-75 text-base leading-relaxed">{f.example}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <RevealText delay={0.4}>
          <div className="mt-16 p-8 border-t border-b b-gold-30">
            <p className="font-body c-parchment text-lg md:text-xl italic leading-relaxed max-w-3xl mx-auto text-center">
              Dios no pretende que prescindamos de nuestro raciocinio. Nos invita a someterlo a su Palabra. La razón es una sierva fiel — pero una señora tiránica.
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 4 — La espada de dos filos ==== */

const EspadaDosFilos = () => {
  const [stage, setStage] = useState(0);

  const pierces = [
    { label: "Alma y espíritu", description: "Lo que parecía una sola cosa — el yo — se revela dividido: lo emocional y lo volitivo. La Palabra distingue lo que los hombres confunden." },
    { label: "Coyunturas y tuétanos", description: "Lo más profundo del cuerpo. La Palabra llega hasta donde nada humano puede llegar — ni el bisturí, ni la introspección." },
    { label: "Pensamientos", description: "Los cálculos secretos. Las intenciones no dichas. Lo que planeas sin decirlo." },
    { label: "Intenciones del corazón", description: "Los motivos que tú mismo no ves. Por qué haces lo que haces. El nivel más profundo — donde solo el Creador del corazón puede leer." },
  ];

  const maxStage = pierces.length;

  return (
    <section className="relative py-32 px-6 bg-midnight">
      <div className="max-w-6xl mx-auto">
        <ChapterMark num={4} title="Miércoles · Requerimientos bíblicos" />
        <SectionTitle subtitle="Hebreos 4:12. La metáfora más aguda que la Escritura aplica a sí misma.">
          La espada <span className="italic c-gold font-display">de dos filos</span>.
        </SectionTitle>

        <RevealText>
          <Scripture reference="Hebreos 4:12" large>
            Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; y penetra hasta partir el alma y el espíritu, las coyunturas y los tuétanos, y discierne los pensamientos y las intenciones del corazón.
          </Scripture>
        </RevealText>

        <div className="mt-16 gt-sidebar gt-sidebar-420 gap-10 items-start">
          <div className="relative ar-1-2 max-w-sm mx-auto w-full">
            <svg viewBox="0 0 100 200" className="w-full h-full">
              <defs>
                <linearGradient id="bladeLight" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#c5b8a3" />
                  <stop offset="50%" stopColor="#a67f1c" />
                  <stop offset="100%" stopColor="#8b2635" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="15" r="5" fill="#a67f1c" opacity={stage > 0 ? 1 : 0.4} />
              <rect x="47" y="18" width="6" height="15" fill="#6b5d4f" opacity={stage > 0 ? 1 : 0.4} />
              <rect x="30" y="32" width="40" height="4" fill="#a67f1c" opacity={stage > 0 ? 1 : 0.4} />
              <motion.path d="M 48 36 L 52 36 L 54 180 L 50 188 L 46 180 Z" fill="url(#bladeLight)"
                initial={{ opacity: 0 }} animate={{ opacity: stage > 0 ? 1 : 0.3 }} transition={{ duration: 1.5 }} />
              <line x1="50" y1="40" x2="50" y2="180" stroke="#faf7f0" strokeWidth="0.4" opacity="0.6" />
              {stage > 0 && Array.from({ length: stage }).map((_, i) => (
                <motion.circle key={i} cx={50 + (i % 2 === 0 ? 8 : -8)} cy={60 + i * 30} r="2" fill="#a67f1c"
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} />
              ))}
            </svg>
          </div>

          <div>
            <div className="font-sc fs-10 t-wide-35 c-gold mb-4">
              {stage === 0 ? "EL FILO AÚN NO SE HA DESENVAINADO" : `ATRAVIESA ${stage} DE ${maxStage}`}
            </div>

            <AnimatePresence mode="wait">
              {stage === 0 ? (
                <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="font-body c-parchment-85 text-lg leading-relaxed">
                  <p className="mb-4">
                    Una espada de dos filos era el arma más afilada de la antigüedad — cortaba al empujar y al retirarse, sin ángulo muerto.
                  </p>
                  <p>
                    Pero la Escritura dice algo aún más audaz:{" "}
                    <span className="c-gold">la Palabra de Dios es <em>más</em> cortante que ella</span>. ¿Qué es tan frágil en nosotros que ninguna espada común puede tocarlo?
                  </p>
                </motion.div>
              ) : (
                <motion.div key={`p-${stage - 1}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.6 }}>
                  <h3 className="font-display c-parchment text-3xl md:text-4xl mb-5">{pierces[stage - 1].label}</h3>
                  <p className="font-body c-parchment-85 text-lg leading-relaxed">{pierces[stage - 1].description}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2 mt-10">
              <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0}
                className="font-sc text-xs tracking-widest px-5 py-3 border b-gold c-gold disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                ←
              </button>
              <button onClick={() => setStage(Math.min(maxStage, stage + 1))} disabled={stage === maxStage}
                className="font-sc text-xs tracking-widest px-6 py-3 border b-gold c-gold disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-1">
                {stage === 0 ? "DESENVAINAR" : stage === maxStage ? "HASTA EL FONDO" : "MÁS PROFUNDO →"}
              </button>
            </div>
          </div>
        </div>

        {stage === maxStage && (
          <RevealText delay={0.2}>
            <div className="mt-20 max-w-3xl mx-auto p-10 border b-gold-30 bg-night-60">
              <div className="font-sc fs-10 t-wide-35 c-gold mb-4">UNA NOTA QUE CAMBIA TODO</div>
              <p className="font-body c-parchment text-lg md:text-xl leading-relaxed italic">
                La espada de dos filos no hiere para matar. Como el bisturí del cirujano, corta para sanar. La Palabra <span className="c-gold">es lo único</span> que puede alcanzar tus intenciones más escondidas — y solo porque las alcanza, puede transformarlas.
              </p>
            </div>
          </RevealText>
        )}
      </div>
    </section>
  );
};

/* ==== Chapter 5 — ¿Ha muerto la verdad? ==== */

const LaVerdad = () => {
  const [reveal, setReveal] = useState(0);

  return (
    <section className="relative py-32 px-6 bg-night border-t b-gold-10">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={5} title="Martes · La verdad bíblica" />
        <SectionTitle subtitle="En 2017, la revista Time publicó en su portada una pregunta que la filosofía occidental llevaba décadas formulando.">
          ¿Ha muerto <span className="italic c-gold font-display">la verdad?</span>
        </SectionTitle>

        <div className="relative max-w-md mx-auto my-12">
          <div className="relative ar-3-4 bg-midnight border b-gold-30 p-8 flex flex-col items-center justify-center text-center gold-aura">
            <div className="absolute top-6 left-6 right-6 flex justify-between items-baseline">
              <span className="font-sc text-xs t-wide-3 c-rubric">MMXVII</span>
              <span className="font-sc text-xs t-wide-3 c-rubric">VOL. CXC</span>
            </div>
            <div className="font-display c-parchment text-7xl md:text-8xl font-light leading-none italic">Is Truth</div>
            <div className="font-display c-rubric text-7xl md:text-8xl font-bold leading-none mt-2">Dead?</div>
            <div className="absolute bottom-6 font-sc fs-10 t-wide-3 c-gold-60">― UNA PREGUNTA SERIA ―</div>
          </div>
        </div>

        <RevealText>
          <p className="font-body c-parchment-85 text-lg md:text-xl leading-relaxed max-w-3xl">
            Según la cultura popular, no existe un criterio normativo para decidir qué es verdad y qué no lo es. No hay fundamento constante. No hay nada que permanezca al paso del tiempo.
          </p>
          <p className="font-body c-parchment-85 text-lg leading-relaxed max-w-3xl mt-4">
            Pero hay un problema lógico en esa afirmación. Haz clic para verlo.
          </p>
        </RevealText>

        <div className="my-16 max-w-3xl mx-auto space-y-4">
          <motion.button onClick={() => setReveal(Math.max(reveal, 1))} whileHover={{ scale: reveal === 0 ? 1.01 : 1 }}
            className={`block w-full p-8 border text-left transition-all ${reveal >= 1 ? "b-rubric-50 bg-midnight" : "b-stone-40 hover:b-ash"}`}>
            <div className="font-sc fs-10 t-wide-3 c-stone mb-2">AFIRMACIÓN</div>
            <p className="font-display c-parchment text-2xl md:text-3xl italic">"La verdad no existe."</p>
            {reveal === 0 && (
              <div className="font-sc fs-10 t-wide-3 c-gold-60 mt-4">HAZ CLIC PARA EXAMINAR →</div>
            )}
          </motion.button>

          <AnimatePresence>
            {reveal >= 1 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.7 }} className="overflow-hidden">
                <motion.button onClick={() => setReveal(Math.max(reveal, 2))} whileHover={{ scale: reveal === 1 ? 1.01 : 1 }}
                  className={`block w-full p-8 border text-left transition-all ${reveal >= 2 ? "b-rubric-50 bg-midnight" : "b-stone-40 hover:b-ash"}`}>
                  <div className="font-sc fs-10 t-wide-3 c-stone mb-2">PREGUNTA</div>
                  <p className="font-display c-parchment text-xl md:text-2xl italic">¿Es verdad esa afirmación?</p>
                  {reveal === 1 && (
                    <div className="font-sc fs-10 t-wide-3 c-gold-60 mt-4">CONTINUAR →</div>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {reveal >= 2 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden p-8 g-rubric-fade border b-rubric-50">
                <div className="font-sc fs-10 t-wide-3 c-rubric mb-3">CONTRADICCIÓN</div>
                <p className="font-body c-parchment text-xl md:text-2xl leading-relaxed italic">
                  Si la verdad no existe, entonces "la verdad no existe" tampoco es verdad.
                </p>
                <p className="font-body c-parchment-85 text-lg mt-4">
                  La afirmación se destruye a sí misma. Afirmar la inexistencia de la verdad es ya proclamar una verdad. El relativismo no sobrevive a su propia lógica.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <RevealText delay={0.3}>
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              { ref: "Juan 17:17", text: "Santifícalos en tu verdad; tu palabra es verdad." },
              { ref: "Prov. 30:5-6", text: "Toda palabra de Dios es limpia; Él es escudo a los que en él esperan." },
              { ref: "Salmo 12:6", text: "Las palabras de Jehová son palabras limpias, como plata refinada en horno de tierra, purificada siete veces." },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}
                className="p-6 border-l-2 b-gold">
                <p className="font-body italic c-parchment-90 text-lg leading-relaxed">{v.text}</p>
                <div className="font-sc fs-10 t-wide-3 c-gold mt-4">{v.ref}</div>
              </motion.div>
            ))}
          </div>
        </RevealText>

        <RevealText delay={0.4}>
          <div className="mt-24 text-center max-w-3xl mx-auto">
            <div className="h-px w-20 bg-gold mx-auto mb-8" style={{ opacity: 0.5 }} />
            <p className="font-body italic c-ash text-lg mb-4">
              En un mundo que pregunta «¿ha muerto la verdad?», Jesús dijo:
            </p>
            <p className="font-display c-parchment text-4xl md:text-6xl italic leading-tight ink-breathe">
              "Yo soy <span className="c-gold">la verdad</span>."
            </p>
            <div className="font-sc fs-11 t-wide-3 c-gold mt-6">― JUAN 14:6</div>
            <p className="font-body c-parchment-80 text-lg leading-relaxed mt-10">
              La verdad no es un concepto flotante a debatir. Es una persona que camina. Su Palabra da testimonio de él, y solo ella es el criterio por el que medimos toda otra afirmación.
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 6 — El alimento diario ==== */

const AlimentoDiario = () => {
  const [nourished, setNourished] = useState([false, false, false, false, false, false, false]);
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const toggleDay = (i) => {
    const next = [...nourished];
    next[i] = !next[i];
    setNourished(next);
  };

  const fedDays = nourished.filter(Boolean).length;
  const vitality = fedDays / 7;

  return (
    <section className="relative py-32 px-6 bg-midnight">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={6} title="Miércoles · El alimento para el alma" />
        <SectionTitle subtitle="Así como el cuerpo necesita comer cada día, el alma necesita la Palabra cada día. Sin ella, nos debilitamos sin notarlo.">
          El <span className="italic c-gold font-display">pan</span> de cada día.
        </SectionTitle>

        <RevealText>
          <Scripture reference="Mateo 4:4" large>
            No sólo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios.
          </Scripture>
        </RevealText>

        <RevealText delay={0.2}>
          <p className="font-body c-parchment-85 text-lg leading-relaxed max-w-3xl mt-8 mb-16">
            Marca cada día en que alimentaste tu alma con la Palabra esta semana. Si el registro te incomoda, déjalo incomodarte.
          </p>
        </RevealText>

        <div className="grid grid-cols-7 gap-2 md:gap-4 mb-10">
          {days.map((d, i) => (
            <button key={i} onClick={() => toggleDay(i)}
              className={`ar-3-5 p-3 md:p-4 border flex flex-col items-center justify-between transition-all duration-500 ${
                nourished[i] ? "b-gold g-gold-10-b" : "b-stone-50 hover:b-ash"
              }`}>
              <div className={`font-sc fs-10 t-wide-2 ${nourished[i] ? "c-gold" : "c-stone"}`}>{d}</div>
              <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-12 md:h-12">
                <ellipse cx="50" cy="55" rx="30" ry="20"
                  fill={nourished[i] ? "#a67f1c" : "transparent"}
                  stroke={nourished[i] ? "#d4a02a" : "#a59584"} strokeWidth="2" />
                {nourished[i] && (
                  <>
                    <path d="M 30 45 Q 50 42 70 45" stroke="#faf7f0" strokeWidth="1" fill="none" opacity="0.6" />
                    <path d="M 32 52 Q 50 48 68 52" stroke="#faf7f0" strokeWidth="1" fill="none" opacity="0.6" />
                  </>
                )}
              </svg>
              <div className={`font-display text-lg ${nourished[i] ? "c-parchment" : "c-stone"}`}>
                {nourished[i] ? "✓" : "—"}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-16">
          <div className="flex justify-between mb-2">
            <div className="font-sc fs-10 t-wide-3 c-ash">VITALIDAD DEL ALMA</div>
            <div className="font-sc fs-10 t-wide-3 c-gold">{fedDays} / 7 DÍAS</div>
          </div>
          <div className="h-2 bg-stone-30 relative overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 g-vitality"
              animate={{ width: `${vitality * 100}%` }} transition={{ duration: 0.8 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={fedDays} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-body italic text-center mt-6 text-lg"
              style={{ color: fedDays <= 2 ? "#8b2635" : fedDays <= 4 ? "#6b5d4f" : fedDays <= 6 ? "#a67f1c" : "#1a1510" }}>
              {fedDays === 0 && "Nada. Hambre total. No se sostiene una vida así."}
              {fedDays === 1 && "Un día. No basta. El alma sigue hambrienta."}
              {fedDays === 2 && "Dos. Como comer solo los fines de semana."}
              {fedDays === 3 && "A medias. Se sobrevive, no se florece."}
              {fedDays === 4 && "Cuatro. Mejor. Aún hay días de sequía."}
              {fedDays === 5 && "Cinco. Se nota la diferencia en el carácter."}
              {fedDays === 6 && "Seis. Casi cada día. La mente se sostiene firme."}
              {fedDays === 7 && "Pan cotidiano. «Dánoslo hoy». Así vive el alma."}
            </motion.p>
          </AnimatePresence>
        </div>

        <RevealText delay={0.3}>
          <div className="max-w-3xl mx-auto p-10 border b-gold-30 bg-night-60">
            <div className="font-sc fs-10 t-wide-35 c-gold mb-4">LO QUE COMEMOS SE ALMACENA</div>
            <Scripture reference="Salmo 119:11" rubric={false}>
              En mi corazón he guardado tus dichos, para no pecar contra ti.
            </Scripture>
            <p className="font-body c-parchment-85 text-lg leading-relaxed mt-6">
              El hebreo dice literalmente <span className="italic c-gold">«he atesorado»</span> — como quien guarda oro en una bóveda. La Palabra leída hoy se convierte en defensa mañana. No la lees para el momento; la atesoras para la crisis.
            </p>
          </div>
        </RevealText>

        <RevealText delay={0.4}>
          <p className="font-body italic c-ash text-lg text-center mt-16 max-w-2xl mx-auto leading-relaxed">
            Jesús, en el desierto, no improvisó. Había atesorado. Cuando llegó la tentación, la bóveda estaba llena: «Escrito está».
          </p>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 7 — La condición del corazón ==== */

const CondicionCorazon = () => {
  const [mode, setMode] = useState("natural");

  return (
    <section className="relative py-32 px-6 bg-night border-t b-gold-10">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={7} title="Jueves · La condición del corazón" />
        <SectionTitle subtitle="Dos personas leen la misma página. Uno ve locura. El otro ve vida. La diferencia no está en la página.">
          Mismo texto. <span className="italic c-gold font-display">Corazones distintos.</span>
        </SectionTitle>

        <RevealText>
          <Scripture reference="1 Corintios 2:14" large>
            Pero el hombre natural no percibe las cosas que son del Espíritu de Dios, porque para él son locura, y no las puede entender, porque se han de discernir espiritualmente.
          </Scripture>
        </RevealText>

        <div className="flex justify-center gap-0 my-16">
          <button onClick={() => setMode("natural")}
            className={`font-sc text-xs md:text-sm t-wide-3 px-6 md:px-10 py-4 border transition-colors ${
              mode === "natural" ? "bg-stone-30 b-ash c-parchment" : "b-stone-50 c-ash hover:c-parchment"
            }`}>
            HOMBRE NATURAL
          </button>
          <button onClick={() => setMode("espiritu")}
            className={`font-sc text-xs md:text-sm t-wide-3 px-6 md:px-10 py-4 border -ml-px transition-colors ${
              mode === "espiritu" ? "bg-gold-10 b-gold c-parchment" : "b-stone-50 c-ash hover:c-parchment"
            }`}>
            ESPÍRITU ABIERTO
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            animate={{
              backgroundColor: mode === "espiritu" ? "rgba(166,127,28,0.05)" : "rgba(165,149,132,0.10)",
              borderColor: mode === "espiritu" ? "#a67f1c" : "#a59584",
            }}
            transition={{ duration: 1 }} className="border p-10 md:p-14 relative">
            <div className="font-sc fs-10 t-wide-3 c-ash text-center mb-6">― MATEO V ―</div>
            <p className="font-body italic c-parchment-90 text-xl leading-relaxed mb-2 text-center">
              "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos."
            </p>
            <div className="font-sc fs-9 t-wide-3 c-gold-60 text-center">5:3</div>

            <AnimatePresence>
              {mode === "espiritu" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none rg-page-glow" />
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
              className="mt-8 p-8 border-l-2"
              style={{ borderColor: mode === "espiritu" ? "#a67f1c" : "#6b5d4f" }}>
              <div className="font-sc fs-10 t-wide-3 mb-3" style={{ color: mode === "espiritu" ? "#a67f1c" : "#6b5d4f" }}>
                {mode === "espiritu" ? "OYE" : "LEE"}
              </div>
              {mode === "natural" ? (
                <>
                  <p className="font-display italic c-ash text-2xl mb-4">"Eso es absurdo."</p>
                  <p className="font-body c-parchment-75 text-lg leading-relaxed">
                    «¿Cómo puede ser bienaventurado el pobre? Bienaventurados son los fuertes, los dotados, los que ganan. Esto no tiene sentido en el mundo real. Tal vez era retórica oriental, o consolación para los fracasados.» El texto se leyó. El corazón no lo recibió. Pasó.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display italic c-gold text-2xl mb-4">"Aquí está mi bienaventuranza."</p>
                  <p className="font-body c-parchment-90 text-lg leading-relaxed">
                    «Yo soy pobre en espíritu. Nada tengo para negociar con Dios. Y por eso — justamente por eso — el reino es mío. Jesús bendice lo que yo desprecio en mí.» El mismo texto. Pero ahora revela, corrige, consuela. La página habla porque el oyente está dispuesto a oír.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <RevealText delay={0.3}>
          <div className="mt-24 max-w-3xl mx-auto text-center">
            <p className="font-body italic c-ash text-lg leading-relaxed mb-8">
              No es que la Biblia sea clara para algunos y oscura para otros. Es que algunos corazones están dispuestos, y otros no.
            </p>
            <p className="font-display c-parchment text-2xl md:text-3xl italic leading-snug">
              "Mucho depende de tu fe y de tus expectativas."
            </p>
            <p className="font-body c-gold-90 text-lg leading-relaxed mt-8">
              La buena noticia: aunque tu fe sea muy pequeña, Dios puede hacerla crecer (Marcos 9:24).
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 8 — Abundancia del corazón ==== */

const AbundanciaCorazon = () => {
  const [heart, setHeart] = useState("word");

  const configs = {
    word: {
      label: "Lleno de la Palabra",
      contents: ["Amor", "Paciencia", "Verdad", "Gracia", "Mansedumbre", "Esperanza"],
      output: "«De la abundancia del corazón habla la boca.» Cuando la Palabra llena, salen palabras afectuosas, amables, edificantes. Aun bajo presión, lo que desborda es lo que se atesoró.",
      outputTone: "c-gold",
      bg: "g-heart-gold",
    },
    world: {
      label: "Lleno del mundo",
      contents: ["Resentimiento", "Ansiedad", "Comparación", "Ira", "Cinismo", "Miedo"],
      output: "«De la abundancia del corazón habla la boca.» Cuando el mundo llena, salen palabras de frustración, queja, maldad. Lo decimos y luego nos arrepentimos — pero ya salió. Lo que había, se reveló.",
      outputTone: "c-rubric",
      bg: "g-heart-rubric",
    },
  };

  const c = configs[heart];

  return (
    <section className="relative py-32 px-6 bg-midnight">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={8} title="Viernes · Para estudiar y meditar" />
        <SectionTitle subtitle="Toda palabra leída no se queda inerte. Llena el corazón. Y lo que llena el corazón, tarde o temprano, sale por la boca.">
          De la <span className="italic c-gold font-display">abundancia</span> del corazón.
        </SectionTitle>

        <RevealText>
          <Scripture reference="Mateo 12:34" large>
            Porque de la abundancia del corazón habla la boca.
          </Scripture>
        </RevealText>

        <div className="flex justify-center gap-2 my-16">
          <button onClick={() => setHeart("word")}
            className={`font-sc text-xs md:text-sm t-wide-3 px-6 py-4 border transition-colors ${
              heart === "word" ? "bg-gold-10 b-gold c-parchment" : "b-stone-50 c-ash"
            }`}>
            LA PALABRA
          </button>
          <button onClick={() => setHeart("world")}
            className={`font-sc text-xs md:text-sm t-wide-3 px-6 py-4 border transition-colors ${
              heart === "world" ? "bg-rubric-10 b-rubric c-parchment" : "b-stone-50 c-ash"
            }`}>
            EL MUNDO
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative ar-square max-w-md mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <motion.path
                d="M 100 180 C 30 130, 20 80, 55 55 C 80 37, 100 60, 100 80 C 100 60, 120 37, 145 55 C 180 80, 170 130, 100 180 Z"
                fill="none"
                stroke={heart === "word" ? "#a67f1c" : "#8b2635"}
                strokeWidth="1.5"
                animate={{ stroke: heart === "word" ? "#a67f1c" : "#8b2635" }}
                transition={{ duration: 0.8 }} />
              <motion.path
                d="M 100 180 C 30 130, 20 80, 55 55 C 80 37, 100 60, 100 80 C 100 60, 120 37, 145 55 C 180 80, 170 130, 100 180 Z"
                fill={heart === "word" ? "rgba(166,127,28,0.08)" : "rgba(139,38,53,0.08)"}
                animate={{ fill: heart === "word" ? "rgba(166,127,28,0.08)" : "rgba(139,38,53,0.08)" }}
                transition={{ duration: 0.8 }} />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <AnimatePresence mode="popLayout">
                  {c.contents.map((word, i) => (
                    <motion.div key={`${heart}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="font-body italic text-sm md:text-base text-center"
                      style={{ color: heart === "word" ? "#1a1510" : "#6b5d4f" }}>
                      {word}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-6">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl font-thin" style={{ color: heart === "word" ? "#a67f1c" : "#8b2635" }}>
              ↓
            </motion.div>
          </div>

          <motion.div
            animate={{ backgroundColor: heart === "word" ? "rgba(166,127,28,0.05)" : "rgba(139,38,53,0.05)" }}
            className={`p-8 md:p-10 border-l-2 ${c.bg}`}
            style={{ borderColor: heart === "word" ? "#a67f1c" : "#8b2635" }}>
            <div className={`font-sc fs-10 t-wide-3 mb-3 ${c.outputTone}`}>LO QUE SALE POR LA BOCA</div>
            <AnimatePresence mode="wait">
              <motion.p key={heart} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} className="font-body c-parchment text-lg leading-relaxed">
                {c.output}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        <RevealText delay={0.3}>
          <div className="mt-24 max-w-3xl mx-auto p-10 border b-rubric-30 bg-night-60">
            <div className="font-sc fs-10 t-wide-35 c-rubric mb-4">UNA PAUSA HONESTA</div>
            <p className="font-display italic c-parchment text-2xl md:text-3xl leading-snug mb-6">
              ¿Cómo evaluarías las palabras que has pronunciado durante las últimas 24 horas?
            </p>
            <p className="font-body c-parchment-80 text-lg leading-relaxed">
              ¿Fueron afectuosas, amables, alegres y edificantes? ¿O expresaron frustración, cansancio, ira, maledicencia? Cuando hay basura en el corazón, aparece en las palabras. Cuando hay la Palabra, también.
            </p>
            <p className="font-body italic c-gold text-lg leading-relaxed mt-6">
              Lo que salió hoy, atesoraste algún día. Lo que quieres que salga mañana, atesóralo hoy.
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

/* ==== Chapter 9 — Anclas de memoria ==== */

const AnclasMemoria = () => {
  const [active, setActive] = useState(null);
  const anchors = [
    { short: "El libro diferente", long: "Ningún otro libro ha sido prohibido, contrabandeado y copiado con vidas como precio. La Biblia no es un libro cualquiera — y el mundo lo reconoce por cómo la trata." },
    { short: "La estrategia número uno", long: "Satanás no necesita convencerme de que la Biblia es falsa. Solo necesita impedir que la abra. Los negocios, la apatía, el cansancio, la duda — cuatro puertas para lo mismo." },
    { short: "Las cuatro funciones", long: "La Escritura enseña, redarguye, corrige, instruye. No es un libro pasivo: está obrando sobre mí mientras la leo." },
    { short: "La espada que sana", long: "Es la única herramienta que llega hasta mis intenciones más profundas. No para destruirme — para sanar lo que ningún otro puede tocar." },
    { short: "La verdad es una persona", long: "En un mundo que declara muerta la verdad, Jesús dice «yo soy la verdad». No un concepto — un rostro. Y su Palabra da testimonio de él." },
    { short: "Pan cotidiano", long: "Lo que atesoro hoy se convierte en defensa mañana. Lo que sale de mi boca en la crisis es lo que entró en mi corazón en la calma." },
  ];

  return (
    <section className="relative py-32 px-6 bg-night border-t b-gold-10">
      <div className="max-w-5xl mx-auto">
        <ChapterMark num={9} title="Para no olvidar" />
        <SectionTitle subtitle="Seis verdades para atesorar en el corazón esta semana.">
          Anclas <span className="italic c-gold font-display">de memoria</span>.
        </SectionTitle>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          {anchors.map((a, i) => (
            <motion.button key={i} onClick={() => setActive(active === i ? null : i)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`text-left p-6 md:p-8 border transition-all duration-500 ${
                active === i ? "b-gold g-gold-10-br" : "b-gold-20 hover:b-gold-50"
              }`}>
              <div className="flex items-baseline gap-4 mb-4">
                <div className="font-display c-gold text-3xl italic">{(i + 1).toString().padStart(2, "0")}</div>
                <div className="font-display c-parchment text-xl md:text-2xl">{a.short}</div>
              </div>
              <AnimatePresence>
                {active === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }}
                    className="font-body italic c-parchment-85 text-lg leading-relaxed pt-2 overflow-hidden">
                    {a.long}
                  </motion.p>
                )}
              </AnimatePresence>
              {active !== i && (
                <div className="font-sc fs-9 t-wide-3 c-gold-60">MEDITAR →</div>
              )}
            </motion.button>
          ))}
        </div>

        <RevealText delay={0.3}>
          <div className="mt-24 p-10 md:p-14 border-t border-b b-gold-30">
            <div className="font-sc fs-10 t-wide-35 c-gold mb-6 text-center">― PALABRA FINAL ―</div>
            <p className="font-body italic c-parchment text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-center">
              «Solo los que hayan fortalecido su espíritu con las verdades de la Biblia podrán resistir en el último gran conflicto.»
            </p>
            <cite className="font-sc c-rubric-80 fs-10 not-italic t-wide-3 mt-6 block text-center">
              ― ELENA DE WHITE, EL CONFLICTO DE LOS SIGLOS, P. 580
            </cite>
          </div>
        </RevealText>

        <RevealText delay={0.5}>
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <p className="font-display c-parchment text-3xl md:text-4xl italic leading-tight">
              La Biblia no está juntando polvo.
              <br />
              <span className="c-gold font-display">Está esperando que la abras.</span>
            </p>
          </div>
        </RevealText>

        <div className="mt-32 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }}
            className="font-display c-stone text-sm t-wide-4">
            · FIN DE LA LECCIÓN ·
          </motion.div>
          <p className="font-body italic c-stone text-sm mt-6 max-w-xl mx-auto">
            Escuela Sabática para Maestros · Lección IV
            <br />
            Para el 25 de abril de 2026
          </p>
        </div>
      </div>
    </section>
  );
};

/* ==== Navigation ==== */

const Nav = ({ chapters, active }) => (
  <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
    <div className="space-y-3">
      {chapters.map((c, i) => (
        <a
          key={i}
          href={`#ch${i}`}
          className="group flex items-center gap-3 justify-end"
          title={c.title}
        >
          <span
            className={`font-sc fs-9 t-wide-3 transition-all ${
              active === i ? "c-gold opacity-100" : "c-stone opacity-0 group-hover:opacity-100"
            }`}
          >
            {c.title}
          </span>
          <span
            className={`block rounded-full transition-all duration-500 ${
              active === i ? "w-3 h-3 bg-gold" : "w-1.5 h-1.5 bg-stone group-hover:bg-ash"
            }`}
          />
        </a>
      ))}
    </div>
  </nav>
);

/* ==== App (renamed to cache-bust) ==== */

export default function LeccionBibliaV3() {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);

  const chapters = [
    { title: "OVERTURA" },
    { title: "UN LIBRO" },
    { title: "LA ESTRATEGIA" },
    { title: "LAS FUNCIONES" },
    { title: "LA ESPADA" },
    { title: "LA VERDAD" },
    { title: "EL ALIMENTO" },
    { title: "EL CORAZÓN" },
    { title: "LA BOCA" },
    { title: "ANCLAS" },
  ];

  useEffect(() => {
    const handler = () => {
      const sections = document.querySelectorAll("[data-ch]");
      let idx = 0;
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2) {
          idx = i;
        }
      });
      setActive(idx);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        document.getElementById("ch1")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [started]);

  return (
    <div
      data-lesson-root
      className="relative bg-night c-parchment parchment-grain min-h-screen"
      style={{ backgroundColor: "#faf7f0", color: "#1a1510" }}
    >
      <GlobalStyles />
      <Nav chapters={chapters} active={active} />

      <div data-ch id="ch0"><Overture onBegin={() => setStarted(true)} /></div>
      <div data-ch id="ch1"><UnLibroDiferente /></div>
      <div data-ch id="ch2"><EstrategiaSatanas /></div>
      <div data-ch id="ch3"><CuatroFunciones /></div>
      <div data-ch id="ch4"><EspadaDosFilos /></div>
      <div data-ch id="ch5"><LaVerdad /></div>
      <div data-ch id="ch6"><AlimentoDiario /></div>
      <div data-ch id="ch7"><CondicionCorazon /></div>
      <div data-ch id="ch8"><AbundanciaCorazon /></div>
      <div data-ch id="ch9"><AnclasMemoria /></div>
    </div>
  );
}
