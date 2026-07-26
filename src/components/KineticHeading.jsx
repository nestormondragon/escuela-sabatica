import React from "react";
import { motion } from "framer-motion";
import { useAppReducedMotion } from "../lib/useAppReducedMotion.js";
import "./kinetic-heading.css";

const ROOTS = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
};

export default function KineticHeading({
  as = "h1",
  children,
  className = "",
  id,
  motionPreset = "expressive",
  ...props
}) {
  const reduced = useAppReducedMotion();
  const text = String(children || "");
  const words = text.split(/(\s+)/);
  const Root = ROOTS[as] || motion.h1;
  const compact = motionPreset === "compact";
  let visibleIndex = 0;

  return (
    <Root
      id={id}
      className={`kinetic-heading ${className}`.trim()}
      aria-label={text}
      initial="initial"
      animate="visible"
      {...props}
    >
      {words.map((word, index) => {
        if (/^\s+$/.test(word)) {
          return <React.Fragment key={`space-${index}`}>{word}</React.Fragment>;
        }
        const order = visibleIndex;
        visibleIndex += 1;
        return (
          <span
            className="kinetic-heading__clip"
            aria-hidden="true"
            key={`${word}-${index}`}
          >
            <motion.span
              className="kinetic-heading__word"
              variants={{
                initial: reduced
                  ? {}
                  : {
                      y: "112%",
                      rotate: order % 2 ? 1.1 : -0.8,
                      filter: `blur(${compact ? 4 : 7}px)`,
                      fontVariationSettings: '"wght" 430',
                    },
                visible: {
                  y: "0%",
                  rotate: 0,
                  filter: "blur(0px)",
                  fontVariationSettings: '"wght" 545',
                  transition: {
                    duration: reduced ? 0 : compact ? 0.48 : 0.68,
                    delay: reduced
                      ? 0
                      : Math.min(
                          order * (compact ? 0.038 : 0.055),
                          compact ? 0.24 : 0.44
                        ),
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Root>
  );
}
