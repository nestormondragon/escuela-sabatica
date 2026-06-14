/* =================================================================
   LECCIÓN 13 · HACIA LA ETERNIDAD · para el 27 de junio de 2026
   El artefacto: "La Mira" — los ojos puestos en la meta, el camino a casa.
   1 Juan 3:2 · seremos semejantes a él, porque lo veremos como es.
   Escena: un camino de noche que mira hacia una luz lejana, hasta que
   la Ciudad desciende y vemos su rostro: cara a cara.
   ================================================================= */

function lcFirst(str) {
  const s = String(str || "");
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export const l13 = {
  id: "l13",
  number: 13,
  quarter: "2026-Q2",
  slug: "hacia-la-eternidad",
  weekStart: "2026-06-20",
  forDate: "2026-06-27",

  title: "Hacia la Eternidad",
  subtitle: "Los ojos en la meta, el corazón camino a casa.",
  kitName: "Mi Mira",
  artifact: { noun: "mira" },
  ui: {
    start: "Empezar a fijar mi mira",
    emptyKit: "Tu mira",
    building: "Cada elección fija tu mira",
    buildingHint: "Toca la pieza que brilla. Verás la noche volverse amanecer.",
    lastPiece: "Falta una pieza",
    patternLabel: "Tu patrón hacia la meta",
    doneTitle: "Tu mira está fija",
    doneSub: "La fijaste tú, con Dios. Llévala contigo hasta verlo.",
    open: "Abrir mi mira",
    back: "Volver a mi mira",
  },

  centerpiece: "road",
  scene: {
    motif: "road",
    shader: {
      sunX: 0.5, hasSea: false,
      stormTop: [0.03, 0.04, 0.10], stormBot: [0.07, 0.09, 0.18],
      dawnTop: [0.16, 0.20, 0.42], dawnBot: [0.97, 0.80, 0.52],
      sun: [1.0, 0.86, 0.58],
    },
  },
  stages: ["noche", "mirada", "camino", "ciudad", "rostro"],
  stageLabel: {
    noche: "Noche en el camino",
    mirada: "Levantas la mirada",
    camino: "El camino se aclara",
    ciudad: "La Ciudad se acerca",
    rostro: "Cara a cara",
  },

  verse: {
    ref: "1 Juan 3:2",
    text:
      "Amados, ahora ya somos hijos de Dios; y aunque no se ve aún lo que hemos de ser, sabemos que cuando Cristo aparezca seremos semejantes a él, porque lo veremos como él es.",
  },

  promise:
    "En unos minutos vas a fijar tu Mira: dónde se te van los ojos, qué arreglarías hoy, qué le dirás cara a cara, qué cosas de arriba buscar, qué anhelas de la Eternidad, tu respuesta a su «Ven», y con quién compartir la esperanza.",

  slots: [
    { id: "mirada",   n: 1, label: "Mi mirada",            teaser: "Adónde se me van los ojos…",            icon: "eye",      station: "mirada" },
    { id: "hoy",      n: 2, label: "Si hoy fuera breve",    teaser: "Lo que pondría en orden hoy…",          icon: "sunrise",  station: "hoy" },
    { id: "caraacara",n: 3, label: "Cara a cara",           teaser: "Lo que le diré al verlo…",              icon: "heart",    station: "caraacara" },
    { id: "arriba",   n: 4, label: "Las cosas de arriba",   teaser: "Lo terrenal que compite con el Cielo…", icon: "compass",  station: "arriba" },
    { id: "anhelo",   n: 5, label: "Lo que anhelo",         teaser: "El «ya no habrá más…» que espero…",      icon: "flame",    station: "anhelo" },
    { id: "ven",      n: 6, label: "Mi «Ven»",              teaser: "Mi respuesta a su invitación…",          icon: "hand",     station: "ven" },
    { id: "esperanza",n: 7, label: "Con quién la comparto", teaser: "Quién necesita esta esperanza…",         icon: "path",     station: "esperanza" },
    { id: "ancla",    n: 8, label: "Lo que me llevo",       teaser: "Lo que guardaré del trimestre…",         icon: "anchor",   station: "ancla" },
  ],

  stations: [
    /* 1 · SÁBADO / DOMINGO — fijar los ojos */
    {
      id: "mirada",
      slot: "mirada",
      day: "Sábado · ¿Qué te depara el futuro?",
      tag: "Casillero 1 · Mi mirada",
      title: "¿Adónde miras?",
      story:
        "El futuro puede asustar o ilusionar. Pase lo que pase, Jesús es fiel (Apoc. 3:14) y nunca te dejará (Heb. 13:5). En un mundo que clama por tu atención, David decía: «Mis ojos están siempre vueltos hacia el Señor» (Sal. 25:15).",
      module: {
        type: "choiceInsight",
        privacy: true,
        prompt: "Cuando bajas la guardia, ¿adónde se te van los ojos?",
        hint: "Elige lo más sincero",
        saveLabel: "Guardar en mi mira",
        seedSub: "tu mirada",
        closing:
          "Fijar los ojos en Jesús no siempre es fácil, pero es posible. Él sacará tus pies de la red.",
        options: [
          { id: "pantalla", label: "A la pantalla",          insight: "Lo que miramos nos forma. Mil reclamos pequeños pueden robar la mirada que sostiene el alma.", tags: ["react:apathy", "theme:self", "posture:avoidant", "tone:tender"] },
          { id: "miedos",   label: "A mis miedos",            insight: "El miedo agranda la tormenta y achica al Salvador. Levantar los ojos cambia el tamaño de todo.", tags: ["react:fear", "theme:hope", "posture:seeking", "tone:tender"] },
          { id: "pasado",   label: "Al pasado",               insight: "Mirar atrás paraliza. La esperanza no vive en lo que fue, sino en Aquel que viene.", tags: ["react:doubt", "theme:hope", "posture:avoidant", "tone:raw"] },
          { id: "otros",    label: "A lo que tienen otros",   insight: "Comparar nubla la vista. Tus ojos en el Señor te devuelven la paz que la envidia roba.", tags: ["react:pride", "theme:self", "posture:seeking", "tone:raw"] },
          { id: "logros",   label: "A mis logros y planes",   insight: "«¿Qué es vuestra vida? Un vapor» (Stg. 4:14). Lo bueno puede desplazar a lo eterno si no levantamos la vista.", tags: ["react:pride", "theme:self", "posture:proud", "tone:resolute"] },
        ],
      },
    },

    /* 2 · DOMINGO — viviendo hoy */
    {
      id: "hoy",
      slot: "hoy",
      day: "Domingo · Viviendo hoy",
      tag: "Casillero 2 · Si hoy fuera breve",
      title: "Un vapor que aparece y se desvanece",
      story:
        "«El fin de todas las cosas se acerca; sed sobrios y velad en oración» (1 Ped. 4:7). Nuestra vida es breve. Todos necesitamos reavivamiento: «¡Haz resplandecer tu rostro, y seremos salvos!» (Sal. 80:19).",
      module: {
        type: "choiceInsight",
        prompt: "Si supieras que el tiempo es breve, ¿qué pondrías en orden hoy?",
        hint: "Lo primero que viene a tu mente suele ser lo más honesto",
        saveLabel: "Guardar en mi mira",
        seedSub: "lo que ordenas hoy",
        closing:
          "Que Dios «haga resplandecer su rostro» sobre ti significa su favor y su salvación: no por tu mérito, sino por su justicia acreditada a ti por la fe.",
        options: [
          { id: "perdon",   label: "Una relación que reparar",  insight: "El reloj que de verdad corre no es el del fin del mundo, sino el de un «perdóname» que no dijiste.", tags: ["theme:relationship", "posture:humble", "tone:tender"] },
          { id: "dios",     label: "Mi relación con Dios",       insight: "Reavivar no es empezar de cero; es volver a encender lo que el ajetreo apagó.", tags: ["theme:prayer", "posture:surrendering", "tone:tender"] },
          { id: "prioridad",label: "Mis prioridades",            insight: "Cuando el tiempo es breve, lo urgente pierde y lo importante gana. Hoy puedes reordenar.", tags: ["theme:self", "posture:seeking", "tone:resolute"] },
          { id: "perdonar", label: "Un rencor que soltar",       insight: "Cargar un rencor hacia la Eternidad no tiene sentido. Suéltalo y viaja ligero.", tags: ["theme:grace", "posture:surrendering", "tone:tender"] },
          { id: "miedo",    label: "Mi miedo al futuro",         insight: "El antídoto del miedo no es el control, sino la confianza en Aquel que sostiene el mañana.", tags: ["react:fear", "theme:hope", "posture:seeking", "tone:tender"] },
        ],
      },
    },

    /* 3 · LUNES — finalmente, cara a cara */
    {
      id: "caraacara",
      slot: "caraacara",
      day: "Lunes · Finalmente, cara a cara",
      tag: "Casillero 3 · Cara a cara",
      title: "Veremos a Aquel que el corazón anhela",
      story:
        "Sonará la trompeta, todo ojo lo verá (Apoc. 1:7), los que durmieron en Cristo resucitarán (1 Tes. 4:16) y reconocerán su voz. Veremos cara a cara a Aquel de quien leímos, en cuyo nombre oramos, de quien hablamos a otros.",
      module: {
        type: "pickReveal",
        saveLabel: "Guardar en mi mira",
        seedSub: "lo que le dirás",
        prompt: "Cuando lo veas cara a cara, ¿qué es lo primero que querrás decirle?",
        hint: "Toca cada una · quédate con la tuya",
        chooseLabel: "Esto le diré",
        closing:
          "Cada oración perseverante, cada momento de comunión, cada testimonio y cada prueba habrán valido la pena (Apoc. 22:4).",
        allowCustom: { label: "Escribir la mía", placeholder: "Señor, cuando te vea, quiero decirte…", extraKey: "caraPropia" },
        items: [
          { t: "«Gracias por no soltarme nunca.»", ref: "Hebreos 13:5", meaning: "El agradecimiento por la fidelidad que no entendimos hasta el final." },
          { t: "«Valió la pena esperarte.»", ref: "Apocalipsis 22:4", meaning: "La espera, vista desde su rostro, se revela como el mejor camino." },
          { t: "«Aquí está la persona que me confiaste.»", ref: "1 Tesalonicenses 2:19", meaning: "El gozo de llegar acompañado por alguien a quien señalaste a Cristo." },
          { t: "«Por fin te veo como eres.»", ref: "1 Juan 3:2", meaning: "El anhelo más hondo del corazón humano, al fin saciado." },
        ],
      },
    },

    /* 4 · MARTES — la novia / cosas de arriba */
    {
      id: "arriba",
      slot: "arriba",
      day: "Martes · La novia",
      tag: "Casillero 4 · Las cosas de arriba",
      title: "Engalanada como una novia",
      story:
        "Juan vio la Nueva Jerusalén «engalanada como una novia para su esposo» (Apoc. 21:2). Jesús prepara un lugar indescriptible (Juan 14:1-3). Por eso se nos exhorta: «Poned la mira en las cosas de arriba, no en las de la tierra» (Col. 3:2).",
      module: {
        type: "choiceInsight",
        prompt: "¿Qué cosa de la tierra compite más por tu mira?",
        hint: "No es malo en sí; solo no puede ser el centro",
        saveLabel: "Guardar en mi mira",
        seedSub: "lo que compite",
        closing:
          "Poner la mira arriba no es despreciar la tierra; es vivir hoy a la luz de la boda que pronto vendrá.",
        options: [
          { id: "exito",    label: "El éxito y el dinero",   insight: "Lo que acumulas se queda; lo que envías delante por amor te espera. ¿Dónde está tu tesoro?", tags: ["react:pride", "theme:self", "posture:proud", "tone:resolute"] },
          { id: "comodidad",label: "La comodidad",            insight: "El cielo no es para los que aman su comodidad más que su Salvador. Pero él la transforma en anhelo.", tags: ["react:apathy", "theme:self", "posture:avoidant", "tone:tender"] },
          { id: "aprobacion",label: "La aprobación de otros", insight: "Vivir para la mirada de la gente cansa; vivir para su rostro libera.", tags: ["react:pride", "theme:relationship", "posture:proud", "tone:raw"] },
          { id: "entreten", label: "El entretenimiento",      insight: "No todo lo que llena el tiempo alimenta el alma. Educa tus gustos para el Cielo desde ahora.", tags: ["react:apathy", "theme:self", "posture:avoidant", "tone:tender"] },
          { id: "control",  label: "Controlar mi futuro",     insight: "Soltar el control no es perderlo; es ponerlo en manos más fieles que las tuyas.", tags: ["react:control", "theme:self", "posture:proud", "tone:resolute"] },
        ],
      },
    },

    /* 5 · MIÉRCOLES — seguir al Cordero */
    {
      id: "anhelo",
      slot: "anhelo",
      day: "Miércoles · Seguir al Cordero",
      tag: "Casillero 5 · Lo que anhelo",
      title: "Ya no habrá más",
      story:
        "«Enjugará Dios toda lágrima; y ya no habrá muerte, ni llanto, ni dolor» (Apoc. 21:4; Isa. 25:8). Para anhelar seguir al Cordero allá, hay que seguirlo aquí: «Estos son los que siguen al Cordero por dondequiera que va» (Apoc. 14:4).",
      module: {
        type: "pickReveal",
        saveLabel: "Guardar en mi mira",
        seedSub: "lo que más anhelas",
        prompt: "¿Cuál de estas promesas anhelas más?",
        hint: "Toca cada una · elige la que tu corazón necesita hoy",
        chooseLabel: "Esto es lo que más anhelo",
        closing:
          "El Cordero que está en medio del trono «los guiará a fuentes de agua viva» (Apoc. 7:17). Seguirlo aquí prepara el corazón para seguirlo allá.",
        allowCustom: { label: "Escribir el mío", placeholder: "anhelo el día en que ya no…", extraKey: "anheloPropio" },
        items: [
          { t: "Ya no habrá más muerte", ref: "Apocalipsis 21:4", meaning: "La última enemiga, vencida para siempre; nadie volverá a despedirse." },
          { t: "Ya no habrá más lágrimas", ref: "Isaías 25:8", meaning: "Su propia mano enjugará lo que ningún consuelo terreno pudo secar." },
          { t: "Ya no habrá más dolor", ref: "Apocalipsis 21:4", meaning: "El cuerpo quebrantado, el corazón herido: todo sanado en su presencia." },
          { t: "Reunirme con los que partieron", ref: "1 Tesalonicenses 4:17", meaning: "El reencuentro que la fe sostuvo, al fin cumplido, para no separarnos más." },
          { t: "Ver y seguir al Cordero", ref: "Apocalipsis 14:4", meaning: "El mayor gozo del Cielo: estar por fin con Aquel que el corazón anheló." },
        ],
      },
    },

    /* 6 · JUEVES — ¡Ven! */
    {
      id: "ven",
      slot: "ven",
      day: "Jueves · «¡Ven!»",
      tag: "Casillero 6 · Mi «Ven»",
      title: "«Al que viene a mí, nunca lo echo fuera»",
      story:
        "Hoy se te extiende la invitación: «Venid a mí todos los que estáis trabajados» (Mat. 11:28). «Al que viene a mí, nunca lo echo fuera» (Juan 6:37). «El Espíritu y la esposa dicen: ¡Ven!» (Apoc. 22:17).",
      module: {
        type: "anchorChain",
        saveLabel: "Responder «Vengo» · guardar",
        seedSub: "tu respuesta",
        chain: [
          { word: "«Ven a mí»", line: "La invitación de Jesús al cansado y agobiado (Mat. 11:28)." },
          { word: "«Nunca lo echo fuera»", line: "Su promesa al que viene, por indigno que se sienta (Juan 6:37)." },
          { word: "«El Espíritu y la esposa: ¡Ven!»", line: "El llamado se vuelve coro; también tú puedes decirlo (Apoc. 22:17)." },
          { word: "«Vengo en breve»", line: "Así termina la Biblia: una promesa y una espera con esperanza (Apoc. 22:20)." },
        ],
        climax: "«¡Amén! ¡Ven, Señor Jesús!» Hoy puedes responder: aquí estoy, vengo a ti.",
        prompt: "¿Cuál es tu respuesta hoy a su «Ven»?",
        hint: "Mantén presionado para sellar tu respuesta",
        options: [
          "Vengo a ti tal como soy",
          "Quiero permanecer en ti cada día",
          "Ayúdame a esperarte con fe",
          "Aquí estoy: úsame mientras vuelves",
        ],
        allowCustom: { placeholder: "mi respuesta es…", extraKey: "venPropia" },
      },
    },

    /* 7 · VIERNES Q3 — compartir la esperanza */
    {
      id: "esperanza",
      slot: "esperanza",
      day: "Viernes · Comparte la esperanza",
      tag: "Casillero 7 · Con quién la comparto",
      title: "No se comparte lo que no se tiene",
      story:
        "«El Espíritu y la esposa dicen: ¡Ven! Y el que oye, diga: ¡Ven!» (Apoc. 22:17). No puedes compartir una esperanza que tú mismo no tienes. Pero la que tienes, puedes ofrecerla.",
      module: {
        type: "commitDuo",
        saveLabel: "Guardar en mi mira",
        seedSub: "con quién la compartes",
        stepPrompt: "¿Quién necesita escuchar de esta esperanza?",
        stepHint: "Un nombre o una relación",
        stepOptions: [
          "Un familiar que sufre",
          "Un amigo sin esperanza",
          "Alguien que perdió a un ser querido",
          "Un vecino o compañero",
        ],
        stepPlaceholder: "un nombre…",
        stepExtraKey: "esperanzaQuien",
        personPrompt: "¿Cómo darás el primer paso?",
        personHint: "Compartir empieza con una conversación sencilla",
        personPlaceholder: "preguntarle cómo está, contarle mi esperanza…",
        personExtraKey: "esperanzaPaso",
      },
    },

    /* 8 · VIERNES Q2 — lo que me llevo del trimestre */
    {
      id: "ancla",
      slot: "ancla",
      day: "Viernes · Para estudiar y meditar",
      tag: "Casillero 8 · Lo que me llevo",
      title: "Él la completará",
      story:
        "«El que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo» (Fil. 1:6). Dios inició esta relación contigo, y él la completará. Mantén los ojos en la meta, descansando en la justicia de Cristo.",
      module: {
        type: "commitDuo",
        saveLabel: "Fijar mi mira",
        seedSub: "lo que guardas",
        stepPrompt: "¿Qué de este trimestre quieres recordar más?",
        stepHint: "Lo que te mantendrá firme hasta verlo cara a cara",
        stepOptions: [
          "Que su Palabra es viva y eficaz",
          "Que en la tormenta él está en mi barca",
          "Que su justicia me cubre, no mi mérito",
          "Que debo seguir al Cordero hoy",
          "Que la esperanza no defrauda",
        ],
        stepPlaceholder: "lo que me llevo…",
        stepExtraKey: "llevoTexto",
        personPrompt: "Una oración breve para esperar con fe",
        personHint: "«Señor Jesús, ¡ven, por favor!»",
        personPlaceholder: "Señor, ayúdame a esperarte…",
        personExtraKey: "oracionFinal",
      },
    },
  ],

  encourage: [
    "«Seremos semejantes a él, porque lo veremos como él es.» — 1 Juan 3:2",
    "«Enjugará Dios toda lágrima; ya no habrá muerte ni dolor.» — Apocalipsis 21:4",
    "«Al que viene a mí, nunca lo echo fuera.» — Juan 6:37",
    "«Mis ojos están siempre vueltos hacia el Señor.» — Salmo 25:15",
    "«El que persevere hasta el fin, ese será salvo.» — Mateo 24:13",
    "«Ciertamente vengo en breve. ¡Amén! ¡Ven, Señor Jesús!» — Apocalipsis 22:20",
    "«Nuestra ciudadanía está en el cielo.» — Filipenses 3:20",
    "«El que comenzó en ti la buena obra, la perfeccionará.» — Filipenses 1:6",
  ],

  pattern(state) {
    const s = state.slots || {};
    const mirada = s.mirada ? lcFirst(s.mirada) : "lo urgente";
    const anhelo = s.anhelo ? lcFirst(s.anhelo) : "su presencia";
    const arriba = s.arriba ? lcFirst(s.arriba) : "lo terrenal";
    return `Tus ojos tienden a irse a ${mirada}, y ${arriba} compite por tu mira. Pero estás aprendiendo a levantar la vista hacia Aquel que viene. Lo que más anhelas —${anhelo}— te recuerda que esto no es el final: es el camino a casa.`;
  },

  outputs(state) {
    const s = state.slots || {};
    const e = state.extra || {};
    const quote = (str) => "«" + String(str || "").replace(/[«»]/g, "").replace(/[.;,\s]+$/, "") + "»";
    const cara = e.caraPropia || s.caraacara || "Gracias por no soltarme nunca.";
    const anhelo = lcFirst(s.anhelo || "ver su rostro");
    const llevo = lcFirst(e.llevoTexto || s.ancla || "que la esperanza no defrauda");
    const quien = e.esperanzaQuien || "alguien que necesita esperanza";
    const ven = lcFirst(s.ven || "vengo a ti tal como soy");

    const oracion = `Señor Jesús, fijo mis ojos en ti. Confieso que se me van a ${lcFirst(s.mirada || "mil cosas")}, pero hoy levanto la mirada. ${e.oracionFinal ? e.oracionFinal.trim() + " " : ""}Respondo a tu «Ven»: ${ven}. Anhelo el día en que te vea cara a cara. ¡Ven, Señor Jesús! Amén.`;

    const aliento = `Esta esperanza es real: un día ya no habrá más dolor, y veremos su rostro. No puedo compartir contigo una esperanza que yo no tenga — y la tengo. Hay un hogar que nos espera.`;
    const accion24 = `Esta semana voy a compartir la esperanza con ${lcFirst(quien)}${e.esperanzaPaso ? `, empezando por ${lcFirst(e.esperanzaPaso)}` : ""}.`;
    const pregunta = `Al cerrar el trimestre, lo que más quiero recordar es ${llevo}. ¿Qué aspecto de estas lecciones quieres recordar tú para mantener firme tu relación con Dios hasta ver a Jesús cara a cara?`;
    const tarjeta = `Mi mira al cerrar el trimestre: levanto los ojos a Aquel que viene. Cuando lo vea, le diré: ${quote(cara)}.\nVersículo: «${this.verse.text}» (${this.verse.ref}).`;

    return { oracion, aliento, accion24, pregunta, tarjeta };
  },

  discussion: [
    "Lee la visión del Cielo en Primeros escritos, pp. 38-43. ¿Qué es lo que más te llama la atención?",
    "¿Qué aspecto de las lecciones de este trimestre deseas recordar más para mantener firme tu relación con Dios?",
    "¿Quiénes de tus conocidos necesitan escuchar acerca de la esperanza del Cielo? Comprométete a compartirla pronto.",
    "¿Qué significa para ti vivir hoy «con la mira en las cosas de arriba»?",
    "¿Cómo cambia tu semana la certeza de que «el que comenzó la buena obra la perfeccionará»?",
  ],

  facilitator: {
    mirada: {
      apertura: "¿Por qué cuesta tanto fijar los ojos en Jesús en un mundo que clama por nuestra atención?",
      seguimiento: "¿Adónde se te van los ojos cuando bajas la guardia?",
      ilustracion: "David: «Mis ojos están siempre vueltos hacia el Señor, porque él sacará mis pies de la red».",
      transicion: "Si fijamos la mirada, ¿cómo viviríamos sabiendo que el tiempo es breve?",
      actividad: "Que cada uno nombre algo que suele robarle la mirada.",
      cierre: "Señor, vuelve nuestros ojos hacia ti.",
    },
    hoy: {
      apertura: "¿Qué significa que la vida es «un vapor que pronto se desvanece»?",
      seguimiento: "Si el tiempo fuera breve, ¿qué pondrías en orden hoy?",
      ilustracion: "«¡Haz resplandecer tu rostro, y seremos salvos!» — la oración de todo creyente que lucha.",
      transicion: "Vivir hoy para él nos prepara para verlo cara a cara.",
      actividad: "Completen: «Hoy necesito poner en orden ___».",
      cierre: "Haz resplandecer tu rostro sobre nosotros, Señor.",
    },
    caraacara: {
      apertura: "¿Qué sentiremos cuando suene la trompeta y todo ojo lo vea?",
      seguimiento: "¿Qué querrás decirle a Jesús cuando lo veas cara a cara?",
      ilustracion: "Veremos a Aquel de quien leímos, oramos y hablamos: por fin, cara a cara.",
      transicion: "Si eso nos espera, ¿dónde ponemos hoy la mira?",
      actividad: "Cada uno comparte, si desea, lo primero que querría decirle.",
      cierre: "Apresura el día, Señor, en que te veamos.",
    },
    arriba: {
      apertura: "¿Por qué se nos exhorta a poner la mira «en las cosas de arriba»?",
      seguimiento: "¿Qué cosa terrenal compite más por tu mira?",
      ilustracion: "La Nueva Jerusalén, «engalanada como una novia»: eso nos espera.",
      transicion: "Con la mira arriba, ¿qué anhelamos de la Eternidad?",
      actividad: "Nombren algo terrenal que necesitan reordenar bajo la luz del Cielo.",
      cierre: "Pon nuestra mira en las cosas de arriba.",
    },
    anhelo: {
      apertura: "¿Qué es lo que más anhelas de la Eternidad?",
      seguimiento: "¿Cómo seguimos al Cordero aquí para anhelar seguirlo allá?",
      ilustracion: "«Enjugará Dios toda lágrima»: su propia mano secará lo que nada pudo secar.",
      transicion: "Si esto anhelamos, ¿cómo respondemos a su invitación de venir?",
      actividad: "Compartan cuál promesa de Apocalipsis 21:4 anhelan más.",
      cierre: "Guíanos, Cordero, a fuentes de agua viva.",
    },
    ven: {
      apertura: "¿Qué significa que «al que viene a mí, nunca lo echo fuera»?",
      seguimiento: "¿Cuál es tu respuesta hoy a su «Ven»?",
      ilustracion: "La Biblia termina con una invitación y una promesa: «¡Ven!» y «vengo en breve».",
      transicion: "Si respondemos «vengo», querremos que otros también vengan.",
      actividad: "Inviten a cada uno a responder en silencio al «Ven» de Jesús.",
      cierre: "¡Amén! ¡Ven, Señor Jesús!",
    },
    esperanza: {
      apertura: "¿Por qué no se puede compartir una esperanza que uno no tiene?",
      seguimiento: "¿Quién necesita escuchar de la esperanza del Cielo?",
      ilustracion: "«El que oye, diga: ¡Ven!» El que recibió la invitación, la pasa.",
      transicion: "Cerramos el trimestre guardando lo que nos sostendrá.",
      actividad: "Comprométanse a compartir la esperanza con una persona pronto.",
      cierre: "Haznos portadores de tu esperanza.",
    },
    ancla: {
      apertura: "¿Qué de este trimestre quieres recordar más?",
      seguimiento: "¿Cómo te sostiene saber que él completará la obra que empezó?",
      ilustracion: "«El que comenzó la buena obra la perfeccionará hasta el día de Jesucristo».",
      transicion: "Con la mira fija, esperamos con fe.",
      actividad: "Que cada uno comparta una sola cosa que se lleva del trimestre.",
      cierre: "Termina en nosotros, Señor, la obra que empezaste.",
    },
  },
};

export default l13;
