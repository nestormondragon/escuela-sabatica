import React from "react";
import {
  artifactPiecesForSet,
  clipPathForPiece,
} from "./artifactPieces.js";
import { visualForLesson } from "./lessonVisualManifest.js";
import { useArtifactProgress } from "../features/artifact/ArtifactProgressContext.jsx";

/* How far outside the frame an unplaced piece waits, as a percentage of the
   frame. The old value was 34%, which left every piece hovering just beside
   its own slot — close enough that the finished picture was already readable
   before the reader had earned any of it. */
const ENTRY_TRAVEL = 118;

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
      {/* On a removal lesson the artwork IS the bed — it is what the reader
          uncovers, so it stays. On an assembly lesson the bed must never carry
          the relief: painting it here is what let the finished picture show
          through as a ghost from the very first day. */}
      <span
        className="relief-assembly__underpainting"
        style={removal ? { backgroundImage: `url("${image}")` } : undefined}
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

        /* Whether this piece is carrying artwork yet. Deciding it here in JS —
           rather than with a CSS selector — is deliberate: a selector scoped by
           progression can lose a specificity tie and silently uncover the whole
           artwork on a removal lesson. This cannot. */
        const inPlay = removal || artifactProgress > 0.001;

        return (
          <React.Fragment key={piece.id}>
            {/* The empty cell. Only assembly lessons have one: it is the hole
                the piece will drop into, and it is all the reader sees of that
                piece until they earn it. */}
            {!removal ? (
              <span
                className="relief-assembly__socket"
                data-filled={String(artifactProgress > 0.998)}
                style={{ "--piece-clip": clipPathForPiece(piece) }}
              />
            ) : null}
            {inPlay ? (
              <span
                className="relief-assembly__piece"
                data-set={String(persisted)}
                data-active={String(active)}
                data-piece={piece.id}
                data-piece-index={pieceIndex}
                style={{
                  "--piece-image": `url("${image}")`,
                  "--piece-clip": clipPathForPiece(piece),
                  "--piece-tx": `${piece.entry[0] * ENTRY_TRAVEL * (1 - placementProgress)}%`,
                  "--piece-ty": `${-piece.entry[1] * ENTRY_TRAVEL * (1 - placementProgress)}%`,
                  "--piece-rotation": `${piece.entry[2] * 1.6 * (1 - placementProgress)}rad`,
                  "--piece-scale": 0.84 + placementProgress * 0.16,
                  "--piece-opacity": removal
                    ? 0.94 * (1 - artifactProgress)
                    : 1,
                  "--piece-saturation": 0.28 + artifactProgress * 0.72,
                  "--piece-brightness": 0.42 + artifactProgress * 0.58,
                  "--piece-day-saturation": 0.42 + artifactProgress * 0.58,
                  "--piece-day-brightness": 0.84 + artifactProgress * 0.2,
                }}
              />
            ) : null}
          </React.Fragment>
        );
      })}
      <span className="relief-assembly__raking-light" />
    </span>
  );
}
