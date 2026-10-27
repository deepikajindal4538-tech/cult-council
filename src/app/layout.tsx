import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/ui/SkipLink";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cultural Council | IIIT Allahabad",
  description:
    "Official website of the Cultural Council, Indian Institute of Information Technology Allahabad. Home to AMS, Geneticx, Sarasva, Nirmiti, Rangtarangini, and Virtuosi.",
  keywords: [
    "IIIT Allahabad",
    "Cultural Council",
    "Effervescence",
    "AMS",
    "Geneticx",
    "Sarasva",
    "Nirmiti",
    "Rangtarangini",
    "Virtuosi",
  ],
  authors: [{ name: "Cultural Council IIITA" }],
  openGraph: {
    title: "Cultural Council | IIIT Allahabad",
    description: "Fostering arts, drama, dance, music, literature and photography.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-canvas text-ink antialiased selection:bg-amber-100 selection:text-amber-900">
        <SkipLink />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
