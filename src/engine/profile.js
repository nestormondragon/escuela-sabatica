import { firstName, lcFirst } from "../lib/name.js";

/* =================================================================
   profile.js — the branching personalization engine.

   Every `choiceInsight` option carries small, authored tags in four
   namespaces:
     react:*    the first emotional reaction the reader admitted to
     theme:*    the spiritual thread the lesson surfaced for them
     posture:*  the stance of their walk this week
     tone:*     the voice they kept choosing (tender / raw / resolute)

   We never branch the *flow* (that would mean combinatorial authoring).
   Instead we read the bag of tags the reader accumulated, find the
   dominant value per namespace, and compose a closing blessing from a
   small bank of reusable phrases. react × theme × tone alone yields
   ~180 distinct closings from ~25 authored lines — so the ending feels
   written for this reader, not assembled.

   Everything degrades gracefully: no tags (e.g. a lesson that hasn't
   been tagged yet, or pre-existing saved state) → one warm universal
   blessing. A missing dimension simply drops its clause.
   ================================================================= */

/* ---- derive the reader's profile from accumulated per-slot tags ---- */
export function deriveProfile(slotTags) {
  const counts = { react: {}, theme: {}, posture: {}, tone: {} };
  const order = { react: [], theme: [], posture: [], tone: [] }; // first-seen, for a stable tiebreak
  let total = 0;

  Object.values(slotTags || {}).forEach((tags) => {
    (tags || []).forEach((raw) => {
      const i = String(raw).indexOf(":");
      if (i < 0) return;
      const ns = raw.slice(0, i);
      const val = raw.slice(i + 1);
      if (!counts[ns] || !val) return;
      if (counts[ns][val] === undefined) {
        counts[ns][val] = 0;
        order[ns].push(val);
      }
      counts[ns][val] += 1;
      total += 1;
    });
  });

  const dominant = (ns) => {
    let best = null;
    let bestN = 0;
    order[ns].forEach((val) => {
      if (counts[ns][val] > bestN) {
        bestN = counts[ns][val];
        best = val;
      }
    });
    return best;
  };

  return {
    react: dominant("react"),
    theme: dominant("theme"),
    posture: dominant("posture"),
    tone: dominant("tone"),
    counts,
    total,
  };
}

/* ---- phrase banks (Spanish, warm, theologically grounded) ---- */

// where they began — named with compassion, never judgment. Lowercase
// clauses so they read cleanly after a vocative ("Néstor, llegaste…").
const REACT = {
  withdraw: "llegaste con ganas de apartarte, y aun así te quedaste",
  apathy: "empezaste sin sentir gran cosa, y de todos modos diste cada paso",
  pride: "trajiste tus defensas puestas, y una a una las fuiste bajando",
  control: "querías sostenerlo todo con tus propias manos, y hoy soltaste un poco",
  doubt: "viniste cargando preguntas, y descubriste que preguntar también es buscar a Dios",
  fear: "llegaste con miedo, y el miedo no tuvo la última palabra",
};

// the spiritual gift of the week — full, standalone sentences.
const THEME = {
  faith: "Dios está afirmando tu fe justo donde el camino todavía no se ve.",
  relationship: "A Dios no le importa tu desempeño; le importa caminar contigo.",
  self: "Te miraste con más honestidad, y esa verdad es donde la gracia empieza a trabajar.",
  word: "Su Palabra dejó de ser tinta y se volvió lámpara para tus pasos.",
  humility: "Tu disposición a inclinarte es, para el cielo, una forma de grandeza.",
  prayer: "Aprendiste que orar no es hallar las palabras exactas, sino abrir la puerta.",
  grace: "No tuviste que ganarte nada: la gracia ya estaba esperándote antes de empezar.",
  hope: "Hay un mañana que Dios sostiene por ti, aunque hoy todavía pese.",
  sin: "Nombraste lo que duele, y nombrarlo delante de Dios ya es el principio de la libertad.",
  service: "Lo que recibiste no se queda contigo; está hecho para desbordarse hacia otros.",
  // added for 1 y 2 Corintios
  unity: "Elegiste ser quien tiende el puente, y eso siempre cuesta más que tener razón.",
  cross: "La cruz dejó de ser un adorno y volvió a ser el lugar donde se pagó tu deuda.",
  love: "El amor que mediste esta semana no es un sentimiento: son verbos, y ya empezaste a conjugarlos.",
  resurrection: "Si él resucitó, entonces lo que perdiste no está dicho para siempre.",
  mission: "Donde te toca vivir no es un accidente: allí tiene Dios mucho pueblo.",
  generosity: "Abriste la mano, y descubriste que dar se parece más a él que a un sacrificio.",
  truth: "Aprendiste a distinguir lo que impresiona de lo que es verdad, y esa es una defensa que te va a durar.",
};

// the closing breath — shaped by the voice they leaned into. Takes an
// optional name so the reader's name lands here when it wasn't used earlier.
const TONE = {
  tender: (n) => `Ve en paz${n ? `, ${n}` : ""}: lo que comenzó esta semana, Dios lo termina.`,
  raw: (n) => `${n ? `${n}, no` : "No"} tienes que fingir nada; Dios te recibió tal como llegaste, y no te deja igual.`,
  resolute: (n) => `${n ? `${n}, avanza` : "Avanza"} firme: lo que decidiste hoy, el cielo lo respalda.`,
};

// a short line for the completion ceremony, flavored by tone.
const CEREMONY = {
  tender: (n) => (n ? `${n}, lo lograste.` : "Lo lograste."),
  raw: (n) => (n ? `${n}, llegaste hasta aquí.` : "Llegaste hasta aquí."),
  resolute: (n) => (n ? `${n}, lo terminaste.` : "Lo terminaste."),
};

// the movement of their walk — completes "Esta semana caminaste …".
const POSTURE = {
  avoidant: "esquivando, hasta que te volviste hacia Él",
  seeking: "buscando",
  clinging: "aferrándote a Él",
  proud: "bajando la guardia",
  surrendering: "soltando el control",
  humble: "con el corazón abierto",
};

/* ---- compose the personalized closing ---- */
export function personalClosing(profile, rawName) {
  const name = firstName(rawName);

  // no signal → one warm, universal blessing (never "undefined", never blank)
  if (!profile || !profile.total) {
    return {
      ceremony: name ? `${name}, lo lograste.` : "Lo lograste.",
      pathLine: "",
      blessing:
        `${name ? `${name}, llegaste` : "Llegaste"} hasta el final, y eso ya dice algo de tu corazón. ` +
        "Lo que descubriste esta semana, guárdalo: Dios sigue obrando en ti mucho después de la última pieza.",
    };
  }

  const toneKey = profile.tone && TONE[profile.tone] ? profile.tone : "tender";
  const react = REACT[profile.react];
  const theme = THEME[profile.theme];
  const posture = POSTURE[profile.posture];

  const out = [];
  let nameUsed = false;

  if (react) {
    out.push(`${name ? `${name}, ` : ""}${react}.`);
    nameUsed = !!name;
  }
  if (theme) {
    // if the name hasn't landed yet, lead the theme with a vocative —
    // but keep proper nouns ("Dios…") capitalized.
    if (!nameUsed && name) {
      const startsProper = /^[A-ZÁÉÍÓÚÑ]/.test(theme.charAt(0)) && /^(Dios|Su|Él|Cristo|Jesús)/.test(theme);
      out.push(`${name}, ${startsProper ? theme : lcFirst(theme)}`);
      nameUsed = true;
    } else {
      out.push(theme);
    }
  }
  out.push(TONE[toneKey](nameUsed ? "" : name));

  return {
    ceremony: CEREMONY[toneKey](name),
    pathLine: posture ? `Esta semana caminaste ${posture}.` : "",
    blessing: out.join(" "),
  };
}
