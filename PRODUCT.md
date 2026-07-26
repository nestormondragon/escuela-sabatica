# Product truth

## Product

**Name:** Escuela Sabática, Q3 2026

**Experience name:** Mosaico Vivo de Corinto

**Platform:** Responsive web app, designed mobile first and requiring no runtime API

**Languages:** Spanish and English, selectable per device

**Source material:** The 13 official Spanish Adult Bible Study Guide PDFs for
Q3 2026, covering 1 and 2 Corinthians. The English edition preserves the same
stable lesson, station, slot, and Scripture-reference topology.

## Primary user

The primary user is a Spanish- or English-speaking Seventh-day Adventist adult
who studies the weekly Sabbath School lesson privately during the week and may
bring one thought, question, prayer, or commitment to the Sabbath class.

The current product is intentionally personal. It is primarily used by one reader, Néstor, but its interaction model should remain respectful and understandable for another adult reader without requiring product training.

## Secondary user

A teacher or facilitator may enable Modo maestro to prepare discussion prompts and guide a Sabbath School class. The facilitator mode must remain optional and must not complicate the reader experience.

## Core job

Turn a 13-week curriculum into a sequence of short, meaningful encounters that help the reader:

1. understand one important idea from the biblical text,
2. practice interpreting or applying it,
3. invest something personal in a durable weekly artifact,
4. recognize how previous answers connect to the present lesson,
5. arrive on Sabbath with something useful to share or act on.

The app must be more valuable than reading a PDF because it remembers, transforms, reconnects, and gives form to the reader's own work.

## Product promise

Each answer becomes a visible piece of a growing artifact. Each week changes the artifact. Across 13 weeks, the reader builds one living mosaic of the quarter from personal interpretations, commitments, prayers, questions, and acts of care.

The reward is not points, rank, or spectacle. The reward is seeing meaning take form, discovering a pattern in one's own responses, and carrying something useful into life and community.

## Differentiation

This is not a generic Bible study reader, quiz app, devotional card stack, or PDF replacement.

Its distinctive system is:

- a persistent quarter artifact with 13 lesson panels,
- one evolving narrative motif for each lesson,
- short interactions that train a real interpretive or relational skill,
- callbacks that make prior choices matter,
- a variable reveal shaped by the reader's path,
- a Sabbath synthesis that turns private study into a useful contribution,
- local ownership of the reader's words and progress.

## Motivation model

The experience should support:

- **Autonomy:** choose a suitable depth, revisit any lesson, edit an answer, skip without punishment, and control motion and facilitator tools.
- **Competence:** make progress visible through completed interpretations and useful skills, not through a spiritual score.
- **Relatedness:** connect the reader to Paul, the Corinthian community, people in the reader's life, and the Sabbath class.
- **Trigger:** a clear current lesson and one obvious next action.
- **Action:** one short, low-friction decision or exercise.
- **Variable reward:** a relevant connection, motif transformation, remembered callback, or newly legible pattern.
- **Investment:** the reader's own words alter the weekly and quarterly artifact and return later with context.

## Engagement ethics

The product may feel compelling, but it must not exploit compulsion.

Never use:

- shame for missed days,
- countdown pressure,
- loss aversion,
- loot-box randomness,
- endless feeds,
- spiritual ranking,
- comparative leaderboards,
- artificial scarcity,
- inflated praise,
- notifications that imply moral failure.

Return mechanics should preserve dignity. A missed day is not a broken covenant. Progress waits without accusation.

## Core surfaces

### Hoy

The return point. It shows the current lesson, the next meaningful action, one relevant callback, and the current state of the lesson motif. It should answer "Why should I open this now?" and "What can I finish in a few minutes?"

### Mosaico

The quarter artifact. It contains 13 durable lesson panels, each at its actual progress stage. It should make growth, continuity, unfinished possibilities, and the emerging quarter pattern visible at a glance.

### Sábado

The weekly synthesis. It turns the week's responses into an editable prayer, question, action, insight, and shareable artifact. It should feel earned because it is assembled from the reader's own work.

### Lesson path

The focused interaction flow for one weekly lesson. It should reveal one station at a time, preserve context, and make the physical state change of the motif continuous across the action and reward.

## Operating context

- Primarily used on a phone.
- Often opened in short sessions during the week.
- Sometimes used in low-connectivity church environments.
- May be used on a desktop for preparation or facilitation.
- Must work without a login, server account, or runtime API.
- All personal data remains in browser storage on the device.
- Export and sharing are explicit user actions.

## Technical constraints

- React 18 and Vite.
- Static Vercel deployment.
- No SSR.
- No runtime API or remote data dependency.
- All 13 lessons are generated from the draft JSON content pipeline.
- Generated `src/content/lN.js` files are outputs and must not be hand edited.
- Existing local storage must migrate without losing answers.
- Existing motif implementations and their verified narrative stage mapping are source assets to preserve and integrate.
- Framer Motion may be used for interface choreography.
- One visible full-size artifact may own one capped, visibility-aware WebGL
  render loop. All other ambient surfaces remain static or one-shot.
- SVG filters must not become persistent mobile paint costs.
- Ordinary interface icons must come from the existing Phosphor family.
- The app must remain functional if haptics, sharing, clipboard, image export, or local storage are unavailable.

## Content rules

- The PDF and draft JSON pipeline is the source of truth.
- All visible product copy, accessibility copy, dates, titles, generated folio
  fields, and lesson content must resolve through the selected Spanish or
  English locale.
- Stable IDs, tags, slot keys, and saved answers never change when locale
  changes.
- Switching locale may regenerate untouched synthesized folio text, but must
  preserve fields the reader edited.
- Do not use em dashes or en dashes in visible copy.
- Never fabricate Bible quotations, lesson claims, or source references.
- Personal callbacks must quote or paraphrase only data the reader actually entered.
- The product must distinguish authored content from generated summaries based on the reader's answers.

## Brand commitments

- Art direction: Corinthian mosaic, fired clay, quarried slate, ink, light through fractures.
- Night ground: slate ink.
- Day ground: cool stone, never parchment.
- Accent: one clay or terracotta hue.
- Type: Outfit for interface and framing, EB Garamond for scripture, letters, and reflection.
- Geometry: cut tesserae and architectural planes with a 3, 6, and 10 pixel radius scale.
- Motion vocabulary: placement, settling, assembly, tracing, ink bloom, and restrained breathing light.
- Avoid generic glass cards, floating rounded containers, gradient marketing treatments, neon, emoji, and mixed icon families.

## Accessibility

- Target WCAG 2.2 AA contrast.
- Full keyboard access.
- Semantic headings, landmarks, controls, dialog behavior, labels, and live regions.
- A meaningful nonvisual description of motif and mosaic progress.
- `prefers-reduced-motion` must show final states immediately and remove nonessential spatial choreography.
- At least 44 by 44 pixel touch targets for primary controls.
- Text remains readable at 200 percent zoom.
- Content and progress do not depend on color alone.
- Focus is never lost during route, sheet, reward, or station transitions.

## Success criteria

The overhaul succeeds when:

1. a returning reader understands the next action within five seconds,
2. the main reward is the artifact changing because of the reader's work,
3. prior answers meaningfully return later,
4. all 13 lessons visibly belong to one quarter-long creation,
5. the Sabbath surface is useful even without rereading the full lesson,
6. every interaction remains skippable, editable, and nonjudgmental,
7. the app works at 390, 768, and 1440 pixel viewports in Chromium and WebKit,
8. existing lesson data survives migration,
9. reduced motion and keyboard navigation are first-class,
10. production build and content QA gates pass with no new console errors.

## Evidence and source locations

- Product and toolchain state: `PROJECT-STATE.md`
- Engagement research and implementation brief: the approved redesign brief created before this overhaul
- Lesson sources: `drafts/q3-2026/l1.json` through `drafts/q3-2026/l13.json`
- Generated lessons: `src/content/l1.js` through `src/content/l13.js`
- Motif source: `src/components/Motif.jsx`
- Vessel source: `src/components/CrackedVessel.jsx`
- Content QA: `scripts/qa-structure.mjs` and `scripts/qa-templates.mjs`
- Visual QA: motif, vessel, and release Playwright verification scripts in `scripts/`
