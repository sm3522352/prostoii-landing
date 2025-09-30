import type { Metadata } from "next";
import "./globals.css";
import { Jost, Manrope } from "next/font/google";

const jost = Jost({ subsets: ["latin", "cyrillic"], weight: ["600","700"], variable: "--font-jost" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400","500"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "ПростоИИ — Один сервис. Все модели. Ноль сложности.",
  description: "Личный ИИ‑помощник: обычный чат и готовые рецепты для реальных задач. Понятные модели, приватность и тарифы для семьи и профи."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${jost.variable} ${manrope.variable} antialiased`}
        style={{ fontFamily: "var(--font-manrope)" }}>
        {children}
        <div id="toast" className="toast" aria-live="polite" aria-atomic="true" />
      </body>
    </html>
  );
}
