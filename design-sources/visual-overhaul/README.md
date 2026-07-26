# Corinto Vivo visual asset pipeline

This directory contains the editable raster masters for the hybrid visual
system introduced on 2026-07-25. The production application does not call an
image service. It ships local, responsive WebP files generated from these
masters and combines them with semantic HTML, CSS material/light treatment,
and SVG/CSS stage masks.

The system is intentionally hybrid:

- raster masters provide believable stone, clay, papyrus, grout, pores, wear,
  relief depth, and contact occlusion;
- HTML owns every word, control, focus state, progress value, and user entry;
- CSS owns layout, responsive crops, lighting, material overlays, and day/night
  treatment;
- SVG and CSS geometry own seams, reveal masks, stage changes, and fallbacks;
- React selects the appropriate local source and exposes an accessible
  description.

Generated imagery is never a screenshot of the interface and never contains
application copy. This keeps the app readable, localizable, accessible,
responsive, and usable offline.

## Provenance

The 5 material masters and 13 lesson-relief masters in `raw/` were created with
OpenAI's built-in ImageGen tool on **2026-07-25** during the Corinto Vivo visual
overhaul. No Recraft key or other external image API was used.

The original texture and L4 sessions used the three user-approved concept
images in the broader art-direction conversation as style references. L4 then
became the in-repository material, camera, lighting, relief-depth, and tonal
anchor for the other lesson plates. The source PNGs in this directory are the
authoritative art assets; generation is stochastic, so the prompts in
`PROMPTS.md` are a regeneration contract, not a promise of pixel-identical
output.

The app has **no runtime API, API key, analytics, remote font, image CDN, or
generation dependency**. Image generation is an optional authoring step.
`npm run build:visuals` is a local Sharp conversion step.

## Directory contract

```text
design-sources/visual-overhaul/
  README.md                         this pipeline and maintenance guide
  PROMPTS.md                        exact generation and correction prompts
  raw/
    materials/
      basalt-ink.png
      cool-limestone.png
      fired-terracotta.png
      dark-grout.png
      papyrus-fiber.png
    reliefs/
      l01.png ... l13.png

scripts/
  build-visual-assets.mjs           validates, crops, compresses, and manifests

src/assets/generated/
  materials/
    *-512.webp
  reliefs/
    l1-320.webp
    l1-640.webp
    l1-1024.webp
    ...                             three sizes for every lesson
  visualManifest.generated.js       generated ES-module imports and lookup

src/visual-world/
  LessonRelief.jsx                  responsive runtime renderer and fallback
  lessonVisualManifest.js           focal points and Spanish descriptions
  visual-world.css                  reveal, lighting, and load-state treatment

work/visual-qa/
  relief-contact-sheet.jpg          4-column overview of all 13 masters
  asset-report.json                 source/output sizes and total budget
```

Do not hand-edit anything under `src/assets/generated/`. Change a raw source,
then rebuild.

## Build

Requirements are installed with the repository dependencies. The conversion
uses Sharp and needs no network access.

```bash
npm ci
npm run build:visuals
npm run build
```

`npm run build:visuals` performs these checks and outputs:

1. Requires all five material PNGs and all thirteen relief PNGs.
2. Requires each relief source to be at least 1000 pixels on both axes.
3. Auto-rotates and center-crops the square runtime variants.
4. Produces five 512px material textures.
5. Produces 320px, 640px, and 1024px WebP reliefs.
6. Fails when an output exceeds its per-file byte budget.
7. Rewrites `visualManifest.generated.js`.
8. Writes a 960px contact sheet and a machine-readable asset report.

## Responsive output and runtime selection

| Asset | Width | WebP quality | Per-file maximum | Intended use |
| --- | ---: | ---: | ---: | --- |
| material | 512px | 72 | 150,000 bytes | repeating/local surface texture |
| relief thumbnail | 320px | 76 | 90,000 bytes | compact quarter panels |
| relief mobile | 640px | 80 | 240,000 bytes | primary phone/tablet relief |
| relief hero | 1024px | 82 | 520,000 bytes | large desktop relief |

`LessonRelief.jsx` uses native `srcset` and `sizes`. Compact reliefs advertise
320px and 640px sources; full reliefs advertise 640px and 1024px sources.
Non-priority artwork is lazy-loaded. The CSS/SVG motif remains a local loading
and failure fallback.

The 2026-07-25 build produced:

- 5 material files and 39 relief files;
- 4,392,238 output bytes in total, about 4.19 MiB;
- material files between 30,750 and 60,290 bytes;
- 320px reliefs between 8,840 and 15,904 bytes;
- 640px reliefs between 61,174 and 93,092 bytes;
- 1024px reliefs between 176,210 and 275,652 bytes.

That total is a repository/output budget, not a first-view download. Responsive
selection and lazy loading prevent all variants from being fetched together.

## Crop-safe and no-text rules

Every lesson master must satisfy all of the following before it replaces a
checked-in source:

- square 1:1 and at least 1000px square; 1254px square matches the current set;
- straight-on, orthographic presentation rather than a perspective scene;
- primary silhouette centered and roughly 62% of the image height;
- generous quiet material on all four sides;
- all essential fingers, handles, fragments, paths, seals, and openings inside
  the central crop-safe region;
- recognizable subject at 320px and in a small quarter-panel crop;
- one coherent upper-left raking light;
- no critical information encoded only in a highlight, glow, or fine texture;
- no text, pseudo-writing, letters, numbers, runes, labels, UI, watermark,
  logo, or iconography unless the subject brief explicitly requires a physical
  object such as L2's cross;
- no generated user names, Bible quotations, lesson labels, or progress state.

The no-text rule is absolute because all language belongs in live HTML. A
generator's writing-like marks are still a failure even when they are
unreadable. For blank letters and seals, inspect at 200% zoom.

The converter uses a centered `cover` crop. If the approved master needs a
slightly different optical center, update the matching `focal` value in
`src/visual-world/lessonVisualManifest.js`; do not add baked-in padding or
stretch the image.

## Safely regenerate or replace one lesson

Example: replace Lesson 7 without disturbing behavior or content.

1. Preserve the current source through Git before generating:

   ```bash
   git status --short
   git diff -- design-sources/visual-overhaul/raw/reliefs/l07.png
   ```

2. Use `raw/reliefs/l04.png` as the immutable style anchor and the exact L7
   prompt in `PROMPTS.md`. Generate candidates outside the runtime output
   directory. ImageGen is stochastic, so compare candidates visually.
3. Reject candidates that contain text-like marks, clipped geometry, a weak
   thumbnail silhouette, a changed light direction, a detached card/frame, or
   material that no longer belongs to the L4 family.
4. Save the approved square PNG exactly as:

   ```text
   design-sources/visual-overhaul/raw/reliefs/l07.png
   ```

   Filenames use two digits in `raw/` and unpadded lesson IDs in generated
   output.
5. If the composition changed, update only L7's `focal` and Spanish
   `description` in `src/visual-world/lessonVisualManifest.js`.
6. Regenerate locally:

   ```bash
   npm run build:visuals
   ```

7. Inspect:

   ```text
   work/visual-qa/relief-contact-sheet.jpg
   work/visual-qa/asset-report.json
   src/assets/generated/reliefs/l7-320.webp
   src/assets/generated/reliefs/l7-640.webp
   src/assets/generated/reliefs/l7-1024.webp
   ```

8. Confirm the report is within budget and that only the expected source,
   three generated lesson outputs, and any intentional focal/description
   change differ. Never copy a 1024px output over the source PNG.
9. Run the production build and inspect the real component at compact, mobile,
   and hero sizes in day/night themes:

   ```bash
   npm run build
   ```

10. Check keyboard/focus behavior, image failure fallback, reduced motion,
    Chromium, and WebKit before approval.

Replacing a material follows the same pattern: generate a truly tileable,
uniform-density square, overwrite the matching file in `raw/materials/`, run
`npm run build:visuals`, and inspect both visible seams and text contrast.

## Art direction summary

All five textures and thirteen reliefs share:

- one physical Corinthian material world;
- charcoal basalt and graphite as the dominant night material;
- cool conserved limestone as the pale mineral material;
- restrained fired terracotta as the only warm accent/source;
- upper-left raking light and physically plausible contact occlusion;
- museum-grade bas-relief rather than flat icons or generated UI;
- no broad halo, neon, fantasy magic, glass, gold, or decorative frame;
- a still frame that carries the visual quality without animation.

`PROMPTS.md` contains the exact production prompts, their negative constraints,
and the targeted correction prompts used for the final L1, L9, and L13
masters.
