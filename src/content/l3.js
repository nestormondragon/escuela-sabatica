import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 3,
  "slug": "orgullo-versus-humildad",
  "title": "Orgullo versus Humildad",
  "subtitle": "¿Te enalteces a ti mismo, o dejas que Dios te levante?",
  "kitName": "Mi Semilla de Humildad",
  "artifactNoun": "semilla",
  "motif": "seed",
  "stages": [
    "semilla",
    "brote",
    "tallo",
    "hojas",
    "fruto"
  ],
  "stageLabels": [
    "La semilla en la tierra",
    "El primer brote",
    "El tallo se afirma",
    "Hojas que se abren",
    "Fruto · antes de la honra, la humildad"
  ],
  "verseRef": "Lucas 14:11",
  "verseText": "El que se enaltece será humillado; y el que se humilla será enaltecido.",
  "promise": "En unos minutos vas a sembrar tu Semilla de Humildad: nombrarás dónde se esconde tu orgullo, te verás de verdad delante de Dios, aprenderás de la mansedumbre de Moisés, reconocerás la ofensa más seria, fijarás tus ojos en Cristo, y elegirás un paso que te baje del trono para que sea Dios quien te levante.",
  "ui": {
    "start": "Empezar a sembrar mi semilla",
    "emptyKit": "Tu semilla",
    "building": "Cada elección hace crecer una parte",
    "buildingHint": "Toca la parte que brilla. Verás la semilla brotar hasta dar fruto.",
    "lastPiece": "Falta una parte",
    "patternLabel": "Tu patrón ante el orgullo",
    "doneTitle": "Tu semilla ha dado fruto",
    "doneSub": "La sembraste tú, con Dios. Ábrela, guárdala, compártela.",
    "open": "Abrir mi semilla",
    "back": "Volver a mi semilla"
  },
  "slots": [
    {
      "id": "raices",
      "n": 1,
      "label": "Dónde se esconde mi orgullo",
      "teaser": "Lo que más me cuesta soltar…",
      "icon": "rock"
    },
    {
      "id": "garras",
      "n": 2,
      "label": "Las garras del orgullo",
      "teaser": "Lo que el orgullo me hace creer…",
      "icon": "hand"
    },
    {
      "id": "espejo",
      "n": 3,
      "label": "Cómo me veo de verdad",
      "teaser": "El fariseo o el publicano…",
      "icon": "eye"
    },
    {
      "id": "moises",
      "n": 4,
      "label": "La elección de Moisés",
      "teaser": "Lo que dejé para seguir a Dios…",
      "icon": "footstep"
    },
    {
      "id": "ofensa",
      "n": 5,
      "label": "Mi corazón al descubierto",
      "teaser": "La oración que entrego hoy…",
      "icon": "flame"
    },
    {
      "id": "cristo",
      "n": 6,
      "label": "Mis ojos en Cristo",
      "teaser": "Lo que Jesús ve que yo no…",
      "icon": "sunrise"
    },
    {
      "id": "fruto",
      "n": 7,
      "label": "La humildad que crece",
      "teaser": "Antes de la honra, la humildad…",
      "icon": "leaf"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Un paso para humillarme · a quién animo…",
      "icon": "seed"
    }
  ],
  "stations": [
    {
      "id": "raices",
      "day": "Sábado · El orgullo que no vemos",
      "tag": "Parte 1 · Dónde se esconde mi orgullo",
      "title": "Señalamos a otros y no nos vemos a nosotros",
      "story": "Todos conocemos a alguien convencido de que nunca se equivoca, que necesita el control, que menosprecia a los demás. Es fácil pensar en otros. Pero la verdadera pregunta es más íntima: ¿qué pasa conmigo? Nos engañamos al señalar afuera y negar el orgullo que vive dentro. Alguien dijo que el orgullo nace del deseo de demostrar que valemos; pero ya valemos: nos creó Dios y Cristo murió por nosotros.",
      "cue": "Detente aquí, {name}. Esta pregunta es para ti, no para otro.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Dónde se esconde el orgullo en tu vida?",
        "hint": "Elige lo más sincero, no lo más cómodo",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "tu raíz de orgullo",
        "closing": "Reconocer la raíz no es derrota: es el primer surco abierto para que la humildad pueda sembrarse. «Dios resiste a los soberbios y da gracia a los humildes» (1 Ped. 5:5).",
        "options": [
          {
            "id": "razon",
            "label": "Necesito tener siempre la razón",
            "insight": "Cuando nunca cedo, le digo a Dios que mi juicio basta. Pero «antes de la honra viene la humildad».",
            "tags": [
              "react:pride",
              "react:control",
              "posture:proud"
            ]
          },
          {
            "id": "control",
            "label": "Necesito controlarlo todo",
            "insight": "El control es orgullo disfrazado de responsabilidad. Confiar en Dios empieza donde termina mi control.",
            "tags": [
              "react:control",
              "theme:faith",
              "posture:clinging"
            ]
          },
          {
            "id": "comparar",
            "label": "Me comparo y me creo mejor",
            "insight": "El fariseo dio gracias por no ser como los demás. Compararme me ciega a mi propia necesidad de gracia.",
            "tags": [
              "react:pride",
              "theme:self",
              "tone:raw"
            ]
          },
          {
            "id": "critica",
            "label": "No acepto crítica ni corrección",
            "insight": "Cerrarme a la corrección es cerrarme a la instrucción de Dios, que muchas veces llega por otros.",
            "tags": [
              "react:pride",
              "posture:proud",
              "theme:humility"
            ]
          },
          {
            "id": "logros",
            "label": "Mi valor está en mis logros",
            "insight": "Posesiones, talentos y éxitos no fijan mi valor. Todo lo que tengo, incluso lo que me tienta, viene de él.",
            "tags": [
              "theme:self",
              "react:self-blame",
              "tone:tender"
            ]
          },
          {
            "id": "reconocimiento",
            "label": "Necesito que me reconozcan",
            "insight": "El hambre de aplauso me roba la gloria que es de Dios. El orgullo es no tributarle a él lo que él hace en mí.",
            "tags": [
              "react:pride",
              "theme:self",
              "posture:proud"
            ]
          },
          {
            "id": "menosprecio",
            "label": "Menosprecio a los demás",
            "insight": "Rebajar a otros me eleva por un instante y me aleja de Dios para siempre. Su reino funciona al revés.",
            "tags": [
              "react:pride",
              "theme:relationship",
              "tone:raw"
            ]
          },
          {
            "id": "suficiencia",
            "label": "Siento que no necesito ayuda",
            "insight": "La autosuficiencia es la más peligrosa, porque ni siquiera me detengo a evaluarme. Necesito que él abra mis ojos.",
            "tags": [
              "react:pride",
              "posture:avoidant",
              "theme:self"
            ]
          }
        ]
      }
    },
    {
      "id": "garras",
      "day": "Domingo · Las opresivas garras del orgullo",
      "tag": "Parte 2 · Las garras del orgullo",
      "title": "Empezó en el cielo, y todavía busca corazones",
      "story": "El orgullo comenzó con Lucifer, el querubín protector. No sabemos cuándo brotó en su corazón, pero sí que dio origen al gran conflicto. Satanás sembró la duda en Adán y Eva y los tentó a confiar en sí mismos por encima de Dios. Juan lo resume: los deseos de la carne, los deseos de los ojos y la vanagloria de la vida no vienen del Padre, sino del mundo (1 Juan 2:15-17).",
      "cue": "{name}, deja que esta verdad te alcance hoy: nadie es inmune.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Cuál de las garras del orgullo aprieta más fuerte en ti?",
        "hint": "1 Juan 2:16 nombra tres",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "la garra que aprieta",
        "closing": "El mundo y sus deseos pasan; pero el que hace la voluntad de Dios permanece para siempre (1 Juan 2:17). La humildad no me hace menos: me arraiga en lo que no pasa.",
        "options": [
          {
            "id": "carne",
            "label": "Los deseos de la carne",
            "insight": "El apetito que quiere ser saciado a toda costa. Aun aquí Dios ofrece gracia, no condena, al que se humilla.",
            "tags": [
              "theme:sin",
              "react:control",
              "tone:raw"
            ]
          },
          {
            "id": "ojos",
            "label": "Los deseos de los ojos",
            "insight": "Querer lo que veo en otros. Eva miró el fruto y lo deseó; la envidia siempre empieza por la mirada.",
            "tags": [
              "theme:sin",
              "react:withdraw",
              "posture:clinging"
            ]
          },
          {
            "id": "vanagloria",
            "label": "La vanagloria de la vida",
            "insight": "Presumir de lo que soy y tengo. El pavo real abre su cola, pero el corazón altivo se aleja de Dios.",
            "tags": [
              "react:pride",
              "theme:self",
              "posture:proud"
            ]
          },
          {
            "id": "valor",
            "label": "Buscar mi valor fuera de Dios",
            "insight": "Si mi valor depende de logros o aplausos, nunca descanso. Mi valor ya está fijado en la cruz.",
            "tags": [
              "theme:self",
              "react:self-blame",
              "tone:tender"
            ]
          },
          {
            "id": "gloria",
            "label": "Quedarme con la gloria",
            "insight": "El orgullo es no tributar a Dios la gloria por lo que él hace en mí. Devolvérsela es el primer acto de humildad.",
            "tags": [
              "react:pride",
              "theme:grace",
              "posture:proud"
            ]
          },
          {
            "id": "confianza",
            "label": "Confiar en mí más que en él",
            "insight": "Esa fue la tentación del Edén: amar y confiar en uno mismo por encima de Dios. La fe invierte la dirección.",
            "tags": [
              "theme:faith",
              "posture:clinging",
              "tone:resolute"
            ]
          }
        ]
      }
    },
    {
      "id": "espejo",
      "day": "Lunes · Conócete a ti mismo",
      "tag": "Parte 3 · Cómo me veo de verdad",
      "title": "Dos hombres entraron a orar",
      "story": "Uno, respetado, se puso al frente para que todos lo vieran y dio gracias a Dios por su propia bondad. El otro, despreciado, no se atrevía ni a alzar los ojos; se golpeaba el pecho: «Señor, ten piedad de mí, que soy pecador». Jesús dijo que el segundo bajó justificado a su casa. «El que se enaltece será humillado; y el que se humilla será enaltecido» (Luc. 18:14). Cuanto más nos acercamos a Cristo, más conscientes somos de nuestra necesidad de él.",
      "cue": "Mírate en este espejo, {name}, sin maquillaje y sin excusas.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "lo que él ve",
        "prompt": "Toca cada carta para ver cómo te mira Dios de verdad",
        "hint": "El fariseo se miraba a sí mismo; el publicano miró a Dios",
        "pairs": [
          {
            "see": "Te comparas con otros y te crees mejor.",
            "sees": "Él te invita a compararte solo con Cristo, y allí toda jactancia calla."
          },
          {
            "see": "Cuentas tus virtudes en voz alta.",
            "sees": "Él escucha al que susurra: «ten piedad de mí, pecador»."
          },
          {
            "see": "Crees que no necesitas perdón hoy.",
            "sees": "Él es fiel y justo para perdonar al que confiesa (1 Juan 1:9)."
          },
          {
            "see": "Temes parecer pequeño ante los demás.",
            "sees": "Él da gracia a los humildes y resiste a los soberbios (1 Ped. 5:5)."
          }
        ],
        "chooseLabel": "Esta es la verdad que necesitaba",
        "teach": "La ignorancia de la vida de Cristo nos hace exaltarnos en nuestra propia justicia. La única forma de conocernos de verdad es contemplarlo a él.",
        "commit": {
          "prompt": "Escribe la oración honesta del publicano, con tus palabras",
          "hint": "No la de tus virtudes; la de tu necesidad de gracia",
          "placeholder": "Señor, ten piedad de mí, porque…",
          "extraKey": "oracionPublicano",
          "shareable": false
        }
      }
    },
    {
      "id": "moises",
      "day": "Martes · Moisés, un siervo humilde",
      "tag": "Parte 4 · La elección de Moisés",
      "title": "Tuvo el mundo a su alcance, y lo soltó",
      "story": "Moisés fue criado en el palacio, sabio y poderoso en palabras y obras, con la riqueza de Egipto al alcance. Pero eligió «ser maltratado con el pueblo de Dios, antes que gozar de los deleites temporales del pecado» (Heb. 11:25). Cuarenta años en el desierto pusieron su orgullo a un lado, y llegó a ser «el más humilde de la tierra» (Núm. 12:3). La verdad es que no podemos ser humildes por nosotros mismos: necesitamos a Jesús.",
      "cue": "{name}, ¿qué tienes \"al alcance\" que Dios te pide soltar?",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "lo que sueltas",
        "skill": {
          "prompt": "Entrena el ojo: ¿gloria pasajera… o tesoro eterno?",
          "hint": "Moisés pesó las dos cosas y eligió la que dura",
          "badge": "Estás aprendiendo a valorar como valora el cielo",
          "cats": [
            "Gloria pasajera",
            "Tesoro eterno"
          ],
          "rounds": [
            {
              "t": "«Que todos vean lo bien que me va.»",
              "a": 0,
              "fb": "Gloria pasajera: los deleites del pecado son temporales; brillan y se apagan."
            },
            {
              "t": "«Prefiero sufrir con el pueblo de Dios.»",
              "a": 1,
              "fb": "Tesoro eterno: Moisés tuvo por mayores riquezas el vituperio de Cristo."
            },
            {
              "t": "«Acumulo títulos para que me admiren.»",
              "a": 0,
              "fb": "Gloria pasajera: la fama se desvanece a la luz de la eternidad."
            },
            {
              "t": "«Sirvo sin que nadie lo note ni lo aplauda.»",
              "a": 1,
              "fb": "Tesoro eterno: el cielo aprecia al que se olvida de sí mismo."
            },
            {
              "t": "«Me aferro a mi posición y mi comodidad.»",
              "a": 0,
              "fb": "Gloria pasajera: lo que se aferra al poder pierde su relativo brillo."
            },
            {
              "t": "«Pongo mi orgullo a un lado para que Dios me enseñe.»",
              "a": 1,
              "fb": "Tesoro eterno: con el orgullo aparte, Dios formó al libertador de un pueblo."
            }
          ],
          "summary": "Moisés tenía el palacio, pero miró la eternidad y todo lo demás perdió su brillo. Dios lo llamó, y Moisés lo siguió. La mansedumbre no fue debilidad: fue su mayor fuerza."
        },
        "commit": {
          "prompt": "¿Qué \"riqueza de Egipto\" dejarás esta semana para seguir a Dios?",
          "hint": "Comodidad, reputación, control, un derecho a defender…",
          "placeholder": "soltar mi necesidad de tener razón, ceder un reconocimiento…",
          "extraKey": "soltarEgipto",
          "options": [
            "Mi necesidad de tener siempre la razón",
            "Un reconocimiento que quiero para mí",
            "El control de algo que debo confiarle a Dios",
            "Una comodidad que me aleja del servicio",
            "Un derecho que insisto en defender"
          ]
        }
      }
    },
    {
      "id": "ofensa",
      "day": "Miércoles · La mayor ofensa",
      "tag": "Parte 5 · Mi corazón al descubierto",
      "title": "«¿Quién es el más importante?»",
      "story": "Después de todo lo vivido junto a Jesús, los discípulos discutían quién era el mayor. El orgullo se había apoderado de sus corazones. Y se nos dice que «no hay nada que ofenda tanto a Dios… como el orgullo y la suficiencia propia. De todos los pecados es el más pernicioso, el más incurable». Es difícil de vencer porque rara vez percibimos su gravedad. Solo Dios puede quitarlo: «Señor, toma mi corazón, porque yo no puedo dártelo».",
      "cue": "Aquí no hay público, {name}. Solo tu corazón y el de Dios.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "lo que entrego",
        "prompt": "Elige la entrega que harás ahora mismo a Dios",
        "hint": "Toca cada una · quédate con la que tu corazón necesita decir",
        "chooseLabel": "Esto es lo que entrego",
        "closing": "El alma sincera y contrita es de gran valor a la vista de Dios. Él pone su señal sobre los hombres no por su jerarquía ni su riqueza, sino por su unión con Cristo.",
        "allowCustom": {
          "label": "Escribir la mía",
          "placeholder": "Señor, hoy te entrego…",
          "extraKey": "entregaPropia"
        },
        "items": [
          {
            "t": "«Señor, toma mi corazón, porque yo no puedo dártelo.»",
            "ref": "Palabras de vida, p. 127",
            "meaning": "Reconozco que ni siquiera puedo entregarme por mí mismo; necesito que él lo tome."
          },
          {
            "t": "«Sálvame a pesar de mi yo débil que no se parece a Cristo.»",
            "ref": "Palabras de vida, p. 127",
            "meaning": "Mi mayor enemigo no está afuera: es mi propia suficiencia. Pido ser salvado de mí."
          },
          {
            "t": "«Abre mis ojos para ver mi verdadera condición.»",
            "ref": "inspirado en Luc. 18:13",
            "meaning": "El orgullo me ciega a su gravedad; le pido que me deje verme como me ve él."
          },
          {
            "t": "«Modélame y elévame a una atmósfera pura y santa.»",
            "ref": "Palabras de vida, p. 127",
            "meaning": "No quiero solo dejar el orgullo: quiero que su amor fluya por toda mi alma."
          }
        ]
      }
    },
    {
      "id": "cristo",
      "day": "Jueves · Fija tus ojos en Cristo",
      "tag": "Parte 6 · Mis ojos en Cristo",
      "title": "«Yo estoy entre ustedes como el que sirve»",
      "story": "Frente a la disputa por la grandeza, Jesús se mostró como el máximo ejemplo de humildad: «Yo estoy entre ustedes como el que sirve» (Luc. 22:27). Renunció al cielo para morir por nosotros. Cuando lo contemplamos, nuestra presunta grandeza palidece hasta volverse insignificante. Pablo lo dice: tengan el mismo sentir de Cristo, que se humilló, se hizo siervo y obediente hasta la muerte de cruz (Fil. 2:3-8).",
      "cue": "Levanta los ojos, {name}. Mira a quién sirves, y mira cómo sirvió él.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "lo que Cristo me muestra",
        "prompt": "Toca cada carta: el camino del orgullo frente al camino de Cristo",
        "hint": "Filipenses 2 invierte por completo nuestras expectativas",
        "pairs": [
          {
            "see": "Buscas el primer lugar.",
            "sees": "Él tomó el último: «como el que sirve» (Luc. 22:27)."
          },
          {
            "see": "Defiendes tus derechos.",
            "sees": "Él, siendo Dios, no se aferró a su rango, sino que se despojó (Fil. 2:6-7)."
          },
          {
            "see": "Quieres que te sirvan.",
            "sees": "Él vino a servir y a dar su vida en rescate."
          },
          {
            "see": "Te exaltas a ti mismo.",
            "sees": "Por eso Dios lo exaltó hasta lo sumo (Fil. 2:9): el camino de bajada sube."
          }
        ],
        "chooseLabel": "Esta es la verdad que necesitaba",
        "teach": "El orgullo desaparece cuando contemplamos a Cristo. Cuanto más claramente vemos la pureza de su carácter, menos inclinados nos sentimos a ensalzarnos.",
        "commit": {
          "prompt": "Escribe a quién servirás esta semana como lo haría Jesús",
          "hint": "El humilde no se mira a sí mismo; mira a quién puede servir",
          "placeholder": "Voy a servir a… haciendo…",
          "extraKey": "servir",
          "shareable": true
        }
      }
    },
    {
      "id": "fruto",
      "day": "La humildad que da fruto",
      "tag": "Parte 7 · La humildad que crece",
      "title": "Antes de la honra viene la humildad",
      "story": "La humildad no se finge: se cultiva. Como una semilla que muere para dar fruto, el yo se rinde y de él brota una vida nueva. El cielo elige al obrero que, como Juan el Bautista, toma un lugar humilde delante de Dios. La sencillez, el olvido de sí mismo y el amor confiado del niño son las características de la verdadera grandeza.",
      "cue": "Mira cómo creció, {name}: de una semilla rendida, fruto que permanece.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Dar fruto · guardar",
        "seedSub": "el fruto que crece",
        "chain": [
          {
            "word": "Reconocerme",
            "line": "El surco se abre cuando admito mi orgullo y mi necesidad."
          },
          {
            "word": "Humillarme",
            "line": "La semilla baja a la tierra: me bajo del trono delante de Dios."
          },
          {
            "word": "Contemplar a Cristo",
            "line": "Mirándolo a él, mi propia grandeza palidece y muere el yo."
          },
          {
            "word": "Ser exaltado",
            "line": "El que se humilla será enaltecido: él me levanta a su tiempo."
          }
        ],
        "climax": "Antes de la honra viene la humildad. El que se humilla será enaltecido (Luc. 14:11).",
        "prompt": "¿Cuál es el fruto de humildad que quieres que crezca en ti?",
        "hint": "«Dios da gracia a los humildes» (Sant. 4:6)",
        "options": [
          "Aceptar la corrección sin defenderme",
          "Dar a Dios la gloria por lo que hace en mí",
          "Servir sin esperar reconocimiento",
          "Reconocer mi necesidad de gracia cada día"
        ],
        "allowCustom": {
          "placeholder": "el fruto que pido es…",
          "extraKey": "frutoPropio"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Parte 8 · Mi paso de la semana",
      "title": "Bajarme del trono, para que Dios me levante",
      "story": "Cuanto más nos acercamos a Jesús y más vemos la pureza de su carácter, menos nos inclinamos a ensalzarnos. El alma sincera y contrita es de gran valor a sus ojos. Él pone su señal no según tu jerarquía, riqueza o grandeza intelectual, sino por tu unión con Cristo. Da un paso esta semana para humillarte ante Dios y fortalecer tu relación con él.",
      "cue": "Un solo paso, {name}, y deja que sea él quien te enaltezca.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi semilla",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto de esta semana para humillarme",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Pedir perdón a alguien a quien menosprecié",
          "Aceptar una corrección sin justificarme",
          "Dar la gloria a Dios en público por algo que hizo",
          "Tomar el último lugar a propósito",
          "Orar pidiendo que él me humille bajo su mano"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien a quien serviré o animaré esta semana",
        "personHint": "Piensa en quién hoy necesita ver a Cristo en tu humildad",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "animar"
      }
    }
  ],
  "encourage": [
    "«El que se enaltece será humillado; y el que se humilla será enaltecido.» — Lucas 14:11",
    "«Dios resiste a los soberbios, y da gracia a los humildes.» — 1 Pedro 5:5",
    "«Si confesamos nuestros pecados, él es fiel y justo para perdonarnos.» — 1 Juan 1:9",
    "«Yo estoy entre ustedes como el que sirve.» — Lucas 22:27",
    "«Moisés era el más humilde de todos los hombres sobre la tierra.» — Números 12:3",
    "«Humíllense delante del Señor, y él los exaltará.» — Santiago 4:10",
    "«Encamina a los humildes por el juicio, y enseña a los mansos su carrera.» — Salmo 25:9",
    "«El Señor toma contentamiento en su pueblo; hermoseará a los humildes con la salvación.» — Salmo 149:4"
  ],
  "discussion": [
    "¿Qué ideas añaden estos pasajes sobre el orgullo y la humildad? Mateo 23:12; Salmo 25:9; Salmo 149:4; Santiago 4:6 y 10.",
    "¿Cuándo fue la última vez que te ensalzaste a ti mismo? ¿Cómo afectó eso tu relación con Dios o con las personas ante quienes lo hiciste?",
    "¿Qué cambios necesitas hacer para humillarte ante Dios y fortalecer tu relación con él?",
    "Moisés tuvo el mundo a su alcance y eligió sufrir con el pueblo de Dios. ¿Qué \"riqueza de Egipto\" te está costando soltar?",
    "Los discípulos discutían quién era el mayor después de tanto tiempo con Jesús. ¿Por qué el orgullo es tan difícil de detectar en uno mismo?",
    "¿Cuándo fue la última vez que experimentaste la gracia de Dios? ¿A quién podrías mostrar esa misma gracia esta semana?",
    "Jesús se mostró «como el que sirve». ¿En qué área concreta puedes servir esta semana sin buscar reconocimiento?"
  ],
  "facilitator": [
    {
      "stationId": "raices",
      "apertura": "Es fácil ver el orgullo en otros. ¿Por qué cuesta tanto verlo en uno mismo?",
      "seguimiento": "¿En qué área específica reconoces hoy que el orgullo se esconde en tu vida?",
      "ilustracion": "Pensamos en el político arrogante o el pavo real; el orgullo prefiere disfrazarse en nosotros de \"tener razón\".",
      "transicion": "Si la raíz está dentro, veamos de dónde viene y cómo aprieta: las garras del orgullo.",
      "actividad": "Que cada uno escriba en privado una sola palabra para la raíz que reconoce.",
      "cierre": "Señor, abre nuestros ojos para ver el orgullo que negamos."
    },
    {
      "stationId": "garras",
      "apertura": "¿Cómo pudo el orgullo surgir incluso en el cielo, en Lucifer?",
      "seguimiento": "De las tres garras de 1 Juan 2:16, ¿cuál aprieta más fuerte en ti?",
      "ilustracion": "Eva miró el fruto y lo deseó: los deseos de los ojos empiezan en una mirada.",
      "transicion": "Si así son las garras, pongámonos delante del espejo: dos hombres que oraron.",
      "actividad": "Lean 1 Juan 2:15-17 y nombren las tres formas de amor al mundo.",
      "cierre": "Líbranos, Señor, de buscar nuestro valor donde no está."
    },
    {
      "stationId": "espejo",
      "apertura": "¿Qué diferencia hubo entre la oración del fariseo y la del publicano?",
      "seguimiento": "¿Te describirías como el fariseo o como el publicano en esta etapa de tu vida?",
      "ilustracion": "El fariseo se miraba a sí mismo; el publicano miró a Dios y bajó justificado.",
      "transicion": "Quien se ve de verdad puede, como Moisés, soltar lo que el mundo aprecia.",
      "actividad": "Cada uno escribe, con sus palabras, la oración honesta del publicano.",
      "cierre": "Señor, ten piedad de nosotros, que somos pecadores."
    },
    {
      "stationId": "moises",
      "apertura": "¿Por qué Moisés eligió el sufrimiento del pueblo de Dios sobre el palacio?",
      "seguimiento": "¿Qué \"riqueza de Egipto\" sientes que Dios te pide soltar?",
      "ilustracion": "Con las montañas como aula y el orgullo a un lado, Dios formó al más humilde de la tierra.",
      "transicion": "De la humildad de Moisés pasamos a la ofensa más seria: el orgullo de los discípulos.",
      "actividad": "Clasifiquen frases: ¿gloria pasajera o tesoro eterno?",
      "cierre": "Danos, Señor, fuerza moral para soltar lo pasajero por lo eterno."
    },
    {
      "stationId": "ofensa",
      "apertura": "¿Por qué se nos dice que el orgullo es el pecado más pernicioso y difícil de curar?",
      "seguimiento": "¿Qué te impide detenerte y evaluar tu propio orgullo con sinceridad?",
      "ilustracion": "Tras vivir con Jesús, los discípulos discutían quién era el mayor; el orgullo es ese intruso silencioso.",
      "transicion": "Si solo Dios puede quitar el orgullo, fijemos nuestros ojos en quien sí es humilde.",
      "actividad": "Oren juntos: «Señor, toma mi corazón, porque yo no puedo dártelo».",
      "cierre": "Modélanos, Señor; sálvanos a pesar de nuestro yo."
    },
    {
      "stationId": "cristo",
      "apertura": "¿Qué quiso decir Jesús con «yo estoy entre ustedes como el que sirve»?",
      "seguimiento": "¿Cómo cambia tu día contemplar a Cristo que se despojó por ti?",
      "ilustracion": "Siendo Dios, no se aferró a su rango; el camino de bajada fue el que lo exaltó.",
      "transicion": "Mirándolo a él, veamos crecer en nosotros el fruto de la humildad.",
      "actividad": "Lean Filipenses 2:3-8 y nombren un \"derecho\" que Cristo soltó.",
      "cierre": "Que tu mismo sentir, Señor, esté en nosotros."
    },
    {
      "stationId": "fruto",
      "apertura": "¿Cómo se pasa, como Pablo en Romanos, de reconocerse pecador a ser exaltado por Dios?",
      "seguimiento": "¿Qué fruto de humildad anhelas que crezca en tu vida?",
      "ilustracion": "Como la semilla que muere para dar fruto, el yo rendido produce vida nueva.",
      "transicion": "Con el fruto a la vista, demos un paso concreto esta semana.",
      "actividad": "Reciten Lucas 14:11 y nombren el eslabón de la cadena que más necesitan.",
      "cierre": "Que crezca en nosotros, Señor, la humildad que tú aprecias."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué significa que Dios pone su señal no por jerarquía ni riqueza, sino por la unión con Cristo?",
      "seguimiento": "¿Qué paso concreto darás esta semana para humillarte ante Dios?",
      "ilustracion": "El alma sincera y contrita es de gran valor para Dios; lo pequeño a sus ojos es grande.",
      "transicion": "Reunamos todo en una sola semilla y un paso de 24 horas.",
      "actividad": "Compartan un solo paso concreto y el nombre de alguien a quien servirán.",
      "cierre": "Humíllanos bajo tu mano, Señor, y exáltanos a tu tiempo."
    }
  ],
  "patternTemplate": "{name}, estás aprendiendo a verte de verdad. Reconociste que tu orgullo se esconde en {slot:raices|lower}, y que la garra que más aprieta es {slot:garras|lower}. Pero como Moisés, ya estás soltando {slot:moises|lower} para seguir a Dios. La semilla bajó a la tierra: el que se humilla, será enaltecido.",
  "outOracion": "Señor, vengo a ti reconociendo que mi orgullo se esconde en {slot:raices|lower}. Confieso que la garra que más me aprieta es {slot:garras|lower}, y que muchas veces busco mi valor donde no está. Como el publicano, te digo: ten piedad de mí, que soy pecador. Hoy suelto {slot:moises|lower} para seguirte, y te pido el fruto de {slot:fruto|lower}. Toma mi corazón, Señor, porque yo no puedo dártelo; modélame y elévame a una atmósfera pura. «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, no estás solo en la lucha contra el orgullo: hasta los discípulos que vivieron con Jesús lucharon con él. Pero recuerda esto hoy: «{verse}» ({verseRef}). El que se humilla no pierde nada; deja que sea Dios quien lo levante a su tiempo. Bájate del trono, y descansa: él da gracia a los humildes.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, dejando atrás {slot:moises|lower}, y voy a servir o animar a {slot:animar|or:alguien que lo necesite}.",
  "outPregunta": "Esta semana descubrí que mi orgullo se esconde sobre todo en {slot:raices|lower}, y estoy aprendiendo a humillarme delante de Dios. ¿Cuándo fue la última vez que te ensalzaste a ti mismo, y cómo afectó eso tu relación con Dios o con los demás?",
  "outTarjeta": "Mi semilla de esta semana: reconozco que mi orgullo se esconde en {slot:raices|lower}, y elijo el fruto de {slot:fruto|lower}. Antes de la honra, la humildad.\nVersículo: «{verse}» ({verseRef})."
}
);
