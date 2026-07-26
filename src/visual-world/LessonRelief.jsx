import React, { useMemo, useState } from "react";
import Centerpiece from "../components/Centerpiece.jsx";
import { reliefForLesson } from "../assets/generated/visualManifest.generated.js";
import { visualForLesson } from "./lessonVisualManifest.js";
import "./visual-world.css";

const STAGE_REVEAL = [0.16, 0.37, 0.58, 0.79, 1];

export default function LessonRelief({
  lesson,
  stage = 0,
  compact = false,
  priority = false,
  className = "",
}) {
  const [loadState, setLoadState] = useState("loading");
  const safeStage = Math.max(0, Math.min(4, Number(stage) || 0));
  const relief = reliefForLesson(lesson?.id);
  const visual = visualForLesson(lesson?.id);
  const reveal = STAGE_REVEAL[safeStage];
  const image = compact ? relief.thumb : relief.mobile;
  const srcSet = compact
    ? `${relief.thumb} 320w, ${relief.mobile} 640w`
    : `${relief.mobile} 640w, ${relief.hero} 1024w`;
  const sizes = compact
    ? "(max-width: 700px) 42vw, 220px"
    : "(min-width: 1120px) 42vw, 92vw";

  const fallbackLesson = useMemo(
    () => ({
      ...lesson,
      scene: {
        motif: lesson?.scene?.motif || lesson?.motif,
        arc: lesson?.scene?.arc || lesson?.arc,
      },
    }),
    [lesson]
  );
  const Root = compact ? "span" : "figure";

  return (
    <Root
      className={`lesson-relief${compact ? " is-compact" : ""} ${className}`.trim()}
      data-load-state={loadState}
      data-stage={safeStage}
      {...(compact
        ? {
            role: "img",
            "aria-label": `${visual.description} Etapa ${safeStage + 1} de 5.`,
          }
        : {})}
      style={{
        "--relief-focal": visual.focal,
        "--relief-reveal": reveal,
      }}
    >
      {loadState !== "ready" ? (
        compact ? (
          <span className="lesson-relief__fallback" aria-hidden="true">
            <span className="lesson-relief__fallback-mark" />
          </span>
        ) : (
          <div className="lesson-relief__fallback" aria-hidden="true">
            <Centerpiece
              lesson={fallbackLesson}
              filled={safeStage * 2}
              size={420}
            />
          </div>
        )
      ) : null}

      {compact ? (
        <span className="lesson-relief__image-field" aria-hidden="true">
          <img
            className="lesson-relief__image lesson-relief__image--base"
            src={image}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : "auto"}
            decoding="async"
            onLoad={() => setLoadState("ready")}
            onError={() => setLoadState("failed")}
          />
          <img
            className="lesson-relief__image lesson-relief__image--revealed"
            src={image}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchpriority="auto"
            decoding="async"
          />
          <span className="lesson-relief__kiln-line" />
          <span className="lesson-relief__edge-light" />
        </span>
      ) : (
        <div className="lesson-relief__image-field" aria-hidden="true">
          <img
            className="lesson-relief__image lesson-relief__image--base"
            src={image}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : "auto"}
            decoding="async"
            onLoad={() => setLoadState("ready")}
            onError={() => setLoadState("failed")}
          />
          <img
            className="lesson-relief__image lesson-relief__image--revealed"
            src={image}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchpriority="auto"
            decoding="async"
          />
          <span className="lesson-relief__kiln-line" />
          <span className="lesson-relief__edge-light" />
        </div>
      )}

      {!compact ? (
        <figcaption className="sr-only">
          {visual.description} Etapa {safeStage + 1} de 5.
        </figcaption>
      ) : null}
    </Root>
  );
}
