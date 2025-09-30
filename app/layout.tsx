import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Button from "@/components/Button";
import { AppStateProvider } from "@/lib/store";
import { jost, manrope } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://prostoii.ru"),
  title: "ПростоИИ — понятный ИИ за 60 секунд",
  description:
    "ПростоИИ помогает получить понятный результат за минуту: рецепты, чат и автоматический подбор моделей с понятными тарифами и приватностью.",
  openGraph: {
    title: "ПростоИИ — понятный ИИ за 60 секунд",
    description:
      "Опишите задачу своими словами — мы подберём рецепт, объясним договоры, подготовим письма и сохраним историю.",
    url: "https://prostoii.ru",
    siteName: "ПростоИИ",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        type: "image/webp"
      }
    ]
  },
  alternates: {
    canonical: "https://prostoii.ru"
  },
  twitter: {
    card: "summary_large_image",
    title: "ПростоИИ — понятный ИИ за 60 секунд",
    description:
      "Готовые рецепты, обычный чат и понятные модели. Начните бесплатно — без карты и сложных настроек.",
    images: ["/og-image.webp"]
  }
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ПростоИИ",
  description:
    "Понятный ИИ-сервис: рецепты, чат, подбор моделей и прозрачные тарифы. Начните бесплатно, без карты и сложных настроек.",
  url: "https://prostoii.ru",
  publisher: {
    "@type": "Organization",
    name: "ПростоИИ",
    url: "https://prostoii.ru",
    logo: {
      "@type": "ImageObject",
      url: "https://prostoii.ru/og-image.webp"
    }
  },
  mainEntity: {
    "@type": "Product",
    name: "ПростоИИ",
    description: "ИИ-помощник с готовыми рецептами, чатом и командным доступом.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "699",
      priceCurrency: "RUB",
      offerCount: 3
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12487"
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${jost.variable} ${manrope.variable} antialiased`}>
        <AppStateProvider>
          {children}
          <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-lg shadow-[0_-20px_40px_-32px_rgba(15,18,34,0.45)] md:hidden">
            <div className="container-soft py-3">
              <Button as="a" href="#hero" className="w-full" aria-label="Начать бесплатно">
                Начать бесплатно
              </Button>
            </div>
          </div>
          <div id="toast" className="toast" role="status" aria-live="polite" aria-atomic="true" />
        </AppStateProvider>
        <Script
          id="prostoii-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
