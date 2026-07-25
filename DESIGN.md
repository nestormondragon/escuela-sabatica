---
name: Mosaico Vivo de Corinto
description: Una mesa de estudio adventista donde cada respuesta se vuelve una pieza visible de un mosaico trimestral.
colors:
  night-ground: "#14161b"
  night-surface: "#191c22"
  night-panel: "#1e212a"
  night-surface-high: "#252932"
  night-text: "#e9e7e2"
  night-text-soft: "#c2c0ba"
  night-muted: "#96948e"
  clay: "#e0785c"
  clay-highlight: "#f0916f"
  clay-deep: "#c05a3f"
  day-ground: "#e3e3e0"
  day-surface: "#ebeae8"
  day-panel: "#dcdcd8"
  day-text: "#191b1f"
  day-text-soft: "#3d4046"
  day-muted: "#5c5f66"
  day-clay: "#a8452a"
  success: "#7fb08a"
  warning: "#d8a657"
typography:
  display:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 4.6rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 3vw, 2.5rem)"
    fontWeight: 620
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  scripture:
    fontFamily: "EB Garamond Variable, EB Garamond, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.09em"
rounded:
  small: "3px"
  medium: "6px"
  large: "10px"
spacing:
  xsmall: "4px"
  small: "8px"
  medium: "12px"
  large: "18px"
  xlarge: "28px"
  xxlarge: "40px"
components:
  button-primary:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.night-ground}"
    typography: "{typography.title}"
    rounded: "{rounded.medium}"
    padding: "14px 18px"
    height: "48px"
  button-primary-day:
    backgroundColor: "{colors.day-clay}"
    textColor: "#ffffff"
    typography: "{typography.title}"
    rounded: "{rounded.medium}"
    padding: "14px 18px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.night-text}"
    typography: "{typography.body}"
    rounded: "{rounded.medium}"
    padding: "12px 16px"
    height: "44px"
  depth-choice:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.night-text}"
    typography: "{typography.body}"
    rounded: "{rounded.small}"
    padding: "12px"
    height: "64px"
  study-field:
    backgroundColor: "{colors.night-panel}"
    textColor: "{colors.night-text}"
    typography: "{typography.body}"
    rounded: "{rounded.medium}"
    padding: "14px 16px"
    height: "48px"
---

# Design System: Mosaico Vivo de Corinto

## Overview

**Creative North Star: "El patio mosaico vivo de Corinto"**

The learner is standing at a quarried workshop table, not scrolling through a stack of devotional cards. Each honest response becomes a tessera, seam, inscription, or source of light in one persistent 13-panel courtyard mosaic. The world changes because the learner contributed something, then returns that contribution with more meaning.

The interface is reverent, tactile, authored, and quietly dramatic. Stone, grout, clay, papyrus, charcoal, timber, and credible light carry the story. Familiar controls live inside that world without pretending to be ancient objects. The result should feel more like inhabiting an evolving place than opening another Bible study app.

**Key Characteristics:**

- One persistent quarter artifact, not thirteen disconnected progress cards.
- Open editorial composition with structural stone and paper surfaces.
- One clay accent and one physically credible light source per scene.
- Strong causal transformations followed by a quiet resting state.
- Saved language, commitments, skills, and connections return later.
- No points, ranks, loss-aversion streaks, or spiritual-performance scoring.

**The Artifact Is the Reward Rule.** Ordinary completion changes the persistent mosaic inline. It does not trigger a generic reward modal or confetti.

**The Meaning Before Spectacle Rule.** Motion and illustration may amplify a real learning consequence, but they never substitute for one.

### Product surfaces

- **Hoy** answers why to return and what can be completed now.
- **Mosaico** shows the evolving quarter, cross-week joins, and each lesson's durable evidence.
- **Sábado** assembles a private and selectively shareable folio from the learner's work.
- **Lesson path** presents one Chispa and one meaningful interaction at a time.
- **Teacher and presentation modes** support class use without exposing private material by default.

## Colors

The palette joins slate ink, cool quarried stone, bone text, and one terracotta clay voice. Night and day modes change the material ground, not the identity.

### Primary

- **Corinthian Clay** (`clay`, `day-clay`): primary action, selected state, a newly placed tessera, and light reflected from a meaningful change.
- **Kiln Highlight** (`clay-highlight`): a restrained hot edge inside clay-lit narrative art.
- **Fired Clay Deep** (`clay-deep`): pressed states, material occlusion, and low edges.

### Neutral

- **Slate Ink** (`night-ground`): the night foundation.
- **Raised Slate** (`night-surface`, `night-panel`): shallow material layers, not floating cards.
- **Bone Ink** (`night-text`, `night-text-soft`, `night-muted`): readable hierarchy without pure white.
- **Quarried Stone** (`day-ground`, `day-surface`, `day-panel`): the day foundation, deliberately cool rather than parchment-like.
- **Charcoal Ink** (`day-text`, `day-text-soft`, `day-muted`): the day reading hierarchy.

### State colors

- **Restored Green** (`success`): verification or successful system state only.
- **Ochre Warning** (`warning`): caution that must not compete with clay as brand color.

**The One Clay Voice Rule.** Clay is the only brand accent. Supporting state colors communicate status and never become a second decorative palette.

**The Credible Light Rule.** Glow belongs to fire, dawn, a restored join, or a newly placed piece. Never put a radial halo behind an object merely to make it look important.

## Typography

**Display Font:** Outfit Variable, with system sans-serif fallbacks

**Body Font:** Outfit Variable, with system sans-serif fallbacks

**Scripture Font:** EB Garamond Variable, with Georgia as fallback

**Character:** Outfit gives navigation and decisions a direct geometric voice. EB Garamond separates Scripture, Paul's voice, and preserved reflection from interface copy without making the whole application look like a church bulletin.

### Hierarchy

- **Display** (650, fluid, 1.04): rare route and world statements.
- **Headline** (620, fluid, 1.12): surface titles and major questions.
- **Title** (600, 1.125rem, 1.25): action and component titles.
- **Body** (400, 1rem, 1.6): prompts and explanations, with a reading measure of 58 to 66 characters.
- **Scripture** (500, 1.3rem, 1.5): Bible text, Paul's voice, and meaningful preserved excerpts.
- **Label** (650, 0.74rem, 0.09em): compact metadata and status, generally uppercase.

**The Two Voices Rule.** Outfit is the learner and the interface. EB Garamond is Scripture, Paul, or a preserved contemplative voice. Serif is never a generic badge of spirituality.

**The Whole Phrase Rule.** Kinetic type splits by meaningful phrase or line and preserves one complete accessible string. Scripture is never animated character by character.

## Layout

Mobile is a focus canvas with a compact context rail and a safe-area bottom dock. The active lesson artifact appears before one Chispa, one depth choice, and one clear action. Decoration yields before text or touch targets when height is constrained.

Tablet may place world context beside the study canvas. Desktop uses a 12-column composition: approximately five columns for the persistent world, six for reading and interaction, and one for breathing room. The quarter mosaic may use the full viewport. The app must never remain a narrow phone strip in empty desktop space.

Breakpoints are behavioral:

- Below `520px`, simplify utilities and reduce decorative world context.
- At `700px` to `760px`, introduce wider folio and study arrangements.
- At `920px` to `980px`, switch the shell and mosaic to the desktop spatial model.
- At `1280px`, allow the full quarter artifact more surrounding air.
- Narrative motifs below `96px` use an explicit compact variant.

The spacing rhythm is 4, 8, 12, 18, 28, and 40 pixels. Small controls remain at least 44 by 44 CSS pixels. The main reading measure stays within 58 to 66 characters.

**The One Main Action Rule.** Every focused viewport has one primary next action. Secondary exits remain honest and visible but subordinate.

**The Object Continuity Rule.** Moving among Hoy, Mosaico, a lesson, and Sábado should preserve the sense that the same panel is being approached, worked, and returned.

## Elevation & Depth

Depth is hybrid: tonal layering establishes most hierarchy, while short directional contact shadows ground lifted panels, folios, and controls in motion. Materials may be carved, inset, folded, or laid into the world. Broad floating-card shadows and uniform backdrop blur are not part of the language.

The ambient light direction is upper left. A scene may add one narrative source, such as fire inside clay or dawn through an opening. Highlights, occlusion, reflected color, and cast shadows must agree with it. Grain stays localized to material and never covers body copy.

### Shadow vocabulary

- **Contact** (`--shadow`): a short grounding shadow for an interactive piece at rest.
- **Lifted artifact** (`--shadow-lg`): temporary elevation for a selected mosaic panel, folio, or overlay.
- **Clay source** (`--glow-clay`): restrained bloom only around a credible warm source.

**The Grounded by Default Rule.** Surfaces begin embedded in the composition. Lift is a state change, not the default treatment of every section.

**The Local Grain Rule.** Texture belongs to stone, clay, paper, or grout. It never becomes a full-screen noise veil over text.

## Shapes

The radius scale is deliberately sharp: 3, 6, and 10 pixels. Tesserae may use deterministic irregular cuts. Folios use clipped or folded paper geometry. Ordinary buttons and inputs stay recognizably interactive.

Pills are reserved for compact status or mutually exclusive depth choices. Sheets, dialogs, and cards do not introduce unrelated 20 to 28 pixel radii. The quarter mosaic must read as one authored composition, never as a responsive grid of rounded product cards.

Narrative SVG follows structural truth:

- stable ground plane and coherent light direction,
- semantic material, structure, narrative, and light groups,
- instance-safe IDs,
- filled geometry for physical material and tapering fractures,
- strokes only for ink, seams, routes, and reveal mechanisms,
- compact variants with intentional simplification,
- no continuously animated filter parameters.

**The Silhouette First Rule.** A narrative object must read at flat silhouette before shading, texture, glow, or motion is added.

## Components

### App shell and navigation

The context rail carries quarter, lesson, progress, theme, and facilitator utilities. On mobile it compresses into a top context bar; on desktop it becomes a persistent rail. The destination dock contains only Hoy, Mosaico, and Sábado, each with a Phosphor icon and text label.

### Primary action

Clay-filled, 48 pixels high, gently cut corners, and one directional arrow where movement follows. Hover changes local color or the arrow, not the layout. Press feedback is 100 to 140 milliseconds and may scale no lower than 0.97.

### Depth chooser

Three equally valid choices: 1 minuto, Estudiar, and A fondo. Selection uses clay edge, tonal change, and `aria-pressed`; it never implies moral superiority or hides what each depth includes.

### Quarter mosaic

Thirteen panels form one spatial artifact with a parallel semantic list. Current, complete, upcoming, connected, and revisited states differ through structure, label, and pattern as well as color. The selected panel lifts from the grout bed and expands into the same motif.

### Study canvas

One focused interaction uses open composition and material separators rather than a universal card wrapper. Attempt comes before explanation where pedagogy allows. Saving creates a local material mutation and announces it in a polite live region.

### Sabbath folio

The week's prayer, question, action, pattern, and class contribution are editable. Private material and chosen share material are visually distinct. Another person's name or story requires explicit consent before presentation or export.

### Iconography

Use Phosphor regular weight for interface actions. Fill is reserved for selected or complete state. Keep one optical size and stroke family within a surface. Narrative meaning belongs to motif art, not a grid of glyphs. No emoji.

### Motion

The three verbs are **Set**, **Reveal**, and **Return**:

- **Set:** place, join, seal, or ground something in 600 to 850 milliseconds.
- **Reveal:** expose evidence, light, ink, or a connection in 420 to 620 milliseconds.
- **Return:** bring back the learner's earlier words or commitment with new context.

Navigation lasts 240 to 340 milliseconds. Selection lasts 140 to 200 milliseconds. A rare weekly completion stays below 1100 milliseconds. Ambient motion is low-amplitude, has a useful still frame, and is limited to one visible owner per viewport. Reduced motion removes paths, particles, parallax, depth travel, and loops while preserving content and immediate interactivity.

Particles are finite causal events only: 12 to 24 deterministically seeded pieces, 500 to 900 milliseconds, transform and opacity only, and never under reduced motion.

## Do's and Don'ts

### Do:

- **Do** make the persistent artifact both navigation and reward.
- **Do** show one immediate next action and an honest way to stop.
- **Do** return prior language, commitments, capabilities, and cross-week connections with clear context.
- **Do** keep focus, landmarks, live-region feedback, and keyboard operation intact through transitions.
- **Do** preserve local-first privacy and make sharing an explicit selection.
- **Do** use authored asymmetry, localized texture, and one coherent physical light source.
- **Do** verify every narrative SVG in Chromium and WebKit at full and compact sizes.

### Don't:

- **Don't** build another centered card stack, bento grid, or collection of rounded devotional tiles.
- **Don't** use points, ranks, loss-aversion streaks, variable loot, or spiritual-performance status.
- **Don't** use the same modal, confetti, or generic radial glow after every answer.
- **Don't** add WebGL, CDN scripts, or an animation library without a demonstrated product gap.
- **Don't** animate Scripture per character or make controls wait for choreography.
- **Don't** expose another person's information without explicit consent.
- **Don't** hand-edit generated lesson modules or break their verified eight-station semantics.
- **Don't** encode completion, connection, or selection by clay color alone.
