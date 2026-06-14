import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 9,
  "slug": "pecado-evangelio-ley",
  "title": "El Pecado, el Evangelio y la Ley",
  "subtitle": "¿Sobre qué estás construyendo el camino de tu vida?",
  "kitName": "Mi Senda",
  "artifactNoun": "senda",
  "motif": "road",
  "stages": [
    "niebla",
    "senal",
    "espejo",
    "cruz",
    "roca"
  ],
  "stageLabels": [
    "En la niebla",
    "Aparece la señal",
    "El espejo de la Ley",
    "La Cruz en el camino",
    "Edificado sobre la Roca"
  ],
  "verseRef": "Salmo 119:93, 94",
  "verseText": "Jamás olvidaré tus mandamientos, porque con ellos me has vivificado. Tuyo soy; sálvame, porque he buscado tus mandamientos.",
  "promise": "En unos minutos vas a trazar tu Senda: nombrarás lo que hoy te distrae de Dios, descubrirás dónde tropiezas, dejarás que la Ley te muestre la verdad, hallarás la Cruz que la Ley no podía darte, elegirás obedecer por amor y edificarás tu vida sobre la Roca que no se mueve.",
  "ui": {
    "start": "Empezar a trazar mi senda",
    "emptyKit": "Tu senda",
    "building": "Cada elección traza un tramo del camino",
    "buildingHint": "Toca el tramo que brilla. Verás la niebla despejarse hasta la Roca.",
    "lastPiece": "Falta un tramo",
    "patternLabel": "Tu patrón en el camino",
    "doneTitle": "Tu senda está trazada",
    "doneSub": "La trazaste tú, con Dios. Ábrela, guárdala, compártela.",
    "open": "Abrir mi senda",
    "back": "Volver a mi senda"
  },
  "slots": [
    {
      "id": "obstaculo",
      "n": 1,
      "label": "Mi mayor obstáculo",
      "teaser": "Lo que hoy me separa de Dios…",
      "icon": "cloud"
    },
    {
      "id": "distraccion",
      "n": 2,
      "label": "Mi distracción",
      "teaser": "Lo que me roba tiempo con él…",
      "icon": "wave"
    },
    {
      "id": "tropiezo",
      "n": 3,
      "label": "Mi tropiezo",
      "teaser": "Lo que necesito quitar con decisión…",
      "icon": "hand"
    },
    {
      "id": "espejo",
      "n": 4,
      "label": "El espejo de la Ley",
      "teaser": "Lo que la Ley me muestra…",
      "icon": "eye"
    },
    {
      "id": "cruz",
      "n": 5,
      "label": "La Cruz que me justifica",
      "teaser": "Lo que la Ley no podía darme…",
      "icon": "release"
    },
    {
      "id": "amor",
      "n": 6,
      "label": "Obedecer por amor",
      "teaser": "Hacer su voluntad, no solo saberla…",
      "icon": "heart"
    },
    {
      "id": "roca",
      "n": 7,
      "label": "Edificado sobre la Roca",
      "teaser": "La verdad sobre la que construyo…",
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
      "id": "obstaculo",
      "day": "Sábado · El mayor obstáculo",
      "tag": "Tramo 1 · Mi mayor obstáculo",
      "title": "Lo que más te separa de Dios",
      "story": "El pecado es, sin duda, el mayor obstáculo para una relación estrecha con Dios. No solo nos separa de él (Isa. 59:2): también nos engaña, nos hiere y, poco a poco, nos consume. La sociedad se acomodó a él y casi nadie lo llama por su nombre. Pero cuanto más cómodos estamos con el pecado, más lejos quedamos de Dios.",
      "cue": "Detente aquí, {name}. Antes de avanzar, mira el camino con honestidad.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Qué siente tu corazón que hoy más te separa de Dios?",
        "hint": "Elige lo más real ahora mismo",
        "saveLabel": "Guardar en mi senda",
        "seedSub": "tu obstáculo",
        "closing": "El pecado no es una parte normal de la vida: es lo que nos aleja de Aquel que más nos ama. Pero Dios se reveló en su Ley justamente para señalarlo… y luego sanarlo.",
        "options": [
          {
            "id": "comodidad",
            "label": "Me acomodé al pecado",
            "insight": "Llamar al pecado por su nombre incomoda, pero negarlo nos endurece. El primer paso de vuelta es dejar de fingir que no pasa nada.",
            "tags": [
              "react:apathy",
              "theme:sin",
              "posture:avoidant"
            ]
          },
          {
            "id": "orgullo",
            "label": "Mi orgullo y autosuficiencia",
            "insight": "«El que piensa estar firme, mire que no caiga» (1 Cor. 10:12). La batalla contra el orgullo es la más grande que enfrentarás.",
            "tags": [
              "react:pride",
              "theme:humility",
              "posture:proud"
            ]
          },
          {
            "id": "verguenza",
            "label": "La culpa de viejos pecados",
            "insight": "El Enemigo te recuerda tu pecado para hacerte sentir indigno y alejarte. Pero la convicción de Dios siempre apunta hacia el perdón, no hacia el rechazo.",
            "tags": [
              "react:self-blame",
              "theme:grace",
              "tone:raw"
            ]
          },
          {
            "id": "distancia",
            "label": "Una distancia fría con Dios",
            "insight": "El pecado destruye la relación en silencio. No hace falta un gran escándalo: basta dejar que la cercanía se enfríe.",
            "tags": [
              "react:withdraw",
              "theme:relationship",
              "posture:avoidant"
            ]
          },
          {
            "id": "secreto",
            "label": "Un pecado que escondo",
            "insight": "Lo oculto crece en la oscuridad. Sacarlo a la luz delante de Dios le quita su poder de separarte de él.",
            "tags": [
              "react:withdraw",
              "theme:sin",
              "tone:raw"
            ]
          },
          {
            "id": "duda",
            "label": "Resto importancia al pecado",
            "insight": "Cuando la cultura normaliza el pecado, casi no lo notamos. Pero la Ley aporta claridad: nos deja ver lo que de verdad nos rodea.",
            "tags": [
              "react:doubt",
              "theme:word",
              "posture:avoidant"
            ]
          }
        ]
      }
    },
    {
      "id": "distraccion",
      "day": "Domingo · Distracciones y tentaciones",
      "tag": "Tramo 2 · Mi distracción",
      "title": "Sansón servía mientras cedía",
      "story": "Sansón fue llamado por Dios, pero servía al Señor mientras cedía a la tentación, confiando en su propia fuerza. Cayó porque se creía fuerte. El Enemigo conoce tus debilidades y usa lo que te distrae —no siempre algo malo en sí— para robarte el tiempo y la energía que mantienen viva tu relación con Dios. Hasta Jesús, cansado como nosotros, escapaba a dialogar a solas con su Padre.",
      "cue": "{name}, deja que esto te alcance hoy: ¿qué te está robando a Dios?",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Qué te roba el tiempo y la energía para estar con Dios?",
        "hint": "Elige lo más sincero",
        "saveLabel": "Guardar en mi senda",
        "seedSub": "tu distracción",
        "closing": "Buscar a Dios debería ser tu prioridad (Mat. 6:33) antes de sumergirte deprisa en el día. Como Sansón, no caigas por creerte fuerte: tu fe se mantiene firme prestando atención a la Palabra.",
        "options": [
          {
            "id": "pantallas",
            "label": "Las redes y las pantallas",
            "insight": "Quizá no sea malo en sí mismo, pero un solo desbalance puede dejar casi nada de tiempo para Dios y los demás.",
            "tags": [
              "react:withdraw",
              "theme:self",
              "tone:tender"
            ]
          },
          {
            "id": "trabajo",
            "label": "El trabajo y lo urgente",
            "insight": "Lo urgente ahoga lo importante. Jesús conocía esas presiones, pero escapaba de ellas para estar a solas con su Padre (Mar. 1:35).",
            "tags": [
              "react:control",
              "theme:service",
              "posture:clinging"
            ]
          },
          {
            "id": "placer",
            "label": "El placer y la comodidad",
            "insight": "Es propio de la naturaleza humana dejarse llevar por el placer. Sansón también lo creyó inofensivo… hasta que lo destruyó.",
            "tags": [
              "react:apathy",
              "theme:sin",
              "posture:avoidant"
            ]
          },
          {
            "id": "autosuficiencia",
            "label": "Confiar en mis propias fuerzas",
            "insight": "Sansón dependía de su fuerza para vencer la tentación, y cayó. La fuerza para resistir nace de pasar tiempo a solas con Dios.",
            "tags": [
              "react:pride",
              "theme:humility",
              "posture:proud"
            ]
          },
          {
            "id": "apatia",
            "label": "Una apatía espiritual",
            "insight": "Jesús comprende tu condición, pero reprende tu apatía (Apoc. 3:14-22). Te invita a recuperar el fuego antes de que se apague.",
            "tags": [
              "react:apathy",
              "theme:hope",
              "tone:raw"
            ]
          },
          {
            "id": "ocupacion",
            "label": "Estar siempre ocupado",
            "insight": "El exceso en cualquier área deja poco lugar para Dios. Escapar un rato a solas con él es lo más sabio que puedes hacer.",
            "tags": [
              "react:control",
              "theme:prayer",
              "posture:clinging"
            ]
          }
        ]
      }
    },
    {
      "id": "tropiezo",
      "day": "Lunes · Desafíos en mi relación con Dios",
      "tag": "Tramo 3 · Mi tropiezo",
      "title": "Lo que te hace tropezar",
      "story": "Jesús usó una metáfora extrema: si tu mano, pie u ojo son instrumentos del pecado, sería mejor cortarlos (Mar. 9:42-48). Que lo dijera muestra cuán grave consideraba el pecado. Pablo y Jesús nombran lo que nos hace tropezar: la autosuficiencia, la vanidad, la lujuria, el juicio a otros, el odio al enemigo, el enojo. Cosas pequeñas que levantan grandes barreras con Dios.",
      "cue": "Aquí, {name}, conviene ser valiente: nombra lo que te hace tropezar.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi senda",
        "seedSub": "tu tropiezo",
        "skill": {
          "prompt": "Afina la mirada: ¿esto construye o derriba tu relación con Dios?",
          "hint": "Jesús nombró lo que nos hace tropezar. Aprende a reconocerlo.",
          "badge": "Estás aprendiendo a ver lo que levanta barreras con Dios",
          "cats": [
            "Levanta barrera",
            "Acerca a Dios"
          ],
          "rounds": [
            {
              "t": "«Le cuento a todos lo bueno que soy.»",
              "a": 0,
              "fb": "Levanta barrera: «no toques trompeta ante ti» (Mat. 6:2). La vanidad nos separa; la humildad nos acerca."
            },
            {
              "t": "«Oro por la persona que me hizo daño.»",
              "a": 1,
              "fb": "Acerca a Dios: «oren por los que los maltratan» (Mat. 5:44). El amor derriba el muro que el rencor levantó."
            },
            {
              "t": "«Critico y juzgo a los demás por costumbre.»",
              "a": 0,
              "fb": "Levanta barrera: «no juzguen, para que no sean juzgados» (Mat. 7:1). Dios es el Juez; no su lugar."
            },
            {
              "t": "«Cuido lo que miran mis ojos.»",
              "a": 1,
              "fb": "Acerca a Dios: «haz lo que sea necesario para erradicar la lujuria» (cf. Mat. 5:28, 29). Cuidar la mirada protege el corazón."
            },
            {
              "t": "«Guardo enojo contra quienes me rodean.»",
              "a": 0,
              "fb": "Levanta barrera: «el que se enoje con su hermano será culpado» (Mat. 5:22). El enojo erige un muro al instante."
            },
            {
              "t": "«Reconozco que solo no puedo, y dependo de Dios.»",
              "a": 1,
              "fb": "Acerca a Dios: lo contrario de Sansón. «El que piensa estar firme, mire que no caiga» (1 Cor. 10:12)."
            }
          ],
          "summary": "Amputar mano o pie es una metáfora extrema; Jesús la usó para mostrar cuán grave es el pecado. ¿Cuán grave lo consideras tú? Haz lo necesario para quitar lo que te separa de él."
        },
        "commit": {
          "prompt": "¿Qué tropiezo decidirás quitar de tu camino esta semana?",
          "hint": "No basta verlo: decídete a removerlo.",
          "placeholder": "dejar de juzgar a…, orar por mi enemigo, cuidar mi mirada…",
          "extraKey": "tropiezoTexto",
          "options": [
            "Dejar de criticar y juzgar a otros",
            "Orar por alguien que me hizo daño",
            "Cuidar lo que miran mis ojos",
            "Soltar un enojo que vengo guardando",
            "Dejar de presumir y ser humilde"
          ]
        }
      }
    },
    {
      "id": "espejo",
      "day": "Martes · La Ley",
      "tag": "Tramo 4 · El espejo de la Ley",
      "title": "El espejo que te muestra como eres",
      "story": "El pecado es la transgresión de la Ley (1 Juan 3:4). La Ley funciona como un par de anteojos que aclara lo que nos rodea, o como un espejo para vernos como realmente somos. Dios la escribió con su propia mano (Éxo. 20) y Jesús la resumió en amor: amar a Dios y al prójimo. La Ley no es una carga: «sus mandamientos no son gravosos» (1 Juan 5:3). Tiene que ver con relaciones.",
      "cue": "{name}, mírate en este espejo sin miedo; quien te mira te ama.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi senda",
        "seedSub": "lo que la Ley te muestra",
        "prompt": "Mírate en el espejo de la Ley: ¿qué necesitas ver hoy?",
        "hint": "Toca cada una · quédate con la que te alcanza",
        "chooseLabel": "Esta es la que necesito ver",
        "closing": "La Ley aporta claridad y convicción, y nos habla del carácter de Dios. Es una salvaguardia que él dio para proteger tu relación con él y con los demás. No te limita: te protege.",
        "allowCustom": {
          "label": "Escribir la mía",
          "placeholder": "El espejo de la Ley me muestra que…",
          "extraKey": "espejoPropio"
        },
        "items": [
          {
            "t": "«No hay justo, ni aun uno.»",
            "ref": "Romanos 3:10",
            "meaning": "El espejo me muestra mi necesidad real: no puedo justificarme a mí mismo. Ese es el primer paso hacia la gracia."
          },
          {
            "t": "«Amarás al Señor tu Dios con todo tu corazón.»",
            "ref": "Marcos 12:30",
            "meaning": "El corazón de la Ley es amor, no reglas frías. Mide cuánto sitio le doy de verdad a Dios."
          },
          {
            "t": "«Amarás a tu prójimo como a ti mismo.»",
            "ref": "Marcos 12:31",
            "meaning": "La Ley es relación. Me muestra cómo trato realmente a quienes me rodean."
          },
          {
            "t": "«Sus mandamientos no son gravosos.»",
            "ref": "1 Juan 5:3",
            "meaning": "Lo que parecía carga es protección. El legalismo distorsiona; el amor cumple la Ley con libertad."
          }
        ]
      }
    },
    {
      "id": "cruz",
      "day": "Miércoles · La Ley y el Evangelio",
      "tag": "Tramo 5 · La Cruz que me justifica",
      "title": "Lo que la Ley nunca pudo darte",
      "story": "Jesús no vino a abolir la Ley, sino a cumplirla (Mat. 5:17, 18). Pero la Ley solo puede señalar el pecado: no perdona, no justifica, no expía. Por eso el evangelio es imprescindible. Mantener siempre ante tus ojos la Cruz y la muerte sustitutoria de Cristo es la mejor manera de amar a Dios. Su justicia se te imputa por la fe, no por tu cumplimiento de la Ley.",
      "cue": "Levanta los ojos aquí, {name}: en el camino hay una Cruz para ti.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi senda",
        "seedSub": "lo que la Cruz te da",
        "prompt": "Toca cada carta: lo que la Ley revela… y lo que la Cruz responde",
        "hint": "Dos verdades en el mismo camino",
        "pairs": [
          {
            "see": "La Ley te muestra que pecaste.",
            "sees": "La Cruz te ofrece el perdón que la Ley no podía dar."
          },
          {
            "see": "La Ley exige una justicia que no tienes.",
            "sees": "Cristo te imputa su justicia perfecta por la fe (Rom. 3:28)."
          },
          {
            "see": "Crees que tu obediencia te salva.",
            "sees": "«El justo por la fe vivirá» (Gál. 3:11): la fe, no la Ley, te justifica."
          },
          {
            "see": "El legalismo te agota tratando de merecerlo.",
            "sees": "La gracia te recibe primero, y el amor hace dulce la obediencia."
          }
        ],
        "chooseLabel": "Esta es la verdad que necesitaba",
        "teach": "La Ley y el evangelio van de la mano: la Ley señala por qué necesitas perdón; la Cruz te lo concede. Por eso quien ama a Jesús no cae en legalismo, sino que obedece por gratitud.",
        "commit": {
          "prompt": "Escribe lo que la Cruz cambia para ti hoy",
          "hint": "Mantén siempre ante tus ojos lo que Cristo hizo por ti",
          "placeholder": "Ya no cargo mi culpa, porque Jesús…",
          "extraKey": "cruzTexto",
          "shareable": true
        }
      }
    },
    {
      "id": "amor",
      "day": "Jueves · Saber y hacer",
      "tag": "Tramo 6 · Obedecer por amor",
      "title": "No basta saber: hay que hacer",
      "story": "«No todo el que me dice Señor, Señor, entrará en el reino… sino el que hace la voluntad de mi Padre» (Mat. 7:21). Algunos saben de Jesús sin conocerlo. El conocimiento importa, pero de nada sirve si no nos transforma. Como un hijo que ama y obedece, nuestra obediencia es el fruto y la evidencia del amor. Y «esta es la vida eterna: que te conozcan a ti» (Juan 17:3).",
      "cue": "{name}, aquí el camino te pide algo: no solo saber, también hacer.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Dónde está hoy tu mayor distancia entre saber y hacer?",
        "hint": "Elige lo que más te interpela",
        "saveLabel": "Guardar en mi senda",
        "seedSub": "tu obediencia de amor",
        "closing": "Si amas a Dios, querrás hacer su voluntad, porque sabes por experiencia que es lo mejor. La obediencia no compra su amor: lo revela. «Si me aman, guardarán mis mandamientos» (Juan 14:15).",
        "options": [
          {
            "id": "conocer",
            "label": "Sé de Dios, pero no lo conozco bien",
            "insight": "Jesús dijo que algunos sabrían de él sin conocerlo. La vida eterna es conocerlo a él, no solo datos sobre él (Juan 17:3).",
            "tags": [
              "react:doubt",
              "theme:relationship",
              "posture:seeking"
            ]
          },
          {
            "id": "escuchar",
            "label": "Escucho la Palabra pero no la vivo",
            "insight": "Oír sin hacer es edificar sobre arena (Mat. 7:26). El conocimiento que no transforma no sostiene en la tormenta.",
            "tags": [
              "react:apathy",
              "theme:word",
              "posture:avoidant"
            ]
          },
          {
            "id": "amor",
            "label": "Obedezco más por deber que por amor",
            "insight": "La obediencia es el fruto del amor, no su precio. Cuando amas genuinamente a Jesús, obedecer brota naturalmente.",
            "tags": [
              "react:self-blame",
              "theme:faith",
              "posture:surrendering"
            ]
          },
          {
            "id": "constancia",
            "label": "Empiezo bien y no soy constante",
            "insight": "Un hijo que suele hacer lo que se le pide revela la profundidad de su amor. La constancia se construye paso a paso, con él.",
            "tags": [
              "react:withdraw",
              "theme:hope",
              "posture:clinging"
            ]
          },
          {
            "id": "humildad",
            "label": "Quiero hacerlo a mi manera",
            "insight": "Hacer la voluntad del Padre, no la propia, es la marca de quien lo conoce. Rendir tu manera es el principio de la sabiduría.",
            "tags": [
              "react:control",
              "theme:humility",
              "posture:proud"
            ]
          },
          {
            "id": "receptivo",
            "label": "Quiero un corazón más receptivo",
            "insight": "Para sentir la interpelación de Jesús, los oídos deben abrirse y el corazón ablandarse. Esa apertura es ya un acto de fe.",
            "tags": [
              "react:cry-out",
              "theme:faith",
              "posture:surrendering"
            ]
          }
        ]
      }
    },
    {
      "id": "roca",
      "day": "La casa sobre la Roca",
      "tag": "Tramo 7 · Edificado sobre la Roca",
      "title": "Sobre qué edificas tu vida",
      "story": "Jesús cerró el Sermón del Monte con un desafío: quien oye sus palabras y las hace es como el que edificó su casa sobre la roca; vino la tormenta y no cayó (Mat. 7:24-29). El pecado nos separa; la Ley nos muestra; la Cruz nos justifica; el amor nos mueve a obedecer. Ahora junta los tramos: ¿sobre qué Roca quedará edificada tu senda?",
      "cue": "Casi llegas, {name}. Echa los cimientos donde nada podrá moverte.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Echar el cimiento · guardar",
        "seedSub": "tu roca",
        "chain": [
          {
            "word": "El pecado",
            "line": "Reconoces lo que te separa de Dios: el mayor obstáculo."
          },
          {
            "word": "La Ley",
            "line": "El espejo te muestra tu necesidad y el camino de regreso."
          },
          {
            "word": "El evangelio",
            "line": "La Cruz te da el perdón y la justicia que la Ley no podía dar."
          },
          {
            "word": "El amor",
            "line": "Conocerlo te lleva a hacer su voluntad: obedeces por gratitud."
          }
        ],
        "climax": "Y tu casa queda edificada sobre la Roca: oíste sus palabras y las hiciste; vendrá la tormenta y no caerás.",
        "prompt": "¿Sobre qué verdad echarás el cimiento de tu vida?",
        "hint": "«Toda la ley y los profetas penden de estos: amar a Dios y al prójimo» (Mat. 22:40)",
        "options": [
          "Que su Ley protege mi relación con él",
          "Que la justicia de Cristo me cubre por fe",
          "Que conocerlo es la vida eterna",
          "Que oír y hacer me edifica sobre la Roca"
        ],
        "allowCustom": {
          "placeholder": "edifico sobre…",
          "extraKey": "rocaPropia"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Tramo 8 · Mi paso de la semana",
      "title": "En quién confiarás en el Juicio",
      "story": "El gran desafío de Satanás contra Dios giró en torno a la Ley. Con su obediencia perfecta, Jesús nos mostró el hermoso carácter de Dios (Mat. 5:17, 18). Cuando todos tus pecados sean llevados ante el santo Dios, ¿en qué confiarás: en tu cumplimiento de la Ley, o en la perfecta justicia de Jesús como tu Sustituto? Reclama esa justicia por fe y refléjala luego en tu vida.",
      "cue": "{name}, antes de seguir el camino, da un paso real esta semana.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi senda",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto de esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Confiar en la justicia de Cristo, no en la mía",
          "Poner la Ley del amor en el centro de mi día",
          "Conocer a Dios, no solo saber de él",
          "Quitar un tropiezo que me separa de él",
          "Buscar a Dios primero cada mañana"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien con quien compartiré esta verdad",
        "personHint": "Piensa en quién hoy necesita oír del amor que hay en la Ley",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "compartir"
      }
    }
  ],
  "encourage": [
    "«Jamás olvidaré tus mandamientos, porque con ellos me has vivificado.» — Salmo 119:93",
    "«Si me aman, guardarán mis mandamientos.» — Juan 14:15",
    "«En esto consiste el amor de Dios: en que guardemos sus mandamientos; y sus mandamientos no son gravosos.» — 1 Juan 5:3",
    "«No vine a abrogar la ley, sino a cumplir.» — Mateo 5:17",
    "«El justo por la fe vivirá.» — Gálatas 3:11",
    "«Esta es la vida eterna: que te conozcan a ti, el único Dios verdadero.» — Juan 17:3",
    "«Cualquiera que oye estas palabras y las hace, será comparado a un hombre prudente que edificó su casa sobre la roca.» — Mateo 7:24",
    "«Buscad primeramente el reino de Dios y su justicia.» — Mateo 6:33"
  ],
  "discussion": [
    "¿Cómo ve el pecado la cultura popular hoy, y cómo debería responder nuestra iglesia sin perder ni el amor ni la verdad?",
    "¿Has visto de primera mano cómo el pecado destruye las relaciones con Dios y con los demás? ¿Qué aprendiste de ello?",
    "¿Te ha resultado fácil o difícil obedecer la Ley de Dios? ¿Qué factores han contribuido a ello?",
    "Cuando todos tus pecados sean llevados ante el santo Dios en el Juicio, ¿en qué confiarás: en tu cumplimiento de la Ley o en la perfecta justicia de Jesús como tu Sustituto?",
    "Lee Proverbios 24:3, 13, 14. ¿Cómo puede el conocimiento de Dios —o la falta de él— afectar la relación de una persona con él?",
    "¿Qué cambiaría en tu vida, tu familia y tu iglesia si pusieran la Ley del amor en el centro?",
    "¿Cómo evitamos caer en el legalismo sin restar importancia a la obediencia que brota del amor?"
  ],
  "facilitator": [
    {
      "stationId": "obstaculo",
      "apertura": "¿Por qué el pecado es el mayor obstáculo para una relación estrecha con Dios?",
      "seguimiento": "¿Restamos importancia al pecado porque la sociedad se acomodó a él? ¿Cómo te afecta eso a ti?",
      "ilustracion": "El pecado no solo nos separa de Dios: nos engaña, nos hiere y nos consume poco a poco, casi sin notarlo.",
      "transicion": "Si el pecado es el obstáculo, veamos cómo el Enemigo usa las distracciones, como con Sansón.",
      "actividad": "Que cada uno nombre, en una palabra y si desea, lo que más lo separa hoy de Dios.",
      "cierre": "Señor, danos valor para llamar al pecado por su nombre y volver a ti."
    },
    {
      "stationId": "distraccion",
      "apertura": "¿Cómo es posible servir al Señor mientras cedemos a la tentación, como Sansón?",
      "seguimiento": "¿Qué te roba hoy el tiempo y la energía para mantener viva tu relación con Dios?",
      "ilustracion": "Sansón cayó por creerse fuerte. Hasta Jesús, cansado, escapaba a solas con su Padre para recuperar fuerzas.",
      "transicion": "De las distracciones pasamos a los tropiezos concretos que Jesús nombró.",
      "actividad": "Lean Jueces 14 y comenten dónde empezó realmente la caída de Sansón.",
      "cierre": "Padre, ayúdanos a buscarte primero, antes que a todo lo demás."
    },
    {
      "stationId": "tropiezo",
      "apertura": "¿Por qué Jesús usó una metáfora tan extrema —cortar la mano o el ojo— al hablar del pecado?",
      "seguimiento": "¿Cuán grave consideras tú el pecado y su impacto en tu vida?",
      "ilustracion": "Vanidad, juicio, lujuria, enojo: cosas pequeñas que levantan al instante una gran barrera con Dios.",
      "transicion": "Si hay que quitar lo que nos hace tropezar, necesitamos algo que nos muestre qué es: la Ley.",
      "actividad": "Clasifiquen frases: ¿esto levanta una barrera o me acerca a Dios?",
      "cierre": "Señor, danos decisión para quitar lo que nos separa de ti."
    },
    {
      "stationId": "espejo",
      "apertura": "¿Cómo describe la Biblia el pecado, y para qué sirve la Ley (1 Juan 3:4; Rom. 3:20)?",
      "seguimiento": "Cuando piensas en la Ley de Dios, ¿sientes que te limita o que te fortalece?",
      "ilustracion": "La Ley es como un par de anteojos o un espejo: nos deja ver con claridad lo que somos en realidad.",
      "transicion": "El espejo muestra el problema, pero no lo resuelve. Para eso necesitamos el evangelio.",
      "actividad": "En una escala del 1 al 5, ¿qué valor tiene para ti la Palabra viva y la Ley como parte de ella?",
      "cierre": "Gracias, Señor, por una Ley cuyos mandamientos no son gravosos."
    },
    {
      "stationId": "cruz",
      "apertura": "¿Qué dijo Jesús en Mateo 5:17, 18 sobre su relación con la Ley?",
      "seguimiento": "Si la Ley no puede perdonar ni justificar, ¿por qué es imprescindible el evangelio?",
      "ilustracion": "La Ley señala por qué necesitamos perdón; la Cruz nos lo concede. Las dos van de la mano.",
      "transicion": "Si la Cruz nos justifica por fe, ¿cómo evitamos volverla excusa para no obedecer?",
      "actividad": "Lean Romanos 3:28 y Gálatas 2:16, y comenten cómo nos guardan del legalismo.",
      "cierre": "Mantén, Señor, la Cruz siempre ante nuestros ojos."
    },
    {
      "stationId": "amor",
      "apertura": "¿Qué quiso decir Jesús con que algunos sabrán de él sin conocerlo realmente (Mat. 7:21)?",
      "seguimiento": "¿Dónde está hoy tu mayor distancia entre saber la voluntad de Dios y hacerla?",
      "ilustracion": "Un hijo que ama y obedece revela la profundidad de su amor. Así muestra nuestra obediencia la nuestra.",
      "transicion": "Saber y hacer culminan en el desafío final del Sermón: edificar sobre la Roca.",
      "actividad": "Lean Mateo 7:21-23 y Juan 17:3, y distingan entre saber de Dios y conocerlo.",
      "cierre": "Que nuestra obediencia, Señor, sea el fruto de amarte de verdad."
    },
    {
      "stationId": "roca",
      "apertura": "¿Qué diferencia hay entre el que oye y hace, y el que solo oye (Mat. 7:24-29)?",
      "seguimiento": "¿Sobre qué Roca quieres que quede edificada tu vida?",
      "ilustracion": "La misma tormenta golpeó las dos casas. La diferencia no fue la tormenta, sino el cimiento.",
      "transicion": "Con el cimiento puesto, demos un paso concreto para esta semana.",
      "actividad": "Repasen juntos los cuatro tramos: pecado, Ley, evangelio, amor; y nombren el que más necesitan.",
      "cierre": "Edifícanos, Señor, sobre la Roca que es Cristo."
    },
    {
      "stationId": "paso",
      "apertura": "¿En qué confiarás cuando tus pecados sean llevados ante el santo Dios: en tu Ley o en la justicia de Jesús?",
      "seguimiento": "¿A quién podrías compartir esta semana la belleza de la Ley del amor?",
      "ilustracion": "Con su obediencia perfecta, Jesús iluminó el hermoso carácter de Dios y nos mostró cómo es él.",
      "transicion": "Reunamos todo en una Senda y un paso concreto para los próximos días.",
      "actividad": "Compartan un solo paso real para esta semana y una persona a quien animar.",
      "cierre": "Reclamamos por fe la justicia de Cristo y pedimos reflejarla en nuestra vida."
    }
  ],
  "patternTemplate": "{name}, tu mayor obstáculo es {slot:obstaculo|lower}, y lo que más te distrae es {slot:distraccion|lower}. Pero estás aprendiendo a quitar lo que te hace tropezar y a dejar que la Ley te muestre {slot:espejo|lower}. El espejo no te condena: te lleva a la Cruz. La senda de regreso a Dios ya empezó a abrirse bajo tus pies.",
  "outOracion": "Señor, vengo a ti reconociendo que mi mayor obstáculo es {slot:obstaculo|lower}, y que me distraigo con {slot:distraccion|lower}. Tu Ley es el espejo que me muestra {slot:espejo|lower}, pero ella no puede salvarme: por eso corro a la Cruz, donde {slot:cruz|lower}. Ya no confío en mi cumplimiento, sino en la justicia perfecta de Jesús. Quiero conocerte y obedecerte por amor, edificando mi vida sobre la Roca: {slot:roca|lower}. «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, no estás solo en este camino. La Ley te mostró {slot:espejo|lower}, pero la Cruz tiene la última palabra: {slot:cruz|lower}. No tienes que ser perfecto para acercarte; tienes que acercarte para ser transformado. Edifica sobre la Roca y la tormenta no te derribará.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y compartiré con {slot:compartir|or:alguien cercano} cómo la Ley de Dios, lejos de limitarme, protege mi relación con él. Daré un paso real para quitar {slot:tropiezo|lower} de mi camino.",
  "outPregunta": "Esta semana descubrí que mi mayor obstáculo con Dios es {slot:obstaculo|lower}, y que la Ley es un espejo que me muestra {slot:espejo|lower}. ¿En qué confiarás tú cuando tus pecados sean llevados ante el santo Dios: en tu cumplimiento de la Ley, o en la perfecta justicia de Cristo como tu Sustituto?",
  "outTarjeta": "Mi senda de esta semana: dejé que la Ley me mostrara {slot:espejo|lower}, corrí a la Cruz, y elijo edificar sobre la Roca: {slot:roca|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
