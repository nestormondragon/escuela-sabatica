import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 4,
  "slug": "el-papel-de-la-biblia",
  "title": "El Papel de la Biblia",
  "subtitle": "Cuando abres sus páginas, ¿dejas que la Palabra te encienda?",
  "kitName": "Mi Antorcha",
  "artifactNoun": "antorcha",
  "motif": "flame",
  "stages": [
    "chispa",
    "llama",
    "lampara",
    "fuego",
    "antorcha"
  ],
  "stageLabels": [
    "Una chispa en la oscuridad",
    "La llama prende",
    "Lámpara a mis pies",
    "El fuego que no se apaga",
    "Antorcha · luz que pasas a otro"
  ],
  "verseRef": "Hebreos 4:12",
  "verseText": "Porque la palabra de Dios es viva y eficaz, más cortante que cualquier espada de dos filos. Penetra hasta partir el alma y el espíritu, las coyunturas y los tuétanos, y discierne los pensamientos y las intenciones del corazón.",
  "promise": "En unos minutos vas a encender tu Antorcha: nombrarás lo que te aleja de la Palabra, reconocerás su autoridad sobre ti, te anclarás en la verdad que no cambia, dejarás que sus palabras te alimenten, revisarás la condición de tu corazón, y elegirás un paso concreto para que esa llama te guíe y alcance a otro.",
  "ui": {
    "start": "Empezar a encender mi antorcha",
    "emptyKit": "Tu antorcha",
    "building": "Cada elección enciende una pieza",
    "buildingHint": "Toca la pieza que brilla. Verás la chispa crecer hasta hacerse antorcha.",
    "lastPiece": "Falta una pieza",
    "patternLabel": "Tu patrón con la Palabra",
    "doneTitle": "Tu antorcha está encendida",
    "doneSub": "La encendiste tú, con Dios. Ábrela, guárdala, compártela.",
    "open": "Abrir mi antorcha",
    "back": "Volver a mi antorcha"
  },
  "slots": [
    {
      "id": "lugar",
      "n": 1,
      "label": "El lugar de la Biblia",
      "teaser": "Qué espacio ocupa hoy en mi vida…",
      "icon": "book"
    },
    {
      "id": "ataque",
      "n": 2,
      "label": "Lo que me aleja",
      "teaser": "La estrategia que más me roba el tiempo con Dios…",
      "icon": "spark"
    },
    {
      "id": "autoridad",
      "n": 3,
      "label": "Mi rendición",
      "teaser": "Dejar que la Palabra me hable a mí…",
      "icon": "hand"
    },
    {
      "id": "verdad",
      "n": 4,
      "label": "Mi roca de verdad",
      "teaser": "El fundamento que no cambia…",
      "icon": "rock"
    },
    {
      "id": "alimento",
      "n": 5,
      "label": "Mi alimento",
      "teaser": "La palabra que mi alma necesita comer…",
      "icon": "flame"
    },
    {
      "id": "corazon",
      "n": 6,
      "label": "La condición de mi corazón",
      "teaser": "Con qué actitud me acerco…",
      "icon": "heart"
    },
    {
      "id": "lampara",
      "n": 7,
      "label": "Mi lámpara",
      "teaser": "La luz que sostengo y que me guía…",
      "icon": "sunrise"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Un hábito concreto · a quién le paso la luz…",
      "icon": "footstep"
    }
  ],
  "stations": [
    {
      "id": "lugar",
      "day": "Sábado · El libro por el que muchos murieron",
      "tag": "Casillero 1 · El lugar de la Biblia",
      "title": "¿La lees, o junta polvo cerca de tu cama?",
      "story": "Es el libro más publicado de la historia, y también uno de los más perseguidos: prohibido, copiado en secreto, contrabandeado. Hubo quienes murieron para que llegara a tus manos. Y ahora descansa cerca de tu cama. La pregunta no es si la tienes, sino qué lugar ocupa en tu vida.",
      "cue": "Detente aquí, {name}.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "Con sinceridad: ¿qué lugar ocupa hoy la Biblia en tu vida?",
        "hint": "Elige lo más real ahora mismo",
        "saveLabel": "Guardar en mi antorcha",
        "seedSub": "tu punto de partida",
        "closing": "La Palabra de Dios es viva y poderosa. Por medio de ella, Dios quiere hablarte, animarte, desafiarte y darte esperanza. No es un libro académico: es la crónica de cómo el Creador del universo intenta acercarte a él.",
        "options": [
          {
            "id": "polvo",
            "label": "Casi no la abro · junta polvo",
            "insight": "No estás solo en esto. La buena noticia es que la Palabra sigue siendo viva aunque haya estado cerrada: basta una página para que vuelva a hablar.",
            "tags": [
              "theme:word",
              "react:apathy",
              "posture:avoidant"
            ]
          },
          {
            "id": "ocupado",
            "label": "Estoy demasiado ocupado",
            "insight": "La vida ajetreada es la estrategia número uno del enemigo. Pero ninguna agenda es más urgente que diez minutos con el corazón de Dios abierto delante de ti.",
            "tags": [
              "react:control",
              "theme:relationship",
              "posture:avoidant"
            ]
          },
          {
            "id": "cansado",
            "label": "Demasiado cansado para abrirla",
            "insight": "El cansancio embota el alma. Y, sin embargo, «¡cuán deliciosa resulta la comida después de tener hambre!». La Palabra es alimento, no una tarea más.",
            "tags": [
              "react:withdraw",
              "theme:self",
              "tone:raw"
            ]
          },
          {
            "id": "rutina",
            "label": "La leo, pero por costumbre",
            "insight": "Leer sin esperar nada es como sentarse a la mesa sin tener hambre. Pídele a Dios que despierte tu apetito: él envió cada palabra específicamente para ti.",
            "tags": [
              "theme:word",
              "react:apathy",
              "posture:seeking"
            ]
          },
          {
            "id": "hambre",
            "label": "Tengo hambre de más",
            "insight": "Ese hambre es santo. «Hay minas de verdad que ha de descubrir todavía el investigador ferviente». Cava: hay más de lo que imaginas.",
            "tags": [
              "theme:word",
              "posture:seeking",
              "tone:resolute"
            ]
          },
          {
            "id": "tesoro",
            "label": "Es lo más precioso que tengo",
            "insight": "Entonces ya sabes lo que muchos murieron por defender. Guarda ese amor: protégelo del descuido, porque incluso el tesoro se empolva si no se toca.",
            "tags": [
              "theme:word",
              "posture:clinging",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "ataque",
      "day": "Domingo · El arma más poderosa",
      "tag": "Casillero 2 · Lo que me aleja",
      "title": "Su estrategia número uno",
      "story": "Satanás sabe que la Palabra de Dios lo deja impotente; que con ella el mundo fue creado, los muertos resucitaron y Cristo lo venció en el desierto. Por eso su ataque más astuto no es negar la Biblia: es mantenerte lejos de ella. «Emplea cuantos medios puede para impedir que los hombres conozcan la Biblia, cuyo claro lenguaje revela sus engaños».",
      "cue": "{name}, mira de frente lo que te roba el tiempo con Dios.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Cuál es la táctica que más te aleja de la Palabra?",
        "hint": "Elige la más sincera",
        "saveLabel": "Guardar en mi antorcha",
        "seedSub": "tu mayor distracción",
        "closing": "Cuando dejamos de abrir su Palabra, no solo se enfría nuestra relación con Dios: gritamos a nuestros hijos, perdemos la paciencia, vivimos estresados y sin salida. Pero Dios es maravillosamente constante: «sus misericordias son nuevas cada mañana» (Lam. 3:23).",
        "options": [
          {
            "id": "negocios",
            "label": "Los negocios y lo urgente",
            "insight": "Lo urgente devora lo importante. El enemigo no necesita que peques en grande: le basta con mantenerte demasiado ocupado para mirar hacia arriba.",
            "tags": [
              "react:control",
              "theme:word",
              "posture:avoidant"
            ]
          },
          {
            "id": "apatia",
            "label": "La apatía · simplemente no me nace",
            "insight": "«Nuestro corazón se embota cuando no elegimos escuchar las palabras de Dios.» La apatía es la niebla; la decisión de abrir la página es la luz que la disipa.",
            "tags": [
              "react:apathy",
              "theme:self",
              "tone:raw"
            ]
          },
          {
            "id": "cansancio",
            "label": "El cansancio que me agota",
            "insight": "Estar agotado es real. Pero estar con Dios mediante las Escrituras «revive y nutre nuestra vida espiritual». A veces el descanso verdadero empieza al abrir su Palabra.",
            "tags": [
              "react:withdraw",
              "theme:hope",
              "tone:raw"
            ]
          },
          {
            "id": "duda",
            "label": "La duda · ¿de verdad me habla?",
            "insight": "La duda susurra que es solo papel antiguo. Pero «las palabras que yo les he hablado son espíritu y son vida» (Juan 6:63). Abre con fe, aunque sea pequeña.",
            "tags": [
              "react:doubt",
              "theme:faith",
              "posture:seeking"
            ]
          },
          {
            "id": "ruido",
            "label": "El ruido · pantallas y distracciones",
            "insight": "Mil voces compiten por tus minutos. Pero solo una te creó y te conoce. Apaga el ruido el tiempo suficiente para oír al que te ama.",
            "tags": [
              "react:control",
              "theme:self",
              "posture:avoidant"
            ]
          },
          {
            "id": "ninguna",
            "label": "Ya estoy firme aquí",
            "insight": "Gracias a Dios. Pero la batalla no descansa: el que cree estar firme, mire que no caiga. Mantén la guardia y la llama encendida.",
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
      "id": "autoridad",
      "day": "Lunes · La autoridad de las Escrituras",
      "tag": "Casillero 3 · Mi rendición",
      "title": "¿Quién manda cuando abres la Biblia?",
      "story": "Dios no es una marioneta que responde a nuestros caprichos. No abrimos la Biblia para que confirme lo que ya pensamos, ni elegimos solo los pasajes cómodos dejando a un lado los que nos desafían. «Sus pensamientos son más altos que los nuestros» (Isa. 55:9). Él no anula tu razón: la invita a someterse a su sabiduría.",
      "cue": "{name}, deja que esto te alcance hoy.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi antorcha",
        "seedSub": "tu rendición a la Palabra",
        "skill": {
          "prompt": "Entrena el oído: ¿lectura humilde… o lectura que usa la Biblia para sí misma?",
          "hint": "2 Timoteo 3:16-17 · útil para enseñar, redargüir, corregir e instruir.",
          "badge": "Estás aprendiendo a dejar que la Palabra te corrija a ti",
          "cats": [
            "Me someto a la Palabra",
            "Uso la Palabra a mi favor"
          ],
          "rounds": [
            {
              "t": "«Busco un texto que respalde lo que ya decidí.»",
              "a": 1,
              "fb": "La uso a mi favor: la Biblia no existe para servir a mis propósitos, sino para revelarme los de Dios."
            },
            {
              "t": "«Leo el pasaje difícil, aunque me incomode.»",
              "a": 0,
              "fb": "Me someto: considerar la Biblia como un todo, no solo lo cómodo y conocido."
            },
            {
              "t": "«Salto los versículos que me confrontan.»",
              "a": 1,
              "fb": "La uso a mi favor: escoger solo lo agradable es esquivar la voz de Dios."
            },
            {
              "t": "«Pido a Dios que me corrija con su Palabra.»",
              "a": 0,
              "fb": "Me someto: la Escritura es útil para redargüir y corregir (2 Tim. 3:16)."
            },
            {
              "t": "«Si no concuerda conmigo, está mal el texto.»",
              "a": 1,
              "fb": "La uso a mi favor: pongo mi raciocinio falible por encima de Dios."
            },
            {
              "t": "«Vengo a aprender lo que aún no entiendo.»",
              "a": 0,
              "fb": "Me someto: someto mi razón a su Palabra para cooperar en mi salvación."
            }
          ],
          "summary": "La razón humana es valiosa, pero falible y susceptible de engaño. El espíritu arrogante cree que ya lo oyó todo; el humilde se acerca dispuesto a ser enseñado. «Amarás al Señor con todo tu corazón, alma y mente» (Mat. 22:37)."
        },
        "commit": {
          "prompt": "¿En qué área dejarás que la Biblia te corrija, en vez de usarla para defenderte?",
          "hint": "Sé concreto. La rendición empieza en un punto.",
          "placeholder": "una opinión que necesito someter, un mandato que evito…",
          "extraKey": "rendicion",
          "options": [
            "Una opinión que necesito soltar",
            "Un mandato que vengo evitando",
            "Un pasaje difícil que dejé de lado",
            "Leer la Biblia como un todo, no a mi gusto",
            "Pedir corrección antes de pedir respaldo"
          ]
        }
      }
    },
    {
      "id": "verdad",
      "day": "Martes · La verdad bíblica",
      "tag": "Casillero 4 · Mi roca de verdad",
      "title": "Cuando el mundo pregunta «¿ha muerto la verdad?»",
      "story": "En 2017 la portada de Time preguntó: «¿Ha muerto la verdad?». La cultura dice que no hay nada firme, ningún fundamento que resista el tiempo. Pero Jesús dijo: «Yo soy la verdad» (Juan 14:6), y «él es el mismo ayer, hoy y por los siglos» (Heb. 13:8). En un mundo de arena, su Palabra es roca.",
      "cue": "Quédate un momento aquí, {name}.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi antorcha",
        "seedSub": "tu roca de verdad",
        "prompt": "Elige la declaración de verdad que sostendrás cuando todo a tu alrededor cambie",
        "hint": "Toca cada una · quédate con la que necesitas",
        "chooseLabel": "Esta es mi roca",
        "closing": "La Biblia, y solo ella, debe ser la fuente por excelencia de lo que entendemos por verdad. Toda otra fuente —incluso lo que llamamos «razonable»— debe probarse a su luz. Decir que la verdad no existe es ya proclamar una verdad: se contradice a sí misma.",
        "allowCustom": {
          "label": "Escribir la mía",
          "placeholder": "La verdad que sostengo es…",
          "extraKey": "verdadPropia"
        },
        "items": [
          {
            "t": "«Santifícalos en tu verdad; tu palabra es verdad.»",
            "ref": "Juan 17:17",
            "meaning": "La oración de Jesús por ti: que la verdad de su Palabra te aparte y te transforme."
          },
          {
            "t": "«Toda palabra de Dios es limpia… no añadas a sus palabras.»",
            "ref": "Proverbios 30:5,6",
            "meaning": "Pura y suficiente. No necesita mis correcciones; necesita mi confianza."
          },
          {
            "t": "«Las palabras de Jehová son palabras limpias, como plata refinada siete veces.»",
            "ref": "Salmo 12:6",
            "meaning": "Probadas al fuego. Lo que el mundo descarta como anticuado, Dios lo guarda como oro."
          },
          {
            "t": "«Jesucristo es el mismo ayer, hoy y por los siglos.»",
            "ref": "Hebreos 13:8",
            "meaning": "La Verdad fundamental no cambia, aunque mi comprensión de ella crezca cada día."
          }
        ]
      }
    },
    {
      "id": "alimento",
      "day": "Miércoles · Requerimientos bíblicos",
      "tag": "Casillero 5 · Mi alimento",
      "title": "Pan para el alma hambrienta",
      "story": "No basta que las palabras estén impresas en la página: ¿cómo las llevas al corazón? David lo supo: «En mi corazón he guardado tus dichos» (Sal. 119:11). Si alguna vez tuviste hambre de verdad, recuerdas cuán deliciosa fue la comida después. La Biblia es ese alimento. Si tu alma está vacía, abre la Palabra viva.",
      "cue": "{name}, ven y come hoy de esto.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi antorcha",
        "seedSub": "lo que la Palabra hace en ti",
        "prompt": "Toca cada carta para ver lo que la Palabra hace cuando la recibes",
        "hint": "Lo que ves de un lado · lo que ella hace del otro",
        "pairs": [
          {
            "see": "Sientes que tu mundo se desmorona.",
            "sees": "«Es mi consuelo en mi aflicción, porque tu dicho me ha vivificado» (Sal. 119:50)."
          },
          {
            "see": "Tu alma está vacía y hambrienta.",
            "sees": "«Halladas tus palabras, yo las comí; fueron el gozo de mi corazón» (Jer. 15:16)."
          },
          {
            "see": "Crees que solo el pan te sostiene.",
            "sees": "«No solo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios» (Mat. 4:4)."
          },
          {
            "see": "Piensas que es un libro viejo y muerto.",
            "sees": "«Las palabras que yo les he hablado son espíritu y son vida» (Juan 6:63)."
          }
        ],
        "chooseLabel": "Esta es la que mi alma necesita",
        "teach": "Las palabras de Dios son deliciosas, nutritivas y sustentadoras porque vienen de él mismo, enviadas específicamente para ti. Cuando las lees con el corazón abierto, pidiendo la luz del Espíritu, harán una gran obra en tu vida. No dejes que el orgullo te impida poner por obra lo que él te dice.",
        "commit": {
          "prompt": "Escribe la palabra de aliento que hoy quieres llevar guardada en tu corazón",
          "hint": "Memorízala. Será pan para el día difícil.",
          "placeholder": "Hoy guardo en mi corazón que Dios…",
          "extraKey": "guardada",
          "shareable": true
        }
      }
    },
    {
      "id": "corazon",
      "day": "Jueves · La condición del corazón",
      "tag": "Casillero 6 · La condición de mi corazón",
      "title": "Con qué corazón te acercas lo cambia todo",
      "story": "Quien piensa que la Biblia es una tontería no percibirá la verdad en sus páginas (1 Cor. 2:14). «La Palabra de Dios obra en nosotros cuando creemos» (1 Tes. 2:13). Si tu corazón está abierto y humilde, serás transformado, aunque el cambio sea gradual. Pero si te aferras a la apatía y al pecado, la lectura te servirá de poco.",
      "cue": "Antes de seguir, {name}, mira tu propio corazón.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "Sé honesto: ¿con qué corazón sueles acercarte a la Biblia?",
        "hint": "No hay condena aquí, solo verdad",
        "saveLabel": "Guardar en mi antorcha",
        "seedSub": "la condición de tu corazón",
        "closing": "Mucho depende de tu fe y tus expectativas. Y la buena noticia es que, aunque tu fe sea muy pequeña, Dios puede hacerla crecer (Mar. 9:24; Luc. 17:6). Si te acercas con humildad, llegarás a ser «sabio para la salvación» (2 Tim. 3:15) y verás cosas que ni imaginabas.",
        "options": [
          {
            "id": "justificar",
            "label": "Buscando justificar lo que ya pienso",
            "insight": "Es tentador usar la Biblia como espejo de mis opiniones. Pero la fe abre la mano y pregunta: «¿Qué quieres mostrarme tú?», no «¿dónde dice lo que yo quiero?».",
            "tags": [
              "react:pride",
              "theme:self",
              "posture:proud"
            ]
          },
          {
            "id": "orgullo",
            "label": "Pensando que ya lo oí todo",
            "insight": "«Cuando nos sentimos autosuficientes, descuidamos a Dios y confiamos en nuestro raciocinio falible.» El que cree que ya lo sabe todo deja de aprender. Vuélvete pequeño otra vez.",
            "tags": [
              "react:pride",
              "theme:humility",
              "posture:proud"
            ]
          },
          {
            "id": "vacio",
            "label": "Vacío · sin esperar nada",
            "insight": "Leer sin fe es leer a oscuras. Pero «la Palabra obra en nosotros cuando creemos» (1 Tes. 2:13). Pídele, antes de leer, que él te hable de verdad.",
            "tags": [
              "react:apathy",
              "theme:faith",
              "tone:raw"
            ]
          },
          {
            "id": "aferrado",
            "label": "Aferrado a un pecado que no suelto",
            "insight": "El corazón que se resiste a cambiar resiste también la transformación. Pero el Espíritu te impulsa a acercarte más a Cristo. ¿Quieres acercarte? Esa pregunta lo cambia todo.",
            "tags": [
              "react:self-blame",
              "theme:sin",
              "tone:raw"
            ]
          },
          {
            "id": "humilde",
            "label": "Humilde · listo para ser enseñado",
            "insight": "Ese es el corazón que el Espíritu transforma. «Acércate con humildad y experimentarás una transformación», aunque sea gradual. Sigue así.",
            "tags": [
              "theme:humility",
              "posture:humble",
              "tone:tender"
            ]
          },
          {
            "id": "creyente",
            "label": "Creyendo que Dios va a hablarme",
            "insight": "«Cuando abres tu Biblia y crees que Dios tiene algo que decirte, él te hablará y obrará en tu vida.» La fe es el oído que escucha lo que otros no oyen.",
            "tags": [
              "theme:faith",
              "posture:seeking",
              "tone:resolute"
            ]
          }
        ]
      }
    },
    {
      "id": "lampara",
      "day": "La lámpara del alma",
      "tag": "Casillero 7 · Mi lámpara",
      "title": "Una luz que se enciende y crece",
      "story": "La Palabra no se queda en la página: se enciende en quien la recibe. Una chispa de fe, una llama de verdad, una lámpara a tus pies, un fuego que no se apaga. Forja cada eslabón y verás en qué se convierte tu lectura cuando la dejas obrar.",
      "cue": "{name}, levanta la luz y mira hasta dónde alcanza.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Encender la lámpara · guardar",
        "seedSub": "tu lámpara",
        "chain": [
          {
            "word": "Una chispa",
            "line": "Abres la página aunque tu fe sea pequeña."
          },
          {
            "word": "Una llama",
            "line": "La Palabra prende: viva y eficaz, empieza a obrar (Heb. 4:12)."
          },
          {
            "word": "Lámpara a mis pies",
            "line": "Su luz alumbra el paso que tienes delante (Sal. 119:105)."
          },
          {
            "word": "Fuego que no se apaga",
            "line": "«Mi palabra no volverá vacía: hará lo que yo quiero» (Isa. 55:11)."
          }
        ],
        "climax": "Y la luz se vuelve antorcha: no solo te alumbra a ti, sino que alcanza a quien camina cerca en la oscuridad.",
        "prompt": "¿Cuál es la luz que sostendrás como lámpara esta semana?",
        "hint": "«Lámpara es a mis pies tu palabra, y lumbrera a mi camino» (Sal. 119:105)",
        "options": [
          "Que su Palabra alumbra mi próximo paso",
          "Que es viva y obra en mí cuando creo",
          "Que su verdad no cambia aunque yo cambie",
          "Que él me habla cuando abro sus páginas"
        ],
        "allowCustom": {
          "placeholder": "mi luz es…",
          "extraKey": "lamparaPropia"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Casillero 8 · Mi paso de la semana",
      "title": "De la abundancia del corazón habla la boca",
      "story": "«¿Cómo evaluarías tus palabras de las últimas 24 horas? ¿Fueron amables y edificantes, o expresaron frustración, ira y cansancio?» Cuando hay basura en el corazón, sale en lo que decimos; cuando rebosa de amor, también fluye. La Biblia es la palabra del Dios viviente, hecha para moldear tus dichos, tus actos y tus pensamientos.",
      "cue": "Un último paso, {name}, y pasas la luz.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi antorcha",
        "seedSub": "tu paso",
        "stepPrompt": "Mi hábito concreto con la Palabra esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Apartar un tiempo fijo cada mañana para leerla",
          "Memorizar un versículo y guardarlo en el corazón",
          "Leer la Biblia como un todo, no solo lo cómodo",
          "Pedirle al Espíritu que me ilumine antes de leer",
          "Poner por obra una cosa que ya sé que me dice"
        ],
        "stepPlaceholder": "mi hábito concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien a quien le pasaré la luz",
        "personHint": "Piensa en quién hoy necesita oír una palabra viva",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "animar"
      }
    }
  ],
  "encourage": [
    "«Por la misericordia de Jehová no hemos sido consumidos; nuevas son cada mañana.» — Lamentaciones 3:22,23",
    "«Toda la Escritura es inspirada por Dios y útil para enseñar.» — 2 Timoteo 3:16",
    "«Santifícalos en tu verdad; tu palabra es verdad.» — Juan 17:17",
    "«En mi corazón he guardado tus dichos, para no pecar contra ti.» — Salmo 119:11",
    "«Halladas tus palabras, yo las comí; fueron el gozo de mi corazón.» — Jeremías 15:16",
    "«No solo de pan vivirá el hombre, sino de toda palabra de Dios.» — Mateo 4:4",
    "«Lámpara es a mis pies tu palabra, y lumbrera a mi camino.» — Salmo 119:105",
    "«Mi palabra no volverá a mí vacía, sino que hará lo que yo quiero.» — Isaías 55:11"
  ],
  "discussion": [
    "¿Cuál es el fundamento lógico y racional de tu fe? Probablemente sea mucho mayor de lo que imaginas.",
    "¿Cómo puedes asegurarte de que el estudio de la Biblia y la oración sean el fundamento de tu relación con Dios? ¿Sería posible relacionarte con él sin orar y estudiar la Palabra?",
    "Si alguien quisiera profundizar su relación con Dios, ¿en qué parte de la Biblia le aconsejarías comenzar a leer?",
    "¿Cómo es posible vivir «de toda palabra que sale de la boca del Señor» (Deut. 8:3)? ¿Cómo podría ocurrir eso en tu vida esta semana?",
    "¿Qué nos dicen estos pasajes acerca de las palabras de Dios? Hebreos 11:3; Salmo 33:6; Mateo 11:4,5; 1 Tesalonicenses 4:16; Efesios 6:17; Santiago 1:21.",
    "¿Cuál es la estrategia número uno del enemigo para alejarte de la Palabra, y qué cambio concreto puedes hacer para vencerla?",
    "Si tus palabras de las últimas 24 horas reflejan tu corazón, ¿qué te están revelando, y cómo puede la Palabra moldear lo que dices?"
  ],
  "facilitator": [
    {
      "stationId": "lugar",
      "apertura": "¿Qué lugar ocupa realmente la Biblia en nuestra vida: tesoro abierto o libro que junta polvo?",
      "seguimiento": "¿Estás demasiado ocupado o cansado para abrir la Palabra? ¿Qué dice eso de tus prioridades?",
      "ilustracion": "Es el libro más perseguido de la historia; muchos murieron para preservarlo, y hoy descansa cerca de nuestra cama sin abrir.",
      "transicion": "Si tan precioso es, preguntémonos por qué nos cuesta tanto abrirlo: hay una estrategia detrás.",
      "actividad": "Que cada uno diga, en una palabra, qué lugar ocupa hoy la Biblia en su vida.",
      "cierre": "Señor, devuélvenos el hambre por tu Palabra viva."
    },
    {
      "stationId": "ataque",
      "apertura": "¿Por qué sería el alejarnos de la Biblia el ataque número uno de Satanás contra nuestra fe?",
      "seguimiento": "¿Qué táctica concreta —negocios, apatía, cansancio o duda— te roba más el tiempo con Dios?",
      "ilustracion": "«Emplea cuantos medios puede para impedir que los hombres conozcan la Biblia, cuyo claro lenguaje revela sus engaños» (E. G. White).",
      "transicion": "Si el enemigo quiere alejarnos, veamos cómo acercarnos bien: con qué autoridad leemos.",
      "actividad": "Lean Efesios 6:17,18 y comenten por qué la Palabra y la oración son las armas más poderosas.",
      "cierre": "Cristo, que tu Palabra suene en nosotros más fuerte que toda distracción."
    },
    {
      "stationId": "autoridad",
      "apertura": "¿Buscamos que la Biblia confirme lo que ya pensamos, o que nos hable lo que Dios quiere?",
      "seguimiento": "¿En qué área dejas que la Biblia te corrija, en lugar de usarla para defenderte?",
      "ilustracion": "Dios no es una marioneta movida por hilos: no responde a nuestros caprichos, sino que nos eleva a sus pensamientos (Isa. 55:9).",
      "transicion": "Si nos sometemos a su Palabra, descubrimos que ella es la única roca de verdad firme.",
      "actividad": "Clasifiquen frases: ¿lectura humilde o lectura que usa la Biblia para sí misma?",
      "cierre": "Enséñanos, Señor, a amarte con toda la mente, sometida a tu Palabra."
    },
    {
      "stationId": "verdad",
      "apertura": "Cuando el mundo pregunta «¿ha muerto la verdad?», ¿dónde está nuestro fundamento firme?",
      "seguimiento": "¿Qué declaración de verdad necesitas sostener cuando todo a tu alrededor cambia?",
      "ilustracion": "La portada de Time en 2017 preguntó si la verdad había muerto; la cultura ya no sabe dónde radica.",
      "transicion": "Si su verdad no cambia, esa verdad se vuelve alimento para nuestra alma.",
      "actividad": "Cada uno elija un versículo sobre la verdad de la Palabra para sostener esta semana.",
      "cierre": "Tú eres la verdad, Señor; santifícanos en ella."
    },
    {
      "stationId": "alimento",
      "apertura": "¿Cómo pasamos de tener la Biblia impresa a tenerla guardada en el corazón (Sal. 119:11)?",
      "seguimiento": "¿Qué palabra de aliento necesitas guardar para el día difícil?",
      "ilustracion": "El hambre intensa hace deliciosa la comida; en sentido espiritual, la Biblia es alimento para el alma vacía.",
      "transicion": "Pero el alimento solo nutre a quien tiene hambre: todo depende de la condición del corazón.",
      "actividad": "Que cada uno memorice un versículo breve para llevar esta semana.",
      "cierre": "Sé el pan de nuestra alma, Señor; saciamos en tu Palabra."
    },
    {
      "stationId": "corazon",
      "apertura": "¿Por qué dos personas pueden leer el mismo texto y solo una percibir la verdad (1 Cor. 2:14)?",
      "seguimiento": "¿Con qué actitud te acercas: buscando justificarte, o dispuesto a ver lo que Dios quiere mostrarte?",
      "ilustracion": "La Palabra obra en nosotros cuando creemos; aunque la fe sea pequeña, Dios la hace crecer (Mar. 9:24).",
      "transicion": "El corazón humilde recibe luz; veamos cómo esa luz se convierte en lámpara.",
      "actividad": "En silencio, que cada uno examine con qué corazón abrió la Biblia esta semana.",
      "cierre": "Crea en nosotros un corazón limpio y abierto a tu Espíritu."
    },
    {
      "stationId": "lampara",
      "apertura": "¿Cómo pasa la Palabra de una chispa de fe a un fuego que no se apaga?",
      "seguimiento": "¿Cuál es la luz de la Palabra que más necesitas sostener ahora mismo?",
      "ilustracion": "La lámpara no quita la oscuridad del mundo, pero alumbra el próximo paso (Sal. 119:105).",
      "transicion": "Con la lámpara encendida, demos un paso concreto y pasemos la luz a otro.",
      "actividad": "Reciten juntos Salmo 119:105 y nombren el eslabón que más necesitan hoy.",
      "cierre": "Que tu Palabra sea lámpara a nuestros pies y antorcha para otros."
    },
    {
      "stationId": "paso",
      "apertura": "Si «de la abundancia del corazón habla la boca», ¿qué revelan nuestras palabras recientes?",
      "seguimiento": "¿Qué hábito concreto con la Palabra adoptarás, y a quién le pasarás la luz?",
      "ilustracion": "Tratar la Biblia como mero manual moral es rechazarla; es la palabra del Dios viviente que moldea actos, dichos y pensamientos (E. G. White).",
      "transicion": "Reunamos todo en una Antorcha y un paso para esta semana.",
      "actividad": "Compartan un solo hábito concreto y un nombre de alguien a quien animar.",
      "cierre": "Llénanos de tu Palabra, Señor, para que rebose en lo que decimos y hacemos."
    }
  ],
  "patternTemplate": "{name}, hoy la Biblia ocupa este lugar en tu vida: {slot:lugar|lower}. Lo que más te aleja de ella es {slot:ataque|lower}, pero estás aprendiendo a dejar que te hable a ti y a anclarte en {slot:verdad|lower}. La Palabra es viva y eficaz: cuando la abres con fe, una chispa se vuelve llama.",
  "outOracion": "Señor, hoy reconozco que la Biblia ocupa este lugar en mi vida: {slot:lugar|lower}. Confieso que lo que más me aleja de ella es {slot:ataque|lower}. Pero hoy elijo acercarme con humildad y dejar que tu Palabra me hable a mí. Quiero rendirte {slot:autoridad|lower}. Sosténme en esta verdad: {slot:verdad}. Que tu Palabra sea mi alimento y lámpara a mis pies: {slot:lampara|lower}. Hazla viva en mí, porque «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, no estás demasiado ocupado ni demasiado cansado para esto: la Palabra de Dios es viva y te espera. Aunque tu fe sea pequeña, él puede hacerla crecer. Abre la página de nuevo y deja que la chispa se vuelva antorcha.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y voy a pasarle la luz a {slot:animar|or:alguien que lo necesite} con una palabra viva de aliento.",
  "outPregunta": "Esta semana descubrí que lo que más me aleja de la Palabra es {slot:ataque|lower}, pero estoy aprendiendo a acercarme con un corazón humilde. ¿Qué lugar ocupa hoy la Biblia en tu vida, y dónde te está hablando Dios a través de ella?",
  "outTarjeta": "Mi antorcha de esta semana: dejo de permitir que {slot:ataque|lower} me aleje, y sostengo esta verdad: {slot:verdad}. Mi lámpara: {slot:lampara|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
