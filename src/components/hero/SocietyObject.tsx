"use client";

import React from "react";
import { motion } from "framer-motion";
import { SocietyObjectProps } from "./types";
import { InkRing } from "./InkRing";

export function SocietyObject({
  society,
  isActive,
  progress,
  isReducedMotion = false,
}: SocietyObjectProps) {
  const objectType = society.objectConfig?.type || "camera";

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Hand-drawn ink ring drawn dynamically around the active object (A24 reference feature) */}
      <InkRing color={society.accentColor} isActive={isActive} />

      {/* Floating physical object */}
      <div className="relative z-10 flex items-center justify-center">
        {objectType === "camera" && (
          <CameraObject isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "discoball" && (
          <DiscoBallObject isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "letter" && (
          <LetterObject
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
          <PaintbrushObject isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "clapboard" && (
          <ClapboardObject isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
        {objectType === "vinyldisc" && (
          <VinylDiscObject isActive={isActive} isReducedMotion={isReducedMotion} />
        )}
      </div>

      {/* Realistic contact shadow beneath the physical artifact */}
      <motion.div
        animate={{
          scaleX: isActive ? [1, 1.08, 1] : 0.85,
          opacity: isActive ? 0.35 : 0.15,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 w-72 sm:w-[420px] md:w-[520px] h-6 rounded-full bg-ink/20 blur-xl pointer-events-none -z-10"
      />
    </div>
  );
}

// 1. AMS: Vintage Rangefinder Film Camera
function CameraObject({
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
              y: isActive ? [0, -10, 0] : 0,
              rotateZ: isActive ? [0, 1.5, 0, -1.5, 0] : 0,
            }
      }
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] relative flex items-center justify-center filter-none"
    >
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyLeather" x1="30" y1="70" x2="230" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1B18" />
            <stop offset="0.7" stopColor="#141210" />
            <stop offset="1" stopColor="#0B0A09" />
          </linearGradient>
          <linearGradient id="topPlate" x1="30" y1="50" x2="230" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6E4DF" />
            <stop offset="0.5" stopColor="#D3CFC7" />
            <stop offset="1" stopColor="#ADA89D" />
          </linearGradient>
          <radialGradient id="lensGlass" cx="42%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#1D4ED8" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Vintage Top Plate (Brushed Silver) */}
        <path d="M 36 82 L 36 60 Q 36 52 44 52 L 216 52 Q 224 52 224 60 L 224 82 Z" fill="url(#topPlate)" stroke="#8C877D" strokeWidth="1.5" />

        {/* Shutter Speed Dial & Wind Lever */}
        <rect x="52" y="42" width="28" height="10" rx="2" fill="#C4BFB5" stroke="#7A756C" strokeWidth="1" />
        <rect x="175" y="38" width="32" height="14" rx="2" fill="#B3ADA2" stroke="#69645B" strokeWidth="1" />
        <circle cx="191" cy="45" r="4" fill="#E6E4DF" />

        {/* Shutter Button with threaded release */}
        <rect x="94" y="44" width="16" height="8" rx="2" fill="#D3CFC7" stroke="#7A756C" strokeWidth="1" />

        {/* Rangefinder Optical Windows */}
        <rect x="54" y="60" width="22" height="14" rx="2" fill="#0284C7" stroke="#475569" strokeWidth="1" fillOpacity="0.8" />
        <rect x="180" y="62" width="12" height="12" rx="2" fill="#F59E0B" stroke="#475569" strokeWidth="1" fillOpacity="0.8" />

        {/* Main Body (Leatherette Textured Chassis) */}
        <rect x="36" y="80" width="188" height="116" rx="8" fill="url(#bodyLeather)" stroke="#2C2723" strokeWidth="2" />
        {/* Leatherette pebble texture ribs */}
        <line x1="48" y1="88" x2="48" y2="188" stroke="#26221E" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="58" y1="88" x2="58" y2="188" stroke="#26221E" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Red Dot Heritage Inscription */}
        <circle cx="204" cy="98" r="6" fill="#D97706" />

        {/* Lens Barrel (Centered 50mm Prime) */}
        <circle cx="130" cy="138" r="54" fill="#2B2724" stroke="#4A453F" strokeWidth="2" />
        <circle cx="130" cy="138" r="48" fill="#1A1816" stroke="#C4BFB5" strokeWidth="1" strokeDasharray="6 3" />

        {/* Aperture ring markings */}
        <circle cx="130" cy="138" r="42" stroke="#78716C" strokeWidth="1.5" strokeDasharray="2 6" />

        {/* Lens Optical Element */}
        <circle cx="130" cy="138" r="34" fill="url(#lensGlass)" />
        <circle cx="130" cy="138" r="18" fill="#090B10" />

        {/* Curvature Reflection Highlight */}
        <ellipse cx="118" cy="126" rx="12" ry="6" transform="rotate(-30 118 126)" fill="#FFFFFF" fillOpacity="0.45" />
      </svg>
    </motion.div>
  );
}

// 2. Geneticx: Mirrored Disco Sphere
function DiscoBallObject({
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
              y: isActive ? [0, -8, 0] : 0,
              rotate: isActive ? [0, 360] : 0,
            }
      }
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 24, repeat: Infinity, ease: "linear" },
      }}
      className="w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] relative flex items-center justify-center filter-none"
    >
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sphereShading" cx="38%" cy="34%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
        </defs>

        {/* Steel Suspension Wire */}
        <line x1="130" y1="10" x2="130" y2="44" stroke="#64748B" strokeWidth="2" />
        <ellipse cx="130" cy="44" rx="14" ry="5" fill="#475569" />

        {/* Sphere Base */}
        <circle cx="130" cy="138" r="84" fill="url(#sphereShading)" stroke="#475569" strokeWidth="1.5" />

        {/* Facet Latitudes */}
        {[-60, -42, -22, 0, 22, 42, 60].map((yOff, i) => {
          const y = 138 + yOff;
          const rx = Math.sqrt(Math.max(0, 84 * 84 - yOff * yOff));
          return (
            <ellipse
              key={`lat-${i}`}
              cx="130"
              cy={y}
              rx={rx}
              ry={rx * 0.28}
              stroke="#64748B"
              strokeWidth="0.8"
              opacity="0.8"
            />
          );
        })}

        {/* Facet Longitudes */}
        {[-60, -40, -20, 0, 20, 40, 60].map((xOff, i) => (
          <path
            key={`lon-${i}`}
            d={`M ${130 + xOff} ${138 - Math.sqrt(Math.max(0, 84 * 84 - xOff * xOff))} Q ${
              130 + xOff * 1.35
            } 138 ${130 + xOff} ${138 + Math.sqrt(Math.max(0, 84 * 84 - xOff * xOff))}`}
            stroke="#64748B"
            strokeWidth="0.8"
            opacity="0.75"
          />
        ))}

        {/* Mirror Flash Facets */}
        <rect x="104" y="96" width="14" height="11" fill="#FFFFFF" rx="1" fillOpacity="0.9" />
        <rect x="128" y="108" width="14" height="12" fill="#FFFFFF" rx="1" fillOpacity="0.95" />
        <rect x="146" y="88" width="12" height="10" fill="#FFFFFF" rx="1" fillOpacity="0.85" />
        <rect x="114" y="136" width="14" height="12" fill="#FFFFFF" rx="1" fillOpacity="0.75" />

        {/* Sparkling Glint Starbursts */}
        <path d="M 110 88 Q 110 98 100 98 Q 110 98 110 108 Q 110 98 120 98 Q 110 98 110 88 Z" fill="#FFE4E6" />
        <path d="M 158 80 Q 158 88 150 88 Q 158 88 158 96 Q 158 88 166 88 Q 158 88 158 80 Z" fill="#FFE4E6" />
      </svg>
    </motion.div>
  );
}

// 3. Sarasva: Antique Rolled Parchment with REAL HTML POETRY
function LetterObject({
  isActive,
  progress,
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
    <div className="relative w-[320px] sm:w-[440px] md:w-[540px] lg:w-[600px] flex flex-col items-center justify-center">
      {/* Top Turned Wooden Roller */}
      <div className="w-full h-6 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 shadow-md border border-stone-800 flex items-center justify-between px-4 z-30">
        <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-inner" />
        <span className="text-[10px] uppercase tracking-widest font-mono text-amber-200/70">
          SARASVA ARCHIVE
        </span>
        <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-inner" />
      </div>

      {/* Real HTML Unrolling Parchment */}
      <motion.div
        animate={{
          height: unrolled ? 460 : 140,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-[94%] bg-[#FAF6EE] border-x border-stone-300 shadow-soft-xl overflow-hidden relative p-8 flex flex-col justify-between transition-all z-20"
      >
        {/* Subtle antique watermark */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-200/20 via-transparent to-stone-300/30 pointer-events-none" />

        {/* Real HTML Content */}
        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-society-sarasva font-bold">
              Literary Gazette // Vol. 24
            </span>
            <span className="font-mono text-[10px] text-ink-faint">EST. 2003</span>
          </div>

          <p className="font-serif italic text-ink text-lg sm:text-xl md:text-2xl leading-relaxed selection:bg-indigo-100">
            &ldquo;{letterContent}&rdquo;
          </p>

          <div className="pt-3 flex items-center justify-between border-t border-stone-200">
            <div className="space-y-1">
              <span className="block font-serif italic text-sm text-ink-muted">
                Indian Institute of Information Technology
              </span>
              <span className="block font-mono text-[10px] text-ink-faint uppercase">
                Prayagraj, Uttar Pradesh
              </span>
            </div>

            {/* Wax Seal Stamped Icon */}
            <div className="w-11 h-11 rounded-full bg-society-sarasva/15 border border-society-sarasva/40 flex items-center justify-center font-serif text-society-sarasva font-bold text-sm shadow-inner">
              सर
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Turned Wooden Roller */}
      <div className="w-full h-6 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 shadow-md border border-stone-800 flex items-center justify-between px-4 z-30">
        <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-inner" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-inner" />
      </div>
    </div>
  );
}

// 4. Nirmiti: Wooden Artist Brush
function PaintbrushObject({
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
              rotateZ: isActive ? [30, 36, 30] : 30,
              y: isActive ? [0, -10, 0] : 0,
            }
      }
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] relative flex items-center justify-center filter-none"
    >
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brushWood" x1="50" y1="220" x2="170" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#582C0E" />
            <stop offset="0.5" stopColor="#854D0E" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="ferruleSilver" x1="150" y1="100" x2="185" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1F5F9" />
            <stop offset="0.5" stopColor="#94A3B8" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="pigmentTip" x1="175" y1="75" x2="215" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F97316" />
            <stop offset="0.6" stopColor="#EA580C" />
            <stop offset="1" stopColor="#9A3412" />
          </linearGradient>
        </defs>

        {/* Sculptured Wood Shaft */}
        <path
          d="M 45 225 C 38 218 46 206 72 180 L 152 100 L 166 114 L 86 194 C 60 220 52 230 45 225 Z"
          fill="url(#brushWood)"
          stroke="#451A03"
          strokeWidth="1.5"
        />

        {/* Precision Silver Ferrule */}
        <polygon points="150,98 164,84 182,102 168,116" fill="url(#ferruleSilver)" stroke="#475569" strokeWidth="1" />
        <line x1="155" y1="94" x2="173" y2="112" stroke="#64748B" strokeWidth="1" />

        {/* Sabled Bristle Tip with Vibrant Acrylic Pigment */}
        <path
          d="M 164 84 C 176 72 192 54 216 32 C 204 62 190 90 182 102 Z"
          fill="url(#pigmentTip)"
          stroke="#7C2D12"
          strokeWidth="1"
        />

        {/* Droplets of Cadmium Coral Splatter */}
        <circle cx="225" cy="26" r="4.5" fill="#EA580C" />
        <circle cx="236" cy="38" r="3" fill="#F97316" />
        <circle cx="212" cy="14" r="2.5" fill="#FB923C" />
      </svg>
    </motion.div>
  );
}

// 5. Rangtarangini: Cinema Director's Slate
function ClapboardObject({
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
              y: isActive ? [0, -8, 0] : 0,
              rotateZ: isActive ? [-1.5, 1.5, -1.5] : 0,
            }
      }
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] relative flex items-center justify-center filter-none"
    >
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Blackboard Slate */}
        <rect x="36" y="92" width="188" height="120" rx="8" fill="#141210" stroke="#38332E" strokeWidth="2" />

        {/* Slate Grid Lines */}
        <line x1="48" y1="136" x2="212" y2="136" stroke="#2C2723" strokeWidth="1.5" />
        <line x1="130" y1="136" x2="130" y2="200" stroke="#2C2723" strokeWidth="1.5" />

        {/* Authentic Handwritten Chalk Text */}
        <text x="52" y="118" fill="#E7E5E4" fontFamily="monospace" fontSize="12" fontWeight="bold">
          PROD: RANGTARANGINI
        </text>
        <text x="52" y="156" fill="#A8A29E" fontFamily="monospace" fontSize="9">
          SCENE
        </text>
        <text x="56" y="184" fill="#FAF6EE" fontFamily="monospace" fontSize="20" fontWeight="bold">
          04
        </text>

        <text x="142" y="156" fill="#A8A29E" fontFamily="monospace" fontSize="9">
          TAKE
        </text>
        <text x="146" y="184" fill="#FAF6EE" fontFamily="monospace" fontSize="20" fontWeight="bold">
          01
        </text>

        {/* Clapper Top Stick (Hinged Ajar) */}
        <g transform="rotate(-14 36 92)">
          <rect x="36" y="64" width="188" height="28" rx="4" fill="#0F0E0D" stroke="#38332E" strokeWidth="1.5" />

          {/* Zebra Stripes */}
          <polygon points="52,64 70,64 54,92 36,92" fill="#E7E5E4" />
          <polygon points="90,64 108,64 92,92 74,92" fill="#E7E5E4" />
          <polygon points="128,64 146,64 130,92 112,92" fill="#E7E5E4" />
          <polygon points="166,64 184,64 168,92 150,92" fill="#E7E5E4" />
          <polygon points="204,64 220,64 206,92 188,92" fill="#E7E5E4" />

          {/* Riveted Chrome Hinge */}
          <circle cx="44" cy="78" r="4.5" fill="#D6D3D1" stroke="#292524" strokeWidth="1" />
        </g>
      </svg>
    </motion.div>
  );
}

// 6. Virtuosi: 12" Vinyl Disc
function VinylDiscObject({
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
              y: isActive ? [0, -8, 0] : 0,
            }
      }
      transition={{
        rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] relative flex items-center justify-center filter-none"
    >
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="vinylBlack" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22201E" />
            <stop offset="60%" stopColor="#141210" />
            <stop offset="100%" stopColor="#080706" />
          </radialGradient>
        </defs>

        {/* 12-inch Black Vinyl Disc */}
        <circle cx="130" cy="130" r="110" fill="url(#vinylBlack)" stroke="#38332E" strokeWidth="2" />

        {/* Sound Micro-Grooves */}
        <circle cx="130" cy="130" r="100" stroke="#282420" strokeWidth="1" />
        <circle cx="130" cy="130" r="90" stroke="#3A3530" strokeWidth="0.8" opacity="0.6" />
        <circle cx="130" cy="130" r="80" stroke="#282420" strokeWidth="1" />
        <circle cx="130" cy="130" r="70" stroke="#3A3530" strokeWidth="0.8" opacity="0.6" />
        <circle cx="130" cy="130" r="60" stroke="#282420" strokeWidth="1" />

        {/* Iridescent Light Reflection Arcs */}
        <path d="M 45 85 A 100 100 0 0 1 130 30" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.14" />
        <path d="M 215 175 A 100 100 0 0 1 130 230" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.14" />

        {/* Center Paper Label */}
        <circle cx="130" cy="130" r="42" fill="#0D9488" stroke="#042F2E" strokeWidth="2" />
        <circle cx="130" cy="130" r="34" stroke="#CCFBF1" strokeWidth="1" strokeDasharray="3 2" />

        <text x="130" y="125" textAnchor="middle" fill="#FFFFFF" fontFamily="serif" fontSize="9" fontWeight="bold" letterSpacing="0.05em">
          VIRTUOSI
        </text>
        <text x="130" y="136" textAnchor="middle" fill="#CCFBF1" fontFamily="monospace" fontSize="6.5">
          33 ⅓ RPM • STEREO
        </text>

        {/* Turntable Spindle Hole */}
        <circle cx="130" cy="130" r="7" fill="#FAF8F5" stroke="#042F2E" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}
