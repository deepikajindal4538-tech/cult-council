# IIIT Allahabad Cultural Council — Deployment & Operations Manual

This document details the production deployment, security architecture, environmental configuration, and operational checklist for the **IIIT Allahabad Cultural Council Website**.

---

## 1. System Architecture Overview

- **Framework**: Next.js 14.2 (App Router with React Server Components)
- **Styling**: Tailwind CSS, strict light-theme tokens (`#FAF8F5`, `#F4F1EA`, `#1C1917`)
- **Typography**: Cormorant Garamond (Serif), Outfit (Sans), JetBrains/System Monospace
- **Hero Stage**: Custom 60/120 FPS CSS 3D GPU-composited stage with momentum inertia and `prefers-reduced-motion` compliance
- **Database**: MongoDB (Mongoose ODM) with fallback in-memory seed dataset
- **Gallery Engine**: Server-only read-only Flickr API client with strict allowlisting, Zod schema sanitization, in-memory TTL caching, IP rate limiting, and curated offline fallbacks
- **Hosting Target**: Vercel (Edge-compatible serverless functions)

---

## 2. Environment Variables Checklist

All secrets must remain exclusively on the server. Never prefix sensitive keys with `NEXT_PUBLIC_`.

Create or configure these in your Vercel Project Settings under **Settings → Environment Variables**:

| Variable Name | Required | Description | Example / Fallback |
| :--- | :---: | :--- | :--- |
| `MONGODB_URI` | Recommended | Connection string to MongoDB instance or Atlas cluster | `mongodb+srv://user:pass@cluster.mongodb.net/iiita_council?retryWrites=true&w=majority` |
| `FLICKR_API_KEY` | Optional | Flickr REST API Key (Read-Only access) | `8f92a10b48...` *(If omitted or mock, curated fallback albums are served)* |
| `FLICKR_USER_ID` | Optional | Flickr Account / NSID | `198234821@N05` |
| `NEXT_PUBLIC_APP_URL` | Required | Public canonical domain of the production deployment | `https://culturalcouncil.iiita.ac.in` |

> **Note**: `.env.local` is included in `.gitignore`. Never commit raw API keys to Git.

---

## 3. Pre-Deployment Verification

Before triggering a production build or Git push, run the test and build verification suite locally:

```bash
# 1. Run server-only Flickr wrapper & rate-limiter test suite
npm test

# 2. Verify Next.js production build and static page prerendering (22/22 routes)
npm run build

# 3. Test production build locally
npm run start
```

Expected output:
- `npm test`: **8 passed, 0 failed**
- `npm run build`: **22/22 static pages generated successfully** (Total First Load JS < 150 kB)

---

## 4. Vercel Deployment Instructions

### Option A: Via GitHub Integration (Recommended)
1. Push your repository to GitHub: `git push origin main`
2. Log in to [Vercel Dashboard](https://vercel.com) and click **"New Project"**.
3. Import the repository `council web`.
4. Configure Project Settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `next build` (or `npm run build`)
   - **Output Directory**: `.next` (default)
5. Add the Environment Variables from Section 2 (`MONGODB_URI`, `FLICKR_API_KEY`, `FLICKR_USER_ID`, `NEXT_PUBLIC_APP_URL`).
6. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI if not present
npm i -g vercel

# Link and deploy to production
vercel --prod
```

---

## 5. Security & Compliance Checklist

- [x] **Strict Content-Security-Policy (CSP)**:
  - Default `self` restriction.
  - Hotlinking restricted to `*.staticflickr.com`, `live.staticflickr.com`, and `images.unsplash.com`.
  - Frame ancestors disabled (`frame-ancestors 'none'`) preventing clickjacking.
  - `upgrade-insecure-requests` enabled automatically in production HTTPS.
- [x] **HSTS (HTTP Strict Transport Security)**:
  - `max-age=31536000; includeSubDomains; preload` header sent on production responses.
- [x] **X-Content-Type-Options**: `nosniff` enforced.
- [x] **X-Frame-Options**: `DENY` enforced.
- [x] **Referrer-Policy**: `strict-origin-when-cross-origin`.
- [x] **Rate Limiting**: Sliding-window rate limiter active on all `/api/*` routes per client IP (60 requests/minute).
- [x] **Input Validation**: Zod parsing on all user parameters (`albumId`, `page`, `per_page`) with numeric regex enforcement.
- [x] **HTTP Method Protection**: All mutation methods (`POST`, `PUT`, `DELETE`, `PATCH`) return `405 Method Not Allowed` on gallery API routes.
- [x] **Secrets Hygiene**: Verified `.gitignore` prevents `.env*` leaks. `npm audit` recorded.

---

## 6. Accessibility & Performance Audit Pass

- [x] **Keyboard Navigation**:
  - Visible "Skip to main content" link accessible via `Tab` on first focus.
  - Gallery Lightbox navigable with `ArrowLeft`, `ArrowRight`, and `Escape`.
- [x] **Motion Sensitivity**:
  - `prefers-reduced-motion: reduce` globally detected in CSS and in the JS hero animation loop to eliminate rapid transitions for vestibular-sensitive users.
- [x] **Semantic Landmarks**:
  - Valid `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, and `<footer>` landmarks across all 22 static pages.
  - Strict hierarchical heading structure (`<h1>` through `<h3>`).
- [x] **Image Performance**:
  - `next/image` with responsive `sizes` attribute, WebP/AVIF automatic compression, and `priority` optimization on above-the-fold heroes.
- [x] **Font Optimization**:
  - `next/font/google` with `display: 'swap'` for Cormorant Garamond and Outfit to eliminate render-blocking font downloads.

---

## 7. Post-Deployment Smoke Test

Once deployed to your production domain:
1. Open `https://your-domain.com/` — Verify full-window 3D vector object rotation and Sarasva's unrolling HTML letter.
2. Open `https://your-domain.com/societies` — Verify all 6 society cards display with their accent colors and dossiers.
3. Open `https://your-domain.com/gallery` — Check discipline category pills (*All Plates*, *Festivals*, *Theatrics*, *Music*, *Dance*, *Fine Arts*, *Literature*) and real-time search.
4. Click any album (e.g. *Effervescence '25*) — Inspect photo plates and open the Lightbox modal. Test arrow keys and Escape.
5. Check `https://your-domain.com/api/gallery/albums` — Confirm clean JSON response with cache headers `public, s-maxage=600`.
