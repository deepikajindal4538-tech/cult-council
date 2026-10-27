"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SocietyObjectProps } from "./types";

export function Society3DVectorObject({
  society,
  isActive,
  progress,
  isReducedMotion = false,
}: SocietyObjectProps) {
  const objectType = society.objectConfig?.type || "camera";

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* 1. Ultra-Faint Museum Watermark in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-20">
        <span className="font-serif text-[180px] sm:text-[280px] lg:text-[340px] font-bold text-stone-900/[0.03] select-none tracking-tighter">
          {society.slug?.toUpperCase() || "IIITA"}
        </span>
      </div>

      {/* 2. The 3D Vector Drawn Physical Exhibition Object */}
      <div className="relative z-10 flex items-center justify-center">
        {objectType === "camera" && (
          <VectorCamera3D isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "discoball" && (
          <VectorDiscoBall3D isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "letter" && (
          <VectorLetterScroll3D
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
          <VectorPaintbrush3D isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "clapboard" && (
          <VectorClapboard3D isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "vinyldisc" && (
          <VectorVinylDisc3D isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
      </div>

      {/* 3. Realistic Soft Studio Floor Contact Shadow */}
      <motion.div
        animate={{
          scaleX: isActive ? [1, 1.05, 1] : 0.85,
          opacity: isActive ? 0.22 : 0.08,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-8 w-64 sm:w-[420px] md:w-[500px] h-8 rounded-full bg-stone-950/40 blur-2xl pointer-events-none -z-10"
      />
    </div>
  );
}

// ============================================================================
// 1. AMS: 3D Leica-Style Mechanical Rangefinder Camera in 3/4 Perspective
// ============================================================================
function VectorCamera3D({
  isActive,
  isReducedMotion,
}: {
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
      className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Top Plate Gradient */}
          <linearGradient id="cam3d_topPlate" x1="80" y1="90" x2="420" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="85%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Top Plate Bevel Highlight */}
          <linearGradient id="cam3d_topBevel" x1="80" y1="120" x2="420" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F8FAFC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
          </linearGradient>

          {/* Leatherette Body Gradient */}
          <linearGradient id="cam3d_leather" x1="80" y1="160" x2="420" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2D2824" />
            <stop offset="40%" stopColor="#1C1815" />
            <stop offset="85%" stopColor="#120F0D" />
            <stop offset="100%" stopColor="#080706" />
          </linearGradient>

          {/* 3D Side Shadow Plane */}
          <linearGradient id="cam3d_sideDepth" x1="420" y1="160" x2="455" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1A1715" />
            <stop offset="100%" stopColor="#050403" />
          </linearGradient>

          {/* Lens Barrel Cylinder Outer Rim */}
          <radialGradient id="cam3d_lensOuter" cx="44%" cy="40%" r="56%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="90%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>

          {/* Lens Deep Optical Glass */}
          <radialGradient id="cam3d_lensGlass" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#0284C7" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#1E3A8A" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#0B132B" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Knurled Dial Metal */}
          <linearGradient id="cam3d_knurl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="20%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="80%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Red Dot Leica Emblem */}
          <radialGradient id="cam3d_redDot" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="90%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
        </defs>

        {/* --- 3D CONTACT OCCLUSION SHADOW --- */}
        <ellipse cx="260" cy="415" rx="190" ry="24" fill="#000000" fillOpacity="0.32" />
        <ellipse cx="270" cy="418" rx="140" ry="14" fill="#000000" fillOpacity="0.4" />

        {/* --- 3D MECHANICAL TOP CONTROLS --- */}
        {/* Shutter Speed Dial (Extruded 3D Cylinder) */}
        <g transform="translate(120, 80)">
          <path d="M 0 16 L 0 32 Q 32 40 64 32 L 64 16 Q 32 24 0 16 Z" fill="#64748B" />
          <path d="M 0 16 Q 32 24 64 16 Q 32 8 0 16 Z" fill="url(#cam3d_knurl)" />
          {/* Dial ridges */}
          <line x1="16" y1="18" x2="16" y2="34" stroke="#334155" strokeWidth="2" />
          <line x1="32" y1="20" x2="32" y2="36" stroke="#334155" strokeWidth="2" />
          <line x1="48" y1="18" x2="48" y2="34" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Shutter Release Button with threaded cable socket */}
        <g transform="translate(200, 72)">
          <path d="M 4 14 L 4 36 L 36 36 L 36 14 Z" fill="url(#cam3d_knurl)" />
          <ellipse cx="20" cy="14" rx="16" ry="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="20" cy="14" r="4" fill="#475569" />
        </g>

        {/* Film Advance Lever (Extending in 3D perspective) */}
        <path d="M 320 100 Q 380 90 410 75 Q 425 68 435 80 Q 425 96 370 115 Z" fill="url(#cam3d_knurl)" stroke="#475569" strokeWidth="1" />
        <circle cx="426" cy="80" r="9" fill="#1E293B" />

        {/* Hotshoe Mount */}
        <path d="M 240 92 L 285 92 L 288 108 L 237 108 Z" fill="#475569" stroke="#334155" strokeWidth="1.5" />
        <rect x="245" y="96" width="32" height="6" fill="#1E293B" />

        {/* --- MAIN CAMERA CHASSIS (3D Isometric Perspective) --- */}
        {/* Right 3D Side Depth Plane */}
        <path d="M 416 112 L 448 135 L 448 365 L 416 385 Z" fill="url(#cam3d_sideDepth)" stroke="#262626" strokeWidth="1.5" />

        {/* Brushed Silver Top Plate (Front Face) */}
        <path d="M 76 112 Q 76 104 88 104 L 404 104 Q 416 104 416 112 L 416 168 L 76 168 Z" fill="url(#cam3d_topPlate)" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Top Plate Chamfer Highlight Line */}
        <line x1="84" y1="106" x2="408" y2="106" stroke="url(#cam3d_topBevel)" strokeWidth="2.5" />

        {/* Optical Viewfinder Window (Multi-Layer Refraction Glass) */}
        <rect x="100" y="120" width="38" height="24" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="2" />
        <rect x="104" y="124" width="30" height="16" rx="2" fill="#0284C7" fillOpacity="0.85" />
        <path d="M 106 126 L 126 126 L 118 138 L 106 138 Z" fill="#FFFFFF" fillOpacity="0.4" />

        {/* Rangefinder Frameline Window */}
        <rect x="160" y="124" width="18" height="18" rx="3" fill="#D97706" stroke="#475569" strokeWidth="1.5" fillOpacity="0.85" />

        {/* Red Dot Heritage Medallion (AMS Emblem) */}
        <circle cx="376" cy="192" r="14" fill="url(#cam3d_redDot)" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="376" y="197" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="9" fontWeight="bold">
          AMS
        </text>

        {/* Front Leatherette Body */}
        <path d="M 76 168 L 416 168 L 416 380 Q 416 392 404 392 L 88 392 Q 76 392 76 380 Z" fill="url(#cam3d_leather)" stroke="#262626" strokeWidth="2" />

        {/* Leather Pebble Stippling Bands */}
        <g stroke="#1F1A17" strokeWidth="2" strokeDasharray="4 6" opacity="0.8">
          <line x1="90" y1="180" x2="90" y2="380" />
          <line x1="106" y1="180" x2="106" y2="380" />
          <line x1="122" y1="180" x2="122" y2="380" />
          <line x1="384" y1="216" x2="384" y2="380" />
          <line x1="400" y1="216" x2="400" y2="380" />
        </g>

        {/* --- 3D FORWARD-PROJECTING LENS BARREL --- */}
        {/* Lens Shadow onto camera body */}
        <ellipse cx="248" cy="286" rx="112" ry="112" fill="#000000" fillOpacity="0.5" />

        {/* Outer Bezel Step 1 (Aperture Scale Base) */}
        <circle cx="246" cy="278" r="105" fill="#1E293B" stroke="#475569" strokeWidth="3" />
        <circle cx="246" cy="278" r="98" fill="url(#cam3d_lensOuter)" stroke="#334155" strokeWidth="2" />

        {/* Chrome Focus Grip Ribs */}
        <circle cx="246" cy="278" r="92" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="8 6" />

        {/* Inner Threaded Barrel */}
        <circle cx="246" cy="278" r="82" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
        <circle cx="246" cy="278" r="76" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 4" />

        {/* 50mm f/1.4 Lens Engraving Text */}
        <path id="cam3d_textArc" d="M 180 278 A 66 66 0 1 1 312 278" fill="none" />
        <text fill="#CBD5E1" fontFamily="monospace" fontSize="8" letterSpacing="2">
          <textPath href="#cam3d_textArc">IIITA • F=50mm 1:1.4 • NO. 2026</textPath>
        </text>

        {/* Multi-Coated Deep Convex Optical Glass */}
        <circle cx="246" cy="278" r="62" fill="url(#cam3d_lensGlass)" />
        <circle cx="246" cy="278" r="32" fill="#020617" />

        {/* Specular Optical Glint Reflections */}
        <ellipse cx="224" cy="254" rx="28" ry="14" transform="rotate(-35 224 254)" fill="#FFFFFF" fillOpacity="0.48" />
        <ellipse cx="228" cy="256" rx="14" ry="6" transform="rotate(-35 228 256)" fill="#FFFFFF" fillOpacity="0.8" />
        <circle cx="272" cy="302" r="8" fill="#38BDF8" fillOpacity="0.5" />
        <circle cx="282" cy="312" r="4" fill="#F59E0B" fillOpacity="0.6" />
      </svg>
    </motion.div>
  );
}

// ============================================================================
// 2. GENETICX: 3D Mirrored Disco Sphere with Specular Facets & Starbursts
// ============================================================================
function VectorDiscoBall3D({
  isActive,
  isReducedMotion,
}: {
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
              rotate: isActive ? [0, 360] : 0,
            }
      }
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 28, repeat: Infinity, ease: "linear" },
      }}
      className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Spherical Gradient Core Shading */}
          <radialGradient id="ball3d_sphere" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="80%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </radialGradient>

          {/* Mirror Rim Accent */}
          <linearGradient id="ball3d_rim" x1="100" y1="100" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 3D Drop Shadow */}
        <ellipse cx="250" cy="445" rx="150" ry="22" fill="#000000" fillOpacity="0.25" />

        {/* Steel Suspension Wire & Swivel Mount */}
        <line x1="250" y1="20" x2="250" y2="90" stroke="#64748B" strokeWidth="4" />
        <ellipse cx="250" cy="90" rx="24" ry="8" fill="#334155" />
        <rect x="242" y="70" width="16" height="20" fill="#94A3B8" rx="2" />

        {/* Main 3D Sphere Base */}
        <circle cx="250" cy="265" r="175" fill="url(#ball3d_sphere)" stroke="url(#ball3d_rim)" strokeWidth="3" />

        {/* True 3D Latitude Elliptical Rings */}
        {[-140, -105, -70, -35, 0, 35, 70, 105, 140].map((yOff, i) => {
          const y = 265 + yOff;
          const rx = Math.sqrt(Math.max(0, 175 * 175 - yOff * yOff));
          return (
            <ellipse
              key={`lat-${i}`}
              cx="250"
              cy={y}
              rx={rx}
              ry={rx * 0.28}
              stroke="#64748B"
              strokeWidth="1.4"
              opacity="0.85"
            />
          );
        })}

        {/* True 3D Longitude Meridian Curves */}
        {[-140, -105, -70, -35, 0, 35, 70, 105, 140].map((xOff, i) => (
          <path
            key={`lon-${i}`}
            d={`M ${250 + xOff} ${265 - Math.sqrt(Math.max(0, 175 * 175 - xOff * xOff))} Q ${
              250 + xOff * 1.35
            } 265 ${250 + xOff} ${265 + Math.sqrt(Math.max(0, 175 * 175 - xOff * xOff))}`}
            stroke="#64748B"
            strokeWidth="1.4"
            opacity="0.8"
          />
        ))}

        {/* Rendered 3D Mirror Facets (Reflecting Ambient Studio Light) */}
        {[
          { x: 195, y: 175, w: 24, h: 20, fill: "#FFFFFF", op: 0.95 },
          { x: 235, y: 195, w: 26, h: 22, fill: "#FFFFFF", op: 1.0 },
          { x: 275, y: 165, w: 22, h: 18, fill: "#FFFFFF", op: 0.9 },
          { x: 170, y: 225, w: 24, h: 20, fill: "#E2E8F0", op: 0.85 },
          { x: 215, y: 245, w: 28, h: 24, fill: "#FFFFFF", op: 0.95 },
          { x: 260, y: 235, w: 26, h: 22, fill: "#FFFFFF", op: 0.9 },
          { x: 300, y: 215, w: 22, h: 18, fill: "#CBD5E1", op: 0.75 },
          { x: 185, y: 295, w: 24, h: 20, fill: "#CBD5E1", op: 0.75 },
          { x: 230, y: 310, w: 26, h: 22, fill: "#E2E8F0", op: 0.8 },
          { x: 280, y: 290, w: 24, h: 20, fill: "#CBD5E1", op: 0.7 },
        ].map((f, i) => (
          <rect
            key={`facet-${i}`}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            rx={2}
            fill={f.fill}
            fillOpacity={f.op}
            stroke="#475569"
            strokeWidth="0.8"
          />
        ))}

        {/* Spectacular 3D Diffraction Starburst Glints */}
        <g transform="translate(248, 206)">
          <path d="M 0 -24 Q 0 0 -24 0 Q 0 0 0 24 Q 0 0 24 0 Q 0 0 0 -24 Z" fill="#FFE4E6" />
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
        </g>
        <g transform="translate(208, 185) scale(0.7)">
          <path d="M 0 -24 Q 0 0 -24 0 Q 0 0 0 24 Q 0 0 24 0 Q 0 0 0 -24 Z" fill="#FFFFFF" />
        </g>
        <g transform="translate(286, 175) scale(0.65)">
          <path d="M 0 -24 Q 0 0 -24 0 Q 0 0 0 24 Q 0 0 24 0 Q 0 0 0 -24 Z" fill="#FFE4E6" />
        </g>
        <g transform="translate(228, 256) scale(0.6)">
          <path d="M 0 -24 Q 0 0 -24 0 Q 0 0 0 24 Q 0 0 24 0 Q 0 0 0 -24 Z" fill="#FFFFFF" />
        </g>
      </svg>
    </motion.div>
  );
}

// ============================================================================
// 3. SARASVA: 3D Antique Rolled Scroll that UNROLLS with REAL HTML TEXT
// ============================================================================
function VectorLetterScroll3D({
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
    <div className="relative w-[340px] sm:w-[480px] md:w-[560px] lg:w-[620px] flex flex-col items-center justify-center">
      {/* Top 3D Turned Mahogany Roller Bar */}
      <div className="w-full h-8 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 shadow-xl border border-stone-800 flex items-center justify-between px-5 z-30">
        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md border border-amber-900" />
        <span className="text-[11px] uppercase tracking-widest font-mono text-amber-200/80 font-bold">
          SARASVA ARCHIVE // MANUSCRIPT
        </span>
        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md border border-amber-900" />
      </div>

      {/* 3D Real HTML Parchment Body (Expands when reaching center) */}
      <motion.div
        animate={{
          height: unrolled ? 480 : 160,
          opacity: 1,
        }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-[94%] bg-[#FAF6EE] border-x-2 border-stone-300 shadow-2xl overflow-hidden relative p-8 sm:p-10 flex flex-col justify-between transition-all z-20"
      >
        {/* Parchment Antique Fiber Watermark */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-200/30 via-transparent to-stone-300/40 pointer-events-none" />

        {/* Real HTML Content */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-stone-300 pb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-society-sarasva font-bold">
              Literary Gazette // Vol. 24
            </span>
            <span className="font-mono text-[11px] text-ink-faint font-semibold">
              EST. 2003 • AUTHENTIC HTML
            </span>
          </div>

          <p className="font-serif italic text-ink text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed selection:bg-indigo-100">
            &ldquo;{letterContent}&rdquo;
          </p>

          <div className="pt-4 flex items-center justify-between border-t-2 border-stone-200">
            <div className="space-y-1">
              <span className="block font-serif italic text-sm text-ink-muted">
                Indian Institute of Information Technology
              </span>
              <span className="block font-mono text-[10px] text-ink-faint uppercase tracking-wider">
                Prayagraj, Uttar Pradesh
              </span>
            </div>

            {/* 3D Wax Seal Stamped Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 via-red-800 to-amber-950 border-2 border-red-900 shadow-lg flex items-center justify-center font-serif text-amber-200 font-bold text-base">
              सर
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom 3D Turned Mahogany Roller Bar */}
      <div className="w-full h-8 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 shadow-xl border border-stone-800 flex items-center justify-between px-5 z-30">
        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md border border-amber-900" />
        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md border border-amber-900" />
      </div>
    </div>
  );
}

// ============================================================================
// 4. NIRMITI: 3D Sculptured Wooden Artist Paintbrush & Impasto Pigment
// ============================================================================
function VectorPaintbrush3D({
  isActive,
  isReducedMotion,
}: {
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
              rotateZ: isActive ? [28, 34, 28] : 28,
            }
      }
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
      className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Polished Hardwood Handle Gradient */}
          <linearGradient id="brush3d_wood" x1="100" y1="420" x2="340" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3E1A04" />
            <stop offset="30%" stopColor="#78350F" />
            <stop offset="65%" stopColor="#B45309" />
            <stop offset="90%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Chrome Ferrule Gradient */}
          <linearGradient id="brush3d_ferrule" x1="290" y1="210" x2="350" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#CBD5E1" />
            <stop offset="60%" stopColor="#64748B" />
            <stop offset="85%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Wet Cadmium Paint Tip Gradient */}
          <linearGradient id="brush3d_paint" x1="340" y1="160" x2="430" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="40%" stopColor="#EA580C" />
            <stop offset="80%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
        </defs>

        {/* 3D Contact Shadow */}
        <ellipse cx="230" cy="420" rx="160" ry="22" fill="#000000" fillOpacity="0.25" />

        {/* Long Tapered Wooden Shaft in 3D Perspective */}
        <path
          d="M 80 430 C 65 415 80 395 130 345 L 295 180 L 325 210 L 160 375 C 110 425 95 445 80 430 Z"
          fill="url(#brush3d_wood)"
          stroke="#261002"
          strokeWidth="2"
        />

        {/* Varnished Specular Highlight Streak running down the shaft */}
        <path
          d="M 98 418 L 305 190"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* 3D Silver Chrome Ferrule with Crimp Rings */}
        <polygon points="290,185 320,155 355,190 325,220" fill="url(#brush3d_ferrule)" stroke="#334155" strokeWidth="2" />
        <line x1="300" y1="175" x2="335" y2="210" stroke="#1E293B" strokeWidth="3" />
        <line x1="308" y1="167" x2="343" y2="202" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />

        {/* 3D Sable Bristles dipped in Glossy Cadmium Paint */}
        <path
          d="M 320 155 C 345 130 380 95 435 45 C 410 100 375 160 355 190 Z"
          fill="url(#brush3d_paint)"
          stroke="#7C2D12"
          strokeWidth="2"
        />

        {/* Wet Paint Specular Glint Reflection */}
        <path
          d="M 350 145 C 375 120 405 90 425 60 C 405 95 380 135 365 155 Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
        />

        {/* 3D Impasto Paint Splatters & Suspended Droplets */}
        <circle cx="448" cy="38" r="9" fill="#EA580C" />
        <circle cx="446" cy="36" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        <circle cx="468" cy="60" r="6" fill="#F97316" />
        <circle cx="424" cy="18" r="5" fill="#FB923C" />
      </svg>
    </motion.div>
  );
}

// ============================================================================
// 5. RANGTARANGINI: 3D Cinema Director's Slate Clapboard
// ============================================================================
function VectorClapboard3D({
  isActive,
  isReducedMotion,
}: {
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
              rotateZ: isActive ? [-2, 2, -2] : 0,
            }
      }
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
      className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="slate3d_wood" x1="60" y1="180" x2="440" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="50%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#0C0A09" />
          </linearGradient>
          <linearGradient id="slate3d_side" x1="430" y1="180" x2="455" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#050403" />
          </linearGradient>
        </defs>

        {/* 3D Contact Shadow */}
        <ellipse cx="260" cy="445" rx="180" ry="22" fill="#000000" fillOpacity="0.32" />

        {/* 3D Side Depth Plane */}
        <path d="M 430 180 L 452 205 L 452 420 L 430 400 Z" fill="url(#slate3d_side)" stroke="#1C1917" strokeWidth="1.5" />

        {/* Main Blackboard Slate */}
        <rect x="70" y="180" width="360" height="220" rx="14" fill="url(#slate3d_wood)" stroke="#44403C" strokeWidth="3" />

        {/* Chalk Grid Separators */}
        <line x1="90" y1="260" x2="410" y2="260" stroke="#44403C" strokeWidth="2.5" />
        <line x1="250" y1="260" x2="250" y2="380" stroke="#44403C" strokeWidth="2.5" />

        {/* Realistic Chalk Markings */}
        <text x="100" y="226" fill="#F5F5F4" fontFamily="monospace" fontSize="20" fontWeight="bold" letterSpacing="2">
          PROD: RANGTARANGINI
        </text>
        <text x="100" y="295" fill="#A8A29E" fontFamily="monospace" fontSize="14" fontWeight="bold">
          SCENE
        </text>
        <text x="110" y="355" fill="#FAF6EE" fontFamily="monospace" fontSize="46" fontWeight="bold">
          04
        </text>

        <text x="270" y="295" fill="#A8A29E" fontFamily="monospace" fontSize="14" fontWeight="bold">
          TAKE
        </text>
        <text x="280" y="355" fill="#FAF6EE" fontFamily="monospace" fontSize="46" fontWeight="bold">
          01
        </text>

        {/* 3D Hinged Clapper Top Arm (Slightly Ajar in Perspective) */}
        <g transform="rotate(-15 70 180)">
          <rect x="70" y="125" width="360" height="52" rx="8" fill="#141210" stroke="#44403C" strokeWidth="2.5" />

          {/* Diagonal Zebra Chevrons */}
          <polygon points="100,125 138,125 104,177 66,177" fill="#F5F5F4" />
          <polygon points="175,125 213,125 179,177 141,177" fill="#F5F5F4" />
          <polygon points="250,125 288,125 254,177 216,177" fill="#F5F5F4" />
          <polygon points="325,125 363,125 329,177 291,177" fill="#F5F5F4" />
          <polygon points="400,125 430,125 404,177 366,177" fill="#F5F5F4" />

          {/* Heavy Chrome Pivot Hinge Bolt */}
          <circle cx="86" cy="151" r="10" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
          <circle cx="86" cy="151" r="4" fill="#334155" />
        </g>
      </svg>
    </motion.div>
  );
}

// ============================================================================
// 6. VIRTUOSI: 3D 12-Inch Vinyl LP Record with Microgrooves & Tonearm
// ============================================================================
function VectorVinylDisc3D({
  isActive,
  isReducedMotion,
}: {
  isActive: boolean;
  isReducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={
        isReducedMotion
          ? {}
          : {
              rotateZ: isActive ? [0, 360] : 0,
              y: isActive ? [0, -12, 0] : 0,
            }
      }
      transition={{
        rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Obsidian Black Vinyl Gradient */}
          <radialGradient id="vinyl3d_black" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A2725" />
            <stop offset="40%" stopColor="#1C1917" />
            <stop offset="85%" stopColor="#0F0D0C" />
            <stop offset="100%" stopColor="#040303" />
          </radialGradient>

          {/* Center Paper Label Gradient */}
          <radialGradient id="vinyl3d_label" cx="44%" cy="40%" r="56%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="60%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#042F2E" />
          </radialGradient>
        </defs>

        {/* 3D Contact Shadow */}
        <ellipse cx="250" cy="445" rx="170" ry="24" fill="#000000" fillOpacity="0.3" />

        {/* 12-Inch Vinyl Outer Body */}
        <circle cx="250" cy="250" r="195" fill="url(#vinyl3d_black)" stroke="#3F3F46" strokeWidth="3" />

        {/* High-Density Sound Microgrooves */}
        {[182, 170, 158, 146, 134, 122, 110, 98, 86].map((r, i) => (
          <circle
            key={`groove-${i}`}
            cx="250"
            cy="250"
            r={r}
            stroke="#27272A"
            strokeWidth="1.6"
            strokeOpacity="0.9"
          />
        ))}

        {/* Iridescent Anisotropic Light Sheen Arcs */}
        <path
          d="M 100 160 A 180 180 0 0 1 250 70"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.16"
        />
        <path
          d="M 400 340 A 180 180 0 0 1 250 430"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.16"
        />

        {/* Center Paper Label (Teal & Gold Foil) */}
        <circle cx="250" cy="250" r="76" fill="url(#vinyl3d_label)" stroke="#115E59" strokeWidth="4" />
        <circle cx="250" cy="250" r="64" stroke="#CCFBF1" strokeWidth="1.8" strokeDasharray="6 4" />

        <text x="250" y="240" textAnchor="middle" fill="#FFFFFF" fontFamily="serif" fontSize="16" fontWeight="bold" letterSpacing="2">
          VIRTUOSI
        </text>
        <text x="250" y="260" textAnchor="middle" fill="#CCFBF1" fontFamily="monospace" fontSize="11" letterSpacing="1">
          33 ⅓ RPM • STEREO
        </text>
        <text x="250" y="280" textAnchor="middle" fill="rgba(204,251,241,0.6)" fontFamily="monospace" fontSize="8">
          IIITA AUDIO GUILD
        </text>

        {/* Turntable Spindle Center Hole */}
        <circle cx="250" cy="250" r="14" fill="#FAF8F5" stroke="#042F2E" strokeWidth="3" />
      </svg>
    </motion.div>
  );
}
