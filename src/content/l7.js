import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 7,
  "slug": "la-oracion",
  "title": "La Oración",
  "subtitle": "¿Subes a su presencia, o solo hablas al aire?",
  "kitName": "Mi Cielo Abierto",
  "artifactNoun": "cielo abierto",
  "motif": "sky",
  "stages": [
    "amanecer",
    "claros",
    "nubes",
    "estrellas",
    "cielo_pleno"
  ],
  "stageLabels": [
    "Primera luz",
    "Se abren los claros",
    "Atravesando las nubes",
    "Aparecen las estrellas",
    "El cielo se abre · Dios es tu refugio"
  ],
  "verseRef": "Salmo 62:8",
  "verseText": "Pueblos, esperen en él en todo tiempo, derramen ante él su corazón. Dios es nuestro refugio.",
  "promise": "En unos minutos vas a abrir tu Cielo: nombrarás tu vida de oración tal como es hoy, aprenderás a orar en la crisis como Elías, a confiar cuando parece no haber respuesta, a orar con la sencillez que Jesús enseñó, a llenar tus oraciones de alabanza y gratitud, a derribar las dudas que te frenan, y a echar el ancla de un cielo siempre abierto sobre ti.",
  "ui": {
    "start": "Empezar a abrir mi cielo",
    "emptyKit": "Tu cielo abierto",
    "building": "Cada elección abre un claro en el cielo",
    "buildingHint": "Toca la pieza que brilla. Verás el cielo despejarse de la primera luz al cielo pleno.",
    "lastPiece": "Falta un claro",
    "patternLabel": "Tu patrón de oración",
    "doneTitle": "Tu cielo está abierto",
    "doneSub": "Lo abriste tú, con Dios. Ábrelo, guárdalo, compártelo.",
    "open": "Abrir mi cielo abierto",
    "back": "Volver a mi cielo abierto"
  },
  "slots": [
    {
      "id": "vida_oracion",
      "n": 1,
      "label": "Mi vida de oración",
      "teaser": "Cómo hablo con Dios hoy…",
      "icon": "sunrise"
    },
    {
      "id": "crisis",
      "n": 2,
      "label": "Mi oración en la crisis",
      "teaser": "Cómo respondo cuando todo se derrumba…",
      "icon": "flame"
    },
    {
      "id": "espera",
      "n": 3,
      "label": "Mi espera",
      "teaser": "Lo que sostengo cuando no hay respuesta…",
      "icon": "cloud"
    },
    {
      "id": "modelo",
      "n": 4,
      "label": "El modelo de Jesús",
      "teaser": "Cómo me enseñó él a orar…",
      "icon": "hand"
    },
    {
      "id": "cuatro_voces",
      "n": 5,
      "label": "Mis cuatro voces",
      "teaser": "Alabanza, confesión, pedido, gratitud…",
      "icon": "book"
    },
    {
      "id": "dudas",
      "n": 6,
      "label": "Lo que me frena",
      "teaser": "La duda que dejo en la puerta…",
      "icon": "eye"
    },
    {
      "id": "refugio",
      "n": 7,
      "label": "Mi refugio",
      "teaser": "El cielo abierto sobre mí…",
      "icon": "anchor"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Un cambio concreto · a quién acompaño…",
      "icon": "footstep"
    }
  ],
  "stations": [
    {
      "id": "vida_oracion",
      "day": "Sábado · La Vid y los sarmientos",
      "tag": "Claro 1 · Mi vida de oración",
      "title": "¿Sigues conectado a la Vid?",
      "story": "La oración es la savia que sube de la Vid viva a la rama. «Si queremos crecer y fructificar, tenemos que absorber continuamente savia de la Vid, porque separados de ella no tenemos fuerza». Sin esa conexión, la rama se seca sin darse cuenta.",
      "cue": "Detente aquí, {name}, antes de empezar.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Cómo es tu vida de oración hoy, de verdad?",
        "hint": "Elige la más honesta ahora mismo",
        "saveLabel": "Guardar en mi cielo abierto",
        "seedSub": "tu vida de oración",
        "closing": "Dios escucha y siempre responde a su tiempo y de la manera perfecta, aunque no siempre como esperamos. Donde estés hoy, la Vid te sigue sosteniendo.",
        "options": [
          {
            "id": "seca",
            "label": "Seca · casi no oro",
            "insight": "La rama se seca despacio, sin ruido. Pero la Vid no te ha soltado: basta volver a apoyarte en ella hoy.",
            "tags": [
              "react:withdraw",
              "theme:prayer",
              "posture:avoidant",
              "tone:raw"
            ]
          },
          {
            "id": "emergencia",
            "label": "Solo en emergencias",
            "insight": "Acudir en la crisis no está mal; Elías lo hizo. Pero Dios anhela ser tu refugio diario, no solo el botón de auxilio.",
            "tags": [
              "react:cry-out",
              "theme:relationship",
              "posture:clinging",
              "tone:raw"
            ]
          },
          {
            "id": "rutina",
            "label": "Por costumbre · sin fervor",
            "insight": "Orar puede volverse hábito vacío. Jesús no quiere palabras memorizadas, sino un corazón derramado ante el Padre.",
            "tags": [
              "react:apathy",
              "theme:prayer",
              "posture:avoidant",
              "tone:tender"
            ]
          },
          {
            "id": "peticion",
            "label": "Casi siempre pidiendo",
            "insight": "Pedir es legítimo, pero Jesús enseñó a incluir mucho más: adoración, confesión y gratitud. Tu oración puede ensancharse.",
            "tags": [
              "react:control",
              "theme:prayer",
              "posture:seeking",
              "tone:tender"
            ]
          },
          {
            "id": "constante",
            "label": "Hablo con él a lo largo del día",
            "insight": "Esa conexión continua es la bendición de permanecer en la Vid. Cuídala: es tu fuente de fuerza.",
            "tags": [
              "theme:relationship",
              "posture:surrendering",
              "tone:resolute"
            ]
          },
          {
            "id": "anhelo",
            "label": "Quiero más, no sé cómo",
            "insight": "Ese anhelo ya es oración. «Señor, enséñanos a orar» fue la petición de los discípulos, y él la respondió.",
            "tags": [
              "react:cry-out",
              "theme:prayer",
              "posture:seeking",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "crisis",
      "day": "Domingo · Elías: la oración en la crisis",
      "tag": "Claro 2 · Mi oración en la crisis",
      "title": "Del fuego del Carmelo al miedo bajo el enebro",
      "story": "Un día Elías vio caer fuego del cielo en respuesta a su oración. Al siguiente, el temor a Jezabel lo derrumbó y pidió morir bajo un enebro. Y Dios, en lugar de reprenderlo, le envió pan, agua y descanso, y luego le habló en un silbo apacible (1 Reyes 19:5-12).",
      "cue": "{name}, deja que esta ternura de Dios te alcance hoy.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "Cuando todo se derrumba, mi oración suele sonar así…",
        "hint": "Elige la más sincera",
        "saveLabel": "Guardar en mi cielo abierto",
        "seedSub": "tu oración en la crisis",
        "closing": "A veces Dios responde de modos directos y poderosos; otras, en un silbo apacible. Sus caminos son más altos que los nuestros (Isa. 55:8,9), y aun cuando cedemos al desánimo, él acude con pan y ternura.",
        "options": [
          {
            "id": "rendirse",
            "label": "«Basta ya, quítame la vida»",
            "insight": "Las mismas palabras de Elías agotado. Dios no lo regañó: lo dejó dormir y lo alimentó. Tu cansancio no te descalifica.",
            "tags": [
              "react:withdraw",
              "theme:hope",
              "posture:clinging",
              "tone:raw"
            ]
          },
          {
            "id": "huir",
            "label": "Huyo · me escondo de todo",
            "insight": "Elías corrió un día entero al desierto. Pero allí, lejos de todos, Dios fue a buscarlo. No hay desierto fuera de su alcance.",
            "tags": [
              "react:withdraw",
              "theme:faith",
              "posture:avoidant",
              "tone:raw"
            ]
          },
          {
            "id": "miedo",
            "label": "El miedo anula mi fe",
            "insight": "El profeta que enfrentó a 450 falsos profetas tembló ante una amenaza. El miedo no borra tu historia con Dios; es la invitación a volver a confiar.",
            "tags": [
              "react:fear",
              "theme:faith",
              "posture:clinging",
              "tone:raw"
            ]
          },
          {
            "id": "clamar",
            "label": "Clamo a Dios aunque no entienda",
            "insight": "Ya vas en la dirección correcta. Aun el clamor confundido es oración, y Dios responde a su tiempo perfecto.",
            "tags": [
              "react:cry-out",
              "theme:prayer",
              "posture:seeking",
              "tone:resolute"
            ]
          },
          {
            "id": "esperar_respuesta",
            "label": "Espero una respuesta a mi medida",
            "insight": "Buscamos respuestas del tamaño de nuestras expectativas. Pero sus pensamientos son más sabios; confía en el silbo, no solo en el fuego.",
            "tags": [
              "react:control",
              "theme:humility",
              "posture:seeking",
              "tone:tender"
            ]
          },
          {
            "id": "callar",
            "label": "Me quedo callado · no sé qué decir",
            "insight": "Cuando no sabemos orar como deberíamos, el Espíritu intercede por nosotros (Rom. 8:26). Tu silencio también lo escucha él.",
            "tags": [
              "react:withdraw",
              "theme:prayer",
              "posture:surrendering",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "espera",
      "day": "Lunes · Cuando parece no haber respuesta",
      "tag": "Claro 3 · Mi espera",
      "title": "Ana oró, esperó, y Dios respondió a su tiempo",
      "story": "Ana oró por algo muy concreto durante años, con el alma amargada (1 Sam. 1:10-17). Parecía que el cielo callaba. Pero ella persistió, y Dios respondió en el momento perfecto. A veces la espera profundiza la confianza más que la respuesta misma.",
      "cue": "Quédate un momento aquí, {name}, con lo que aún esperas.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi cielo abierto",
        "seedSub": "lo que sostengo en la espera",
        "prompt": "Elige el consejo bíblico que sostendrás mientras esperas respuesta",
        "hint": "Toca cada uno · quédate con el que necesitas",
        "chooseLabel": "Este es el que sostengo",
        "closing": "Dios ve el panorama completo y sabe qué es lo mejor (Jer. 29:11). A veces su respuesta es la que dio a Pablo: «Bástate mi gracia». La imagen que tienes de él decide cómo esperas.",
        "allowCustom": {
          "label": "Escribir el mío",
          "placeholder": "Mientras espero, decido confiar en que…",
          "extraKey": "esperaPropia"
        },
        "items": [
          {
            "t": "«Hágase tu voluntad, no la mía.»",
            "ref": "Mat. 6:10",
            "meaning": "Pedir conforme a su voluntad libera la oración del peso de imponer la nuestra (1 Juan 5:14)."
          },
          {
            "t": "«Permaneced en mí, y mis palabras en vosotros.»",
            "ref": "Juan 15:7",
            "meaning": "La rama que permanece pide bien. Quédate en él y en su Palabra mientras esperas."
          },
          {
            "t": "«El que no perdona, no será escuchado.»",
            "ref": "Mar. 11:25",
            "meaning": "Examina tu corazón: a veces lo que estorba la respuesta es un rencor no soltado."
          },
          {
            "t": "«Bástate mi gracia.»",
            "ref": "2 Cor. 12:9",
            "meaning": "A veces la respuesta no es lo que pides, sino la gracia que te sostiene en la espera."
          }
        ]
      }
    },
    {
      "id": "modelo",
      "day": "Martes · Jesús nos enseña a orar",
      "tag": "Claro 4 · El modelo de Jesús",
      "title": "«Señor, enséñanos a orar»",
      "story": "Jesús no soportaba las oraciones ostentosas y memorizadas (Mat. 6:5-8). Los discípulos lo vieron orar a solas, de madrugada, en el monte, y entendieron que la oración era la savia de su vida. Por eso le pidieron: «Señor, enséñanos a orar» (Luc. 11:1).",
      "cue": "{name}, deja que él te enseñe de nuevo a orar.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi cielo abierto",
        "seedSub": "lo que cambia en mi oración",
        "skill": {
          "prompt": "Entrena el oído: ¿oración que Jesús aprueba… o la que rechazó?",
          "hint": "Él enseñó sencillez, sinceridad y un lenguaje cotidiano.",
          "badge": "Estás aprendiendo a orar como él enseñó",
          "cats": [
            "Como Jesús enseñó",
            "Lo que él rechazó"
          ],
          "rounds": [
            {
              "t": "«Padre nuestro, perdóname y enséñame hoy.»",
              "a": 0,
              "fb": "Como Jesús enseñó: sencilla, sincera, en lenguaje cotidiano."
            },
            {
              "t": "Repetir frases largas para que otros me admiren.",
              "a": 1,
              "fb": "Lo que él rechazó: ostentación de presunta «piedad» (Mat. 6:5)."
            },
            {
              "t": "«Hágase tu voluntad, no la mía.»",
              "a": 0,
              "fb": "Como Jesús enseñó: aceptar su soberanía, confiando en que él sabe mejor."
            },
            {
              "t": "Acumular palabras complejas pensando que así me oirá más.",
              "a": 1,
              "fb": "Lo que él rechazó: «no uséis vanas repeticiones» (Mat. 6:7)."
            },
            {
              "t": "«Perdono a quien me hizo mal, como tú me perdonas.»",
              "a": 0,
              "fb": "Como Jesús enseñó: el perdón recibido se vuelve perdón dado."
            },
            {
              "t": "Orar solo para que me vean espiritual.",
              "a": 1,
              "fb": "Lo que él rechazó: la oración no es escenario, es encuentro (Mat. 6:6)."
            }
          ],
          "summary": "Jesús nos enseñó a orar con sencillez y verdad: reconocer al Padre, santificar su nombre, anhelar su reino, aceptar su voluntad, pedir el pan de hoy, perdonar y ser librados del mal. Todo es suyo, y solo él merece la gloria."
        },
        "commit": {
          "prompt": "¿Qué cambiarás en tu oración a partir del modelo de Jesús?",
          "hint": "Algo concreto, sencillo y sincero.",
          "placeholder": "encontrarme con él cada mañana, orar con mis propias palabras…",
          "extraKey": "modeloCambio",
          "options": [
            "Encontrarme con él cada mañana",
            "Orar con mis propias palabras, sin fórmulas",
            "Empezar reconociendo quién es él",
            "Aceptar su voluntad antes que la mía",
            "Perdonar al orar, como él me perdona"
          ]
        }
      }
    },
    {
      "id": "cuatro_voces",
      "day": "Miércoles · Alabanza, confesión, pedido y gratitud",
      "tag": "Claro 5 · Mis cuatro voces",
      "title": "Orar es más que pedir",
      "story": "Daniel oró por su pueblo y su oración tenía muchas voces: adoró a Dios, confesó el pecado, le suplicó y reconoció su misericordia (Dan. 9:4-19). Con demasiada frecuencia nuestras oraciones son solo peticiones. Jesús nos enseñó a ensancharlas.",
      "cue": "Escucha, {name}: tu oración puede tener más de una voz.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi cielo abierto",
        "seedSub": "la voz que me falta",
        "prompt": "Toca cada carta y descubre la voz que falta en tu oración",
        "hint": "Cuatro voces que ensanchan toda plegaria",
        "pairs": [
          {
            "see": "Solo le pido lo que necesito.",
            "sees": "Alábalo por quién es: tu Redentor, Consolador, Buen Pastor y Roca (Sal. 100)."
          },
          {
            "see": "Escondo lo que me avergüenza.",
            "sees": "Cuanto más cerca de él, más confiesas y más te limpia y modela tu carácter (Sant. 5:16)."
          },
          {
            "see": "No sé por dónde empezar a pedir.",
            "sees": "Nombra tu familia, salud, trabajo y a quien necesita apoyo, pidiendo que se haga su voluntad."
          },
          {
            "see": "Olvido agradecer lo pequeño.",
            "sees": "Somos receptores constantes de su misericordia. «Sean conocidas vuestras peticiones con acción de gracias» (Fil. 4:6)."
          }
        ],
        "chooseLabel": "Esta es la voz que añadiré",
        "teach": "Orar es hablar con Dios como con un amigo: en privado, en familia y en la iglesia. Y al expresar gratitud nos acercamos al culto que le rinden los seres celestiales.",
        "commit": {
          "prompt": "Escribe una breve alabanza o gratitud por algo de hoy",
          "hint": "Aun lo pequeño que damos por sentado cuenta",
          "placeholder": "Gracias, Padre, por…",
          "extraKey": "gratitud",
          "shareable": true
        }
      }
    },
    {
      "id": "dudas",
      "day": "Jueves · Otras preguntas sobre la oración",
      "tag": "Claro 6 · Lo que me frena",
      "title": "La oración no baja a Dios: te eleva a ti",
      "story": "«La oración no hace descender a Dios hasta nosotros, sino que nos eleva a nosotros hacia él» (El camino a Cristo, p. 138). Él ya conoce tu corazón. Oras porque te detiene, te humilla a sus pies y te recuerda cuánto lo necesitas.",
      "cue": "Aquí, {name}, suelta lo que te frena de orar.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Qué duda o excusa te frena más a la hora de orar?",
        "hint": "Elige la que más te pesa",
        "saveLabel": "Guardar en mi cielo abierto",
        "seedSub": "lo que dejo en la puerta",
        "closing": "Si los ángeles perfectos lo adoran, ¿cómo pensaríamos nosotros que lo necesitamos menos? La oración y la fe van juntas (Heb. 11:6). No busques una evidencia palpable: confía en que él oye.",
        "options": [
          {
            "id": "sabe_todo",
            "label": "«Si Dios ya lo sabe todo, ¿para qué orar?»",
            "insight": "No oras para informarle, sino para aceptarlo a él. La oración te eleva, hace una pausa en tu ajetreo y te pone a sus pies.",
            "tags": [
              "react:doubt",
              "theme:prayer",
              "posture:seeking",
              "tone:tender"
            ]
          },
          {
            "id": "todo_bien",
            "label": "«Todo va bien, no necesito orar.»",
            "insight": "La autosuficiencia y el orgullo son los mayores enemigos de la oración. Si vieras cuánto lo necesitas, acudirías mucho más (Isa. 44:3).",
            "tags": [
              "react:pride",
              "theme:humility",
              "posture:proud",
              "tone:resolute"
            ]
          },
          {
            "id": "poca_fe",
            "label": "«Mi fe es muy débil para orar.»",
            "insight": "«Sin fe es imposible agradar a Dios» (Heb. 11:6), pero la fe de un grano de mostaza basta. Ora: «¡Ayuda mi poca fe!».",
            "tags": [
              "react:doubt",
              "theme:faith",
              "posture:clinging",
              "tone:raw"
            ]
          },
          {
            "id": "solo",
            "label": "«No me sale orar a solas.»",
            "insight": "Primero busca el lugar secreto, solo Dios y tú (Mat. 6:6); también con tu familia y tu iglesia. Los tres tipos de oración importan.",
            "tags": [
              "react:withdraw",
              "theme:relationship",
              "posture:avoidant",
              "tone:tender"
            ]
          },
          {
            "id": "no_escucho",
            "label": "«Hablo, pero no sé escuchar a Dios.»",
            "insight": "Orar también es dejar que él te «pode». Combina la oración con la Palabra: no vacíes la mente, escudríñala.",
            "tags": [
              "react:doubt",
              "theme:word",
              "posture:seeking",
              "tone:tender"
            ]
          },
          {
            "id": "ocupado",
            "label": "«No tengo tiempo en mi día ajetreado.»",
            "insight": "Jesús, en plena entrega, se levantaba de madrugada a orar (Mar. 1:35). El tiempo con él no resta a tu día: lo sostiene.",
            "tags": [
              "react:apathy",
              "theme:prayer",
              "posture:avoidant",
              "tone:resolute"
            ]
          }
        ]
      }
    },
    {
      "id": "refugio",
      "day": "El refugio del alma",
      "tag": "Claro 7 · Mi refugio",
      "title": "Derrama tu corazón: él es tu refugio",
      "story": "El versículo de la semana no pide palabras perfectas, sino un corazón vertido: «derramen ante él su corazón. Dios es nuestro refugio» (Sal. 62:8). La oración no impide la tormenta; abre el cielo sobre ti para que entres a su amparo.",
      "cue": "{name}, este es el momento de echar tu ancla en él.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Echar el ancla · guardar",
        "seedSub": "mi refugio",
        "chain": [
          {
            "word": "Esperar en él",
            "line": "«Esperen en él en todo tiempo»: la oración empieza confiando, no exigiendo."
          },
          {
            "word": "Derramar el corazón",
            "line": "No escondas nada: vacía ante él lo que cargas, tal como eres."
          },
          {
            "word": "Permanecer",
            "line": "Como la rama en la Vid, te quedas conectado y absorbes su savia."
          },
          {
            "word": "Refugio",
            "line": "Y descubres que él mismo es el lugar seguro al que siempre puedes subir."
          }
        ],
        "climax": "Dios es nuestro refugio: un cielo abierto sobre ti en todo tiempo, que nunca se cierra.",
        "prompt": "¿Cuál es el refugio que echarás como ancla?",
        "hint": "«Pueblos, esperen en él en todo tiempo» (Sal. 62:8)",
        "options": [
          "Que puedo derramar mi corazón sin filtros",
          "Que él me eleva hacia sí cuando oro",
          "Que su gracia me basta en la espera",
          "Que el cielo está siempre abierto sobre mí"
        ],
        "allowCustom": {
          "placeholder": "mi refugio es…",
          "extraKey": "refugioPropio"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Claro 8 · Mi paso de la semana",
      "title": "Más de él, menos de nosotros",
      "story": "«Si pensáramos y habláramos más del Señor Jesús y menos de nosotros mismos, gozaríamos mucho más de su presencia» (El camino a Cristo, p. 151). Acércate sintiéndote necesitado, como en realidad estás, y con fe humilde él hará resplandecer la luz en tu corazón.",
      "cue": "Antes de irte, {name}, da un paso concreto con él.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi cielo abierto",
        "seedSub": "tu paso",
        "stepPrompt": "Mi cambio concreto en la oración esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Encontrarme con Dios cada mañana",
          "Sumar alabanza y gratitud a mis oraciones",
          "Combinar la oración con la lectura de la Biblia",
          "Orar también en familia o en grupo",
          "Perseverar por algo aunque la respuesta tarde"
        ],
        "stepPlaceholder": "mi cambio concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien por quien oraré esta semana",
        "personHint": "Piensa en quién hoy necesita que alguien lo lleve ante Dios",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "orarPor"
      }
    }
  ],
  "encourage": [
    "«Pueblos, esperen en él en todo tiempo, derramen ante él su corazón.» — Salmo 62:8",
    "«Pidan, y les darán; busquen, y encontrarán.» — Mateo 7:7",
    "«Si pedimos algo conforme a su voluntad, él nos oye.» — 1 Juan 5:14",
    "«Permaneced en mí, y mis palabras en vosotros.» — Juan 15:7",
    "«Bástate mi gracia; mi poder se perfecciona en la debilidad.» — 2 Corintios 12:9",
    "«El Espíritu intercede por nosotros cuando no sabemos orar.» — Romanos 8:26",
    "«Por nada estéis afanosos; sean conocidas vuestras peticiones con acción de gracias.» — Filipenses 4:6",
    "«Yo sé los planes que tengo para ustedes, planes de bienestar y esperanza.» — Jeremías 29:11"
  ],
  "discussion": [
    "De las citas de Elena G. de White de esta semana, ¿cuál te parece más inspiradora y cuál un mayor desafío para tu vida de oración?",
    "¿Qué lecciones adicionales aprendes de la vida de oración de otros personajes bíblicos, como Esdras, Nehemías, Salomón o Jonás?",
    "¿Cuál es el papel del ayuno junto con la oración en tu experiencia?",
    "¿Hay algo que quieras modificar o algo nuevo que desees poner en práctica en tu vida de oración como resultado de esta lección? ¿Por qué no empezar ahora mismo?",
    "¿Cómo ha sido tu experiencia cuando parece que Dios no responde? ¿Qué te ayudó a seguir confiando?",
    "¿Qué imagen tienes de Dios cuando oras: cercana o distante? ¿Cómo podrías corregir una imagen distorsionada con la Biblia?",
    "De las cuatro voces de la oración (alabanza, confesión, pedido, gratitud), ¿cuál sueles olvidar más y cómo podrías recuperarla?"
  ],
  "facilitator": [
    {
      "stationId": "vida_oracion",
      "apertura": "¿Cómo describirías tu vida de oración hoy: savia que fluye o rama que se seca?",
      "seguimiento": "¿Con qué frecuencia, con cuánto fervor y con qué expectación oras?",
      "ilustracion": "Separados de la Vid no tenemos fuerza. La rama no se seca de golpe, sino al dejar de absorber savia.",
      "transicion": "Si la oración es esa conexión, veamos qué pasó cuando Elías la usó en plena crisis.",
      "actividad": "Que cada uno nombre en una palabra cómo está hoy su vida de oración (si lo desea).",
      "cierre": "Señor, mantennos unidos a ti, la Vid viva, para no secarnos."
    },
    {
      "stationId": "crisis",
      "apertura": "¿Cómo pudo Elías pasar del fuego del Carmelo al miedo bajo el enebro en un solo día?",
      "seguimiento": "¿Cuál es tu oración cuando todo se derrumba a tu alrededor?",
      "ilustracion": "Dios no reprendió al profeta agotado: le dio pan, agua y descanso, y luego le habló en un silbo apacible.",
      "transicion": "Si Dios respondió a Elías a su manera, ¿qué hacemos cuando parece que no responde?",
      "actividad": "Lean 1 Reyes 19:1-18 y comparen la respuesta del Carmelo con la del silbo apacible.",
      "cierre": "Dios de ternura, acude a nosotros con pan y descanso cuando el miedo nos vence."
    },
    {
      "stationId": "espera",
      "apertura": "¿Qué sentirías si oraras por algo durante años sin ver respuesta, como Ana?",
      "seguimiento": "¿Confías en que Dios responde a su debido tiempo y a su manera?",
      "ilustracion": "Ana persistió con el alma amargada, y Dios respondió en el momento perfecto. La espera profundizó su fe.",
      "transicion": "Si la imagen que tenemos de Dios decide cómo esperamos, dejemos que Jesús nos enseñe a orar.",
      "actividad": "Repasen los consejos bíblicos para la oración aparentemente sin respuesta y elijan uno cada uno.",
      "cierre": "Enséñanos, Señor, a esperar en ti sabiendo que ves el panorama completo."
    },
    {
      "stationId": "modelo",
      "apertura": "¿Por qué los discípulos, al ver orar a Jesús, le pidieron «enséñanos a orar»?",
      "seguimiento": "¿Qué te impide encontrarte cada mañana con Aquel que más te ama?",
      "ilustracion": "Jesús rechazó las oraciones ostentosas y memorizadas; enseñó sencillez, sinceridad y lenguaje cotidiano.",
      "transicion": "Del modelo del Padrenuestro pasamos a ensanchar nuestras oraciones con cuatro voces.",
      "actividad": "Recorran juntos las peticiones del Padrenuestro y nombren qué enseña cada una.",
      "cierre": "Padre nuestro que estás en los cielos, enséñanos a orar con verdad."
    },
    {
      "stationId": "cuatro_voces",
      "apertura": "Al leer la oración de Daniel 9, ¿qué partes distingues más allá de la petición?",
      "seguimiento": "¿Cuál de las cuatro voces sueles olvidar: alabanza, confesión, pedido o gratitud?",
      "ilustracion": "Al expresar gratitud nos acercamos al culto que rinden los seres celestiales con cánticos y música.",
      "transicion": "Si así se ensancha la oración, enfrentemos ahora las dudas que nos frenan de orar.",
      "actividad": "Que cada uno comparta una alabanza y una gratitud concreta por algo de hoy.",
      "cierre": "Te alabamos, te confesamos, te pedimos y te damos gracias, Padre bueno."
    },
    {
      "stationId": "dudas",
      "apertura": "Si Dios ya lo sabe todo, ¿para qué orar? ¿Cómo responde Elena G. de White?",
      "seguimiento": "¿Cuál de las preguntas sobre la oración te resulta hoy más desafiante?",
      "ilustracion": "La oración no hace descender a Dios hasta nosotros; nos eleva a nosotros hacia él.",
      "transicion": "Soltadas las dudas, lleguemos al refugio: derramar el corazón ante él.",
      "actividad": "Que cada uno nombre, si desea, la duda o excusa que más le frena de orar.",
      "cierre": "Elévanos hacia ti, Señor, y quita lo que nos aparta de tu presencia."
    },
    {
      "stationId": "refugio",
      "apertura": "¿Qué significa «derramar el corazón» ante Dios según el Salmo 62:8?",
      "seguimiento": "¿Cuál es el refugio en Dios que sostiene tu vida ahora mismo?",
      "ilustracion": "El cielo abierto no impide la tormenta; ofrece un amparo seguro al que siempre puedes subir.",
      "transicion": "Con el refugio echado como ancla, demos un paso concreto para esta semana.",
      "actividad": "Reciten juntos el Salmo 62:8 y nombren el eslabón que más necesitan.",
      "cierre": "Eres nuestro refugio, Señor; derramamos ante ti nuestro corazón."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué cambia cuando pensamos más en Jesús y menos en nosotros mismos?",
      "seguimiento": "¿Por quién podrías comprometerte a orar esta semana?",
      "ilustracion": "Acercarnos sintiéndonos necesitados, como en realidad estamos, hace resplandecer la luz en el corazón.",
      "transicion": "Reunamos todo en un paso concreto y un nombre por quien interceder.",
      "actividad": "Compartan un solo cambio concreto para su vida de oración esta semana.",
      "cierre": "Que crezca nuestra oración, Señor, y úsanos para llevar a otros ante ti."
    }
  ],
  "patternTemplate": "{name}, hoy reconociste que tu vida de oración es {slot:vida_oracion|lower}. Cuando todo se derrumba, sueles {slot:crisis|lower}, pero estás aprendiendo a esperar sosteniendo {slot:espera} y a orar con la sencillez que Jesús enseñó. La oración no baja a Dios hasta ti: te eleva a ti hacia él.",
  "outOracion": "Padre nuestro que estás en los cielos, vengo a ti tal como estoy. Confieso que mi vida de oración es {slot:vida_oracion|lower}, y que cuando todo se derrumba suelo {slot:crisis|lower}. Pero hoy elijo esperar en ti sosteniendo {slot:espera}. Recibe mi alabanza y mi gratitud, perdona mi pecado y enséñame a orar con sencillez. Sé tú mi refugio: {slot:refugio|lower}. Derramo ante ti mi corazón, porque «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, recuerda hoy: la oración no hace descender a Dios hasta ti, sino que te eleva a ti hacia él. Aunque tu fe parezca pequeña, derrama tu corazón sin filtros, porque Dios es tu refugio. «{verse}» ({verseRef}).",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y voy a orar de manera concreta por {slot:orarPor}.",
  "outPregunta": "Esta semana descubrí que mi vida de oración es {slot:vida_oracion|lower}, y que estoy aprendiendo a esperar en Dios aun cuando parece no haber respuesta. ¿Cómo es hoy tu vida de oración, y dónde has encontrado en Dios tu refugio?",
  "outTarjeta": "Mi cielo abierto de esta semana: aunque mi oración era {slot:vida_oracion|lower}, mi refugio es {slot:refugio|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
