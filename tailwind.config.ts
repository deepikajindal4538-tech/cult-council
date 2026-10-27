import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAF8F5",
          muted: "#F3EFEA",
          card: "#FFFFFF",
          subtle: "#F7F5F0",
        },
        ink: {
          DEFAULT: "#1C1917", // warm stone 900
          muted: "#78716C",   // warm stone 500
          faint: "#A8A29E",   // warm stone 400
        },
        border: {
          DEFAULT: "#E7E2DA",
          subtle: "#F0ECE6",
        },
        // Individual Society Accents
        society: {
          ams: {
            DEFAULT: "#D97706", // Amber 600
            light: "#FEF3C7",   // Amber 100
            glow: "rgba(217, 119, 6, 0.15)",
          },
          geneticx: {
            DEFAULT: "#E11D48", // Rose 600
            light: "#FFE4E6",   // Rose 100
            glow: "rgba(225, 29, 72, 0.15)",
          },
          sarasva: {
            DEFAULT: "#4F46E5", // Indigo 600
            light: "#EEF2FF",   // Indigo 100
            glow: "rgba(79, 70, 229, 0.15)",
          },
          nirmiti: {
            DEFAULT: "#EA580C", // Orange 600
            light: "#FFEDD5",   // Orange 100
            glow: "rgba(234, 88, 12, 0.15)",
          },
          rangtarangini: {
            DEFAULT: "#B91C1C", // Red 700
            light: "#FEE2E2",   // Red 100
            glow: "rgba(185, 28, 28, 0.15)",
          },
          virtuosi: {
            DEFAULT: "#0D9488", // Teal 600
            light: "#CCFBF1",   // Teal 100
            glow: "rgba(13, 148, 136, 0.15)",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -5px rgba(28, 25, 23, 0.05), 0 4px 10px -2px rgba(28, 25, 23, 0.02)",
        "soft-lg": "0 20px 40px -10px rgba(28, 25, 23, 0.08), 0 8px 16px -4px rgba(28, 25, 23, 0.03)",
        "soft-xl": "0 25px 50px -12px rgba(28, 25, 23, 0.12)",
      },
      borderRadius: {
        fest: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
