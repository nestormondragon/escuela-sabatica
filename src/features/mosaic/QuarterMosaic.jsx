import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { stageIndexFor } from "../../components/Centerpiece.jsx";
import { lessonManifestForLocale } from "../../content/lessonManifest.generated.js";
import MosaicPanel from "./MosaicPanel.jsx";
import SemanticMosaicList from "./SemanticMosaicList.jsx";
import "./mosaic.css";
import "./mosaic-motion.css";
import { useI18n } from "../../i18n/LocaleProvider.jsx";

const PANEL_AREAS = [
  "a", "b", "c", "d", "e", "f", "g",
  "h", "i", "j", "k", "l", "m",
];
const EMPTY_IDS = Object.freeze([]);

const asSet = (value) => {
  if (value instanceof Set) return value;
  return new Set(Array.isArray(value) ? value : []);
};

function readProgress(progressByLesson, lesson, getProgress) {
  if (getProgress) return getProgress(lesson) ?? {};
  if (progressByLesson instanceof Map) return progressByLesson.get(lesson.id) ?? {};
  return progressByLesson?.[lesson.id] ?? {};
}

function normalizePanel({
  lesson,
  rawProgress,
  currentLessonId,
  activeLessonId,
  revisited,
  currentNumber,
  t,
}) {
  const progress =
    typeof rawProgress === "number"
      ? { filledCount: rawProgress }
      : rawProgress || {};
  const total = Math.max(1, Number(progress.total ?? lesson.slots?.length ?? 8));
  const slotValues = progress.slots ? Object.values(progress.slots) : [];
  const countedSlots = slotValues.filter(Boolean).length;
  const filledCount = Math.max(
    0,
    Math.min(total, Number(progress.filledCount ?? progress.filled ?? countedSlots ?? 0))
  );
  const completed = Boolean(
    progress.completed ||
    progress.done ||
    progress.completedAt ||
    filledCount >= total
  );
  const current = lesson.id === currentLessonId || Boolean(progress.current);
  const started = Boolean(progress.started || filledCount > 0 || completed);
  const active = !completed && Boolean(
    lesson.id === activeLessonId ||
    progress.active ||
    (current && started)
  );
  const revisitedState = Boolean(progress.revisited || revisited.has(lesson.id));
  const connected = Boolean(progress.connected || progress.connectionCount > 0);
  const upcoming = Boolean(
    progress.upcoming ??
    (!started && !current && currentNumber != null && lesson.number > currentNumber)
  );

  const status = [];
  if (current) status.push(t("common.thisWeek"));
  if (completed) status.push(t("mosaic.status.completed"));
  else if (active) status.push(t("mosaic.status.inProgress"));
  else if (upcoming) status.push(t("common.upcoming"));
  else if (started) status.push(t("mosaic.status.started"));
  else status.push(t("common.available"));
  if (revisitedState) status.push(t("mosaic.status.revisited"));
  if (connected) status.push(t("mosaic.status.connected"));

  return {
    total,
    filledCount,
    completed,
    current,
    active,
    upcoming,
    revisited: revisitedState,
    connected,
    started,
    stageIndex: stageIndexFor(filledCount),
    primaryStatus:
      completed ? t("mosaic.status.complete") :
      active ? t("mosaic.status.inProgress") :
      current ? t("common.thisWeek") :
      revisitedState ? t("mosaic.status.revisited") :
      upcoming ? t("common.upcoming") : t("common.available"),
    statusLabel: status.join(". "),
    updatedAt: Number(progress.updatedAt || progress.lastVisitedAt || progress.completedAt || 0),
  };
}

function chooseMotifIds(items, selectedLessonId, limit) {
  const selectedIndex = Math.max(
    0,
    items.findIndex(({ lesson }) => lesson.id === selectedLessonId)
  );
  return new Set(
    items
      .map((item, index) => {
        const { lesson, panel } = item;
        const priority =
          lesson.id === selectedLessonId ? 0 :
          panel.active ? 1 :
          panel.current ? 2 :
          panel.revisited ? 3 :
          panel.completed ? 4 : 5;
        return {
          id: lesson.id,
          priority,
          distance: Math.abs(index - selectedIndex),
          updatedAt: panel.updatedAt,
        };
      })
      .filter((item) => item.priority < 5)
      .sort((a, b) =>
        a.priority - b.priority ||
        a.distance - b.distance ||
        b.updatedAt - a.updatedAt
      )
      .slice(0, Math.max(1, Math.min(5, limit)))
      .map(({ id }) => id)
  );
}

/*
 * QuarterMosaic
 *
 * progressByLesson accepts either an object or Map keyed by lesson id.
 * Values may be a filled-piece number, the persisted useKit state, or an
 * object with filledCount, total, completed, active, upcoming, revisited and
 * timestamps. getProgress(lesson) may be supplied instead.
 *
 * onNavigate receives (lesson, normalizedPanelState, event).
 */
export default function QuarterMosaic({
  lessons: providedLessons,
  progressByLesson = {},
  getProgress,
  currentLessonId,
  activeLessonId,
  selectedLessonId,
  revisitedLessonIds = EMPTY_IDS,
  connectionIds = EMPTY_IDS,
  onNavigate,
  onSelectLesson,
  heading,
  description,
  motifLimit = 5,
  showSemanticList = true,
  className = "",
}) {
  const { locale, t } = useI18n();
  const lessons = providedLessons || lessonManifestForLocale(locale);
  const resolvedHeading = heading || t("nav.mosaic");
  const resolvedDescription = description || t("mosaic.description");
  const reactId = useId().replace(/:/g, "");
  const headingId = `${reactId}-heading`;
  const descriptionId = `${reactId}-description`;
  const keyboardId = `${reactId}-keyboard`;
  const callbacks = onNavigate || onSelectLesson;
  const revisited = useMemo(
    () => asSet(revisitedLessonIds),
    [revisitedLessonIds]
  );
  const currentNumber =
    lessons.find((lesson) => lesson.id === currentLessonId)?.number ?? null;

  const items = useMemo(
    () =>
      lessons.slice(0, 13).map((lesson) => ({
        lesson,
        panel: normalizePanel({
          lesson,
          rawProgress: readProgress(progressByLesson, lesson, getProgress),
          currentLessonId,
          activeLessonId,
          revisited,
          currentNumber,
          t,
        }),
      })),
    [
      lessons,
      progressByLesson,
      getProgress,
      currentLessonId,
      activeLessonId,
      revisited,
      currentNumber,
      t,
    ]
  );

  const suggestedId =
    activeLessonId ||
    currentLessonId ||
    items.find(({ panel }) => panel.active)?.lesson.id ||
    items[0]?.lesson.id ||
    null;
  const controlledSelection = selectedLessonId !== undefined;
  const [internalSelectedId, setInternalSelectedId] = useState(
    selectedLessonId ?? suggestedId
  );
  const selectedId = controlledSelection ? selectedLessonId : internalSelectedId;
  const selectedIndex = Math.max(
    0,
    items.findIndex(({ lesson }) => lesson.id === selectedId)
  );
  const [focusIndex, setFocusIndex] = useState(selectedIndex);
  const [connectionPaths, setConnectionPaths] = useState([]);
  const panelRefs = useRef([]);
  const courtyardRef = useRef(null);
  const pointerFrame = useRef(0);

  useEffect(() => {
    setFocusIndex(selectedIndex);
  }, [selectedIndex]);

  useLayoutEffect(() => {
    const courtyard = courtyardRef.current;
    if (!courtyard) return undefined;
    const measure = () => {
      const bounds = courtyard.getBoundingClientRect();
      const centers = new Map();
      items.forEach(({ lesson }, index) => {
        const panel = panelRefs.current[index];
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        centers.set(lesson.id, {
          x: ((rect.left + rect.width / 2 - bounds.left) / bounds.width) * 1000,
          y: ((rect.top + rect.height / 2 - bounds.top) / bounds.height) * 660,
        });
      });
      const next = connectionIds
        .map((connectionId) => {
          const [from, to] = String(connectionId).split(":to:");
          const start = centers.get(from);
          const end = centers.get(to);
          if (!start || !end) return null;
          const bend = Math.min(74, Math.abs(end.x - start.x) * 0.12 + 28);
          return {
            id: connectionId,
            d: `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${(
              start.x +
              bend
            ).toFixed(1)} ${(start.y - bend).toFixed(1)}, ${(
              end.x -
              bend
            ).toFixed(1)} ${(end.y + bend).toFixed(1)}, ${end.x.toFixed(
              1
            )} ${end.y.toFixed(1)}`,
          };
        })
        .filter(Boolean);
      setConnectionPaths(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(courtyard);
    return () => observer.disconnect();
  }, [connectionIds, items]);

  const motifIds = useMemo(
    () => chooseMotifIds(items, selectedId, motifLimit),
    [items, selectedId, motifLimit]
  );

  const completedCount = items.filter(({ panel }) => panel.completed).length;
  const startedCount = items.filter(({ panel }) => panel.started).length;
  const activeItem = items.find(({ lesson }) => lesson.id === selectedId) || items[0];
  const progressSummary =
    completedCount === items.length && items.length > 0
      ? t("mosaic.completeAll")
      : t("mosaic.completeCount", {
          count: completedCount,
          total: items.length,
        });

  const selectPanel = (lesson, panel, event) => {
    if (!controlledSelection) setInternalSelectedId(lesson.id);
    const index = items.findIndex((item) => item.lesson.id === lesson.id);
    if (index >= 0) setFocusIndex(index);
    callbacks?.(lesson, panel, event);
  };

  const focusPanel = (index) => {
    const next = (index + items.length) % items.length;
    setFocusIndex(next);
    panelRefs.current[next]?.focus();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusPanel(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusPanel(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusPanel(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusPanel(items.length - 1);
    }
  };

  const rakeLight = (event) => {
    const courtyard = courtyardRef.current;
    if (!courtyard) return;
    cancelAnimationFrame(pointerFrame.current);
    const clientX = event.clientX;
    const clientY = event.clientY;
    pointerFrame.current = requestAnimationFrame(() => {
      const rect = courtyard.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      courtyard.style.setProperty("--qm-rotate-y", `${((x - 0.5) * 1.8).toFixed(2)}deg`);
      courtyard.style.setProperty("--qm-rotate-x", `${((0.5 - y) * 1.3).toFixed(2)}deg`);
    });
  };

  const settleCamera = () => {
    const courtyard = courtyardRef.current;
    if (!courtyard) return;
    courtyard.style.setProperty("--qm-rotate-y", "0deg");
    courtyard.style.setProperty("--qm-rotate-x", "0deg");
  };

  return (
    <section
      className={`quarter-mosaic ${className}`.trim()}
      aria-labelledby={headingId}
      aria-describedby={`${descriptionId} ${keyboardId}`}
    >
      <header className="qm-heading">
        <div>
          <p className="qm-heading__kicker">{t("mosaic.work")}</p>
          <h2 id={headingId}>{resolvedHeading}</h2>
          <p id={descriptionId}>{resolvedDescription}</p>
        </div>
        <div className="qm-heading__progress" aria-live="polite">
          <strong>{progressSummary}</strong>
          <span>{t("mosaic.tracedLessons", { count: startedCount })}</span>
        </div>
      </header>

      <p id={keyboardId} className="qm-sr-only">
        {t("mosaic.keyboard")}
      </p>

      <figure
        ref={courtyardRef}
        className="qm-courtyard"
        onPointerMove={rakeLight}
        onPointerLeave={settleCamera}
      >
        <svg
          className="qm-seams"
          viewBox="0 0 1000 660"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="qm-seams__bed"
            pathLength="13"
            d="M95 73 C220 64 310 78 425 74 S690 64 845 78
               C925 111 880 195 770 210 S520 190 390 214
               S150 238 118 322 C178 378 322 340 438 350
               S700 326 842 370 C910 430 812 480 688 477
               S420 462 250 493 C170 515 230 574 500 606"
          />
          <path
            className="qm-seams__set"
            pathLength="13"
            strokeDasharray={`${Math.max(0.01, completedCount)} 13`}
            d="M95 73 C220 64 310 78 425 74 S690 64 845 78
               C925 111 880 195 770 210 S520 190 390 214
               S150 238 118 322 C178 378 322 340 438 350
               S700 326 842 370 C910 430 812 480 688 477
               S420 462 250 493 C170 515 230 574 500 606"
          />
          <g className="qm-seams__connections">
            {connectionPaths.map((connection) => (
              <path
                key={connection.id}
                className="qm-seams__connection"
                pathLength="1"
                d={connection.d}
              />
            ))}
          </g>
        </svg>

        <ol className="qm-courtyard__grid" aria-label={t("mosaic.panelsLabel")}>
          {items.map(({ lesson, panel }, index) => (
            <li
              key={lesson.id}
              className="qm-panel-shell"
              style={{ gridArea: PANEL_AREAS[index] }}
            >
              <MosaicPanel
                ref={(node) => {
                  panelRefs.current[index] = node;
                }}
                lesson={lesson}
                panel={panel}
                selected={lesson.id === selectedId}
                renderMotif={motifIds.has(lesson.id)}
                tabIndex={index === focusIndex ? 0 : -1}
                idPrefix={reactId}
                onSelect={selectPanel}
                onKeyDown={(event) => handleKeyDown(event, index)}
              />
            </li>
          ))}
        </ol>

        <figcaption>
          <span>{progressSummary}.</span>
          {activeItem ? (
            <span>
              {t("mosaic.currentSelection", {
                number: activeItem.lesson.number,
                title: activeItem.lesson.title,
              })}
            </span>
          ) : null}
        </figcaption>
      </figure>

      {showSemanticList ? (
        <SemanticMosaicList
          items={items}
          selectedLessonId={selectedId}
          onSelect={selectPanel}
        />
      ) : null}
    </section>
  );
}
