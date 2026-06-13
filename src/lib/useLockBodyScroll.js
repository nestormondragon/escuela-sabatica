import { useEffect } from "react";

/* Lock background scroll while an overlay is open (sheet/reward/ceremony).
   Restores prior styles on close. Defeats iOS rubber-band bleed-through. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const { overflow, overscrollBehavior } = document.body.style;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.overscrollBehavior = overscrollBehavior;
    };
  }, [locked]);
}
