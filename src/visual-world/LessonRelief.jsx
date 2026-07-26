import React, {
  Suspense,
  lazy,
  useCallback,
  useMemo,
  useState,
} from "react";
import Centerpiece from "../components/Centerpiece.jsx";
import { reliefForLesson } from "../assets/generated/visualManifest.generated.js";
import { visualForLesson } from "./lessonVisualManifest.js";
import ReliefAssembly from "./ReliefAssembly.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";
import "./visual-world.css";
import "./material-world.css";

const STAGE_REVEAL = [0.16, 0.37, 0.58, 0.79, 1];
const MaterialWorldCanvas = lazy(() => import("./MaterialWorldCanvas.jsx"));

function supportsMaterialWorld(compact) {
  if (compact || typeof document === "undefined") return false;
  if (navigator.connection?.saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function LessonRelief({
  lesson,
  stage = 0,
  filled,
  total = 8,
  compact = false,
  priority = false,
  className = "",
}) {
  const { locale, t } = useI18n();
  const [loadState, setLoadState] = useState("loading");
  const [renderer, setRenderer] = useState("dom");
  const [allowWebGL] = useState(() => supportsMaterialWorld(compact));
  const safeStage = Math.max(0, Math.min(4, Number(stage) || 0));
  const pieceCount = Math.max(
    0,
    Math.min(
      total,
      Number.isFinite(filled)
        ? Number(filled)
        : safeStage >= 4
          ? total
          : safeStage * 2
    )
  );
  const relief = reliefForLesson(lesson?.id);
  const visual = visualForLesson(lesson?.id);
  const removal = visual.progression === "remove";
  const description =
    locale === "en" ? visual.descriptionEn || visual.description : visual.description;
  const pieceStatus = t(removal ? "common.regions" : "common.pieces", {
    filled: pieceCount,
    total,
  });
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
  const markWebGLReady = useCallback(() => setRenderer("webgl"), []);
  const markWebGLFailed = useCallback(() => setRenderer("dom"), []);

  return (
    <Root
      className={`lesson-relief${compact ? " is-compact" : ""} ${className}`.trim()}
      data-load-state={loadState}
      data-stage={safeStage}
      data-pieces={pieceCount}
      data-piece-set={visual.pieceSet}
      data-renderer={renderer}
      {...(compact
        ? {
            role: "img",
            "aria-label": `${description} ${pieceStatus}.`,
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

      <img
        className="lesson-relief__preload"
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

      {loadState === "ready" ? (
        <ReliefAssembly lesson={lesson} image={image} filled={pieceCount} />
      ) : null}

      {allowWebGL && loadState === "ready" ? (
        <Suspense fallback={null}>
          <MaterialWorldCanvas
            lesson={lesson}
            image={image}
            filled={pieceCount}
            total={total}
            onReady={markWebGLReady}
            onFailure={markWebGLFailed}
          />
        </Suspense>
      ) : null}

      <span className="lesson-relief__edge-light" aria-hidden="true" />

      {!compact ? (
        <figcaption className="sr-only">
          {description} {pieceStatus}.
        </figcaption>
      ) : null}
    </Root>
  );
}
