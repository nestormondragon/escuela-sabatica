import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { ToastProvider } from "./components/Toast.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Backdrop from "./components/Backdrop.jsx";
import Topbar from "./components/Topbar.jsx";
import Sheet from "./components/Sheet.jsx";
import Reward from "./components/Reward.jsx";

import Intro from "./views/Intro.jsx";
import Kit from "./views/Kit.jsx";
import Station from "./views/Station.jsx";
import KitDone from "./views/KitDone.jsx";
import Stub from "./views/Stub.jsx";
import LessonPicker from "./views/LessonPicker.jsx";

import { useSettings } from "./state/useSettings.js";
import { useKit } from "./state/useKit.js";
import { LESSONS, currentLesson } from "./content/lessons.js";
import { formatLong } from "./lib/date.js";
import { buzz } from "./lib/haptics.js";

export default function App() {
  const { settings, toggleMaestro, toggleMode, setLessonOverride } = useSettings();
  const [pickerOpen, setPickerOpen] = useState(false);

  const today = currentLesson(null);
  const lesson = currentLesson(settings.lessonOverride);

  useEffect(() => {
    document.documentElement.dataset.mode = settings.mode;
  }, [settings.mode]);

  const topbarProps = {
    mode: settings.mode,
    onToggleMode: toggleMode,
    maestro: settings.maestro,
    onToggleMaestro: toggleMaestro,
    onOpenLessons: () => setPickerOpen(true),
  };

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
       <ErrorBoundary>
        {lesson.complete ? (
          <LessonApp
            key={lesson.id}
            lesson={lesson}
            maestro={settings.maestro}
            topbarProps={topbarProps}
          />
        ) : (
          <>
            <Backdrop stage={0} scene={lesson.scene} mode={settings.mode} />
            <Topbar
              title={`Lección ${lesson.number}`}
              subtitle={formatLong(lesson.forDate)}
              progress={0}
              onHome={() => setPickerOpen(true)}
              {...topbarProps}
            />
            <div className="app">
              <AnimatePresence mode="wait">
                <Stub
                  key={lesson.id}
                  lesson={lesson}
                  todayLesson={today}
                  onGoToday={() => setLessonOverride(today.id)}
                  onOpenLessons={() => setPickerOpen(true)}
                />
              </AnimatePresence>
            </div>
          </>
        )}

        <Sheet open={pickerOpen} onClose={() => setPickerOpen(false)} title="Lecciones del trimestre">
          <LessonPicker
            lessons={LESSONS}
            activeId={lesson.id}
            todayId={today.id}
            onPick={(id) => { setLessonOverride(id === today.id ? null : id); setPickerOpen(false); }}
          />
        </Sheet>
       </ErrorBoundary>
      </ToastProvider>
    </MotionConfig>
  );
}

function LessonApp({ lesson, maestro, topbarProps }) {
  const slotIds = lesson.slots.map((s) => s.id);
  const kit = useKit(lesson.id, slotIds);
  const { state, filledCount, firstUnfilled, done } = kit;

  const [route, setRoute] = useState(() => (state.started ? "kit" : "intro"));
  const [stationId, setStationId] = useState(null);
  const [reward, setReward] = useState(null); // {slotLabel, seedSub, verse}

  useEffect(() => {
    if (done && !state.completedAt) kit.markComplete();
  }, [done, state.completedAt, kit]);

  const go = (r) => { setRoute(r); window.scrollTo({ top: 0, behavior: "auto" }); };

  const openSlot = (slot) => {
    setStationId(slot.station);
    go("station");
  };

  const station = lesson.stations.find((s) => s.id === stationId) || null;

  const handleFill = (value, extraPatch, seedSub) => {
    if (!station) return;
    const fresh = kit.fillSlot(station.slot, value, extraPatch);
    if (fresh) {
      buzz.success();
      const idx = kit.bumpSurprise();
      const verse = lesson.encourage[idx % lesson.encourage.length];
      const slot = lesson.slots.find((s) => s.id === station.slot);
      setReward({ slotLabel: slot?.label, seedSub, verse });
    } else {
      go("kit");
    }
  };

  const onRewardClose = useCallback(() => { setReward(null); setRoute("kit"); window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  const reset = () => {
    if (window.confirm("¿Reiniciar todo el recorrido? Se borrará tu ancla de este dispositivo.")) {
      kit.reset();
      setStationId(null);
      go("intro");
    }
  };

  return (
    <>
      <Backdrop stage={filledCount / slotIds.length} scene={lesson.scene} mode={topbarProps.mode} />
      <Topbar
        title={`${lesson.title}`}
        subtitle={`Lección ${lesson.number} · ${formatLong(lesson.forDate)}`}
        progress={filledCount / slotIds.length}
        onHome={() => go(state.started ? "kit" : "intro")}
        {...topbarProps}
      />
      <div className="app">
        <AnimatePresence mode="wait">
          {route === "intro" ? (
            <Intro
              key="intro"
              lesson={lesson}
              kitName={state.kitName}
              onSetKitName={kit.setKitName}
              onStart={() => { kit.start(); const first = firstUnfilled || slotIds[0]; const sObj = lesson.slots.find((s) => s.id === first); setStationId(sObj?.station || lesson.stations[0].id); go("station"); }}
            />
          ) : route === "kit" ? (
            <Kit
              key="kit"
              lesson={lesson}
              state={state}
              filledCount={filledCount}
              firstUnfilledId={firstUnfilled}
              done={done}
              onOpenSlot={openSlot}
              onOpenDone={() => go("done")}
            />
          ) : route === "station" && station ? (
            <Station
              key={"station-" + station.id}
              lesson={lesson}
              station={station}
              state={state}
              filledCount={filledCount}
              maestro={maestro}
              onFill={handleFill}
              onSkip={() => go("kit")}
            />
          ) : route === "done" ? (
            <KitDone
              key="done"
              lesson={lesson}
              state={state}
              total={slotIds.length}
              maestro={maestro}
              onBack={() => go("kit")}
              onReset={reset}
            />
          ) : (
            <Kit
              key="kit-fallback"
              lesson={lesson}
              state={state}
              filledCount={filledCount}
              firstUnfilledId={firstUnfilled}
              done={done}
              onOpenSlot={openSlot}
              onOpenDone={() => go("done")}
            />
          )}
        </AnimatePresence>
      </div>

      <Reward
        open={!!reward}
        name={state.kitName}
        slotLabel={reward?.slotLabel}
        seedSub={reward?.seedSub}
        verse={reward?.verse}
        onClose={onRewardClose}
      />
    </>
  );
}
