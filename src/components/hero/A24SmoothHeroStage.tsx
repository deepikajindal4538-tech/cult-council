"use client";

import React, { useRef, useState, useEffect } from "react";
import { ISociety } from "@/models/Society";
import { Society3DVectorObject } from "./Society3DVectorObject";

interface A24SmoothHeroStageProps {
  societies: (ISociety | any)[];
  progress: number;
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
}

export function A24SmoothHeroStage({
  societies,
  progress,
  activeIndex,
  onSelectIndex,
}: A24SmoothHeroStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = societies.length;

  // Responsive push distance calculation - shifted further right
  const [dimensions, setDimensions] = useState({
    pushX: 420,
    nameShiftX: 180,
    isMobile: false,
    width: 1440,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ pushX: 85, nameShiftX: 35, isMobile: true, width: w });
      } else if (w < 768) {
        setDimensions({ pushX: 110, nameShiftX: 50, isMobile: true, width: w });
      } else if (w < 1024) {
        setDimensions({ pushX: 250, nameShiftX: 110, isMobile: false, width: w });
      } else if (w < 1366) {
        setDimensions({ pushX: 350, nameShiftX: 150, isMobile: false, width: w });
      } else {
        setDimensions({ pushX: 420, nameShiftX: 180, isMobile: false, width: w });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { pushX, nameShiftX, isMobile, width } = dimensions;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* Dynamic trajectory stage */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {societies.map((soc, idx) => {
          const rawDelta = idx - progress;

          // Sequential non-overlapping timeline:
          // A society is only rendered during its own entry, dwell, and exit cycle.
          // rawDelta > 0.45: Not yet entering (completely hidden)
          // rawDelta < -0.65: Fully exited (completely unmounted)
          if (rawDelta > 0.45 || rawDelta < -0.65) {
            return null;
          }

          const isCurrent = Math.abs(rawDelta) < 0.35;
          const zIndex = 20;

          const isClapboard =
            soc.objectConfig?.type === "clapboard" ||
            soc.slug === "rangtarangini" ||
            soc.name?.toLowerCase().includes("rangtarangini");

          const isAms = soc.slug === "ams" || soc.name?.toLowerCase().includes("acoustics");

          const displayName = isAms ? "THUNDERBOLT AMS" : (soc.name || "").toUpperCase();

          const isLongName =
            displayName.length > 9 || soc.slug === "rangtarangini" || isAms;

          // Extra rightward shift for clapboard and camera (Thunderbolt AMS) to provide 100% clearance for long names
          const itemBonus = (isClapboard || isAms) ? (isMobile ? 40 : width < 1366 ? 85 : 125) : 0;
          const itemPushX = pushX + itemBonus;

          // Extra leftward shift for long watermark names (e.g. THUNDERBOLT AMS, RANGTARANGINI)
          const nameBonus = isLongName ? (isMobile ? 15 : 40) : 0;
          const itemNameShiftX = nameShiftX + nameBonus;

          // Phase Calculations:
          // 1. Top-Right Incoming (0.15 < rawDelta <= 0.45): Icon swoops in from far top-right corner to center (0,0)
          // 2. Push & Reveal (0 <= rawDelta <= 0.15): Name unfolds to the left, pushing icon rightwards to (+itemPushX)
          // 3. Dwell (-0.35 <= rawDelta < 0): Settled position (name left, icon right)
          // 4. Exit to Bottom-Left (-0.65 <= rawDelta < -0.35): Drifts down towards bottom-left and dissolves to 0

          let iconX = 0;
          let iconY = 0;
          let iconScale = 1;
          let iconOpacity = 1;
          let iconRotateZ = 0;

          let nameX = 0;
          let nameY = 0;
          let nameOpacity = 0;
          let nameScale = 0.85;

          let rowX = 0;
          let rowY = 0;
          let rowOpacity = 1;
          let rowScale = 1;

          if (rawDelta > 0.15) {
            // PHASE 1: Incoming from FAR TOP-RIGHT CORNER towards screen center (0, 0)
            const entry = Math.min(1, Math.max(0, (0.45 - rawDelta) / 0.30));
            const easeEntry = Math.sin(entry * Math.PI * 0.5);

            // Perched far up in the top-right corner (never touches center until easeEntry approaches 1)
            const startX = itemPushX + (isMobile ? 260 : 480);
            const startY = -(isMobile ? 200 : 360);

            iconX = (1 - easeEntry) * startX;
            iconY = (1 - easeEntry) * startY;
            iconScale = 0.55 + 0.45 * easeEntry;
            iconOpacity = Math.min(1, easeEntry * 1.5);
            iconRotateZ = (1 - easeEntry) * 16;

            // Watermark name is completely hidden while icon swoops in from top-right
            nameX = 0;
            nameY = 0;
            nameOpacity = 0;
            nameScale = 0.85;
          } else if (rawDelta >= 0) {
            // PHASE 2: Push & Reveal (0 <= rawDelta <= 0.15)
            // Icon is in center stage; full society name unfolds to the left, pushing icon rightwards
            const pushRatio = (0.15 - rawDelta) / 0.15;
            const easePush = 1 - Math.pow(1 - pushRatio, 3); // smooth cubic-out push

            // Icon is pushed rightwards from center (0) to (+itemPushX)
            iconX = easePush * itemPushX;
            iconY = 0;
            iconScale = 1;
            iconOpacity = 1;
            iconRotateZ = 0;

            // Full society name emerges from behind the icon towards the left (-itemNameShiftX)
            nameX = -easePush * itemNameShiftX;
            nameY = 0;
            nameOpacity = easePush * 0.14;
            nameScale = 0.88 + 0.12 * easePush;
          } else if (rawDelta >= -0.35) {
            // PHASE 3: Dwell (-0.35 <= rawDelta < 0)
            iconX = itemPushX;
            iconY = 0;
            iconScale = 1;
            iconOpacity = 1;
            iconRotateZ = 0;

            nameX = -itemNameShiftX;
            nameY = 0;
            nameOpacity = 0.14;
            nameScale = 1;
          } else {
            // PHASE 4: Exit towards EXTREME LEFT (-0.65 <= rawDelta < -0.35)
            // Sends the current icon sweeping all the way across to the extreme left offscreen
            const exitRatio = Math.min(1, Math.max(0, (-rawDelta - 0.35) / 0.30));
            const easeExit = exitRatio * exitRatio;

            const sweepLeft = easeExit * (isMobile ? 700 : 1500);
            iconX = itemPushX - sweepLeft;
            iconY = easeExit * (isMobile ? 40 : 80);
            iconScale = Math.max(0.65, 1 - exitRatio * 0.35);
            iconOpacity = Math.max(0, 1 - exitRatio * 1.35);
            iconRotateZ = -easeExit * 20;

            nameX = -itemNameShiftX - easeExit * (isMobile ? 350 : 700);
            nameY = easeExit * (isMobile ? 40 : 80);
            nameOpacity = Math.max(0, 0.14 * (1 - exitRatio * 1.4));
            nameScale = Math.max(0.7, 1 - exitRatio * 0.3);

            rowX = 0;
            rowY = 0;
            rowOpacity = 1;
            rowScale = 1;
          }

          return (
            <div
              key={soc.slug || idx}
              onClick={() => onSelectIndex?.(idx)}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              style={{
                zIndex,
                transform: `translate3d(${rowX.toFixed(1)}px, ${rowY.toFixed(1)}px, 0px) scale(${rowScale.toFixed(3)})`,
                opacity: Math.min(1, Math.max(0, rowOpacity)),
                willChange: "transform, opacity",
                pointerEvents: isCurrent ? "auto" : "none",
              }}
            >
              {/* 1. Full Society Name Watermark Typography: Emerges from behind icon to the left */}
              <div
                className={`absolute pointer-events-none -z-10 flex flex-col items-center justify-center text-center ${
                  isLongName
                    ? "max-w-2xl sm:max-w-3xl lg:max-w-5xl px-2"
                    : "max-w-xl sm:max-w-2xl lg:max-w-4xl px-4"
                }`}
                style={{
                  transform: `translate3d(${nameX.toFixed(1)}px, ${nameY.toFixed(1)}px, 0px) scale(${nameScale.toFixed(3)})`,
                  opacity: Math.min(0.25, Math.max(0, nameOpacity)),
                  willChange: "transform, opacity",
                }}
              >
                <span
                  className={`font-serif font-black whitespace-nowrap leading-[0.88] tracking-tighter text-stone-900 select-none uppercase ${
                    isLongName
                      ? "text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl"
                      : "text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                  }`}
                >
                  {displayName}
                </span>
              </div>

              {/* 2. Decreased Size 3D Vector Icon: Enters first at center, pushed rightwards */}
              <div
                className="relative w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] md:w-[310px] md:h-[310px] lg:w-[340px] lg:h-[340px] flex items-center justify-center shrink-0 z-20 cursor-pointer"
                style={{
                  transform: `translate3d(${iconX.toFixed(1)}px, ${iconY.toFixed(1)}px, 0px) scale(${iconScale.toFixed(3)}) rotate(${iconRotateZ.toFixed(1)}deg)`,
                  opacity: Math.min(1, Math.max(0, iconOpacity)),
                  willChange: "transform, opacity",
                }}
              >
                <Society3DVectorObject
                  society={soc}
                  isActive={isCurrent}
                  progress={isCurrent ? 1 : Math.max(0, 1 - Math.abs(rawDelta))}
                  globalProgress={progress / (n - 1 || 1)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
