"use client";

import React, { useRef } from "react";
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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* Dynamic diagonal trajectory stage */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {societies.map((soc, idx) => {
          const delta = idx - progress;
          const absDelta = Math.abs(delta);

          // Only unmount when far off-screen to avoid abrupt pops during scroll
          if (absDelta > 2.8) {
            return null;
          }

          const isCurrent = absDelta < 0.45;

          // Diagonal Trajectory:
          // Arrive from Top-Right (delta > 0) -> Center Stage (delta = 0) -> Dissolve in Bottom-Left (delta < 0)
          const arc = Math.sin(delta * Math.PI * 0.4) * 24;
          const x = delta * 460 + arc;
          const y = -delta * 280 - arc * 0.6;

          // Scale: Center is prominent (1.06), smoothly falls off in both directions
          const scale = Math.max(
            0.52,
            1.06 - absDelta * 0.24 - (delta < 0 ? delta * delta * 0.05 : 0)
          );

          // Opacity: Center is 1.0, dissolving smoothly in bottom-left, entering from top-right
          let opacity = 1;
          if (delta < 0) {
            opacity = Math.max(0, 1 - Math.pow(absDelta, 1.2) * 0.95);
          } else {
            opacity = Math.max(0, 1 - Math.max(0, delta - 0.2) * 0.9);
          }

          const rotateZ = delta * 12;
          const zIndex = Math.round(20 - absDelta * 8);

          return (
            <div
              key={soc.slug || idx}
              onClick={() => onSelectIndex?.(idx)}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) scale(${scale.toFixed(3)}) rotate(${rotateZ.toFixed(1)}deg)`,
                opacity: Math.min(1, Math.max(0, opacity)),
                zIndex,
                willChange: "transform, opacity",
                pointerEvents: isCurrent ? "auto" : "none",
              }}
            >
              <div className="w-[380px] sm:w-[520px] md:w-[620px] lg:w-[700px] h-[380px] sm:h-[520px] md:h-[620px] lg:h-[700px] flex items-center justify-center">
                <Society3DVectorObject
                  society={soc}
                  isActive={isCurrent}
                  progress={isCurrent ? 1 : Math.max(0, 1 - absDelta)}
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
