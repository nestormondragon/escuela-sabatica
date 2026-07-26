import { LESSONS } from "../src/content/lessons.js";
import { LESSON_MANIFEST_EN } from "../src/content/lessonManifest.generated.js";
import { loadLesson } from "../src/content/loadLesson.js";

/* Render every lesson's outputs using the reader's REAL possible answers,
   not placeholders, so template grammar is actually exercised. */
let bad = 0;
const x = (id,m)=>{console.log(`  x [${id}] ${m}`);bad++;};

function realValue(mod) {
  if (mod.options?.length && mod.options[0].label) return mod.options[0].label;   // choiceInsight
  if (mod.items?.length) return mod.items[0].t;                                    // pickReveal
  if (mod.pairs?.length) return mod.pairs[0].sees;                                 // perspectiveFlip
  if (mod.commit?.options?.length) return mod.commit.options[0];                   // skillThenCommit
  if (mod.stepOptions?.length) return mod.stepOptions[0];                          // commitDuo
  if (mod.leaveOptions?.length) return mod.leaveOptions[0];                        // stairs
  if (mod.options?.length) return mod.options[0];                                  // anchorChain
  return "algo";
}

const englishLessons = LESSON_MANIFEST_EN.length === 13
  ? await Promise.all(LESSON_MANIFEST_EN.map((lesson) => loadLesson(lesson.id, "en")))
  : [];
const editions = [
  { locale: "es", lessons: LESSONS, name: "Néstor", person: "Marta" },
  ...(englishLessons.length
    ? [{ locale: "en", lessons: englishLessons, name: "Alex", person: "Martha" }]
    : []),
];

for (const edition of editions) {
for (const L of edition.lessons) {
  const lessonId = `${edition.locale}:${L.id}`;
  const slots = {}, extra = {};
  L.stations.forEach(st => {
    slots[st.slot] = realValue(st.module);
    const m = st.module;
    if (m.personExtraKey) extra[m.personExtraKey] = edition.person;
    if (m.commit?.extraKey) {
      extra[m.commit.extraKey] =
        edition.locale === "en"
          ? "admitting that I was wrong"
          : "admitir que me equivoqué";
    }
    if (m.allowCustom?.extraKey) extra[m.allowCustom.extraKey] = realValue(m);
    if (m.stepExtraKey) extra[m.stepExtraKey] = m.stepOptions?.[0] || "algo";
    if (m.promiseExtraKey) extra[m.promiseExtraKey] = m.promiseOptions?.[0]?.t || "algo";
  });
  const state = { userName: edition.name, slots, extra };
  const out = { pattern: L.pattern(state), ...L.outputs(state) };

  for (const [k,v] of Object.entries(out)) {
    if (/\{|[—–]|\bundefined\b/.test(v)) x(lessonId, `${k}: leak :: ${v.slice(0,90)}`);
    // grammar smells: doubled spaces, ", ," , " ." , doubled prepositions
    if (/\s{2,}|,\s*,|\s[.,;:]|(\b(de|en|a|con|que|y|to|of|in|with|and)\s+\2\b)/i.test(v)) {
      x(lessonId, `${k}: rough :: ${v.slice(0,90)}`);
    }
  }
  if (L.number === 4) {
    console.log(`\n--- ${edition.locale}:l4 pattern with real answers ---\n${out.pattern}\n`);
  }
}
}
console.log(bad ? `${bad} problems` : "ALL EDITIONS render clean with real answers");
process.exit(bad?1:0);
