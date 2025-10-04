import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ПростоИИ — тексты и изображения по подписке',
  description:
    'SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней. Прозрачные лимиты, работа на быстрых и точных LLM‑моделях.',
  openGraph: {
    title: 'ПростоИИ — тексты и изображения по подписке',
    description:
      'SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней. Прозрачные лимиты, работа на быстрых и точных LLM‑моделях.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://prostoii.ru',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ПростоИИ — тексты и изображения по подписке'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ПростоИИ — тексты и изображения по подписке',
    description:
      'SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней.',
    images: ['/og-image.png']
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <head>
        {/* Yandex.Metrica counter */}
        {process.env.NEXT_PUBLIC_YM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
                (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                ym(${process.env.NEXT_PUBLIC_YM_ID}, 'init', {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `
            }}
          />
        )}
      </head>
      <body className={`${inter.className} bg-bg text-text-primary`}> 
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">
              ПростоИИ
            </Link>
            <nav className="space-x-4 hidden sm:block">
              <Link href="/pricing" className="hover:text-accent">
                Тарифы
              </Link>
              <Link href="/docs/offer" className="hover:text-accent">
                Оферта
              </Link>
              <Link href="/docs/privacy" className="hover:text-accent">
                Конфиденциальность
              </Link>
              <Link href="/cancel" className="hover:text-accent">
                Отмена
              </Link>
              <Link href="/contact" className="hover:text-accent">
                Контакты
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-text-secondary text-sm space-y-2">
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/pricing" className="hover:text-accent">
                Тарифы
              </Link>
              <Link href="/docs/offer" className="hover:text-accent">
                Оферта
              </Link>
              <Link href="/docs/privacy" className="hover:text-accent">
                Конфиденциальность
              </Link>
              <Link href="/cancel" className="hover:text-accent">
                Отмена
              </Link>
              <Link href="/contact" className="hover:text-accent">
                Контакты
              </Link>
              <Link href="/legal" className="hover:text-accent">
                Юридические
              </Link>
            </nav>
            <div>
              <span>
                © {new Date().getFullYear()} ПростоИИ. Все права защищены.
              </span>
            </div>
            <div>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}