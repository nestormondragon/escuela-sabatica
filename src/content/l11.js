/* =================================================================
   LECCIÓN 11 · CONTRATIEMPOS · para el 13 de junio de 2026
   El artefacto: "Mi Ancla" — cómo me sostengo cuando llega la tormenta.
   Romanos 5:3-5 · la esperanza no defrauda.

   Cada estación corresponde a un día de la lección y llena un
   casillero del ancla. La escena central (tormenta → amanecer) se
   transforma a medida que el lector avanza.
   ================================================================= */

// lowercase only the first character — keeps proper nouns ("Dios", "Palabra")
// intact when a choice phrase is dropped mid-sentence.
function lcFirst(str) {
  const s = String(str || "");
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export const l11 = {
  id: "l11",
  number: 11,
  quarter: "2026-Q2",
  slug: "contratiempos",

  weekStart: "2026-06-06", // sábado de introducción
  forDate: "2026-06-13", // sábado de cierre ("Para el…")

  title: "Contratiempos",
  subtitle: "Cuando llega la tormenta, ¿miras hacia arriba?",
  kitName: "Mi Ancla",
  artifact: { noun: "ancla", verb: "forjar", possessive: "tu ancla" },
  ui: {
    start: "Empezar a forjar mi ancla",
    emptyKit: "Tu ancla",
    building: "Cada elección forja una pieza",
    buildingHint: "Toca la pieza que brilla. Verás la tormenta calmarse hasta el amanecer.",
    lastPiece: "Falta una pieza",
    patternLabel: "Tu patrón en la tormenta",
    doneTitle: "Tu ancla está completa",
    doneSub: "La forjaste tú, con Dios. Ábrela, guárdala, compártela.",
    open: "Abrir mi ancla",
    back: "Volver a mi ancla",
  },

  centerpiece: "storm",
  scene: {
    motif: "boat",
    shader: {
      sunX: 0.72, hasSea: true, lightning: true,
      stormTop: [0.027, 0.043, 0.078], stormBot: [0.086, 0.141, 0.231],
      dawnTop: [0.227, 0.290, 0.470], dawnBot: [0.941, 0.760, 0.466],
      sun: [1.0, 0.85, 0.55],
    },
  },
  stages: ["tormenta", "mirar", "ancla", "calma", "amanecer"],
  stageLabel: {
    tormenta: "En la tormenta",
    mirar: "Mirando hacia arriba",
    ancla: "El ancla muerde",
    calma: "El mar se calma",
    amanecer: "Amanece · la esperanza no defrauda",
  },

  verse: {
    ref: "Romanos 5:3-5",
    text:
      "Nos alegramos aun en las tribulaciones, al saber que la tribulación produce paciencia; y la paciencia, carácter probado; y el carácter, esperanza. Y la esperanza no defrauda, porque el amor de Dios ha sido derramado en nuestro corazón.",
  },

  promise:
    "En unos minutos vas a forjar tu Ancla: nombrarás la tormenta que enfrentas, descubrirás tu primera reacción, aprenderás a acercarte con fe, elegirás la declaración que te sostiene, verás lo que Jesús ve, soltarás lo que cargas, y encontrarás la esperanza que no defrauda.",

  /* ---- los 8 casilleros, visibles desde el inicio ---- */
  slots: [
    { id: "tormenta",   n: 1, label: "Mi tormenta",            teaser: "Lo que hoy amenaza mi calma…",        icon: "cloud",   station: "tormenta" },
    { id: "reaccion",   n: 2, label: "Mi primera reacción",    teaser: "Cuando golpea, suelo…",               icon: "wave",    station: "reaccion" },
    { id: "paso_fe",    n: 3, label: "Mi paso de fe",          teaser: "Cómo me acerco a él a propósito…",    icon: "hand",    station: "paso_fe" },
    { id: "declaracion",n: 4, label: "Mi declaración",         teaser: "Lo que sostengo cuando no lo veo…",   icon: "rock",    station: "declaracion" },
    { id: "historia",   n: 5, label: "La historia más grande", teaser: "Lo que Jesús ve que yo no…",          icon: "path",    station: "historia" },
    { id: "dejar",      n: 6, label: "Lo que dejo en la puerta",teaser: "Lo que suelto para poder subir…",    icon: "release", station: "dejar" },
    { id: "esperanza",  n: 7, label: "Mi esperanza",           teaser: "La esperanza que no defrauda…",       icon: "sunrise", station: "esperanza" },
    { id: "paso",       n: 8, label: "Mi paso de la semana",   teaser: "Un paso concreto · a quién animo…",   icon: "footstep",station: "paso" },
  ],

  /* ---- las estaciones (una por día) ---- */
  stations: [
    /* 1 · SÁBADO — la jovencita bajo la lluvia */
    {
      id: "tormenta",
      slot: "tormenta",
      day: "Sábado · La jovencita bajo la lluvia",
      tag: "Casillero 1 · Mi tormenta",
      title: "¿Bajas la cabeza, o miras hacia arriba?",
      story:
        "Una jovencita corría a casa cuando se desató la tormenta. Su padre, al cubrirla, le preguntó: «¿Por qué con cada relámpago dejabas de correr, mirabas hacia arriba y sonreías?». «Me detenía para mirar hacia arriba —respondió— porque Dios me estaba fotografiando».",
      module: {
        type: "choiceInsight",
        privacy: true,
        prompt: "¿Qué tormenta amenaza hoy tu calma?",
        hint: "Elige la más real ahora mismo",
        saveLabel: "Guardar en mi ancla",
        seedSub: "tu tormenta",
        options: [
          { id: "salud",     label: "Mi salud (o la de alguien)", insight: "Como la mujer enferma de Marcos 5, el cuerpo cansa la fe. Pero Jesús todavía distingue el toque de quien se acerca de verdad." },
          { id: "dinero",    label: "Dificultades económicas",    insight: "La escasez grita fuerte. Aun así, el que viste los lirios conoce exactamente lo que te falta y lo que necesitas." },
          { id: "relacion",  label: "Una relación rota",          insight: "Pocas tormentas duelen como la del corazón. Jesús no minimiza tu dolor: entra en la barca contigo." },
          { id: "perdida",   label: "Una pérdida · un duelo",     insight: "Job conoció esa noche. Llorar no es falta de fe; es el lenguaje del amor herido, y Dios lo entiende." },
          { id: "fe",        label: "Dudas en mi fe",             insight: "«¡Creo! ¡Ayuda mi poca fe!» (Mar. 9:24) es una de las oraciones más honestas de la Biblia — y Dios la respondió." },
          { id: "trabajo",   label: "Presión en el trabajo",      insight: "Lo urgente puede ahogar lo importante. Pero ninguna agenda es más grande que el cuidado de tu Padre." },
          { id: "familia",   label: "Mi familia",                 insight: "Cargas a los que amas y no puedes arreglarlo todo. Tampoco se te pide: se te pide confiárselos a Aquel que sí puede." },
          { id: "futuro",    label: "Lo incierto · el futuro",    insight: "La niebla del mañana asusta. Pero «él conoce el camino que tomo» (Job 23:10), aunque tú aún no lo veas." },
        ],
      },
    },

    /* 2 · DOMINGO — Marcos 4, la tormenta calmada */
    {
      id: "reaccion",
      slot: "reaccion",
      day: "Domingo · Las tormentas de la vida",
      tag: "Casillero 2 · Mi primera reacción",
      title: "«¿No te importa?»",
      story:
        "En la peor tormenta de sus vidas, Jesús dormía. Los discípulos —algunos pescadores expertos— lo despertaron a gritos: «¿No te importa que perezcamos?» (Mar. 4:38). Cuestionaban su amor. Con demasiada frecuencia, esa también es nuestra respuesta.",
      module: {
        type: "choiceInsight",
        privacy: false,
        prompt: "Cuando golpea la tormenta, mi primera reacción suele ser…",
        hint: "Elige la más sincera",
        saveLabel: "Guardar en mi ancla",
        seedSub: "tu reacción",
        closing:
          "Es en las tormentas donde Dios obra los mayores milagros. Él está en tu barca — y, a diferencia de ti, puede calmarla. «Por fe andamos, no por vista» (2 Cor. 5:7).",
        options: [
          { id: "duda",     label: "Dudar que a Dios le importe", insight: "Igual que los discípulos. Pero él no estaba ausente: estaba en la barca. Su silencio no es indiferencia." },
          { id: "miedo",    label: "Aterrarme · paralizarme",      insight: "«¿Por qué tenéis miedo? ¿Cómo no tenéis fe?» (Mar. 4:40). El miedo no te descalifica; es la invitación a despertar a Cristo." },
          { id: "control",  label: "Intentar controlarlo todo",    insight: "Los discípulos eran marineros expertos y aun así no pudieron. Hay tormentas que solo Jesús calma." },
          { id: "aguantar", label: "Bajar la cabeza y aguantar",   insight: "Resistir sola/o parece fortaleza, pero te pierdes el milagro. La fe no aprieta los dientes: clama." },
          { id: "culpa",    label: "Preguntarme qué hice mal",     insight: "No toda tormenta es castigo. Jesús los llevó a esa travesía a propósito, para enseñarles a confiar." },
          { id: "clamar",   label: "Clamar a Jesús",               insight: "Ya vas en la dirección correcta. Despertarlo fue, en sí mismo, un acto de fe. Sigue clamando." },
        ],
      },
    },

    /* 3 · LUNES — Marcos 5, la mujer que decidió acercarse */
    {
      id: "paso_fe",
      slot: "paso_fe",
      day: "Lunes · Recupérate",
      tag: "Casillero 3 · Mi paso de fe",
      title: "El toque de la fe",
      story:
        "Doce años enferma, sin dinero, «más bien le iba peor» (Mar. 5:26). Pudo quedarse en cama; en cambio decidió salir y acercarse. «El Salvador podía distinguir el toque de la fe del contacto casual de la muchedumbre». No fue el manto: fue su fe y su decisión (Mar. 5:34).",
      module: {
        type: "skillThenCommit",
        saveLabel: "Guardar en mi ancla",
        seedSub: "tu paso de fe",
        skill: {
          prompt: "Entrena el oído: ¿toque de fe… o roce casual?",
          hint: "Aquel día muchos lo rozaron. Solo una se acercó.",
          badge: "Estás aprendiendo a reconocer la fe que se acerca",
          cats: ["Toque de fe", "Roce casual"],
          rounds: [
            { t: "«Voy a la iglesia, pero no espero que cambie nada.»", a: 1, fb: "Roce casual: presencia sin expectativa. La cercanía física no es fe." },
            { t: "«Estoy decidida: hoy me acerco, aunque me cueste.»", a: 0, fb: "Toque de fe: una decisión deliberada de buscarlo." },
            { t: "«Toco mi Biblia por costumbre, sin abrirla.»", a: 1, fb: "Roce casual: el hábito vacío no sana; la fe sí." },
            { t: "«Le cuento a Dios exactamente lo que me duele.»", a: 0, fb: "Toque de fe: te acercas con tu herida, no con tu máscara." },
            { t: "«Ojalá Dios note que ando cerca.»", a: 1, fb: "Roce casual: esperar pasivamente no es lo mismo que extender la mano." },
            { t: "«Doy el paso aunque tiemble y la multitud empuje.»", a: 0, fb: "Toque de fe: como ella, te acercas a pesar de todo." },
          ],
          summary:
            "No fue su toque lo que la sanó, sino su fe y su decisión de acercarse. Jesús te dice lo mismo hoy: «Venid a mí todos los que estáis fatigados» (Mat. 11:28).",
        },
        commit: {
          prompt: "¿Qué paso deliberado darás esta semana para acercarte a Jesús?",
          hint: "No basta verlo de lejos. Acércate.",
          placeholder: "apartar 10 min cada mañana, contarle mi dolor…",
          extraKey: "pasoFe",
          options: [
            "Apartar 10 minutos cada mañana",
            "Contarle exactamente lo que me duele",
            "Pedirle oración a alguien",
            "Volver a un hábito que dejé",
            "Acercarme aunque no sienta nada",
          ],
        },
      },
    },

    /* 4 · MARTES — Job */
    {
      id: "declaracion",
      slot: "declaracion",
      day: "Martes · Job",
      tag: "Casillero 4 · Mi declaración",
      title: "Lo que declaras cuando no ves",
      story:
        "Job perdió posesiones, hijos y salud. Sus amigos lo culparon. Su mujer le dijo: «maldice a Dios y muérete». Pero en la oscuridad que no entendía, Job no maldijo: declaró. En cada tormenta podemos responder de dos maneras: culpar a Dios y rechazarlo, o aferrarnos a él con todas nuestras fuerzas.",
      module: {
        type: "pickReveal",
        saveLabel: "Guardar en mi ancla",
        seedSub: "tu declaración",
        prompt: "Elige la declaración que sostendrás cuando no puedas ver a Dios",
        hint: "Toca cada una · quédate con la que necesitas",
        chooseLabel: "Esta es la que sostengo",
        closing:
          "A la luz de la eternidad, nuestros problemas son pruebas temporales (2 Cor. 4:16-18). Aférrate a la verdad de su amor aunque no la percibas.",
        allowCustom: { label: "Escribir la mía", placeholder: "Aunque no lo entienda, declaro que…", extraKey: "declaracionPropia" },
        items: [
          { t: "«El Señor dio, y él quitó; ¡bendito sea su nombre!»", ref: "Job 1:21", meaning: "Adoración antes que respuestas. La alabanza no niega el dolor; lo pone en manos fieles." },
          { t: "«Yo sé que mi Redentor vive.»", ref: "Job 19:25", meaning: "Una esperanza que mira más allá de la tumba: hay Alguien que responderá por mí." },
          { t: "«Cuando me haya probado, saldré como oro.»", ref: "Job 23:10", meaning: "Él conoce el camino que tomo. El fuego no me destruye: me refina." },
          { t: "«Aunque él me matare, en él esperaré.»", ref: "Job 13:15", meaning: "Confianza llevada al límite. Mi esperanza no depende de que entienda, sino de quién es él." },
        ],
      },
    },

    /* 5 · MIÉRCOLES — el camino a Emaús */
    {
      id: "historia",
      slot: "historia",
      day: "Miércoles · El camino a Emaús",
      tag: "Casillero 5 · La historia más grande",
      title: "Caminaba a su lado, y no lo sabían",
      story:
        "Para los dos de Emaús era el mayor revés de su vida. No percibían que era solo un episodio de la mayor historia jamás contada. Jesús se acercó y caminó con ellos. «¿Por qué estáis turbados, y suben esos pensamientos a vuestro corazón?» (Luc. 24:38).",
      module: {
        type: "perspectiveFlip",
        saveLabel: "Guardar en mi ancla",
        seedSub: "lo que él ve",
        prompt: "Toca cada carta para ver lo que Jesús ve",
        hint: "Dos perspectivas en el mismo camino",
        pairs: [
          { see: "Ves un callejón sin salida.", sees: "Él ve un camino que aún no reconoces." },
          { see: "Sientes que vas solo por el camino.", sees: "Él camina a tu lado, aunque no lo notes." },
          { see: "Crees que es el final de la historia.", sees: "Él ve un episodio dentro de la historia más grande." },
          { see: "Parece que todo salió mal.", sees: "«A los que aman a Dios, todas las cosas les ayudan a bien» (Rom. 8:28)." },
        ],
        chooseLabel: "Esta es la verdad que necesitaba",
        teach:
          "Olvidamos que Jesús camina a nuestro lado en los valles sombríos. Cuando se abrieron sus ojos, corrieron a contarlo.",
        commit: {
          prompt: "Escribe un mensaje de aliento para alguien que hoy está en su tormenta",
          hint: "Consolamos con el consuelo que recibimos (2 Cor. 1:4)",
          placeholder: "No estás solo en esto. He aprendido que…",
          extraKey: "aliento",
          shareable: true,
        },
      },
    },

    /* 6 · JUEVES — el sueño: ver a Jesús */
    {
      id: "dejar",
      slot: "dejar",
      day: "Jueves · Ver a Jesús",
      tag: "Casillero 6 · Lo que dejo en la puerta",
      title: "Mantén la vista hacia arriba",
      story:
        "En un sueño, un guía la llevó a una escalera escarpada y frágil. «Mantén la vista hacia arriba, para que no te dé vértigo y caigas». Muchos caían. Al llegar a la puerta: «deja cuanto trajiste». Lo depuso todo. Y delante de Jesús oyó: «No temas».",
      module: {
        type: "stairs",
        saveLabel: "Recibir «No temas» · guardar en mi ancla",
        seedSub: "lo que dejaste",
        climbPrompt: "Sube manteniendo la vista hacia arriba",
        climbHint: "Mantén presionado · si miras abajo, resbalas",
        leavePrompt: "En la puerta, deja lo que cargas",
        leaveHint: "Elige lo que más pesa",
        leaveOptions: [
          "El control",
          "El miedo",
          "La culpa",
          "El resentimiento",
          "La necesidad de entenderlo todo",
          "La vergüenza",
          "El cansancio",
        ],
        allowCustom: { placeholder: "lo que cargas hoy…", extraKey: "dejarPropio" },
        promisePrompt: "Y delante de él, ¿qué necesitas oír?",
        promiseOptions: [
          { t: "«No temas»", w: "Su primera palabra al que tiembla." },
          { t: "Me mira con compasión", w: "No con reproche, sino con ternura." },
          { t: "Comprende todo lo que vivo", w: "Conoce cada dificultad y pensamiento íntimo." },
          { t: "Su sonrisa que da gozo", w: "Inunda de alegría el alma cansada." },
        ],
        promiseExtraKey: "promesa",
        verse: { ref: "Romanos 8:18", text: "Las aflicciones del tiempo presente no son comparables con la gloria venidera." },
      },
    },

    /* 7 · SÍNTESIS — el ancla (Rom 5:3-5) */
    {
      id: "esperanza",
      slot: "esperanza",
      day: "El ancla del alma",
      tag: "Casillero 7 · Mi esperanza",
      title: "La tribulación no es el final de la frase",
      story:
        "Pablo no dice que evitemos la tormenta, sino que la tribulación es el principio de una cadena. Forja cada eslabón y verás dónde termina.",
      module: {
        type: "anchorChain",
        saveLabel: "Echar el ancla · guardar",
        seedSub: "tu esperanza",
        chain: [
          { word: "Tribulación", line: "Lo que ahora te golpea." },
          { word: "Paciencia", line: "La tribulación produce paciencia: aprendes a permanecer." },
          { word: "Carácter probado", line: "La paciencia produce un carácter probado: sales como oro." },
          { word: "Esperanza", line: "El carácter alienta esperanza: ya no temes la próxima ola." },
        ],
        climax: "Y la esperanza no defrauda, porque el amor de Dios ha sido derramado en tu corazón.",
        prompt: "¿Cuál es la esperanza que echarás como ancla?",
        hint: "«Esperanza… como segura y firme ancla del alma» (Heb. 6:19)",
        options: [
          "Que Dios sigue en mi barca",
          "Que saldré como oro",
          "Que esto también ayudará a bien",
          "Que su amor no me defraudará",
        ],
        allowCustom: { placeholder: "mi esperanza es…", extraKey: "esperanzaPropia" },
      },
    },

    /* 8 · VIERNES — para estudiar y meditar */
    {
      id: "paso",
      slot: "paso",
      day: "Viernes · Para estudiar y meditar",
      tag: "Casillero 8 · Mi paso de la semana",
      title: "Cuando eres débil, yo soy fuerte",
      story:
        "El mundo no siempre cuida al débil, al herido, al quebrantado. Pero el mensaje «cuando eres débil, yo soy fuerte» (2 Cor. 12:9) transforma vidas. Si tu fe flaquea, ora: «¡Creo! ¡Ayuda mi poca fe!» (Mar. 9:24).",
      module: {
        type: "commitDuo",
        saveLabel: "Cerrar mi ancla",
        seedSub: "tu paso",
        stepPrompt: "Mi paso concreto de esta semana",
        stepHint: "Toca una idea o escribe la tuya",
        stepOptions: [
          "Anclarme en la Palabra cada día",
          "Orar a Dios como mi Consolador",
          "Pedir que su voz suene más que la del Enemigo",
          "Rodearme de gente que me anime",
          "Restaurar mi primer amor por él",
        ],
        stepPlaceholder: "mi paso concreto…",
        stepExtraKey: "pasoTexto",
        personPrompt: "Alguien a quien animaré hoy",
        personHint: "Piensa en quién hoy necesita oír «no estás solo»",
        personPlaceholder: "un nombre…",
        personExtraKey: "animar",
      },
    },
  ],

  /* ---- versos de aliento (sorpresa al llenar un casillero) ---- */
  encourage: [
    "«La esperanza no defrauda, porque el amor de Dios ha sido derramado en nuestro corazón.» — Romanos 5:5",
    "«A los que aman a Dios, todas las cosas les ayudan a bien.» — Romanos 8:28",
    "«Cuando me haya probado, saldré como oro.» — Job 23:10",
    "«Nunca te dejaré, ni te desampararé.» — Hebreos 13:5",
    "«¡Creo! ¡Ayuda mi poca fe!» — Marcos 9:24",
    "«Yo he venido para que tengan vida, y la tengan en abundancia.» — Juan 10:10",
    "«Bástate mi gracia; mi poder se perfecciona en la debilidad.» — 2 Corintios 12:9",
    "«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.» — Mateo 11:28",
  ],

  /* ---- patrón intermedio (se revela tras 4 casilleros) ---- */
  pattern(state) {
    const s = state.slots || {};
    const reaccion = s.reaccion ? lcFirst(s.reaccion) : "reaccionas";
    const dejar = s.dejar ? lcFirst(s.dejar) : "lo que cargas";
    const raw = s.declaracion || "que su amor permanece";
    const decl = /[«»]/.test(raw) ? "«" + raw.replace(/[«»]/g, "").replace(/[.;,\s]+$/, "") + "»" : raw;
    return `Cuando llega la tormenta, sueles ${reaccion}. Pero estás aprendiendo a acercarte con fe, a soltar ${dejar}, y a sostener ${decl}. La tribulación está produciendo en ti algo que no defrauda: esperanza.`;
  },

  /* ---- salidas útiles para la semana ---- */
  outputs(state) {
    const s = state.slots || {};
    const e = state.extra || {};
    const quote = (str) => "«" + String(str || "").replace(/[«»]/g, "").replace(/[.;,\s]+$/, "") + "»";
    const tormenta = lcFirst(s.tormenta || "mi tormenta");
    const decl = s.declaracion || "El Señor dio, y él quitó; bendito sea su nombre.";
    const esperanza = lcFirst(s.esperanza || "que su amor no me defraudará");
    const dejar = lcFirst(s.dejar || "lo que cargo");
    const promesa = e.promesa || "No temas";
    const paso = (e.pasoTexto || s.paso || "dar un paso concreto de fe").toString();
    const animar = (e.animar || "").trim();

    const oracion = `Señor, vengo a ti en medio de ${tormenta}. Confieso que mi reacción suele ser ${lcFirst(s.reaccion || "dudar de tu cuidado")}, pero hoy elijo acercarme con fe, como la mujer que tocó tu manto. Dejo a tus pies ${dejar}. Sosténme con esta verdad: ${quote(decl)}. Recuérdame que tú dices ${quote(promesa)}. Mi esperanza es ${esperanza}, y sé que no me defraudará. En el nombre de Jesús, amén.`;

    const aliento = (e.aliento || "").trim();
    const aliento24 = aliento || "No estás solo en esto. Jesús camina a tu lado en el valle, aunque no lo veas. La tribulación no es el final de la historia.";

    const accion24 = `En las próximas 24 horas voy a ${lcFirst(paso)}${animar ? `, y voy a animar a ${animar}.` : "."}`;

    const pregunta = `Esta semana descubrí que cuando llega la tormenta suelo ${lcFirst(s.reaccion || "reaccionar")}, pero estoy aprendiendo a acercarme con fe. ¿Cómo ha cambiado algún contratiempo tu imagen de Dios — y dónde echaste el ancla?`;

    const tarjeta = `Mi ancla de esta semana: en medio de ${tormenta}, declaro ${quote(decl)}. Mi esperanza es ${esperanza}.\nVersículo: «${this.verse.text}» (${this.verse.ref}).`;

    return { oracion, aliento: aliento24, accion24, pregunta, tarjeta };
  },

  /* ---- preguntas para dialogar (Viernes) ---- */
  discussion: [
    "¿Cómo ha influido en tu imagen de Dios algún contratiempo que enfrentas? ¿Cómo puedes percibir más claramente su verdadero carácter?",
    "¿Cuándo fue la última vez que oraste para que la voz de Dios sonara más que la del Enemigo? (Juan 10:10).",
    "¿Confías en que Dios sigue siendo soberano sobre tu vida a pesar de las dificultades?",
    "¿Te mantienes anclado en la Palabra de Dios cada día? Pídele que restaure tu primer amor.",
    "¿Cuándo acudiste por última vez a Dios como tu Consolador, confiando en que nunca te dejará (Heb. 13:5)?",
    "Si tu fe es débil, dile: «¡Creo! ¡Ayuda mi poca fe!» (Mar. 9:24). Rodéate de quienes te animan.",
    "El mensaje «cuando eres débil, yo soy fuerte» transforma vidas. ¿A quién podrías animar hoy?",
  ],

  /* ---- Modo maestro: guía para dirigir cada estación ---- */
  facilitator: {
    tormenta: {
      apertura: "¿Cuál es nuestra respuesta cuando se desata la tormenta: bajar la cabeza o mirar hacia arriba?",
      seguimiento: "¿Qué contratiempo está afectando hoy tu relación con Dios?",
      ilustracion: "La niña sonreía bajo los relámpagos: «Dios me está fotografiando». La misma lluvia, otra mirada.",
      transicion: "Si así llega la tormenta, veamos cómo reaccionaron los discípulos en la barca.",
      actividad: "Que cada uno nombre, en una palabra, la tormenta que enfrenta (si desea).",
      cierre: "Señor, en cada tormenta, enséñanos a mirar hacia arriba.",
    },
    reaccion: {
      apertura: "¿Por qué clamaron los discípulos «¿no te importa?» si Jesús estaba con ellos?",
      seguimiento: "¿Cuál es tu reacción habitual ante una tormenta, y cómo afecta tu relación con Dios?",
      ilustracion: "Pescadores expertos, y aun así aterrados. La experiencia no calma toda tormenta; solo Cristo.",
      transicion: "De la barca pasamos a la multitud: una mujer que decidió acercarse.",
      actividad: "Lean Marcos 4:35-41 y comenten qué cuestionaban realmente los discípulos.",
      cierre: "Cristo, despierta en nuestra barca y calma lo que no podemos calmar.",
    },
    paso_fe: {
      apertura: "¿Qué diferencia hubo entre la multitud que rozaba a Jesús y la mujer que lo tocó?",
      seguimiento: "¿Qué paso deliberado puedes dar esta semana para acercarte a él?",
      ilustracion: "Muchos lo rozaron; una se acercó. El roce es casual; la fe es decisión.",
      transicion: "De la fe que se acerca pasamos a la fe que se sostiene: Job.",
      actividad: "Clasifiquen frases: ¿toque de fe o roce casual?",
      cierre: "Danos, Señor, la decisión de acercarnos aunque temblemos.",
    },
    declaracion: {
      apertura: "Ante el desastre, ¿qué declaró Job, y qué nos enseña?",
      seguimiento: "¿Qué declaración necesitas sostener cuando no entiendes lo que pasa?",
      ilustracion: "Sus amigos explicaban; Job adoraba. A veces sobran las explicaciones y falta la confianza.",
      transicion: "De la oscuridad de Job pasamos al camino de Emaús.",
      actividad: "Cada uno elija una declaración bíblica para esta semana.",
      cierre: "Aunque no veamos, declaramos: nuestro Redentor vive.",
    },
    historia: {
      apertura: "¿Qué veían los de Emaús, y qué veía Jesús al caminar a su lado?",
      seguimiento: "¿En qué parte de tu historia necesitas recordar que Jesús camina contigo?",
      ilustracion: "Caminaron con la respuesta a su lado sin reconocerla. También nosotros, a menudo.",
      transicion: "Si él camina con nosotros, veamos cómo es estar delante de él (el sueño).",
      actividad: "Escriban un mensaje de aliento para alguien en dificultad (2 Cor. 1:4).",
      cierre: "Abre nuestros ojos, Señor, para reconocerte en el camino.",
    },
    dejar: {
      apertura: "¿Por qué el guía insistió en mantener la vista hacia arriba en la escalera?",
      seguimiento: "¿Qué necesitas dejar en la puerta para poder subir?",
      ilustracion: "Muchos caían por mirar hacia abajo. La caída empieza en la mirada.",
      transicion: "Lo que soltamos abajo nos prepara para la esperanza que no defrauda.",
      actividad: "Que cada uno nombre, si desea, lo que dejaría en la puerta.",
      cierre: "Recibimos tu palabra, Señor: «No temas».",
    },
    esperanza: {
      apertura: "¿Cómo va Pablo de la tribulación a la esperanza en Romanos 5:3-5?",
      seguimiento: "¿Cuál es la esperanza que sostiene tu vida ahora mismo?",
      ilustracion: "El ancla no impide la tormenta; sostiene el barco en medio de ella.",
      transicion: "Con el ancla echada, demos un paso concreto esta semana.",
      actividad: "Reciten juntos Romanos 5:3-5 y nombren el eslabón que más necesitan.",
      cierre: "Echamos el ancla del alma en tu amor que no defrauda.",
    },
    paso: {
      apertura: "¿Qué significa que «cuando eres débil, yo soy fuerte»?",
      seguimiento: "¿A quién podrías animar esta semana con el consuelo que recibiste?",
      ilustracion: "El mundo ignora al débil; el evangelio lo levanta.",
      transicion: "Reunamos todo en un Kit y un paso de 24 horas.",
      actividad: "Compartan un solo paso concreto para esta semana.",
      cierre: "Hazme fuerte en mi debilidad, y úsame para animar a otro.",
    },
  },
};

export default l11;
