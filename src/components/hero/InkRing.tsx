"use client";

import React from "react";
import { motion } from "framer-motion";

interface InkRingProps {
  color?: string;
  isActive: boolean;
}

/**
 * Hand-drawn loose ink ring inspired by Ravi Klaassens' A24 catalog interaction.
 * Dynamically draws an imperfect brush/ink circle around the active centerpiece object.
 */
export function InkRing({ color = "#1C1917", isActive }: InkRingProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
      <svg
        viewBox="0 0 320 320"
        className="w-[125%] h-[125%] max-w-[420px] max-h-[420px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Imperfect hand-drawn circle path */}
        <motion.path
          d="M 160 25 
             C 240 22, 298 78, 298 158 
             C 298 238, 235 295, 155 296 
             C 75 297, 24 236, 25 156 
             C 26 76, 82 23, 168 25
             C 200 26, 255 45, 275 75"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isActive ? 0.85 : 0}
          initial={{ pathLength: 0, rotate: -15 }}
          animate={{
            pathLength: isActive ? 1 : 0,
            rotate: isActive ? 0 : -20,
            scale: isActive ? 1 : 0.9,
          }}
          transition={{
            pathLength: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: 1.2, ease: "easeOut" },
            opacity: { duration: 0.4 },
          }}
        />

        {/* Secondary subtle sketched over-stroke */}
        <motion.path
          d="M 152 30 
             C 225 28, 290 85, 292 162 
             C 294 230, 240 290, 160 291 
             C 80 292, 30 230, 31 160 
             C 32 90, 88 32, 165 30"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeLinecap="round"
          opacity={isActive ? 0.35 : 0}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
    </div>
  );
}
