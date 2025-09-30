import type { Metadata } from "next";
import "./globals.css";
import { Jost, Manrope } from "next/font/google";
import Button from "@/components/Button";

const jost = Jost({ subsets: ["latin", "cyrillic"], weight: ["600","700"], variable: "--font-jost" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400","500"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "ПростоИИ — Один сервис. Все модели. Ноль сложности.",
  description: "Личный ИИ‑помощник: обычный чат и готовые рецепты для реальных задач. Понятные модели, приватность и тарифы для семьи и профи."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${jost.variable} ${manrope.variable} antialiased`}
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {children}
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(27,33,53,0.18)] md:hidden">
          <div className="container-soft py-3">
            <Button
              as="a"
              href="tg://resolve?domain=your_mini_app"
              data-analytics="click_cta_sticky"
              aria-label="Начать бесплатно"
              className="w-full"
            >
              Начать бесплатно
            </Button>
          </div>
        </div>
        <div id="toast" className="toast" aria-live="polite" aria-atomic="true" />
      </body>
    </html>
  );
}
