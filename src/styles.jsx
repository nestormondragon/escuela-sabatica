import React from "react";

/* =================================================================
   Global styles injected at runtime — light parchment + gold + ink
   Preserves V3 visual system, adds V4 primitives (day transitions,
   flame motif, sword watermark, navigator footer, picker grid).
   ================================================================ */

const GlobalStyles = () => {
  React.useEffect(() => {
    const id = "lesson-global-styles-v4";
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

    /* Animations ------------------------------------------------- */
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

    @keyframes flameDance {
      0%, 100% { transform: scale(1) translateY(0); opacity: 0.9; }
      25% { transform: scale(1.08) translateY(-1px) skewX(-2deg); opacity: 1; }
      50% { transform: scale(0.96) translateY(1px) skewX(1deg); opacity: 0.85; }
      75% { transform: scale(1.04) translateY(-0.5px) skewX(-1deg); opacity: 0.95; }
    }
    .flame-dance { animation: flameDance 2.6s ease-in-out infinite; transform-origin: 50% 100%; }

    @keyframes drift {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(0.4deg); }
    }
    .drift-slow { animation: drift 9s ease-in-out infinite; }

    @keyframes pulseDot {
      0%, 100% { opacity: 0.35; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.18); }
    }
    .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }

    @keyframes refrainFade {
      0% { opacity: 0; letter-spacing: 0.18em; }
      30% { opacity: 0.95; letter-spacing: 0.36em; }
      100% { opacity: 0; letter-spacing: 0.42em; }
    }
    .refrain-fade { animation: refrainFade 3.2s ease-out forwards; }

    /* Letter spacing */
    .t-wide-2 { letter-spacing: 0.2em; }
    .t-wide-3 { letter-spacing: 0.3em; }
    .t-wide-32 { letter-spacing: 0.32em; }
    .t-wide-35 { letter-spacing: 0.35em; }
    .t-wide-38 { letter-spacing: 0.38em; }
    .t-wide-4 { letter-spacing: 0.4em; }

    .fs-9 { font-size: 9px; }
    .fs-10 { font-size: 10px; }
    .fs-11 { font-size: 11px; }
    .fs-12 { font-size: 12px; }
    .fs-13 { font-size: 13px; }

    .lh-95 { line-height: 0.95; }
    .lh-105 { line-height: 1.05; }

    .ar-square { aspect-ratio: 1 / 1; }
    .ar-1-2 { aspect-ratio: 1 / 2; }
    .ar-3-4 { aspect-ratio: 3 / 4; }
    .ar-3-5 { aspect-ratio: 3 / 5; }

    .vsq-35 { width: 35vw; height: 35vw; }
    .vsq-70 { width: 70vw; height: 70vw; }

    .pos-top-22 { top: 22%; }
    .pos-top-55 { top: 55%; }

    .inset-p-8 { top: 8%; right: 8%; bottom: 8%; left: 8%; }
    .inset-p-16 { top: 16%; right: 16%; bottom: 16%; left: 16%; }
    .inset-p-32 { top: 32%; right: 32%; bottom: 32%; left: 32%; }

    .gt-sidebar { display: grid; grid-template-columns: 1fr; gap: 3rem; }
    @media (min-width: 768px) {
      .gt-sidebar-420 { grid-template-columns: 420px 1fr; }
    }

    /* Radial gradients */
    .rg-candle-1 { background: radial-gradient(circle, rgba(160,120,48,0.2), rgba(166,127,28,0.05), transparent 70%); }
    .rg-candle-2 { background: radial-gradient(circle, rgba(160,120,48,0.35), transparent 70%); }
    .rg-dim-bible { background: radial-gradient(circle, transparent 30%, rgba(26,21,16,0.35) 70%); }
    .rg-page-glow { background: radial-gradient(circle at center, rgba(166,127,28,0.12), transparent 70%); }
    .rg-flame { background: radial-gradient(ellipse at 50% 100%, rgba(166,127,28,0.45), rgba(166,127,28,0.12) 50%, transparent 75%); }

    /* Linear gradients */
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
    .g-day-top { background: linear-gradient(to bottom, rgba(166,127,28,0.10), transparent 40%); }

    /* Colors (all !important for light theme) */
    .c-parchment { color: #1a1510 !important; }
    .c-parchment-70 { color: rgba(26,21,16,0.70) !important; }
    .c-parchment-75 { color: rgba(26,21,16,0.75) !important; }
    .c-parchment-80 { color: rgba(26,21,16,0.80) !important; }
    .c-parchment-85 { color: rgba(26,21,16,0.85) !important; }
    .c-parchment-90 { color: rgba(26,21,16,0.90) !important; }
    .c-parchment-95 { color: rgba(26,21,16,0.95) !important; }

    .c-ash { color: #6b5d4f !important; }
    .c-ash-80 { color: rgba(107,93,79,0.80) !important; }

    .c-gold { color: #a67f1c !important; }
    .c-gold-60 { color: rgba(166,127,28,0.60) !important; }
    .c-gold-80 { color: rgba(166,127,28,0.80) !important; }
    .c-gold-90 { color: rgba(166,127,28,0.90) !important; }

    .c-rubric { color: #8b2635 !important; }
    .c-rubric-80 { color: rgba(139,38,53,0.80) !important; }

    .c-stone { color: #a59584 !important; }

    /* Surfaces */
    .bg-night { background-color: #faf7f0; }
    .bg-midnight { background-color: #f2ede1; }
    .bg-night-60 { background-color: rgba(165,140,95,0.12); }
    .bg-parchment-deep { background-color: #ede5d3; }

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
    .bg-gold-15 { background-color: rgba(166,127,28,0.15); }
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

    /* Global parchment grain overlay */
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

    /* Day shell utilities (V4) ---------------------------------- */
    .day-container { min-height: 100vh; padding-top: 48px; padding-bottom: 120px; }
    .no-select { user-select: none; -webkit-user-select: none; }
    .hover-lift { transition: transform 220ms ease, box-shadow 220ms ease; }
    .hover-lift:hover { transform: translateY(-2px); }
    .hover-gold { transition: color 200ms ease, border-color 200ms ease; }
    .hover-gold:hover { color: #a67f1c; border-color: #a67f1c; }

    /* Sword watermark (V4) */
    .sword-watermark {
      position: fixed;
      right: -8vw; bottom: -6vw;
      width: 60vw; height: 60vw;
      max-width: 720px; max-height: 720px;
      pointer-events: none;
      opacity: 0.035;
      z-index: 0;
      background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 400'%3E%3Cg fill='none' stroke='%231a1510' stroke-width='1.6'%3E%3Cline x1='100' y1='20' x2='100' y2='300'/%3E%3Cpolyline points='100,300 80,320 100,340 120,320 100,300'/%3E%3Cline x1='60' y1='300' x2='140' y2='300'/%3E%3Ccircle cx='100' cy='350' r='6'/%3E%3Cline x1='100' y1='356' x2='100' y2='380'/%3E%3C/g%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: bottom right;
      background-size: contain;
    }

    /* Picker grid (V4) */
    .picker-card {
      border: 1px solid rgba(166,127,28,0.25);
      background: #faf7f0;
      padding: 18px 20px;
      border-radius: 4px;
      text-align: left;
      transition: all 240ms ease;
    }
    .picker-card:hover {
      border-color: rgba(166,127,28,0.8);
      transform: translateY(-2px);
      box-shadow: 0 8px 22px -12px rgba(166,127,28,0.35);
    }
    .picker-card.is-complete { border-color: rgba(166,127,28,0.55); background: rgba(166,127,28,0.06); }
    .picker-card.is-current { border-color: rgba(139,38,53,0.7); box-shadow: 0 0 0 1px rgba(139,38,53,0.4) inset; }

    /* Day nav footer CTA */
    .nav-btn {
      display: inline-flex; align-items: center; gap: 12px;
      padding: 16px 28px;
      border: 1px solid rgba(166,127,28,0.45);
      background: #faf7f0;
      color: #1a1510 !important;
      font-family: 'Cormorant SC', serif;
      letter-spacing: 0.24em;
      font-size: 12px;
      transition: all 240ms ease;
      cursor: pointer;
    }
    .nav-btn:hover { border-color: #a67f1c; background: rgba(166,127,28,0.06); }
    .nav-btn.primary {
      background: #a67f1c;
      color: #faf7f0 !important;
      border-color: #a67f1c;
    }
    .nav-btn.primary:hover { background: #8d6a14; }
    .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  `;
    document.head.appendChild(el);
    return () => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    };
  }, []);
  return null;
};

export default GlobalStyles;
