export const LESSON_VISUALS = Object.freeze({
  l1: {
    focal: "50% 48%",
    description:
      "Una carta sellada se abre sobre una ruta tallada en piedra.",
  },
  l2: {
    focal: "50% 50%",
    description:
      "Una cruz de madera áspera emerge de un plano de piedra fracturado.",
  },
  l3: {
    focal: "50% 50%",
    description:
      "Dos manos de teselas sostienen juntas una vasija de barro.",
  },
  l4: {
    focal: "50% 48%",
    description:
      "Una vasija se forma con fragmentos oscuros alrededor de un núcleo de barro encendido.",
  },
  l5: {
    focal: "50% 51%",
    description:
      "Una mesa compartida deja aparecer una cruz en su espacio central.",
  },
  l6: {
    focal: "50% 50%",
    description:
      "Piezas desiguales forman un solo cuerpo sostenido por una mano.",
  },
  l7: {
    focal: "50% 50%",
    description:
      "Un retrato fragmentado se vuelve espejo entre carbón y piedra clara.",
  },
  l8: {
    focal: "50% 49%",
    description:
      "Una puerta corintia abierta recibe la primera luz sobre una tumba vacía.",
  },
  l9: {
    focal: "50% 50%",
    description:
      "Una carta de papiro conserva huellas de lágrimas y un sello de barro.",
  },
  l10: {
    focal: "50% 50%",
    description:
      "Una vasija entera deja ver su tesoro por una fractura profunda.",
  },
  l11: {
    focal: "50% 50%",
    description:
      "Una mano esparce semillas sobre surcos donde empiezan a brotar plantas.",
  },
  l12: {
    focal: "50% 51%",
    description:
      "Una fortaleza de piedra se desmonta hasta mostrar roca firme y una entrada.",
  },
  l13: {
    focal: "50% 50%",
    description:
      "Trece caminos y trece figuras convergen alrededor de un centro compartido.",
  },
});

export function visualForLesson(lessonId) {
  return LESSON_VISUALS[lessonId] || LESSON_VISUALS.l4;
}
