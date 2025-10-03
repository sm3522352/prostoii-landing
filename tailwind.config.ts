import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  safelist: [
    "bg-gradient-to-br",
    "from-[#5B4BFF]",
    "via-[#7C3AED]",
    "to-[#1EA5F7]",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "#05070E",
        foreground: "#F7F8FF",
        muted: {
          DEFAULT: "#101425",
          foreground: "#9298B8",
        },
        primary: {
          50: "#F3F4FF",
          100: "#DFE1FF",
          200: "#B9BFFF",
          300: "#939BFF",
          400: "#6D79FF",
          500: "#5B4BFF",
          600: "#4A38E5",
          700: "#3B2CC0",
        },
        accent: {
          500: "#1EA5F7",
        },
        border: "#1F2438",
        card: "#0C1120",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        glow: "0 40px 120px -40px rgba(93, 76, 255, 0.45)",
        "soft-border": "inset 0 0 0 1px rgba(255, 255, 255, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
