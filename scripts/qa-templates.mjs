import { LESSONS } from "/Users/Administrator/Downloads/escuela-sabatica/src/content/lessons.js";

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

for (const L of LESSONS) {
  const slots = {}, extra = {};
  L.stations.forEach(st => {
    slots[st.slot] = realValue(st.module);
    const m = st.module;
    if (m.personExtraKey) extra[m.personExtraKey] = "Marta";
    if (m.commit?.extraKey) extra[m.commit.extraKey] = realValue(m);
    if (m.allowCustom?.extraKey) extra[m.allowCustom.extraKey] = realValue(m);
    if (m.stepExtraKey) extra[m.stepExtraKey] = m.stepOptions?.[0] || "algo";
    if (m.promiseExtraKey) extra[m.promiseExtraKey] = m.promiseOptions?.[0]?.t || "algo";
  });
  const state = { userName: "Néstor", slots, extra };
  const out = { pattern: L.pattern(state), ...L.outputs(state) };

  for (const [k,v] of Object.entries(out)) {
    if (/\{|[—–]|\bundefined\b/.test(v)) x(L.id, `${k}: leak :: ${v.slice(0,90)}`);
    // grammar smells: doubled spaces, ", ," , " ." , doubled prepositions
    if (/\s{2,}|,\s*,|\s[.,;:]|(\b(de|en|a|con|que|y)\s+\2\b)/i.test(v)) x(L.id, `${k}: rough :: ${v.slice(0,90)}`);
  }
  if (L.number === 4) { console.log("\n--- l4 pattern with real answers ---\n" + out.pattern + "\n"); }
}
console.log(bad ? `${bad} problems` : "ALL 13 render clean with real answers");
process.exit(bad?1:0);
