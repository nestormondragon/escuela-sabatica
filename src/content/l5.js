import { makeLesson } from "../engine/makeLesson.js";

// Auto-generated from the Q2-2026 PDF via the content pipeline, then adapted.
export default makeLesson(
{
  "number": 5,
  "slug": "como-estudiar-la-biblia",
  "title": "Cómo Estudiar la Biblia",
  "subtitle": "¿Lees a la carrera, o te sientas a los pies de Jesús?",
  "kitName": "Mi Semilla",
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
    "La semilla en tierra",
    "El primer brote",
    "El tallo se afirma",
    "Hojas que beben luz",
    "Fruto que permanece"
  ],
  "verseRef": "Isaías 55:11",
  "verseText": "Así será mi palabra que sale de mi boca; no volverá a mí vacía, sino que hará lo que yo quiero, y será prosperada en aquello para que la envié.",
  "promise": "En unos minutos vas a sembrar tu Semilla, {name}: apartarás un tiempo y un lugar para Dios, aprenderás a estudiar su Palabra en profundidad, descubrirás la doble bendición de compartirla, probarás cuán dulce es, y elegirás un fruto que permanezca toda la semana.",
  "ui": {
    "start": "Empezar a sembrar mi semilla",
    "emptyKit": "Tu semilla",
    "building": "Cada elección hace crecer una parte",
    "buildingHint": "Toca la pieza que brilla. Verás la semilla brotar hasta dar fruto.",
    "lastPiece": "Falta una pieza",
    "patternLabel": "Tu patrón al estudiar la Palabra",
    "doneTitle": "Tu semilla ya dio fruto",
    "doneSub": "La sembraste tú, con Dios. Ábrela, guárdala, compártela.",
    "open": "Abrir mi semilla",
    "back": "Volver a mi semilla"
  },
  "slots": [
    {
      "id": "tiempo",
      "n": 1,
      "label": "Mi primera Biblia",
      "teaser": "Lo que vale para mí la Palabra…",
      "icon": "book"
    },
    {
      "id": "lugar",
      "n": 2,
      "label": "Mi tiempo apartado",
      "teaser": "Cuándo me encuentro con Dios…",
      "icon": "sunrise"
    },
    {
      "id": "rincon",
      "n": 3,
      "label": "Mi lugar tranquilo",
      "teaser": "Dónde me siento a sus pies…",
      "icon": "rock"
    },
    {
      "id": "profundo",
      "n": 4,
      "label": "Mi modo de estudiar",
      "teaser": "Cómo cavo hondo en la Palabra…",
      "icon": "seed"
    },
    {
      "id": "compartir",
      "n": 5,
      "label": "La doble bendición",
      "teaser": "Con quién comparto lo aprendido…",
      "icon": "hand"
    },
    {
      "id": "dulce",
      "n": 6,
      "label": "Cuán dulce es",
      "teaser": "Lo que mi alma viene a beber…",
      "icon": "leaf"
    },
    {
      "id": "minero",
      "n": 7,
      "label": "Mi actitud ante la Palabra",
      "teaser": "Cómo me acerco al Libro…",
      "icon": "heart"
    },
    {
      "id": "fruto",
      "n": 8,
      "label": "Mi fruto de la semana",
      "teaser": "Un paso concreto · a quién animo…",
      "icon": "footstep"
    }
  ],
  "stations": [
    {
      "id": "tiempo",
      "day": "Sábado · El árbol de Lutero",
      "tag": "Pieza 1 · Mi primera Biblia",
      "title": "¿La tienes como tesoro, o por sentado?",
      "story": "Martín Lutero leía la Biblia entera dos veces al año. «Si fuera un árbol imponente y sus palabras pequeñas ramas, las habría tocado todas, ansioso por saber qué guardaban». Piensa en tu primera Biblia. ¿Sigue siendo tesoro, o la das por sentada en un estante?",
      "cue": "Detente aquí, {name}, y sostén de nuevo esa Palabra.",
      "module": {
        "type": "choiceInsight",
        "privacy": true,
        "prompt": "¿Qué lugar ocupa hoy la Biblia en tu vida?",
        "hint": "Elige lo más sincero ahora mismo",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "tu punto de partida",
        "closing": "Cierres donde cierres, todos podemos crecer en nuestra relación con Dios mediante su Palabra. «Más noble que los de Tesalónica… escudriñaban cada día las Escrituras» (Hech. 17:11).",
        "options": [
          {
            "id": "tesoro",
            "label": "Es uno de mis mayores tesoros",
            "insight": "Como Lutero, anhelas tocar cada rama. Sigue cavando: «siempre hay algo más que espigar».",
            "tags": [
              "theme:word",
              "posture:seeking",
              "tone:resolute"
            ]
          },
          {
            "id": "estante",
            "label": "Suele quedarse cerrada en el estante",
            "insight": "No te condenes; comienza de nuevo hoy. La Palabra viva está al alcance de tu mano, esperándote.",
            "tags": [
              "react:apathy",
              "theme:word",
              "posture:avoidant"
            ]
          },
          {
            "id": "lucho",
            "label": "Me cuesta ser constante",
            "insight": "La constancia es decisión diaria, no emoción. Un nuevo hábito puede tardar 21 días; empieza hoy mismo.",
            "tags": [
              "react:self-blame",
              "theme:faith",
              "posture:seeking"
            ]
          },
          {
            "id": "deprisa",
            "label": "La leo deprisa, para la conciencia",
            "insight": "«Poco provecho da una lectura precipitada» (E. White). Lo que tranquiliza la conciencia rara vez alcanza el corazón.",
            "tags": [
              "react:control",
              "theme:word",
              "tone:raw"
            ]
          },
          {
            "id": "perdido",
            "label": "No sé por dónde empezar",
            "insight": "Empieza por un libro breve —Marcos, Jonás, Filipenses, 1 Juan— y avanza poco a poco. Hoy es buen día para abrirla.",
            "tags": [
              "react:withdraw",
              "theme:word",
              "posture:seeking"
            ]
          },
          {
            "id": "hambriento",
            "label": "Tengo hambre de conocerlo más",
            "insight": "Esa hambre es del Espíritu. «Buscaréis a Jehová y lo hallaréis, si lo buscáis de todo vuestro corazón» (Jer. 29:13).",
            "tags": [
              "theme:relationship",
              "posture:seeking",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "lugar",
      "day": "Domingo · Tiempo",
      "tag": "Pieza 2 · Mi tiempo apartado",
      "title": "Quince minutos a las prisas, o un momento rendido",
      "story": "¿Alguna vez pusiste el despertador más temprano para leer la Biblia, luego miraste el reloj —«¡solo quince minutos!»— y la hojeaste a la carrera? Dios no nos dio su Palabra para tranquilizar la conciencia, sino para que lo conozcamos. Consagrarle tiempo tiene un valor incalculable.",
      "cue": "{name}, deja que la prisa se calme y consagra este momento.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "tu tiempo con Dios",
        "stepPrompt": "El tiempo que apartaré para estar con Dios",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Despertarme antes de lo habitual",
          "Diez minutos firmes cada mañana",
          "Un momento fijo a media tarde",
          "Lo primero, antes de tocar el teléfono",
          "Un rato a solas cada noche"
        ],
        "stepPlaceholder": "mi momento con Dios…",
        "stepExtraKey": "tiempoTexto",
        "personPrompt": "Lo que hoy le rindo para acercarme",
        "personHint": "«Estad quietos, y conoced que yo soy Dios» (Sal. 46:10)",
        "personPlaceholder": "un área que aún no le he rendido…",
        "personExtraKey": "rendir"
      }
    },
    {
      "id": "rincon",
      "day": "Lunes · Un lugar",
      "tag": "Pieza 3 · Mi lugar tranquilo",
      "title": "Como Jesús, de madrugada y a solas",
      "story": "«Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a un lugar desierto, y allí oraba» (Mar. 1:35). Imagina a Jesús junto al mar de Galilea, en comunión con su Padre antes de que el mundo despertara. Si él lo necesitaba para empezar el día, ¡cuánto más nosotros!",
      "cue": "Ven aquí, {name}, a tu propio lugar desierto.",
      "module": {
        "type": "pickReveal",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "tu lugar de encuentro",
        "prompt": "Elige el lugar tranquilo donde te encontrarás con Dios",
        "hint": "Toca cada uno · quédate con el que harás tuyo",
        "chooseLabel": "Este será mi lugar",
        "closing": "Si vuelves cada día al mismo lugar, será más probable que regreses. No te desanimes si una emergencia te lo impide: empieza de nuevo hoy mismo.",
        "allowCustom": {
          "label": "Nombrar el mío",
          "placeholder": "mi lugar de encuentro será…",
          "extraKey": "rinconPropio"
        },
        "items": [
          {
            "t": "Un rincón en casa, antes que todos despierten",
            "ref": "Marcos 1:35",
            "meaning": "Como Jesús, buscas la quietud que el día aún no ha invadido."
          },
          {
            "t": "A los pies de Jesús, como María",
            "ref": "Lucas 10:39",
            "meaning": "María escogió la buena parte: sentarse a oír su Palabra antes que afanarse."
          },
          {
            "t": "Al aire libre, en la naturaleza",
            "ref": "1 Crónicas 16:11",
            "meaning": "«Buscad a Jehová y su poder; buscad su rostro continuamente»."
          },
          {
            "t": "Donde pueda estar a solas y en silencio",
            "ref": "Salmo 27:8",
            "meaning": "Él dice: «Buscad mi rostro»; que tu corazón responda: «Tu rostro buscaré, Jehová»."
          }
        ]
      }
    },
    {
      "id": "profundo",
      "day": "Martes · El estudio profundo",
      "tag": "Pieza 4 · Mi modo de estudiar",
      "title": "Leer es bueno; escribir lo cambia todo",
      "story": "No hace falta ser erudito para estudiar la Biblia en profundidad. Ora primero —«nunca se debería estudiar la Biblia sin oración» (E. White)—, escribe lo que lees para desacelerar tu mente, y compártelo. Escribir transforma la mera lectura en verdadero estudio.",
      "cue": "{name}, baja el ritmo y cava más hondo aquí.",
      "module": {
        "type": "skillThenCommit",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "tu modo de estudiar",
        "skill": {
          "prompt": "Entrena el oído: ¿mera lectura… o estudio que echa raíz?",
          "hint": "Lo mismo se puede hojear o escudriñar.",
          "badge": "Estás aprendiendo a estudiar la Palabra en profundidad",
          "cats": [
            "Estudio profundo",
            "Lectura ligera"
          ],
          "rounds": [
            {
              "t": "«Leo un capítulo a la carrera para cumplir.»",
              "a": 1,
              "fb": "Lectura ligera: la prisa pasa por encima de la belleza del texto."
            },
            {
              "t": "«Antes de abrirla, pido al Espíritu que me guíe.»",
              "a": 0,
              "fb": "Estudio profundo: invitas a tu Guía y el Enemigo huye."
            },
            {
              "t": "«Escribo el versículo y lo que me dice.»",
              "a": 0,
              "fb": "Estudio profundo: escribir ordena las ideas y las vuelve acción."
            },
            {
              "t": "«Subrayo nada; sigo de largo sin meditar.»",
              "a": 1,
              "fb": "Lectura ligera: sin pausa, no hay observación ni aplicación."
            },
            {
              "t": "«Elijo un libro breve y avanzo poco a poco.»",
              "a": 0,
              "fb": "Estudio profundo: paso a paso se discierne nueva luz y belleza."
            },
            {
              "t": "«Termino la Biblia entera de una vez, sin detenerme.»",
              "a": 1,
              "fb": "Lectura ligera: puedes leerla toda sin captar su sentido oculto."
            }
          ],
          "summary": "Escribir marca la diferencia entre leer y estudiar. «Lámpara es a mis pies tu palabra, y lumbrera a mi camino» (Sal. 119:105) — alúmbrate cavando despacio."
        },
        "commit": {
          "prompt": "¿Qué método harás tuyo esta semana para estudiar en profundidad?",
          "hint": "Ora · elige un pasaje · escribe · subraya · ora otra vez · comparte.",
          "placeholder": "escribir lo que aprendo, estudiar un libro breve…",
          "extraKey": "metodo",
          "options": [
            "Orar antes de abrir la Biblia",
            "Escribir el pasaje y lo que me dice",
            "Estudiar un libro breve, poco a poco",
            "Subrayar las ideas clave y meditarlas",
            "Leerla en voz alta como oración"
          ]
        }
      }
    },
    {
      "id": "compartir",
      "day": "Miércoles · Una bendición doble",
      "tag": "Pieza 5 · La doble bendición",
      "title": "Lo que estudias no es solo para ti",
      "story": "Hay mil maneras de estudiar la Biblia, y una multiplica la bendición: compartirla. Cuando explicamos lo aprendido, lo consolidamos y aprendemos más hondo, mientras animamos al otro. «Jehová me dio lengua de sabios, para saber hablar palabras al cansado» (Isa. 50:4).",
      "cue": "{name}, piensa en quién espera al otro lado de lo que aprendiste.",
      "module": {
        "type": "perspectiveFlip",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "lo que recibes al dar",
        "prompt": "Toca cada carta para ver la doble bendición",
        "hint": "Lo que crees que pierdes al dar, en realidad lo ganas",
        "pairs": [
          {
            "see": "Crees que compartir te quita tiempo.",
            "sees": "Al explicarlo, lo retienes con mayor profundidad."
          },
          {
            "see": "Piensas que aún no sabes lo bastante.",
            "sees": "«Lengua de sabios» se da al que habla al cansado (Isa. 50:4)."
          },
          {
            "see": "Sientes que es solo un mensaje para ti.",
            "sees": "Lo que estudias hoy es también para alguien más."
          },
          {
            "see": "Temes quedarte sin nada que decir.",
            "sees": "La conversación espiritual enriquece a ambas partes."
          }
        ],
        "chooseLabel": "Esta verdad me anima a compartir",
        "teach": "Nuestra vida espiritual es un maratón: corre con constancia, los ojos en la meta (Fil. 3:14). Conocer a Dios cada día es la vida eterna (Juan 17:3).",
        "commit": {
          "prompt": "Escribe lo que aprendiste esta semana para compartirlo con alguien",
          "hint": "Compartir consolida tu fe y enriquece la del otro",
          "placeholder": "Esta semana entendí que… y quiero contártelo porque…",
          "extraKey": "loCompartido",
          "shareable": true
        }
      }
    },
    {
      "id": "dulce",
      "day": "Jueves · ¡Cuán dulce!",
      "tag": "Pieza 6 · Cuán dulce es",
      "title": "Más dulce que la miel",
      "story": "«¡Cuán dulces son a mi paladar tus palabras! Más que la miel a mi boca» (Sal. 119:103). A diferencia de un postre, la dulzura de la Palabra sana el espíritu y transforma el carácter. Si has estado distante, abre con reverencia su Palabra y bebe del agua viva, la única que sacia.",
      "cue": "Prueba y ve, {name}, cuán dulce es su Palabra.",
      "module": {
        "type": "choiceInsight",
        "privacy": false,
        "prompt": "Al acudir a la Palabra, ¿qué viene a buscar tu alma hoy?",
        "hint": "Elige lo que más necesitas recibir",
        "saveLabel": "Guardar en mi semilla",
        "seedSub": "tu sed de hoy",
        "closing": "«A todos los sedientos: Venid a las aguas… venid, comprad sin dinero» (Isa. 55:1). Busca al Señor mientras puede ser hallado (Isa. 55:6).",
        "options": [
          {
            "id": "sanidad",
            "label": "Sanidad para un espíritu cansado",
            "insight": "La dulzura de la Palabra sana donde el mundo solo distrae. Bebe del agua viva, la única que satisface.",
            "tags": [
              "react:withdraw",
              "theme:hope",
              "tone:tender"
            ]
          },
          {
            "id": "inteligencia",
            "label": "Entendimiento · sabiduría",
            "insight": "«De tus mandamientos he adquirido inteligencia» (Sal. 119:104). Sus preceptos enseñan a vivir, no solo a saber.",
            "tags": [
              "theme:word",
              "posture:seeking",
              "tone:resolute"
            ]
          },
          {
            "id": "cercania",
            "label": "Sentirlo cerca otra vez",
            "insight": "Si has estado distante, abre con reverencia su Palabra: «Buscad a Jehová mientras puede ser hallado» (Isa. 55:6).",
            "tags": [
              "react:cry-out",
              "theme:relationship",
              "posture:clinging"
            ]
          },
          {
            "id": "transformacion",
            "label": "Que cambie mi carácter",
            "insight": "Su Palabra desafía a crecer en Cristo cuando la recibimos con actitud sumisa y dispuestos a obedecer.",
            "tags": [
              "theme:humility",
              "posture:surrendering",
              "tone:resolute"
            ]
          },
          {
            "id": "promesa",
            "label": "Una promesa a la que aferrarme",
            "insight": "«Mi palabra no volverá a mí vacía» (Isa. 55:11). Lo que él dice, lo cumple; aférrate a ella.",
            "tags": [
              "theme:faith",
              "theme:hope",
              "posture:clinging"
            ]
          },
          {
            "id": "deleite",
            "label": "Solo deleitarme en él",
            "insight": "«Deléitate en Jehová, y él concederá las peticiones de tu corazón» (Sal. 37:4). El gozo precede a la petición.",
            "tags": [
              "theme:relationship",
              "posture:seeking",
              "tone:tender"
            ]
          }
        ]
      }
    },
    {
      "id": "minero",
      "day": "El minero de gemas",
      "tag": "Pieza 7 · Mi actitud ante la Palabra",
      "title": "¿Ajustas la Biblia a ti, o tú a ella?",
      "story": "Debemos escudriñar la Biblia como un minero busca gemas preciosas. La pregunta decisiva es la actitud: ¿clavamos primero nuestras estacas doctrinales y forzamos la Escritura a calzar con ellas, o tomamos nuestras ideas de la Escritura y medimos todo por la Palabra de verdad?",
      "cue": "{name}, deja que esto te alcance: ¿quién se ajusta a quién?",
      "module": {
        "type": "anchorChain",
        "saveLabel": "Sembrar mi semilla · guardar",
        "seedSub": "tu actitud humilde",
        "chain": [
          {
            "word": "Vengo con sed",
            "line": "Como el sediento de Isaías 55: sin mérito, pero dispuesto."
          },
          {
            "word": "Vengo sin estacas",
            "line": "No le impongo mis opiniones; dejo que la Escritura hable."
          },
          {
            "word": "Escudriño como minero",
            "line": "Siempre hay otra gema que espigar, por más que haya leído."
          },
          {
            "word": "Recibo y obedezco",
            "line": "Con actitud sumisa y dispuesta a poner en práctica."
          }
        ],
        "climax": "Y conocer a Dios cada día —en esto consiste la vida eterna— echa raíz hondas en tu alma.",
        "prompt": "¿Con qué actitud te acercarás a la Biblia esta semana?",
        "hint": "«Escudriñad las Escrituras… ellas son las que dan testimonio de mí» (Juan 5:39)",
        "options": [
          "Humilde, dejando que la Palabra me corrija",
          "Sediento, como quien viene a las aguas",
          "Buscador, como minero de gemas preciosas",
          "Dispuesto a obedecer lo que aprenda"
        ],
        "allowCustom": {
          "placeholder": "mi actitud será…",
          "extraKey": "actitudPropia"
        }
      }
    },
    {
      "id": "fruto",
      "day": "Viernes · Para estudiar y meditar",
      "tag": "Pieza 8 · Mi fruto de la semana",
      "title": "El que permanece en mí lleva mucho fruto",
      "story": "«Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto» (Juan 15:5). El estudio personal está en el centro de una relación viva con Dios. Como cualquier amistad, se mantiene viva permaneciendo en él. Y su palabra no vuelve vacía.",
      "cue": "Permanece en él, {name}, y mira el fruto que dará.",
      "module": {
        "type": "commitDuo",
        "saveLabel": "Cerrar mi semilla",
        "seedSub": "tu fruto",
        "stepPrompt": "Mi paso concreto de esta semana",
        "stepHint": "Toca una idea o escribe la tuya",
        "stepOptions": [
          "Estudiar la Palabra cada día sin prisa",
          "Escribir lo que Dios me dice al leer",
          "Volver al mismo lugar a su encuentro",
          "Acercarme con humildad, sin mis estacas",
          "Permanecer en la vid, día a día"
        ],
        "stepPlaceholder": "mi paso concreto…",
        "stepExtraKey": "pasoTexto",
        "personPrompt": "Alguien con quien compartiré lo aprendido",
        "personHint": "La doble bendición: lo retienes mejor y lo animas a él",
        "personPlaceholder": "un nombre…",
        "personExtraKey": "compartirCon"
      }
    }
  ],
  "encourage": [
    "«Lámpara es a mis pies tu palabra, y lumbrera a mi camino.» — Salmo 119:105",
    "«Mi palabra que sale de mi boca no volverá a mí vacía.» — Isaías 55:11",
    "«¡Cuán dulces son a mi paladar tus palabras! Más que la miel a mi boca.» — Salmo 119:103",
    "«A todos los sedientos: Venid a las aguas.» — Isaías 55:1",
    "«Buscad a Jehová mientras puede ser hallado.» — Isaías 55:6",
    "«Buscad a Jehová y su poder; buscad su rostro continuamente.» — 1 Crónicas 16:11",
    "«El que permanece en mí, y yo en él, éste lleva mucho fruto.» — Juan 15:5",
    "«Me buscaréis y me hallaréis, porque me buscaréis de todo vuestro corazón.» — Jeremías 29:13"
  ],
  "discussion": [
    "¿Con qué actitud sueles acercarte a la Biblia? ¿Hay algo que debas modificar? ¿Por qué es tan crucial una actitud de humildad y consagración a la Palabra?",
    "¿Hay alguna opinión preconcebida que debas abandonar para permitir que las Escrituras hablen por sí mismas? Si es así, ora ya mismo acerca de ello.",
    "¿Cómo puede el deseo de hallar algo novedoso en la Biblia —sobre todo con fines egoístas— convertirse en piedra de tropiezo en la relación con Dios?",
    "¿Cuánto tiempo dedicaste la semana pasada a la oración y a la lectura de la Biblia? ¿Qué te dice tu respuesta sobre los cambios que podrías hacer en tus prioridades?",
    "Escribir marca la diferencia entre leer y estudiar. ¿Qué hábito concreto de estudio quieres comenzar o recuperar esta semana?",
    "¿Con quién podrías compartir lo que estás estudiando, para recibir la doble bendición?",
    "¿De qué manera concreta puedes «buscar al Señor mientras pueda ser hallado» (Isa. 55:6) en los próximos días?"
  ],
  "facilitator": [
    {
      "stationId": "tiempo",
      "apertura": "Piensa en tu primera Biblia. ¿Sigue siendo un tesoro o la das por sentada?",
      "seguimiento": "¿Qué valor real ocupa hoy la Palabra de Dios en tu rutina diaria?",
      "ilustracion": "Lutero tocaba cada rama del árbol de la Biblia, ansioso por saber qué guardaba cada una.",
      "transicion": "Si la Palabra es tan valiosa, veamos el primer obstáculo: el tiempo.",
      "actividad": "Que cada uno recuerde, si desea, cuándo recibió su primera Biblia y qué significó.",
      "cierre": "Señor, devuélvenos el asombro ante tu Palabra viva."
    },
    {
      "stationId": "lugar",
      "apertura": "¿Alguna vez leíste la Biblia a la carrera, solo para tranquilizar la conciencia?",
      "seguimiento": "¿Qué tiempo concreto puedes consagrar a estar con Dios esta semana?",
      "ilustracion": "Quince minutos a las prisas calman la conciencia, pero no el corazón.",
      "transicion": "Del cuándo pasemos al dónde: el lugar donde Jesús se encontraba con su Padre.",
      "actividad": "Lean juntos el Salmo 46:10 y nombren un área que aún no han rendido a Dios.",
      "cierre": "Enséñanos, Señor, a apartar tiempo aunque no sintamos deseos."
    },
    {
      "stationId": "rincon",
      "apertura": "¿Qué nos enseña Marcos 1:35 sobre las prioridades de Jesús?",
      "seguimiento": "¿Tienes un lugar tranquilo donde encontrarte cada día con Dios?",
      "ilustracion": "Jesús, junto al mar, en comunión con su Padre antes de que el mundo despertara.",
      "transicion": "Con un lugar fijo, aprendamos a estudiar allí en profundidad.",
      "actividad": "Que cada uno describa o elija el lugar donde se sentará a los pies de Jesús.",
      "cierre": "Danos, Señor, la constancia de volver cada día a tu encuentro."
    },
    {
      "stationId": "profundo",
      "apertura": "¿Qué diferencia hay entre leer la Biblia y estudiarla de verdad?",
      "seguimiento": "¿Qué método de estudio quieres practicar esta semana?",
      "ilustracion": "Escribir desacelera la mente y ordena ideas dispersas hasta volverlas acción.",
      "transicion": "Lo que estudiamos a fondo no es solo para nosotros: pasemos a compartir.",
      "actividad": "Apliquen juntos los siete pasos: orar, elegir, escribir, subrayar, escribir, orar, compartir.",
      "cierre": "Espíritu Santo, sé nuestro guía cada vez que abramos la Palabra."
    },
    {
      "stationId": "compartir",
      "apertura": "¿Por qué compartir lo aprendido se llama una «doble bendición»?",
      "seguimiento": "¿Con quién podrías compartir algo que Dios te enseñó esta semana?",
      "ilustracion": "Al explicar lo aprendido lo retenemos mejor, y animamos al que escucha.",
      "transicion": "Después de dar, probemos cuán dulce es recibir su Palabra.",
      "actividad": "Lean Isaías 50:4 y comenten cómo hablar «palabras al cansado».",
      "cierre": "Dame, Señor, lengua de sabios para hablar al cansado."
    },
    {
      "stationId": "dulce",
      "apertura": "¿Qué significa que la Palabra sea «más dulce que la miel»?",
      "seguimiento": "¿Qué viene a buscar tu alma cuando abres la Biblia?",
      "ilustracion": "A diferencia de un postre, la dulzura de la Palabra sana y transforma el carácter.",
      "transicion": "De la dulzura pasamos a la actitud con que nos acercamos al Libro.",
      "actividad": "Lean Isaías 55:1-13 y respondan: ¿qué da Dios, qué invita, qué desafía, qué promete?",
      "cierre": "Que tu Palabra sea dulce a nuestro paladar y sane nuestra alma."
    },
    {
      "stationId": "minero",
      "apertura": "¿Ajustamos la Biblia a nuestras opiniones, o nuestras ideas a la Biblia?",
      "seguimiento": "¿Qué opinión preconcebida deberías soltar para que la Escritura hable?",
      "ilustracion": "Clavar primero las estacas doctrinales fuerza el texto; el minero, en cambio, escudriña.",
      "transicion": "Con actitud humilde, busquemos el fruto que permanece.",
      "actividad": "Comenten Juan 5:39 y nombren una actitud a corregir al estudiar.",
      "cierre": "Líbranos, Señor, de medirte por nuestras opiniones; que te midamos por tu verdad."
    },
    {
      "stationId": "fruto",
      "apertura": "¿Qué significa permanecer en la vid para llevar mucho fruto (Juan 15:5)?",
      "seguimiento": "¿Cuál es el paso concreto que darás esta semana para permanecer en él?",
      "ilustracion": "El pámpano no se esfuerza por dar fruto: permanece unido, y el fruto llega.",
      "transicion": "Reunamos todo en un paso y una persona a quien animar.",
      "actividad": "Reciten Isaías 55:11 y compartan un paso concreto para esta semana.",
      "cierre": "Haznos permanecer en ti, y que tu palabra dé en nosotros mucho fruto."
    }
  ],
  "patternTemplate": "{name}, tu semilla ya echa raíces: apartas {slot:lugar|lower} y un lugar tranquilo para Dios, y estás aprendiendo a estudiar su Palabra {slot:profundo|lower}. Lo que aprendes no es solo para ti — es una doble bendición. La Palabra que cae en tierra buena no vuelve vacía: está creciendo en ti hasta dar fruto.",
  "outOracion": "Señor, gracias por tu Palabra viva. Confieso que muchas veces la he tratado como {slot:tiempo|lower}, pero hoy quiero sembrarla en buena tierra. Te aparto {slot:lugar|lower} y vengo a mi lugar tranquilo a sentarme a tus pies. Enséñame a estudiarla así: {slot:profundo|lower}. Que mi alma reciba lo que vino a buscar — {slot:dulce|lower} — y dame una actitud {slot:minero|lower}. Hazme permanecer en la vid para llevar mucho fruto. Que tu palabra no vuelva a ti vacía en mi vida. En el nombre de Jesús, amén.",
  "outAliento": "{name}, no te desanimes si has leído a la carrera o la dejaste cerrada. Empieza de nuevo hoy: aparta {slot:lugar|lower}, acércate a la Palabra con una actitud {slot:minero|lower}, y déjala caer en buena tierra. «{verse}» ({verseRef}). Lo que él dice, lo cumple.",
  "outAccion24": "En las próximas 24 horas voy a {slot:fruto|lower}, y voy a compartir lo que aprendí con alguien que necesita oírlo.",
  "outPregunta": "Esta semana descubrí que mi alma viene a la Palabra buscando {slot:dulce|lower}, y estoy aprendiendo a estudiarla {slot:profundo|lower}. ¿Con qué actitud te acercas tú a la Biblia, y qué fruto está dando en tu vida?",
  "outTarjeta": "Mi semilla de esta semana: me encuentro con Dios {slot:lugar|lower}, estudio su Palabra {slot:profundo|lower}, y me acerco con una actitud {slot:minero|lower}.\nVersículo: «{verse}» ({verseRef})."
}
);
