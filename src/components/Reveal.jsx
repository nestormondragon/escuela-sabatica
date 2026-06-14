import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* =================================================================
   Reveal — a tiny scroll-driven fade/rise wrapper.

   Robust by construction. Content is NEVER trapped invisible:
   - reduced-motion or no IntersectionObserver → shown immediately.
   - otherwise it starts hidden, reveals when scrolled into view, AND a
     safety timer reveals it regardless after a beat — because IO does
     not deliver entries while a tab is backgrounded (the same
     visibility trap that froze the animations). A stuck observer can
     never hide content here.
   ================================================================= */
export default function Reveal({ children, y = 16, delay = 0, style, ...rest }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  // default visible; flip to hidden only if we can animate it back in
  const canAnimate = !reduced && typeof IntersectionObserver !== "undefined";
  const [shown, setShown] = useState(!canAnimate);

  useEffect(() => {
    if (!canAnimate) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    io.observe(el);
    // safety net: never let a backgrounded/stuck observer hide content
    const failsafe = setTimeout(() => setShown(true), 1100);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [canAnimate]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.6s var(--ease-out) ${delay}s, transform 0.6s var(--ease-out) ${delay}s`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
