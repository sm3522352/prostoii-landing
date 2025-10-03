import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";

import { APP_URL, CONTACT_EMAIL } from "@/lib/env";
import CookieConsent from "./CookieConsent";

type LayoutProps = {
  children: ReactNode;
  title?: string | null;
  description?: string | null;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const defaultTitle = "ПростоИИ — тексты и изображения по подписке";
const defaultDescription =
  "SaaS для генерации текстов и изображений: пробный доступ 1 ₽ на 3 дня, далее 949 ₽/7 дней. Прозрачные лимиты, работа на быстрых и точных LLM-моделях.";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

const footerLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/docs/offer", label: "Offer" },
  { href: "/docs/privacy", label: "Privacy" },
  { href: "/cancel", label: "Cancel" },
  { href: "/contact", label: "Contact" },
];

const currentYear = new Date().getFullYear();

export default function Layout({
  children,
  title,
  description,
  jsonLd,
}: LayoutProps) {
  const pageTitle = title ?? defaultTitle;
  const pageDescription = description ?? defaultDescription;
  const structuredData = jsonLd ? JSON.stringify(jsonLd) : null;

  return (
    <>
      {structuredData ? (
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      ) : null}
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
          <div className="container flex h-16 items-center justify-between gap-4">
            <Link href="/" className="font-semibold tracking-tight text-white">
              ПростоИИ
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`${APP_URL}/login`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary-500 hover:text-primary-100"
              >
                Войти
              </Link>
            </nav>
            <div className="md:hidden">
              <Link
                href={`${APP_URL}/login`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary-500 hover:text-primary-100"
              >
                Войти
              </Link>
            </div>
          </div>
        </header>
        <main
          className="flex-1"
          aria-label={pageTitle}
          data-page-description={pageDescription}
        >
          <span className="sr-only">{pageDescription}</span>
          {children}
        </main>
        <footer className="border-t border-border/60 bg-background/80">
          <div className="container flex flex-col gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-1 text-right sm:text-left">
              <a
                className="block text-foreground transition-colors hover:text-primary-100"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs text-muted-foreground">
                © {currentYear} ПростоИИ. Все права защищены.
              </p>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </div>
    </>
  );
}
