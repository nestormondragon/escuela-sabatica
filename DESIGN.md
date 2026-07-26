---
name: Corinto Vivo
description: Un atrio de piedra, barro y luz donde cada respuesta restaura una obra viva.
colors:
  basalt-deep: "#0d0f12"
  basalt: "#12151a"
  basalt-raised: "#181c22"
  limestone: "#d5d5d1"
  limestone-raised: "#e2e1dd"
  limestone-inset: "#c9c9c4"
  limestone-ink: "#191b1f"
  bone: "#eee9e1"
  bone-soft: "#cbc4ba"
  smoke: "#a19b92"
  terracotta: "#df7554"
  terracotta-hot: "#ef8b67"
  terracotta-deep: "#b94d34"
  day-terracotta: "#9f3e25"
  day-terracotta-hot: "#b44a2d"
  day-terracotta-deep: "#812f1d"
  success: "#7fb08a"
  warning: "#d8a657"
typography:
  display:
    fontFamily: "EB Garamond Variable, EB Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.35rem, 7.2vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "EB Garamond Variable, EB Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)"
    fontWeight: 520
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 650
    lineHeight: 1.25
  body:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.62
  scripture:
    fontFamily: "EB Garamond Variable, EB Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "1.32rem"
    fontWeight: 500
    lineHeight: 1.48
  label:
    fontFamily: "Outfit Variable, Outfit, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  chip: "3px"
  control: "6px"
  slab: "10px"
spacing:
  xsmall: "4px"
  small: "8px"
  medium: "12px"
  large: "18px"
  xlarge: "28px"
  xxlarge: "40px"
components:
  button-primary:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.basalt-deep}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "14px 18px"
    height: "48px"
  button-primary-day:
    backgroundColor: "{colors.terracotta-deep}"
    textColor: "{colors.limestone-raised}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "14px 18px"
    height: "48px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.bone-soft}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "44px"
  study-field:
    backgroundColor: "{colors.basalt-raised}"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
    height: "48px"
---

# Design System: Corinto Vivo

## Overview

**Creative North Star: "El Atrio Restaurado"**

The product is one living Corinthian courtyard viewed from different distances.
Hoy stands before the active relief. Mosaico steps back to the whole wall.
Lección removes one panel to the restoration table. Episodio moves closer to
one join. Sábado opens the written folio beside the same work. The artifact
never feels copied between routes. It remains one object carrying the reader's
investment.

The world is physically credible before it is spectacular. Local raster
materials provide stone pores, clay grain, papyrus fiber, relief, edge wear,
and contact occlusion. HTML owns every word, control, and state. CSS clip paths
own the five-stage reveal, seams, lighting, and load states. SVG supplies the
full-size loading and error fallback plus retained topology for legacy
narrative artwork. Motion shows causal placement and continuity. None of those
layers pretends to replace another.

All raster assets are checked in, responsive, offline-capable, and require no
runtime API, key, CDN, or generation service.

**Key Characteristics:**

- Charcoal basalt at night and cool limestone by day.
- Museum-grade bas-relief rather than flat decorative illustration.
- Thirteen lesson-specific artworks inside one persistent courtyard.
- One terracotta light source following real seams and restored joins.
- Live text and familiar controls on stable, readable material planes.
- A still image already carries the wow factor; motion explains change.

**The One Courtyard Rule.** Every primary route must feel like a different
distance or working position inside the same physical place.

**The Meaning Owns the Material Rule.** Texture and relief may amplify a true
learning consequence. They never substitute for one.

## Colors

The palette is cool mineral darkness, conserved limestone, bone ink, and one
fired-clay voice. Terracotta is both the only brand accent and the believable
warm source inside repaired joins.

### Primary

- **Fired Terracotta** (`terracotta`): primary actions, a newly set tessera,
  selected joins, and local reflected light.
- **Kiln Edge** (`terracotta-hot`): the narrow bright core of a physical seam.
- **Deep Clay** (`terracotta-deep`): pressed controls, occlusion, and day-mode
  action contrast.

### Neutral

- **Deep Basalt** (`basalt-deep`): night foundation and deepest carved void.
- **Quarried Basalt** (`basalt`, `basalt-raised`): architectural planes and
  relief faces.
- **Conserved Limestone** (`limestone`, `limestone-raised`): day foundation and
  reading slabs. It is cool stone, never parchment.
- **Bone and Smoke** (`bone`, `bone-soft`, `smoke`): night reading hierarchy.
- **Limestone Ink** (`limestone-ink`): day reading hierarchy.

### Named Rules

**The One Warm Source Rule.** Terracotta is the only warm brand color. A scene
may intensify it at a real fire, seam, seal, or placed piece, but may not add a
second accent family.

**The Stone Is Not a Scrim Rule.** Body copy never sits directly over variable
relief photography. Reading regions use a stable opaque basalt, limestone, or
papyrus plane with verified contrast.

**The Day Is Mineral Rule.** Day mode is pale cool limestone surrounded by
dark structural stone. It is not beige paper, sepia, cream, or warm parchment.

## Typography

**Editorial Display Font:** EB Garamond Variable, with Iowan Old Style and
Georgia fallbacks

**Operational Display Font:** Outfit Variable for Mosaico, Sábado, navigation,
and compact workshop headings

**Interface Font:** Outfit Variable, with system sans-serif fallbacks

**Character:** EB Garamond carries Scripture, questions, preserved responses,
and inscriptions with the authority of a letter read aloud. Outfit keeps
navigation, choices, labels, and operational text direct and contemporary.

### Hierarchy

- **Editorial display** (500, fluid, 0.98): one decisive question, Scripture,
  or weekly synthesis.
- **Operational display** (650, fluid): Mosaico, Sábado, navigation, and
  workshop headings that must stay direct.
- **Headline** (520, fluid, 1.05): route and section headings.
- **Title** (650, 1.12rem, 1.25): actions, episode titles, and material labels.
- **Body** (400, 1rem, 1.62): prompts and explanation, capped near 66
  characters.
- **Scripture** (500, 1.32rem, 1.48): biblical text and preserved contemplative
  language.
- **Label** (700, 0.7rem, 0.12em): sparse metadata carved into a lintel or
  margin.

**The Two Living Voices Rule.** Serif is the letter, Scripture, and reflection.
Sans serif is the learner and the interface. A surface may use both, but never
for arbitrary variety.

**The Whole Thought Rule.** Questions and Scripture remain whole accessible
strings. Kinetic type may reveal a line or phrase, never split sacred text into
decorative characters.

## Layout

Mobile uses an architectural sequence rather than a card stack: compact stone
lintel, active relief occupying roughly 34 to 42 percent of the initial
viewport, one clean reading plane, one depth chooser, one primary action, and a
basalt plinth navigation dock. Decorative detail yields before the question,
the action, or a 44 pixel touch target.

Desktop keeps a twelve-column spatial model. The persistent artifact occupies
about five columns, the study plane about six, and one column remains air or a
structural seam. Mosaico may own the full canvas. Teacher mode is a quieter
restoration desk. Presentation mode is a high-contrast lectern.

Breakpoints are behavioral:

- Below 520px: artifact first, single reading column, simplified ornament.
- At 700 to 760px: diagonal/interlocking stone and limestone planes may appear.
- At 1120px: persistent world and study plane share the viewport.
- At 1280px: relief reaches 480 to 560 CSS pixels with more architectural air.

The spacing rhythm is 4, 8, 12, 18, 28, and 40 pixels. More space appears above
a heading than below it. Primary controls remain at least 44 by 44 CSS pixels.

**The Object Continuity Rule.** Hoy, Lección, Episodio, Mosaico, and Sábado
must preserve the sense that the same panel is approached, worked, changed, and
returned.

**The One Immediate Action Rule.** A focused viewport presents one clear next
action and one honest way to stop. Material richness never creates competing
CTAs.

## Elevation & Depth

Depth is built from physically plausible layers: local raster microtexture,
upper-left raking light, contact occlusion, beveled stone edges, inset grout,
and short directional shadows. Large soft floating-card shadows and ornamental
glows are not part of the language.

The persistent scene has three depth bands: architectural ground, active
artifact, and interaction plane. Temporary lift belongs to selection,
placement, or presentation. Steady state returns to embedded stillness.

### Shadow Vocabulary

- **Inset Carving:** a dark lower-right inner edge plus a narrow cool
  upper-left highlight.
- **Set Piece:** a short downward contact shadow beneath a tessera or relief.
- **Lifted Panel:** a deeper directional shadow used only while selecting or
  moving a quarter panel.
- **Kiln Spill:** a small local terracotta reflection around a real opening or
  seam. It is never a radial halo around the entire subject.

**The Still Frame Test.** Every surface must reach the visual bar with all
motion paused. Animation cannot rescue flat material, weak hierarchy, or an
unconvincing object.

**The One Light Direction Rule.** Ambient light comes from the upper left.
Narrative fire may add one local warm source. Every highlight and shadow must
agree with those sources.

## Shapes

Architectural surfaces are cut, chipped, inset, or folded. The radius scale is
3, 6, and 10 pixels. Large pills are reserved for compact segmented controls;
they are not a universal container language.

Quarter panels and hero slabs use authored clip paths and deterministic edge
variation. Irregularity remains stable between renders. Ordinary buttons,
inputs, switches, and dialogs remain recognizable and preserve their focus
geometry.

Narrative artwork is lesson-specific. Raster relief provides the final
material. CSS clip paths supply stage masks, seams, light, and load-state
treatment. Full-size loading and error states use the legacy SVG Centerpiece;
compact placements use a simplified CSS fallback mark. Small previews use
deliberate crops and do not shrink fragile hero detail.

**The Structural Truth Rule.** Openings show thickness, parts have weight,
handles join, paper curls, blocks bear on other blocks, and light originates
from a real gap or source.

## Components

### Architectural Shell

The mobile header is a carved lintel and the destination dock is a basalt
plinth. Desktop utilities live in a temple pier. Both use the same local stone
material and Phosphor glyph family.

### Primary Action

- **Shape:** gently cut control corners (3px in the production `.btn`).
- **Material:** fired terracotta texture under live HTML text.
- **Depth:** one inset top highlight and a short contact shadow.
- **Press:** scale to 0.98 over about 120ms and return immediately.
- **Focus:** a high-contrast outer line independent of texture.

### Depth Chooser

Three equally valid depths share one inset stone channel. Selection moves a
terracotta inlay beneath the label. It communicates preference, not spiritual
status. Text never waits for the inlay animation.

### Persistent Artifact

One lesson-specific relief remains mounted through the primary study journey.
Progress controls material visibility, physical joins, and local light. The
full-size SVG Centerpiece is the loading and failure fallback; compact
placements use a simplified CSS mark. Neither fallback is the hero.

### Quarter Mosaic

Thirteen unique panels interlock in one grout bed. Selected panels lift;
completed and connected panels differ through join structure, relief, and
labels as well as color. A semantic list remains available beside the visual
artifact.

### Study Plane

Questions and input sit on stable stone, limestone, wax, or papyrus inserts
appropriate to the lesson. Attempt precedes explanation where pedagogy permits.
Saving creates one visible causal placement in the artifact.

### Sabbath Folio

Private notes, selected class material, Scripture, and consent-sensitive names
remain live editable fields on layered papyrus or limestone sheets over a dark
restoration table. Generated imagery never contains user text.

### Icons

Phosphor regular weight remains the sole interface family. CSS provides inset
or embossed material treatment without changing the paths. Fill is reserved
for active or complete state. Narrative relief is not replaced by icon tiles.

### Motion

The material verbs remain **Set**, **Reveal**, and **Return**.

- Press: about 120ms.
- Selection: about 180ms.
- Content enter: about 230ms; content exit: about 140ms.
- Theme material crossfade: about 420ms.
- Mosaic match cut: about 520ms.
- Piece placement: about 720ms.
- Weekly completion: no more than 1000ms.

Repeated controls stay fast. Rare placement may use a bounded tessera transfer
and 8 to 14 deterministic dust fragments. Only transform and opacity change
continuously. Reduced motion removes travel, particles, parallax, path drawing,
and loops while retaining immediate state and short color or opacity feedback.

## Do's and Don'ts

### Do:

- **Do** use local raster assets for material credibility and responsive image
  sizes for memory control.
- **Do** keep every title, question, quotation, label, progress state, and user
  response as live semantic content.
- **Do** create thirteen distinct lesson compositions, even when lessons share
  one material grammar.
- **Do** let one meaningful answer visibly change the persistent artifact.
- **Do** keep reading planes quieter than relief regions.
- **Do** verify material crops, image failure, offline use, day/night,
  reduced motion, keyboard focus, 200 percent zoom, Chromium, and WebKit.

### Don't:

- **Don't** use a generated full-screen UI screenshot as the application.
- **Don't** present the old inline SVG motif as the final hero artwork.
- **Don't** place body copy directly over variable photographic texture.
- **Don't** add glass cards, neon, purple-blue gradients, generic halos,
  universal pills, or broad floating shadows.
- **Don't** animate grain, large blur, blend modes, filter parameters, or full
  screen camera drift.
- **Don't** let ornament delay controls or obscure task state.
- **Don't** turn the quarter artifact into thirteen disconnected product cards.
