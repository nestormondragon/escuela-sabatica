import React, { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import GlobalStyles from "./styles.jsx";
import {
  DAYS,
  DayPicker,
  RefrainMark,
  ReadingIndicator,
  SwordWatermark,
  dayByKey,
  dayIndex,
} from "./ui.jsx";
import {
  useCurrentDay,
  useCompleted,
  useRefrain,
  useScrollProgress,
} from "./hooks.js";

import Intro from "./days/Intro.jsx";
import Sabado from "./days/Sabado.jsx";
import Domingo from "./days/Domingo.jsx";
import Lunes from "./days/Lunes.jsx";
import Martes from "./days/Martes.jsx";
import Miercoles from "./days/Miercoles.jsx";
import Jueves from "./days/Jueves.jsx";
import Viernes from "./days/Viernes.jsx";
import Anclas from "./days/Anclas.jsx";

/* =================================================================
   APP · El Papel de la Biblia · V4
   Gated day-at-a-time experience.
   ================================================================ */

export default function App() {
  const [currentDay, goToDay] = useCurrentDay();
  const { completed, markComplete, reset } = useCompleted();
  const { trigger, fire } = useRefrain();
  const progress = useScrollProgress();
  const [pickerOpen, setPickerOpen] = React.useState(false);

  // When the user taps "Continuar al siguiente día" at the end of a day
  const completeAndAdvance = useCallback(
    (key) => {
      markComplete(key);
      const idx = dayIndex(key);
      if (idx < DAYS.length - 1) {
        goToDay(DAYS[idx + 1].key);
      } else {
        // Viernes → Anclas
        goToDay("anclas");
      }
    },
    [markComplete, goToDay]
  );

  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => setPickerOpen(false), []);
  const pickAndGo = useCallback(
    (key) => {
      setPickerOpen(false);
      goToDay(key);
    },
    [goToDay]
  );

  const goToAnchors = useCallback(() => {
    setPickerOpen(false);
    goToDay("anclas");
  }, [goToDay]);

  const restart = useCallback(() => {
    reset();
    goToDay("intro");
  }, [reset, goToDay]);

  const renderDay = () => {
    const common = { onComplete: completeAndAdvance, onOpenPicker: openPicker, onRefrain: fire };
    switch (currentDay) {
      case "intro":
        return (
          <Intro
            key="intro"
            onStart={goToDay}
            onPick={goToDay}
            hasProgress={completed.size > 0}
          />
        );
      case "sabado":
        return <Sabado key="sabado" {...common} />;
      case "domingo":
        return <Domingo key="domingo" {...common} />;
      case "lunes":
        return <Lunes key="lunes" {...common} />;
      case "martes":
        return <Martes key="martes" {...common} />;
      case "miercoles":
        return <Miercoles key="miercoles" {...common} />;
      case "jueves":
        return <Jueves key="jueves" {...common} />;
      case "viernes":
        return <Viernes key="viernes" {...common} />;
      case "anclas":
        return (
          <Anclas
            key="anclas"
            onRestart={restart}
            onPick={goToDay}
            onOpenPicker={openPicker}
            onRefrain={fire}
          />
        );
      default:
        return (
          <Intro
            key="intro"
            onStart={goToDay}
            onPick={goToDay}
            hasProgress={completed.size > 0}
          />
        );
    }
  };

  return (
    <div
      data-lesson-root
      className="relative min-h-screen bg-night c-parchment parchment-grain overflow-x-hidden"
    >
      <GlobalStyles />
      <SwordWatermark />
      <ReadingIndicator progress={progress} />
      <RefrainMark trigger={trigger} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: [0.22, 0.9, 0.4, 1] }}
        >
          {renderDay()}
        </motion.div>
      </AnimatePresence>

      <DayPicker
        open={pickerOpen}
        currentKey={currentDay}
        completed={completed}
        onPick={pickAndGo}
        onClose={closePicker}
        onGoToAnchors={goToAnchors}
      />
    </div>
  );
}
