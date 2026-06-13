/* =================================================================
   motion.js — shared framer-motion tokens & variants.
   Easings per Emil Kowalski's spec; UI < 300ms; transform+opacity.
   ================================================================= */

export const EASE_OUT = [0.23, 1, 0.32, 1];
export const EASE_MORPH = [0.77, 0, 0.175, 1];
export const EASE_DRAWER = [0.32, 0.72, 0, 1];

export const t = {
  fast: { duration: 0.16, ease: EASE_OUT },
  base: { duration: 0.28, ease: EASE_OUT },
  slow: { duration: 0.45, ease: EASE_OUT },
  exit: { duration: 0.18, ease: EASE_OUT },
  morph: { duration: 0.4, ease: EASE_MORPH },
  springSnap: { type: "spring", duration: 0.5, bounce: 0.2 },
  springSoft: { type: "spring", duration: 0.6, bounce: 0.12 },
  tap: { type: "spring", stiffness: 400, damping: 17 },
};

/* group stagger (parent) + child item */
export const listParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
export const listItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};

/* full screen / view transition — calm tween, not snappy */
export const viewVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.24, ease: EASE_OUT } },
};

/* reveal a card / insight */
export const reveal = {
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: EASE_OUT } },
};

/* press feedback to spread on tappables */
export const tapProps = { whileTap: { scale: 0.97 }, transition: t.tap };

/* NOTE: ambient/looping motion is intentionally pure CSS (see .mtf-* and the
   Backdrop layers). Do NOT add a usePageVisible/visibilitychange gate for it —
   that mount-timing race was the original "animations don't start" bug. */
