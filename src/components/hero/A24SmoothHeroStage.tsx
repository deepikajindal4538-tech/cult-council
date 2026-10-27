"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { ISociety } from "@/models/Society";
import { SocietyObject } from "./SocietyObject";

interface A24SmoothHeroStageProps {
  societies: (ISociety | any)[];
  onIndexChange?: (index: number) => void;
  targetIndex?: number;
  externalProgress?: number;
}

export function A24SmoothHeroStage({
  societies,
  onIndexChange,
  targetIndex,
  externalProgress,
}: A24SmoothHeroStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = societies.length;

  const stateRef = useRef({
    currentProgress: 0,
    targetProgress: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartProgress: 0,
    velocity: 0,
    lastPointerX: 0,
    lastPointerTime: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [renderProgress, setRenderProgress] = useState(0);

  // Sync target index changes (e.g. from Index dropdown or clicks)
  useEffect(() => {
    if (targetIndex !== undefined) {
      stateRef.current.targetProgress = targetIndex;
    }
  }, [targetIndex]);

  // Sync external scroll progress from page scroll
  useEffect(() => {
    if (externalProgress !== undefined && !stateRef.current.isDragging) {
      stateRef.current.targetProgress = externalProgress * (n - 1);
    }
  }, [externalProgress, n]);

  const notifyIndexChange = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      if (onIndexChange) onIndexChange(idx);
    },
    [onIndexChange]
  );

  // 60/120 FPS High-Performance Smooth Animation Loop with Lerp & Momentum
  useEffect(() => {
    let animId: number;
    let lastReported = -1;

    const tick = () => {
      animId = requestAnimationFrame(tick);

      const s = stateRef.current;

      // Smooth damped lerp toward target progress
      const diff = s.targetProgress - s.currentProgress;
      s.currentProgress += diff * 0.085;

      // Update render state when difference is visible
      if (Math.abs(diff) > 0.0001 || s.isDragging) {
        setRenderProgress(s.currentProgress);

        const currentActive = Math.min(n - 1, Math.max(0, Math.round(s.currentProgress)));
        if (currentActive !== lastReported) {
          lastReported = currentActive;
          notifyIndexChange(currentActive);
        }
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [n, notifyIndexChange]);

  // Pointer & Wheel Interaction for buttery smooth navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Small delta for silky scroll
      const delta = (e.deltaY + e.deltaX) * 0.0018;
      stateRef.current.targetProgress = Math.min(
        n - 1 + 0.3,
        Math.max(-0.3, stateRef.current.targetProgress + delta)
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartY = e.clientY;
      stateRef.current.dragStartProgress = stateRef.current.targetProgress;
      stateRef.current.lastPointerX = e.clientX;
      stateRef.current.lastPointerTime = performance.now();
      stateRef.current.velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;

      const now = performance.now();
      const dt = Math.max(1, now - stateRef.current.lastPointerTime);
      const dx = e.clientX - stateRef.current.lastPointerX;
      stateRef.current.velocity = dx / dt;
      stateRef.current.lastPointerX = e.clientX;
      stateRef.current.lastPointerTime = now;

      // Combined diagonal drag vector (top-right to bottom-left)
      const totalDx = e.clientX - stateRef.current.dragStartX;
      const totalDy = e.clientY - stateRef.current.dragStartY;
      const dragDistance = totalDx - totalDy; // along diagonal
      const progressDelta = -dragDistance / 420;

      stateRef.current.targetProgress = Math.min(
        n - 1 + 0.4,
        Math.max(-0.4, stateRef.current.dragStartProgress + progressDelta)
      );
    };

    const onPointerUp = () => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;

      // Apply flick momentum
      const flickBoost = -stateRef.current.velocity * 0.25;
      const finalTarget = Math.min(
        n - 1,
        Math.max(0, Math.round(stateRef.current.targetProgress + flickBoost))
      );

      stateRef.current.targetProgress = finalTarget;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [n]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "none" }}
    >
      {/* Dynamic trajectory stage */}
      <div className="relative w-full h-full flex items-center justify-center">
        {societies.map((soc, idx) => {
          const delta = idx - renderProgress;

          // Optimization: completely skip elements far outside visible range
          if (Math.abs(delta) > 2.2) {
            return null;
          }

          const isCurrent = Math.abs(delta) < 0.45;

          // EXACT TRAJECTORY REQUESTED BY USER:
          // Arrive from Top-Right (delta > 0) -> Center Stage (delta = 0) -> Dissolve in Bottom-Left (delta < 0)
          
          // X Position:
          // When delta > 0 (upcoming from right): x is positive (rightwards)
          // When delta = 0 (center): x is 0
          // When delta < 0 (past toward left): x is negative (leftwards)
          const x = delta * 390 + Math.pow(delta, 2) * 25;

          // Y Position:
          // When delta > 0 (top-right): y is negative (upwards)
          // When delta = 0 (center): y is 0
          // When delta < 0 (bottom-left): y is positive (downwards)
          const y = -delta * 230 + Math.pow(delta, 2) * 20;

          // Scale:
          // Center is prominent (1.05 to 1.1)
          // Top-right arrives at ~0.8
          // Bottom-left dissolves at ~0.55
          const scale = Math.max(
            0.5,
            1.05 - Math.abs(delta) * 0.24 - (delta < 0 ? Math.abs(delta) * 0.1 : 0)
          );

          // Opacity / Dissolve:
          // Top-Right enters with smooth fade-in
          // Center is 1.0
          // Bottom-Left DISSOLVES rapidly (opacity -> 0)
          let opacity = 1;
          if (delta < 0) {
            // Dissolving in bottom-left area
            opacity = Math.max(0, 1 - Math.abs(delta) * 0.95);
          } else if (delta > 0) {
            // Entering from top-right
            opacity = Math.max(0, 1 - (delta - 0.3) * 0.85);
          }

          // Dynamic Angular Tilt along the diagonal trajectory
          const rotateZ = delta * 14;

          // Z-Index: center has highest priority
          const zIndex = Math.round(20 - Math.abs(delta) * 8);

          return (
            <div
              key={soc.slug || idx}
              onClick={() => {
                stateRef.current.targetProgress = idx;
              }}
              className="absolute flex items-center justify-center transition-opacity"
              style={{
                transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) scale(${scale.toFixed(3)}) rotate(${rotateZ.toFixed(1)}deg)`,
                opacity: Math.min(1, Math.max(0, opacity)),
                zIndex,
                willChange: "transform, opacity",
                pointerEvents: isCurrent ? "auto" : "none",
              }}
            >
              <div className="w-72 sm:w-96 md:w-[440px] h-72 sm:h-96 md:h-[440px] flex items-center justify-center">
                <SocietyObject
                  society={soc}
                  isActive={isCurrent}
                  progress={isCurrent ? 1 : Math.max(0, 1 - Math.abs(delta))}
                  globalProgress={renderProgress / (n - 1 || 1)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
