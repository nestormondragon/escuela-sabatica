const PIECES_PER_ARTIFACT = 8;
const DEFAULT_PIECE_SET = "shards";

function definePieceSet(pieces) {
  if (pieces.length !== PIECES_PER_ARTIFACT) {
    throw new Error(
      `Artifact piece sets must contain ${PIECES_PER_ARTIFACT} regions`
    );
  }

  const ids = new Set();
  return Object.freeze(
    pieces.map((piece) => {
      if (ids.has(piece.id)) {
        throw new Error(`Duplicate artifact region id: ${piece.id}`);
      }
      ids.add(piece.id);

      const points = piece.points.map(([x, y]) => {
        if (
          !Number.isFinite(x) ||
          !Number.isFinite(y) ||
          x < 0 ||
          x > 1 ||
          y < 0 ||
          y > 1
        ) {
          throw new Error(`Artifact region ${piece.id} leaves the unit plane`);
        }
        return Object.freeze([x, y]);
      });

      return Object.freeze({
        ...piece,
        points: Object.freeze(points),
        entry: Object.freeze(piece.entry),
      });
    })
  );
}

const SHARDS = definePieceSet([
  {
    id: "shard-northwest",
    points: [[0, 0], [0.38, 0], [0.35, 0.27], [0, 0.32]],
    entry: [-0.82, 0.54, 0.42, -0.2],
  },
  {
    id: "shard-crown",
    points: [[0.38, 0], [0.72, 0], [0.69, 0.31], [0.35, 0.27]],
    entry: [0.08, 0.86, -0.34, 0.22],
  },
  {
    id: "shard-northeast",
    points: [[0.72, 0], [1, 0], [1, 0.36], [0.69, 0.31]],
    entry: [0.84, 0.49, 0.36, -0.18],
  },
  {
    id: "shard-west",
    points: [[0, 0.32], [0.35, 0.27], [0.39, 0.6], [0, 0.64]],
    entry: [-0.94, 0.02, -0.44, 0.12],
  },
  {
    id: "shard-heart",
    points: [[0.35, 0.27], [0.69, 0.31], [0.66, 0.64], [0.39, 0.6]],
    entry: [0.04, -0.08, 0.24, 0.26],
  },
  {
    id: "shard-east",
    points: [[0.69, 0.31], [1, 0.36], [1, 0.69], [0.66, 0.64]],
    entry: [0.96, -0.08, 0.42, 0.18],
  },
  {
    id: "shard-southwest",
    points: [[0, 0.64], [0.39, 0.6], [0.51, 1], [0, 1]],
    entry: [-0.68, -0.74, 0.38, -0.22],
  },
  {
    id: "shard-southeast",
    points: [[0.39, 0.6], [0.66, 0.64], [1, 0.69], [1, 1], [0.51, 1]],
    entry: [0.72, -0.75, -0.34, 0.2],
  },
]);

const ASHLAR = definePieceSet([
  {
    id: "ashlar-upper-left",
    points: [[0, 0], [0.31, 0], [0.32, 0.3], [0, 0.32]],
    entry: [-0.88, 0.56, -0.12, -0.12],
  },
  {
    id: "ashlar-upper-center",
    points: [[0.31, 0], [0.68, 0], [0.67, 0.32], [0.32, 0.3]],
    entry: [0.02, 0.9, 0.08, 0.14],
  },
  {
    id: "ashlar-upper-right",
    points: [[0.68, 0], [1, 0], [1, 0.3], [0.67, 0.32]],
    entry: [0.88, 0.52, 0.14, -0.12],
  },
  {
    id: "ashlar-middle-left",
    points: [[0, 0.32], [0.32, 0.3], [0.5, 0.310286], [0.51, 0.67], [0, 0.65]],
    entry: [-0.96, 0.02, 0.09, 0.1],
  },
  {
    id: "ashlar-middle-right",
    points: [[0.5, 0.310286], [0.67, 0.32], [1, 0.3], [1, 0.66], [0.68, 0.65], [0.51, 0.67]],
    entry: [0.98, -0.02, -0.08, -0.1],
  },
  {
    id: "ashlar-lower-left",
    points: [[0, 0.65], [0.33, 0.662941], [0.34, 1], [0, 1]],
    entry: [-0.78, -0.7, 0.12, -0.14],
  },
  {
    id: "ashlar-lower-center",
    points: [[0.33, 0.662941], [0.51, 0.67], [0.68, 0.65], [0.71, 1], [0.34, 1]],
    entry: [0.04, -0.92, -0.08, 0.16],
  },
  {
    id: "ashlar-lower-right",
    points: [[0.68, 0.65], [1, 0.66], [1, 1], [0.71, 1]],
    entry: [0.82, -0.72, -0.14, 0.12],
  },
]);

const PAPYRUS = definePieceSet([
  {
    id: "papyrus-strip-1",
    points: [[0, 0], [0.11, 0], [0.13, 0.28], [0.12, 0.64], [0.1, 1], [0, 1]],
    entry: [-0.84, 0.42, -0.18, -0.08],
  },
  {
    id: "papyrus-strip-2",
    points: [[0.11, 0], [0.25, 0], [0.24, 0.28], [0.27, 0.64], [0.26, 1], [0.1, 1], [0.12, 0.64], [0.13, 0.28]],
    entry: [-0.62, -0.72, 0.14, 0.12],
  },
  {
    id: "papyrus-strip-3",
    points: [[0.25, 0], [0.37, 0], [0.39, 0.28], [0.38, 0.64], [0.4, 1], [0.26, 1], [0.27, 0.64], [0.24, 0.28]],
    entry: [-0.34, 0.88, -0.12, -0.14],
  },
  {
    id: "papyrus-strip-4",
    points: [[0.37, 0], [0.51, 0], [0.5, 0.28], [0.52, 0.64], [0.51, 1], [0.4, 1], [0.38, 0.64], [0.39, 0.28]],
    entry: [-0.08, -0.88, 0.1, 0.1],
  },
  {
    id: "papyrus-strip-5",
    points: [[0.51, 0], [0.64, 0], [0.66, 0.28], [0.65, 0.64], [0.63, 1], [0.51, 1], [0.52, 0.64], [0.5, 0.28]],
    entry: [0.12, 0.9, -0.09, -0.1],
  },
  {
    id: "papyrus-strip-6",
    points: [[0.64, 0], [0.76, 0], [0.75, 0.28], [0.78, 0.64], [0.77, 1], [0.63, 1], [0.65, 0.64], [0.66, 0.28]],
    entry: [0.36, -0.86, 0.12, 0.14],
  },
  {
    id: "papyrus-strip-7",
    points: [[0.76, 0], [0.89, 0], [0.88, 0.28], [0.9, 0.64], [0.89, 1], [0.77, 1], [0.78, 0.64], [0.75, 0.28]],
    entry: [0.62, 0.74, -0.14, -0.12],
  },
  {
    id: "papyrus-strip-8",
    points: [[0.89, 0], [1, 0], [1, 1], [0.89, 1], [0.9, 0.64], [0.88, 0.28]],
    entry: [0.86, -0.48, 0.18, 0.08],
  },
]);

const TESSERA = definePieceSet([
  {
    id: "tessera-northwest",
    points: [[0.51, 0.49], [0, 0], [0.53, 0]],
    entry: [-0.76, 0.72, -0.28, -0.2],
  },
  {
    id: "tessera-north",
    points: [[0.51, 0.49], [0.53, 0], [1, 0]],
    entry: [0.34, 0.9, 0.24, 0.18],
  },
  {
    id: "tessera-northeast",
    points: [[0.51, 0.49], [1, 0], [1, 0.47]],
    entry: [0.88, 0.54, -0.2, -0.16],
  },
  {
    id: "tessera-east",
    points: [[0.51, 0.49], [1, 0.47], [1, 1]],
    entry: [0.94, -0.36, 0.3, 0.2],
  },
  {
    id: "tessera-southeast",
    points: [[0.51, 0.49], [1, 1], [0.48, 1]],
    entry: [0.62, -0.84, -0.24, -0.18],
  },
  {
    id: "tessera-south",
    points: [[0.51, 0.49], [0.48, 1], [0, 1]],
    entry: [-0.28, -0.92, 0.22, 0.18],
  },
  {
    id: "tessera-southwest",
    points: [[0.51, 0.49], [0, 1], [0, 0.52]],
    entry: [-0.9, -0.52, -0.26, -0.18],
  },
  {
    id: "tessera-west",
    points: [[0.51, 0.49], [0, 0.52], [0, 0]],
    entry: [-0.92, 0.32, 0.26, 0.2],
  },
]);

export const ARTIFACT_PIECE_SETS = Object.freeze({
  shards: SHARDS,
  ashlar: ASHLAR,
  papyrus: PAPYRUS,
  tessera: TESSERA,
});

export const ARTIFACT_PIECE_SET_NAMES = Object.freeze(
  Object.keys(ARTIFACT_PIECE_SETS)
);

export function artifactPiecesForSet(pieceSet) {
  return ARTIFACT_PIECE_SETS[pieceSet] || ARTIFACT_PIECE_SETS[DEFAULT_PIECE_SET];
}

// Backwards-compatible default for code that renders a generic artifact.
export const ARTIFACT_PIECES = ARTIFACT_PIECE_SETS[DEFAULT_PIECE_SET];

export function clipPathForPiece(piece) {
  return `polygon(${piece.points
    .map(([x, y]) => `${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`)
    .join(", ")})`;
}
