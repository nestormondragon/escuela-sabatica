# SVG quality rubric

Illustrations in this app are hand-authored SVG. The failure mode that
produced the first version of the clay jar was writing markup without ever
rendering it: a shape can be syntactically perfect and still read as a
perfume bottle with ear-shaped handles. Markup review cannot catch that.
Only looking can.

**Rule: no SVG is done until it has been rendered, screenshotted, and graded
at every stage it can occupy.** Use the motif lab (`?lab=<motif>` or
`?lab=all` in dev) which renders the real production component, not a copy.

---

## A. Illustration (does it read as the thing?)

Graded per stage, on both grounds.

1. **Silhouette** — the object is identifiable from its outline alone, with
   no colour or detail. If the outline could be three different objects, the
   silhouette is wrong. Test by squinting or by filling it solid black.
2. **Material coherence** — surface behaviour matches the substance. Clay is
   not glass: it needs warm reflected light, tonal variation across the form,
   surface texture (throwing rings, grain, grout), and no uniform flat fill
   with a hard outline.
3. **Structural truth** — real objects have thickness and joins. Openings
   show wall thickness and a dark interior; handles attach at two points and
   have mass; parts that rest on a surface have a foot. Floating detached
   arcs read as decoration, not construction.
4. **Feature physics** — damage and detail obey the material. A ceramic
   fracture tapers to nothing at its tip, changes direction abruptly, throws
   secondary branches, follows the curved volume, and lifts a sherd that
   casts a thin edge shadow. Light through a gap is concentrated in the gap
   and spills outward from it, never an even neon halo.
5. **Integral, not overlaid** — every element belongs to the form. A shape
   sitting *on* the surface (a "rune", a floating highlight stroke) rather
   than *in* it is a fail, even if it looks pretty.

## B. Motion (adapted from svg-animation-studio)

1. **Motion connected** — primary and secondary movement tell one story.
2. **Timing natural** — easing applied, no jarring snaps.
3. **Quality cues appropriate** — glow / shadow / gradient strength matches
   the style rather than being sprayed on everything.
4. **Staggering visible but not chaotic** — siblings offset roughly
   0.05 to 0.15 s.
5. **Performance** — only `transform` and `opacity` animate; ambient loops
   are CSS so they never depend on a JS visibility flag; everything collapses
   under `prefers-reduced-motion`.

---

## Verdict

- All pass → **pass**
- 1 to 2 tweak, none fail → **tweak**
- Any fail, or 3+ tweak → **fail**

Grade in a separate context where possible. Marking your own homework on a
picture you just drew is exactly how the first jar shipped.

---

## Technique notes earned the hard way

- **Strokes cannot taper.** `stroke-width` is constant along a path, so any
  feature that must narrow (a crack, a vein, a splinter) has to be a filled
  shape. `sliver()` in `Motif.jsx` builds one from a centreline plus a
  per-point width profile.
- **Irregularity must be deterministic.** Hand-cut tesserae need per-tile
  jitter, but seeded from the index, or the wall shimmers on every repaint.
- **Inner depth beats outlines.** For thickness, composite an offset blurred
  `SourceAlpha` under the graphic rather than drawing a darker stroke around
  it (see `createInnerDepth` in svg-animation-studio's `lib/primitives`).
- **Light has a source.** Decide where it comes from once, then make every
  highlight, shadow, and gradient agree with it.

## Tooling

- `@svgdotjs/svg.js`, `paper` — geometry work in build scripts (path
  simplification, boolean ops). Not runtime dependencies.
- `svgo` — markup cleanup after artwork is final. Improves file size, never
  design.
- `vtracer` (cloned to /tmp/vtracer) — raster to vector. Note it traces
  faithfully, so it will vectorise a bad drawing just as happily as a good
  one; it is not a quality step.
