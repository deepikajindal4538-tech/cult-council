import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#F4F1EA] border-t border-stone-300 pt-20 pb-14 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-300">
          {/* Colophon & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-ink text-canvas font-mono font-bold text-xs flex items-center justify-center">
                CC
              </span>
              <span className="font-serif font-bold text-xl tracking-tight text-ink">
                Cultural Council
              </span>
            </div>
            <p className="font-serif italic text-base text-ink-muted max-w-sm leading-relaxed">
              &ldquo;Autonomous guild union coordinating dramatic productions, acoustics, dance choreography, lens work, and literary discourse at IIIT Allahabad.&rdquo;
            </p>
            <div className="pt-2 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              INSTITUTE OF NATIONAL IMPORTANCE // PRAYAGRAJ
            </div>
          </div>

          {/* Directory */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-ink-faint block text-[10px] pb-1 border-b border-stone-300">
              COUNCIL DIRECTORY
            </span>
            <ul className="space-y-2 text-ink-muted">
              <li>
                <Link href="/societies" className="hover:text-ink transition-colors">
                  01. Autonomous Guilds
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-ink transition-colors">
                  02. Production Ledger
                </Link>
              </li>
              <li>
                <Link href="/fests" className="hover:text-ink transition-colors">
                  03. Effervescence Fest
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-ink transition-colors">
                  04. Flickr Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Correspondence & Dispatch */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-ink-faint block text-[10px] pb-1 border-b border-stone-300">
              CORRESPONDENCE
            </span>
            <p className="text-ink text-[11px] font-normal leading-relaxed">
              IIIT Allahabad, Devghat, Jhalwa, Prayagraj, UP 211015
            </p>
            <p className="text-ink-muted text-[11px] font-normal">
              Direct inquiries:{" "}
              <a
                href="mailto:culturalcouncil@iiita.ac.in"
                className="underline underline-offset-4 text-ink hover:text-stone-600"
              >
                culturalcouncil@iiita.ac.in
              </a>
            </p>
            <div className="pt-2 flex items-center gap-4 text-ink">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-stone-600 transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-stone-600 transition-colors"
              >
                <span>YouTube</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-faint gap-4">
          <p>© {new Date().getFullYear()} CULTURAL COUNCIL, IIIT ALLAHABAD. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH NEXT.JS 14, FRAMER MOTION & TAILWIND</p>
        </div>
      </div>
    </footer>
  );
}
