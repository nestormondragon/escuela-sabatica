import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion.js";

/* Lightweight toast (copy confirmations, soft notices). */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const timer = useRef(null);
  const toast = useCallback((m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2400);
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <AnimatePresence>
        {msg ? (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            style={{
              position: "fixed", left: "50%", bottom: "calc(24px + env(safe-area-inset-bottom,0px))",
              transform: "translateX(-50%)", zIndex: 95,
              background: "var(--surface-2)", color: "var(--text)",
              border: "1px solid var(--line-2)", padding: "11px 20px", borderRadius: 999,
              fontFamily: "var(--ui)", fontSize: "0.86rem", boxShadow: "var(--shadow-lg)",
            }}
          >
            {msg}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ToastCtx.Provider>
  );
}
