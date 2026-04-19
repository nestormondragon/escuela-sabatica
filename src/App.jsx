import React, { useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import GlobalStyles from "./styles.jsx";
import { DayStrip, RefrainMark, neighborKey } from "./ui.jsx";
import { useCurrentScreen, useCompleted, useRefrain } from "./hooks.js";

import Home from "./days/Home.jsx";
import Sabado from "./days/Sabado.jsx";
import Domingo from "./days/Domingo.jsx";
import Lunes from "./days/Lunes.jsx";
import Martes from "./days/Martes.jsx";
import Miercoles from "./days/Miercoles.jsx";
import Jueves from "./days/Jueves.jsx";
import Viernes from "./days/Viernes.jsx";
import Anclas from "./days/Anclas.jsx";

/* =================================================================
   APP · El Papel de la Biblia · V5
   Mobile-first, single-screen, touch-driven.
   ================================================================= */

export default function App() {
  const [currentKey, goTo] = useCurrentScreen();
  const { completed, markComplete, reset } = useCompleted();
  const { trigger, fire } = useRefrain();

  const handleSwipe = useCallback(
    (direction) => {
      const next = neighborKey(currentKey, direction);
      if (next) goTo(next);
    },
    [currentKey, goTo]
  );

  const onRestart = useCallback(() => {
    reset();
    goTo("home");
  }, [reset, goTo]);

  const common = {
    onSwipe: handleSwipe,
    onMarkComplete: markComplete,
    onRefrain: fire,
    goTo,
    completed,
  };

  const renderScreen = () => {
    switch (currentKey) {
      case "home":
        return (
          <Home
            key="home"
            onSwipe={handleSwipe}
            onPick={goTo}
            completed={completed}
            onRestart={onRestart}
          />
        );
      case "sabado":    return <Sabado    key="sabado"    {...common} />;
      case "domingo":   return <Domingo   key="domingo"   {...common} />;
      case "lunes":     return <Lunes     key="lunes"     {...common} />;
      case "martes":    return <Martes    key="martes"    {...common} />;
      case "miercoles": return <Miercoles key="miercoles" {...common} />;
      case "jueves":    return <Jueves    key="jueves"    {...common} />;
      case "viernes":   return <Viernes   key="viernes"   {...common} />;
      case "anclas":
        return (
          <Anclas
            key="anclas"
            onSwipe={handleSwipe}
            onMarkComplete={markComplete}
            onRefrain={fire}
            onRestart={onRestart}
            goTo={goTo}
            completed={completed}
          />
        );
      default:
        return (
          <Home
            key="home"
            onSwipe={handleSwipe}
            onPick={goTo}
            completed={completed}
            onRestart={onRestart}
          />
        );
    }
  };

  return (
    <div className="scene-viewport bg-night c-parchment parchment-grain">
      <GlobalStyles />
      <RefrainMark trigger={trigger} />

      <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>

      <DayStrip
        currentKey={currentKey}
        completed={completed}
        onPick={goTo}
      />
    </div>
  );
}
