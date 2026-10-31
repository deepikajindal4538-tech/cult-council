"use client";

import React from "react";
import { motion } from "framer-motion";

interface InkRingProps {
  /**
   * Stroke color for the hand-drawn ink ring.
   * Defaults to an editorial "light black" / soft charcoal tone.
   */
  color?: string;
  isActive: boolean;
  className?: string;
}

/**
 * Hand-drawn loose ink ring inspired by Ravi Klaassens' A24 catalog interaction.
 * Dynamically sketches an imperfect, organic ink circle around the active 3D exhibition centerpiece.
 * Styled in an authentic light black / charcoal sumi-e aesthetic.
 */
export function InkRing({
  color = "rgba(41, 37, 36, 0.42)",
  isActive,
  className = "",
}: InkRingProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-center justify-center -z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 340 340"
        className="w-[125%] h-[125%] max-w-[620px] max-h-[620px] sm:max-w-[720px] sm:max-h-[720px] overflow-visible select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary imperfect hand-drawn circle path in light black */}
        <motion.path
          d="M 170 28
             C 255 25, 315 82, 315 168
             C 315 252, 248 312, 165 313
             C 80 314, 25 250, 26 165
             C 27 80, 86 25, 178 28
             C 212 29, 270 48, 292 80"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, rotate: -15, opacity: 0 }}
          animate={{
            pathLength: isActive ? 1 : 0,
            rotate: isActive ? 0 : -20,
            scale: isActive ? 1 : 0.92,
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: 1.4, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
            opacity: { duration: 0.35 },
          }}
        />

        {/* Secondary subtle sketched charcoal over-stroke */}
        <motion.path
          d="M 162 33
             C 238 31, 306 90, 308 172
             C 310 244, 254 306, 170 307
             C 85 308, 32 244, 33 170
             C 34 96, 94 34, 175 32"
          stroke={color}
          strokeWidth="0.9"
          strokeDasharray="5 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isActive ? 1 : 0,
            opacity: isActive ? 0.55 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.12,
          }}
        />
      </svg>
    </div>
  );
}
