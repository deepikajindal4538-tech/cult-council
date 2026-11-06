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

  // Responsive push distance calculation
  const [dimensions, setDimensions] = useState({ pushX: 200, nameShiftX: 200, isMobile: false });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDimensions({ pushX: 45, nameShiftX: 45, isMobile: true });
      } else if (w < 1024) {
        setDimensions({ pushX: 140, nameShiftX: 140, isMobile: false });
      } else {
        setDimensions({ pushX: 210, nameShiftX: 210, isMobile: false });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { pushX, nameShiftX } = dimensions;

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

          // Strictly show only the current active society's window to completely prevent any icon overlap
          if (Math.abs(rawDelta) > 0.5) {
            return null;
          }

          const isCurrent = Math.abs(rawDelta) < 0.3;
          const zIndex = 20;

          // Phase Calculations within the [-0.5, 0.5] range:
          // 1. Incoming Phase (0.15 < rawDelta <= 0.5): Icon flies into center stage alone, name is hidden
          // 2. Push & Reveal Phase (0 <= rawDelta <= 0.15): Full society name unfolds from behind icon to left, pushing icon rightwards
          // 3. Dwell Phase (-0.2 <= rawDelta < 0): Full society name sits on left, icon on right
          // 4. Exit Phase (-0.5 <= rawDelta < -0.2): Dissolves towards bottom-left with zero overlap

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
            // PHASE 1: Incoming from top-right towards center (0, 0)
            const entry = Math.min(1, Math.max(0, (0.5 - rawDelta) / 0.35));
            const easeEntry = Math.sin(entry * Math.PI * 0.5);

            const startX = 280;
            const startY = -180;
            iconX = (1 - easeEntry) * startX;
            iconY = -(1 - easeEntry) * startY;
            iconScale = 0.75 + 0.25 * easeEntry;
            iconOpacity = Math.min(1, easeEntry * 1.4);
            iconRotateZ = (1 - easeEntry) * 12;

            // Name is completely hidden directly behind incoming icon
            nameX = 0;
            nameY = 0;
            nameOpacity = 0;
            nameScale = 0.85;
          } else if (rawDelta >= 0) {
            // PHASE 2: Push & Reveal (0 <= rawDelta <= 0.15)
            // Full society name emerges from behind the icon to the left, pushing the icon rightwards!
            const pushRatio = (0.15 - rawDelta) / 0.15;
            const easePush = 1 - Math.pow(1 - pushRatio, 3); // smooth cubic-out push

            // Icon is pushed rightwards from center (0) to (+pushX)
            iconX = easePush * pushX;
            iconY = 0;
            iconScale = 1;
            iconOpacity = 1;
            iconRotateZ = 0;

            // Full society name emerges from behind the icon towards the left (-nameShiftX)
            nameX = -easePush * nameShiftX;
            nameY = 0;
            nameOpacity = easePush * 0.14;
            nameScale = 0.88 + 0.12 * easePush;
          } else if (rawDelta >= -0.2) {
            // PHASE 3: Dwell (Both fully revealed and resting in place)
            iconX = pushX;
            iconY = 0;
            iconScale = 1;
            iconOpacity = 1;
            iconRotateZ = 0;

            nameX = -nameShiftX;
            nameY = 0;
            nameOpacity = 0.14;
            nameScale = 1;
          } else {
            // PHASE 4: Exit towards bottom-left (-0.5 <= rawDelta < -0.2)
            const exitRatio = Math.min(1, Math.max(0, (-rawDelta - 0.2) / 0.3));
            const easeExit = exitRatio * exitRatio;

            rowX = -easeExit * 260;
            rowY = easeExit * 150;
            rowOpacity = Math.max(0, 1 - exitRatio);
            rowScale = Math.max(0.75, 1 - exitRatio * 0.25);

            iconX = pushX;
            iconY = 0;
            iconScale = 1;
            iconOpacity = 1;
            iconRotateZ = -easeExit * 6;

            nameX = -nameShiftX;
            nameY = 0;
            nameOpacity = 0.14;
            nameScale = 1;
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
                className="absolute pointer-events-none -z-10 flex flex-col items-center justify-center text-center max-w-xl sm:max-w-2xl lg:max-w-4xl px-4"
                style={{
                  transform: `translate3d(${nameX.toFixed(1)}px, ${nameY.toFixed(1)}px, 0px) scale(${nameScale.toFixed(3)})`,
                  opacity: Math.min(0.25, Math.max(0, nameOpacity)),
                  willChange: "transform, opacity",
                }}
              >
                <span className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.88] tracking-tighter text-stone-900 select-none uppercase">
                  {soc.name}
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
