"use client";

import React, { useState, useEffect } from "react";

interface FestivalCountdownProps {
  targetDate?: Date;
}

interface DynamicCountdownConfig {
  targetDate: string;
  stageEyebrow: string;
  festivalSubtitle: string;
  edition: string;
  isLive: boolean;
}

const DEFAULT_CONFIG: DynamicCountdownConfig = {
  targetDate: "2027-02-01T00:00:00.000Z",
  stageEyebrow: "COUNTDOWN TO FEBRUARY // ARENA STAGE",
  festivalSubtitle: "PRO-NIGHT IGNITION",
  edition: "Edition 22",
  isLive: true,
};

export function FestivalCountdown({ targetDate }: FestivalCountdownProps) {
  const [config, setConfig] = useState<DynamicCountdownConfig>(DEFAULT_CONFIG);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [mounted, setMounted] = useState(false);

  // Sync dynamic countdown settings from admin API
  useEffect(() => {
    let isMounted = true;
    fetch("/api/public/countdown")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        const cfg = data?.config || data;
        if (isMounted && cfg && typeof cfg.targetDate === "string") {
          setConfig({
            targetDate: cfg.targetDate,
            stageEyebrow: cfg.headerTag || cfg.stageEyebrow || DEFAULT_CONFIG.stageEyebrow,
            festivalSubtitle: cfg.subtitleTag || cfg.festivalSubtitle || DEFAULT_CONFIG.festivalSubtitle,
            edition: cfg.edition || DEFAULT_CONFIG.edition,
            isLive: typeof cfg.enabled === "boolean" ? cfg.enabled : true,
          });
        }
      })
      .catch((err) => {
        console.debug("Dynamic countdown sync fallback:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date();

      let target: Date;
      if (targetDate) {
        target = targetDate;
      } else if (config.targetDate) {
        target = new Date(config.targetDate);
        if (isNaN(target.getTime())) {
          // Fallback if parsing fails
          let targetYear = now.getFullYear();
          if (now.getMonth() >= 1) targetYear += 1;
          target = new Date(targetYear, 1, 1, 0, 0, 0);
        }
      } else {
        let targetYear = now.getFullYear();
        if (now.getMonth() >= 1) targetYear += 1;
        target = new Date(targetYear, 1, 1, 0, 0, 0);
      }

      const diff = Math.max(0, target.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate, config.targetDate]);

  if (!config.isLive) {
    return null;
  }

  if (!mounted) {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-2xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-amber-900">
              {config.stageEyebrow}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
            {config.festivalSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          {["DAYS", "HOURS", "MINUTES", "SECONDS"].map((unit) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF8F5] border border-stone-200/70"
            >
              <span className="font-mono text-xl sm:text-3xl font-bold tracking-tight text-stone-300">
                --
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 mt-0.5">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-stone-200/90 shadow-2xs transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-amber-900">
            {config.stageEyebrow}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
          {config.festivalSubtitle}
        </span>
      </div>

      {/* Numerical Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {/* Days */}
        <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF8F5] border border-stone-200/70">
          <span className="font-mono text-xl sm:text-3xl font-bold tracking-tight text-ink tabular-nums">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">
            DAYS
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF8F5] border border-stone-200/70">
          <span className="font-mono text-xl sm:text-3xl font-bold tracking-tight text-ink tabular-nums">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">
            HOURS
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF8F5] border border-stone-200/70">
          <span className="font-mono text-xl sm:text-3xl font-bold tracking-tight text-ink tabular-nums">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">
            MINUTES
          </span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-50/50 border border-amber-200/80">
          <span className="font-mono text-xl sm:text-3xl font-bold tracking-tight text-amber-800 tabular-nums">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-800/80 mt-0.5 font-semibold">
            SECONDS
          </span>
        </div>
      </div>
    </div>
  );
}
