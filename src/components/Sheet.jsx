import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_DRAWER } from "../lib/motion.js";
import { useLockBodyScroll } from "../lib/useLockBodyScroll.js";
import { useFocusTrap } from "../lib/useFocusTrap.js";
import Icon from "./Icon.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

/* Bottom sheet drawer (maestro guide, lesson picker, verse detail). */
export default function Sheet({ open, onClose, title, children }) {
  const { t } = useI18n();
  useLockBodyScroll(open);
  const dialogRef = useRef(null);
  useFocusTrap(open, dialogRef);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 80, background: "color-mix(in srgb, var(--bg-0) 60%, transparent)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }}
          />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ duration: 0.32, ease: EASE_DRAWER }}
            style={{
              position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 81,
              maxHeight: "86vh", overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch",
              background: "var(--bg-1)", borderTopLeftRadius: 24, borderTopRightRadius: 24,
              borderTop: "1px solid var(--line-2)", boxShadow: "var(--shadow-lg)",
              padding: "12px 20px calc(28px + var(--safe-bottom)) 20px",
            }}
          >
            <div style={{ width: 42, height: 4, borderRadius: 999, background: "var(--line-2)", margin: "2px auto 14px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 className="letter" style={{ fontSize: "1.25rem" }}>{title}</h3>
              <button className="icon-btn" onClick={onClose} aria-label={t("common.close")}><Icon name="close" size={20} /></button>
            </div>
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
