import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 8,
  "slug": "la-fe",
  "title": "La Fe",
  "subtitle": "¿Confías en el que va en tu barca, aunque no lo veas?",
  "kitName": "Mi Barca",
  "artifactNoun": "barca",
  "motif": "boat",
  "stages": [
    "puerto",
    "vela",
    "viento",
    "rumbo",
    "travesia"
  ],
  "stageLabels": [
    "En el puerto",
    "Izando la vela",
    "El viento sopla",
    "Tomando el rumbo",
    "Mar adentro · por fe navego"
  ],
  "verseRef": "Hebreos 11:1",
  "verseText": "La fe es la certeza de lo que esperamos, la convicción de lo que no vemos.",
  "promise": "En unos minutos vas a armar tu Barca: nombrarás dónde está hoy tu fe, aprenderás qué la consolida en vez de lo que la hace dudar, descubrirás cómo Jesús ve la fe que se acerca, declararás que la fe no es un sentimiento sino una decisión, reunirás los testigos que te animan, pedirás humildemente la fe de Jesús, anclarás tu certeza y darás un paso concreto para zarpar esta semana, {name}.",
  "ui": {
    "start": "Empezar a armar mi barca",
    "emptyKit": "Tu barca",
    "building": "Cada elección arma una pieza",
    "buildingHint": "Toca la pieza que brilla. Verás la barca tomar forma y zarpar mar adentro.",
    "lastPiece": "Falta una pieza",
    "patternLabel": "Tu patrón en alta mar",
    "doneTitle": "Tu barca está lista para zarpar",
    "doneSub": "La armaste tú, con Dios. Ábrela, guárdala, compártela.",
    "open": "Abrir mi barca",
    "back": "Volver a mi barca"
  },
  "slots": [
    {
      "id": "estado",
      "n": 1,
      "label": "Dónde está mi fe hoy",
      "teaser": "Cómo describiría mi fe en 60 segundos…",
      "icon": "compass"
    },
    {
      "id": "senal",
      "n": 2,
      "label": "Lo que consolida mi fe",
      "teaser": "Dejar de pedir señales y mirar lo que ya tengo…",
      "icon": "eye"
    },
    {
      "id": "acercarse",
      "n": 3,
      "label": "La fe que se acerca",
      "teaser": "Cómo me acerco a Jesús de verdad…",
      "icon": "hand"
    },
    {
      "id": "decision",
      "n": 4,
      "label": "Mi decisión de creer",
      "teaser": "La fe no es un sentimiento, es una decisión…",
      "icon": "anchor"
    },
    {
      "id": "testigos",
      "n": 5,
      "label": "Mis testigos de fe",
      "teaser": "Lo que espero y aún no veo…",
      "icon": "book"
    },
    {
      "id": "fe_jesus",
      "n": 6,
      "label": "La fe de Jesús",
      "teaser": "Que su fe habite en mí…",
      "icon": "heart"
    },
    {
      "id": "ancla",
      "n": 7,
      "label": "Mi certeza anclada",
      "teaser": "La certeza de lo que no veo…",
      "icon": "rock"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Un paso concreto · a quién animo…",
      "icon": "footstep"
    }
  ],
  "stations": [
    {
      "id": "estado",
      "day": "Sábado · La fe como el wifi",
      "tag": "Casillero 1 · Dónde está mi fe hoy",
      "title": "Invisible, pero te conecta con lo que necesitas",
      "story": "Alguien dijo: «La fe es como el wifi: es invisible, pero tiene el poder de conectarte con lo que necesitas». Sin fe, la relación con Dios no es posible. ¿Cómo está tu fe hoy? ¿Tambalea como un tallo frágil, o florece como una rosa que perfuma todo lo que toca? La fe no la fabricas tú: es un don de Dios (Efe. 2:8), posible solo por lo que él ya hace en ti y por ti.",
      "cue": "Detente aquí, {name}. ¿Cómo está tu fe hoy, de verdad?",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "Si describieras tu fe en sesenta segundos, ¿qué dirías hoy?",
        "hint": "Elige la más sincera ahora mismo",
        "saveLabel": "Guardar en mi barca",
        "seedSub": "tu fe hoy",
        "closing": "«Dichosos los que no vieron y creyeron» (Juan 20:29). Dios no te pide fe ciega: ya te dio mil razones para creer. La clave es centrarte en lo que consolida la fe, no en lo que genera dudas.",
        "options": [
          {
            "id": "florece",
            "label": "Florece, como una rosa que perfuma",
            "insight": "Qué hermoso. Cuida ese jardín: la fe que crece llena de fragancia todo lo que la rodea. Sigue regándola con su Palabra.",
            "tags": [
              "theme:faith",
              "posture:surrendering",
              "tone:tender"
            ]
          },
          {
            "id": "tallo",
            "label": "Frágil, como un tallo que tiembla",
            "insight": "Aun la fe del tamaño de una semilla de mostaza mueve montañas (Mat. 17:20). Lo frágil no es lo mismo que lo muerto: solo necesita crecer, no morir.",
            "tags": [
              "theme:faith",
              "posture:clinging",
              "tone:tender"
            ]
          },
          {
            "id": "tambalea",
            "label": "Ha tambaleado y no sé cómo seguir",
            "insight": "No estás solo en eso. «¡Creo! ¡Ayuda mi poca fe!» (Mar. 9:24) es una de las oraciones más honestas de la Biblia, y Dios la respondió.",
            "tags": [
              "react:doubt",
              "theme:faith",
              "tone:raw"
            ]
          },
          {
            "id": "señales",
            "label": "Creería más si Dios me diera una señal",
            "insight": "Los judíos pidieron señales y Jesús suspiró (Mar. 8:12). Lo que necesitaban no era más evidencia, sino renovación espiritual. Quizá tú ya tienes todo lo que hace falta para creer.",
            "tags": [
              "react:doubt",
              "theme:faith",
              "posture:seeking"
            ]
          },
          {
            "id": "rutina",
            "label": "Tibia · más rutina que relación",
            "insight": "La cercanía a la iglesia no es lo mismo que la fe. Dios te invita a una experiencia genuina, real, momento a momento con él, no a una costumbre vacía.",
            "tags": [
              "react:apathy",
              "theme:relationship",
              "tone:raw"
            ]
          },
          {
            "id": "tormenta",
            "label": "Confío incluso en la tormenta",
            "insight": "Esa es la fe sólida: creer y confiar no solo en los buenos momentos, sino en la oscuridad y la tormenta, aunque no entiendas del todo lo que pasa.",
            "tags": [
              "theme:faith",
              "posture:surrendering",
              "tone:resolute"
            ]
          },
          {
            "id": "razono",
            "label": "Necesito entenderlo todo primero",
            "insight": "Dios no elude la razón: dialogó con Abraham, Moisés y Job. Pero hay un punto donde la lógica termina y empieza la fe, una fe sólida y razonable.",
            "tags": [
              "react:control",
              "theme:self",
              "posture:seeking"
            ]
          },
          {
            "id": "lejos",
            "label": "Siento que estoy lejos de Dios",
            "insight": "Precisamente cuando piensas que estás lejos es cuando más necesitas ejercitar la fe e invocarlo, como el padre de Marcos 9:24. El sentimiento no es la medida.",
            "tags": [
              "react:withdraw",
              "theme:relationship",
              "tone:raw"
            ]
          }
        ]
      }
    },
    {
      "id": "senal",
      "day": "Domingo · ¡Solo dame una señal!",
      "tag": "Casillero 2 · Lo que consolida mi fe",
      "title": "Las señales ya están a tu alrededor",
      "story": "«Si pudiera ver dividirse el Mar Rojo, o el maná caer, o a Jesús sanar a un ciego, creería». Pero los israelitas no tenían la Biblia entera ni seis mil años de historia para mirar atrás, como tú. Cada generación pide una señal. Jesús, al verla pedir, suspiró profundamente (Mar. 8:12). No necesitaban más evidencia externa, sino renovación espiritual. ¿Y si tú ya tienes lo que hace falta para creer?",
      "cue": "{name}, deja de buscar la señal y mira lo que ya está en tus manos.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi barca",
        "seedSub": "lo que consolida mi fe",
        "prompt": "Elige lo que consolidará tu fe esta semana, en vez de lo que genera dudas",
        "hint": "Toca cada uno · quédate con el que más necesitas",
        "chooseLabel": "En esto centraré mi fe",
        "closing": "«Dichosos los que no vieron y creyeron» (Juan 20:29). En lugar de hacer suspirar a Jesús por nuestra falta de fe, centrémonos en lo que la consolida: él ya nos dio muchas razones para creer.",
        "allowCustom": {
          "label": "Escribir el mío",
          "placeholder": "Lo que consolida mi fe es…",
          "extraKey": "senalPropia"
        },
        "items": [
          {
            "t": "Mirar atrás y recordar la bondad de Dios",
            "ref": "Deut. 8:2, 3",
            "meaning": "Moisés insistió en recordar la guía de Dios. Tu propia historia es un altar de evidencias que el miedo te hace olvidar."
          },
          {
            "t": "Las profecías que se cumplen ante mis ojos",
            "ref": "Mateo 24",
            "meaning": "Las señales prometidas se cumplen incluso ahora. No te falta evidencia: te falta detenerte a verla."
          },
          {
            "t": "Toda la Biblia en mis manos",
            "ref": "Juan 20:30, 31",
            "meaning": "Estas cosas se escribieron para que creas. Tienes seis mil años de historia que los israelitas jamás tuvieron."
          },
          {
            "t": "Una renovación espiritual, no más evidencia",
            "ref": "Juan 20:29",
            "meaning": "Ninguna prueba externa puede beneficiarte si el corazón no se renueva. Lo que necesitas es una experiencia viva con Dios."
          }
        ]
      }
    },
    {
      "id": "acercarse",
      "day": "Lunes · Jesús ve nuestra fe",
      "tag": "Casillero 3 · La fe que se acerca",
      "title": "Jesús discierne lo que hay en el corazón",
      "story": "Seguir a Jesús no garantiza que tu fe sea sólida: muchos decían creer, y él veía lo que de verdad había en sus corazones (Juan 2:23-25). Compara la fe encogida de los discípulos (Mar. 4:40) con la fe audaz de la mujer cananea (Mat. 15:21-28) y la del centurión (Luc. 7:1-10). En cada encuentro, Jesús percibió la fe, o la falta de ella, e hizo milagros para honrarla o fortalecerla.",
      "cue": "Acércate de verdad, {name}. Jesús ve tu fe, no tu disfraz.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi barca",
        "seedSub": "tu fe que se acerca",
        "skill": {
          "prompt": "Entrena el oído: ¿fe que Jesús honra… o incredulidad que lo hace suspirar?",
          "hint": "Él discierne lo que de verdad hay en el corazón.",
          "badge": "Estás aprendiendo a reconocer la fe que Jesús ve",
          "cats": [
            "Fe que Jesús honra",
            "Incredulidad acariciada"
          ],
          "rounds": [
            {
              "t": "«Señor, di la palabra y mi siervo sanará; no soy digno de que entres.»",
              "a": 0,
              "fb": "Fe que Jesús honra: el centurión confió en su sola palabra (Luc. 7:7). Jesús se admiró de él."
            },
            {
              "t": "«Ya verás que nada va a cambiar, como siempre.»",
              "a": 1,
              "fb": "Incredulidad acariciada: la duda sembrada produce su fruto y tiene un poder hechizante (E. White)."
            },
            {
              "t": "«Aunque me llames perrillo, hasta los perrillos comen las migajas.»",
              "a": 0,
              "fb": "Fe que Jesús honra: la cananea no se ofendió ni se retiró; insistió, y Jesús alabó su gran fe (Mat. 15:28)."
            },
            {
              "t": "«¡Creo! ¡Ayuda mi poca fe!»",
              "a": 0,
              "fb": "Fe que Jesús honra: honestidad pura. Reconoce la duda y aun así clama. Dios respondió esa oración (Mar. 9:24)."
            },
            {
              "t": "«Mejor no le pido nada; seguro no me escucha.»",
              "a": 1,
              "fb": "Incredulidad acariciada: el enemigo quiere que descartes la intervención de Dios. No te alejes solo porque dudas."
            },
            {
              "t": "«¿No te importa que perezcamos?»",
              "a": 1,
              "fb": "Incredulidad: como los discípulos, cuestionaban su amor estando él en la barca. Su silencio no es indiferencia."
            }
          ],
          "summary": "No fue la cercanía física lo que sanó a nadie, sino la fe que decidió acercarse. Jesús te dice lo mismo hoy: «Venid a mí todos los que estáis fatigados» (Mat. 11:28). Arranca de raíz cada incredulidad y siembra fe y amor en el terreno del corazón."
        },
        "commit": {
          "prompt": "¿Qué paso deliberado darás esta semana para acercarte a Jesús con fe?",
          "hint": "No basta verlo de lejos en la multitud. Acércate y tócalo.",
          "placeholder": "estudiar la Biblia cada día, contarle mi duda…",
          "extraKey": "pasoFe",
          "options": [
            "Estudiar la Biblia y orar cada día",
            "Contarle a Dios exactamente mi duda",
            "Pedirle que aumente mi fe (Luc. 17:5)",
            "Arrancar de raíz una incredulidad que acaricio",
            "Acercarme aunque no sienta nada"
          ]
        }
      }
    },
    {
      "id": "decision",
      "day": "Martes · La fe no es un sentimiento",
      "tag": "Casillero 4 · Mi decisión de creer",
      "title": "Una semilla de mostaza mueve montañas",
      "story": "Jesús dijo que una fe tan pequeña como una semilla de mostaza basta para mover montañas (Mat. 17:20). Diminuta, pero suficiente para lo sobrehumano. No es algo material que puedas fabricar, sino una respuesta humana que el Espíritu impulsa. Somos salvos por fe, respuesta a la gracia (Efe. 2:8). Y la fe no es un sentimiento: «el sentimiento de por sí no es fe» (E. White). Es la decisión de creer, aun en la oscuridad o la tormenta.",
      "cue": "Aquí, {name}, deja que esto te alcance: la fe es una decisión, no un humor.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "Si la fe es decisión y no sentimiento, ¿qué decides creer hoy?",
        "hint": "Elige la decisión que necesitas tomar",
        "saveLabel": "Guardar en mi barca",
        "seedSub": "tu decisión de creer",
        "closing": "«Por fe andamos, no por vista» (2 Cor. 5:7). No esperes el sentimiento para creer: a ti te toca ejercitar la fe; el gozo y sus beneficios los da Dios a su tiempo. Léelo en voz alta como oración: Heb. 12:1, 2; 2 Crón. 15:7; Rom. 3:23-26; Luc. 7:50.",
        "options": [
          {
            "id": "elijo_creer",
            "label": "Elijo creer aunque no lo sienta",
            "insight": "Esa es la esencia de la fe. El padre de Marcos 9 no esperó sentirse fuerte: clamó. A ti te toca ejercitar la fe.",
            "tags": [
              "theme:faith",
              "posture:surrendering",
              "tone:resolute"
            ]
          },
          {
            "id": "no_me_dieron",
            "label": "Creía que no tenía fe porque no la siento",
            "insight": "No puedes decir «no tengo fe porque Dios no me la dio». Él reparte a cada uno una medida (Rom. 12:3). La tienes; ejercítala.",
            "tags": [
              "react:self-blame",
              "theme:faith",
              "tone:raw"
            ]
          },
          {
            "id": "tormenta_fe",
            "label": "Decido confiar en plena tormenta",
            "insight": "La fe es creer y confiar no solo en lo bueno, sino en la oscuridad. Es justo cuando te crees lejos cuando más debes invocarlo.",
            "tags": [
              "theme:faith",
              "posture:clinging",
              "tone:resolute"
            ]
          },
          {
            "id": "dependo_animo",
            "label": "Mi fe sube y baja con mi ánimo",
            "insight": "Los sentimientos nunca deben dominar tu relación con Dios. Anclas tu fe en lo que él es y dijo, no en cómo amaneciste.",
            "tags": [
              "react:doubt",
              "theme:self",
              "tone:raw"
            ]
          },
          {
            "id": "gracia",
            "label": "Recibo que soy salvo por gracia, no por mí",
            "insight": "Somos salvos por fe, respuesta a la gracia manifestada en la cruz (Efe. 2:8). Esto está en el centro mismo de la relación con él.",
            "tags": [
              "theme:grace",
              "posture:humble",
              "tone:tender"
            ]
          },
          {
            "id": "pequena",
            "label": "Mi fe es pequeña, pero la ofrezco",
            "insight": "Una semilla de mostaza basta para mover montañas (Mat. 17:20). Si cooperas con él, hará que crezca. No la desprecies.",
            "tags": [
              "theme:faith",
              "posture:humble",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "testigos",
      "day": "Miércoles · Ejemplos de fe",
      "tag": "Casillero 5 · Mis testigos de fe",
      "title": "Hebreos 11, el gran capítulo de la fe",
      "story": "Dedica tiempo a Hebreos 11 leído en voz alta. La fe es la certeza de lo que esperas y la convicción de lo que no ves (v.1). Creer que existe el Dios creador debería ser de lo más fácil de asumir (v.3). Sin fe es imposible agradarle (v.6). Y los versículos 7 al 40 desfilan una nube de testigos cuya relación sólida con Dios tuvo un solo factor principal: la fe. Tú escribes hoy tu propio renglón.",
      "cue": "{name}, súmate a la nube de testigos: ¿qué esperas que aún no ves?",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi barca",
        "seedSub": "lo que espero y no veo",
        "prompt": "De los testigos de Hebreos 11, ¿con qué fe te identificas hoy?",
        "hint": "Toca cada uno · quédate con el que necesitas imitar",
        "chooseLabel": "Esta fe quiero imitar",
        "closing": "«Sin fe es imposible agradar a Dios» (Heb. 11:6). Una fe pequeña como semilla de mostaza es todo lo que necesitas para cultivar la relación con él. Comprométete a estudiar su Palabra y orar cada día, porque «la fe es por el oír» (Rom. 10:17).",
        "allowCustom": {
          "label": "Escribir lo mío",
          "placeholder": "Lo que espero hoy y aún no veo es…",
          "extraKey": "testigoPropio"
        },
        "items": [
          {
            "t": "Creer que Dios creó todo lo que veo",
            "ref": "Heb. 11:3",
            "meaning": "El universo entero salió de su palabra. Si él sostiene las estrellas, también sostiene tu pequeña tormenta."
          },
          {
            "t": "Obedecer aunque no entienda, como Noé",
            "ref": "Heb. 11:7",
            "meaning": "Construyó por algo que aún no se veía. La fe actúa antes de que aparezca la evidencia."
          },
          {
            "t": "Salir sin saber adónde voy, como Abraham",
            "ref": "Heb. 11:8",
            "meaning": "Partió confiando solo en quien lo llamaba. A veces el primer paso de fe es no exigir el mapa completo."
          },
          {
            "t": "Esperar lo que aún no puedo ver",
            "ref": "Heb. 11:1",
            "meaning": "La fe es la certeza de lo que esperas. Nombra tu anhelo eterno y tu necesidad inmediata, y entrégalos por fe."
          }
        ]
      }
    },
    {
      "id": "fe_jesus",
      "day": "Jueves · La fe de Jesús",
      "tag": "Casillero 6 · La fe de Jesús",
      "title": "Que él y su fe habiten en ti",
      "story": "El mensaje de los tres ángeles dice que el pueblo de Dios guarda sus mandamientos y tiene «la fe de Jesús» (Apoc. 14:12). Aunque Hebreos 11 enumera grandes creyentes, nadie tuvo una fe como la suya: en Getsemaní, «no se haga mi voluntad, sino la tuya» (Mat. 26:42). Tener la fe de Jesús es una experiencia diaria y vital con él, dejar que su fe habite en ti, porque tu fe puede ser endeble, pero él es digno (Apoc. 5:9).",
      "cue": "Inclínate aquí, {name}, y pide humildemente la fe de Jesús.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi barca",
        "seedSub": "la fe de Jesús en mí",
        "prompt": "Toca cada carta para cambiar tu fe endeble por la fe de Jesús",
        "hint": "Lo que tú aportas · lo que él provee",
        "pairs": [
          {
            "see": "Mi fe a veces es endeble y temblorosa.",
            "sees": "«Jesús es digno» (Apoc. 5:9), y su fe puede habitar en ti."
          },
          {
            "see": "Quiero obedecer, pero a duras penas.",
            "sees": "Tener su fe es obediencia que nace de una relación viva, no de la fuerza propia."
          },
          {
            "see": "Vivo mi fe a ratos, cuando me acuerdo.",
            "sees": "Su fe es experiencia diaria y vital: él en el centro de cada día."
          },
          {
            "see": "Me falta fe para agradar a Dios.",
            "sees": "Su fe te es acreditada por el don de su gracia a todos los que creen."
          }
        ],
        "chooseLabel": "Esta es la fe que necesito de él",
        "teach": "Tener la fe de Jesús es entender, y actuar en consecuencia, que solo si él es el centro de tu vida diaria tienes una relación salvadora con Dios. Justificados y santificados, todo por la fe.",
        "commit": {
          "prompt": "Haz de Hebreos 11:6 tu oración personal y escríbela con tus palabras",
          "hint": "«Señor, sin fe es imposible agradarte; vengo a ti y creo que me recompensarás si te busco». Así lo hago ahora.",
          "placeholder": "Señor, sin fe es imposible agradarte… vengo a ti y creo…",
          "extraKey": "oracionFe",
          "shareable": true
        }
      }
    },
    {
      "id": "ancla",
      "day": "El ancla de la fe",
      "tag": "Casillero 7 · Mi certeza anclada",
      "title": "La certeza de lo que no vemos",
      "story": "Reúne toda la semana: justificados por la fe (Rom. 5:1), santificados por la fe (Hech. 26:18), hechos hijos por la fe (Juan 1:12), viviendo por la fe en el Hijo de Dios (Gál. 2:20). «Nada parece tan débil, y sin embargo tan invencible, como el alma que confía por completo en los méritos del Salvador» (E. White). Ese ser, el más débil, se aferra al Cristo vivo, quien lo toma de la mano y nunca lo suelta. Echa el ancla.",
      "cue": "Echa el ancla aquí, {name}; que tu certeza muerda fondo firme.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Echar el ancla · guardar",
        "seedSub": "tu certeza anclada",
        "chain": [
          {
            "word": "Justificado",
            "line": "Por la fe eres perdonado y reconciliado con Dios (Rom. 5:1)."
          },
          {
            "word": "Santificado",
            "line": "Por la fe recibes poder para ser como Jesús (Hech. 26:18)."
          },
          {
            "word": "Hijo de Dios",
            "line": "Por la fe, al recibirlo, llegas a ser hijo suyo (Juan 1:12)."
          },
          {
            "word": "Invencible",
            "line": "El alma más débil que confía en sus méritos es la más invencible (E. White)."
          }
        ],
        "climax": "Y el Cristo vivo te toma de la mano y nunca te soltará: esa es la certeza de lo que no ves.",
        "prompt": "¿Cuál es la certeza que echarás como ancla?",
        "hint": "«La fe es la certeza de lo que esperamos, la convicción de lo que no vemos» (Heb. 11:1)",
        "options": [
          "Que él me tiene de la mano y no me soltará",
          "Que mi Redentor vive y vela por mí",
          "Que soy salvo por gracia, mediante la fe",
          "Que su fe sostiene la mía cuando flaquea"
        ],
        "allowCustom": {
          "placeholder": "mi certeza es…",
          "extraKey": "certezaPropia"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Casillero 8 · Mi paso de la semana",
      "title": "Cuando te sientes impotente, confía más",
      "story": "«Su fe debía ser fortalecida por la oración ferviente, el ayuno y la humillación del corazón… la súplica perseverante con una fe que confía completamente en él es la única que prevalece en la batalla» (E. White). Aférrate sin fluctuar a tu confesión de fe (Heb. 10:23). Cada vez que te sientes impotente, tienes la oportunidad de confiar más plenamente en Jesús. Da un paso, y anima a otro a creer.",
      "cue": "Antes de zarpar, {name}, elige un solo paso real para esta semana.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi barca",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto de esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Estudiar la Biblia y orar cada día",
          "Pedirle a Dios que aumente mi fe (Luc. 17:5)",
          "Aferrarme sin fluctuar a mi confesión de fe (Heb. 10:23)",
          "Confiar más cuando me sienta impotente",
          "Reclamar en voz alta un versículo como oración"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien cuya fe vacila y a quien animaré",
        "personHint": "Piensa en quién hoy necesita oír «cuando eres débil, él es fuerte»",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "animar"
      }
    }
  ],
  "encourage": [
    "«La fe es la certeza de lo que esperamos, la convicción de lo que no vemos.» — Hebreos 11:1",
    "«Dichosos los que no vieron y creyeron.» — Juan 20:29",
    "«¡Creo! ¡Ayuda mi poca fe!» — Marcos 9:24",
    "«Si tuviereis fe como un grano de mostaza… nada os sería imposible.» — Mateo 17:20",
    "«Por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.» — Efesios 2:8",
    "«La fe es por el oír, y el oír por la palabra de Dios.» — Romanos 10:17",
    "«Sin fe es imposible agradar a Dios.» — Hebreos 11:6",
    "«Por fe andamos, no por vista.» — 2 Corintios 5:7"
  ],
  "discussion": [
    "En la última cita de E. White, ¿qué cinco elementos se destacan para colaborar con el Espíritu Santo contra el enemigo (oración ferviente, ayuno, humillación del corazón, despojarse del yo, súplica perseverante)?",
    "¿Qué papel juega la fe en esa batalla espiritual? ¿Cómo lo ves operando ahora mismo en tu propia vida?",
    "Lee Hebreos 10:23. ¿Por qué es importante aferrarnos sin fluctuar a nuestra confesión de fe?",
    "¿Con qué frecuencia recuerdas que, cuando te sientes impotente, tienes la oportunidad de confiar más plenamente en Jesús?",
    "Si la fe no es un sentimiento sino una decisión, ¿en qué área de tu vida necesitas decidir creer aunque no sientas nada?",
    "¿Qué significa para ti, en lo cotidiano, tener «la fe de Jesús» y no solo fe en lo que él hizo?",
    "¿A quién, cuya fe hoy vacila, podrías animar esta semana, y cómo lo harás?"
  ],
  "facilitator": [
    {
      "stationId": "estado",
      "apertura": "Si tuvieran que describir su fe en sesenta segundos, ¿qué dirían hoy?",
      "seguimiento": "¿Ha tambaleado alguna vez tu fe hasta no saber cómo seguir?",
      "ilustracion": "La fe es como el wifi: invisible, pero te conecta con lo que necesitas. Y, como una rosa, puede pasar de un tallo frágil a una flor que perfuma.",
      "transicion": "Si pedimos pruebas para creer, veamos qué pasó cuando los fariseos pidieron una señal.",
      "actividad": "Que cada uno nombre, en una palabra, el estado de su fe hoy (si desea).",
      "cierre": "Señor, tú repartiste a cada uno una medida de fe; haz crecer la nuestra."
    },
    {
      "stationId": "senal",
      "apertura": "¿Por qué suspiró Jesús cuando los fariseos le pidieron una señal (Mar. 8:12)?",
      "seguimiento": "¿Qué señales y razones para creer ya tienes a tu alrededor y a veces ignoras?",
      "ilustracion": "Nosotros tenemos toda la Biblia y seis mil años de historia; los israelitas no. Lo que falta no es evidencia, sino renovación.",
      "transicion": "Si las señales ya están aquí, la pregunta es qué clase de fe ve Jesús en el corazón.",
      "actividad": "Lean Mateo 24 y nombren una profecía que se cumple ante sus ojos.",
      "cierre": "Renueva nuestro espíritu, Señor, más que nuestra vista."
    },
    {
      "stationId": "acercarse",
      "apertura": "Compara la fe de los discípulos (Mar. 4:40) con la de la cananea (Mat. 15) y el centurión (Luc. 7).",
      "seguimiento": "¿Qué paso deliberado puedes dar esta semana para acercarte a Jesús con fe?",
      "ilustracion": "Jesús discernía lo que de verdad había en los corazones (Juan 2:25). Veía la fe, o su ausencia, y obraba en consecuencia.",
      "transicion": "De la fe que se acerca pasamos a entender que la fe es decisión, no sentimiento.",
      "actividad": "Clasifiquen frases: ¿fe que Jesús honra o incredulidad acariciada?",
      "cierre": "Danos, Señor, la decisión de acercarnos de verdad, no de rozarte de paso."
    },
    {
      "stationId": "decision",
      "apertura": "¿Qué dice Efesios 2:8 sobre el papel de la fe, y por qué nadie puede decir «no tengo fe porque Dios no me la dio»?",
      "seguimiento": "¿En qué área necesitas decidir creer aunque no lo sientas?",
      "ilustracion": "Una semilla de mostaza es diminuta y, sin embargo, mueve montañas. El sentimiento de por sí no es fe.",
      "transicion": "Si la fe es decisión, miremos a los que decidieron creer: la nube de testigos de Hebreos 11.",
      "actividad": "Lean en voz alta Hebreos 12:1, 2 y Lucas 7:50 como un acto de fe.",
      "cierre": "A nosotros nos toca ejercitar la fe; el gozo lo das tú, Señor."
    },
    {
      "stationId": "testigos",
      "apertura": "Según Hebreos 11, ¿por qué la fe es el factor principal de la relación sólida de esos personajes con Dios?",
      "seguimiento": "¿Qué esperas hoy que aún no puedes ver, en lo inmediato y en lo eterno?",
      "ilustracion": "Noé construyó por algo invisible; Abraham salió sin saber adónde. La fe actúa antes de ver la evidencia.",
      "transicion": "Tras los grandes testigos, miramos al que ninguno igualó: la fe de Jesús.",
      "actividad": "Lean Hebreos 11 de corrido en voz alta y comenten el versículo 6.",
      "cierre": "Súmanos, Señor, a tu nube de testigos fieles."
    },
    {
      "stationId": "fe_jesus",
      "apertura": "¿Qué significa «la fe de Jesús» en Apocalipsis 14:12?",
      "seguimiento": "¿Cuánto deseas la fe de Jesús, y se lo has pedido humildemente a Dios?",
      "ilustracion": "En Getsemaní, Jesús oró «no se haga mi voluntad, sino la tuya». Nadie ha tenido una fe comparable a la suya.",
      "transicion": "Si su fe puede habitar en nosotros, echemos ancla en todo lo que recibimos por la fe.",
      "actividad": "Recen juntos Hebreos 11:6 como oración personal.",
      "cierre": "Haz que tu fe, Señor, habite en cada uno de nosotros."
    },
    {
      "stationId": "ancla",
      "apertura": "¿Qué recibimos por la fe: justificación, santificación, adopción, vida?",
      "seguimiento": "¿Cuál es la certeza que sostiene tu vida ahora mismo?",
      "ilustracion": "El alma más débil que confía por completo en los méritos del Salvador es la más invencible. Él la toma de la mano y nunca la suelta.",
      "transicion": "Con el ancla echada, demos un paso concreto para esta semana.",
      "actividad": "Reciten Hebreos 11:1 y nombren el eslabón que más necesitan.",
      "cierre": "Echamos el ancla de la fe en el Cristo vivo que no nos soltará."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué significa que, cuando te sientes impotente, tienes la oportunidad de confiar más en Jesús?",
      "seguimiento": "¿A quién, cuya fe vacila, podrías animar esta semana?",
      "ilustracion": "La súplica perseverante, con fe que confía del todo en él, es la única que prevalece en la batalla espiritual.",
      "transicion": "Reunamos todo en una Barca lista para zarpar y un paso de esta semana.",
      "actividad": "Compartan un solo paso concreto y el nombre de alguien a quien animarán.",
      "cierre": "Hazme fuerte en mi debilidad, Señor, y úsame para fortalecer la fe de otro."
    }
  ],
  "patternTemplate": "{name}, empezaste describiendo tu fe como {slot:estado|lower}, y ya estás aprendiendo a centrarte en lo que la consolida en vez de pedir señales. Decidiste creer aunque no lo sientas, sosteniendo {slot:decision|lower}. La fe del tamaño de una semilla está echando raíces: no es un sentimiento, es la decisión de confiar en el que va en tu barca.",
  "outOracion": "Señor, mi fe hoy es {slot:estado|lower}, y aun así vengo a ti. Dejo de exigir señales y elijo centrarme en {slot:senal|lower}. Como la mujer que tocó tu manto, decido acercarme de verdad y creer aunque no lo sienta: sostengo {slot:decision|lower}. Que tu propia fe habite en mí. Echo el ancla en esta certeza: {slot:ancla|lower}. Recuérdame que «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "No estás solo, y tu poca fe le basta a Jesús. Una semilla de mostaza mueve montañas. He aprendido que la fe no es un sentimiento, sino la decisión de creer que él va en mi barca aunque no lo vea. «¡Creo! ¡Ayuda mi poca fe!» (Mar. 9:24) es suficiente para empezar.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y voy a animar la fe de {slot:testigos|lower} recordándole que cuando es débil, Dios es fuerte.",
  "outPregunta": "Esta semana descubrí que mi fe estaba {slot:estado|lower}, pero estoy aprendiendo que es una decisión, no un sentimiento, y eché el ancla en {slot:ancla|lower}. ¿Cómo describirías tu fe hoy, y dónde la has anclado cuando no puedes ver?",
  "outTarjeta": "Mi barca de esta semana: aunque mi fe sea {slot:estado|lower}, decido creer y sostengo {slot:decision|lower}. Mi certeza anclada: {slot:ancla|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
