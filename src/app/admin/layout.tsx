import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Command Center | Cultural Council IIIT Allahabad",
  description: "Administrative portal for managing timeline events, festival countdowns, council members, and visual media.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 selection:bg-amber-500 selection:text-black flex flex-col">
      {children}
    </div>
  );
}
