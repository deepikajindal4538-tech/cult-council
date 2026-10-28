"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles, Award } from "lucide-react";
import { Society3DVectorObject } from "@/components/hero/Society3DVectorObject";
import type { ISociety } from "@/models/Society";

interface SocietyCardData {
  num: string;
  slug: string;
  discipline: string;
  tagline: string;
  description: string;
  society: string;
  color: string;
  members: string;
  founded: number;
  rotation: number;
  yOffset: number; // Staggered baseline offset for organic overlap
}

const SOCIETIES_DATA: SocietyCardData[] = [
  {
    num: "01",
    slug: "ams",
    discipline: "Photography & Cinematography",
    tagline: "Freezing fleeting moments into timeless frames.",
    description:
      "From 35mm analogue nostalgia to 4K cinematic festival docuseries. AMS preserves campus memory through masterclass optics.",
    society: "AMS Guild",
    color: "#D97706",
    members: "45+",
    founded: 2005,
    rotation: -2,
    yOffset: 0,
  },
  {
    num: "02",
    slug: "geneticx",
    discipline: "Contemporary & Street Dance",
    tagline: "Syncing heartbeats to electrifying rhythm.",
    description:
      "Kinetic electricity, popping, break battles, and lyrical fusion on national stages across northern India.",
    society: "Geneticx Crew",
    color: "#E11D48",
    members: "60+",
    founded: 2004,
    rotation: 1.8,
    yOffset: 48,
  },
  {
    num: "03",
    slug: "sarasva",
    discipline: "Literature, Debate & Verse",
    tagline: "Where ink meets thought and words ignite revolutions.",
    description:
      "Publishing campus anthologies, philosophical salon debates, bilingual open-mics, and timeless poetry.",
    society: "Sarasva Society",
    color: "#4F46E5",
    members: "40+",
    founded: 2003,
    rotation: -1.2,
    yOffset: -24,
  },
  {
    num: "04",
    slug: "nirmiti",
    discipline: "Fine Arts, Murals & Scenography",
    tagline: "Transforming empty canvases into vibrant realities.",
    description:
      "Gigantic acrylic wall installations, fest stagecraft decor, charcoal portraiture, and vector design archives.",
    society: "Nirmiti Arts",
    color: "#EA580C",
    members: "38+",
    founded: 2004,
    rotation: 2.2,
    yOffset: 36,
  },
  {
    num: "05",
    slug: "rangtarangini",
    discipline: "Street Theatre & Proscenium Drama",
    tagline: "Living a thousand lives under the stage spotlight.",
    description:
      "Voice, grit, and hard-hitting Nukkad Nataks staging social truth before audiences of thousands.",
    society: "Rangtarangini Troupe",
    color: "#B91C1C",
    members: "52+",
    founded: 2003,
    rotation: -1.6,
    yOffset: -16,
  },
  {
    num: "06",
    slug: "virtuosi",
    discipline: "Live Band & Acoustic Performance",
    tagline: "Harmonies that resonate long after the chords fade.",
    description:
      "Electric rock anthems, Indian classical jugalbandis, starlit unplugged circles, and audio production.",
    society: "Virtuosi Collective",
    color: "#0D9488",
    members: "48+",
    founded: 2002,
    rotation: 1.4,
    yOffset: 52,
  },
];

interface FloatingPosterCardProps {
  data: SocietyCardData;
  index: number;
  scrollYProgress: any;
  societyModel?: any;
}

function FloatingPosterCard({
  data,
  index,
  scrollYProgress,
  societyModel,
}: FloatingPosterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Differentiated parallax speeds for organic floating movement
  const isEven = index % 2 === 0;
  const parallaxOffset = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [-35, 45] : [45, -35]
  );
  const smoothParallax = useSpring(parallaxOffset, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // Interactive 3D mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max 8 degrees tilt
    setTilt({
      x: (-y / (rect.height / 2)) * 7,
      y: (x / (rect.width / 2)) * 7,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Mock society object for 3D vector illustration if full model isn't passed
  const fallbackSociety: any = {
    slug: data.slug,
    name: data.discipline,
    accentColor: data.color,
    objectConfig: {
      type:
        data.slug === "ams"
          ? "camera"
          : data.slug === "geneticx"
          ? "discoball"
          : data.slug === "sarasva"
          ? "letter"
          : data.slug === "nirmiti"
          ? "palette"
          : data.slug === "rangtarangini"
          ? "masks"
          : "guitar",
      imageUrl: "",
      fallbackColor: data.color,
    },
  };

  const activeSociety = societyModel || fallbackSociety;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        y: smoothParallax,
      }}
      className={`relative w-full transition-all duration-300 ${
        isHovered ? "z-30" : "z-10"
      }`}
    >
      <motion.div
        animate={{
          rotateZ: isHovered ? 0 : data.rotation,
          rotateX: isHovered ? tilt.x : 0,
          rotateY: isHovered ? tilt.y : 0,
          scale: isHovered ? 1.025 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 22,
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        className="group relative flex flex-col justify-between rounded-[28px] border border-stone-300/90 bg-[#FAF8F5] p-7 sm:p-9 overflow-hidden transition-all duration-500"
      >
        {/* Multi-layered Realistic Ambient Shadows */}
        <div
          className={`absolute -inset-0.5 rounded-[30px] transition-all duration-500 -z-10 pointer-events-none ${
            isHovered
              ? "opacity-100 shadow-[0_30px_70px_-15px_rgba(28,25,23,0.18),0_15px_30px_-10px_rgba(28,25,23,0.1)]"
              : "opacity-80 shadow-[0_15px_35px_-10px_rgba(28,25,23,0.08),0_5px_15px_-5px_rgba(28,25,23,0.04)]"
          }`}
        />

        {/* Archival Paper Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Subtle Signature Society Color Wash Bleed */}
        <div
          className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${data.color} 0%, transparent 65%)`,
          }}
        />

        {/* Top Foil Colored Accent Stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
          style={{ backgroundColor: data.color }}
        />

        {/* Inner Border Bevel Light */}
        <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/70 pointer-events-none" />

        {/* 1. POSTER HEADER: SECTOR STAMP & ARCHIVAL NUMBER */}
        <div className="relative z-10 flex items-center justify-between border-b border-stone-300/70 pb-4 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full ring-2 ring-offset-1"
              style={{
                backgroundColor: data.color,
                boxShadow: `0 0 8px ${data.color}`,
              }}
            />
            <span className="font-bold text-ink tracking-wider">
              SECTOR [{data.num}]
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-stone-400">PLATE NO.</span>
            <span className="font-semibold text-ink">
              CC-{data.slug.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 2. CENTERPIECE: 3D VECTOR OBJECT MINIATURE WITH SUBTLE DEPTH */}
        <div className="relative z-10 my-4 sm:my-6 h-44 sm:h-52 w-full flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 0.95,
              rotateY: isHovered ? 15 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full h-full flex items-center justify-center drop-shadow-[0_12px_24px_rgba(28,25,23,0.12)]"
          >
            <Society3DVectorObject
              society={activeSociety}
              isActive={isHovered}
              progress={isHovered ? 1 : 0.8}
              isReducedMotion={false}
            />
          </motion.div>
        </div>

        {/* 3. POSTER TITLE, TAGLINE & SYNOPSIS */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider"
              style={{
                color: data.color,
                backgroundColor: `${data.color}14`,
                border: `1px solid ${data.color}30`,
              }}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>{data.society}</span>
            </span>

            <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
              EST. {data.founded}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-ink group-hover:text-stone-800 transition-colors tracking-tight leading-tight">
              {data.discipline}
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-stone-600 leading-snug">
              &ldquo;{data.tagline}&rdquo;
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 pt-1">
            {data.description}
          </p>
        </div>

        {/* 4. POSTER FOOTER: HAIRLINE METADATA TABLE & DOSSIER LINK */}
        <div className="relative z-10 pt-5 mt-5 border-t border-stone-300/80 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-3 text-[11px] text-ink-muted">
            <span className="font-semibold text-ink">{data.members}</span>
            <span className="text-stone-400">CAMPUS ARTISTS</span>
          </div>

          <Link
            href={`/societies/${data.slug}`}
            className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 bg-[#FAF8F5] text-ink text-xs uppercase tracking-wider font-semibold shadow-2xs hover:bg-ink hover:text-canvas hover:border-ink transition-all duration-200"
          >
            <span>Open Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface FloatingSocietiesGalleryProps {
  societies?: (ISociety | any)[];
}

export function FloatingSocietiesGallery({
  societies = [],
}: FloatingSocietiesGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map backend societies by slug if provided
  const societyModelMap = new Map(societies.map((s) => [s.slug, s]));

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 sm:py-12"
      style={{ perspective: "1600px" }}
    >
      {/* Organic Asymmetrical Overlapping Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
        {SOCIETIES_DATA.map((item, idx) => {
          const societyModel = societyModelMap.get(item.slug);

          return (
            <div
              key={item.num}
              style={{
                marginTop: `${item.yOffset}px`,
              }}
              className="relative"
            >
              <FloatingPosterCard
                data={item}
                index={idx}
                scrollYProgress={scrollYProgress}
                societyModel={societyModel}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
