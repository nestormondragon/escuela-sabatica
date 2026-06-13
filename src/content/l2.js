import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 2,
  "slug": "conociendo-a-dios",
  "title": "Conociendo a Dios",
  "subtitle": "¿Y si lo que crees de Dios no fuera quien él realmente es?",
  "kitName": "Mi Mapa del Camino",
  "artifactNoun": "mapa",
  "motif": "road",
  "stages": [
    "senda",
    "primer-paso",
    "en-camino",
    "horizonte",
    "encuentro"
  ],
  "stageLabels": [
    "La senda se abre",
    "El primer paso",
    "En camino con él",
    "El horizonte se aclara",
    "Cara a cara · le conozco"
  ],
  "verseRef": "Juan 17:3",
  "verseText": "Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo, a quien tú has enviado.",
  "promise": "En unos minutos vas a trazar tu Mapa del Camino para conocer a Dios: nombrarás la imagen de él que cargas, desenmascararás las mentiras que lo distorsionan, te asombrarás ante su santidad, descansarás en su amor, descubrirás al Dios que está cerca, contemplarás su rostro en Jesús y darás un paso para reflejar su carácter a otros.",
  "ui": {
    "start": "Empezar a trazar mi mapa",
    "emptyKit": "Tu mapa",
    "building": "Cada elección dibuja un tramo del camino",
    "buildingHint": "Toca el tramo que brilla. Verás la senda abrirse hacia el horizonte.",
    "lastPiece": "Falta un tramo",
    "patternLabel": "Tu patrón en el camino",
    "doneTitle": "Tu mapa está completo",
    "doneSub": "Lo trazaste tú, con Dios. Ábrelo, guárdalo, compártelo.",
    "open": "Abrir mi mapa",
    "back": "Volver a mi mapa"
  },
  "slots": [
    {
      "id": "imagen",
      "n": 1,
      "label": "Mi imagen de Dios",
      "teaser": "Cómo lo veo hoy, en lo profundo…",
      "icon": "eye"
    },
    {
      "id": "mentira",
      "n": 2,
      "label": "La mentira que desenmascaro",
      "teaser": "Lo que distorsiona su rostro…",
      "icon": "wave"
    },
    {
      "id": "santidad",
      "n": 3,
      "label": "Su santidad",
      "teaser": "Lo que me hace caer de rodillas…",
      "icon": "flame"
    },
    {
      "id": "amor",
      "n": 4,
      "label": "Su amor",
      "teaser": "La verdad que sostengo de él…",
      "icon": "heart"
    },
    {
      "id": "cercania",
      "n": 5,
      "label": "El Dios que está cerca",
      "teaser": "Tan alto, y tan cercano…",
      "icon": "hand"
    },
    {
      "id": "rostro",
      "n": 6,
      "label": "Su rostro en Jesús",
      "teaser": "Lo que veo de Dios al mirar a Cristo…",
      "icon": "sunrise"
    },
    {
      "id": "retrato",
      "n": 7,
      "label": "Mi retrato de Dios",
      "teaser": "Quién es él, en una sola línea…",
      "icon": "compass"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Cómo reflejaré su carácter · a quién…",
      "icon": "footstep"
    }
  ],
  "stations": [
    {
      "id": "imagen",
      "day": "Sábado · El último mensaje de clemencia",
      "tag": "Tramo 1 · Mi imagen de Dios",
      "title": "¿A quién imaginas cuando dices «Dios»?",
      "story": "El mundo, dijo Elena de White, está envuelto en tinieblas por una falsa concepción de Dios. Su carácter ha sido malentendido y malinterpretado. Y el último mensaje de clemencia para este mundo es uno solo: una revelación de su carácter de amor. Antes de aprender quién es él, vale la pena mirar a quién hemos estado imaginando.",
      "cue": "Detente aquí, {name}. Antes de avanzar, mira a quién imaginas.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "Cuando piensas en Dios, ¿qué rostro suele aparecer primero?",
        "hint": "Elige el más honesto, no el más correcto",
        "saveLabel": "Guardar en mi mapa",
        "seedSub": "tu imagen de Dios",
        "closing": "«Una clara comprensión del carácter de Dios es fundamental para una relación significativa con él.» Esta semana corregiremos el retrato.",
        "options": [
          {
            "id": "juez",
            "label": "Un juez severo que vigila mis fallas",
            "insight": "Muchos heredan esta imagen sin notarlo. Pero la santidad de Dios no es frialdad: es bondad sin mezcla. Solo porque es santo podemos amarlo de verdad.",
            "tags": [
              "react:fear",
              "theme:self",
              "posture:avoidant"
            ]
          },
          {
            "id": "lejano",
            "label": "Alguien real pero distante",
            "insight": "Y sin embargo, Pablo dijo a los atenienses: «No está lejos de ninguno de nosotros, porque en él vivimos, y nos movemos, y existimos» (Hech. 17:27, 28).",
            "tags": [
              "react:withdraw",
              "theme:relationship",
              "posture:avoidant"
            ]
          },
          {
            "id": "borroso",
            "label": "Una idea borrosa que no logro definir",
            "insight": "Es honesto admitirlo. La Biblia descorre el velo: desde Génesis hasta Apocalipsis se nos muestra quién es el único Dios verdadero.",
            "tags": [
              "react:doubt",
              "theme:word",
              "posture:seeking"
            ]
          },
          {
            "id": "amoroso",
            "label": "Un Padre que me ama de verdad",
            "insight": "Esa es la imagen que él anhela que tengas. «Dios es amor» (1 Juan 4:8). Esta semana esa verdad se hará más honda en ti.",
            "tags": [
              "theme:grace",
              "posture:surrendering",
              "tone:tender"
            ]
          },
          {
            "id": "exigente",
            "label": "Un Dios al que nunca termino de complacer",
            "insight": "El amor de Dios es gratuito, no ganado. Envió a su Hijo «para que pudiéramos decidir libremente responder a ese amor», no para agotarnos.",
            "tags": [
              "react:self-blame",
              "theme:grace",
              "posture:clinging"
            ]
          },
          {
            "id": "poderoso",
            "label": "Todopoderoso, pero no sé si le importo",
            "insight": "Su poder es santo: nunca tiránico. Y el mismo Dios que crea con su voz se arrodilla a soplar aliento en el polvo (Gén. 2:7).",
            "tags": [
              "react:doubt",
              "theme:faith",
              "posture:seeking"
            ]
          }
        ]
      }
    },
    {
      "id": "mentira",
      "day": "Domingo · Una percepción más clara",
      "tag": "Tramo 2 · La mentira que desenmascaro",
      "title": "La primera duda del universo",
      "story": "Lucifer fue el primero en dudar del carácter de Dios, y esa duda encendió la mayor batalla de la historia. En el huerto, la serpiente susurró a Eva el mismo veneno: «Dios te oculta algo. No quiere lo mejor para ti. No puedes confiar en él» (Gén. 3:1-5). A Satanás no le importa qué imagen tengas de Dios, mientras no sea la verdadera.",
      "cue": "{name}, escucha bien: la misma mentira aún susurra hoy.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Cuál de estas mentiras sobre Dios te ha rozado a ti?",
        "hint": "Elige la que más te ha costado callar",
        "saveLabel": "Guardar en mi mapa",
        "seedSub": "la mentira que desenmascaras",
        "closing": "«Satanás se propuso desfigurar el carácter de Dios.» Nombrar la mentira es el primer paso para soltarla. La verdad de quién es él la desarma.",
        "options": [
          {
            "id": "oculta",
            "label": "«Dios me esconde algo bueno»",
            "insight": "La mentira más antigua. Pero «no escatimó ni a su propio Hijo» (Rom. 8:32). Quien dio lo más caro no te niega lo bueno.",
            "tags": [
              "react:doubt",
              "theme:grace",
              "posture:clinging"
            ]
          },
          {
            "id": "control",
            "label": "«Si confío en él, pierdo el control de mi vida»",
            "insight": "Eva creyó que tomar control la haría libre. La libertad verdadera está en confiar en Aquel que conoce el camino que tomas (Job 23:10).",
            "tags": [
              "react:control",
              "theme:faith",
              "posture:proud"
            ]
          },
          {
            "id": "indiferente",
            "label": "«A Dios en realidad no le importo»",
            "insight": "Esa voz no viene de él. «Como un padre se compadece de los hijos, así se compadece el Señor de los que le temen» (Sal. 103:13).",
            "tags": [
              "react:withdraw",
              "theme:relationship",
              "posture:avoidant"
            ]
          },
          {
            "id": "duro",
            "label": "«Dios es duro y difícil de complacer»",
            "insight": "Es el rumor que la serpiente sigue propagando. Jesús vino a desmentirlo: «El que me ha visto a mí, ha visto al Padre» (Juan 14:9).",
            "tags": [
              "react:fear",
              "theme:grace",
              "posture:avoidant"
            ]
          },
          {
            "id": "transmiti",
            "label": "Yo mismo transmití una imagen falsa de él",
            "insight": "Reconocerlo es valentía. Dios llama a su pueblo a representarlo correctamente, y eso empieza por conocerlo personalmente.",
            "tags": [
              "react:self-blame",
              "theme:service",
              "posture:humble"
            ]
          },
          {
            "id": "tarde",
            "label": "«Ya es demasiado tarde para mí»",
            "insight": "Ninguna mentira es más sutil. Pero su misericordia es nueva cada mañana (Lam. 3:23). Nunca es tarde para conocerlo.",
            "tags": [
              "react:self-blame",
              "theme:hope",
              "posture:clinging"
            ]
          }
        ]
      }
    },
    {
      "id": "santidad",
      "day": "Lunes · Dios es santo",
      "tag": "Tramo 3 · Su santidad",
      "title": "Santo, santo, santo",
      "story": "Moisés se quitó el calzado. Isaías clamó «¡ay de mí!». Juan cayó como muerto. Ante el Dios santo, los seres vivientes no cesan de exclamar: «Santo, santo, santo es el Señor Dios Todopoderoso» (Apoc. 4:8). Su santidad es el fundamento de todo lo demás: hace que su poder no sea tiranía y su amor no tenga egoísmo.",
      "cue": "Quítate el calzado aquí, {name}. Pisas terreno santo.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi mapa",
        "seedSub": "lo que te hace caer de rodillas",
        "prompt": "Toca cada retrato de su santidad · quédate con el que más te alcanza",
        "hint": "Cada texto descorre un poco más el velo",
        "chooseLabel": "Esto es lo que me hace caer de rodillas",
        "closing": "«La santidad de Dios es el fundamento de todos sus demás atributos.» Solo porque él es completamente bueno podemos amarlo sin temor.",
        "allowCustom": {
          "label": "Escribir lo mío",
          "placeholder": "Ante tu santidad, yo…",
          "extraKey": "santidadPropia"
        },
        "items": [
          {
            "t": "«Santos seréis, porque yo soy santo.»",
            "ref": "Levítico 20:26",
            "meaning": "Apartado del mal por completo. Su santidad no me aplasta: me invita a ser apartado para él."
          },
          {
            "t": "«No hay santo como el Señor; no hay refugio como nuestro Dios.»",
            "ref": "1 Samuel 2:2",
            "meaning": "Su santidad es a la vez roca y refugio. Lo único totalmente puro es también lo único totalmente seguro."
          },
          {
            "t": "«El Alto y Sublime habita con el quebrantado y humilde de espíritu.»",
            "ref": "Isaías 57:15",
            "meaning": "El Santísimo no se aleja del humilde: se acerca a él. La santidad y la cercanía no se contradicen."
          },
          {
            "t": "«Seré engrandecido y santificado, y sabrán que yo soy el Señor.»",
            "ref": "Ezequiel 38:23",
            "meaning": "Su santidad acabará por revelarse a todo el universo. Es la verdad que un día nadie podrá negar."
          }
        ]
      }
    },
    {
      "id": "amor",
      "day": "Martes · Dios es amor",
      "tag": "Tramo 4 · Su amor",
      "title": "No siente amor: él es amor",
      "story": "Juan no escribió «Dios siente amor», sino «Dios es amor» (1 Juan 4:8). El amor es la esencia misma de su carácter. Los hebreos lo llamaban jesed: amor de pacto, leal, firme, tierno, que protege. Y su mayor expresión tiene un nombre y un rostro: «de tal manera amó Dios al mundo, que dio a su Hijo» (Juan 3:16).",
      "cue": "{name}, deja que esto te alcance hoy: él es amor, y te ama así.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi mapa",
        "seedSub": "la verdad de su amor que sostienes",
        "prompt": "Elige la verdad de su amor que sostendrás esta semana",
        "hint": "Toca cada una · quédate con la que más necesitas",
        "chooseLabel": "Esta verdad la sostengo",
        "closing": "«El que permanece en el amor, permanece en Dios, y Dios en él» (1 Juan 4:16). Su amor no es un sentimiento que va y viene: es quién él es.",
        "allowCustom": {
          "label": "Escribir la mía",
          "placeholder": "Hoy creo que su amor…",
          "extraKey": "amorPropio"
        },
        "items": [
          {
            "t": "«Dios es amor; el que permanece en el amor, permanece en Dios.»",
            "ref": "1 Juan 4:16",
            "meaning": "El amor no es una cosa que Dios hace: es lo que él es. Permanecer en él es habitar en su amor."
          },
          {
            "t": "«En esto consiste el amor: no en que nosotros le amáramos, sino en que él nos amó.»",
            "ref": "1 Juan 4:10",
            "meaning": "Su amor da el primer paso. No lo provoco con mi bondad; lo recibo por su gracia."
          },
          {
            "t": "«En el amor no hay temor; el perfecto amor echa fuera el temor.»",
            "ref": "1 Juan 4:18",
            "meaning": "Conocer su amor desarma el miedo. Si tiemblo ante él, aún no he conocido del todo su amor."
          },
          {
            "t": "«De tal manera amó Dios al mundo, que dio a su Hijo.»",
            "ref": "Juan 3:16",
            "meaning": "El amor más radical, magnánimo y altruista, demostrado en la entrega de Jesús por mí."
          }
        ]
      }
    },
    {
      "id": "cercania",
      "day": "Miércoles · Dios y la creación",
      "tag": "Tramo 5 · El Dios que está cerca",
      "title": "Tan alto, y tan cercano",
      "story": "«En el principio Dios» — Elohim, el Creador todopoderoso que trae todo a la existencia con su voz. Pero en Génesis 2 aparece otro nombre: Yahweh, el Dios del pacto, tan cercano que se arrodilla a modelar al hombre del polvo y le sopla en la nariz aliento de vida. Trascendente sobre todo, e íntimo a tu lado.",
      "cue": "Aquí, {name}, el Dios del universo se inclina para acercarse a ti.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi mapa",
        "seedSub": "el Dios cercano que descubres",
        "prompt": "Toca cada carta: a un lado lo que temes, al otro quién es él",
        "hint": "Trascendente y cercano, en la misma página",
        "pairs": [
          {
            "see": "Lo crees demasiado grande para fijarse en ti.",
            "sees": "Es tan poderoso que crea con su voz, y se arrodilla a soplarte aliento."
          },
          {
            "see": "Sientes que tienes que gritar para que te oiga.",
            "sees": "«No está lejos de ninguno de nosotros» (Hech. 17:27)."
          },
          {
            "see": "Crees que controla el universo, pero no tu vida.",
            "sees": "El que sostiene las estrellas conoce tu nombre y tu camino."
          },
          {
            "see": "Te sientes una mota de polvo sin importancia.",
            "sees": "De ese mismo polvo te formó con sus manos, y te dio su aliento (Gén. 2:7)."
          }
        ],
        "chooseLabel": "Esta es la verdad que necesitaba",
        "teach": "Elohim revela su trascendencia: está más allá de nosotros y lo controla todo. Yahweh revela su inmanencia: está cerca. Necesitamos ambos para conocerlo bien.",
        "commit": {
          "prompt": "¿Dónde necesitas recordar esta semana que él está cerca, no lejos?",
          "hint": "Nómbralo · él ya está ahí",
          "placeholder": "En medio de…, recordaré que él está cerca.",
          "extraKey": "cercaniaTexto",
          "shareable": false
        }
      }
    },
    {
      "id": "rostro",
      "day": "Jueves · Emanuel, Dios con nosotros",
      "tag": "Tramo 6 · Su rostro en Jesús",
      "title": "El que me ha visto, ha visto al Padre",
      "story": "Si tuvieras que mostrarle a alguien quién es Dios, ¿a quién señalarías? La mejor respuesta es Jesús. «El que me ha visto a mí, ha visto al Padre» (Juan 14:9). Por eso su nombre es Emanuel, «Dios con nosotros» (Mat. 1:23), y su última promesa es «yo estoy con vosotros todos los días» (Mat. 28:20). Empezó con nosotros, y se queda con nosotros.",
      "cue": "Mira aquí, {name}: en el rostro de Jesús ves el corazón del Padre.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi mapa",
        "seedSub": "lo que ves de Dios en Jesús",
        "skill": {
          "prompt": "Cuatro Evangelios, un solo Cristo: ¿quién pinta cada retrato?",
          "hint": "Cada evangelista nos da una perspectiva del mismo Jesús.",
          "badge": "Estás aprendiendo a ver a Dios en los cuatro retratos de Cristo",
          "cats": [
            "Mateo · el Mesías",
            "Marcos · el Siervo",
            "Lucas · el Hombre compasivo",
            "Juan · el Hijo de Dios"
          ],
          "rounds": [
            {
              "t": "Jesús es el Mesías esperado que cumple lo prometido a Israel.",
              "a": 0,
              "fb": "Mateo: escrito por un judío y para judíos, presenta al Cristo prometido."
            },
            {
              "t": "Vemos su vida de servicio activo, atento a cada necesidad.",
              "a": 1,
              "fb": "Marcos: el Maestro que sirve y se sacrifica, siempre en acción."
            },
            {
              "t": "El testimonio fidedigno de su perfecta humanidad y compasión.",
              "a": 2,
              "fb": "Lucas: el médico que registra la ternura humana del Salvador."
            },
            {
              "t": "El Verbo encarnado: cree, y tu vida espiritual será vivificada.",
              "a": 3,
              "fb": "Juan: el Hijo de Dios, para que creamos y tengamos vida."
            },
            {
              "t": "Su nombre será Emanuel: Dios con nosotros.",
              "a": 0,
              "fb": "Mateo 1:23: el evangelio que enmarca toda la vida de Jesús con la presencia de Dios."
            }
          ],
          "summary": "Cuatro perspectivas, un solo rostro. Para conocer a Dios, contempla a Jesús: sus palabras, sus actos, su cruz y su resurrección. En él, Dios se hizo visible."
        },
        "commit": {
          "prompt": "¿Qué de Dios viste en Jesús que necesitabas ver?",
          "hint": "Sé específico, como en la oración del jueves: «Gracias, Dios, por ser…»",
          "placeholder": "En Jesús vi que Dios es…",
          "extraKey": "rostroTexto",
          "options": [
            "Que Dios se acerca al que sufre",
            "Que Dios perdona de verdad",
            "Que Dios no se avergüenza de mí",
            "Que Dios es tierno con el quebrantado",
            "Que Dios cumple lo que promete"
          ]
        }
      }
    },
    {
      "id": "retrato",
      "day": "El retrato completo",
      "tag": "Tramo 7 · Mi retrato de Dios",
      "title": "Quién es él, en una sola línea",
      "story": "Solo hemos tocado la superficie de un Dios más grande y sorprendente de lo que podemos imaginar; lo estaremos conociendo por la eternidad. Pero esta semana descubriste tramos del camino. Júntalos: su santidad, su amor, su cercanía, su rostro en Jesús. Ese es el Dios que te invita a conocerlo.",
      "cue": "Mira atrás el camino, {name}, y nombra al Dios que encontraste.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Trazar mi retrato · guardar",
        "seedSub": "tu retrato de Dios",
        "chain": [
          {
            "word": "Santo",
            "line": "Apartado de todo mal: por eso puedo confiar en su poder."
          },
          {
            "word": "Amor",
            "line": "No siente amor: él es amor, y me amó primero."
          },
          {
            "word": "Cercano",
            "line": "El Altísimo se arrodilla a soplar aliento en el polvo."
          },
          {
            "word": "Emanuel",
            "line": "En Jesús se hizo visible, y está conmigo todos los días."
          }
        ],
        "climax": "Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo.",
        "prompt": "En una sola línea, ¿quién es el Dios que conociste esta semana?",
        "hint": "«El último mensaje de clemencia es una revelación de su carácter de amor.»",
        "options": [
          "Un Dios santo en quien puedo confiar",
          "Un Padre que me amó primero",
          "El Altísimo que se acerca a mí",
          "Emanuel: Dios conmigo todos los días"
        ],
        "allowCustom": {
          "placeholder": "Mi Dios es…",
          "extraKey": "retratoPropio"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Tramo 8 · Mi paso de la semana",
      "title": "Reflejar su rostro a otros",
      "story": "El amor de Dios es como un océano ilimitado; el cariño humano más tierno es apenas una gota frente a él. Y Dios llama a su pueblo a representar correctamente su carácter ante el mundo. Conocerlo nos cambia, y nos envía: para reflejar su amor y su carácter en favor de los demás.",
      "cue": "Antes de partir, {name}, decide a quién mostrarás su rostro.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi mapa",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto para conocerlo mejor",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Escudriñar su Palabra cada día para conocerlo",
          "Leer el capítulo 1 de El camino a Cristo",
          "Estudiar un atributo nuevo de su carácter",
          "Orar alabándolo por ser quien es",
          "Leer un Evangelio entero para contemplar a Jesús"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien a quien mostraré el verdadero rostro de Dios",
        "personHint": "Piensa en quién carga una imagen distorsionada de él",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "reflejar"
      }
    }
  ],
  "encourage": [
    "«Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero.» — Juan 17:3",
    "«Santo, santo, santo es el Señor Dios Todopoderoso.» — Apocalipsis 4:8",
    "«Dios es amor; el que permanece en el amor, permanece en Dios.» — 1 Juan 4:16",
    "«No está lejos de ninguno de nosotros; en él vivimos, nos movemos y existimos.» — Hechos 17:27, 28",
    "«El que me ha visto a mí, ha visto al Padre.» — Juan 14:9",
    "«Su nombre será Emanuel, que traducido es: Dios con nosotros.» — Mateo 1:23",
    "«No hay santo como el Señor; no hay refugio como nuestro Dios.» — 1 Samuel 2:2",
    "«De tal manera amó Dios al mundo, que dio a su Hijo.» — Juan 3:16"
  ],
  "discussion": [
    "¿Cuál de los atributos divinos estudiados esta semana hizo el mayor impacto en tu comprensión de Dios? ¿Qué otro atributo podrías estudiar para profundizar tu relación con él?",
    "Lee o escucha el capítulo 1 de El camino a Cristo con un familiar o amigo y coméntenlo. ¿Qué nueva visión del carácter de Dios y de Jesús obtuviste?",
    "Jesús vino a corregir la imagen distorsionada que muchos tienen de Dios. ¿Qué puedes hacer para compartir una imagen clara y correcta de él en tu esfera de influencia?",
    "Lee 1 Pedro 1:13-16; Romanos 6:22 y Hebreos 12:14. Dios es santo y nos invita a serlo. ¿Qué significa realmente vivir de manera santa?",
    "¿De qué manera podrías tú mismo haber transmitido una imagen equivocada de Dios a quienes te rodean? ¿Cómo lo corregirías?",
    "Si tuvieras que mostrarle a un no creyente quién es Dios, ¿qué pasaje o historia de Jesús elegirías, y por qué?",
    "Génesis presenta a Dios como trascendente (Elohim) y cercano (Yahweh). ¿Cuál de estos dos lados necesitas recordar más en esta etapa de tu vida?"
  ],
  "facilitator": [
    {
      "stationId": "imagen",
      "apertura": "Si tuviéramos que describir a Dios en una palabra, ¿cuál saldría primero, y de dónde viene esa imagen?",
      "seguimiento": "¿Qué imagen de Dios cargas en lo profundo, aunque sepas la respuesta correcta?",
      "ilustracion": "El mundo está en tinieblas por una falsa concepción de Dios; el último mensaje de clemencia es una revelación de su carácter de amor.",
      "transicion": "Si tenemos imágenes distorsionadas, conviene preguntar de dónde vienen: del primer mentiroso.",
      "actividad": "Que cada uno nombre, si desea, la primera palabra que le viene al pensar en Dios.",
      "cierre": "Señor, corrige el retrato que llevamos de ti, y muéstranos tu verdadero rostro."
    },
    {
      "stationId": "mentira",
      "apertura": "¿Qué le dijo realmente la serpiente a Eva acerca del carácter de Dios?",
      "seguimiento": "¿Qué mentira sobre Dios te ha costado más callar a ti?",
      "ilustracion": "Satanás no se preocupa por qué imagen tengamos de Dios, mientras no sea la verdadera. El veneno es siempre el mismo: «no puedes confiar en él».",
      "transicion": "Frente a la mentira de un Dios que esconde el bien, veamos primero su santidad.",
      "actividad": "Lean Génesis 3:1-5 y nombren las tres mentiras que Satanás insinuó sobre Dios.",
      "cierre": "Desenmascara en nosotros, Señor, toda mentira que distorsione tu rostro."
    },
    {
      "stationId": "santidad",
      "apertura": "¿Por qué quienes vieron a Dios cayeron de rodillas o se cubrieron el rostro?",
      "seguimiento": "¿Cómo cambia tu relación con Dios saber que es totalmente santo?",
      "ilustracion": "Solo la santidad de Dios hace posible amarlo: significa que su poder no es tiranía y su amor no tiene egoísmo.",
      "transicion": "Su santidad es el fundamento; sobre ella descansa la verdad más dulce: Dios es amor.",
      "actividad": "Lean Apocalipsis 4:8 y comenten por qué los seres vivientes repiten «santo» sin cesar.",
      "cierre": "Santo, santo, santo eres tú; enséñanos a acercarnos con reverencia y confianza."
    },
    {
      "stationId": "amor",
      "apertura": "¿Qué diferencia hay entre decir «Dios siente amor» y «Dios es amor»?",
      "seguimiento": "¿Qué verdad de su amor necesitas sostener esta semana?",
      "ilustracion": "Jesed: el amor de pacto, leal, firme y tierno. La mayor prueba tiene rostro: «dio a su Hijo».",
      "transicion": "Ese Dios santo y amoroso, ¿está lejos o cerca? Lo veremos en la creación.",
      "actividad": "Lean 1 Juan 4:7-19 y subrayen cada vez que aparece «permanecer».",
      "cierre": "Gracias, Dios, porque tú eres amor, y nos amaste primero."
    },
    {
      "stationId": "cercania",
      "apertura": "¿Qué revelan los nombres Elohim y Yahweh sobre el carácter de Dios?",
      "seguimiento": "¿Dónde necesitas recordar que Dios está cerca, no lejos?",
      "ilustracion": "El Dios que crea con su voz se arrodilla a modelar al hombre del polvo y le sopla aliento de vida.",
      "transicion": "El Dios cercano se acercó del todo en una persona: Emanuel, Dios con nosotros.",
      "actividad": "Comparen Génesis 1:1 y 2:7 y comenten qué dos caras de Dios revelan.",
      "cierre": "Altísimo y cercano, ayúdanos a vivir sabiendo que nunca estás lejos."
    },
    {
      "stationId": "rostro",
      "apertura": "Si quisieras mostrarle a alguien quién es Dios, ¿a quién señalarías y por qué?",
      "seguimiento": "¿Qué de Dios viste en Jesús que necesitabas ver?",
      "ilustracion": "Cuatro Evangelios, un solo rostro: el Mesías, el Siervo, el Hombre compasivo, el Hijo de Dios. «El que me ha visto a mí, ha visto al Padre».",
      "transicion": "Con todo lo aprendido, juntemos el retrato completo de Dios.",
      "actividad": "Que cada uno diga cuál Evangelio leyó más recientemente y qué le mostró de Jesús.",
      "cierre": "Emanuel, gracias por estar con nosotros todos los días."
    },
    {
      "stationId": "retrato",
      "apertura": "Reunamos la semana: santidad, amor, cercanía, el rostro de Jesús. ¿Quién es este Dios?",
      "seguimiento": "Si tuvieras que describir a Dios en una sola línea hoy, ¿qué dirías?",
      "ilustracion": "Estaremos conociéndolo por la eternidad; solo hemos tocado la superficie de un Dios más grande de lo que imaginamos.",
      "transicion": "Conocerlo nos cambia y nos envía: a reflejar su rostro a otros.",
      "actividad": "Reciten juntos Juan 17:3 y compartan, en una palabra, al Dios que conocieron.",
      "cierre": "Que conocerte sea nuestra vida eterna, empezando hoy."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué significa que Dios nos llama a representar correctamente su carácter?",
      "seguimiento": "¿A quién podrías mostrarle esta semana el verdadero rostro de Dios?",
      "ilustracion": "El cariño humano más tierno es apenas una gota frente al océano ilimitado del amor de Dios.",
      "transicion": "Cerremos con un paso concreto y un nombre.",
      "actividad": "Compartan un solo paso para conocer mejor a Dios esta semana.",
      "cierre": "Úsanos, Señor, para que otros vean en nosotros tu verdadero carácter."
    }
  ],
  "patternTemplate": "{name}, empezaste viendo a Dios como {slot:imagen|lower}, y aprendiste a desenmascarar la mentira de {slot:mentira|lower}. Ahora, ante su santidad, sostienes {slot:amor|lower}. La senda se abre: cuanto más lo conoces, más cerca lo descubres.",
  "outOracion": "Señor, vine a ti cargando una imagen de ti como {slot:imagen|lower}. Confieso la mentira que me rondaba: {slot:mentira|lower}. Pero esta semana te conocí mejor: tu santidad me hizo caer de rodillas, y sostengo esta verdad de tu amor: {slot:amor|lower}. Ayúdame a recordar que no estás lejos, que en Jesús te hiciste visible, y que eres {slot:retrato|lower}. «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, no estás solo en tu búsqueda de Dios. Él no es {slot:mentira|lower}; él es {slot:retrato|lower}. El que crea con su voz se arrodilla a acercarse a ti, y en Jesús puso rostro a su amor. Sigue caminando: conocerlo es la vida eterna.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y voy a mostrarle el verdadero rostro de Dios a {reflejar} con un gesto concreto.",
  "outPregunta": "Esta semana descubrí que cargaba una imagen de Dios como {slot:imagen|lower}, pero llegué a conocerlo como {slot:retrato|lower}. ¿Cuál de los atributos de Dios ha cambiado más tu manera de verlo, y a quién podrías ayudar a ver su verdadero rostro?",
  "outTarjeta": "Mi mapa de esta semana: dejé de ver a Dios como {slot:imagen|lower} y aprendí a conocerlo como {slot:retrato|lower}. Sostengo esta verdad de su amor: {slot:amor|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
