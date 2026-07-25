import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { EASE_OUT } from "../lib/motion.js";

const DIRECTION = {
  forward: 16,
  back: -16,
  none: 0,
};

/**
 * A short, interruptible destination transition.
 * The final state renders immediately under reduced motion.
 */
export default function PageTransition({
  children,
  routeKey,
  direction = "forward",
  className = "",
}) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const pageRef = useRef(null);
  const focusedKeyRef = useRef(null);
  const [focusReadyKey, setFocusReadyKey] = useState(null);
  const offset = DIRECTION[direction] ?? DIRECTION.forward;
  const content = children ?? <Outlet />;
  const key =
    routeKey ??
    `${location.key}:${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    setFocusReadyKey(reduceMotion ? key : null);

    if (reduceMotion) return undefined;

    // Framer normally signals completion. This fallback also covers an
    // interrupted or initially suppressed animation.
    const fallback = window.setTimeout(() => setFocusReadyKey(key), 360);
    return () => window.clearTimeout(fallback);
  }, [key, reduceMotion]);

  useEffect(() => {
    if (focusReadyKey !== key || focusedKeyRef.current === key) return undefined;

    const page = pageRef.current;
    if (!page) return undefined;

    let observer;
    const focusHeading = () => {
      if (focusedKeyRef.current === key) return true;

      const heading = page.querySelector("[data-route-heading], h1");
      if (!heading) return false;

      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
        heading.addEventListener(
          "blur",
          () => heading.removeAttribute("tabindex"),
          { once: true }
        );
      }

      heading.focus({ preventScroll: true });
      focusedKeyRef.current = key;
      observer?.disconnect();
      return true;
    };

    if (focusHeading()) return undefined;

    // Lazy lesson modules can resolve after the route transition. Keep
    // watching this route only until its real heading replaces RouteLoading.
    observer = new MutationObserver(focusHeading);
    observer.observe(page, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [focusReadyKey, key]);

  const finishRouteTransition = (definition) => {
    if (definition === "animate") setFocusReadyKey(key);
  };

  const states = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, x: offset },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: offset * -0.55 },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={pageRef}
        key={key}
        className={`mcv-page-transition ${className}`.trim()}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={states}
        onAnimationComplete={finishRouteTransition}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT }
        }
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
