import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 6,
  "slug": "guerreros-de-oracion",
  "title": "Guerreros de Oración",
  "subtitle": "Cuando casi no hablas con alguien, la relación se enfría. ¿Sigue ardiendo la tuya con Dios?",
  "kitName": "Mi Altar",
  "artifactNoun": "altar",
  "motif": "flame",
  "stages": [
    "chispa",
    "brasa",
    "llama",
    "fuego",
    "hoguera"
  ],
  "stageLabels": [
    "Una chispa",
    "La brasa se aviva",
    "La llama prende",
    "El fuego arde firme",
    "La hoguera que alumbra a otros"
  ],
  "verseRef": "Salmo 116:1, 2",
  "verseText": "Amo al Señor, porque ha escuchado mi voz y mis súplicas, porque ha inclinado a mí su oído, por eso lo invocaré mientras yo viva.",
  "promise": "En unos minutos vas a encender tu Altar: nombrarás la excusa que apaga tu oración, elegirás la postura de tu corazón, aprenderás de la constancia de Daniel, caminarás con Dios como Enoc, intercederás como Moisés y guardarás un fuego que arda mientras vivas. {name}, esta llama la enciendes tú, con Dios.",
  "ui": {
    "start": "Empezar a encender mi altar",
    "emptyKit": "Tu altar",
    "building": "Cada elección aviva una llama",
    "buildingHint": "Toca la brasa que arde. Verás la chispa crecer hasta volverse hoguera.",
    "lastPiece": "Falta una brasa",
    "patternLabel": "Tu patrón de oración",
    "doneTitle": "Tu altar está ardiendo",
    "doneSub": "Lo encendiste tú, con Dios. Ábrelo, guárdalo, compártelo.",
    "open": "Abrir mi altar",
    "back": "Volver a mi altar"
  },
  "slots": [
    {
      "id": "excusa",
      "n": 1,
      "label": "Mi excusa",
      "teaser": "Lo que apaga hoy mi oración…",
      "icon": "cloud"
    },
    {
      "id": "postura",
      "n": 2,
      "label": "La postura de mi corazón",
      "teaser": "Cómo me acerco a él…",
      "icon": "hand"
    },
    {
      "id": "constancia",
      "n": 3,
      "label": "Mi constancia",
      "teaser": "Como Daniel, firme a pesar de todo…",
      "icon": "rock"
    },
    {
      "id": "caminata",
      "n": 4,
      "label": "Mi caminata con Dios",
      "teaser": "Como Enoc, cerca cada día…",
      "icon": "footstep"
    },
    {
      "id": "perdon",
      "n": 5,
      "label": "Mi oración por quien me hirió",
      "teaser": "Interceder como Moisés…",
      "icon": "heart"
    },
    {
      "id": "intercesion",
      "n": 6,
      "label": "Mi intercesión",
      "teaser": "Por quien hoy me necesita…",
      "icon": "flame"
    },
    {
      "id": "fuego",
      "n": 7,
      "label": "Mi fuego que no se apaga",
      "teaser": "La oración que sostiene mi vida…",
      "icon": "spark"
    },
    {
      "id": "paso",
      "n": 8,
      "label": "Mi paso de la semana",
      "teaser": "Un altar concreto · a quién enciendo…",
      "icon": "sunrise"
    }
  ],
  "stations": [
    {
      "id": "excusa",
      "day": "Sábado · Guerreros de oración",
      "tag": "Brasa 1 · Mi excusa",
      "title": "¿Cuándo hablaste con él por última vez?",
      "story": "Si casi no hablaras con tu mejor amigo o con tu cónyuge, la relación pronto se enfriaría. Lo mismo pasa con Dios: la oración es el aire de la amistad con él. Si no oramos a menudo, tarde o temprano nos alejamos sin darnos cuenta.",
      "cue": "Detente aquí, {name}.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Qué apaga hoy tu oración?",
        "hint": "Elige la más honesta ahora mismo",
        "saveLabel": "Guardar en mi altar",
        "seedSub": "tu excusa",
        "closing": "«Amo al Señor, porque ha escuchado mi voz» (Sal. 116:1). Ninguna excusa resiste cuando recuerdas que él ya inclinó su oído hacia ti.",
        "options": [
          {
            "id": "tiempo",
            "label": "«No tengo tiempo»",
            "insight": "Daniel gobernaba un imperio y aun así oraba tres veces al día. El tiempo no se encuentra: se entrega a lo que más amamos.",
            "tags": [
              "react:withdraw",
              "theme:prayer",
              "posture:avoidant"
            ]
          },
          {
            "id": "sequedad",
            "label": "Siento que hablo a una pared",
            "insight": "La sequedad no significa ausencia. «Ha inclinado a mí su oído» (Sal. 116:2): él escucha aun cuando tú no sientes nada.",
            "tags": [
              "react:doubt",
              "theme:faith",
              "tone:raw"
            ]
          },
          {
            "id": "indigno",
            "label": "No me siento digno de acercarme",
            "insight": "Orar «es abrir el corazón a Dios como a un amigo». Los amigos no exigen méritos; solo cercanía honesta.",
            "tags": [
              "react:self-blame",
              "theme:grace",
              "posture:avoidant"
            ]
          },
          {
            "id": "distraido",
            "label": "Me distraigo en cuanto empiezo",
            "insight": "Hasta orar en voz baja ayuda: la voz recuerda que Dios es real y que escucha. Daniel abría su ventana y se centraba en él.",
            "tags": [
              "react:apathy",
              "theme:prayer",
              "posture:seeking"
            ]
          },
          {
            "id": "rutina",
            "label": "Se volvió pura rutina vacía",
            "insight": "Enoc no repetía fórmulas: caminaba con Dios. La oración renace cuando deja de ser tarea y vuelve a ser amistad.",
            "tags": [
              "react:apathy",
              "theme:relationship",
              "posture:avoidant"
            ]
          },
          {
            "id": "ocupado",
            "label": "La vida me consume y la dejo para después",
            "insight": "«Cuanto más urgentes eran sus labores, tanto más fervorosas eran sus oraciones» (de Enoc). Lo urgente no debe ahogar lo esencial.",
            "tags": [
              "react:control",
              "theme:service",
              "posture:avoidant"
            ]
          },
          {
            "id": "dolor",
            "label": "Estoy enojado o herido con Dios",
            "insight": "Moisés le habló a Dios con desesperación y aun así no se apartó. La oración honesta soporta el enojo; el silencio lo congela.",
            "tags": [
              "react:withdraw",
              "theme:relationship",
              "tone:raw"
            ]
          },
          {
            "id": "ninguna",
            "label": "Ninguna excusa: solo lo dejé enfriar",
            "insight": "Reconocerlo ya es el primer paso de vuelta. Como Daniel, puedes volver a abrir la ventana hoy mismo.",
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
      "id": "postura",
      "day": "Lunes · La postura durante la oración",
      "tag": "Brasa 2 · La postura de mi corazón",
      "title": "Tu cuerpo le dice algo al cielo",
      "story": "Arrodillarse no es la única forma de orar —la Biblia muestra a personas de pie, sentadas, postradas—, pero la postura importa: refleja nuestra reverencia. Cuando nos arrodillamos, el corazón se rinde más fácil, y declaramos a las tinieblas a quién pertenecemos.",
      "cue": "{name}, deja que esto te alcance hoy.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi altar",
        "seedSub": "tu postura",
        "prompt": "Toca cada carta: lo que ve el mundo, lo que ve el cielo",
        "hint": "La misma postura, otra mirada",
        "pairs": [
          {
            "see": "Arrodillarse parece debilidad.",
            "sees": "El cielo lo ve como rendición valiente: «eres soberano, soy tu hijo»."
          },
          {
            "see": "Orar de pie parece distraído.",
            "sees": "Como Ana y los levitas, puede ser un corazón firme y atento ante Dios."
          },
          {
            "see": "Orar mientras caminas parece poco serio.",
            "sees": "«Orad sin cesar» (1 Tes. 5:17): él recibe tu susurro en cualquier lugar."
          },
          {
            "see": "Lo importante es la posición del cuerpo.",
            "sees": "Lo que más importa es la postura del corazón rendido ante él."
          }
        ],
        "chooseLabel": "Esta es la postura que necesito",
        "teach": "La oración matutina de rodillas declara a los poderes de las tinieblas que elegimos a Dios; y él responde enviando ángeles que nos fortalecen (Sal. 91).",
        "commit": {
          "prompt": "¿Con qué postura te acercarás esta semana a Dios?",
          "hint": "Si puedes arrodillarte y no sueles hacerlo, pruébalo y nota la diferencia",
          "placeholder": "de rodillas cada mañana, en voz audible…",
          "extraKey": "posturaTexto",
          "shareable": false
        }
      }
    },
    {
      "id": "constancia",
      "day": "Domingo · El fiel Daniel",
      "tag": "Brasa 3 · Mi constancia",
      "title": "Aunque costara la vida, abrió la ventana",
      "story": "Daniel gobernaba un imperio, era amado por el cielo y «ningún vicio ni falta había en él» (Dan. 6:4). Cuando sus enemigos lograron una ley para matarlo si oraba, él hizo lo de siempre: abrió su ventana hacia Jerusalén y se arrodilló tres veces al día, dando gracias.",
      "cue": "Respira hondo aquí, {name}.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi altar",
        "seedSub": "tu constancia",
        "skill": {
          "prompt": "Distingue: ¿constancia que arde… o llama que se apaga?",
          "hint": "Daniel oraba igual en la cima y en el peligro.",
          "badge": "Estás aprendiendo a reconocer una oración constante",
          "cats": [
            "Constancia que arde",
            "Llama que se apaga"
          ],
          "rounds": [
            {
              "t": "«Oro solo cuando tengo un problema grande.»",
              "a": 1,
              "fb": "Llama que se apaga: la oración de emergencia no sostiene la amistad diaria."
            },
            {
              "t": "«Aparto el mismo momento cada día, pase lo que pase.»",
              "a": 0,
              "fb": "Constancia que arde: como Daniel, un ritmo fiel y predecible."
            },
            {
              "t": "«Si me critican por mi fe, mejor no oro en público.»",
              "a": 1,
              "fb": "Llama que se apaga: Daniel oró ante la amenaza misma, sin esconderse."
            },
            {
              "t": "«Doy gracias incluso antes de ver la respuesta.»",
              "a": 0,
              "fb": "Constancia que arde: Daniel oró agradecido aun bajo decreto de muerte."
            },
            {
              "t": "«Cuando estoy muy ocupado, salto mi tiempo con Dios.»",
              "a": 1,
              "fb": "Llama que se apaga: lo ocupado de la vida no debería ser excusa."
            },
            {
              "t": "«Vuelvo a mi rutina de oración apenas la rompo.»",
              "a": 0,
              "fb": "Constancia que arde: la fidelidad no es perfección, es volver una y otra vez."
            }
          ],
          "summary": "Ante las dificultades, Daniel oró. Su fe tenía un ritmo, un lugar y una acción concreta. «Por eso lo invocaré mientras yo viva» (Sal. 116:2)."
        },
        "commit": {
          "prompt": "¿Qué ritmo de oración sostendrás esta semana, pase lo que pase?",
          "hint": "Un momento fijo, como la ventana de Daniel",
          "placeholder": "tres pausas al día, al despertar de rodillas…",
          "extraKey": "constanciaTexto",
          "options": [
            "Un momento fijo cada mañana",
            "Tres breves pausas al día",
            "Orar de rodillas al despertar",
            "Dar gracias antes de pedir",
            "Volver a orar apenas lo deje"
          ]
        }
      }
    },
    {
      "id": "caminata",
      "day": "Martes · Enoc practicaba lo que predicaba",
      "tag": "Brasa 4 · Mi caminata con Dios",
      "title": "Caminó con Dios… y un día Dios lo llevó",
      "story": "La Biblia casi no cuenta nada de Enoc, salvo lo esencial: «caminó con Dios» trescientos años. En medio de una vida activa, cuanto más urgentes sus labores, más fervorosas sus oraciones. Su rostro reflejaba una luz santa; hasta los impíos lo notaban.",
      "cue": "Quédate un momento, {name}.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi altar",
        "seedSub": "tu caminata",
        "prompt": "Elige el hábito que avivará tu caminata diaria con Dios",
        "hint": "Toca cada uno · quédate con el que necesitas",
        "chooseLabel": "Este es el que practicaré",
        "closing": "Dios no nos pide vivir como ermitaños, sino caminar con él en medio del trabajo. Así reflejamos su carácter sin darnos cuenta, como Enoc.",
        "allowCustom": {
          "label": "Escribir el mío",
          "placeholder": "Esta semana caminaré con Dios al…",
          "extraKey": "caminataPropia"
        },
        "items": [
          {
            "t": "Susurrar una oración en voz audible",
            "ref": "Lam. 3:55-57",
            "meaning": "Orar en voz baja mantiene la mente enfocada y recuerda que Dios escucha de verdad."
          },
          {
            "t": "Buscar a solas un momento de quietud",
            "ref": "Gén. 5:24",
            "meaning": "Enoc se retiraba a saciar su sed de la sabiduría que solo Dios da. La cercanía pide silencio."
          },
          {
            "t": "Orar mientras trabajo y sirvo",
            "ref": "Rom. 12:12",
            "meaning": "Ser «constante en la oración» no exige encierro: Enoc oraba en medio de la labor."
          },
          {
            "t": "Hablar con Dios en cualquier lugar",
            "ref": "Sal. 139:7-12",
            "meaning": "No hay lugar donde él no te vea ni oiga. Cada rincón puede ser tu altar."
          }
        ]
      }
    },
    {
      "id": "perdon",
      "day": "Miércoles · Moisés, un líder consagrado",
      "tag": "Brasa 5 · Mi oración por quien me hirió",
      "title": "Oró por la hermana que lo despreció",
      "story": "Moisés vivía casi continuamente en la presencia de Dios. Cuando María, su propia hermana, lo maltrató por envidia y fue herida con lepra, él pudo dejar que recibiera su castigo. En cambio clamó: «¡Oh Dios, te ruego que la sanes ahora!» (Núm. 12:13). Pura gracia perdonadora.",
      "cue": "{name}, esto pide valentía.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Por quién te cuesta orar… alguien que te hirió?",
        "hint": "No necesitas nombrarlo en voz alta; solo en tu corazón",
        "saveLabel": "Guardar en mi altar",
        "seedSub": "por quien me hirió",
        "closing": "«Amad a vuestros enemigos, y orad por los que os persiguen» (Mat. 5:44). Como Moisés, perdonar e interceder refleja la gracia de Dios para con los pecadores.",
        "options": [
          {
            "id": "familia",
            "label": "Alguien de mi propia familia",
            "insight": "Moisés intercedió por su hermana María, que lo había envidiado. El dolor familiar es el más hondo, y la gracia ahí brilla más.",
            "tags": [
              "react:withdraw",
              "theme:grace",
              "posture:surrendering"
            ]
          },
          {
            "id": "amigo",
            "label": "Un amigo que me traicionó",
            "insight": "«Soportándoos unos a otros, y perdonándoos» (Col. 3:13). Orar por quien te falló empieza a sanar lo que la traición rompió.",
            "tags": [
              "react:self-blame",
              "theme:relationship",
              "tone:raw"
            ]
          },
          {
            "id": "lider",
            "label": "Alguien con poder sobre mí",
            "insight": "Moisés intercedió incluso por Aarón, que cedió ante el pueblo. Orar por quien tiene autoridad rompe el ciclo del rencor.",
            "tags": [
              "react:control",
              "theme:humility",
              "posture:surrendering"
            ]
          },
          {
            "id": "yo",
            "label": "Me cuesta perdonarme a mí mismo",
            "insight": "Moisés llegó a ofrecer su propia salvación por otros. Si Dios perdona, tú también puedes recibir ese perdón para ti.",
            "tags": [
              "react:self-blame",
              "theme:grace",
              "tone:tender"
            ]
          },
          {
            "id": "lejano",
            "label": "Alguien que ya casi no veo",
            "insight": "La distancia no borra la herida, pero la oración la entrega a Dios. Puedes soltarla aunque nunca recibas una disculpa.",
            "tags": [
              "react:withdraw",
              "theme:hope",
              "posture:surrendering"
            ]
          },
          {
            "id": "nadie",
            "label": "Por gracia, ahora mismo a nadie",
            "insight": "Qué regalo. Aun así, ora pidiendo el corazón de Moisés, listo a interceder por otros cuando llegue el momento.",
            "tags": [
              "theme:grace",
              "posture:humble",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "intercesion",
      "day": "Jueves · Moisés intercede por la nación",
      "tag": "Brasa 6 · Mi intercesión",
      "title": "«Bórrame a mí, pero perdónalos»",
      "story": "Tras el becerro de oro, Moisés se postró cuarenta días rogando por un pueblo que no lo merecía: «perdona ahora su pecado; y si no, bórrame del libro que has escrito» (Éx. 32:32). Le recordó a Dios su pacto, reclamó sus promesas y aceptó sus respuestas.",
      "cue": "Mira hacia arriba, {name}.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Guardar en mi altar",
        "seedSub": "tu intercesión",
        "stepPrompt": "Una forma de interceder como Moisés esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Recordarle a Dios sus promesas al orar",
          "Postrarme a interceder por mi familia",
          "Orar por alguien de mi comunidad",
          "Persistir aunque la respuesta tarde",
          "Aceptar la respuesta de Dios, sea cual sea"
        ],
        "stepPlaceholder": "cómo intercederé…",
        "stepExtraKey": "intercesionTexto",
        "personPrompt": "Alguien que hoy necesita tu intercesión",
        "personHint": "¿Quién en tu esfera de influencia te necesita en oración?",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "intercedido"
      }
    },
    {
      "id": "fuego",
      "day": "El fuego que no se apaga",
      "tag": "Brasa 7 · Mi fuego que no se apaga",
      "title": "Que tus pensamientos se vuelvan a él como la flor al sol",
      "story": "Daniel, Enoc y Moisés parecen gigantes inalcanzables. Pero podemos vivir tan cerca de Dios que, ante cualquier prueba, nuestros pensamientos se vuelvan a él tan naturalmente como la flor se vuelve hacia el sol. Ese es el fuego que no se apaga.",
      "cue": "Aquí se enciende todo, {name}.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Encender el fuego · guardar",
        "seedSub": "tu fuego",
        "chain": [
          {
            "word": "Una chispa",
            "line": "Decides volver a hablar con él, hoy."
          },
          {
            "word": "Una postura",
            "line": "Tu corazón se rinde: «eres soberano, soy tu hijo»."
          },
          {
            "word": "Constancia",
            "line": "Como Daniel, abres la ventana cada día, pase lo que pase."
          },
          {
            "word": "Caminata",
            "line": "Como Enoc, caminas con él hasta en la labor diaria."
          },
          {
            "word": "Intercesión",
            "line": "Como Moisés, tu fuego alumbra y cubre a otros."
          }
        ],
        "climax": "Y la llama no se apaga, porque amas al Señor que escuchó tu voz, y lo invocarás mientras vivas.",
        "prompt": "¿Cuál es el fuego que mantendrás encendido?",
        "hint": "«Por eso lo invocaré mientras yo viva» (Sal. 116:2)",
        "options": [
          "Orar a Dios como a mi mejor amigo",
          "Volverme a él en cada prueba",
          "Sostener mi tiempo diario con él",
          "Interceder por los que amo"
        ],
        "allowCustom": {
          "placeholder": "mi fuego es…",
          "extraKey": "fuegoPropio"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Brasa 8 · Mi paso de la semana",
      "title": "No puedes incomodarlo ni agobiarlo",
      "story": "«Presenta a Dios tus necesidades, tristezas, gozos y temores; no puedes incomodarlo ni agobiarlo». El que sostiene los mundos se interesa por la oración más pequeña de sus hijos. Su relación contigo es tan única como si no hubiera nadie más de quien ocuparse.",
      "cue": "Llévalo contigo, {name}.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi altar",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto de esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Hablar con Dios como con un amigo, cada día",
          "Arrodillarme al empezar la mañana",
          "Llevarle todo lo que me confunde",
          "Orar en voz audible para no distraerme",
          "Interceder por alguien antes de dormir"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien a quien animaré a orar",
        "personHint": "¿A quién invitarás a encender su propio altar?",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "animar"
      }
    }
  ],
  "encourage": [
    "«Amo al Señor, porque ha escuchado mi voz y mis súplicas.» — Salmo 116:1",
    "«Por eso lo invocaré mientras yo viva.» — Salmo 116:2",
    "«Caminó, pues, Enoc con Dios, y desapareció, porque le llevó Dios.» — Génesis 5:24",
    "«Orad sin cesar.» — 1 Tesalonicenses 5:17",
    "«Perseverad en la oración, velando en ella con acción de gracias.» — Colosenses 4:2",
    "«Amad a vuestros enemigos, y orad por los que os persiguen.» — Mateo 5:44",
    "«¡Oh Dios, te ruego que la sanes ahora!» — Números 12:13",
    "«¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?» — Salmo 139:7"
  ],
  "discussion": [
    "¿Describirías la oración como algo hermoso o como una carga? ¿Qué ha contribuido a tu perspectiva?",
    "La cita de El camino a Cristo dice que no puedes incomodar ni agobiar a Dios con tus cargas. ¿Qué pensamiento de ella resuena más en ti?",
    "¿Con cuál de las tres vidas de oración estudiadas esta semana —Daniel, Enoc o Moisés— te sientes más identificado, y por qué?",
    "Daniel siguió orando aunque le costara la vida. ¿Cuán fundadas son tus excusas para no orar a la luz de su ejemplo?",
    "¿Cambia algo en tu oración la postura de tu cuerpo? Si puedes arrodillarte y no sueles hacerlo, ¿qué te lo impide?",
    "Moisés intercedió por María, que lo había herido. ¿Por quién te cuesta orar hoy, y qué pasaría si lo hicieras?",
    "¿Quién, dentro de tu esfera de influencia, necesita ahora mismo tus oraciones intercesoras?"
  ],
  "facilitator": [
    {
      "stationId": "excusa",
      "apertura": "Si casi no hablaras con tu mejor amigo, ¿qué pasaría con esa amistad? ¿Y con Dios?",
      "seguimiento": "¿Qué excusa apaga hoy con más frecuencia tu vida de oración?",
      "ilustracion": "Una relación se enfría no por una pelea, sino por el silencio acumulado. La oración es el aire de la amistad con Dios.",
      "transicion": "Si así se enfría la oración, veamos qué dice el cuerpo cuando sí nos acercamos.",
      "actividad": "Que cada uno nombre, si desea, una excusa que reconoce en su propia vida.",
      "cierre": "Señor, inclina hoy tu oído como prometiste, y enciende de nuevo nuestra oración."
    },
    {
      "stationId": "postura",
      "apertura": "¿Cuál es tu postura habitual al orar, y qué crees que refleja sobre tu corazón?",
      "seguimiento": "¿Qué cambiaría si probaras arrodillarte la próxima vez que ores?",
      "ilustracion": "La oración matutina de rodillas declara a las tinieblas a quién pertenecemos; y Dios envía ángeles a fortalecernos.",
      "transicion": "Con el corazón rendido, veamos a alguien que oró firme aunque le costara la vida: Daniel.",
      "actividad": "Lean Daniel 6:10 y Lucas 22:41; comenten qué postura tomó cada uno y por qué.",
      "cierre": "Que nuestro cuerpo y nuestras palabras declaren: tú eres soberano, somos tus hijos."
    },
    {
      "stationId": "constancia",
      "apertura": "Daniel gobernaba un imperio y aun así oraba tres veces al día. ¿Qué dice eso del tiempo?",
      "seguimiento": "¿Qué ritmo de oración podrías sostener pase lo que pase esta semana?",
      "ilustracion": "Ante el decreto de muerte, Daniel no cambió nada: abrió la ventana y dio gracias, como siempre.",
      "transicion": "De la constancia firme de Daniel pasamos a la caminata diaria de Enoc.",
      "actividad": "Clasifiquen frases juntos: ¿constancia que arde o llama que se apaga?",
      "cierre": "Danos, Señor, un ritmo fiel, y el valor de orar aunque cueste."
    },
    {
      "stationId": "caminata",
      "apertura": "La Biblia casi no cuenta nada de Enoc, solo que caminó con Dios. ¿Por qué bastó con eso?",
      "seguimiento": "¿Qué hábito sencillo te acercaría más a Dios en medio de tu vida activa?",
      "ilustracion": "Cuanto más urgentes eran sus labores, más fervorosas sus oraciones; su rostro reflejaba luz santa.",
      "transicion": "De caminar con Dios pasamos a interceder por otros: Moisés y su hermana.",
      "actividad": "Que cada uno elija un hábito de cercanía diaria para practicar esta semana.",
      "cierre": "Enséñanos, Señor, a caminar contigo sin dejar de servir a los demás."
    },
    {
      "stationId": "perdon",
      "apertura": "Moisés oró por María, que lo había despreciado. ¿Qué refleja eso del carácter de Dios?",
      "seguimiento": "¿Por quién te cuesta más orar hoy, y qué te lo impide?",
      "ilustracion": "El ofendido intercedió por la ofensora. Pudo dejar que recibiera su castigo; eligió la gracia.",
      "transicion": "De interceder por quien nos hirió pasamos a interceder por toda una nación.",
      "actividad": "Lean Mateo 5:44 y Colosenses 3:13; conversen cómo aprender a orar por quien nos hiere.",
      "cierre": "Pon en nosotros, Señor, la gracia perdonadora que vimos en Moisés."
    },
    {
      "stationId": "intercesion",
      "apertura": "Moisés ofreció ser borrado del libro con tal de que el pueblo fuera perdonado. ¿Qué amor es ese?",
      "seguimiento": "¿A quién, dentro de tu esfera de influencia, necesitas llevar en oración?",
      "ilustracion": "Cuarenta días postrado por un pueblo que no lo merecía: la intercesión cuesta y persiste.",
      "transicion": "Reunamos a Daniel, Enoc y Moisés en un solo fuego que no se apaga.",
      "actividad": "Que cada uno mencione un nombre por el que se compromete a interceder esta semana.",
      "cierre": "Haznos intercesores fieles, que reclamen tus promesas por los que amamos."
    },
    {
      "stationId": "fuego",
      "apertura": "¿Por qué pensamos que no podemos tener una relación tan estrecha con Dios como esos gigantes?",
      "seguimiento": "¿Cuál es el fuego de oración que más necesitas mantener encendido?",
      "ilustracion": "La flor se vuelve hacia el sol sin esfuerzo. Así pueden volverse nuestros pensamientos a Dios.",
      "transicion": "Con el fuego encendido, demos un paso concreto para esta semana.",
      "actividad": "Reciten juntos Salmo 116:1, 2 y nombren el eslabón que más necesitan avivar.",
      "cierre": "Que la llama no se apague: te invocaremos mientras vivamos."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué significa que no puedes incomodar ni agobiar a Dios con tus cargas?",
      "seguimiento": "¿A quién podrías animar esta semana a encender su propia vida de oración?",
      "ilustracion": "El que sostiene los mundos se interesa por tu oración más pequeña, como si no hubiera nadie más.",
      "transicion": "Recojamos todo en un altar y un paso concreto para los próximos días.",
      "actividad": "Compartan un solo paso de oración concreto para esta semana.",
      "cierre": "Llevamos todo a ti, Señor; eres nuestro Líder y Amigo."
    }
  ],
  "patternTemplate": "{name}, tu excusa solía ser {slot:excusa|lower}. Pero estás aprendiendo a acercarte con {slot:postura|lower}, a orar con la constancia de Daniel y a caminar con Dios como Enoc. La chispa ya es brasa: tu oración está volviendo a arder.",
  "outOracion": "Señor, vengo a ti, y reconozco que lo que apaga mi oración suele ser {slot:excusa|lower}. Pero hoy me acerco con {slot:postura|lower}, como Daniel que abría su ventana pase lo que pase. Enséñame a caminar contigo como Enoc al {slot:caminata|lower}. Pongo ante ti a quien me hirió, e intercedo por los que amo. Mi fuego es {slot:fuego|lower}. «{verse}» ({verseRef}). Por eso te invocaré mientras viva. En el nombre de Jesús, amén.",
  "outAliento": "{name}, no puedes incomodar ni agobiar a Dios. Él ya inclinó su oído hacia ti. Vuelve a abrir la ventana hoy: tu fuego de oración, {slot:fuego|lower}, todavía puede arder mientras vivas.",
  "outAccion24": "En las próximas 24 horas voy a {slot:caminata|lower}, y voy a interceder por alguien que hoy me necesita.",
  "outPregunta": "Esta semana descubrí que lo que apaga mi oración suele ser {slot:excusa|lower}, pero estoy aprendiendo a acercarme con {slot:postura|lower}. ¿Describirías tú la oración como algo hermoso o como una carga, y qué ha formado tu perspectiva?",
  "outTarjeta": "Mi altar de esta semana: dejé atrás {slot:excusa|lower} y elijo acercarme con {slot:postura|lower}. Mi fuego es {slot:fuego|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
