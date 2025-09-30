import localFont from "next/font/local";

export const jost = localFont({
  src: [
    { path: "../public/fonts/Jost-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Jost-600.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-jost",
  display: "swap",
  preload: true
});

export const manrope = localFont({
  src: [
    { path: "../public/fonts/Manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Manrope-600.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-manrope",
  display: "swap",
  preload: true
});
