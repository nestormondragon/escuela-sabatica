# Corinto Vivo production image prompts

These are the production prompts used to establish the five local materials and
thirteen lesson reliefs on 2026-07-25. The checked-in PNG files are the
authoritative masters. Image generation is stochastic; these prompts preserve
the art contract but do not reproduce identical pixels.

The original texture and L4 calls used the three user-approved concept images
as style references. The remaining reliefs used `raw/reliefs/l04.png` as the
primary immutable style anchor, with the concept images serving only as broad
Corinthian direction where noted.

When regenerating, use OpenAI's built-in ImageGen as an authoring tool and save
the approved result into `raw/`. The shipped application never invokes
ImageGen or any API.

## Asset briefs

| Asset | Physical brief | Semantic job |
| --- | --- | --- |
| basalt ink | cool, hand-quarried charcoal slate | night architecture and reading ground |
| cool limestone | pale conserved Corinthian limestone | day architecture and quiet reading plane |
| fired terracotta | matte, hand-fired coral clay | actions, joins, seals, and local warmth |
| dark grout | compacted charcoal lime mortar | physical bed between quarter panels |
| papyrus fiber | cool preserved papyrus | Sábado folio and letter surfaces |
| L1 | opening sealed letter over an incised route | commission and path revealed |
| L2 | rough physical cross breaking through stone | paradoxical strength in what seems lowly |
| L3 | two tessellated hands supporting one vessel | unity across division |
| L4 | sherd-built vessel around a warm inner core | body as temple, restoration in progress |
| L5 | shared table whose structure creates a cross void | care for another and common purpose |
| L6 | unequal tesserae becoming one supported body | many members, one body |
| L7 | fragmented anonymous portrait becoming mirror | honest self-examination |
| L8 | open Corinthian doorway and empty tomb at dawn | resurrection and an open future |
| L9 | blank papyrus carrying dried tears and a plain seal | the severe letter and reconciled grief |
| L10 | intact vessel with one deep treasure-bearing fracture | treasure in fragile clay |
| L11 | hand sowing seeds over three furrows | generosity, sowing, and growth |
| L12 | dismantled fortress descending to bedrock refuge | false strongholds brought down |
| L13 | thirteen paths and people converging at one center | the quarter gathered into shared life |

## Material prompts

### Basalt ink

```text
Use case: style-transfer
Asset type: seamless web material texture for a premium interactive Bible-study application
Input images: Images 1-3 are style references only. Extract their realistic charcoal-black Corinthian slate, carved stone, tactile grain, and directional lighting language. Do not reproduce their UI, text, icons, pots, mosaics, or composition.
Primary request: create one square, perfectly seamless tileable texture of hand-quarried charcoal-black slate used in an ancient Corinthian courtyard wall.
Style/medium: photorealistic macro material scan with subtle sculptural depth, premium cinematic 3D realism, physically plausible stone pores and faint chisel variation.
Composition/framing: orthographic front-facing material swatch, even scale across the whole image, no focal object, edges must tile invisibly in both axes.
Lighting/mood: very soft broad upper-left grazing light with restrained highlights; preserve enough midtone detail for dark-mode UI overlays.
Color palette: cool graphite, slate ink, smoke gray; no blue, purple, green, gold, or warm brown cast.
Materials/textures: fine stone pores, shallow natural fissures, slight hand-tooled undulation, rare hairline mineral seams; no large cracks.
Constraints: no text, no symbols, no borders, no panels, no objects, no vignette, no logos, no watermark, no dramatic hotspot; uniform density; truly seamless repeat.
```

Negative constraints: no reproduced UI, objects, large cracks, warm cast,
vignette, hotspot, visible tile boundary, text, symbol, logo, or watermark.

### Cool limestone

```text
Use case: style-transfer
Asset type: seamless web material texture for the light theme of a premium interactive Bible-study application
Input images: Images 1-3 are style references only. Extract Image 2's cool pale quarried-stone realism and the tactile archaeological finish shared by all three. Do not reproduce their UI, text, icons, pots, mosaics, or composition.
Primary request: create one square, perfectly seamless tileable texture of cool pale Corinthian limestone, softly worn and hand-finished.
Style/medium: photorealistic macro material scan with restrained sculptural depth, premium cinematic 3D realism, natural limestone pores and faint tool marks.
Composition/framing: orthographic front-facing material swatch, even scale across the entire image, no focal object, edges must tile invisibly in both axes.
Lighting/mood: diffuse daylight from upper left, calm and luminous but never blown out; preserve enough tonal variation for dark readable text.
Color palette: cool ivory, mineral gray, pale limestone; avoid parchment yellow, beige warmth, pink, gold, or brown cast.
Materials/textures: fine pores, subtle chalky mineral bloom, shallow hairline wear, slight hand-tooled undulation; no large cracks.
Constraints: no text, no symbols, no borders, no panels, no objects, no vignette, no logos, no watermark, no dramatic hotspot; uniform density; truly seamless repeat.
```

Negative constraints: never parchment, beige, sepia, pink, gold, or brown; no
large cracks, objects, frames, text, symbols, logos, watermark, vignette,
hotspot, or visible repeat.

### Fired terracotta

```text
Use case: style-transfer
Asset type: seamless web material texture for controls, tesserae, and illuminated joins
Input images: Images 1-3 are style references only. Extract their fired-terracotta material realism, especially the coral-orange clay surfaces, without reproducing any UI, text, symbols, or objects.
Primary request: create one square, perfectly seamless tileable texture of hand-fired Corinthian terracotta clay.
Style/medium: photorealistic macro material scan, premium cinematic 3D realism, tactile matte ceramic with shallow handmade imperfections.
Composition/framing: orthographic front-facing material swatch, even scale across the whole image, no focal object, edges tile invisibly in both axes.
Lighting/mood: soft upper-left grazing light, controlled low relief, no hotspot.
Color palette: mineral terracotta, coral clay, burnt sienna and subtle darker kiln variation; avoid bright orange, pink, red neon, yellow, gold, or brown wood tones.
Materials/textures: fine ceramic pores, faint wheel or hand-compression marks, tiny firing speckles, occasional hairline surface craze too subtle to read as damage.
Constraints: no text, no symbols, no borders, no buttons, no bricks, no objects, no vignette, no logos, no watermark; uniform density; truly seamless repeat.
```

Negative constraints: no bright orange, pink, neon red, yellow, gold, wood
grain, bricks, buttons, objects, large damage, text, symbols, logo, watermark,
vignette, hotspot, or visible repeat.

### Dark grout

```text
Use case: style-transfer
Asset type: seamless web material texture for the physical bed of a 13-panel Corinthian mosaic
Input images: Images 1-3 are style references only. Extract Image 1's authentic grout and archaeological restoration texture, while matching the dark cinematic restraint of Image 3. Do not reproduce their UI, text, symbols, pottery, or compositions.
Primary request: create one square, perfectly seamless tileable texture of compacted deep-charcoal lime mortar and granular mosaic grout.
Style/medium: photorealistic macro material scan, premium archaeological realism, tactile granular microrelief.
Composition/framing: orthographic front-facing swatch, uniform scale and density across the entire image, no focal feature, edges tile invisibly in both axes.
Lighting/mood: neutral diffuse illumination with the faintest upper-left rake, enough detail to separate black stone panels without looking noisy.
Color palette: deep charcoal, ash gray, traces of cool limestone dust; no orange, blue, purple, green, gold, or warm brown cast.
Materials/textures: compacted mortar granules, tiny aggregate, shallow hand-packed irregularity, rare sub-millimeter pits; no broad cracks.
Constraints: no text, no symbols, no borders, no blocks, no tesserae, no panels, no objects, no vignette, no logos, no watermark; uniform density; truly seamless repeat.
```

Negative constraints: no blocks, tesserae, panels, broad cracks, colored cast,
objects, focal feature, text, symbols, logo, watermark, vignette, excess noise,
or visible repeat.

### Papyrus fiber

```text
Use case: style-transfer
Asset type: seamless web material texture for the weekly Sabbath folio and letter surfaces
Input images: Images 1-3 are style references only. Carry over their museum-grade tactile realism and controlled directional light, but do not reproduce any UI, text, symbols, mosaics, pottery, or composition.
Primary request: create one square, perfectly seamless tileable texture of an aged but carefully preserved papyrus sheet with visible natural fibers.
Style/medium: photorealistic macro material scan, refined archaeological conservation quality, tactile but quiet enough beneath live text.
Composition/framing: orthographic front-facing swatch, uniform scale and density across the entire image, no focal feature, edges tile invisibly in both axes.
Lighting/mood: diffuse upper-left daylight, low contrast, no cast shadow or vignette.
Color palette: restrained ash straw, cool oat, pale flax, mineral gray; avoid golden parchment, orange warmth, stains, sepia, or brown cast.
Materials/textures: fine crossing fibers, shallow pressed ridges, tiny age variation, clean conserved surface; no tears or large blemishes.
Constraints: no ink, no handwriting, no letters, no numbers, no symbols, no borders, no objects, no logos, no watermark; uniform density; truly seamless repeat.
```

Negative constraints: no golden parchment, orange warmth, sepia, stains, tears,
large blemishes, cast shadow, ink, handwriting, pseudo-writing, text, symbols,
objects, logo, watermark, vignette, or visible repeat.

## Relief prompts

### Lesson 1: the opened commission

```text
Use case: stylized-concept
Asset type: production square narrative relief master for a responsive web app

REFERENCE ROLES
- Reference 1 is the exact required style and material anchor. Match its charcoal basalt, museum-grade photorealistic 3D bas-relief depth, rough chiseled surface, graphite midtone readability, orthographic camera, crop-safe composition, and upper-left raking light.
- References 2–4 are broader Corinthian stone, mosaic, and day/night art-direction references only. Do not copy their text, numbers, UI, or layout.

PRIMARY REQUEST
Create the Lesson 1 relief: a wax-sealed commission letter opening across a carved route. The central subject is a thick folded ancient letter or scroll rendered as tactile carved stone and restrained warm clay/papyrus material, partly opening to reveal a shallow winding route carved into the basalt plane beneath it. A small believable pressed terracotta wax seal anchors one folded corner. The route is a physical incision or shallow relief groove, not a modern map icon and not a glowing line. The visual metaphor is a commission being opened and a path becoming visible. No readable writing appears anywhere.

COMPOSITION
Square 1:1, full-bleed charcoal basalt architectural plaque, straight-on orthographic view. Subject occupies about 62% of image height and is centered with generous crop-safe stone on every edge. No separate frame, border, card, floating rectangle, UI panel, or pedestal. Make the letter silhouette unmistakable at thumbnail size. Keep a quiet architectural suggestion at far edges only if it matches Reference 1.

STYLE AND MATERIALS
Museum-grade photorealistic 3D bas-relief. Deep, readable graphite midtones; rough quarried basalt; chipped stone edges; credible contact shadows and occlusion. Restrained terracotta clay and muted lime/papyrus accents only, integrated as physical material. Coherent upper-left raking light; calm dark atmosphere. Match Reference 1's material depth and visual family exactly.

CONSTRAINTS
No text, letters, numbers, runes, symbols, labels, inscriptions, buttons, icons, watermark, logo, people, faces, neon, magical glow, halo, cyberpunk light, gold ornament, decorative border, or modern stationery. Do not place writing-like marks on the letter. Avoid malformed scroll geometry, impossible folds, duplicate seals, floating fragments, or flat vector appearance.
```

The first candidate contained an emblem on the seal. The final master used this
targeted correction:

```text
Use case: precise-object-edit
Asset type: production narrative relief master

Image 1 is the edit target. Image 2 is the immutable material/style anchor.

Make one targeted correction only: replace the emblem-bearing circular wax seal on the folded letter with a small irregular pressed terracotta wax seal whose face is completely plain and unmarked. It may show natural dents, compression, chipped wax edges, and raking-light texture, but absolutely no vessel, icon, logo, rune, letter, number, monogram, stamp image, or readable mark.

Preserve everything else exactly: square crop, letter geometry, carved winding route, basalt plaque, architectural edge relief, camera, upper-left raking light, graphite midtones, material depth, shadows, scale, and negative space. Do not add text or any new object.
```

Negative constraints: no writing-like marks, emblem, duplicated seal,
impossible fold, people, frame, glow, gold, modern stationery, UI, or flat
vector treatment.

### Lesson 2: the rough cross

```text
Use case: stylized-concept
Asset type: production square narrative relief master for a responsive web app

REFERENCE ROLES
- Reference 1 is the exact required style and material anchor. Match its charcoal basalt, museum-grade photorealistic 3D bas-relief depth, rough chiseled surface, graphite midtone readability, orthographic camera, crop-safe composition, and upper-left raking light.
- References 2–4 are broader Corinthian stone, mosaic, and day/night art-direction references only. Do not copy their text, numbers, UI, or layout.

PRIMARY REQUEST
Create the Lesson 2 relief: a rough-hewn cross emerging from a fractured Corinthian stone plane. The cross is unmistakable but materially truthful, constructed as two massive roughly carved basalt or dark timber-like stone beams pressing outward from the plaque, with fractured surrounding planes and a restrained warm terracotta underlayer visible only in selected deep breaks. It should communicate paradoxical power through an object dismissed as rough and lowly, not ornate triumph. The cross must be a physical structural relief, not an icon, glowing symbol, grave marker, jewelry, or polished church ornament.

COMPOSITION
Square 1:1, full-bleed charcoal basalt architectural plaque, straight-on orthographic view. Subject occupies about 62% of image height and is centered with generous crop-safe stone on every edge. No separate frame, border, card, floating rectangle, UI panel, pedestal, landscape, sky, person, or church interior. Keep the silhouette strong at thumbnail size. Quiet Corinthian architectural edge fragments may appear only if they match Reference 1.

STYLE AND MATERIALS
Museum-grade photorealistic 3D bas-relief. Deep readable graphite midtones; rough quarried basalt; chipped edges; splintered or hewn surface cues; credible contact shadows and occlusion. Restrained terracotta/lime accents only inside material fractures. Coherent upper-left raking light. Calm dark atmosphere. Match Reference 1's material depth and visual family exactly.

CONSTRAINTS
No text, letters, numbers, runes, symbols other than the required physical cross object, labels, inscriptions, buttons, icons, watermark, logo, people, faces, crucified figure, neon, magical glow, halo, gold, gemstones, decorative border, rays, flames, crown, heart, or modern graphic styling. Avoid malformed beam joins, duplicate crossbars, extra crosses, symmetrical lightning cracks, floating debris, or flat vector appearance.
```

Negative constraints: no crucified figure, church interior, ornamental
triumphal styling, extra cross, malformed join, symmetric lightning crack,
floating debris, glow, rays, flames, crown, heart, gold, UI, or text.

### Lesson 3: unity around one vessel

```text
Use case: stylized-concept
Asset type: production square narrative relief master for a responsive web app

REFERENCE ROLES
- Reference 1 is the exact required style and material anchor. Match its charcoal basalt, museum-grade photorealistic 3D bas-relief depth, rough chiseled surface, graphite midtone readability, orthographic camera, crop-safe composition, and upper-left raking light.
- Reference 2 supplies the hands-and-vessel mosaic idea only. References 3–4 supply broader Corinthian material direction. Do not copy any text, numbers, UI, labels, or layout.

PRIMARY REQUEST
Create the Lesson 3 relief: two opposed human hands joining around and supporting one shared vessel, all built as an ancient mosaic bas-relief from irregular individually cut tesserae. One hand enters from the left and one from the right. They are different but equal in scale, open and cooperative rather than gripping or fighting. Together they cradle a single humble clay vessel at the center. The vessel remains complete because the hands meet around it. The message is unity across division. Keep the hands anatomically clear but stylized in authentic mosaic geometry, with no faces or bodies.

COMPOSITION
Square 1:1, full-bleed charcoal basalt architectural plaque, straight-on orthographic view. Central hands-and-vessel mosaic occupies about 62% of image height, with generous crop-safe basalt on every edge. The vessel is vertically centered and unmistakable. Hands must remain fully inside the crop. No separate frame, border, card, floating rectangle, UI panel, pedestal, room, or landscape. Quiet architectural edge fragments may appear only if they match Reference 1.

STYLE AND MATERIALS
Museum-grade photorealistic 3D bas-relief. Deep readable graphite midtones; rough quarried basalt; dark grout; irregular hand-cut limestone, charcoal, and restrained terracotta tesserae; chipped edges; credible contact shadows and occlusion. Use muted lime/stone tesserae for the hands and restrained terracotta for the vessel. Coherent upper-left raking light. Calm dark atmosphere. Match Reference 1's material depth and visual family exactly.

CONSTRAINTS
No text, letters, numbers, runes, symbols, labels, inscriptions, buttons, icons, watermark, logo, faces, portraits, extra hands, more than one vessel, neon, magical glow, halo, gold, modern sleeves, jewelry, weapons, decorative border, or flat vector appearance. Hands must each have one palm and five plausible digits without fused, duplicated, or missing fingers. Avoid handshake pose; the hands support the vessel from opposite sides.
```

Negative constraints: exactly two plausible five-digit hands and one vessel;
no handshake, grip/fight pose, body, portrait, modern sleeve, jewelry, weapons,
frame, glow, gold, UI, or text.

### Lesson 4: the body as a restored temple

```text
Use case: style-transfer
Asset type: responsive hero relief plate for lesson 4 of a premium Spanish Sabbath School application
Input images: Images 1-3 are visual-quality and material-language references only. Image 3 is the primary reference for relief depth and charcoal basalt; Image 1 contributes authentic mosaic craft; Image 2 contributes clean legibility and controlled composition. Do not copy any text, numbers, navigation, UI controls, or exact screen composition.
Primary request: create a square museum-grade tactile bas-relief artwork representing the body as a temple and a vessel being restored.
Scene/backdrop: one continuous hand-quarried charcoal-black basalt architectural plaque that fills the canvas edge to edge, with extremely subtle Corinthian carved fragments at the far left and right edges.
Subject: centered hand-thrown amphora assembled from many irregular dark ceramic sherds around a visible terracotta inner core. Broad belly, short neck, open rim with believable thickness, one integrated handle. Several sherds are still slightly separated or settling toward place. The vessel should feel whole-in-formation, not destroyed. A restrained warm terracotta seam travels through the joins and continues downward into the surrounding stone as one physical inlaid line.
Style/medium: photorealistic cinematic 3D bas-relief, archaeological restoration object, museum-grade tactile material realism, physically believable depth and contact occlusion, not illustration and not an SVG look.
Composition/framing: straight-on orthographic view, square 1:1, vessel occupies roughly 62 percent of canvas height, generous dark stone around it for responsive cropping, no border or card frame.
Lighting/mood: controlled upper-left raking light, deep but readable charcoal midtones, quiet contemplative atmosphere; one subtle warm internal source visible only between a few sherd gaps.
Color palette: near-black basalt, graphite ceramic, restrained fired terracotta and coral-orange core, tiny cool limestone traces; no blue, purple, gold, green, or neon.
Constraints: no text, no letters, no numbers, no symbols, no labels, no buttons, no icons, no watermark, no UI, no generic glow halo, no cartoon, no glass, no shield silhouette, no rectangular stopper, no perfect symmetry. The center must remain clearly readable at a 320-pixel mobile crop.
```

Negative constraints: vessel is whole-in-formation rather than destroyed; no
shield, stopper, glass, perfect symmetry, generic halo, cartoon, detached card,
UI, text, or off-palette color.

### Lesson 5: the shared table

```text
Use case: stylized-concept
Asset type: production square narrative relief master for a responsive web app

REFERENCE ROLES
- Reference 1 is the exact required style and material anchor. Match its charcoal basalt, museum-grade photorealistic 3D bas-relief depth, rough chiseled surface, graphite midtone readability, orthographic camera, crop-safe composition, and upper-left raking light.
- References 2–4 are broader Corinthian stone, mosaic, and day/night art-direction references only. Do not copy their text, numbers, UI, or layout.

PRIMARY REQUEST
Create the Lesson 5 relief: a shared low ancient table whose negative space resolves naturally into a cross, with multiple places unified around it and no people portraits. Build a broad, low stone or dark timber table in bas-relief, seen straight-on with a very slight elevated reveal of its top. Around it, arrange several simple place settings as restrained physical relief objects: small clay bowls, one shared loaf, and modest cups. The table supports everyone equally. Its central supports and the open gap beneath the tabletop create one unmistakable cross-shaped negative space as a structural consequence, not a cross icon applied on top. The metaphor is freedom restrained by care for another person and everything done for God's glory.

COMPOSITION
Square 1:1, full-bleed charcoal basalt architectural plaque, straight-on orthographic with only a slight top-plane reveal. Main table composition occupies about 62% of image height and is centered with generous crop-safe stone. Ensure the cross-shaped void beneath the table reads clearly at thumbnail size while the table still reads first as a shared table. No separate frame, border, card, floating rectangle, UI panel, room, banquet hall, floor perspective, or landscape. Quiet architectural edge fragments may appear only if they match Reference 1.

STYLE AND MATERIALS
Museum-grade photorealistic 3D bas-relief. Deep readable graphite midtones; rough quarried basalt; dark hewn timber or stone table; chipped edges; credible contact shadows and occlusion. Restrained terracotta clay in bowls/cups and muted limestone in the loaf only. Coherent upper-left raking light. Calm dark atmosphere. Match Reference 1's material depth and visual family exactly.

CONSTRAINTS
No text, letters, numbers, runes, labels, inscriptions, buttons, icons, watermark, logo, people, faces, heads, hands, chairs, crucified figure, decorative cross emblem, extra cross symbols, neon, magical glow, halo, gold, feast excess, wine spill, candles, flowers, ornate border, or flat vector appearance. Avoid impossible table geometry, duplicated vessels, warped cups, floating place settings, or a modern dining table.
```

Negative constraints: table reads before the structural cross void; no applied
cross emblem, people, chairs, feast excess, candles, flowers, warped or
floating tableware, modern furniture, glow, frame, UI, or text.

### Lesson 6: many members, one body

```text
Use case: stylized-concept
Asset type: production relief master for a responsive web application, Lesson 6
Primary request: Create a new square relief plate that matches Reference Image 4 (the L4 basalt vessel plaque) as the exact style, material, lighting, camera, relief depth, tonal range, crop safety, and production-finish anchor. References 1–3 establish the broader tactile Corinthian material world only; do not reproduce their UI or typography.
Scene/backdrop: full-bleed charcoal-black basalt architectural plaque continuous to all four edges, not a separate framed card, with subtle hand-chiseled surface variation and deep readable graphite midtones.
Subject: unequal hand-cut tesserae of different sizes and shapes assembling into one unified human body or torso, while a large sculpted supporting hand rises beneath and gently bears the assembled body. The body must clearly be many unequal pieces becoming one coherent whole; the hand is structural and supportive, not a decorative icon. Include a few restrained fired-terracotta and cool-limestone tessera accents among the charcoal pieces.
Style/medium: museum-grade photorealistic 3D bas-relief, archaeological restoration object, physically credible stone thickness, bevels, grout gaps, contact occlusion, chips, wear, and material weight.
Composition/framing: straight-on orthographic, square 1:1, centered relief occupying approximately 62% of image height, generous crop-safe basalt around the subject, balanced mass similar to the L4 anchor, no detached outer frame or border.
Lighting/mood: coherent upper-left raking light matching the L4 anchor exactly; controlled shadow depth, no crushed-black silhouette, no spotlight, no luminous aura.
Color palette: charcoal basalt and graphite; restrained terracotta seams and sparse cool-limestone tesserae only.
Constraints: produce only the material relief master. No writing or embedded interface content.
Avoid: text, letters, words, numbers, runes, religious symbols, labels, buttons, icons, watermark, logo, UI, neon, glow halo, radial halo, fantasy magic, polished plastic, glossy metal, decorative border, card outline, floating panel, perspective camera, cut-off subject.
```

Negative constraints: the body must be many unequal pieces and the hand must
bear real visual weight; no decorative icon hand, cut-off subject, frame,
perspective, glow, glossy material, UI, symbol, or text.

### Lesson 7: portrait becoming mirror

```text
Use case: stylized-concept
Asset type: production relief master for a responsive web application, Lesson 7
Primary request: Create a new square relief plate that matches Reference Image 4 (the L4 basalt vessel plaque) as the exact style, material, lighting, camera, relief depth, tonal range, crop safety, and production-finish anchor. References 1–3 establish the broader tactile Corinthian material world only; do not reproduce their UI or typography.
Scene/backdrop: full-bleed charcoal-black basalt architectural plaque continuous to all four edges, not a separate framed card, with subtle hand-chiseled surface variation and deep readable graphite midtones.
Subject: an anonymous human portrait emerging from incomplete charcoal-black stone planes. One side remains rough, fragmented and unfinished; the other resolves into a restrained reflective mirror surface built from cool-limestone and dark polished-stone facets, so the portrait appears to become an honest mirror. The face must remain archetypal and anonymous, with no identifiable real person, no mask, no theatrical expression, and no floating mirror frame. Use a few restrained terracotta joins to connect the incomplete planes.
Style/medium: museum-grade photorealistic 3D bas-relief, archaeological restoration object, physically credible carved planes, stone thickness, bevels, seams, contact occlusion, chips, wear, and controlled reflection.
Composition/framing: straight-on orthographic, square 1:1, centered relief occupying approximately 62% of image height, generous crop-safe basalt around the subject, balanced mass similar to the L4 anchor, no detached outer frame or border.
Lighting/mood: coherent upper-left raking light matching the L4 anchor exactly; deep readable graphite midtones; reflective facets remain subtle and physically dark, not chrome; no spotlight or luminous aura.
Color palette: charcoal basalt and graphite, sparse cool-limestone reflection facets, restrained terracotta seams.
Constraints: produce only the material relief master. No writing or embedded interface content.
Avoid: text, letters, words, numbers, runes, religious symbols, labels, buttons, icons, watermark, logo, UI, neon, glow halo, radial halo, fantasy magic, polished chrome, glossy plastic, decorative border, card outline, floating panel, perspective camera, cut-off subject.
```

Negative constraints: anonymous, archetypal face only; no real-person likeness,
mask, theatrical expression, floating mirror, bright chrome, frame, glow,
perspective, cut-off subject, UI, symbol, or text.

### Lesson 8: the open tomb at first light

```text
Use case: stylized-concept
Asset type: production relief master for a responsive web application, Lesson 8
Primary request: Create a new square relief plate that matches Reference Image 4 (the L4 basalt vessel plaque) as the exact style, material, lighting, camera, relief depth, tonal range, crop safety, and production-finish anchor. References 1–3 establish the broader tactile Corinthian material world only; do not reproduce their UI or typography.
Scene/backdrop: full-bleed charcoal-black basalt architectural plaque continuous to all four edges, not a separate framed card, with subtle hand-chiseled surface variation and deep readable graphite midtones.
Subject: a physically carved Corinthian doorway opening into a broken empty rock tomb at first dawn. Two restrained Corinthian architectural supports and a fractured lintel establish the doorway; the tomb opening is unmistakably empty, with a displaced circular burial stone resting to one side and several believable masonry fragments. A narrow warm terracotta-gold dawn source is visible only inside the doorway and tomb opening. The surrounding basalt remains dark and receives only a small amount of reflected warmth. No sun disc, rays, figure, cross, angel, or landscape.
Style/medium: museum-grade photorealistic 3D bas-relief, archaeological restoration object, physically credible architectural stone thickness, carved depth, fractures, contact occlusion, chips, wear, and material weight.
Composition/framing: straight-on orthographic, square 1:1, centered architectural relief occupying approximately 62% of image height, generous crop-safe basalt around the subject, balanced mass similar to the L4 anchor, no detached outer frame or border.
Lighting/mood: coherent upper-left raking light matching the L4 anchor exactly; deep readable graphite midtones. Confine the warm source strictly to the opening with subtle local bounce; no exterior halo, no radial bloom, no glowing outline.
Color palette: charcoal basalt and graphite, sparse cool-limestone edge accents, restrained terracotta warmth inside the opening only.
Constraints: produce only the material relief master. No writing or embedded interface content.
Avoid: text, letters, words, numbers, runes, religious symbols, labels, buttons, icons, watermark, logo, UI, neon, glow halo, radial halo, fantasy magic, fiery explosion, painted sky, decorative border, card outline, floating panel, perspective camera, cut-off subject.
```

Negative constraints: tomb is visibly empty; no figure, angel, cross, sun disc,
rays, landscape, painted sky, fiery light, exterior halo, frame, perspective,
UI, symbols, or text.

### Lesson 9: the tear-marked letter

```text
Use case: stylized-concept
Asset type: production relief master for a responsive web application, Lesson 9
Primary request: Create a new square relief plate that matches Reference Image 4 (the L4 basalt vessel plaque) as the exact style, material, lighting, camera, relief depth, tonal range, crop safety, and production-finish anchor. References 1–3 establish the broader tactile Corinthian material world only; do not reproduce their UI or typography.
Scene/backdrop: full-bleed charcoal-black basalt architectural plaque continuous to all four edges, not a separate framed card, with subtle hand-chiseled surface variation and deep readable graphite midtones.
Subject: a blank ancient papyrus letter partially unrolled and physically mounted as a shallow relief against the basalt. The papyrus has highly legible natural fibers, restrained curled upper and lower edges, several subtle dried tear tracks running vertically through the fibers, and one thick fired-terracotta wax seal pressing the lower overlap. The seal has a simple tactile depression with no emblem, glyph, letter, number, or symbol. The sheet is entirely blank: no ink, handwriting, lines, pseudo-writing, or marks resembling language.
Style/medium: museum-grade photorealistic 3D bas-relief and archaeological conservation object, physically credible papyrus thickness, curled edges, wax thickness, contact occlusion, age, wear, and material weight.
Composition/framing: straight-on orthographic, square 1:1, centered relief occupying approximately 62% of image height, generous crop-safe basalt around the subject, balanced mass similar to the L4 anchor, no detached outer frame or border.
Lighting/mood: coherent upper-left raking light matching the L4 anchor exactly; deep readable graphite midtones; papyrus remains muted cool limestone-beige rather than bright parchment; no luminous aura.
Color palette: charcoal basalt and graphite, muted cool papyrus fiber, restrained terracotta wax seal.
Constraints: produce only the material relief master. The sheet must be visibly and completely blank.
Avoid: text, letters, words, numbers, handwriting, calligraphy, ruled lines, pseudo-writing, runes, seal symbol, religious symbol, labels, buttons, icons, watermark, logo, UI, neon, glow halo, radial halo, fantasy magic, bright white paper, decorative border, card outline, floating panel, perspective camera, cut-off subject.
```

The first candidate did not make the dried tears legible enough. The final
master used this targeted correction:

```text
Use case: precise-object-edit
Asset type: production relief master for Lesson 9
Input images: Image 1 is the exact edit target; Image 2 is the immutable L4 style and lighting anchor.
Primary request: Preserve Image 1's square composition, basalt plaque, blank papyrus scroll, fibers, curled edges, blank terracotta wax seal, camera, crop, lighting, palette, and relief depth. Make only one targeted improvement: add three to five clearly visible but restrained dried tear tracks traveling vertically down the papyrus. Each track should be an irregular translucent mineral-darkened stain absorbed into and subtly spreading along the papyrus fibers, with varied width and broken edges. They must read as dried human tears on paper, not cracks, cuts, writing, ruled lines, or glowing trails.
Constraints: Keep the papyrus completely blank. Keep the wax seal completely blank. Do not alter the background, geometry, subject scale, or lighting.
Avoid: text, letters, numbers, handwriting, pseudo-writing, calligraphy, ruled lines, symbols, seal emblem, watermark, logo, UI, neon, glow, added objects, decorative border.
```

Negative constraints: blank sheet and blank seal are absolute; tear tracks are
absorbed stains, not cracks, cuts, ruled lines, glowing trails, or writing; no
bright paper, frame, UI, or text.

## Shared production prefix for Lessons 10 through 13

The L10 through L13 calls concatenated the following prefix with the matching
lesson request below. The combination is the exact submitted prompt.

```text
Use case: stylized-concept
Asset type: production square relief master for a responsive educational web application
Input image: the supplied L4 image is the exact style, material, lighting, tonal-depth, relief-depth, and photographic-quality anchor only. Create a new subject; do not reproduce its vessel, loose fragments, side columns, or composition.
Scene/backdrop: full-bleed monolithic charcoal-black basalt architectural plaque, unframed and crop-safe, with continuous rough hand-tooled stone extending to every edge.
Style/medium: museum-grade photorealistic 3D bas-relief physically carved and modeled into the plaque, materially convincing rather than illustrative, icon-like, or graphic.
Composition/framing: square 1:1, straight-on orthographic view, centered singular subject occupying about 62 percent of image height, generous quiet basalt on every side, no outer border, no card, no frame, no architectural columns.
Lighting/mood: one coherent upper-left raking museum light, deep readable graphite midtones, restrained contact shadows, contemplative and ancient, not theatrical.
Color palette: charcoal basalt and graphite, with restrained fired-terracotta and cool-limestone accents only where physically integral.
Constraints: all relief geometry must remain crop-safe and readable at small size; realistic stone thickness and joins; clean silhouette.
Avoid: any text, letters, numbers, symbols, labels, inscriptions, buttons, icons, watermark, logo, UI, neon, luminous halo, broad glow, fantasy magic, gold, jewels, coins, decorative frame, border, pedestal, side columns, parchment, polished plastic, cartoon style, painterly style.
```

### Lesson 10: treasure in fragile clay

Append exactly:

```text
Primary request: L10. Create a different hand-thrown fired-clay vessel in low-to-medium relief, not the L4 silhouette. Use a broad asymmetrical belly, short narrow neck, modest flared rim, and one small integrated handle. The vessel silhouette is completely intact with no missing exterior sherds and no loose fragments. One single deep irregular physical fracture travels from the shoulder into the belly, tapering and branching naturally; the opening exposes a restrained warm terracotta inner core and a few embedded pale limestone tesserae that suggest treasure through material, not coins, gems, objects, or light effects. The crack is a genuine recessed opening with ceramic thickness and contact shadow, never a painted line. No second vessel.
```

Negative constraints: must not reuse L4's silhouette; no missing exterior
sherds, loose fragments, second vessel, painted or neon crack, coins, jewels,
gems, literal treasure objects, magical light, frame, UI, or text.

### Lesson 11: sowing

Append exactly:

```text
Primary request: L11. Create one anatomically plausible sculpted human hand in basalt relief, emerging from a simple forearm at upper left and casting a small arc of individual grain seeds downward over exactly three shallow parallel earthen furrows. The hand has five natural fingers with correct joints and no extra digits. A few small young shoots emerge from the three furrows near the lower area. Use restrained cool-limestone highlights on the hand and small fired-terracotta accents in the earth and seeds. The gesture is calm, generous, and physically credible. No second hand, no tools, no container, no landscape horizon.
```

Negative constraints: exactly one anatomically plausible five-fingered hand and
exactly three furrows; no second hand, extra digit, tool, bowl, container,
landscape, magical seed trail, frame, UI, or text.

### Lesson 12: dismantled stronghold

Append exactly:

```text
Primary request: L12. Create one rough ancient ashlar fortress in architectural bas-relief. Its upper walls and one squat tower are visibly dismantled course by course, with a small number of heavy blocks settled nearby, while the remaining lower masonry descends to one continuous exposed bedrock foundation. A single plain dark arched opening remains in the bedrock/base and reads clearly as refuge. Preserve a strong intact overall silhouette despite the dismantled upper courses. Use restrained cool-limestone faces on selected ashlar blocks and minimal fired-terracotta dust in deep joints. No people, no flags, no crest, no weapons, no city skyline.
```

Negative constraints: one fortress, one squat tower, one refuge opening, one
continuous bedrock base; no total ruin, people, flag, crest, weapon, skyline,
fantasy castle, frame, UI, or text.

### Lesson 13: thirteen paths to one center

The first candidate used the following request with the shared prefix:

```text
Primary request: L13. Create exactly thirteen distinct shallow incised paths in basalt, each beginning independently around the outer field and converging toward one plain circular shared gathering stone at the center. The thirteen paths are individually countable, organically varied, and must not merge until they reach the central gathering stone. Suggest human community through subtle paired footprint-like depressions or abstract person-shaped terminals at the outer starts, but do not depict faces. The center is a simple low round communion/gathering surface with no object, cup, bread, cross, sunburst, star, emblem, or inscription. Use restrained cool-limestone wear along selected path edges and a small fired-terracotta seam where all thirteen paths meet. The convergence must feel communal, not diagrammatic or occult.
```

Because some terminals read as animal tracks, the final master used this exact
correction with L4 as Image 1 and the first L13 candidate as Image 2:

```text
Use case: precise-object-edit
Asset type: production square relief master for a responsive educational web application
Input images: Image 1 is the exact L4 material, lighting, tonal-depth, and photographic-quality style anchor. Image 2 is the L13 edit target.
Primary request: Preserve Image 2's full-bleed charcoal basalt plaque, straight-on orthographic view, upper-left raking light, deep graphite midtones, crop-safe composition, plain central gathering stone, and exactly thirteen individually countable incised paths. Change only the thirteen outer path terminals: remove every animal paw print, toe shape, footprint, handprint, flower-like mark, and biological track. Replace each terminal with one restrained abstract human-presence marker carved in low relief: a simple smooth vertical pebble-like standing form with a small round head and tapered body, no face and no limbs. There must be exactly thirteen markers, one at the independent outer start of each of the exactly thirteen paths. Keep paths separate until the central stone.
Composition: communal convergence, not radial emblem; subtly vary the paths and markers so it does not resemble a sun, star, wheel, occult diagram, or logo.
Constraints: no text, letters, numbers, labels, inscriptions, border, frame, columns, buttons, icons, watermark, religious symbol, cross, cup, bread, sunburst, star, halo, neon, broad glow, gold, animals, paws, footprints, extra paths, merged outer paths, or UI. Retain the restrained cool-limestone wear and small fired-terracotta seam only where paths meet.
```

Negative constraints: exactly thirteen individually countable paths and
thirteen abstract human-presence markers; paths remain separate to the center;
no animal, paw, footprint, handprint, face, limb, sun, star, wheel, occult
diagram, logo, religious emblem, cup, bread, cross, extra path, premature
merge, frame, UI, or text.

## Approval checklist for every generated candidate

- The 320px center crop reads immediately without a caption.
- The subject and all count-sensitive details match the lesson brief.
- The object is materially embedded in one full-bleed basalt plaque.
- Upper-left raking light and contact shadows match L4.
- Terracotta is physically integral and never a general-purpose glow.
- The composition contains no separate card, frame, border, or UI surface.
- No text-like marks appear when inspected at 200%.
- Anatomy, joins, openings, thickness, and occlusion remain physically credible.
- Essential geometry has generous crop-safe clearance.
- The image can sit behind live accessible HTML without competing with it.
