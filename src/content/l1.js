import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 1,
  "slug": "evaluate",
  "title": "Evalúate",
  "subtitle": "¿Cómo describirías hoy tu relación con Dios?",
  "kitName": "Mi Cielo Despejado",
  "artifactNoun": "cielo",
  "motif": "sky",
  "stages": [
    "noche",
    "alba",
    "claros",
    "luz",
    "pleno"
  ],
  "stageLabels": [
    "Cielo encapotado · tibieza",
    "Apunta el alba · me evalúo",
    "Las nubes se abren · me arrepiento",
    "Entra la luz · permanezco",
    "Cielo pleno · amor eterno"
  ],
  "verseRef": "Juan 15:9",
  "verseText": "Como el Padre me amó, también yo los he amado; permaneced en mi amor.",
  "promise": "En unos minutos vas a despejar tu Cielo, {name}: evaluarás con honestidad tu relación con Dios, escucharás la reprensión que es amor, abrirás la puerta a Quien llama, decidirás permanecer en la Vid y pedirás la savia del Espíritu. Pieza a pieza, lo que estaba encapotado amanecerá.",
  "ui": {
    "start": "Empezar a despejar mi cielo",
    "emptyKit": "Tu cielo",
    "building": "Cada elección abre un claro",
    "buildingHint": "Toca la pieza que brilla. Verás el cielo encapotado abrirse hasta la luz plena.",
    "lastPiece": "Falta una pieza",
    "patternLabel": "Tu patrón en el cielo",
    "doneTitle": "Tu cielo está despejado",
    "doneSub": "Lo despejaste tú, con Dios. Ábrelo, guárdalo, compártelo.",
    "open": "Abrir mi cielo",
    "back": "Volver a mi cielo"
  },
  "slots": [
    {
      "id": "estado",
      "n": 1,
      "label": "Mi estado actual",
      "teaser": "Cómo está hoy mi cielo con Dios…",
      "icon": "cloud"
    },
    {
      "id": "condicion",
      "n": 2,
      "label": "Mi condición honesta",
      "teaser": "Lo que el Testigo Fiel ve en mí…",
      "icon": "eye"
    },
    {
      "id": "puerta",
      "n": 3,
      "label": "La puerta que abro",
      "teaser": "Él llama; yo respondo…",
      "icon": "hand"
    },
    {
      "id": "estorbo",
      "n": 4,
      "label": "Lo que estorba",
      "teaser": "Lo que me aleja y debo superar…",
      "icon": "release"
    },
    {
      "id": "permanecer",
      "n": 5,
      "label": "Mi permanencia",
      "teaser": "Cómo me conecto a la Vid…",
      "icon": "leaf"
    },
    {
      "id": "savia",
      "n": 6,
      "label": "Mi oración por la savia",
      "teaser": "El Espíritu que me da vida…",
      "icon": "feather"
    },
    {
      "id": "amor",
      "n": 7,
      "label": "El amor que me sostiene",
      "teaser": "El amor eterno que me atrae…",
      "icon": "heart"
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
      "day": "Sábado · ¿Cómo describirías tu relación con Dios?",
      "tag": "Casillero 1 · Mi estado actual",
      "title": "¿Vibrante, apagada, o en un punto intermedio?",
      "story": "Detente y mira tu cielo interior. ¿Es brillante y despejado, lleno de oración y Palabra? ¿O lo cubre una capa gris que la Biblia llama «tibieza» (Apoc. 3:16)? Antes de mejorar, hace falta una mirada honesta. Tu condición no puede cambiar hasta que la nombres.",
      "cue": "Detente aquí, {name}. Antes de avanzar, mira tu cielo de hoy.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Cómo describirías hoy tu relación con Dios?",
        "hint": "Elige la más sincera ahora mismo",
        "saveLabel": "Guardar en mi cielo",
        "seedSub": "tu estado",
        "options": [
          {
            "id": "vibrante",
            "label": "Vibrante y sólida",
            "insight": "Qué don. Pero hasta el cielo más claro necesita lluvia: «permaneced en mi amor» (Juan 15:9) no es para los que llegaron, sino para los que siguen.",
            "tags": [
              "theme:relationship",
              "posture:seeking",
              "tone:resolute"
            ]
          },
          {
            "id": "tibia",
            "label": "Tibia · ni fría ni caliente",
            "insight": "«Ojalá fueses frío o caliente» (Apoc. 3:15). Jesús prefiere tu honestidad a tu rutina. Que lo reconozcas ya es el primer claro en el cielo.",
            "tags": [
              "theme:self",
              "posture:avoidant",
              "tone:raw"
            ]
          },
          {
            "id": "intermitente",
            "label": "Viva, pero solo a ratos",
            "insight": "«De tanto en tanto» no basta, y lo sabes. Necesitamos a Dios mucho más desesperadamente de lo que creemos.",
            "tags": [
              "theme:relationship",
              "posture:clinging",
              "tone:tender"
            ]
          },
          {
            "id": "disminuida",
            "label": "Ha disminuido con el tiempo",
            "insight": "No es por culpa suya. «Con amor eterno te he amado» (Jer. 31:3); él sigue buscándote para reconstruir lo que se enfrió.",
            "tags": [
              "react:self-blame",
              "theme:relationship",
              "tone:raw"
            ]
          },
          {
            "id": "distante",
            "label": "Distante · casi apagada",
            "insight": "Aunque la rama parezca seca, la savia aún puede subir. Él está a la puerta, llamando, esperando (Apoc. 3:20).",
            "tags": [
              "react:withdraw",
              "theme:self",
              "posture:avoidant"
            ]
          },
          {
            "id": "anhelante",
            "label": "Anhelo más, pero no sé cómo",
            "insight": "Ese anhelo ya es obra del Espíritu en ti. «Acercaos a Dios, y él se acercará a vosotros» (Sant. 4:8).",
            "tags": [
              "theme:hope",
              "posture:seeking",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "condicion",
      "day": "Domingo · Nuestra condición",
      "tag": "Casillero 2 · Mi condición honesta",
      "title": "El Testigo Fiel no miente",
      "story": "Jesús se presenta como «el Testigo Fiel y Verdadero» (Apoc. 3:14): habla claro, sin halagos. Nos dice que creemos no necesitar nada, cuando en realidad somos «pobres, ciegos y desnudos» (Apoc. 3:17). Y enseguida ofrece el trueque más generoso: nuestra apatía por su oro, su manto y su colirio.",
      "cue": "{name}, deja que el Testigo Fiel te diga la verdad hoy.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "Si Jesús describiera con honestidad mi condición, diría que…",
        "hint": "Elige la que más te describe",
        "saveLabel": "Guardar en mi cielo",
        "seedSub": "tu condición",
        "closing": "No te quedes en el diagnóstico. El mismo que nombra tu pobreza te ofrece su oro: «yo te aconsejo que de mí compres oro refinado en fuego, para que seas rico» (Apoc. 3:18).",
        "options": [
          {
            "id": "autosuficiente",
            "label": "«Creo que no necesito nada»",
            "insight": "Esa es la trampa exacta de Laodicea. La autosuficiencia es la ceguera que no sabe que es ciega.",
            "tags": [
              "react:pride",
              "theme:self",
              "posture:proud"
            ]
          },
          {
            "id": "ocupada",
            "label": "«Le doy lo que sobra de mi tiempo»",
            "insight": "Un poco, de tanto en tanto, y creemos que basta. Pero no basta: él quiere tu corazón entero, no tus restos.",
            "tags": [
              "react:apathy",
              "theme:self",
              "posture:avoidant"
            ]
          },
          {
            "id": "ciega",
            "label": "«No veo lo que me falta»",
            "insight": "Por eso ofrece colirio: para que tus ojos perciban que una relación con él lo cambia todo.",
            "tags": [
              "theme:humility",
              "posture:seeking",
              "tone:raw"
            ]
          },
          {
            "id": "pobre",
            "label": "«Estoy más vacío de lo que admito»",
            "insight": "Reconocerlo no es derrota: es la puerta. Solo el que sabe que es pobre busca el oro que da Jesús.",
            "tags": [
              "theme:humility",
              "posture:humble",
              "tone:raw"
            ]
          },
          {
            "id": "cansada",
            "label": "«Sigo, pero por inercia»",
            "insight": "La rutina sin corazón es tibieza disfrazada de fidelidad. Él prefiere tu honestidad a tu mecánica.",
            "tags": [
              "react:apathy",
              "theme:self",
              "tone:tender"
            ]
          },
          {
            "id": "fuerte",
            "label": "«Por gracia, voy fuerte»",
            "insight": "Bendito seas. Recuerda que esa riqueza la compraste de él; sigue comprando cada día (Apoc. 3:18).",
            "tags": [
              "theme:grace",
              "posture:surrendering",
              "tone:resolute"
            ]
          }
        ]
      }
    },
    {
      "id": "puerta",
      "day": "Lunes · Amonestación, arrepentimiento y recompensa",
      "tag": "Casillero 3 · La puerta que abro",
      "title": "Está a la puerta, y llama",
      "story": "«Yo reprendo y castigo a todos los que amo» (Apoc. 3:19). No te corrige porque le estorbas, sino porque te ama demasiado para dejarte tibio. Y entonces hace algo asombroso: el Dios del universo se queda a la puerta, llamando sin forzar. «Si alguno oye mi voz y abre, entraré» (Apoc. 3:20).",
      "cue": "{name}, alguien lleva rato llamando a tu puerta. ¿Lo oyes?",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi cielo",
        "seedSub": "tu puerta",
        "skill": {
          "prompt": "Entrena el oído: ¿amor que reprende… o rechazo que aleja?",
          "hint": "Él reprende a los que ama. Aprende a oír su voz.",
          "badge": "Estás aprendiendo a reconocer el amor que corrige",
          "cats": [
            "Amor que reprende",
            "Reproche que aleja"
          ],
          "rounds": [
            {
              "t": "«Te reprendo porque no estoy satisfecho con que vivas tibio.»",
              "a": 0,
              "fb": "Amor que reprende: te corrige para acercarte, no para condenarte (Apoc. 3:19)."
            },
            {
              "t": "«Mejor renuncio a ti; no vales el esfuerzo.»",
              "a": 1,
              "fb": "Reproche que aleja: esa nunca es la voz de Jesús. Él recorrió la cruz por ti."
            },
            {
              "t": "«Sé celoso y arrepiéntete: aún tengo todo para darte.»",
              "a": 0,
              "fb": "Amor que reprende: la reprensión viene con una invitación y una promesa."
            },
            {
              "t": "«Ya es tarde para ti; la puerta se cerró.»",
              "a": 1,
              "fb": "Reproche que aleja: él sigue de pie, llamando, esperando con paciencia."
            },
            {
              "t": "«Quiero sentarme a comer contigo, en intimidad.»",
              "a": 0,
              "fb": "Amor que reprende: cena, diálogo, cercanía. Ese es el final de su corrección."
            },
            {
              "t": "«Acércate solo cuando seas digno.»",
              "a": 1,
              "fb": "Reproche que aleja: él no espera que te arregles; llama a tu puerta tal como estás."
            }
          ],
          "summary": "La reprensión de Jesús no te empuja afuera: te llama adentro. «He aquí, yo estoy a la puerta y llamo» (Apoc. 3:20). Solo tú decides abrir."
        },
        "commit": {
          "prompt": "¿Qué puerta le abrirás a Jesús esta semana?",
          "hint": "No irrumpe ni se impone. Espera que abras.",
          "placeholder": "abrirle mi mañana, mi miedo, esa parte que escondo…",
          "extraKey": "puertaAbierta",
          "options": [
            "Mi primera hora del día",
            "Esa parte de mí que escondo",
            "Mi tiempo más ocupado",
            "Una herida que no le he entregado",
            "La oración que vengo posponiendo"
          ]
        }
      }
    },
    {
      "id": "estorbo",
      "day": "Martes · Amor eterno",
      "tag": "Casillero 4 · Lo que estorba",
      "title": "Lo que obstaculiza, supéralo",
      "story": "«Al que venza le daré que se siente conmigo en mi trono» (Apoc. 3:21). Para algunos, la batalla más grande es admitir su tibieza y aceptar su manto. Dios siempre ha querido caminar cerca: con Adán en el huerto, con Enoc, con Abram. «Con amor eterno te he amado» (Jer. 31:3). Si esa cercanía no sucede, no es por culpa suya.",
      "cue": "{name}, mira con valentía lo que se interpone entre tú y él.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi cielo",
        "seedSub": "tu estorbo",
        "prompt": "Elige el estorbo que más nubla hoy tu cielo con Dios",
        "hint": "Toca cada uno · quédate con el más real",
        "chooseLabel": "Este es el que debo superar",
        "closing": "Sea cual sea la nube, él anhela atravesarla: «aún te edificaré, y serás edificada» (Jer. 31:4). El que te ama con amor eterno no se rinde contigo.",
        "allowCustom": {
          "label": "Escribir el mío",
          "placeholder": "Lo que más me aleja de él es…",
          "extraKey": "estorboPropio"
        },
        "items": [
          {
            "t": "La prisa · «no tengo tiempo»",
            "ref": "Luc. 10:41-42",
            "meaning": "Marta se afanaba; una sola cosa era necesaria. Lo urgente sepulta lo esencial."
          },
          {
            "t": "La autosuficiencia · «yo puedo»",
            "ref": "Apoc. 3:17",
            "meaning": "Creernos ricos nos cierra a su oro. La humildad abre lo que el orgullo sella."
          },
          {
            "t": "Una herida sin sanar",
            "ref": "Sal. 147:3",
            "meaning": "«Sana a los quebrantados de corazón.» Lo que escondes de él, no lo escondes de su amor."
          },
          {
            "t": "Un pecado que vuelve",
            "ref": "1 Juan 1:9",
            "meaning": "«Si confesamos, él es fiel para perdonarnos.» La confesión despeja el cielo más rápido que la vergüenza."
          },
          {
            "t": "La distracción · mil pantallas",
            "ref": "Sal. 46:10",
            "meaning": "«Estad quietos, y conoced que yo soy Dios.» El ruido ahoga la voz que llama a tu puerta."
          }
        ]
      }
    },
    {
      "id": "permanecer",
      "day": "Miércoles · Permanencia",
      "tag": "Casillero 5 · Mi permanencia",
      "title": "Yo soy la Vid; vosotros los sarmientos",
      "story": "Camino al Getsemaní, Jesús repitió diez veces una palabra: permanecer (Juan 15:1-11). No podemos fingir conexión, como una rama no puede simular que está unida a la vid. El fruto no se fabrica: brota de la permanencia. «Permaneced en mi amor» (Juan 15:9) es el secreto de una vida con sentido.",
      "cue": "{name}, antes de seguir, decide hoy dónde echar raíz.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi cielo",
        "seedSub": "tu permanencia",
        "prompt": "Toca cada carta para ver la Vid como Jesús la ve",
        "hint": "Dos miradas sobre la misma rama",
        "pairs": [
          {
            "see": "Crees que el fruto depende de tu esfuerzo.",
            "sees": "«Separados de mí nada podéis hacer» (Juan 15:5): el fruto es suyo, fluyendo por ti."
          },
          {
            "see": "Sientes que cumplir sus mandamientos pesa.",
            "sees": "«Sus mandamientos no son gravosos» (1 Juan 5:3): son el rostro de su amor."
          },
          {
            "see": "Temes la poda como un castigo.",
            "sees": "Poda al que da fruto «para que lleve más fruto» (Juan 15:2): te cuida, no te corta."
          },
          {
            "see": "Buscas gozo en otra parte.",
            "sees": "«Para que mi gozo esté en vosotros, y vuestro gozo sea cumplido» (Juan 15:11)."
          }
        ],
        "chooseLabel": "Esta es la verdad que necesitaba",
        "teach": "Permanecer en Jesús es vivir conectado: orar, escudriñar su Palabra, guardar sus mandamientos por amor. La evidencia de la unión no es el discurso, sino el fruto.",
        "commit": {
          "prompt": "Escribe cómo permanecerás en la Vid esta semana, en concreto",
          "hint": "Permanecer es una decisión diaria, no un sentimiento",
          "placeholder": "Permaneceré en él al…",
          "extraKey": "permanencia",
          "shareable": true
        }
      }
    },
    {
      "id": "savia",
      "day": "Jueves · La savia",
      "tag": "Casillero 6 · Mi oración por la savia",
      "title": "Pide que la savia fluya",
      "story": "En invierno, las yemas de la vid se deshidratan y quedan aisladas. Pero cuando el suelo se calienta, la savia sube por el tronco y la vida regresa. «La savia de la vid es como el Espíritu Santo en nuestra vida.» Puedo parecer una rama muerta, pero al decidir buscar a Dios, el Espíritu se derrama y me da vida (Rom. 8:9-11).",
      "cue": "{name}, deja que esto te alcance hoy: la savia aún puede subir.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "¿Qué obra del Espíritu necesitas pedir hoy con más urgencia?",
        "hint": "El Padre da el Espíritu a los que se lo piden (Luc. 11:13)",
        "saveLabel": "Guardar en mi cielo",
        "seedSub": "tu savia",
        "closing": "No olvides pedir cada día. «Si vosotros... sabéis dar buenas dádivas... ¿cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?» (Luc. 11:13).",
        "options": [
          {
            "id": "consolador",
            "label": "Que sea mi Consolador",
            "insight": "«No os dejaré huérfanos» (Juan 14:18). El Espíritu acompaña al alma cansada que cree estar sola.",
            "tags": [
              "theme:hope",
              "posture:clinging",
              "tone:tender"
            ]
          },
          {
            "id": "revelar",
            "label": "Que me revele a Jesús",
            "insight": "«Él dará testimonio de mí» (Juan 15:26). Cuando el Espíritu fluye, Jesús deja de ser idea y se vuelve presencia.",
            "tags": [
              "theme:word",
              "posture:seeking",
              "tone:tender"
            ]
          },
          {
            "id": "convencer",
            "label": "Que me convenza de pecado",
            "insight": "«Convencerá al mundo de pecado» (Juan 16:8). Su redargución no te hunde: te despierta y te limpia.",
            "tags": [
              "theme:sin",
              "posture:humble",
              "tone:raw"
            ]
          },
          {
            "id": "guiar",
            "label": "Que me guíe a la verdad",
            "insight": "«Os guiará a toda la verdad» (Juan 16:13). En la niebla de las decisiones, él es la savia que orienta.",
            "tags": [
              "theme:faith",
              "posture:seeking",
              "tone:resolute"
            ]
          },
          {
            "id": "vida",
            "label": "Que me dé vida nueva",
            "insight": "«El Espíritu del que levantó a Jesús... vivificará vuestros cuerpos» (Rom. 8:11). La rama seca puede reverdecer.",
            "tags": [
              "theme:hope",
              "posture:surrendering",
              "tone:tender"
            ]
          },
          {
            "id": "amar",
            "label": "Que me enseñe a amar",
            "insight": "«Nosotros le amamos a él, porque él nos amó primero» (1 Juan 4:19). El amor que respondemos nace de la savia que recibimos.",
            "tags": [
              "theme:relationship",
              "posture:surrendering",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "amor",
      "day": "El amor eterno que me sostiene",
      "tag": "Casillero 7 · El amor que me sostiene",
      "title": "Permaneced en mi amor",
      "story": "Reúne lo que despejaste: tu condición honesta, la puerta abierta, lo que dejaste, la Vid y la savia. Todo cuelga de un solo hilo de oro: «Como el Padre me amó, también yo los he amado» (Juan 15:9). Su amor es la cuerda que te atrae. No empieza en tu esfuerzo; empieza en su iniciativa eterna.",
      "cue": "{name}, esto es lo que sostiene todo lo demás. Recíbelo.",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Recibir su amor · guardar",
        "seedSub": "tu permanencia en su amor",
        "chain": [
          {
            "word": "Él me amó primero",
            "line": "No respondiste a un Dios distante: él dio el primer paso (1 Juan 4:19)."
          },
          {
            "word": "Me reprende porque me ama",
            "line": "Su corrección no me aleja; me llama a una relación más profunda."
          },
          {
            "word": "Me invita a permanecer",
            "line": "La savia del Espíritu fluye y el fruto brota de la unión, no del esfuerzo."
          },
          {
            "word": "Permanezco en su amor",
            "line": "Ya no por inercia ni por miedo, sino atraído por un amor eterno."
          }
        ],
        "climax": "Y este amor no defrauda: «con amor eterno te he amado, por eso te atraje con bondad» (Jer. 31:3).",
        "prompt": "¿Cuál es la verdad de su amor en la que vas a permanecer?",
        "hint": "«Permaneced en mi amor» (Juan 15:9)",
        "options": [
          "Que me amó antes de que naciera",
          "Que me reprende porque le importo",
          "Que su Espíritu me da vida nueva",
          "Que su amor no depende de mi desempeño"
        ],
        "allowCustom": {
          "placeholder": "permaneceré en el amor que…",
          "extraKey": "amorPropio"
        }
      }
    },
    {
      "id": "paso",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Casillero 8 · Mi paso de la semana",
      "title": "Decide responderle hoy",
      "story": "«El conducto de comunicación debe mantenerse continuamente abierto entre el hombre y su Dios» (El Deseado de todas las gentes, p. 645). Como el sarmiento se aferra a la vid fibra a fibra, así hemos de aferrarnos a Jesús. La relación crece lento o se acelera con la lluvia; lo esencial es recibir cada día la savia. Solo falta decidir.",
      "cue": "{name}, antes de cerrar, da un paso que puedas dar mañana.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi cielo",
        "seedSub": "tu paso",
        "stepPrompt": "Mi paso concreto de esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Abrir mi Biblia 10 minutos cada mañana",
          "Pedir el Espíritu Santo todos los días",
          "Hablar con Dios como con mi Amigo",
          "Confesar y soltar lo que me enfría",
          "Restaurar un hábito espiritual que dejé"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien con quien compartiré esta relación",
        "personHint": "¿A quién invitarías a acercarse a Dios contigo?",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "compartir"
      }
    }
  ],
  "encourage": [
    "«Como el Padre me amó, también yo los he amado; permaneced en mi amor.» — Juan 15:9",
    "«Con amor eterno te he amado, por eso te atraje con bondad.» — Jeremías 31:3",
    "«He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre, entraré.» — Apocalipsis 3:20",
    "«Yo reprendo y castigo a todos los que amo; sé, pues, celoso y arrepiéntete.» — Apocalipsis 3:19",
    "«Permaneced en mí, y yo en vosotros.» — Juan 15:4",
    "«Separados de mí nada podéis hacer.» — Juan 15:5",
    "«¿Cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?» — Lucas 11:13",
    "«Nosotros le amamos a él, porque él nos amó primero.» — 1 Juan 4:19"
  ],
  "discussion": [
    "Reflexiona acerca de tu vida: ¿puedes identificar algo que te haya adormecido en una condición espiritual laodicense? Por el contrario, ¿qué experiencias te han acercado más a Dios?",
    "Elena G. de White habla de «recibir constantemente de su Espíritu». ¿Con qué frecuencia oras pidiendo el Espíritu Santo? ¿Qué podría cambiar en tu vida si lo recibieras cada día?",
    "¿Qué cambiaría si oráramos como iglesia por el Espíritu Santo con más fervor y regularidad?",
    "Sé muy honesto, aunque te resulte doloroso, acerca de tu relación con Dios. ¿Qué necesitas hacer para tener la relación que él anhela, pero que tú obstaculizas?",
    "Jesús está a la puerta y llama (Apoc. 3:20). ¿Qué te impide abrir, y qué pasaría si abrieras hoy?",
    "Jesús es la Vid y nosotros los sarmientos. ¿Cómo se ve, en tu rutina concreta, «permanecer» en él esta semana?",
    "Si Jesús, el Testigo Fiel, describiera tu relación con él en una sola frase, ¿qué crees que diría, y qué quieres que diga dentro de un año?"
  ],
  "facilitator": [
    {
      "stationId": "estado",
      "apertura": "¿Cómo describirías tu relación con Dios: vibrante, tibia, o en un punto intermedio?",
      "seguimiento": "¿Cuánto tiempo dedicas realmente a la Palabra y a la oración cada día?",
      "ilustracion": "Un cielo encapotado no es tormenta ni sol: es esa grisura constante que la Biblia llama tibieza (Apoc. 3:16).",
      "transicion": "Si esa es nuestra grisura, oigamos al Testigo Fiel describir nuestra condición real.",
      "actividad": "Que cada uno, si desea, nombre en una palabra cómo está hoy su cielo con Dios.",
      "cierre": "Señor, danos la honestidad de mirar nuestro cielo tal como está."
    },
    {
      "stationId": "condicion",
      "apertura": "¿Por qué Jesús se presenta como «el Testigo Fiel y Verdadero» antes de diagnosticarnos?",
      "seguimiento": "¿En qué medida te describe el «creo que no necesito nada» de Laodicea?",
      "ilustracion": "El trueque antiguo era intercambio: Jesús ofrece cambiar nuestra apatía por su oro, su manto y su colirio.",
      "transicion": "Del diagnóstico pasamos a su remedio: una reprensión que es, en realidad, una invitación.",
      "actividad": "Lean Apocalipsis 3:14-18 y comenten qué ofrece Jesús a cambio de cada carencia.",
      "cierre": "Gracias, Señor, porque nombras nuestra pobreza solo para ofrecernos tu riqueza."
    },
    {
      "stationId": "puerta",
      "apertura": "«Yo reprendo a los que amo» (Apoc. 3:19). ¿Cómo puede la reprensión ser una forma de amor?",
      "seguimiento": "¿Qué puerta de tu vida sigues sin abrirle a Jesús?",
      "ilustracion": "Un Salvador de elevada estatura llamando con delicadeza, sin forzar la puerta. Él espera; no irrumpe.",
      "transicion": "Si él llama y espera, veamos qué estorbos nos impiden abrir.",
      "actividad": "Distingan frases: ¿amor que reprende para acercarnos, o reproche que aleja?",
      "cierre": "Cristo, ayúdanos a oír tu voz y a abrirte la puerta hoy."
    },
    {
      "stationId": "estorbo",
      "apertura": "Dios caminó con Adán, Enoc y Abram. Si esa cercanía no sucede hoy, ¿de quién es la culpa?",
      "seguimiento": "¿Qué cosa concreta está obstaculizando tu relación con Dios y necesitas superar?",
      "ilustracion": "«Con amor eterno te he amado» (Jer. 31:3): el que ama así no se rinde ante nuestras nubes.",
      "transicion": "Despejado el estorbo, Jesús nos muestra cómo permanecer: la Vid y los sarmientos.",
      "actividad": "Que cada uno identifique, si desea, una nube concreta que quiere superar esta semana.",
      "cierre": "Edifícanos, Señor, y reconstruye lo que el tiempo y el descuido enfriaron."
    },
    {
      "stationId": "permanecer",
      "apertura": "Jesús repitió «permanecer» diez veces camino al Getsemaní. ¿Por qué tanta insistencia?",
      "seguimiento": "¿Cómo se ve, en tu rutina concreta, estar conectado a la Vid esta semana?",
      "ilustracion": "Una rama no puede fingir que está unida a la vid: la falta de fruto delata la desconexión.",
      "transicion": "Si el fruto viene de la unión, necesitamos la savia que la hace posible: el Espíritu.",
      "actividad": "Lean Juan 15:1-11 y cuenten cuántas veces aparece «permanecer».",
      "cierre": "Haznos permanecer en ti, para que tu gozo sea cumplido en nosotros."
    },
    {
      "stationId": "savia",
      "apertura": "¿Por qué la savia de la vid es una buena imagen del Espíritu Santo en nosotros?",
      "seguimiento": "¿Con qué frecuencia pides, en concreto, la presencia del Espíritu Santo?",
      "ilustracion": "En invierno las yemas se aíslan; cuando sube la savia, la vida regresa. Igual el Espíritu en el alma seca.",
      "transicion": "La savia del Espíritu nos atrae a su raíz: el amor eterno del Padre.",
      "actividad": "Repasen las cuatro obras del Espíritu (Juan 14:16-18; 15:26; 16:8,13) y oren pidiéndolas.",
      "cierre": "Derrama tu Espíritu, Señor; sé hoy nuestra savia y nuestra vida."
    },
    {
      "stationId": "amor",
      "apertura": "¿Cómo conecta Jesús «el Padre me amó» con «permaneced en mi amor» (Juan 15:9)?",
      "seguimiento": "¿En qué verdad del amor de Dios necesitas permanecer ahora mismo?",
      "ilustracion": "El amor de Jesús es la cuerda que nos atrae hacia él; cuando lo conocemos, respondemos con amor.",
      "transicion": "Anclados en ese amor, demos un paso concreto para la semana.",
      "actividad": "Reciten juntos Juan 15:9 y nombren el eslabón de la cadena que más necesitan.",
      "cierre": "Permanecemos en tu amor eterno, que dio siempre el primer paso."
    },
    {
      "stationId": "paso",
      "apertura": "¿Qué significa mantener «continuamente abierto el conducto de comunicación» con Dios?",
      "seguimiento": "¿A quién podrías invitar esta semana a acercarse a Dios contigo?",
      "ilustracion": "Fibra a fibra, el sarmiento se aferra a la vid hasta que su vida se une a él (Manuscrito 67, 1897).",
      "transicion": "Reunamos todo en un Kit y un paso concreto para los próximos días.",
      "actividad": "Compartan un solo paso concreto para esta semana y a quién animarán.",
      "cierre": "Danos la decisión diaria de responderte y aferrarnos a ti."
    }
  ],
  "patternTemplate": "{name}, empezaste reconociendo que tu cielo con Dios estaba {slot:estado|lower}, y dejaste que el Testigo Fiel te dijera la verdad. Le abriste {slot:puerta|lower} y elegiste superar {slot:estorbo|lower}. La grisura empieza a abrirse: lo que parecía tibieza se está volviendo amanecer, porque él te amó primero.",
  "outOracion": "Señor, vengo a ti reconociendo que mi relación contigo está {slot:estado|lower}. Tú, el Testigo Fiel, ves que {slot:condicion|lower}, y no te lo escondo. Hoy te abro {slot:puerta|lower} y suelto {slot:estorbo|lower}. Enséñame a permanecer en ti como el sarmiento en la Vid, y derrama tu Espíritu como savia en mi vida. Quiero permanecer en {slot:amor|lower}. Gracias porque «{verse}» ({verseRef}). En el nombre de Jesús, amén.",
  "outAliento": "{name}, tu cielo no está condenado a la grisura. El mismo que te reprende es el que está a la puerta llamando, y te ama con amor eterno. Decidiste superar {slot:estorbo|lower} y permanecer en {slot:amor|lower}: la savia ya está subiendo. No es por tu esfuerzo, sino porque él te amó primero.",
  "outAccion24": "En las próximas 24 horas voy a {slot:paso|lower}, y voy a abrirle a Jesús {slot:puerta|lower}.",
  "outPregunta": "Esta semana me evalué y descubrí que mi cielo con Dios estaba {slot:estado|lower}, pero estoy aprendiendo a permanecer en {slot:amor|lower}. ¿Cómo describirías hoy tu relación con Dios, y qué te impide abrirle la puerta?",
  "outTarjeta": "Mi cielo de esta semana: reconocí que estaba {slot:estado|lower}, decidí superar {slot:estorbo|lower} y permanecer en {slot:amor|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
