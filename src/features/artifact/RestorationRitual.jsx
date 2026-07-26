import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Icon from "../../components/Icon.jsx";
import { buzz } from "../../lib/haptics.js";
import { useAppReducedMotion } from "../../lib/useAppReducedMotion.js";
import { useArtifactProgress } from "./ArtifactProgressContext.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";
import { materialFamilyForVerb } from "../../visual-world/lessonVisualManifest.js";
import "./artifact-ritual.css";

const RITUAL_COPY = Object.freeze({
  choiceInsight: {
    kicker: "ritual.choice.kicker",
    title: "ritual.choice.title",
    hint: "ritual.choice.hint",
  },
  pickReveal: {
    kicker: "ritual.pick.kicker",
    title: "ritual.pick.title",
    hint: "ritual.pick.hint",
  },
  perspectiveFlip: {
    kicker: "ritual.flip.kicker",
    title: "ritual.flip.title",
    hint: "ritual.flip.hint",
  },
  stairs: {
    kicker: "ritual.stairs.kicker",
    title: "ritual.stairs.title",
    hint: "ritual.stairs.hint",
  },
  anchorChain: {
    kicker: "ritual.anchor.kicker",
    title: "ritual.anchor.title",
    hint: "ritual.anchor.hint",
  },
  skillThenCommit: {
    kicker: "ritual.trace.kicker",
    title: "ritual.trace.title",
    hint: "ritual.trace.hint",
  },
  commitDuo: {
    kicker: "ritual.commit.kicker",
    title: "ritual.commit.title",
    hint: "ritual.commit.hint",
  },
});

const TYPE_FAMILIES = Object.freeze({
  choiceInsight: "remove",
  pickReveal: "place",
  perspectiveFlip: "open",
  stairs: "join",
  anchorChain: "weight",
  skillThenCommit: "trace",
  commitDuo: "join",
});

function ritualFamily(type, materialVerb) {
  return materialVerb
    ? materialFamilyForVerb(materialVerb)
    : TYPE_FAMILIES[type] || "place";
}

function materialCopy(family) {
  const root = `ritual.material.${family}`;
  return {
    kicker: `${root}.kicker`,
    title: `${root}.title`,
    hint: `${root}.hint`,
    action: `${root}.action`,
  };
}

function clamp(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

export default function RestorationRitual({
  type,
  lessonId,
  pieceIndex,
  materialVerb,
  onComplete,
  onCancel,
}) {
  const { t } = useI18n();
  const reduced = useAppReducedMotion();
  const artifact = useArtifactProgress();
  const [settling, setSettling] = useState(false);
  const fired = useRef(false);
  const completionTimer = useRef(0);
  const sectionRef = useRef(null);

  /* This ritual replaces the question/option list in place, further down the
     page than the "Guardar" button the reader just tapped. Left alone, the
     reader's scroll position doesn't move, so the new drag-to-place puzzle
     renders off-screen above where they're looking and tapping "Guardar"
     reads as if it did nothing. Scrolling it into view synchronously, before
     paint, means the puzzle is already what they see. */
  useLayoutEffect(() => {
    sectionRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    // Only on mount — this ritual instance is fixed for its lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const family = ritualFamily(type, materialVerb);
  const copy = materialVerb
    ? materialCopy(family)
    : {
        ...(RITUAL_COPY[type] || RITUAL_COPY.pickReveal),
        action: "ritual.placeNow",
      };

  useEffect(() => {
    artifact.begin({
      lessonId,
      pieceIndex,
      verb: materialVerb || type,
    });
    return () => {
      window.clearTimeout(completionTimer.current);
      artifact.clear();
    };
    // The ritual identity is fixed for this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, pieceIndex, type]);

  const progress = useCallback(
    (value) => artifact.update(clamp(value)),
    [artifact]
  );

  const finish = useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    setSettling(true);
    artifact.update(1);
    artifact.settle();
    buzz.success();
    completionTimer.current = window.setTimeout(
      () => {
        onComplete();
        artifact.clear();
      },
      reduced ? 0 : 680
    );
  }, [artifact, onComplete, reduced]);

  const cancel = () => {
    if (fired.current || settling) return;
    window.clearTimeout(completionTimer.current);
    artifact.clear();
    onCancel();
  };

  return (
    <section
      ref={sectionRef}
      className="restoration-ritual"
      data-type={type}
      data-material-verb={materialVerb || ""}
      data-ritual-family={family}
      data-settling={String(settling)}
      aria-labelledby="restoration-ritual-title"
    >
      <header className="restoration-ritual__header">
        <span>{t(copy.kicker)}</span>
        <h2 id="restoration-ritual-title">{t(copy.title)}</h2>
        <p>{t(copy.hint)}</p>
      </header>

      <div className="restoration-ritual__stage">
        {reduced ? (
          <ImmediateRitual
            onComplete={finish}
            actionKey={copy.action}
          />
        ) : (
          <RitualForFamily
            family={family}
            type={type}
            progress={progress}
            onComplete={finish}
          />
        )}
      </div>

      <div className="restoration-ritual__footer">
        {!reduced ? (
          <button
            type="button"
            className="ritual-direct"
            onClick={finish}
            disabled={settling}
          >
            <Icon name="check" size={17} weight="bold" />
            {t(copy.action)}
          </button>
        ) : null}
        <button type="button" className="skip" onClick={cancel} disabled={settling}>
          {t("ritual.review")}
        </button>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {settling ? t("ritual.changing") : ""}
      </span>
    </section>
  );
}

function RitualForFamily({ family, type, progress, onComplete }) {
  if (family === "remove" || family === "polish") {
    return <BrushRitual progress={progress} onComplete={onComplete} />;
  }
  if (family === "open") {
    return <TurnRitual progress={progress} onComplete={onComplete} />;
  }
  if (family === "join") {
    return (
      <ConvergeRitual
        mode={type === "stairs" ? "lift" : "bind"}
        progress={progress}
        onComplete={onComplete}
      />
    );
  }
  if (family === "weight") {
    return <PhysicsAnchorRitual progress={progress} onComplete={onComplete} />;
  }
  if (family === "trace") {
    return <TraceRitual progress={progress} onComplete={onComplete} />;
  }
  return <ShardDragRitual progress={progress} onComplete={onComplete} />;
}

function ImmediateRitual({ onComplete, actionKey }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      className="ritual-immediate"
      onClick={onComplete}
    >
      <span className="ritual-immediate__piece" aria-hidden="true" />
      <span>
        <strong>{t(actionKey)}</strong>
        <small>{t("ritual.noMotion")}</small>
      </span>
    </button>
  );
}

function BrushRitual({ progress, onComplete }) {
  const { t } = useI18n();
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const cleared = useRef(0);
  const finished = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const context = canvas.getContext("2d");
    context.scale(dpr, dpr);
    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#62584c");
    gradient.addColorStop(0.55, "#403d39");
    gradient.addColorStop(1, "#25282c");
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);
    let seed = 41;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let index = 0; index < 180; index += 1) {
      context.fillStyle = `rgba(235,222,201,${0.035 + random() * 0.055})`;
      context.beginPath();
      context.arc(
        random() * rect.width,
        random() * rect.height,
        0.5 + random() * 2.2,
        0,
        Math.PI * 2
      );
      context.fill();
    }
  }, []);

  const point = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const erase = (event) => {
    if (!drawing.current || finished.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const next = point(event);
    const previous = last.current || next;
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = Math.max(30, canvas.clientWidth * 0.1);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(next.x, next.y);
    context.stroke();
    context.restore();
    const distance = Math.hypot(next.x - previous.x, next.y - previous.y);
    cleared.current = clamp(
      cleared.current + distance / Math.max(280, canvas.clientWidth * 3.1)
    );
    const nextProgress = clamp(cleared.current / 0.54);
    progress(nextProgress);
    last.current = next;
    if (nextProgress >= 1) {
      finished.current = true;
      onComplete();
    }
  };

  return (
    <div className="brush-ritual">
      <div className="brush-ritual__reveal" aria-hidden="true">
        <span />
        <i />
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={(event) => {
          drawing.current = true;
          last.current = point(event);
          event.currentTarget.setPointerCapture?.(event.pointerId);
        }}
        onPointerMove={erase}
        onPointerUp={(event) => {
          erase(event);
          drawing.current = false;
          last.current = null;
        }}
        onPointerCancel={() => {
          drawing.current = false;
          last.current = null;
        }}
        aria-label={t("ritual.brushAria")}
      />
      <span className="brush-ritual__instruction" aria-hidden="true">
        <Icon name="spark" size={18} />
        {t("ritual.clean")}
      </span>
    </div>
  );
}

function ShardDragRitual({ progress, onComplete }) {
  const { t } = useI18n();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [0, 180], [-8, 0]);
  const glow = useTransform(x, [0, 180], [0.12, 0.9]);

  return (
    <div className="shard-ritual">
      <motion.span
        className="shard-ritual__socket"
        style={{ "--socket-glow": glow }}
        aria-hidden="true"
      />
      <motion.button
        type="button"
        className="shard-ritual__piece"
        drag="x"
        dragConstraints={{ left: 0, right: 190 }}
        dragElastic={0.08}
        style={{ x, rotate }}
        onDrag={(_, info) => progress(info.offset.x / 145)}
        onDragEnd={(_, info) => {
          if (info.offset.x > 120 || info.velocity.x > 520) onComplete();
          else progress(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onComplete();
          }
        }}
        aria-label={t("ritual.dragAria")}
      >
        <span aria-hidden="true" />
      </motion.button>
      <span className="shard-ritual__track" aria-hidden="true" />
    </div>
  );
}

function TurnRitual({ progress, onComplete }) {
  const { t } = useI18n();
  const [turned, setTurned] = useState(false);

  const turn = () => {
    if (turned) return;
    setTurned(true);
    progress(0.7);
    window.setTimeout(() => {
      progress(1);
      onComplete();
    }, 620);
  };

  return (
    <button
      type="button"
      className="turn-ritual"
      onClick={turn}
      aria-label={t("ritual.turnAria")}
    >
      <motion.span
        className="turn-ritual__piece"
        animate={{ rotateY: turned ? 180 : 0, rotateZ: turned ? 0 : -4 }}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="turn-ritual__face turn-ritual__face--front" />
        <span className="turn-ritual__face turn-ritual__face--back">
          <Icon name="spark" size={30} />
        </span>
      </motion.span>
      <span className="turn-ritual__arc" aria-hidden="true" />
    </button>
  );
}

function TraceRitual({ progress, onComplete }) {
  const { t } = useI18n();
  const reactId = useId().replace(/:/g, "");
  const [value, setValue] = useState(0);
  const tracing = useRef(false);
  const done = useRef(false);

  const setFromEvent = (event) => {
    if (!tracing.current || done.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const next = clamp((event.clientX - rect.left) / rect.width);
    setValue(next);
    progress(next);
    if (next >= 0.94) {
      done.current = true;
      onComplete();
    }
  };

  const onKeyDown = (event) => {
    if (!["ArrowRight", "ArrowLeft", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "ArrowLeft"
        ? clamp(value - 0.1)
        : event.key === "ArrowRight"
          ? clamp(value + 0.1)
          : 1;
    setValue(next);
    progress(next);
    if (next >= 0.94 && !done.current) {
      done.current = true;
      onComplete();
    }
  };

  return (
    <button
      type="button"
      className="trace-ritual"
      onPointerDown={(event) => {
        tracing.current = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        setFromEvent(event);
      }}
      onPointerMove={setFromEvent}
      onPointerUp={(event) => {
        setFromEvent(event);
        tracing.current = false;
      }}
      onPointerCancel={() => {
        tracing.current = false;
      }}
      onKeyDown={onKeyDown}
      aria-label={t("ritual.traceAria", {
        percent: Math.round(value * 100),
      })}
    >
      <svg viewBox="0 0 440 170" aria-hidden="true">
        <defs>
          <linearGradient id={`${reactId}-trace`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f3e2b" />
            <stop offset="0.55" stopColor="#f17b4c" />
            <stop offset="1" stopColor="#ffe2bd" />
          </linearGradient>
        </defs>
        <path
          className="trace-ritual__ghost"
          d="M24 124 C82 34 120 148 182 82 S286 40 414 56"
        />
        <path
          className="trace-ritual__line"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - value}
          stroke={`url(#${reactId}-trace)`}
          d="M24 124 C82 34 120 148 182 82 S286 40 414 56"
        />
        <circle
          className="trace-ritual__lens"
          cx={24 + value * 390}
          cy={124 - Math.sin(value * Math.PI) * 58}
          r="20"
        />
      </svg>
    </button>
  );
}

function ConvergeRitual({ mode, progress, onComplete }) {
  const { t } = useI18n();
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);
  const holding = useRef(false);
  const frame = useRef(0);
  const last = useRef(0);
  const done = useRef(false);

  const tick = useCallback(
    (time) => {
      if (!last.current) last.current = time;
      const delta = time - last.current;
      last.current = time;
      setValue((current) => {
        const next = clamp(current + (holding.current ? delta / 900 : -delta / 480));
        valueRef.current = next;
        progress(next);
        if (next >= 1 && !done.current) {
          done.current = true;
          holding.current = false;
          onComplete();
        }
        return next;
      });
      if (!done.current && (holding.current || valueRef.current > 0)) {
        frame.current = requestAnimationFrame(tick);
      }
    },
    [onComplete, progress]
  );

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const start = (event) => {
    event.preventDefault();
    if (done.current) return;
    holding.current = true;
    last.current = 0;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    holding.current = false;
    last.current = 0;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(tick);
  };
  const keyboardComplete = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setValue(1);
    valueRef.current = 1;
    progress(1);
    onComplete();
  };

  return (
    <button
      type="button"
      className={`converge-ritual is-${mode}`}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={keyboardComplete}
      aria-label={t("ritual.joinAria")}
      style={{
        "--join": value,
        "--join-shift": `${value * 42}%`,
        "--join-shift-inverse": `${value * -42}%`,
        "--join-scale": 0.6 + value * 0.4,
        "--lintel-y": `${(1 - value) * -90}px`,
      }}
    >
      <span className="converge-ritual__left" aria-hidden="true" />
      <span className="converge-ritual__right" aria-hidden="true" />
      <span className="converge-ritual__heat" aria-hidden="true" />
      {mode === "lift" ? (
        <span className="converge-ritual__lintel" aria-hidden="true" />
      ) : null}
    </button>
  );
}

function PhysicsAnchorRitual({ progress, onComplete }) {
  const { t } = useI18n();
  const canvasRef = useRef(null);
  const started = useRef(false);
  const [running, setRunning] = useState(false);
  const cleanupRef = useRef(() => {});
  const mountedRef = useRef(true);

  useEffect(
    () => () => {
      mountedRef.current = false;
      cleanupRef.current();
    },
    []
  );

  const launch = async () => {
    if (started.current) return;
    started.current = true;
    setRunning(true);
    let Matter;
    try {
      const MatterModule = await import("matter-js");
      Matter = MatterModule.default || MatterModule;
    } catch {
      if (mountedRef.current) {
        started.current = false;
        setRunning(false);
      }
      return;
    }
    const canvas = canvasRef.current;
    if (!mountedRef.current || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) {
      started.current = false;
      setRunning(false);
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    context.scale(dpr, dpr);

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.2 } });
    const links = Array.from({ length: 5 }, (_, index) =>
      Matter.Bodies.rectangle(
        rect.width * 0.5,
        24 + index * 35,
        54,
        19,
        {
          chamfer: { radius: 9 },
          density: 0.004,
          frictionAir: 0.03,
          restitution: 0.12,
        }
      )
    );
    const anchor = Matter.Bodies.polygon(rect.width * 0.5, 8, 3, 27, {
      density: 0.015,
      frictionAir: 0.018,
    });
    const ground = Matter.Bodies.rectangle(
      rect.width * 0.5,
      rect.height + 18,
      rect.width,
      36,
      { isStatic: true }
    );
    const constraints = links.slice(1).map(
      (body, index) =>
        Matter.Constraint.create({
          bodyA: links[index],
          bodyB: body,
          length: 29,
          stiffness: 0.72,
          damping: 0.18,
        })
    );
    constraints.push(
      Matter.Constraint.create({
        bodyA: links.at(-1),
        bodyB: anchor,
        length: 35,
        stiffness: 0.8,
        damping: 0.2,
      })
    );
    Matter.Composite.add(engine.world, [
      ...links,
      anchor,
      ground,
      ...constraints,
    ]);

    let frame = 0;
    let startAt = performance.now();
    let lastAt = startAt;
    let finished = false;

    const drawBody = (body, fill, stroke) => {
      context.beginPath();
      body.vertices.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.closePath();
      context.fillStyle = fill;
      context.strokeStyle = stroke;
      context.lineWidth = 2;
      context.fill();
      context.stroke();
    };

    const tick = (time) => {
      const delta = Math.min(32, time - lastAt);
      lastAt = time;
      Matter.Engine.update(engine, delta);
      context.clearRect(0, 0, rect.width, rect.height);
      constraints.forEach((constraint) => {
        const a = constraint.bodyA.position;
        const b = constraint.bodyB.position;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = "rgba(241,123,76,.48)";
        context.lineWidth = 3;
        context.stroke();
      });
      links.forEach((link, index) =>
        drawBody(
          link,
          index % 2 ? "#56382e" : "#6c4536",
          "rgba(248,161,119,.7)"
        )
      );
      drawBody(anchor, "#9d4c34", "#ffd0ae");
      const elapsed = time - startAt;
      progress(clamp(elapsed / 1650));
      const asleep =
        elapsed > 900 &&
        Math.abs(anchor.velocity.y) < 0.18 &&
        Math.abs(anchor.angularVelocity) < 0.025;
      if ((elapsed > 1700 || asleep) && !finished) {
        finished = true;
        progress(1);
        onComplete();
        const completionTimer = window.setTimeout(() => {
          cancelAnimationFrame(frame);
          Matter.Engine.clear(engine);
        }, 500);
        cleanupRef.current = () => {
          window.clearTimeout(completionTimer);
          cancelAnimationFrame(frame);
          Matter.Engine.clear(engine);
        };
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    cleanupRef.current = () => {
      cancelAnimationFrame(frame);
      Matter.Engine.clear(engine);
    };
  };

  return (
    <button
      type="button"
      className="physics-anchor"
      onClick={launch}
      aria-label={t("ritual.anchorAria")}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {!running ? (
        <span>
          <Icon name="anchor" size={30} />
          {t("ritual.dropAnchor")}
        </span>
      ) : null}
    </button>
  );
}
