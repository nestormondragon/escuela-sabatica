import React, { useEffect, useRef } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";
import { useReducedMotion } from "framer-motion";
import { usePageVisible } from "../lib/motion.js";

/* =================================================================
   AtmosphereShader — one full-bleed WebGL fragment shader (ogl) that
   renders a living "night → light" sky (clouds, rising sun, god-rays,
   optional sea) recolored storm→dawn by a single damped uStage uniform.
   Per-lesson palette + sun + sea are passed as uniforms.
   dpr capped at 1.5, antialias off, paused when hidden / reduced-motion.
   ================================================================= */

export function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

const vertex = /* glsl */ `
attribute vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = /* glsl */ `
precision mediump float;
uniform float uTime, uStage, uSunX, uHasSea;
uniform vec2  uRes;
uniform vec3  uStormTop, uStormBot, uDawnTop, uDawnBot, uSun;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float st = smoothstep(0.0, 1.0, uStage);

  // sky gradient: storm palette -> dawn palette
  vec3 sky = mix(mix(uStormTop, uStormBot, uv.y), mix(uDawnTop, uDawnBot, uv.y), st);

  // drifting clouds (darker / faster in storm)
  float drift = mix(0.10, 0.035, st);
  float clouds = fbm(uv * vec2(3.0, 2.0) + vec2(uTime * drift, uTime * 0.01));
  sky = mix(sky, sky * mix(0.5, 0.92, st), clouds * mix(0.85, 0.28, st));

  // sun rises with stage; soft in-shader bloom
  vec2 sunUV = vec2(uSunX, mix(1.18, 0.46, st));
  float d = distance(uv, sunUV);
  sky += uSun * smoothstep(0.40, 0.0, d) * (0.25 + 0.75 * st);
  sky += uSun * smoothstep(0.10, 0.0, d) * st;            // hot core

  // cheap screen-space god-rays, only as the storm breaks
  float rays = 0.0; vec2 dir = (sunUV - uv) / 16.0; vec2 c = uv; float dec = 1.0;
  for(int i=0;i<16;i++){ c += dir; rays += fbm(c * 4.0) * dec; dec *= 0.92; }
  sky += uSun * rays * 0.035 * smoothstep(0.4, 1.0, uStage);

  // optional sea band + sun reflection column
  if(uHasSea > 0.5 && uv.y < 0.34){
    float k = smoothstep(0.34, 0.0, uv.y);
    sky = mix(sky, sky * 0.62, k * 0.6);
    sky += uSun * smoothstep(0.06, 0.0, abs(uv.x - sunUV.x)) * st * 0.22 * k;
  }

  // gentle vignette for depth
  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5)));
  sky *= mix(0.82, 1.0, vig);

  gl_FragColor = vec4(sky, 1.0);
}`;

export default function AtmosphereShader({ targetStage = 0, scene }) {
  const ref = useRef(null);
  const target = useRef(targetStage);
  const sceneRef = useRef(scene);
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const animate = visible && !reduced;

  target.current = targetStage;
  sceneRef.current = scene;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderer;
    try {
      renderer = new Renderer({ canvas, dpr: Math.min(1.5, window.devicePixelRatio || 1), alpha: false, antialias: false, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const gl = renderer.gl;
    const p = sceneRef.current?.shader || {};
    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        uTime: { value: 0 },
        uStage: { value: target.current },
        uRes: { value: [1, 1] },
        uSunX: { value: p.sunX ?? 0.7 },
        uHasSea: { value: p.hasSea ? 1 : 0 },
        uStormTop: { value: p.stormTop || [0.03, 0.05, 0.09] },
        uStormBot: { value: p.stormBot || [0.09, 0.14, 0.23] },
        uDawnTop: { value: p.dawnTop || [0.23, 0.29, 0.47] },
        uDawnBot: { value: p.dawnBot || [0.94, 0.76, 0.47] },
        uSun: { value: p.sun || [1.0, 0.85, 0.55] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    window.addEventListener("resize", resize);
    resize();

    // pick up palette changes (lesson switch) without remount
    const syncScene = () => {
      const q = sceneRef.current?.shader || {};
      program.uniforms.uSunX.value = q.sunX ?? 0.7;
      program.uniforms.uHasSea.value = q.hasSea ? 1 : 0;
      if (q.stormTop) program.uniforms.uStormTop.value = q.stormTop;
      if (q.stormBot) program.uniforms.uStormBot.value = q.stormBot;
      if (q.dawnTop) program.uniforms.uDawnTop.value = q.dawnTop;
      if (q.dawnBot) program.uniforms.uDawnBot.value = q.dawnBot;
      if (q.sun) program.uniforms.uSun.value = q.sun;
    };

    let raf, prev = performance.now(), cur = target.current;
    const frame = (t) => {
      const dt = Math.min(0.05, (t - prev) / 1000); prev = t;
      cur += (target.current - cur) * (1 - Math.exp(-dt * 4));
      syncScene();
      program.uniforms.uStage.value = cur;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      const settled = Math.abs(target.current - cur) < 0.001;
      if (animate || !settled) raf = requestAnimationFrame(frame);
      else raf = null;
    };
    raf = requestAnimationFrame(frame);

    // when stage target changes while idle, kick the loop again
    const kick = setInterval(() => {
      if (!raf && Math.abs(target.current - cur) > 0.001) raf = requestAnimationFrame(frame);
    }, 250);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(kick);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [animate]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -3, pointerEvents: "none", display: "block" }} />;
}
