# PROJECT-STATE.md

Handoff document. Read this first if you are picking this project up cold.
Last updated at commit `9028f5e`.

---

## What this is

A Spanish-language Sabbath School devotional web app for one reader (Néstor).
Each week is a guided, personalised experience: the reader answers eight
prompts and assembles a keepsake artifact, and the central illustration grows
with their progress.

- **Stack:** React 18 + Vite, framer-motion, Phosphor icons. No SSR.
- **Deploy:** Vercel (Framework Vite, build `npm run build`, output `dist`).
- **Repo:** `https://github.com/nestormondragon/escuela-sabatica`, branch `main`.
- **Toolchain note:** node is NOT installed system-wide. It lives at
  `/tmp/node-v20.18.1-darwin-arm64/bin` and `/tmp` gets cleaned periodically.
  If `node: command not found`, re-download:
  `curl -sL -o /tmp/node20.tar.gz https://nodejs.org/dist/v20.18.1/node-v20.18.1-darwin-arm64.tar.gz && tar -xzf /tmp/node20.tar.gz -C /tmp`
  Python is at `/opt/anaconda3/bin/python` (has `pypdf`, `pillow`).

## Current state

- **HEAD:** `9028f5e`. Working tree clean.
- **13 commits unpushed.** NOTHING has been pushed. The user authorises each
  push via GitHub device flow (no `gh` CLI): POST to
  `https://github.com/login/device/code` with client_id `178c6fc778ccc68e1d6a`
  scope `repo`, show the user the code, poll, then
  `git push https://x-access-token:<TOKEN>@github.com/nestormondragon/escuela-sabatica.git HEAD:main`.
- **Tags:** `vessel-v1` (79c5eab, first vessel rebuild), `vessel-v2` (9504c9b,
  after review corrections). Branch `vessel-v1-snapshot` also preserved.

## Quarter content

Q3 2026, **1 and 2 Corintios**. All 13 lessons authored and live, date-routed
(today 2026-07-25 routes to L4).

Lessons are generated, not hand-edited:

```
drafts/q3-2026/*.json        authored drafts (source of truth)
scripts/build-lessons.mjs    normalises + validates -> src/content/lN.js
node scripts/build-lessons.mjs drafts/q3-2026
```

The build script reconciles draft shape with what each module component
actually reads, and hard-validates slot/station pairing, icon names, tag
vocabulary, template references and a dash purge. **Edit the draft, not
`src/content/lN.js`.**

### Hard content rules

- **Zero em-dashes and en-dashes** in visible copy. Enforced by the build.
- `{name}` resolves to the reader's first name; must appear once in `promise`,
  once in every station `cue`, once in `outAliento` and `patternTemplate`.
- `{slot:id}`, `{slot:id|lower}`, `{slot:id|or:fallback}` resolve saved
  answers. `makeLesson.js` collapses duplicated connectors (fixes
  "sostener que que Cristo…").
- Every `choiceInsight` option carries 2 to 3 tags from a fixed vocabulary
  (`react: theme: posture: tone:`). These drive the branching closing
  blessing in `src/engine/profile.js`.

## Design system

Rebuilt from scratch for Q3. See `docs/svg-quality-rubric.md` and
`docs/SVG-DESIGN.md`.

- **Metaphor:** Corinth's mosaics and its clay. Answers set tesserae.
- **Palette:** slate ink at night, quarried stone by day, ONE accent (clay
  `#e0785c` night / `#a8452a` day). All pairs verified WCAG AA both modes.
  The previous parchment + brass scheme is retired and must not return.
- **Type:** `Outfit` (UI) + `EB Garamond` (scripture). `Fraunces` and
  `Source Serif 4` are retired and banned.
- **Shape:** one radius scale, 3 / 6 / 10 px. Sharp, not pillowy.
- **Icons:** Phosphor only, one family. Content refers to glyphs by semantic
  name via `src/components/Icon.jsx`; the QA gate checks every name resolves.

### Animation architecture (load-bearing, do not regress)

The original bug that started this work: ambient loops were gated on a JS
visibility flag, so they never started in a tab that loaded hidden.

- **All looping/ambient motion is CSS keyframes.** Never gate a loop on a JS
  visibility flag.
- One-shot transitions may use rAF (e.g. the vessel's fracture reveal).
- `prefers-reduced-motion` zeroes **both** `animation-duration` and
  `transition-duration` globally in `index.css`. Inline-style transitions are
  not covered by `animation-*` alone; that was a real bug.
- Known test artifact: in a headless tab (`visibilityState: "hidden"`)
  framer-motion freezes one-shot view transitions mid-flight, so the app looks
  dimmed at ~0.49 opacity in screenshots. Not a regression. Neutralise for
  captures with a stylesheet override, never DOM surgery.

## The motif system

`src/components/Motif.jsx` dispatches on `lesson.scene.motif` and renders a
stage 0..4 scene. `Centerpiece.jsx` maps filled slots to the stage index.

**Review harness (use it, do not skip it):**

```
npm run dev
http://localhost:5173/?lab=barro    one motif, all stages, large
http://localhost:5173/?lab=all      whole family
```

Lab controls: silhouette-only (Pass 1), 160/96/64 sizes, day/night. It renders
the **real production component**, and is excluded from prod builds via
`import.meta.env.DEV`.

Cross-engine + comparison scripts:

```
node scripts/vessel-verify.mjs    Chromium vs WebKit structural probe + shots
node scripts/vessel-compare.mjs   renders original/v1/v2 from git worktrees
```

**The rule that matters: an SVG is not done when it compiles. It is done when
it has been rendered, screenshotted and judged.** The first vessel was valid
SVG that read as a perfume bottle with ear-shaped handles and a neon rune.

## The vessel (`CrackedVessel.jsx`)

Reference implementation for narrative artwork. Fully documented in
`docs/SVG-DESIGN.md`. Key points:

- The fracture is a **mask**: ceramic is painted through a mask that subtracts
  tapered slivers; fire is behind, clipped to the silhouette. It is a real
  opening, not a drawn line.
- **Strokes cannot taper**, so fractures are filled slivers from a centreline
  plus per-point widths (`sliver()`).
- The reveal is **geometric truncation** driven by a rAF tween.
  `pathLength` + `stroke-dashoffset` as a reveal mask **does not work**: a
  `<g mask>` nested inside a `<mask>` is ignored by Chromium (verified).
- Every gradient/mask/clip/filter id namespaced with `useId()`. Duplicate ids
  across instances was a real bug (7 ids × 5 instances).
- `variant="auto"` measures **rendered** width via ResizeObserver.
- Known limitations: no foot ring; one-frame compact correction before the
  observer fires; `feTurbulence` dithers slightly differently per engine.

---

# Motif / arc alignment — DONE

Audit found 5 of 13 lessons whose artwork contradicted their own authored
`stageLabels`. All five are fixed; the other 8 were already correct and were
left alone.

| L | motif | direction | status |
|---|---|---|---|
| 1 | carta | blank sheet to sealed letter | already correct |
| 2 | cruz | beam raised to glory | already correct |
| 3 | mosaico | fragments to one image | already correct |
| 4 | **barro `arc="restore"`** | **cracked clay to standing temple** | **FIXED: direction inverted** |
| 5 | cruz | beams raised, rights surrendered | already correct |
| 6 | mosaico | loose tesserae to one body | already correct |
| 7 | **retrato** (new) | blank canvas to lit portrait | **FIXED: was `cruz`** |
| 8 | alba | night to full day | already correct |
| 9 | carta | blank sheet to letter delivered | already correct |
| 10 | **barro `arc="reveal"`** | **formless clay, thrown, cracked, glory** | **FIXED: formation prelude added** |
| 11 | **siembra** (new) | closed fist to full sowing | **FIXED: was `mosaico`** |
| 12 | **muro** (new) | stronghold down to bedrock refuge | **FIXED: was `barro`** |
| 13 | mosaico | fragments to gold-joined whole | already correct |

### How the two vessel arcs work

One component, two opposite readings, selected by `arc` in the lesson draft:

- **`reveal` (L10, 2 Cor 4:7).** Damage increases and that is the point.
  Stage 0 is a mound of clay on the wheel; the form is pulled up by stage 2;
  the fracture opens from 2 onward and the treasure gets out.
- **`restore` (L4, 1 Cor 6:19).** Damage decreases. Stage 0 is heavily
  fractured; the breaks close course by course; by stage 4 the vessel is
  whole and lit through its mouth, a temple inhabited rather than a jar
  broken open.

Implemented as `fs` (the fracture clock, which runs backwards for `restore`),
`form` (how thrown the vessel is, only below 1 for `reveal`), and `lume`.
`arc` flows draft -> `makeLesson` -> `scene.arc` -> `Centerpiece` -> `Motif`
-> `CrackedVessel`.

## Known gap (not yet addressed)

`mosaico`, `cruz`, `carta` and `alba` are **directionally correct but sit at a
lower craft level** than the vessel: flat fills, no material, no surface
texture. `cruz` in particular is close to a plain plus sign and `mosaico` is
rounded squares rather than cut stone (a `tessera()` primitive with
deterministic jitter already exists in `Motif.jsx`, unused). Bringing them up
to the vessel's standard is the obvious next piece of work, and the user has
NOT yet asked for it.

## QA gates

```
node scripts/build-lessons.mjs drafts/q3-2026   # content validity
node /tmp/qa3.mjs                               # structure, icons, motifs, leaks
node /tmp/qa4.mjs                               # templates render with REAL answers
npm run build
```

`qa3`/`qa4` live in `/tmp` and will vanish with cleanup; they are worth
re-creating in `scripts/` if lost. qa4 matters most: it renders every output
template using actual option labels rather than placeholders, which is how
the "que que" grammar bug was caught.

## Working agreements with this user

- Plan first, then implement without waiting for approval.
- **Never** end with a list of "future suggestions" that should have been
  done before coding.
- Never push without explicit authorisation.
- Do not self-grade aesthetics; report objective findings and limitations.
- Be honest about what was actually run versus skipped. The user checks.
