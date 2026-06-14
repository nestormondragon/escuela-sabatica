import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 10,
  "slug": "arrepentimiento-y-perdon",
  "title": "Arrepentimiento y Perdón",
  "subtitle": "El camino de vuelta a casa empieza con una sola palabra: perdóname.",
  "kitName": "Mi Camino",
  "artifactNoun": "camino",
  "motif": "road",
  "stages": [
    "vereda",
    "surco",
    "siembra",
    "lluvia",
    "meta"
  ],
  "stageLabels": [
    "La vereda polvorienta",
    "El surco abierto en la tierra dura",
    "La semilla en justicia",
    "Cae la lluvia del Espíritu",
    "A la vista la Tierra Prometida"
  ],
  "verseRef": "1 Juan 1:9",
  "verseText": "Si confesamos nuestros pecados, Dios es fiel y justo para perdonar nuestros pecados y limpiarnos de todo mal.",
  "promise": "En unos minutos vas a trazar tu Camino de vuelta a Dios: nombrarás lo que hoy te distrae de él, aprenderás a no acallar su voz, distinguirás el arrepentimiento genuino del simple remordimiento, recibirás su gracia, te vestirás de su manto de justicia, y darás un paso concreto para acercarte. {name}, este es el camino a casa.",
  "ui": {
    "start": "Empezar a trazar mi camino",
    "emptyKit": "Tu camino",
    "building": "Cada elección abre un tramo del camino",
    "buildingHint": "Toca la pieza que brilla. Verás la vereda polvorienta volverse el camino a la Tierra Prometida.",
    "lastPiece": "Falta un tramo",
    "patternLabel": "Tu patrón en el camino",
    "doneTitle": "Tu camino está completo",
    "doneSub": "Lo trazaste tú, con Dios. Ábrelo, guárdalo, recórrelo esta semana.",
    "open": "Abrir mi camino",
    "back": "Volver a mi camino"
  },
  "slots": [
    {
      "id": "distraccion",
      "n": 1,
      "label": "Mi ídolo de hoy",
      "teaser": "Lo que hoy me aparta de él…",
      "icon": "path"
    },
    {
      "id": "voz",
      "n": 2,
      "label": "Su voz apacible",
      "teaser": "Lo que suelo hacer cuando me reprende…",
      "icon": "ear"
    },
    {
      "id": "genuino",
      "n": 3,
      "label": "Mi arrepentimiento",
      "teaser": "El paso más difícil para mí…",
      "icon": "footstep"
    },
    {
      "id": "gracia",
      "n": 4,
      "label": "Su gracia suficiente",
      "teaser": "La verdad de su corazón hacia mí…",
      "icon": "rock"
    },
    {
      "id": "manto",
      "n": 5,
      "label": "El manto de justicia",
      "teaser": "Lo que él me ofrece vestir…",
      "icon": "feather"
    },
    {
      "id": "confesion",
      "n": 6,
      "label": "Mi confesión",
      "teaser": "Lo que dejo a sus pies hoy…",
      "icon": "release"
    },
    {
      "id": "camino",
      "n": 7,
      "label": "El camino a casa",
      "teaser": "La cadena que me lleva de vuelta…",
      "icon": "sunrise"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Un surco que abriré · a quién acompaño…",
      "icon": "leaf"
    }
  ],
  "stations": [
    {
      "id": "distraccion",
      "day": "Sábado · El becerro de oro",
      "tag": "Tramo 1 · Mi ídolo de hoy",
      "title": "Querían un dios que pudieran ver",
      "story": "Moisés llevaba días en la montaña. El pueblo, impaciente, ya lo daba por muerto. Pocos días antes habían hecho un pacto solemne con Dios; ahora rodeaban a Aarón exigiendo un ídolo de oro que pudieran tocar. La Tierra Prometida parecía lejana, y la espera se les hizo intolerable. Todavía hoy preferimos lo que se ve a Aquel que no se ve.",
      "cue": "Detente aquí, {name}. Mira qué fácil es cambiar la promesa por un ídolo.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Qué te aparta hoy de acercarte a Dios?",
        "hint": "Elige lo más real ahora mismo",
        "saveLabel": "Guardar en mi camino",
        "seedSub": "tu ídolo de hoy",
        "options": [
          {
            "id": "prisa",
            "label": "La prisa · siempre ocupado/a",
            "insight": "Como Marta, «atareada con muchos quehaceres» (Luc. 10:40). Lo urgente ahoga lo importante, y el sol se pone antes de que te sientes a sus pies.",
            "tags": [
              "theme:relationship",
              "react:control",
              "posture:avoidant"
            ]
          },
          {
            "id": "rencor",
            "label": "Un rencor que no suelto",
            "insight": "«¿Acaso no se lo merecía, aunque solo fuera un poco?». El remordimiento se disfraza de justicia propia, y el camino se cierra.",
            "tags": [
              "theme:relationship",
              "react:pride",
              "posture:proud"
            ]
          },
          {
            "id": "pecado",
            "label": "Un pecado acariciado",
            "insight": "No crecemos cuando el pecado elegido y acariciado se interpone (Efe. 4:30). No para herirte: para que dejes lo que te hiere.",
            "tags": [
              "theme:sin",
              "react:withdraw",
              "posture:clinging"
            ]
          },
          {
            "id": "imagen",
            "label": "Lo que pienso que otros ven de mí",
            "insight": "«Me visto así para mostrar quién soy». Pero solo el manto de Cristo dice quién eres de verdad (Mat. 6:19-21).",
            "tags": [
              "theme:self",
              "react:pride",
              "posture:proud"
            ]
          },
          {
            "id": "distancia",
            "label": "Una distancia que ya no siento",
            "insight": "El peligro no es siempre el escándalo; a veces es la indiferencia. Dios mira desde el cielo a ver si alguno lo busca (Sal. 53:2).",
            "tags": [
              "theme:relationship",
              "react:apathy",
              "posture:avoidant"
            ]
          },
          {
            "id": "duda",
            "label": "Dudo que de verdad me perdone",
            "insight": "El mismo Dios que el pueblo hizo entristecer dijo de sí mismo: «compasivo y clemente… lento para enojarse» (Éxo. 34:6). Su perdón es más grande que tu falta.",
            "tags": [
              "theme:grace",
              "react:doubt",
              "posture:seeking"
            ]
          },
          {
            "id": "consecuencia",
            "label": "Solo me pesan las consecuencias",
            "insight": "«A menudo nos apenamos porque nuestras malas acciones nos producen consecuencias desagradables, pero eso no es arrepentimiento» (E. White). El verdadero pesar mira a Jesús, no al precio.",
            "tags": [
              "theme:sin",
              "react:self-blame",
              "posture:avoidant"
            ]
          },
          {
            "id": "espera",
            "label": "Sigo esperando el momento perfecto",
            "insight": "El pueblo no quiso esperar a Dios; tú no necesitas esperar para volver. «Hoy, si oís su voz, no endurezcáis vuestro corazón» (Heb. 3:15).",
            "tags": [
              "theme:humility",
              "react:withdraw",
              "posture:avoidant"
            ]
          }
        ]
      }
    },
    {
      "id": "voz",
      "day": "Domingo · La prisa de la vida",
      "tag": "Tramo 2 · Su voz apacible",
      "title": "«Marta, Marta…»",
      "story": "Era sábado, el día que más amaba. Pero entre el baño, las sábanas, el pastel y la camisa planchada, lo dejó pasar entero sin sentarse a los pies de Jesús. De pie en la cocina silenciosa, brotaron lágrimas: había elegido lo bueno por encima de la buena parte. No se trata de las tareas; se trata de notar qué cosas debilitan tu relación con él.",
      "cue": "{name}, escucha la voz apacible antes de que el ruido la apague.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "Cuando el Espíritu te señala algo, sueles…",
        "hint": "Elige la respuesta más sincera",
        "saveLabel": "Guardar en mi camino",
        "seedSub": "tu respuesta a su voz",
        "closing": "Convencer al mundo de pecado es obra del Espíritu (Juan 16:8), y esa convicción es un regalo divino (Luc. 11:13). Cuando clamas porque sientes el dolor de la separación, él sostiene un manto blanco en sus manos heridas y está muy cerca (Apoc. 7:14).",
        "options": [
          {
            "id": "justificar",
            "label": "Justificar por qué actué así",
            "insight": "Es fácil pasar del remordimiento a la excusa. Pero la voz apacible no acusa para hundirte: insta para sanarte.",
            "tags": [
              "theme:self",
              "react:pride",
              "posture:proud"
            ]
          },
          {
            "id": "acallar",
            "label": "Acallar esa voz y seguir",
            "insight": "La voz es apacible y tenue; por eso es tan fácil silenciarla. No la apagues: es el Espíritu reimplantándote en la Vid (Juan 15:4).",
            "tags": [
              "theme:word",
              "react:withdraw",
              "posture:avoidant"
            ]
          },
          {
            "id": "minimizar",
            "label": "Pensar que no fue para tanto",
            "insight": "Cada pecado vuelve a herir a Jesús. Verlo así no te aplasta: te enternece, y la ternura te lleva a la Cruz.",
            "tags": [
              "theme:sin",
              "react:apathy",
              "posture:avoidant"
            ]
          },
          {
            "id": "llorar",
            "label": "Sentir el peso y entristecerme",
            "insight": "Lágrimas silenciosas en la cocina. «El verdadero pesar por el pecado es el resultado de la obra del Espíritu Santo» (E. White). No las reprimas.",
            "tags": [
              "theme:humility",
              "react:cry-out",
              "tone:tender"
            ]
          },
          {
            "id": "orar",
            "label": "Pedirle que enternezca mi corazón",
            "insight": "Vas en la dirección del camino. «Enternece mi corazón y abre mis oídos a tu voz» es exactamente la oración que él anhela responder.",
            "tags": [
              "theme:prayer",
              "react:cry-out",
              "posture:seeking"
            ]
          },
          {
            "id": "ignorar",
            "label": "Distraerme con otra cosa",
            "insight": "Como las tareas del sábado, lo urgente puede tapar lo importante. Pero una sola cosa es necesaria (Luc. 10:42).",
            "tags": [
              "theme:relationship",
              "react:apathy",
              "posture:avoidant"
            ]
          }
        ]
      }
    },
    {
      "id": "genuino",
      "day": "Lunes · Directivas del Espíritu Santo",
      "tag": "Tramo 3 · Mi arrepentimiento",
      "title": "Dolor que cambia el rumbo",
      "story": "Al pensar en lo dicho a su esposa, supo que se había equivocado. Pero el siguiente pensamiento llegó solo: «¿Acaso no se lo merecía un poco?». Decir «perdóname» nunca es fácil, ni con las personas ni con Dios. La bondad de Dios nos lleva al arrepentimiento (Rom. 2:4): dolor sincero por la falta, y decisión honesta de abandonar el pecado.",
      "cue": "Aquí el camino se estrecha, {name}: aprende a distinguir el dolor que salva.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi camino",
        "seedSub": "tu arrepentimiento",
        "skill": {
          "prompt": "Entrena el oído: ¿arrepentimiento genuino… o solo remordimiento?",
          "hint": "Uno cambia el rumbo; el otro solo se lamenta.",
          "badge": "Estás aprendiendo a reconocer el dolor que conduce a la vida",
          "cats": [
            "Arrepentimiento",
            "Remordimiento"
          ],
          "rounds": [
            {
              "t": "«Me siento fatal por lo que perdí a causa de esto.»",
              "a": 1,
              "fb": "Remordimiento: te apena la consecuencia, no la ofensa. Eso aún no cambia el rumbo."
            },
            {
              "t": "«Señor, lo confieso, y decido dejarlo.»",
              "a": 0,
              "fb": "Arrepentimiento: dolor sincero más decisión de abandonar (1 Juan 1:9)."
            },
            {
              "t": "«Lo siento, pero algo de razón yo tenía.»",
              "a": 1,
              "fb": "Remordimiento: la excusa cancela la confesión. La justicia propia cierra el camino."
            },
            {
              "t": "«Lloro porque mi pecado volvió a herir a Jesús.»",
              "a": 0,
              "fb": "Arrepentimiento: el Espíritu revela la ingratitud y te trae contrito a la Cruz."
            },
            {
              "t": "«Ojalá nadie se entere de lo que hice.»",
              "a": 1,
              "fb": "Remordimiento: te duele el qué dirán, no el corazón de Dios."
            },
            {
              "t": "«Le pido a Dios que pode lo que estorba en mí.»",
              "a": 0,
              "fb": "Arrepentimiento: te pones en sus manos para dar el fruto resultante (Mat. 3:8)."
            }
          ],
          "summary": "«Ningún arrepentimiento que no obre una reforma es genuino» (E. White). El arrepentimiento conduce a la vida (Hech. 11:18), y Dios perdona en cuanto te vuelves de verdad. Es así de sencillo (1 Juan 1:9)."
        },
        "commit": {
          "prompt": "De los tres pasos —someterte, arrepentirte, dejarte podar— ¿cuál te resulta más difícil, y qué harás con él?",
          "hint": "Nómbralo. La bondad de Dios ya te está llevando.",
          "placeholder": "me cuesta dejarme podar, así que esta semana…",
          "extraKey": "pasoArrep",
          "options": [
            "Someterme: confiarle el control",
            "Arrepentirme: confesar sin excusas",
            "Dejarme podar: aceptar que él corrija",
            "Decir «perdóname» a alguien que herí",
            "Abandonar un pecado concreto, no solo lamentarlo"
          ]
        }
      }
    },
    {
      "id": "gracia",
      "day": "Martes y Miércoles · Gracia suficiente",
      "tag": "Tramo 4 · Su gracia suficiente",
      "title": "«Señor, aquí estoy de nuevo…»",
      "story": "Cuando sientes el peso del pecado y dejas que el Espíritu te lleve a la Cruz, no encuentras un juez frío sino al que ya corrió a buscarte. «Compasivo y clemente es el Señor, lento para enojarse y grande en amor» (Sal. 103:8). Lo dijo Dios mismo (Éxo. 34:6) después de que su pueblo lo hiciera entristecer. No te quedes lejos mirando: corre hacia él.",
      "cue": "{name}, deja que esta verdad te alcance hoy: su gracia te basta.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi camino",
        "seedSub": "tu gracia suficiente",
        "prompt": "Elige la promesa de gracia que sostendrás cuando vuelvas a caer",
        "hint": "Toca cada una · quédate con la que más necesitas",
        "chooseLabel": "Esta es la que sostengo",
        "closing": "«Llamando a la puerta» (Apoc. 3:20), Jesús te busca antes de que se lo pidas, como el buen Pastor. Corre a la Cruz y deja que cambie tus pecados por su justicia (Zac. 3:4).",
        "allowCustom": {
          "label": "Escribir la mía",
          "placeholder": "La gracia que necesito hoy es…",
          "extraKey": "graciaPropia"
        },
        "items": [
          {
            "t": "«La paga del pecado es la muerte, pero el don gratuito de Dios es la vida eterna en Cristo Jesús.»",
            "ref": "Romanos 6:23",
            "meaning": "Lo que mereces y lo que él te regala, en una sola frase. La vida no se gana: se recibe."
          },
          {
            "t": "«Donde el pecado abundó, sobreabundó la gracia.»",
            "ref": "Romanos 5:20",
            "meaning": "Tu falta nunca será más grande que su misericordia. La gracia reina para vida eterna."
          },
          {
            "t": "«Siendo aún pecadores, Cristo murió por nosotros.»",
            "ref": "Romanos 5:8",
            "meaning": "No esperó a que mejoraras. Te amó en tu peor momento, y por eso puedes volver hoy."
          },
          {
            "t": "«Ten compasión de mí, que soy pecador.»",
            "ref": "Lucas 18:13",
            "meaning": "La oración más corta y más oída del Evangelio. «Señor, aquí estoy de nuevo» basta."
          }
        ]
      }
    },
    {
      "id": "manto",
      "day": "Jueves · La vestidura más costosa",
      "tag": "Tramo 5 · El manto de justicia",
      "title": "El amigo sin traje de boda",
      "story": "En la parábola, el rey llamó «amigo» al hombre sin la vestimenta de la fiesta. Había relación entre ellos; el hombre conocía el traje, pero decidió no usarlo. Como Adán y Eva, que cosieron hojas de higuera y aun así quedaron desnudos, nada que fabriquemos cubre nuestra falta. Solo el manto que Cristo provee —su carácter sin mancha— nos hace dignos de su presencia.",
      "cue": "Aquí, {name}, él extiende un manto blanco con manos heridas. ¿Lo recibes?",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi camino",
        "seedSub": "lo que él ve",
        "prompt": "Toca cada carta para ver lo que Jesús ve cuando vienes a él",
        "hint": "Tu vestido roto · su manto limpio",
        "pairs": [
          {
            "see": "Ves tus hojas de higuera, lo que cosiste para cubrirte.",
            "sees": "Él ve un alma a la que ofrece «lino fino, limpio y resplandeciente» (Apoc. 19:8)."
          },
          {
            "see": "Te sientes desnudo/a y avergonzado/a por tu pecado.",
            "sees": "Él ya tiene listo el manto «sin mancha ni arruga» (Efe. 5:27)."
          },
          {
            "see": "Crees que tu identidad es lo que otros ven de ti.",
            "sees": "Él envuelve tu identidad en su justicia, no en tu ropa (Mat. 6:20)."
          },
          {
            "see": "Piensas que cubrir tu falta te cuesta a ti.",
            "sees": "A él le costó un sacrificio: te viste con su propio carácter (Isa. 61:10)."
          }
        ],
        "chooseLabel": "Este es el manto que recibo",
        "teach": "El lino blanco «es la justicia de Cristo, su propio carácter sin mancha, que por la fe se imparte a todos los que lo reciben» (E. White). No se viste una vez: se viste cada día.",
        "commit": {
          "prompt": "¿Qué significa para ti vestir hoy el manto de justicia de Jesús, y cómo lo harás?",
          "hint": "Escríbelo para alguien que aún cose hojas de higuera.",
          "placeholder": "Vestir su manto significa para mí…",
          "extraKey": "mantoTexto",
          "shareable": true
        }
      }
    },
    {
      "id": "confesion",
      "day": "Síntesis · Al pie de la Cruz",
      "tag": "Tramo 6 · Mi confesión",
      "title": "Lo que dejas a sus pies",
      "story": "El camino al perdón pasa por un punto donde hay que soltar lo que cargas. «Si confesamos nuestros pecados, Dios es fiel y justo para perdonar… y limpiarnos de todo mal» (1 Juan 1:9). No te quedes mirando a Dios desde lejos: corre, confiesa, y deja que él levante el peso que te agobia.",
      "cue": "{name}, baja la carga aquí. Él es fiel y justo para perdonar.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Guardar en mi camino",
        "seedSub": "tu confesión",
        "stepPrompt": "Lo que dejo a sus pies hoy",
        "stepHint": "Toca lo que más pesa o escribe lo tuyo",
        "stepOptions": [
          "La prisa que me roba su presencia",
          "El rencor que no suelto",
          "Un pecado que acariciaba en secreto",
          "La justicia propia y mis excusas",
          "La vergüenza de volver una vez más"
        ],
        "stepPlaceholder": "lo que confieso y dejo…",
        "stepExtraKey": "confiesoTexto",
        "personPrompt": "A quién necesito pedir perdón (o perdonar)",
        "personHint": "El perdón con Dios suele abrir el perdón con personas",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "perdonar"
      }
    },
    {
      "id": "camino",
      "day": "El camino a casa",
      "tag": "Tramo 7 · El camino a casa",
      "title": "La bondad de Dios te lleva a casa",
      "story": "Pablo no dice que el perdón sea un instante aislado, sino un camino. La bondad de Dios despierta el arrepentimiento; el arrepentimiento abre la confesión; la confesión recibe el perdón; el perdón te viste de justicia. Traza cada tramo y verás a dónde lleva el camino.",
      "cue": "Mira el camino completo, {name}: empieza en su bondad y termina en casa.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Trazar el camino · guardar",
        "seedSub": "tu camino a casa",
        "chain": [
          {
            "word": "Su bondad",
            "line": "«La bondad de Dios te lleva al arrepentimiento» (Rom. 2:4). Él da el primer paso."
          },
          {
            "word": "Arrepentimiento",
            "line": "Dolor sincero y decisión de dejar el pecado: el rumbo cambia."
          },
          {
            "word": "Confesión",
            "line": "«Señor, aquí estoy de nuevo». Lo dices, y él ya escuchaba."
          },
          {
            "word": "Perdón",
            "line": "«Fiel y justo para perdonar y limpiarnos de todo mal» (1 Juan 1:9)."
          }
        ],
        "climax": "Y te viste con su manto de justicia, y la Tierra Prometida ya no parece lejana: estás de camino a casa.",
        "prompt": "¿Qué tramo de este camino necesitas recorrer hoy?",
        "hint": "«Es tiempo de buscar al Señor, hasta que venga y les enseñe justicia» (Os. 10:12)",
        "options": [
          "Dejar que su bondad me ablande",
          "Arrepentirme de verdad, no solo lamentarme",
          "Confesar sin excusas",
          "Recibir el perdón que ya está disponible"
        ],
        "allowCustom": {
          "placeholder": "el tramo que necesito recorrer es…",
          "extraKey": "caminoPropio"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Tramo 8 · Mi paso de la semana",
      "title": "Siembra en justicia",
      "story": "«Siembren para ustedes en justicia, sieguen cosecha de amor. Aren su tierra sin labrar, porque es tiempo de buscar al Señor» (Os. 10:12). Hacemos surcos en la tierra dura del corazón para que reciba la lluvia del Espíritu. Dios mismo nos da el deseo de prepararla (Fil. 2:13); a nosotros toca dirigirnos a él y aferrarnos.",
      "cue": "{name}, abre un surco esta semana. Él hará caer la lluvia.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi camino",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto de esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Orar cada día contra la tentación (Mat. 6:13)",
          "Apartar tiempo para sentarme a sus pies",
          "Confesar en cuanto el Espíritu me señale algo",
          "Vestirme cada mañana de su manto de justicia",
          "Aferrarme a él como los que fueron fieles (Deut. 4:4)"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "A quién explicaré el manto de justicia esta semana",
        "personHint": "Piensa en un nuevo creyente o alguien que carga su pecado",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "acompanar"
      }
    }
  ],
  "encourage": [
    "«Si confesamos nuestros pecados, Dios es fiel y justo para perdonar nuestros pecados y limpiarnos de todo mal.» — 1 Juan 1:9",
    "«Compasivo y clemente es el Señor, lento para enojarse y grande en amor.» — Salmo 103:8",
    "«La paga del pecado es la muerte, pero el don gratuito de Dios es la vida eterna en Cristo Jesús.» — Romanos 6:23",
    "«Donde el pecado abundó, sobreabundó la gracia.» — Romanos 5:20",
    "«Siendo aún pecadores, Cristo murió por nosotros.» — Romanos 5:8",
    "«La bondad de Dios te lleva al arrepentimiento.» — Romanos 2:4",
    "«Es tiempo de buscar al Señor, hasta que venga y les enseñe justicia.» — Oseas 10:12",
    "«En gran manera me gozaré en el Señor… porque me vistió con vestiduras de salvación.» — Isaías 61:10"
  ],
  "discussion": [
    "«No nos dejes caer en tentación, sino líbranos del mal» (Mat. 6:13). ¿Oras con regularidad pidiendo protección contra la tentación y el pecado, o esa línea casi nunca aparece en tus oraciones?",
    "¿Cómo le explicarías el precioso don del manto de justicia de Cristo a un no cristiano o a un nuevo creyente?",
    "¿Cómo se relaciona el manto de justicia con el mensaje del Santuario sobre el perdón y la purificación del pecador arrepentido? ¿Cuánto comprendes de la belleza de ese mensaje?",
    "De los tres pasos —sumisión, arrepentimiento y autorizar que Dios nos pode— ¿cuál es el más desafiante para ti, y por qué?",
    "¿Cuándo fue la última vez que el Espíritu te llamó al arrepentimiento? ¿Cómo respondiste: justificándote o ablandando el corazón?",
    "¿Cómo distingues en tu propia vida el arrepentimiento genuino del simple remordimiento por las consecuencias?",
    "Oseas habla de arar la tierra dura y sembrar en justicia. ¿Qué surco necesita abrir tu corazón para recibir la lluvia del Espíritu?"
  ],
  "facilitator": [
    {
      "stationId": "distraccion",
      "apertura": "El pueblo había hecho un pacto solemne días antes; ¿por qué exigió tan pronto un ídolo que pudiera ver?",
      "seguimiento": "¿Qué cosa, hoy, te aparta de acercarte a Dios y te hace preferir lo visible a lo eterno?",
      "ilustracion": "La Tierra Prometida estaba cerca, pero la impaciencia fundió el oro en un becerro. La espera, no el enemigo, los venció.",
      "transicion": "Si así sustituimos a Dios, veamos cómo una mujer ocupada casi pierde su sábado.",
      "actividad": "Que cada uno nombre, en una palabra, lo que más lo distrae de Dios esta temporada (si desea).",
      "cierre": "Señor, líbranos de cambiar tu promesa por ídolos que podemos ver."
    },
    {
      "stationId": "voz",
      "apertura": "¿Por qué es tan fácil pasar del remordimiento a la justificación cuando el Espíritu nos señala algo?",
      "seguimiento": "¿Cuál es tu reacción habitual ante la voz apacible: acallarla, justificarte o ablandar el corazón?",
      "ilustracion": "Entre tareas buenas y necesarias, perdió el sábado entero; las lágrimas llegaron en la cocina silenciosa.",
      "transicion": "De notar la voz pasamos a distinguir el arrepentimiento real del simple remordimiento.",
      "actividad": "Lean Juan 16:7-8 y comenten qué significa que el Espíritu «convence de pecado».",
      "cierre": "Espíritu Santo, enternece nuestro corazón y abre nuestros oídos a tu voz."
    },
    {
      "stationId": "genuino",
      "apertura": "«¿Acaso no se lo merecía, aunque solo fuera un poco?». ¿Por qué cuesta tanto decir «perdóname» sin excusas?",
      "seguimiento": "¿Cuál de los tres pasos —someterte, arrepentirte, dejarte podar— te resulta más difícil?",
      "ilustracion": "«El verdadero pesar por el pecado es resultado de la obra del Espíritu»; el dolor por las consecuencias no basta.",
      "transicion": "Del arrepentimiento genuino pasamos a la gracia que lo recibe.",
      "actividad": "Clasifiquen frases juntos: ¿arrepentimiento genuino o solo remordimiento?",
      "cierre": "Danos, Señor, el dolor que cambia el rumbo, no solo el que se lamenta."
    },
    {
      "stationId": "gracia",
      "apertura": "¿Qué nos dice que la frase «compasivo y clemente» la pronunciara Dios mismo después de ser entristecido (Éxo. 34:6)?",
      "seguimiento": "¿Qué promesa de gracia necesitas sostener la próxima vez que vuelvas a caer?",
      "ilustracion": "El buen Pastor nos busca antes de que se lo pidamos y está a la puerta llamando (Apoc. 3:20).",
      "transicion": "Recibida la gracia, veamos con qué nos viste Cristo: su manto de justicia.",
      "actividad": "Que cada uno lea Romanos 6:23, 5:20 y 5:8 y diga con sus palabras qué le dicen de la gracia.",
      "cierre": "Corremos a la Cruz, Señor; cambia nuestros pecados por tu justicia."
    },
    {
      "stationId": "manto",
      "apertura": "El rey llamó «amigo» al hombre sin traje de boda; ¿qué nos enseña que hubiera relación y aun así le faltara el manto?",
      "seguimiento": "¿Qué significa para ti vestir cada día el manto de justicia de Cristo?",
      "ilustracion": "Adán y Eva cosieron hojas de higuera y siguieron desnudos; solo el manto que Cristo provee cubre de verdad.",
      "transicion": "Vestidos de su justicia, vayamos al punto donde se deja la carga: la confesión.",
      "actividad": "Escriban cómo le explicarían el manto de justicia a un nuevo creyente.",
      "cierre": "Vístenos, Señor, con tu carácter sin mancha; no nos basta el nuestro."
    },
    {
      "stationId": "confesion",
      "apertura": "¿Por qué nos quedamos a veces mirando a Dios desde lejos en vez de correr a confesar?",
      "seguimiento": "¿Qué necesitas dejar hoy a sus pies, y a quién te pide perdonar o pedir perdón?",
      "ilustracion": "Jesús quita el peso que nos agobia; nuestras cargas se alivian en el Calvario, no en la distancia.",
      "transicion": "Confesado el pecado, veamos el camino completo: de su bondad hasta casa.",
      "actividad": "Inviten a un momento de confesión silenciosa, recordando 1 Juan 1:9.",
      "cierre": "Eres fiel y justo para perdonar; dejamos aquí lo que cargamos."
    },
    {
      "stationId": "camino",
      "apertura": "¿Cómo va Pablo de la bondad de Dios al arrepentimiento, y de ahí a la vida (Rom. 2:4; Hech. 11:18)?",
      "seguimiento": "¿Qué tramo del camino —bondad, arrepentimiento, confesión, perdón— necesitas recorrer ahora mismo?",
      "ilustracion": "El perdón no es un instante aislado: es un camino que Dios mismo empieza y completa en nosotros.",
      "transicion": "Con el camino trazado, demos un paso concreto y sembremos en justicia esta semana.",
      "actividad": "Reciten 1 Juan 1:9 y nombren el eslabón del camino que más necesitan hoy.",
      "cierre": "Gracias, Señor, porque tu bondad nos lleva de vuelta a casa."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué significa «arar la tierra sin labrar» del corazón antes de la lluvia del Espíritu (Os. 10:12)?",
      "seguimiento": "¿Cuál es tu paso concreto de esta semana, y a quién podrías explicar el manto de justicia?",
      "ilustracion": "Hacemos los surcos; Dios da el deseo (Fil. 2:13) y envía la lluvia. La tarea es de los dos.",
      "transicion": "Reunamos todo en un Camino y un paso concreto para los próximos días.",
      "actividad": "Compartan un solo paso concreto para arar y sembrar esta semana.",
      "cierre": "Aramos la tierra dura, Señor; haz caer tu lluvia y danos cosecha de amor."
    }
  ],
  "patternTemplate": "{name}, cuando algo te aparta de Dios sueles dejar que {slot:distraccion|lower} ocupe su lugar, y ante su voz tiendes a {slot:voz|lower}. Pero estás aprendiendo a distinguir el arrepentimiento genuino y a sostener su gracia: {slot:gracia|lower}. La bondad de Dios ya está abriendo en ti un surco que conduce a casa.",
  "outOracion": "Señor, vengo a ti reconociendo que {slot:distraccion|lower} me ha apartado de tu lado. Confieso que ante tu voz suelo {slot:voz|lower}, pero hoy elijo arrepentirme de verdad y no solo lamentarme. Dejo a tus pies {slot:confesion|lower}. Gracias porque {slot:gracia|lower}, y porque me vistes con tu manto de justicia. «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, no te quedes mirando a Dios desde lejos. Aunque hoy te pese {slot:distraccion|lower}, su bondad ya corrió a buscarte y sostiene un manto blanco con manos heridas. «{verse}» ({verseRef}). Corre a la Cruz: el camino a casa empieza con una sola palabra, perdóname.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y dejaré a sus pies {slot:confesion|lower}, confiando en que él es fiel y justo para perdonar.",
  "outPregunta": "Esta semana descubrí que cuando algo me aparta de Dios suele ser {slot:distraccion|lower}, y que ante su voz tiendo a {slot:voz|lower}. ¿Cómo distingues tú el arrepentimiento genuino del simple remordimiento, y dónde recibiste por última vez su perdón?",
  "outTarjeta": "Mi camino de esta semana: dejo a sus pies {slot:confesion|lower}, recibo su gracia —{slot:gracia|lower}— y me visto de su manto de justicia.\nVersículo: «{verse}» ({verseRef})."
}
);
