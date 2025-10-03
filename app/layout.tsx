import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const baseUrl = "https://prostoii.ru";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "ПростоИИ — тексты и изображения по подписке",
  description:
    "SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней. Прозрачные лимиты, работа на быстрых и точных LLM-моделях.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "ПростоИИ — тексты и изображения по подписке",
    description:
      "SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней. Прозрачные лимиты, работа на быстрых и точных LLM-моделях.",
    url: baseUrl,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "ПростоИИ",
      },
    ],
    siteName: "ПростоИИ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ПростоИИ — тексты и изображения по подписке",
    description:
      "SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней. Прозрачные лимиты, работа на быстрых и точных LLM-моделях.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const ymScript = ymId
    ? `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (let j=0;j<document.scripts.length;j+=1) {
    if (document.scripts[j].src === r) { return; }
  }
  k=e.createElement(t);
  a=e.getElementsByTagName(t)[0];
  k.async=1;
  k.src=r;
  a.parentNode.insertBefore(k,a);
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${ymId}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});
`
    : null;

  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-background text-foreground antialiased`}
      >
        {children}
        {ymScript ? (
          <>
            <Script
              id="yandex-metrika"
              strategy="afterInteractive"
              defer
              data-n-head="true"
            >
              {ymScript}
            </Script>
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://mc.yandex.ru/watch/${ymId}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
