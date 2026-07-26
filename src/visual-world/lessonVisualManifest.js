export const LESSON_VISUALS = Object.freeze({
  l1: {
    focal: "50% 48%",
    pieceSet: "papyrus",
    materialVerb: "unseal",
    camera: { minute: 3.52, study: 3.12, deep: 2.72 },
    pieceOrder: [7, 3, 0, 5, 2, 6, 1, 4],
    description:
      "Una carta sellada se abre sobre una ruta tallada en piedra.",
    descriptionEn:
      "A sealed letter opens over a route carved into stone.",
  },
  l2: {
    focal: "50% 50%",
    pieceSet: "ashlar",
    materialVerb: "excavate",
    progression: "remove",
    camera: { minute: 3.48, study: 3.08, deep: 2.68 },
    pieceOrder: [0, 2, 6, 7, 3, 5, 1, 4],
    description:
      "Una cruz de madera áspera emerge de un plano de piedra fracturado.",
    descriptionEn:
      "A rough wooden cross emerges from a fractured plane of stone.",
  },
  l3: {
    focal: "50% 50%",
    pieceSet: "tessera",
    materialVerb: "stabilize",
    camera: { minute: 3.5, study: 3.1, deep: 2.7 },
    pieceOrder: [6, 7, 3, 5, 0, 2, 1, 4],
    description:
      "Dos manos de teselas sostienen juntas una vasija de barro.",
    descriptionEn:
      "Two mosaic hands hold a clay vessel together.",
  },
  l4: {
    focal: "50% 48%",
    pieceSet: "shards",
    materialVerb: "assemble",
    camera: { minute: 3.5, study: 3.08, deep: 2.68 },
    pieceOrder: [6, 2, 3, 7, 0, 5, 1, 4],
    description:
      "Una vasija se forma con fragmentos oscuros alrededor de un núcleo de barro encendido.",
    descriptionEn:
      "A vessel takes shape from dark fragments around a glowing clay core.",
  },
  l5: {
    focal: "50% 51%",
    pieceSet: "ashlar",
    materialVerb: "gather",
    camera: { minute: 3.48, study: 3.08, deep: 2.7 },
    pieceOrder: [0, 2, 6, 7, 1, 3, 5, 4],
    description:
      "Una mesa compartida deja aparecer una cruz en su espacio central.",
    descriptionEn:
      "A shared table reveals a cross in its central space.",
  },
  l6: {
    focal: "50% 50%",
    pieceSet: "tessera",
    materialVerb: "interlock",
    camera: { minute: 3.54, study: 3.12, deep: 2.74 },
    pieceOrder: [7, 6, 5, 3, 2, 0, 1, 4],
    description:
      "Piezas desiguales forman un solo cuerpo sostenido por una mano.",
    descriptionEn:
      "Uneven pieces form one body supported by a hand.",
  },
  l7: {
    focal: "50% 50%",
    pieceSet: "shards",
    materialVerb: "burnish",
    camera: { minute: 3.5, study: 3.08, deep: 2.66 },
    pieceOrder: [0, 3, 6, 2, 5, 7, 1, 4],
    description:
      "Un retrato fragmentado se vuelve espejo entre carbón y piedra clara.",
    descriptionEn:
      "A fragmented portrait becomes a mirror between charcoal and pale stone.",
  },
  l8: {
    focal: "50% 49%",
    pieceSet: "ashlar",
    materialVerb: "open",
    progression: "remove",
    camera: { minute: 3.6, study: 3.16, deep: 2.72 },
    pieceOrder: [6, 3, 0, 7, 5, 2, 1, 4],
    description:
      "Una puerta corintia abierta recibe la primera luz sobre una tumba vacía.",
    descriptionEn:
      "An open Corinthian doorway receives the first light over an empty tomb.",
  },
  l9: {
    focal: "50% 50%",
    pieceSet: "papyrus",
    materialVerb: "mend",
    camera: { minute: 3.52, study: 3.12, deep: 2.72 },
    pieceOrder: [0, 2, 1, 6, 7, 3, 5, 4],
    description:
      "Una carta de papiro conserva huellas de lágrimas y un sello de barro.",
    descriptionEn:
      "A papyrus letter holds traces of tears and a clay seal.",
  },
  l10: {
    focal: "50% 50%",
    pieceSet: "shards",
    materialVerb: "settle",
    camera: { minute: 3.48, study: 3.08, deep: 2.68 },
    pieceOrder: [6, 7, 3, 5, 0, 2, 1, 4],
    description:
      "Una vasija entera deja ver su tesoro por una fractura profunda.",
    descriptionEn:
      "A whole vessel reveals its treasure through a deep fracture.",
  },
  l11: {
    focal: "50% 50%",
    pieceSet: "papyrus",
    materialVerb: "cultivate",
    camera: { minute: 3.58, study: 3.16, deep: 2.74 },
    pieceOrder: [6, 7, 3, 5, 0, 2, 1, 4],
    description:
      "Una mano esparce semillas sobre surcos donde empiezan a brotar plantas.",
    descriptionEn:
      "A hand scatters seed over furrows where plants begin to sprout.",
  },
  l12: {
    focal: "50% 51%",
    pieceSet: "ashlar",
    materialVerb: "dismantle",
    progression: "remove",
    camera: { minute: 3.56, study: 3.14, deep: 2.72 },
    pieceOrder: [2, 0, 5, 3, 7, 6, 1, 4],
    description:
      "Una fortaleza de piedra se desmonta hasta mostrar roca firme y una entrada.",
    descriptionEn:
      "A stone fortress is dismantled to reveal bedrock and an entrance.",
  },
  l13: {
    focal: "50% 50%",
    pieceSet: "tessera",
    materialVerb: "converge",
    camera: { minute: 3.62, study: 3.18, deep: 2.74 },
    pieceOrder: [0, 2, 6, 7, 3, 5, 1, 4],
    description:
      "Trece caminos y trece figuras convergen alrededor de un centro compartido.",
    descriptionEn:
      "Thirteen paths and thirteen figures converge around a shared center.",
  },
});

export function visualForLesson(lessonId) {
  return LESSON_VISUALS[lessonId] || LESSON_VISUALS.l4;
}

export function isRemovalLesson(lessonId) {
  return visualForLesson(lessonId).progression === "remove";
}

const MATERIAL_VERB_FAMILIES = Object.freeze({
  unseal: "open",
  excavate: "remove",
  stabilize: "join",
  assemble: "place",
  gather: "join",
  interlock: "join",
  burnish: "polish",
  open: "open",
  mend: "trace",
  settle: "weight",
  cultivate: "trace",
  dismantle: "remove",
  converge: "join",
});

export function materialFamilyForVerb(materialVerb) {
  return MATERIAL_VERB_FAMILIES[materialVerb] || "place";
}
