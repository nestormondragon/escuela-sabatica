import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/* Rolling count — goal-gradient momentum, reverent (bounce 0). */
export default function Odometer({ value, total }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 90, damping: 20 });
  const shown = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (reduced) mv.jump?.(value);
    mv.set(value);
  }, [value, mv, reduced]);

  return (
    <span style={{ fontFamily: "var(--ui)", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
      <motion.span>{shown}</motion.span>
      <span style={{ color: "var(--muted)" }}> / {total}</span>
    </span>
  );
}
