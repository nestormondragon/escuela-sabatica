# Q3 2026 lesson authoring brief — Escuela Sabática (Spanish)

You are writing ONE lesson as pure data for an existing React engine. Output is a JSON object.

## Source
Read the lesson text at the path given in your task. It is the official Adventist quarterly
(1 & 2 Corinthians, Q3 2026). **Do NOT copy the PDF prose.** Rewrite and adapt it into warm,
vivid, second-person Spanish for a mobile devotional experience. Preserve the theology exactly
(Seventh-day Adventist); change the delivery completely.

## Quarter concept
The quarter is Paul's correspondence with a fractured church in Corinth. The visual metaphor
is a MOSAIC: fragments becoming one image (1 Cor 1:10, "que no haya entre ustedes divisiones").
The palette metaphor is CLAY (2 Cor 4:7, "tesoro en vasos de barro"). Every lesson has the
reader assemble a personal artifact, piece by piece, from their own answers.

## HARD COPY RULES (violations are failures)
1. **ZERO em-dashes (—) and zero en-dashes (–) anywhere.** Not in prose, not in quotes, not in
   attributions, not in labels. Use a period, a comma, a colon, parentheses, or restructure.
   For verse attributions in `encourage`, use the format: `«texto» (Ref. 1:2)` with parentheses.
2. The middle dot `·` is allowed ONLY in `day`, `tag`, and `stageLabels` fields, max one per string.
3. No generic AI Spanish. No filler ("Es importante recordar que…", "En este mundo tan acelerado…").
   Write like a thoughtful pastor who knows the reader is tired and honest.
4. Use `usted`-free, warm `tú` voice throughout.
5. Scripture quotes use « » guillemets and are accurate to Reina-Valera / NVI wording.
6. Never invent statistics or fake precision.

## Personalization tokens
- `{name}` resolves to the reader's first name. Use it in `promise` (once), in EVERY station's
  `cue` (once, woven naturally as a Spanish vocative, varying position), and in `outAliento` and
  `patternTemplate` (once each). Never twice in one string.
- `{slot:ID}` inserts the reader's saved answer for that slot. `{slot:ID|lower}` lowercases the
  first letter for mid-sentence use. `{slot:ID|or:texto}` supplies a fallback when empty.
- `{verse}` and `{verseRef}` insert the memory verse.
- Only reference slot IDs that exist in your `slots` array.

## Required JSON shape
Match this exactly. See /tmp/SCHEMA_EXAMPLE_l1.json for a complete working example.

```
{
  "number": <int>, "slug": "<kebab-slug>", "title": "<Título Corto>",
  "subtitle": "<una pregunta o frase que engancha>",
  "kitName": "<given in your task>", "artifactNoun": "<sustantivo, ej. mosaico>",
  "motif": "<given in your task>",
  "stages": [5 short ids], "stageLabels": [5 strings, each "Estado · matiz"],
  "verseRef": "<given>", "verseText": "<given, exact>",
  "promise": "En unos minutos vas a ... {name} ...",
  "ui": { "start","emptyKit","building","buildingHint","lastPiece","patternLabel",
          "doneTitle","back","kitName" },
  "slots":    [8 x {"id","n","label","teaser","icon"}],
  "stations": [8 x {"id","day","tag","title","story","cue","module"}],
  "encourage": [6 x "«verso» (Ref)"],
  "discussion": [4 x "pregunta para la clase"],
  "facilitator": [8 x {"stationId","apertura","seguimiento","ilustracion","transicion","actividad"}],
  "patternTemplate": "...", "outOracion": "...", "outAliento": "...",
  "outAccion24": "...", "outPregunta": "...", "outTarjeta": "...\nVersículo: «{verse}» ({verseRef})."
}
```

- `slots[i].id` MUST equal `stations[i].id` (same order, 8 pairs).
- `slots[i].icon` must be one of: `cloud,sun,moon,star,anchor,flame,book,heart,shield,key,door,
  seed,leaf,mountain,path,eye,hand,crown,gift,scroll,cup,bread,water,cross,people,voice,clock,map`.
- `stages` has exactly 5 ids; `stageLabels` exactly 5 matching labels (dark/incomplete to whole/lit).

## Station modules (use a VARIETY, minimum 4 distinct types across the 8 stations)
- `choiceInsight` — pick one option, get a tailored insight. Use 3 to 4 times per lesson.
  `{ "type":"choiceInsight","privacy":<bool>,"prompt","hint","saveLabel","seedSub",
     "closing":<optional>, "options":[5-8 x {"id","label","insight","tags":[...]}] }`
- `pickReveal` — tap statements to reveal meaning, keep one.
  `{ "type":"pickReveal","saveLabel","seedSub","prompt","hint","chooseLabel","closing",
     "allowCustom":{"label","placeholder","extraKey"}, "items":[4 x {"t","ref","meaning"}] }`
- `perspectiveFlip` — flip cards from "what you see" to "what God sees", then write encouragement.
  `{ "type":"perspectiveFlip","saveLabel","seedSub","prompt","hint",
     "pairs":[4 x {"see","sees"}],"chooseLabel","teach",
     "commit":{"prompt","hint","placeholder","extraKey"} }`
- `skillThenCommit` — a 6-round sorting drill, then a commitment.
  `{ "type":"skillThenCommit","saveLabel","seedSub",
     "skill":{"prompt","hint","badge","cats":[2 strings],
              "rounds":[6 x {"t","a":0|1,"fb"}],"summary"},
     "commit":{"prompt","hint","placeholder","extraKey","options":[5 strings]} }`
- `stairs` — climb steps, then leave something at the door, then a promise.
  `{ "type":"stairs","saveLabel","seedSub","steps":[4 x {"t","fb"}],
     "leavePrompt","leaveHint","leaveOptions":[5],"allowCustom":{"placeholder"},
     "prompt","hint","options":[5],"allowCustom2":{"placeholder","extraKey"} }`
- `anchorChain` — forge links, then hold to seal a hope.
  `{ "type":"anchorChain","saveLabel","seedSub","links":[4 x {"t","fb"}],
     "prompt","hint","options":[5],"allowCustom":{"placeholder","extraKey"} }`
- `commitDuo` — one concrete step plus one person to involve.
  `{ "type":"commitDuo","saveLabel","seedSub","stepPrompt","stepHint","stepOptions":[5],
     "stepPlaceholder","stepExtraKey","personPrompt","personHint","personPlaceholder",
     "personExtraKey" }`

The LAST station (index 8) should be `commitDuo` so the lesson ends in a concrete step.

## Tags (required on EVERY choiceInsight option)
Give each option 2 to 3 tags drawn ONLY from this vocabulary. They drive a branching closing blessing.
- `react:` withdraw, apathy, pride, control, doubt, fear
- `theme:` faith, relationship, self, word, humility, prayer, grace, hope, sin, service,
           unity, cross, love, resurrection, mission, generosity, truth
- `posture:` avoidant, seeking, clinging, proud, surrendering, humble
- `tone:` tender, raw, resolute

Spread tags so different reader paths produce genuinely different profiles. Do not give every
option the same tags.

## Output
Return ONLY the JSON object. No markdown fences, no commentary, no prose before or after.
It must parse with JSON.parse and be complete (all 8 slots, all 8 stations, all fields).
