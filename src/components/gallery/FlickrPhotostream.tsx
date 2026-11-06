"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Maximize2, ExternalLink, Check, Share2 } from "lucide-react";
import { TrimmedPhoto } from "@/lib/flickr/schemas";
import GalleryLightbox from "./GalleryLightbox";

interface FlickrPhotostreamProps {
  photos: TrimmedPhoto[];
  title?: string;
  subtitle?: string;
  isLiveFlickr?: boolean;
  totalCount?: number;
  showToolbar?: boolean;
  defaultRowHeight?: number;
}

export default function FlickrPhotostream({
  photos,
  title,
  subtitle,
  isLiveFlickr = true,
  totalCount,
  showToolbar = true,
  defaultRowHeight = 290,
}: FlickrPhotostreamProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic natural ratio map for images that didn't report dimensions from API
  const [naturalRatios, setNaturalRatios] = useState<Record<string, number>>({});

  // Container width observation for mathematical Flickr justified layout & zoom immunity
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const measureWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        if (w > 0) setContainerWidth(w);
      }
    };
    measureWidth();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect && entry.contentRect.width > 0) {
            setContainerWidth(Math.floor(entry.contentRect.width));
          }
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", measureWidth);
    return () => {
      window.removeEventListener("resize", measureWidth);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const rowHeight = defaultRowHeight;
  // Flush gap spacing: tight, seamless 3px Flickr margin
  const numericGap = 3;

  // Mathematical Justified Layout Calculation
  // Preserves 100% of original image aspect ratio with zero cropping and browser zoom immunity
  const justifiedRows = useMemo(() => {
    if (!photos || photos.length === 0) return [];

    const effectiveWidth = containerWidth > 0 ? containerWidth : 1280;
    const rows: Array<{
      items: Array<{
        photo: TrimmedPhoto;
        index: number;
        width: number;
        height: number;
        ratio: number;
      }>;
      rowHeight: number;
    }> = [];

    let currentRow: Array<{ photo: TrimmedPhoto; index: number; ratio: number }> = [];
    let currentRowRatioSum = 0;

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const naturalRatio = naturalRatios[photo.id];
      const ratio =
        naturalRatio ||
        (photo.width && photo.height && photo.width > 0 && photo.height > 0
          ? photo.width / photo.height
          : 1.5);

      currentRow.push({ photo, index: i, ratio });
      currentRowRatioSum += ratio;

      const rowGaps = (currentRow.length - 1) * numericGap;
      const estimatedWidth = currentRowRatioSum * rowHeight + rowGaps;

      if (estimatedWidth >= effectiveWidth) {
        // Compute exact row height that guarantees the row occupies 100% container width
        const exactHeight = Math.max(
          120,
          Math.min(
            Math.round(rowHeight * 1.6),
            Math.round((effectiveWidth - rowGaps) / currentRowRatioSum)
          )
        );

        let usedWidth = 0;
        const items = currentRow.map((item, idx) => {
          let itemWidth: number;
          if (idx === currentRow.length - 1) {
            itemWidth = effectiveWidth - rowGaps - usedWidth;
          } else {
            itemWidth = Math.round(exactHeight * item.ratio);
            usedWidth += itemWidth;
          }
          return {
            photo: item.photo,
            index: item.index,
            width: Math.max(30, itemWidth),
            height: exactHeight,
            ratio: item.ratio,
          };
        });

        rows.push({ items, rowHeight: exactHeight });
        currentRow = [];
        currentRowRatioSum = 0;
      }
    }

    // Remainder items in the last row
    if (currentRow.length > 0) {
      const rowGaps = (currentRow.length - 1) * numericGap;
      const potentialHeight = (effectiveWidth - rowGaps) / currentRowRatioSum;

      // In Flickr, if the remainder doesn't fill the row (height would blow up > 1.35x),
      // we maintain rowHeight so the photos remain at natural scale without stretching!
      if (potentialHeight > rowHeight * 1.35) {
        const items = currentRow.map((item) => ({
          photo: item.photo,
          index: item.index,
          width: Math.round(rowHeight * item.ratio),
          height: rowHeight,
          ratio: item.ratio,
        }));
        rows.push({ items, rowHeight });
      } else {
        const exactHeight = Math.max(
          120,
          Math.min(Math.round(rowHeight * 1.6), Math.round(potentialHeight))
        );
        let usedWidth = 0;
        const items = currentRow.map((item, idx) => {
          let itemWidth: number;
          if (idx === currentRow.length - 1) {
            itemWidth = effectiveWidth - rowGaps - usedWidth;
          } else {
            itemWidth = Math.round(exactHeight * item.ratio);
            usedWidth += itemWidth;
          }
          return {
            photo: item.photo,
            index: item.index,
            width: Math.max(30, itemWidth),
            height: exactHeight,
            ratio: item.ratio,
          };
        });
        rows.push({ items, rowHeight: exactHeight });
      }
    }

    return rows;
  }, [photos, containerWidth, rowHeight, numericGap, naturalRatios]);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleImageLoad = useCallback((id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      const ratio = img.naturalWidth / img.naturalHeight;
      setNaturalRatios((prev) => {
        if (prev[id] && Math.abs(prev[id] - ratio) < 0.01) return prev;
        return { ...prev, [id]: ratio };
      });
    }
  }, []);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={photos}
        currentIndex={currentPhotoIndex}
        onIndexChange={setCurrentPhotoIndex}
        albumTitle={title}
      />

      {/* Flickr Control Bar: Clean, Minimal, Justified & Flush */}
      {showToolbar && (
        <div className="w-full bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          {/* Left: Stream Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                {isLiveFlickr ? "FLICKR PHOTOSTREAM" : "ARCHIVAL PHOTOSTREAM"}
              </span>
            </div>

            <span className="text-stone-300">•</span>

            <span className="font-mono text-xs text-ink-muted">
              {totalCount || photos.length} PHOTOGRAPHS
            </span>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors shadow-2xs cursor-pointer"
              title="Copy photostream link"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer"
              title="Launch Full Lightbox Exhibition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Slideshow</span>
            </button>
          </div>
        </div>
      )}

      {/* Signature Flickr Justified & Flush Layout (Default & Only Setting) */}
      <div
        ref={containerRef}
        className="w-full flex flex-col select-none overflow-hidden"
        style={{ gap: `${numericGap}px` }}
      >
        {justifiedRows.length > 0 ? (
          justifiedRows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex items-center justify-start w-full overflow-hidden"
              style={{
                height: `${row.rowHeight}px`,
                gap: `${numericGap}px`,
              }}
            >
              {row.items.map((item) => (
                <div
                  key={item.photo.id}
                  onClick={() => openLightbox(item.index)}
                  className="group relative overflow-hidden bg-stone-900 cursor-pointer rounded-xs transition-transform duration-200 ease-out flex-shrink-0"
                  style={{
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    aspectRatio: `${item.ratio}`,
                  }}
                >
                  <Image
                    src={item.photo.displayUrl || item.photo.thumbnailUrl}
                    alt={item.photo.title || `Photograph ${item.index + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    onLoad={(e) => handleImageLoad(item.photo.id, e)}
                    priority={item.index < 8}
                  />

                  {/* Flickr Signature Hover Vignette & Metadata Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 pointer-events-none">
                    {/* Top: Index Badge & Quick Actions */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-semibold tracking-wider shadow-sm">
                        #{String(item.index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(item.index);
                          }}
                          className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors cursor-pointer"
                          title="Fullscreen Lightbox"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={item.photo.fullUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors cursor-pointer"
                          title="Open Original High-Res"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Bottom: Clean Title & Attribution */}
                    <div className="space-y-0.5 pointer-events-auto text-left">
                      <h3 className="font-sans text-sm font-semibold text-white drop-shadow truncate">
                        {item.photo.title || `Photograph ${item.index + 1}`}
                      </h3>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-stone-300">
                        <span>AMS IIITA</span>
                        <span>•</span>
                        <span>
                          {item.photo.width && item.photo.height
                            ? `${item.photo.width}×${item.photo.height}`
                            : "Original Ratio"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="py-20 text-center font-mono text-sm text-stone-400">
            Loading photographic ledger...
          </div>
        )}
      </div>
    </div>
  );
}
