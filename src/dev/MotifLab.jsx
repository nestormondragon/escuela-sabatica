import React from "react";
import Motif from "../components/Motif.jsx";

/* =====================================================================
   MotifLab — a development-only harness for looking at the artwork.

   The motifs are the one part of this app that cannot be verified by
   reading the code: an SVG either reads as a clay jar or it does not, and
   the only way to know is to render it and look. This page renders the
   real production component (not a copy) at every stage, large, on both
   backgrounds, so each revision can be screenshotted and judged.

   Open with ?lab=all, or ?lab=barro to study one motif closely.
   Never linked from the app; it is stripped from the build by tree-shaking
   because nothing in the app imports it except the dev branch in main.jsx.
   ===================================================================== */

const ALL = ["mosaico", "cruz", "barro", "carta", "alba"];
const STAGES = [0, 1, 2, 3, 4];

export default function MotifLab({ only }) {
  const kinds = only && ALL.includes(only) ? [only] : ALL;
  const big = kinds.length === 1;
  const size = big ? 340 : 150;
  // Theme tokens live on :root, so a wrapper div cannot restyle a subtree.
  // Flip the real root attribute to review the day palette honestly.
  const [mode, setMode] = React.useState("night");
  const [sil, setSil] = React.useState(false);
  const [small, setSmall] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.dataset.mode = mode === "day" ? "day" : "";
    document.body.style.background = mode === "day" ? "#e3e3e0" : "#14161b";
  }, [mode]);

  const btn = {
    padding: "8px 14px", cursor: "pointer", background: "var(--surface-2)",
    color: "var(--text)", border: "1px solid var(--line-2)", borderRadius: 6,
    fontFamily: "var(--ui)", fontSize: 12,
  };
  // flatten to a single fill so only the outline is judged
  const silStyle = sil
    ? { filter: "brightness(0) saturate(0) invert(0.85)", opacity: 1 }
    : undefined;
  const SIZES = small ? [160, 96, 64] : null;

  return (
    <div style={{ padding: 24, maxWidth: 1500, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--display)", fontSize: 22, marginBottom: 4 }}>
        Motif lab
      </h1>
      <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
        Stage 0 (nothing set) through stage 4 (complete).
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => setMode((m) => (m === "day" ? "night" : "day"))}
          style={btn}
        >
          ver en modo {mode === "day" ? "noche" : "día"}
        </button>
        {/* Pass 1 of the review loop: judge the outline with no colour,
            gradient or detail. If it could be three different objects, the
            silhouette is wrong no matter how good the shading is. */}
        <button onClick={() => setSil((v) => !v)} style={btn}>
          {sil ? "salir de silueta" : "ver silueta"}
        </button>
        {/* Pass 4: legibility at the sizes the app actually uses */}
        <button onClick={() => setSmall((v) => !v)} style={btn}>
          {small ? "tamaño normal" : "tamaños 160/96/64"}
        </button>
      </div>

      {kinds.map((kind) => (
        <section key={kind} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--ui)", fontSize: 12, letterSpacing: "0.16em",
                       textTransform: "uppercase", color: "var(--clay)", marginBottom: 10 }}>
            {kind}
          </h2>

          <div
            style={{
              display: "flex", gap: 10, padding: 14, borderRadius: 8,
              marginBottom: 10, flexWrap: "wrap", alignItems: "flex-end",
              background: "var(--bg-0)",
            }}
          >
            {(SIZES
              ? SIZES.map((px) => ({ s: 4, px, label: `${px}px` }))
              : STAGES.map((s) => ({ s, px: size, label: String(s) }))
            ).map(({ s, px, label }) => (
              <figure key={label} style={{ margin: 0, textAlign: "center" }}>
                <div style={{ width: px, ...silStyle }}>
                  <Motif kind={kind} stageIndex={s} size={px} />
                </div>
                <figcaption style={{
                  fontFamily: "var(--ui)", fontSize: 10, letterSpacing: "0.1em",
                  color: "var(--muted)", marginTop: 4,
                }}>
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
