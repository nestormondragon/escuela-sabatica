# PROJECT-STATE.md

Handoff document. Read this before changing the app.

This file describes the full product-experience overhaul on branch
`codex-overhaul`. The pre-overhaul state is permanently named and bundled under
[Rollback](#rollback).

## Product

This is a Spanish-language Seventh-day Adventist Sabbath School app for the Q3
2026 study of 1 and 2 Corinthians. It is local-first, single-reader software
that also supports a teacher and a deliberate presentation view.

The product is no longer organized as "tap and read" devotional cards. Its
central model is **Mosaico Vivo de Corinto**:

- all 13 lessons are panels in one evolving Corinthian courtyard mosaic,
- each meaningful answer places a piece or changes a material detail,
- the app remembers capabilities, commitments, phrases, and cross-week joins,
- previous work returns later with context,
- the week culminates in an editable Sábado folio,
- the reader chooses a depth without punishment or status pressure.

The engagement model is autonomy, competence, relatedness, useful surprise, and
investment. It explicitly rejects points, ranks, spiritual-performance scores,
loss-aversion streaks, variable loot, and fabricated urgency.

Read:

- `PRODUCT.md` for product truth and motivation ethics.
- `DESIGN.md` for the portable visual system.
- `.impeccable/design.json` for renderable design-system extensions.

## Stack and deployment

- React 18.3.1
- React Router DOM 7.18.1
- Vite 8.1.5 with `@vitejs/plugin-react` 6.0.1
- Framer Motion 11.18.2
- Phosphor React icons 2.1.10
- local Outfit Variable and EB Garamond Variable font packages
- Playwright 1.62.0 for Chromium and WebKit verification
- no SSR, no React Server Components, no server actions
- no runtime API, analytics, remote font, or CDN dependency

Vercel configuration:

- framework: Vite
- build: `npm run build`
- output: `dist`
- `vercel.json` rewrites all application routes to `index.html`

### Toolchain

Node is now persistent. The old `/tmp` Node installation and its re-download
trap are retired.

```text
node: /Users/Administrator/.nvm/versions/node/v24.18.0/bin/node
node version: 24.18.0
npm version: 11.16.0
```

The repository pins:

```text
.nvmrc: 24.18.0
package.json engines.node: 24.x
package.json packageManager: npm@11.16.0
```

On a new machine:

```bash
nvm install
nvm use
npm ci
```

Do not recreate the old `/tmp/node-v20...` workflow.

## Application architecture

`src/App.jsx` now owns only the durable providers and router. The responsive
shell is under `src/app/`.

Routes:

```text
/                                      redirects to /hoy
/hoy                                  current useful return surface
/mosaico                              13-panel quarter artifact
/sabado                               calendar lesson folio
/sabado/:lessonId                     explicit lesson folio
/lecciones                            lesson selector
/leccion/:lessonId                    lesson path
/leccion/:lessonId/episodio/:episodeId focused interaction
/maestro/:lessonId                    teacher guide
/presentar/:lessonId                  privacy-filtered presentation
/ajustes                              privacy, theme, motion, backup, reset
```

Key directories:

```text
src/app/                  AppShell, ContextRail, navigation, routing, focus
src/routes/               route composition and data loading
src/features/today/       Chispa, depth choice, returned commitments
src/features/world/       active lesson panel and motif
src/features/mosaic/      quarter artifact and semantic list
src/features/episode/     mutation reward and intentional exit
src/features/sabbath/     folio, share preview, presentation
src/state/journey/        JourneyState v2, migration, persistence, privacy
src/modules/              the seven interaction grammars
src/content/              generated lesson modules and lazy manifest
```

### Product loop

The durable loop is:

```text
return thread or Chispa
  -> choose 1 minuto, Estudiar, or A fondo
  -> attempt before explanation where appropriate
  -> invest a phrase, decision, or action
  -> see the same artifact change
  -> accumulate capability evidence and cross-week joins
  -> edit/select material for the Sábado folio
  -> return later to a remembered commitment or phrase
```

This loop is the reason for the architecture. Do not replace the artifact
mutation with a generic modal, generic confetti, or a score.

### Route behavior that is covered by regression tests

- A completed `/hoy` does not reopen the final episode. It offers
  `/sabado/:lessonId`.
- `/sabado/:lessonId` keeps that lesson even when it is not the calendar week.
- Presentation close returns to the originating lesson folio.
- Route navigation moves focus to the new surface heading after the transition.
- Document titles include the active route and explicit lesson.
- Direct episode URLs survive a reload.

## Content pipeline

Q3 2026 contains 13 authored lesson drafts.

```text
drafts/q3-2026/*.json              source of truth
scripts/build-lessons.mjs          normalize and validate
src/content/l1.js ... l13.js       generated output
src/content/lessonManifest.generated.js
src/content/loadLesson.js          dynamic lesson imports
```

Run:

```bash
npm run build:lessons
```

Hard rules:

- Never hand-edit `src/content/lN.js`.
- Edit the matching JSON draft, then regenerate.
- Visible application copy contains no em dash or en dash.
- Slot and station IDs must pair exactly.
- Every referenced icon must exist in `src/components/Icon.jsx`.
- Template tokens must render cleanly with real answers.
- `{name}` and `{slot:...}` semantics are validated by the build.
- Every lesson retains eight stations and eight durable slots.

The current calendar logic maps 2026-07-25 to L4, "Tu Cuerpo, Su Templo".

## JourneyState v2 and privacy

Durable key:

```text
escuela:journey:2026-Q3
```

Verified backup key:

```text
escuela:journey:2026-Q3:backup
```

The v2 state includes:

- profile and depth preference,
- navigation context,
- 13 lesson records,
- 13 mosaic panel records,
- private investments,
- capability evidence,
- commitments,
- revealed cross-week connection IDs,
- saved Sábado packs,
- theme, reduced motion, and haptic settings.

Migration is additive:

- all existing `escuela:*` v1 values are read but never rewritten,
- the first migration captures their exact raw strings in the backup envelope,
- subsequent boots load v2 and do not import v1 again,
- corrupt v2 can recover from the last known good record,
- reset writes a valid empty v2 record while leaving v1 untouched, so reload
  does not resurrect old answers,
- selective sharing excludes private fields,
- another person's material requires explicit consent,
- backup export and import remain local to the browser.

The reset and migration contract is verified in both Chromium and WebKit.

## Design system

The Creative North Star is **El patio mosaico vivo de Corinto**.

- Night material: slate ink.
- Day material: cool quarried stone, never parchment.
- One brand accent: Corinthian clay.
- Interface voice: Outfit Variable.
- Scripture and preserved contemplative voice: EB Garamond Variable.
- Shape scale: 3, 6, and 10 pixels.
- Interface icons: Phosphor regular weight, fill only for selected/completed.
- Primary desktop composition: 5 columns world, 6 columns study, 1 column air.
- Mobile: compact context rail, focused canvas, safe-area destination dock.
- Touch targets: at least 44 by 44 CSS pixels.

The quarter mosaic is one authored spatial composition, not a card gallery.
Completed, current, connected, upcoming, and revisited panels have semantic
labels and structural differences, not only color differences.

Do not reintroduce:

- centered card stacks,
- bento grids,
- broad frosted panels,
- unrelated purple/blue gradients,
- 20 to 28 pixel universal radii,
- decorative icon tiles,
- a radial halo behind every illustration,
- a second brand accent.

## Motion architecture

The motion verbs are **Set**, **Reveal**, and **Return**.

- Press: about 120ms.
- Selection: about 180ms.
- Navigation: about 280ms.
- Discovery: about 520ms.
- Material placement: about 720ms.
- Weekly completion: no more than 1100ms.

Load-bearing rules:

- Only transform and opacity are used for continuously changing UI motion.
- The active motif is the only ambient-motion owner in a viewport.
- The backdrop and Centerpiece bloom are static.
- Ambient loops are CSS keyframes with a meaningful still frame.
- One-shot geometry may use `requestAnimationFrame`.
- Press-and-hold interactions expose immediate keyboard completion.
- In-app reduced motion and operating-system reduced motion both remove loops,
  paths, particles, parallax, and spatial choreography.
- Reduced motion renders the complete state and never leaves low-opacity or
  partially revealed content.
- Hidden content is not essential to completion.
- SVG filter parameters are not animated continuously.

`src/lib/useAppReducedMotion.js` joins the in-app setting with the system
preference for custom interactions. `MotionConfig` handles Framer Motion.
CSS contains both `prefers-reduced-motion` and `data-motion="reduce"` paths.

## Motifs and SVG

`src/components/Motif.jsx` dispatches the narrative art. `Centerpiece.jsx`
maps filled slots onto stage 0 through 4.

Eight motif grammars:

| Motif | Material and transformation |
| --- | --- |
| barro | thrown clay, mask-cut fracture, internal light, reveal/restore arcs |
| mosaico | tesserae in grout with deterministic cut and tone |
| cruz | hewn timber, grain, side faces, and lashing |
| carta | papyrus fiber, curl, writing, and pressed wax |
| alba | Corinthian architecture moving from night to dawn |
| retrato | canvas weave and charcoal planes |
| siembra | hand, grain in flight, furrows, and shoots |
| muro | ashlar courses descending to bedrock refuge |

SVG rules:

- use filled geometry for physical material and anything that tapers,
- use strokes for ink, routes, joins, and reveal mechanisms,
- namespace every gradient, mask, clip, filter, title, and description ID,
- keep all local URL references inside their component instance,
- use explicit compact variants below 96px,
- check silhouette before material and material before effects,
- verify Chromium and WebKit,
- never call a syntactically valid SVG finished without looking at it.

The repository includes `.agents/skills/svg-animations/SKILL.md`.
`@svgdotjs/svg.js`, Paper.js, and SVGO are development dependencies for
geometry and asset work. They are not runtime dependencies. VTracer and
svg-animation-studio were reference tools, not application dependencies.

The cracked vessel remains documented in:

- `docs/SVG-DESIGN.md`
- `docs/svg-quality-rubric.md`

L4 uses the restore arc. L10 uses the reveal arc.

## Accessibility

- Spanish document language and route-specific titles.
- One main landmark and visible skip link.
- New route headings receive focus after transition completion.
- One visible H1 per primary route.
- Semantic buttons, links, labels, pressed states, expanded states, and
  progress values.
- The mosaic has keyboard roving focus plus a screen-reader list.
- Saved artifact changes use polite live feedback.
- Sábado sharing is explicit and consent-aware.
- Reduced motion is available in the app and follows the system by default.
- Day and night primary text/action pairs meet WCAG AA.

## QA

Canonical local checks:

```bash
npm run qa
```

This runs:

```text
build:lessons
qa:content
test:journey
vite production build
```

Browser release checks require a running app:

```bash
npm run dev -- --host 127.0.0.1 --port 5175
BASE_URL=http://127.0.0.1:5175 \
QA_OUTPUT_DIR=/private/tmp/escuela-overhaul-qa \
npm run qa:browser
```

For the final production-oriented gate, build the app, start an isolated Vite
preview, run the complete browser matrix against that preview, and stop the
server with one command:

```bash
npm run qa:release
```

`scripts/verify-overhaul.mjs` currently runs Chromium and WebKit at:

- 390 by 844
- 768 by 1024
- 1440 by 900

It verifies:

- all primary routes,
- landmarks and route headings,
- no horizontal overflow,
- no duplicate, broken, or cross-instance SVG references,
- no unresolved `{name}` tokens,
- no console errors or failed requests,
- direct-route reload,
- deterministic calendar behavior at `2026-07-25`,
- route-title and destination-heading focus,
- delayed lazy-module heading focus,
- system and in-app reduced motion,
- one ambient-motion owner,
- day and night primary-token contrast,
- exact preservation of v1 during migration,
- reset without v1 resurrection,
- explicit Sábado lesson context,
- presentation context, modal focus, focus trap, and return focus,
- completed Hoy to Sábado handoff,
- same-route intentional-exit focus,
- a commitment created through `CommitDuo`, reloaded, and returned in Hoy,
- capability evidence and cross-week connection loop.

Release result on 2026-07-25:

```text
77 passed
0 failed
0 warnings
```

Journey unit result:

```text
9 passed
0 failed
```

Impeccable source detector:

```text
0 warnings or failures
189 advisory design-system matches
```

The advisories are scale metadata suggestions, mainly legitimate local SVG
material colors and component type sizes. They do not change the detector exit
status. The two concrete layout-transition warnings were fixed.

Latest production build:

- CSS: 16.16KB gzip
- initial JavaScript chunks plus runtime: about 205KB gzip
- each lazy lesson: about 10 to 11.3KB gzip
- local fonts: loaded as separate WOFF2 assets

## Dependency security

`npm audit` reports two high entries for the same React Router advisory:
GHSA-qwww-vcr4-c8h2.

The advisory affects React Server Components mode and server action execution.
This application is a client-only SPA with no SSR, React Server Components, or
server actions, so the affected execution surface is absent.

As of 2026-07-25:

- latest `react-router-dom` is 7.18.1,
- patched `react-router` 8.3.0 requires React and React DOM 19.2.7,
- `react-router-dom` 7.18.1 pins `react-router` 7.18.1.

Do not force an incompatible transitive override merely to make the audit count
zero. Re-evaluate when a compatible patched `react-router-dom` is published or
when the app intentionally upgrades to React 19.

## Rollback

The exact state before this overhaul is:

```text
commit: fbe35ba9262e3fbaf78c7b0b33e98933bf91094c
tag: pre-overhaul-2026-07-25
branch: pre-overhaul-snapshot
```

The tag is the canonical rollback target.

Safest way to inspect or run the original without changing the current branch:

```bash
git worktree add ../escuela-sabatica-pre-overhaul pre-overhaul-2026-07-25
```

Safest way to continue development from the original:

```bash
git switch -c restore-pre-overhaul pre-overhaul-2026-07-25
```

After the overhaul is merged with `--no-ff`, preserve history and undo only that
merge with:

```bash
git log --merges --oneline --grep="Full product experience overhaul" -1
git revert -m 1 <merge-commit-from-the-command-above>
```

An external verified Git bundle also exists:

```text
/Users/Administrator/Documents/Codex/2026-07-25/ai-web-design-workflow-chatgpt-conversation-2/outputs/escuela-sabatica-pre-overhaul-2026-07-25-fbe35ba.bundle
SHA-256: 447f28fb7bda2e24a093c64d5e5f4e4b170343839d3ade73a4dfadfad42164cc
```

Restore that bundle into a new directory:

```bash
git clone /absolute/path/to/escuela-sabatica-pre-overhaul-2026-07-25-fbe35ba.bundle escuela-sabatica-restored
cd escuela-sabatica-restored
git switch -c main pre-overhaul-2026-07-25
```

No push is part of this overhaul. The user decides when to push.

## Working agreements

- Preserve the content-pipeline rules.
- Render and inspect narrative art rather than grading source code.
- Keep privacy local-first and sharing opt-in.
- Keep the artifact continuous across routes.
- Do not turn engagement into compulsion or spiritual status.
- Make reversible checkpoints before broad changes.
- Run both engine suites before claiming completion.
- Report what was actually run and any real limitations.
- Never push without explicit authorization.
