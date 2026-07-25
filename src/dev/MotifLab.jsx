import React from "react";
import Motif from "../components/Motif.jsx";
import CrackedVessel from "../components/CrackedVessel.jsx";

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

const ALL = ["mosaico", "cruz", "barro", "carta", "alba", "retrato", "siembra", "muro"];
const STAGES = [0, 1, 2, 3, 4];

/* Both vessel arcs across all five stages. The two lessons that share this
   artwork tell opposite stories, so they are reviewed side by side. */
function ArcStrip({ arc, caption }) {
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ fontFamily: "var(--ui)", fontSize: 12, letterSpacing: "0.12em",
                   textTransform: "uppercase", color: "var(--clay)", marginBottom: 10 }}>
        {caption}
      </h2>
      <div style={{ display: "flex", gap: 8, background: "var(--bg-0)", padding: 12,
                    borderRadius: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
        {[0, 1, 2, 3, 4].map((s) => (
          <figure key={s} style={{ margin: 0, textAlign: "center" }}>
            <div style={{ width: 190 }}>
              <CrackedVessel stage={s} size={190} variant="full" arc={arc} />
            </div>
            <figcaption style={{ fontFamily: "var(--ui)", fontSize: 10,
                                 color: "var(--muted)", marginTop: 4 }}>{s}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* Reveal rig: renders the real production component at fixed reveal
   fractions so intermediate frames can be captured as evidence. `stage` is
   held at 4 and the reveal is stepped by re-mounting with a key, which is
   the only way to observe a mid-transition frame deterministically. */
function RevealStrip({ debug }) {
  const FRAMES = [0, 0.25, 0.5, 0.75, 1];
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ fontFamily: "var(--ui)", fontSize: 12, letterSpacing: "0.16em",
                   textTransform: "uppercase", color: "var(--clay)", marginBottom: 10 }}>
        reveal 0 / 25 / 50 / 75 / 100 {debug ? "· debug" : ""}
      </h2>
      <div style={{ display: "flex", gap: 8, background: "var(--bg-0)", padding: 12,
                    borderRadius: 8, flexWrap: "wrap" }}>
        {FRAMES.map((p) => (
          <figure key={p} style={{ margin: 0, textAlign: "center" }}>
            <div style={{ width: 200 }} data-reveal={p}>
              <CrackedVessel stage={4} size={200} variant="full"
                             debug={debug} revealOverride={p} />
            </div>
            <figcaption style={{ fontFamily: "var(--ui)", fontSize: 10,
                                 color: "var(--muted)", marginTop: 4 }}>
              {Math.round(p * 100)}%
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* CSS-constrained instance: asked for 260px, rendered at 64px. Proves the
   compact variant keys off measured width rather than the size prop. */
function ConstrainedTest() {
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ fontFamily: "var(--ui)", fontSize: 12, letterSpacing: "0.16em",
                   textTransform: "uppercase", color: "var(--clay)", marginBottom: 10 }}>
        size=260 constrained by CSS to 64px
      </h2>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-end",
                    background: "var(--bg-0)", padding: 12, borderRadius: 8 }}>
        <figure style={{ margin: 0, textAlign: "center" }}>
          <div id="constrained" style={{ width: 64, overflow: "hidden" }}>
            <CrackedVessel stage={4} size={260} variant="auto" />
          </div>
          <figcaption style={{ fontFamily: "var(--ui)", fontSize: 10,
                               color: "var(--muted)", marginTop: 4 }}>
            constrained
          </figcaption>
        </figure>
        <figure style={{ margin: 0, textAlign: "center" }}>
          <div style={{ width: 64 }}>
            <CrackedVessel stage={4} size={64} variant="auto" />
          </div>
          <figcaption style={{ fontFamily: "var(--ui)", fontSize: 10,
                               color: "var(--muted)", marginTop: 4 }}>
            size=64 (reference)
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

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

      {only === "barro" ? (
        <>
          <ArcStrip arc="reveal" caption="arc=reveal (L10) · polvo → torno → grieta → luz → gloria" />
          <ArcStrip arc="restore" caption="arc=restore (L4) · grieta → arcilla → torno → horno → templo" />
          <RevealStrip debug={false} />
          <ConstrainedTest />
        </>
      ) : null}

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
