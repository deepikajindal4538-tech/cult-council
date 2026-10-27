"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SocietyObjectProps } from "./types";
export function SocietyObject({
  society,
  isActive,
  progress,
  isReducedMotion = false,
}: SocietyObjectProps) {
  const objectType = society.objectConfig?.type || "camera";

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* 1. Darker Editorial Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-20">
        <span className="font-serif text-[180px] sm:text-[280px] lg:text-[340px] font-bold text-stone-900/[0.09] select-none tracking-tighter transition-colors duration-500">
          {society.slug?.toUpperCase() || "IIITA"}
        </span>
      </div>

      {/* 2. The 3D Physical Studio Rendered Object */}
      <div className="relative z-10 flex items-center justify-center">
        {objectType === "camera" && (
          <ThreeDImageObject
            src="/objects/camera.png"
            alt="AMS 35mm Rangefinder Camera 3D Render"
            isActive={isActive}
            isReducedMotion={isReducedMotion}
          />
        )}

        {objectType === "discoball" && (
          <ThreeDImageObject
            src="/objects/discoball.png"
            alt="Geneticx Mirrored Disco Ball 3D Render"
            isActive={isActive}
            isReducedMotion={isReducedMotion}
          />
        )}

        {objectType === "letter" && (
          <SarasvaScrollObject
            isActive={isActive}
            progress={progress}
            letterContent={
              society.objectConfig?.letterContent ||
              "To the dreamers and the seekers: Here between quiet halls and starlit skies, we write not just stories, but the spirit of who we are becoming."
            }
            isReducedMotion={isReducedMotion}
          />
        )}

        {objectType === "paintbrush" && (
          <ThreeDImageObject
            src="/objects/paintbrush.png"
            alt="Nirmiti Artist Paintbrush 3D Render"
            isActive={isActive}
            isReducedMotion={isReducedMotion}
          />
        )}

        {objectType === "clapboard" && (
          <ThreeDImageObject
            src="/objects/clapboard.png"
            alt="Rangtarangini Cinema Director Clapboard 3D Render"
            isActive={isActive}
            isReducedMotion={isReducedMotion}
          />
        )}

        {objectType === "vinyldisc" && (
          <ThreeDImageObject
            src="/objects/vinyldisc.png"
            alt="Virtuosi 12-inch Vinyl LP Record 3D Render"
            isActive={isActive}
            isReducedMotion={isReducedMotion}
          />
        )}
      </div>

      {/* 4. Realistic Contact Floor Shadow */}
      <motion.div
        animate={{
          scaleX: isActive ? [1, 1.08, 1] : 0.85,
          opacity: isActive ? 0.35 : 0.15,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 w-72 sm:w-[420px] md:w-[520px] h-6 rounded-full bg-ink/25 blur-xl pointer-events-none -z-10"
      />
    </div>
  );
}

/**
 * Universal 3D Studio-Rendered Object Image Component with multiply blend mode
 * ensuring white background disappears seamlessly onto the canvas while preserving
 * authentic studio shadows, reflections, and deep materials.
 */
function ThreeDImageObject({
  src,
  alt,
  isActive,
  isReducedMotion,
}: {
  src: string;
  alt: string;
  isActive: boolean;
  isReducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={
        isReducedMotion
          ? {}
          : {
              y: isActive ? [0, -12, 0] : 0,
              rotateZ: isActive ? [0, 1.2, 0, -1.2, 0] : 0,
            }
      }
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut" },
      }}
      className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] flex items-center justify-center"
      style={{
        mixBlendMode: "multiply",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={700}
        height={700}
        priority
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
      />
    </motion.div>
  );
}

/**
 * Sarasva Literary Scroll Object:
 * Combines the 3D studio render with an interactive unrolling parchment containing
 * REAL HTML typography as specified in instructions.txt ("text must be real HTML, not part of the image").
 */
function SarasvaScrollObject({
  isActive,
  letterContent,
  isReducedMotion,
}: {
  isActive: boolean;
  progress: number;
  letterContent: string;
  isReducedMotion: boolean;
}) {
  const unrolled = isReducedMotion || isActive;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 3D Rendered Scroll Image as base */}
      <motion.div
        animate={
          isReducedMotion
            ? {}
            : {
                y: isActive ? [0, -10, 0] : 0,
              }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[340px] h-[260px] sm:w-[460px] sm:h-[320px] md:w-[560px] md:h-[380px] flex items-center justify-center"
        style={{ mixBlendMode: "multiply" }}
      >
        <Image
          src="/objects/letter.png"
          alt="Sarasva Antique Royal Parchment 3D Render"
          width={640}
          height={480}
          priority
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </motion.div>

      {/* Real HTML Unrolling Editorial Parchment Overlay */}
      <AnimatePresence>
        {unrolled && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-16 sm:-bottom-20 z-20 w-[90%] sm:w-[480px] md:w-[540px] bg-[#FAF6EE] border border-stone-300 shadow-soft-xl rounded-lg p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-society-sarasva font-bold">
                SARASVA LITERARY GAZETTE
              </span>
              <span className="font-mono text-[10px] text-ink-faint">
                ISSUE LXVI • REAL HTML
              </span>
            </div>

            {/* Real HTML Typography Quote */}
            <p className="font-serif italic text-ink text-base sm:text-lg md:text-xl leading-relaxed selection:bg-indigo-100">
              &ldquo;{letterContent}&rdquo;
            </p>

            {/* Footer with Seal */}
            <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="block font-serif italic text-xs text-ink-muted">
                  Poets, Thinkers & Debaters
                </span>
                <span className="block font-mono text-[9px] text-ink-faint uppercase">
                  IIIT Allahabad
                </span>
              </div>

              {/* Institute Wax Seal Stamp */}
              <div className="w-10 h-10 rounded-full bg-society-sarasva/15 border border-society-sarasva/40 flex items-center justify-center font-serif text-society-sarasva font-bold text-sm shadow-inner">
                सर
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
