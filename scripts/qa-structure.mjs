import { LESSONS, currentLesson } from "../src/content/lessons.js";
import { LESSON_MANIFEST_EN } from "../src/content/lessonManifest.generated.js";
import { loadLesson } from "../src/content/loadLesson.js";
import { deriveProfile, personalClosing } from "../src/engine/profile.js";
import fs from "node:fs";
const _icoSrc = fs.readFileSync(new URL("../src/components/Icon.jsx", import.meta.url), "utf8");
const _mapBody = _icoSrc.slice(_icoSrc.indexOf("const MAP = {"), _icoSrc.indexOf("};", _icoSrc.indexOf("const MAP = {")));
const ICON_NAMES = [..._mapBody.matchAll(/([a-zA-Z]+)\s*:\s*[A-Z][A-Za-z]*/g)].map(m=>m[1]);

const ICONS = new Set(ICON_NAMES);
const LEAK = /\{|\\n|\bundefined\b|[—–]/;
let bad = 0;
const x = (id, m) => { console.log(`  x [${id}] ${m}`); bad++; };

const englishLessons = LESSON_MANIFEST_EN.length === 13
  ? await Promise.all(LESSON_MANIFEST_EN.map((lesson) => loadLesson(lesson.id, "en")))
  : [];
const editions = [
  { locale: "es", lessons: LESSONS },
  ...(englishLessons.length ? [{ locale: "en", lessons: englishLessons }] : []),
];

for (const edition of editions) {
console.log(`${edition.locale} lessons: ${edition.lessons.length}`);
for (const L of edition.lessons) {
  const lessonId = `${edition.locale}:${L.id}`;
  if (!L.complete) x(lessonId, "not complete");
  if (L.quarter !== "2026-Q3") x(lessonId, `quarter=${L.quarter}`);
  if (L.slots.length !== 8) x(lessonId, `slots=${L.slots.length}`);
  L.slots.forEach(s => { if (!ICONS.has(s.icon)) x(lessonId, `bad icon ${s.icon}`); });
  if (!["mosaico","cruz","barro","carta","alba","retrato","siembra","muro"].includes(L.scene.motif)) x(lessonId, `bad motif ${L.scene.motif}`);

  // every station renders a module the host knows
  const known = new Set(["choiceInsight","skillThenCommit","pickReveal","perspectiveFlip","stairs","anchorChain","commitDuo"]);
  L.stations.forEach(st => {
    if (!known.has(st.module.type)) x(lessonId, `unknown module ${st.module.type}`);
    if (st.module.type === "anchorChain" && !Array.isArray(st.module.chain)) x(lessonId, `anchorChain ${st.id} has no chain[]`);
    if (st.module.type === "stairs") {
      ["climbPrompt","leavePrompt","leaveOptions","promisePrompt","promiseOptions","promiseExtraKey","verse"].forEach(k=>{
        if (st.module[k] === undefined) x(lessonId, `stairs ${st.id} missing ${k}`);
      });
      if (st.module.allowCustom && !st.module.allowCustom.extraKey) x(lessonId, `stairs ${st.id} allowCustom lacks extraKey`);
    }
  });

  // outputs render clean, filled and empty
  const slots = {}; L.stations.forEach(s => slots[s.slot] = "(valor)");
  const ex = {};
  L.stations.forEach(st => { const m = st.module;
    if (m.personExtraKey) ex[m.personExtraKey] = "María";
    if (m.commit?.extraKey) ex[m.commit.extraKey] = "(c)";
    if (m.allowCustom?.extraKey) ex[m.allowCustom.extraKey] = "(a)";
    if (m.stepExtraKey) ex[m.stepExtraKey] = "(s)";
    if (m.promiseExtraKey) ex[m.promiseExtraKey] = "(p)";
  });
  for (const [tag, extra] of [["empty",{}],["filled",ex]]) {
    const st = { userName: "Néstor", slots, extra };
    const o = L.outputs(st);
    for (const [k,v] of [["pattern", L.pattern(st)], ...Object.entries(o)]) {
      if (!v) { x(lessonId, `${tag}:${k} empty`); continue; }
      if (LEAK.test(v)) x(lessonId, `${tag}:${k} LEAK ${v.match(LEAK)[0]} :: ${v.slice(0,80)}`);
    }
  }
  // branching closing works off this lesson's tags
  const tags = {};
  L.stations.forEach(st => { const o = st.module.options?.[0]; if (o?.tags) tags[st.id] = o.tags; });
  if (edition.locale === "es") {
    const c = personalClosing(deriveProfile(tags), "Néstor");
    if (!c.blessing || LEAK.test(c.blessing)) x(lessonId, `blessing leak: ${c.blessing}`);
  }
}
}
const today = currentLesson(null, "2026-07-25");
console.log(`today (2026-07-25) -> ${today.id} "${today.title}" motif=${today.scene.motif}`);
console.log(bad ? `\n${bad} PROBLEMS` : "\nALL 13 PASS");
process.exit(bad?1:0);
