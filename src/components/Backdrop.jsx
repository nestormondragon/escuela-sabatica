import React, { useMemo } from "react";
import AtmosphereShader, { canWebGL } from "./AtmosphereShader.jsx";

/* =================================================================
   Backdrop — the living app background.
   Layers (all fixed, pointer-events:none, behind content):
     .bg-static  CSS gradient + sun glow (first paint + no-WebGL fallback,
                 tweened storm→dawn via @property color vars)
     shader      the ogl atmosphere (when WebGL available)
     .bg-scrim   readability darkening toward the bottom
     .bg-grain   film grain for premium texture
   ================================================================= */

const webgl = typeof window !== "undefined" ? canWebGL() : false;

function lerp(a, b, t) { return a + (b - a) * t; }
function mixRGB(a, b, t) {
  const r = Math.round(lerp(a[0], b[0], t) * 255);
  const g = Math.round(lerp(a[1], b[1], t) * 255);
  const bl = Math.round(lerp(a[2], b[2], t) * 255);
  return `rgb(${r},${g},${bl})`;
}

export default function Backdrop({ stage = 0, scene, mode = "night" }) {
  const p = scene?.shader || {};
  const day = mode === "day";
  const vars = useMemo(() => {
    const st = Math.max(0, Math.min(1, stage));
    // DAY: a calm, warm parchment sky ("lamp on a desk"). The sky stays
    // light at every stage so day-mode (dark) text is always readable —
    // only the warm sun-glow rises with progress.
    if (day) {
      return {
        "--bg-top": "rgb(247,240,224)",
        "--bg-bot": "rgb(236,220,191)",
        "--sun-col": `rgba(244,212,150,${(0.22 + 0.3 * st).toFixed(2)})`,
        "--sun-x": `${(p.sunX ?? 0.7) * 100}%`,
        "--sun-y": `${lerp(108, 50, st)}%`,
      };
    }
    // NIGHT: storm → dawn, tweened by progress (the living nocturne).
    const top = mixRGB(p.stormTop || [0.03, 0.05, 0.09], p.dawnTop || [0.23, 0.29, 0.47], st);
    const bot = mixRGB(p.stormBot || [0.09, 0.14, 0.23], p.dawnBot || [0.94, 0.76, 0.47], st);
    const sun = (p.sun || [1, 0.85, 0.55]).map((v) => Math.round(v * 255));
    const sunY = lerp(118, 46, st);
    return {
      "--bg-top": top,
      "--bg-bot": bot,
      "--sun-col": `rgba(${sun[0]},${sun[1]},${sun[2]},${(0.18 + 0.5 * st).toFixed(2)})`,
      "--sun-x": `${(p.sunX ?? 0.7) * 100}%`,
      "--sun-y": `${sunY}%`,
    };
  }, [day, stage, p.stormTop, p.stormBot, p.dawnTop, p.dawnBot, p.sun, p.sunX]);

  return (
    <>
      <div className="bg-static" style={vars} aria-hidden="true" />
      {/* The WebGL storm-sky is a night-mode element. In day mode we keep a
          clean, readable parchment background instead of recolouring it. */}
      {!day && webgl ? <AtmosphereShader targetStage={stage} scene={scene} /> : null}
      <div className="bg-scrim" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
    </>
  );
}
