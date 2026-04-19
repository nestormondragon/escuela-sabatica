import React, { useEffect } from "react";

/* =================================================================
   GLOBAL STYLES · V5
   Mobile-first, single-screen, touch-driven.
   Runtime-injected so Vercel static build stays tiny.
   ================================================================= */

const STYLE_ID = "lesson-global-styles-v5";

const CSS = `
/* ---- font imports (same tri-face as V3/V4) ---- */
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Cormorant+SC:wght@400;500;600;700&display=swap');

/* ---- reset-ish base ---- */
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #faf7f0;
  color: #1a1510;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: none;
}

body {
  font-family: 'EB Garamond', Georgia, serif;
  text-rendering: optimizeLegibility;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;
}

* { box-sizing: border-box; }
button, [role="button"] { cursor: pointer; user-select: none; -webkit-user-select: none; }
input, textarea { font-family: inherit; }

/* ---- color + type utilities (kept from V3/V4 identity) ---- */
.bg-night       { background: #faf7f0; }
.c-parchment    { color: #1a1510; }
.c-ink          { color: #2a2018; }
.c-muted        { color: #6b5a42; }
.c-gold         { color: #a67f1c; }
.c-gold-soft    { color: #c9a23a; }
.c-rubric       { color: #8b2635; }
.c-deepgold     { color: #7a5e12; }
.bg-gold        { background: #a67f1c; }
.bg-gold-soft   { background: rgba(166,127,28,0.12); }
.bg-rubric      { background: #8b2635; }
.bg-ink         { background: #1a1510; }
.bg-parchment-2 { background: #f4ede0; }
.bg-parchment-3 { background: #ebe2cf; }

.ring-gold      { box-shadow: inset 0 0 0 1px rgba(166,127,28,0.35); }
.ring-gold-2    { box-shadow: inset 0 0 0 2px rgba(166,127,28,0.55); }
.ring-ink       { box-shadow: inset 0 0 0 1px rgba(26,21,16,0.18); }

.font-display   { font-family: 'Fraunces', 'Times New Roman', serif; }
.font-body      { font-family: 'EB Garamond', Georgia, serif; }
.font-sc        { font-family: 'Cormorant SC', 'EB Garamond', serif; letter-spacing: 0.08em; }

.t-wide-20 { letter-spacing: 0.20em; }
.t-wide-25 { letter-spacing: 0.25em; }
.t-wide-30 { letter-spacing: 0.30em; }
.t-wide-35 { letter-spacing: 0.35em; }

.fs-9  { font-size: 9px;  line-height: 14px; }
.fs-10 { font-size: 10px; line-height: 14px; }
.fs-11 { font-size: 11px; line-height: 15px; }
.fs-12 { font-size: 12px; line-height: 16px; }

/* ---- parchment texture ---- */
.parchment-grain {
  background-image:
    radial-gradient(ellipse 900px 600px at 50% 0%, rgba(166,127,28,0.045), transparent 60%),
    radial-gradient(ellipse 700px 500px at 50% 100%, rgba(139,38,53,0.035), transparent 60%),
    repeating-linear-gradient(0deg, rgba(26,21,16,0.012) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(26,21,16,0.008) 0 1px, transparent 1px 2px);
}

/* =================================================================
   SCENE SHELL
   ================================================================= */

:root {
  --strip-h: 68px;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-top: env(safe-area-inset-top, 0px);
}

.scene-viewport {
  position: fixed;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
}

.scene-canvas {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding:
    calc(var(--safe-top) + 18px)
    clamp(16px, 5vw, 28px)
    calc(var(--strip-h) + var(--safe-bottom) + 16px)
    clamp(16px, 5vw, 28px);
  overflow: hidden;
}

.scene-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* =================================================================
   DAY STRIP (persistent bottom navigator)
   ================================================================= */

.day-strip {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(var(--strip-h) + var(--safe-bottom));
  padding: 8px 10px calc(8px + var(--safe-bottom)) 10px;
  background:
    linear-gradient(to top, rgba(250,247,240,0.98) 60%, rgba(250,247,240,0.0));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  z-index: 50;
  border-top: 1px solid rgba(26,21,16,0.07);
}

.day-pill {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 32px;
  padding: 0 9px;
  border-radius: 999px;
  color: #6b5a42;
  font-family: 'Cormorant SC', serif;
  letter-spacing: 0.15em;
  font-size: 11px;
  transition: all 220ms cubic-bezier(0.22, 0.9, 0.4, 1);
  background: transparent;
  border: 1px solid transparent;
}
.day-pill:hover { color: #2a2018; }
.day-pill[data-active="true"] {
  background: #1a1510;
  color: #faf7f0;
  min-width: 56px;
  padding: 0 14px;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(26,21,16,0.18);
}
.day-pill[data-done="true"]::after {
  content: '';
  position: absolute;
  top: 4px;
  right: 4px;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #a67f1c;
}

/* =================================================================
   BOTTOM SHEET (overlay drawer)
   ================================================================= */

.sheet-scrim {
  position: fixed;
  inset: 0;
  background: rgba(26,21,16,0.48);
  backdrop-filter: blur(3px);
  z-index: 70;
}

.sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 82vh;
  background: #faf7f0;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  box-shadow: 0 -18px 40px rgba(26,21,16,0.22);
  padding: 14px 22px calc(28px + var(--safe-bottom)) 22px;
  z-index: 80;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.sheet-handle {
  width: 42px;
  height: 4px;
  border-radius: 999px;
  background: rgba(26,21,16,0.18);
  margin: 2px auto 12px auto;
}

/* =================================================================
   CHIPS & TAP TARGETS
   ================================================================= */

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(166,127,28,0.08);
  border: 1px solid rgba(166,127,28,0.28);
  color: #2a2018;
  font-family: 'Cormorant SC', serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  transition: all 180ms ease;
  cursor: pointer;
}
.chip:active { transform: scale(0.96); }
.chip[data-done="true"] {
  background: rgba(166,127,28,0.22);
  border-color: #a67f1c;
  color: #7a5e12;
}

.chip-ink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 13px;
  border-radius: 999px;
  background: rgba(26,21,16,0.05);
  border: 1px solid rgba(26,21,16,0.12);
  color: #2a2018;
  font-size: 13px;
  transition: all 180ms ease;
  cursor: pointer;
}

.tap-target {
  cursor: pointer;
  transition: transform 200ms cubic-bezier(0.22, 0.9, 0.4, 1);
}
.tap-target:active { transform: scale(0.94); }

/* =================================================================
   ANIMATIONS
   ================================================================= */

@keyframes flame-dance {
  0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.92; }
  33% { transform: scale(1.05) rotate(1.2deg); opacity: 1; }
  66% { transform: scale(0.98) rotate(-0.6deg); opacity: 0.95; }
}
.flame-dance { animation: flame-dance 3.2s ease-in-out infinite; transform-origin: 50% 82%; }

@keyframes drift-slow {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(6px, -6px); }
}
.drift-slow { animation: drift-slow 7s ease-in-out infinite; }

@keyframes drift-a {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(-8px, 10px); }
}
@keyframes drift-b {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(10px, -8px); }
}
.drift-a { animation: drift-a 8s ease-in-out infinite; }
.drift-b { animation: drift-b 9s ease-in-out infinite; }

@keyframes shake-x {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.shake-x { animation: shake-x 420ms ease-in-out; }

@keyframes dissolve-out {
  0%   { opacity: 1; filter: blur(0px); transform: scale(1); }
  60%  { opacity: 0.4; filter: blur(6px); transform: scale(1.1); }
  100% { opacity: 0; filter: blur(16px); transform: scale(1.3); }
}
.dissolve-out { animation: dissolve-out 680ms ease-out forwards; }

@keyframes ember {
  0% { opacity: 0.25; transform: translateY(0) scale(0.9); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-14px) scale(1.1); }
}
.ember { animation: ember 1.8s ease-out infinite; }

@keyframes pulse-soft {
  0%, 100% { opacity: 0.55; transform: scale(0.95); }
  50%      { opacity: 1; transform: scale(1.08); }
}
.pulse-soft { animation: pulse-soft 2.2s ease-in-out infinite; }

@keyframes refrain-in {
  0%   { opacity: 0; letter-spacing: 0.10em; transform: scale(0.9); }
  30%  { opacity: 1; letter-spacing: 0.35em; transform: scale(1.0); }
  70%  { opacity: 1; letter-spacing: 0.40em; }
  100% { opacity: 0; letter-spacing: 0.45em; transform: scale(1.05); }
}
.refrain-flash { animation: refrain-in 2600ms cubic-bezier(0.22,0.9,0.4,1) forwards; }

@keyframes scene-enter {
  0% { opacity: 0; transform: translateY(10px) scale(0.995); }
  100% { opacity: 1; transform: none; }
}
.scene-enter { animation: scene-enter 420ms cubic-bezier(0.22,0.9,0.4,1) both; }

@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.float-y { animation: float-y 4.4s ease-in-out infinite; }

/* =================================================================
   VISUALS
   ================================================================= */

.takeover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background:
    radial-gradient(ellipse at center, rgba(250,247,240,0.98) 0%, rgba(244,237,224,0.96) 70%);
  padding: 28px;
  text-align: center;
  z-index: 40;
}

.card {
  background: #faf7f0;
  border-radius: 18px;
  border: 1px solid rgba(26,21,16,0.08);
  box-shadow: 0 2px 10px rgba(26,21,16,0.05);
  overflow: hidden;
}
.card-gold {
  border: 1px solid rgba(166,127,28,0.45);
  box-shadow: 0 2px 18px rgba(166,127,28,0.18);
}
.card-ink {
  background: #1a1510;
  color: #faf7f0;
  border: 1px solid rgba(166,127,28,0.25);
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 0.95 / 1;
  padding: 14px 14px 12px 14px;
  border-radius: 16px;
  background: #faf7f0;
  border: 1px solid rgba(26,21,16,0.08);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  position: relative;
  overflow: hidden;
}
.tile:active { transform: scale(0.97); }
.tile[data-done="true"] { border-color: rgba(166,127,28,0.45); }

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 22px;
  border-radius: 999px;
  background: #1a1510;
  color: #faf7f0;
  font-family: 'Cormorant SC', serif;
  letter-spacing: 0.2em;
  font-size: 12px;
  border: 1px solid rgba(166,127,28,0.45);
  transition: transform 150ms ease, background 200ms ease;
  cursor: pointer;
  min-height: 48px;
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary[data-gold="true"] {
  background: #a67f1c;
  color: #faf7f0;
  border-color: #a67f1c;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 999px;
  background: transparent;
  color: #2a2018;
  font-family: 'Cormorant SC', serif;
  letter-spacing: 0.18em;
  font-size: 11px;
  border: 1px solid rgba(26,21,16,0.2);
  cursor: pointer;
  min-height: 44px;
}

.scripture {
  font-family: 'Fraunces', serif;
  font-weight: 400;
  line-height: 1.35;
  color: #2a2018;
  font-size: clamp(22px, 5.5vw, 30px);
}

.scripture-ref {
  font-family: 'Cormorant SC', serif;
  letter-spacing: 0.25em;
  font-size: 11px;
  color: #a67f1c;
  text-transform: uppercase;
}

.eyebrow {
  font-family: 'Cormorant SC', serif;
  letter-spacing: 0.35em;
  font-size: 10px;
  color: #a67f1c;
  text-transform: uppercase;
}

.sheet::-webkit-scrollbar { width: 0; height: 0; }

.sword-bg {
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-repeat: no-repeat;
  background-position: 50% 55%;
  background-size: 60% auto;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 600' fill='none' stroke='%231a1510' stroke-width='2'><line x1='100' y1='20' x2='100' y2='420'/><line x1='60' y1='420' x2='140' y2='420'/><line x1='100' y1='420' x2='100' y2='560'/><circle cx='100' cy='580' r='10'/></svg>");
}
`;

export default function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => {
      const existing = document.getElementById(STYLE_ID);
      if (existing) existing.remove();
    };
  }, []);
  return null;
}
