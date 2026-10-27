"use client";

import { ISociety } from "@/models/Society";

/**
 * Procedurally generates high-resolution 1024x1024 disc face textures
 * with physical media details (outer rim, inner spindle ring, typographic artwork,
 * grooved tracks, and authentic society details) matching the A24 physical disc aesthetic.
 */
export function createDiscTexture(society: ISociety | any): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const cx = 512;
  const cy = 512;
  const r = 500;

  // 1. Base Disc Disc Face Fill
  const gradient = ctx.createRadialGradient(cx, cy, 50, cx, cy, r);
  gradient.addColorStop(0, "#EAE7DF");
  gradient.addColorStop(0.3, "#F4F1EA");
  gradient.addColorStop(0.85, "#DFDAD0");
  gradient.addColorStop(1, "#C8C2B5");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // 2. Society Thematic Backdrop Artwork
  const slug = society.slug;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
  ctx.clip();

  if (slug === "ams") {
    // Vintage Camera Optics / Darkroom Sepia Tone
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, "#2B2117");
    bgGrad.addColorStop(0.5, "#4A3B2C");
    bgGrad.addColorStop(1, "#1A140E");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Aperture Blades Geometry
    ctx.strokeStyle = "rgba(217, 119, 6, 0.4)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 120, cy + Math.sin(angle) * 120);
      ctx.lineTo(cx + Math.cos(angle + 0.8) * 440, cy + Math.sin(angle + 0.8) * 440);
      ctx.stroke();
    }
  } else if (slug === "geneticx") {
    // High-Voltage Magenta / Deep Crimson Dance Stage
    const bgGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, 500);
    bgGrad.addColorStop(0, "#BE123C");
    bgGrad.addColorStop(0.6, "#881337");
    bgGrad.addColorStop(1, "#1E040D");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Disco Shimmer Facet Rays
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, (i * Math.PI) / 12, ((i + 0.5) * Math.PI) / 12);
      ctx.closePath();
      ctx.fill();
    }
  } else if (slug === "sarasva") {
    // Antique Parchment & Deep Indigo Ink
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    bgGrad.addColorStop(0, "#1E1B4B");
    bgGrad.addColorStop(0.4, "#2E1065");
    bgGrad.addColorStop(1, "#0F172A");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Calligraphic Concentric Arcs
    ctx.strokeStyle = "rgba(224, 231, 255, 0.15)";
    ctx.lineWidth = 1.5;
    for (let d = 160; d < 480; d += 28) {
      ctx.beginPath();
      ctx.arc(cx, cy, d, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (slug === "nirmiti") {
    // Fine Arts Ochre / Terracotta / Coral Wash
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, "#C2410C");
    bgGrad.addColorStop(0.5, "#9A3412");
    bgGrad.addColorStop(1, "#2C0F05");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Brush Stroke Impasto Splashes
    ctx.fillStyle = "rgba(255, 237, 213, 0.12)";
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI) / 8;
      ctx.beginPath();
      ctx.ellipse(
        cx + Math.cos(angle) * 260,
        cy + Math.sin(angle) * 260,
        140,
        45,
        angle + 0.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  } else if (slug === "rangtarangini") {
    // Theatrical Dramatic Red / Noir Slate
    const bgGrad = ctx.createRadialGradient(cx, cy, 100, cx, cy, 480);
    bgGrad.addColorStop(0, "#991B1B");
    bgGrad.addColorStop(0.7, "#450A0A");
    bgGrad.addColorStop(1, "#140404");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Dramatic Spotlight Chevron Beams
    ctx.fillStyle = "rgba(254, 226, 226, 0.09)";
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(100, 1024);
    ctx.lineTo(924, 1024);
    ctx.closePath();
    ctx.fill();
  } else if (slug === "virtuosi") {
    // 12" Vinyl Deep Obsidian & Emerald Groove
    const bgGrad = ctx.createRadialGradient(cx, cy, 60, cx, cy, 500);
    bgGrad.addColorStop(0, "#0F766E");
    bgGrad.addColorStop(0.4, "#042F2E");
    bgGrad.addColorStop(1, "#021211");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Microgroove rings
    ctx.strokeStyle = "rgba(204, 251, 241, 0.08)";
    ctx.lineWidth = 1;
    for (let d = 160; d < 480; d += 8) {
      ctx.beginPath();
      ctx.arc(cx, cy, d, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "#1C1917";
    ctx.fillRect(0, 0, 1024, 1024);
  }

  // 3. Typographic Disc Face Artwork (Bold Serif Title & Technical Credits matching A24 discs)
  ctx.fillStyle = "#FAF8F5";
  ctx.textAlign = "center";

  // Large Prominent Title
  ctx.font = "bold 88px Georgia, serif";
  ctx.fillText(society.name.toUpperCase(), cx, cy + 220);

  // Subtitle / Council Monogram
  ctx.font = "bold 28px monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "rgba(250, 248, 245, 0.75)";
  ctx.fillText("IIIT ALLAHABAD // CC", cx, cy + 275);

  // Bottom Category & Edition
  ctx.font = "18px monospace";
  ctx.fillStyle = "rgba(250, 248, 245, 0.55)";
  ctx.fillText(society.category.toUpperCase(), cx, cy + 340);
  ctx.fillText(`ARCHIVAL MEDIA // VOL. ${society.order || "01"}`, cx, cy + 375);

  // Rim Micro-Text (mimicking real CD/DVD copyright edge print)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(250, 248, 245, 0.4)";
  const rimText = `ALL RIGHTS RESERVED • CULTURAL COUNCIL IIIT ALLAHABAD • EST. ${society.stats?.foundedYear || 2004} • COMPACT DISC DIGITAL AUDIO • CATALOGUE CC-${society.slug.toUpperCase()}-2026 • `;
  for (let i = 0; i < rimText.length; i++) {
    const charAngle = (i / rimText.length) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.rotate(charAngle);
    ctx.fillText(rimText[i], 0, -465);
    ctx.restore();
  }
  ctx.restore();

  ctx.restore(); // restore clip

  // 4. Center Clear Acrylic Plastic Ring & Spindle Hole (Key A24 CD detail)
  // Transparent acrylic ring
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(235, 230, 220, 0.85)";
  ctx.fill();
  ctx.strokeStyle = "rgba(180, 175, 165, 0.9)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Spindle bevel ridge
  ctx.beginPath();
  ctx.arc(cx, cy, 80, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(150, 145, 135, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Pure Center Spindle Hole (Cutout)
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(cx, cy, 64, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Spindle rim inner metallic bevel
  ctx.beginPath();
  ctx.arc(cx, cy, 65, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(100, 95, 88, 0.9)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // 5. Outer Beveled Silver Edge Ring
  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(200, 195, 185, 0.95)";
  ctx.lineWidth = 4;
  ctx.stroke();

  return canvas;
}
