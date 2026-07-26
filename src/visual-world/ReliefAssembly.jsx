import React from "react";
import {
  artifactPiecesForSet,
  clipPathForPiece,
} from "./artifactPieces.js";
import { visualForLesson } from "./lessonVisualManifest.js";
import { useArtifactProgress } from "../features/artifact/ArtifactProgressContext.jsx";

export default function ReliefAssembly({ lesson, image, filled = 0 }) {
  const { preview } = useArtifactProgress();
  const visual = visualForLesson(lesson?.id);
  const pieces = artifactPiecesForSet(visual.pieceSet);
  const removal = visual.progression === "remove";
  const activePhysicalIndex =
    preview.lessonId === lesson?.id && Number.isInteger(preview.pieceIndex)
      ? visual.pieceOrder[preview.pieceIndex]
      : null;

  return (
    <span
      className="relief-assembly"
      data-progression={removal ? "remove" : "assemble"}
      data-piece-set={visual.pieceSet}
      aria-hidden="true"
    >
      <span
        className="relief-assembly__underpainting"
        style={{ backgroundImage: `url("${image}")` }}
      />
      {pieces.map((piece, pieceIndex) => {
        const rank = visual.pieceOrder.indexOf(pieceIndex);
        const persisted = rank < filled;
        const active = pieceIndex === activePhysicalIndex;
        const artifactProgress = Math.max(
          0,
          Math.min(1, persisted ? 1 : active ? preview.progress : 0)
        );
        const placementProgress = removal
          ? 1 - artifactProgress
          : artifactProgress;
        return (
          <span
            key={piece.id}
            className="relief-assembly__piece"
            data-set={String(persisted)}
            data-active={String(active)}
            data-piece={piece.id}
            data-piece-index={pieceIndex}
            style={{
              "--piece-image": `url("${image}")`,
              "--piece-clip": clipPathForPiece(piece),
              "--piece-tx": `${piece.entry[0] * 34 * (1 - placementProgress)}%`,
              "--piece-ty": `${-piece.entry[1] * 34 * (1 - placementProgress)}%`,
              "--piece-rotation": `${piece.entry[2] * (1 - placementProgress)}rad`,
              "--piece-scale": 0.84 + placementProgress * 0.16,
              "--piece-opacity": removal
                ? 0.94 * (1 - artifactProgress)
                : 0.16 + artifactProgress * 0.84,
              "--piece-saturation": 0.28 + artifactProgress * 0.72,
              "--piece-brightness": 0.42 + artifactProgress * 0.58,
              "--piece-day-saturation": 0.42 + artifactProgress * 0.58,
              "--piece-day-brightness": 0.84 + artifactProgress * 0.2,
            }}
          />
        );
      })}
      <span className="relief-assembly__raking-light" />
    </span>
  );
}
