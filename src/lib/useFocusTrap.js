import { useEffect, useRef } from "react";

/* =================================================================
   useFocusTrap — keeps keyboard focus inside an open dialog (WCAG 2.4.3
   focus order, 2.1.2 no keyboard trap-out). On open it moves focus to
   the element marked [data-autofocus] (or the first focusable), cycles
   Tab/Shift+Tab within the container, and restores focus to whatever was
   focused before on close. Pass the dialog's ref; give it tabIndex={-1}
   so it can hold focus when it has no focusable children.
   ================================================================= */
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useFocusTrap(active, containerRef) {
  const prevFocus = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    prevFocus.current = document.activeElement;
    const visible = (el) => el.offsetParent !== null || el === document.activeElement;
    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE)).filter(visible);

    const initial = container.querySelector("[data-autofocus]") || focusables()[0] || container;
    const raf = requestAnimationFrame(() => {
      try { initial.focus({ preventScroll: true }); } catch { /* ignore */ }
    });

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) { e.preventDefault(); try { container.focus({ preventScroll: true }); } catch {} return; }
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    container.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("keydown", onKey);
      const prev = prevFocus.current;
      if (prev && typeof prev.focus === "function") {
        try { prev.focus({ preventScroll: true }); } catch { /* ignore */ }
      }
    };
  }, [active, containerRef]);
}
