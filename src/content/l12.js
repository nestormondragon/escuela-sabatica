/* =================================================================
   LECCIÓN 12 · COMPÁRTELO · para el 20 de junio de 2026
   El artefacto: "Mi Luz" — una llama que enciende a otras.
   Isaías 50:4 · lengua de sabios para hablar palabra de aliento al cansado.
   Escena: una sola chispa en la oscuridad que se aviva y enciende a
   otras hasta volverse un resplandor compartido.
   ================================================================= */

function lcFirst(str) {
  const s = String(str || "");
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export const l12 = {
  id: "l12",
  number: 12,
  quarter: "2026-Q2",
  slug: "compartelo",
  weekStart: "2026-06-13",
  forDate: "2026-06-20",

  title: "Compártelo",
  subtitle: "Una luz no se guarda: se comparte.",
  kitName: "Mi Luz",
  artifact: { noun: "luz" },
  ui: {
    start: "Empezar a encender mi luz",
    emptyKit: "Tu luz",
    building: "Cada elección enciende una parte",
    buildingHint: "Toca la pieza que brilla. Verás la oscuridad volverse resplandor.",
    lastPiece: "Falta una chispa",
    patternLabel: "Tu patrón al compartir",
    doneTitle: "Tu luz está encendida",
    doneSub: "La encendiste tú, con Dios. Ahora compártela.",
    open: "Abrir mi luz",
    back: "Volver a mi luz",
  },

  centerpiece: "light",
  scene: {
    motif: "flame",
    shader: {
      sunX: 0.5, hasSea: false,
      stormTop: [0.04, 0.035, 0.05], stormBot: [0.10, 0.08, 0.07],
      dawnTop: [0.20, 0.13, 0.10], dawnBot: [0.96, 0.72, 0.42],
      sun: [1.0, 0.80, 0.45],
    },
  },
  stages: ["chispa", "firme", "alcanza", "enciende", "resplandor"],
  stageLabel: {
    chispa: "Una chispa en la oscuridad",
    firme: "La llama se afirma",
    alcanza: "La luz se extiende",
    enciende: "Enciende a otro",
    resplandor: "Resplandor compartido",
  },

  verse: {
    ref: "Isaías 50:4",
    text:
      "Dios, el Señor, me dio lengua de sabios para saber hablar palabra de aliento al cansado; mañana tras mañana despierta mi oído para que oiga como los sabios.",
  },

  promise:
    "En unos minutos vas a encender tu Luz: verás cómo te ven los demás, recordarás lo que Dios ha hecho en ti, hallarás tu motivo, elegirás a una persona, darás un paso natural, sostendrás la esperanza por quien se alejó, y dejarás que tu vida hable.",

  slots: [
    { id: "reflejo",    n: 1, label: "Mi reflejo",         teaser: "Cómo me ven cuando no me observo…",       icon: "eye",      station: "reflejo" },
    { id: "testimonio", n: 2, label: "Lo que no puedo callar", teaser: "Lo que Dios ha hecho en mí…",         icon: "flame",    station: "testimonio" },
    { id: "motivo",     n: 3, label: "Mi motivo",          teaser: "Amor que invita, no presión que fuerza…", icon: "heart",    station: "motivo" },
    { id: "persona",    n: 4, label: "Mi persona",         teaser: "Alguien concreto a quien acercarme…",     icon: "hand",     station: "persona" },
    { id: "paso",       n: 5, label: "Mi paso natural",    teaser: "El primer puente, sin forzar…",           icon: "path",     station: "paso" },
    { id: "errante",    n: 6, label: "El que se alejó",    teaser: "Por quién no me rindo…",                  icon: "compass",  station: "errante" },
    { id: "oracion",    n: 7, label: "Mi oración por ellos", teaser: "Lo que entrego y lo que pido…",         icon: "sunrise",  station: "oracion" },
    { id: "argumento",  n: 8, label: "Mi vida que habla",  teaser: "Una acción amorosa esta semana…",         icon: "footstep", station: "argumento" },
  ],

  stations: [
    /* 1 · SÁBADO — el pastor y el tráfico */
    {
      id: "reflejo",
      slot: "reflejo",
      day: "Sábado · El pastor y el tráfico",
      tag: "Casillero 1 · Mi reflejo",
      title: "Cuando crees que nadie te ve",
      story:
        "Un pastor, apurado camino a la iglesia, levantó el puño contra otro conductor. Minutos después lo reconoció: era un visitante, sentado en su clase. Toda interacción —con conocidos o extraños— debería estar revestida del amor que fluye de una relación con Dios.",
      module: {
        type: "choiceInsight",
        privacy: true,
        prompt: "¿Cuándo te pareces menos a Jesús con los extraños?",
        hint: "Elige el momento más sincero",
        saveLabel: "Guardar en mi luz",
        seedSub: "tu reflejo",
        closing:
          "Nunca sabes cómo tus acciones —sobre todo si eres creyente— afectan a otros. Tu testimonio empieza antes de que abras la boca.",
        options: [
          { id: "trafico", label: "Al volante, con prisa", insight: "La prisa desnuda el corazón. Lo que sale bajo presión revela lo que vive dentro, no lo que aparentamos el sábado.", tags: ["react:control", "theme:self", "posture:proud", "tone:raw"] },
          { id: "servicio", label: "Cuando me atienden mal", insight: "El mostrador, la fila, la llamada: ahí el evangelio se predica con el tono de tu voz más que con tus palabras.", tags: ["react:pride", "theme:relationship", "posture:proud", "tone:raw"] },
          { id: "casa",    label: "En casa, con los míos", insight: "Los que más nos ven son los más difíciles de impresionar — y los que más necesitan ver a Cristo en ti.", tags: ["react:apathy", "theme:relationship", "posture:avoidant", "tone:tender"] },
          { id: "online",  label: "En redes, escribiendo", insight: "Detrás de una pantalla bajamos la guardia. Pero también ahí alguien cansado puede leer una palabra de aliento… o una de desprecio.", tags: ["react:pride", "theme:self", "posture:proud", "tone:raw"] },
          { id: "iglesia", label: "Con los de la iglesia", insight: "A veces somos más ásperos con los de adentro. El amor que practicamos entre hermanos es el primer sermón que el visitante escucha.", tags: ["react:pride", "theme:relationship", "posture:humble", "tone:tender"] },
        ],
      },
    },

    /* 2 · DOMINGO — por testimonio */
    {
      id: "testimonio",
      slot: "testimonio",
      day: "Domingo · Por testimonio",
      tag: "Casillero 2 · Lo que no puedo callar",
      title: "«Lo que hemos visto y oído»",
      story:
        "«No podemos dejar de decir lo que hemos visto y oído» (Hech. 4:20). Pedro y Juan no eran cultos ni elocuentes; «habían estado con Jesús» (Hech. 4:13). El testimonio no es predicar en la calle: es contar lo que Dios ha hecho y está haciendo en ti.",
      module: {
        type: "choiceInsight",
        prompt: "¿Qué ha hecho Dios en ti que no puedes callar?",
        hint: "Esa es tu mejor noticia para compartir",
        saveLabel: "Guardar en mi luz",
        seedSub: "lo que no callas",
        closing:
          "Él te redimió, te llamó por tu nombre, y eres suyo. ¿Puede haber mejor noticia que esa? El Espíritu da audacia a las palabras sencillas.",
        options: [
          { id: "paz",      label: "Me dio paz en la tormenta", insight: "Una paz que el mundo no puede dar ni quitar es un argumento que nadie puede refutar.", tags: ["theme:hope", "posture:surrendering", "tone:tender"] },
          { id: "perdon",   label: "Me perdonó y me cambió",    insight: "El antes y el después de tu propia vida es el estudio bíblico más convincente que existe.", tags: ["theme:grace", "posture:humble", "tone:tender"] },
          { id: "compania", label: "Nunca me dejó solo",        insight: "«Nunca te dejaré» deja de ser teoría cuando puedes decir: a mí me sostuvo.", tags: ["theme:relationship", "posture:clinging", "tone:tender"] },
          { id: "proposito",label: "Le dio sentido a mi vida",  insight: "En un mundo que busca propósito, tú encontraste uno. Eso es luz para el que anda a tientas.", tags: ["theme:service", "posture:seeking", "tone:resolute"] },
          { id: "sanidad",  label: "Sanó algo en mí",           insight: "No tienes que entenderlo todo para contarlo. Basta decir: «yo era así, y mírame ahora».", tags: ["theme:grace", "posture:surrendering", "tone:raw"] },
        ],
      },
    },

    /* 3 · LUNES — sin fuerza, pero con poder */
    {
      id: "motivo",
      slot: "motivo",
      day: "Lunes · Sin fuerza, pero con poder",
      tag: "Casillero 3 · Mi motivo",
      title: "Amor que invita, nunca fuerza",
      story:
        "«Al ver a las multitudes, sintió compasión» (Mat. 9:36). El amor movió a Jesús. Pero él nunca obligó a nadie: no forzó a Adán, ni a los antediluvianos, ni a Israel. «No es parte de la misión de Cristo obligar a los hombres a recibirlo» (E. White).",
      module: {
        type: "skillThenCommit",
        saveLabel: "Guardar en mi luz",
        seedSub: "tu motivo",
        skill: {
          prompt: "Entrena el oído: ¿amor que invita… o presión que fuerza?",
          hint: "La coerción es contraria al carácter de Dios.",
          badge: "Estás aprendiendo a compartir como Jesús",
          cats: ["Amor que invita", "Presión que fuerza"],
          rounds: [
            { t: "«Si no aceptas esto, te vas a perder.»", a: 1, fb: "Presión: el miedo manipula; el amor atrae." },
            { t: "«Vi que estabas pasando algo difícil; quería orar por ti.»", a: 0, fb: "Invitación: empiezas por la necesidad, como Jesús." },
            { t: "«Te mando estos diez videos, míralos todos hoy.»", a: 1, fb: "Presión: abrumar no es amar; respeta el ritmo del otro." },
            { t: "«¿Te gustaría que leyéramos juntos una promesa de la Biblia?»", a: 0, fb: "Invitación: una puerta abierta, no un empujón." },
            { t: "«Ganaste la discusión, así que ya no tienes excusa.»", a: 1, fb: "Presión: vencer un argumento no gana un corazón." },
            { t: "«Aquí estoy cuando quieras hablar, sin apuro.»", a: 0, fb: "Invitación: la paciencia es el lenguaje del Pastor." },
          ],
          summary:
            "Jesús satisfizo necesidades y luego invitó a seguirlo. Nunca obligó. Tampoco te abandonó. Tu testimonio personal es lo que más influye (Apoc. 12:11).",
        },
        commit: {
          prompt: "¿Cuál será tu motivo al compartir?",
          hint: "Que el amor —no el deber ni el debate— te mueva",
          placeholder: "compasión por…, gratitud por…",
          extraKey: "motivoTexto",
          options: [
            "Compasión, como la de Jesús",
            "Gratitud por lo que recibí",
            "Que nadie se pierda lo que yo hallé",
            "Amor, sin esperar nada a cambio",
          ],
        },
      },
    },

    /* 4 · MARTES — ¿con quién? */
    {
      id: "persona",
      slot: "persona",
      day: "Martes · Consejos para compartir",
      tag: "Casillero 4 · Mi persona",
      title: "¿Con quién compartes a Jesús?",
      story:
        "¿Con el cartero, con quien te atiende, con quien ves al pasear? Dios llama a cada creyente a colaborar con él y promete darte «lengua de sabios para hablar palabra de aliento al cansado» (Isa. 50:4).",
      module: {
        type: "commitDuo",
        saveLabel: "Guardar en mi luz",
        seedSub: "tu persona",
        stepPrompt: "Una persona concreta a quien acercarme",
        stepHint: "Un nombre o una relación basta",
        stepOptions: [
          "Un familiar",
          "Un vecino",
          "Alguien del trabajo",
          "Un amigo que sufre",
          "Alguien que veo a diario",
        ],
        stepPlaceholder: "un nombre…",
        stepExtraKey: "personaNombre",
        personPrompt: "¿Qué sé de su necesidad o su carga?",
        personHint: "Empieza por su necesidad, como hizo Jesús",
        personPlaceholder: "está cansado de…, busca…",
        personExtraKey: "personaNecesidad",
      },
    },

    /* 5 · MARTES tips — el paso natural */
    {
      id: "paso",
      slot: "paso",
      day: "Martes · Evangelismo de la amistad",
      tag: "Casillero 5 · Mi paso natural",
      title: "El primer puente",
      story:
        "Desarrolla amistad. Ora por la persona. Habla con naturalidad de tu fe. Conéctala con tu comunidad. Atiende su necesidad. No te precipites, pero tampoco te retrases (1 Ped. 3:15).",
      module: {
        type: "pickReveal",
        saveLabel: "Guardar en mi luz",
        seedSub: "tu primer paso",
        prompt: "¿Cuál será tu primer paso natural con esa persona?",
        hint: "Toca cada uno · elige por dónde empezar",
        chooseLabel: "Empezaré por aquí",
        closing:
          "Al principio basta compartir una promesa o responder una pregunta: eso abre la puerta a diálogos más profundos. Ora para que ocurra.",
        allowCustom: { label: "Escribir el mío", placeholder: "mi primer paso será…", extraKey: "pasoPropio" },
        items: [
          { t: "Cultivar la amistad", ref: "Evangelismo de la amistad", meaning: "Tu calidez y tu interés genuino la acercan a Dios antes que cualquier argumento." },
          { t: "Orar por ella en secreto", ref: "Colaborar con el Espíritu", meaning: "Pide que el Espíritu obre en su corazón y cree oportunidades naturales para hablar." },
          { t: "Contar mi experiencia", ref: "Sin forzar", meaning: "Habla de lo que Dios hizo en ti cuando surja el tema, con audacia y delicadeza." },
          { t: "Atender una necesidad", ref: "Como Jesús (Mat. 4:23-25)", meaning: "Jesús satisfizo necesidades y luego invitó. El servicio abre el corazón." },
          { t: "Invitarla a la comunidad", ref: "Un grupo pequeño", meaning: "Que experimente la aceptación de una familia de fe; un estudio en grupo es un buen paso." },
        ],
      },
    },

    /* 6 · MIÉRCOLES — un hijo errante */
    {
      id: "errante",
      slot: "errante",
      day: "Miércoles · Un hijo errante",
      tag: "Casillero 6 · El que se alejó",
      title: "Esperanza para tu futuro",
      story:
        "Efraín se apartó del Señor; Raquel lloró por él. Pero Dios respondió: «Reprime tu voz del llanto… esperanza hay para tu futuro: los hijos volverán» (Jer. 31:16, 17). Dios no se da por vencido; su compasión nunca falla.",
      module: {
        type: "perspectiveFlip",
        saveLabel: "Guardar en mi luz",
        seedSub: "la esperanza que sostienes",
        prompt: "Toca cada carta para ver lo que Dios ve en el que se alejó",
        hint: "Tu mirada y la de Dios sobre la misma persona",
        pairs: [
          { see: "Ves a alguien perdido sin remedio.", sees: "Dios ve a un hijo por quien aún espera." },
          { see: "Sientes que tus oraciones no sirven.", sees: "«Recompensa hay para tu trabajo», dice el Señor." },
          { see: "Crees que ya pasó demasiado tiempo.", sees: "Su compasión nunca falla, una y otra vez." },
          { see: "Piensas que se fue para siempre.", sees: "«Los hijos volverán a su tierra» (Jer. 31:17)." },
        ],
        chooseLabel: "Esta es la esperanza que sostengo",
        teach:
          "En lugar de llorar por su hijo descarriado, a Raquel se le dice que tenga esperanza. Esa persona es objeto de la más tierna compasión de Dios.",
        commit: {
          prompt: "Escribe una oración corta por quien se alejó",
          hint: "Entrega a Dios tu tristeza; pide su amor por ellos",
          placeholder: "Señor, por ___: trae esperanza a su futuro…",
          extraKey: "oracionErrante",
          shareable: false,
        },
      },
    },

    /* 7 · JUEVES — recuperados */
    {
      id: "oracion",
      slot: "oracion",
      day: "Jueves · Recuperados",
      tag: "Casillero 7 · Mi oración por ellos",
      title: "El argumento más poderoso",
      story:
        "Las oraciones de Jesús por Pedro cambiaron su futuro (Luc. 22:31, 32). «Ninguna influencia ejerce tanto poder sobre el alma como una vida abnegada. El argumento más poderoso en favor del evangelio es un cristiano amante y amable» (E. White).",
      module: {
        type: "pickReveal",
        saveLabel: "Guardar en mi luz",
        seedSub: "lo que entregas a Dios",
        prompt: "¿Qué necesitas entregar a Dios para amar mejor a esa persona?",
        hint: "Pídele que reemplace eso por su amor",
        chooseLabel: "Esto entrego",
        closing:
          "Pide a Dios que te cubra con su carácter, para desarrollar una actitud amorosa e interesada en el bien de ellos (Ef. 3:17-19).",
        allowCustom: { label: "Escribir el mío", placeholder: "entrego a Dios mi…", extraKey: "entregoPropio" },
        items: [
          { t: "Mi juicio sobre ellos", ref: "Romanos 14:4", meaning: "Soltar el veredicto deja espacio para que Dios trabaje y para que yo ame." },
          { t: "Mi frustración e impotencia", ref: "Salmo 55:22", meaning: "Lo que no puedo cambiar lo pongo en manos de Aquel que sí puede." },
          { t: "Mi miedo por su futuro", ref: "Jeremías 31:17", meaning: "El miedo me cierra; la esperanza me abre a seguir amándolos." },
          { t: "Mi necesidad de tener razón", ref: "1 Corintios 13", meaning: "Ganar la discusión no gana el corazón; el amor sí." },
        ],
      },
    },

    /* 8 · VIERNES — mi vida que habla */
    {
      id: "argumento",
      slot: "argumento",
      day: "Viernes · Para estudiar y meditar",
      tag: "Casillero 8 · Mi vida que habla",
      title: "Cuando el yo se sumerge en Cristo",
      story:
        "«Cuando el yo está sumergido en Cristo, el amor brota espontáneamente» (E. White). No amamos a otros esforzándonos por amar, sino dejando que el amor de Cristo llene el corazón. El servicio nos hace crecer en devoción.",
      module: {
        type: "commitDuo",
        saveLabel: "Encender mi luz",
        seedSub: "tu acción de amor",
        stepPrompt: "Una acción amorosa concreta esta semana",
        stepHint: "Tu vida será el argumento; toca una idea o escribe la tuya",
        stepOptions: [
          "Escuchar sin juzgar a alguien",
          "Servir una necesidad concreta",
          "Enviar una palabra de aliento",
          "Invitar a alguien a casa o a la iglesia",
          "Pedir perdón a quien herí",
        ],
        stepPlaceholder: "mi acción de amor…",
        stepExtraKey: "accionTexto",
        personPrompt: "¿Cuándo lo harás?",
        personHint: "Un compromiso concreto se cumple; uno vago se olvida",
        personPlaceholder: "hoy, el martes, esta semana…",
        personExtraKey: "accionCuando",
      },
    },
  ],

  encourage: [
    "«La palabra de Dios no volverá a él vacía, sino que hará lo que él quiere.» — Isaías 55:11",
    "«No podemos dejar de decir lo que hemos visto y oído.» — Hechos 4:20",
    "«Esperanza hay para tu futuro: los hijos volverán.» — Jeremías 31:17",
    "«Su palabra fue en mi corazón como un fuego ardiente.» — Jeremías 20:9",
    "«El argumento más poderoso del evangelio es un cristiano amante y amable.» — E. White",
    "«Vosotros sois la luz del mundo.» — Mateo 5:14",
    "«Lengua de sabios para hablar palabra de aliento al cansado.» — Isaías 50:4",
    "«Amados, amémonos unos a otros, porque el amor es de Dios.» — 1 Juan 4:7",
  ],

  pattern(state) {
    const s = state.slots || {};
    const persona = s.persona ? lcFirst(s.persona) : "alguien cercano";
    const paso = s.paso ? lcFirst(s.paso) : "acercarte con amor";
    const motivo = s.motivo ? lcFirst(s.motivo) : "el amor";
    return `Tu luz no se queda quieta: te mueve hacia ${persona}. Empezarás por ${paso}, movido por ${motivo}. Y mientras compartes lo que recibiste, tu propia llama arde más fuerte.`;
  },

  outputs(state) {
    const s = state.slots || {};
    const e = state.extra || {};
    const persona = e.personaNombre || "alguien que Dios pondrá en mi camino";
    const necesidad = e.personaNecesidad ? ` que ${lcFirst(e.personaNecesidad)}` : "";
    const testimonio = lcFirst(s.testimonio || "lo que Dios ha hecho en mí");
    const paso = lcFirst(s.paso || "cultivar la amistad");
    const accion = (e.accionTexto || s.argumento || "una acción amorosa").toString();
    const cuando = e.accionCuando ? ` (${e.accionCuando.trim()})` : "";

    const oracion = `Señor, gracias porque ${testimonio}. No puedo callarlo. Pon en mí compasión por ${lcFirst(persona)}${necesidad}. Dame lengua de sabios para hablar palabra de aliento al cansado, y delicadeza para no forzar. Que mi vida hable de ti. En el nombre de Jesús, amén.`;

    const aliento = (e.oracionErrante || "").trim() || `No me rindo contigo. Hay esperanza para tu futuro, porque Dios no se ha dado por vencido.`;
    const accion24 = `Esta semana voy a ${lcFirst(accion)}${cuando}, empezando por ${paso}.`;
    const pregunta = `Esta semana descubrí que Dios me llama a acercarme a ${lcFirst(persona)}. ¿Por qué crees que «un cristiano amante y amable» es el argumento más poderoso del evangelio?`;
    const tarjeta = `Mi luz de esta semana: comparto lo que recibí —${testimonio}— empezando por ${paso}.\nVersículo: «${this.verse.text}» (${this.verse.ref}).`;

    return { oracion, aliento, accion24, pregunta, tarjeta };
  },

  discussion: [
    "¿Por qué es el amor tan fundamental para cualquier testimonio eficaz?",
    "¿Has comprobado que ganar almas está vinculado a una experiencia personal y vibrante con Dios?",
    "¿Es necesaria una comprensión básica para compartir a Dios? Si es así, ¿cuál?",
    "¿Por dónde comenzarías un estudio con un no creyente: exponiendo doctrinas o invitándolo a conocer a Jesús?",
    "¿De qué maneras concretas estás proclamando a Cristo en tu vida diaria?",
  ],

  facilitator: {
    reflejo: {
      apertura: "¿Cómo puede una interacción de veinte minutos afectar el testimonio de toda una vida?",
      seguimiento: "¿En qué situación te cuesta más reflejar a Jesús?",
      ilustracion: "El pastor levantó el puño contra quien luego sería su alumno. Nunca sabemos quién observa.",
      transicion: "Si así nos ven, ¿qué tenemos para compartir? Lo que Dios ha hecho en nosotros.",
      actividad: "Que cada uno comparta una situación donde le cuesta reflejar a Cristo.",
      cierre: "Señor, reviste de tu amor cada interacción nuestra.",
    },
    testimonio: {
      apertura: "¿Por qué muchos creyentes callan lo que Dios ha hecho por ellos?",
      seguimiento: "¿Qué ha hecho Dios en ti que no puedes dejar de contar?",
      ilustracion: "Pedro y Juan no eran cultos; «habían estado con Jesús». Eso bastó.",
      transicion: "Si el testimonio es lo que Dios hizo en mí, ¿con qué motivo lo comparto?",
      actividad: "Cada uno cuenta en una frase «lo que no puede callar».",
      cierre: "Danos audacia para decir lo que hemos visto y oído.",
    },
    motivo: {
      apertura: "¿Cuál es la diferencia entre invitar y forzar?",
      seguimiento: "¿Te ha movido alguna vez el deber o el debate más que el amor?",
      ilustracion: "Jesús satisfizo necesidades y luego invitó; nunca obligó a nadie.",
      transicion: "Con el motivo correcto, ¿a quién nos envía Dios?",
      actividad: "Clasifiquen frases: ¿amor que invita o presión que fuerza?",
      cierre: "Que el amor, no la presión, sea nuestro método.",
    },
    persona: {
      apertura: "¿Con quién compartes a Jesús en tu vida diaria?",
      seguimiento: "¿Qué sabes de la necesidad de esa persona?",
      ilustracion: "Jesús empezaba por la necesidad de la gente, no por su doctrina.",
      transicion: "Elegida la persona, ¿cuál es el primer paso natural?",
      actividad: "Que cada uno nombre (si desea) a una persona por quien orar.",
      cierre: "Pon nombres en nuestro corazón, Señor.",
    },
    paso: {
      apertura: "¿Por qué el «evangelismo de la amistad» suele ser tan eficaz?",
      seguimiento: "¿Cuál sería tu primer paso natural, sin forzar?",
      ilustracion: "Una promesa compartida abre la puerta a diálogos más profundos.",
      transicion: "¿Y qué del que ya conoció a Dios y se alejó?",
      actividad: "Compartan un primer paso concreto para esta semana.",
      cierre: "Danos calidez y paciencia para tender puentes.",
    },
    errante: {
      apertura: "¿Cómo responde Dios al dolor por un hijo que se aleja?",
      seguimiento: "¿Por quién que se alejó necesitas recuperar la esperanza?",
      ilustracion: "A Raquel, en vez de llorar, se le dice: hay esperanza para tu futuro.",
      transicion: "Si hay esperanza, ¿qué hacemos con nuestra frustración?",
      actividad: "Oren en silencio por alguien que se alejó del Señor.",
      cierre: "Tú no te das por vencido; ayúdanos a no rendirnos.",
    },
    oracion: {
      apertura: "¿Cómo cambiaron las oraciones de Jesús el futuro de Pedro?",
      seguimiento: "¿Qué necesitas entregar a Dios para amar mejor a esa persona?",
      ilustracion: "El argumento más poderoso del evangelio es un cristiano amable.",
      transicion: "Si entregamos eso, nuestra vida misma empieza a hablar.",
      actividad: "Cada uno nombre algo que entrega a Dios respecto de un ser querido.",
      cierre: "Cúbrenos con tu carácter, Señor.",
    },
    argumento: {
      apertura: "¿Por qué no podemos amar a otros solo esforzándonos por amar?",
      seguimiento: "¿Qué acción amorosa concreta darás esta semana?",
      ilustracion: "Cuando el yo se sumerge en Cristo, el amor brota espontáneamente.",
      transicion: "Reunamos todo en una sola luz que se comparte.",
      actividad: "Compartan una acción de amor concreta para esta semana.",
      cierre: "Sumérgenos en Cristo, para que tu amor brote en nosotros.",
    },
  },
};

export default l12;
