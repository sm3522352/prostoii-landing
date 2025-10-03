import type { Metadata } from "next";
import Link from "next/link";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { SUPPORT_URL, CONTACT_EMAIL } from "@/lib/env";

const canonical = "https://prostoii.ru/contact";

export const metadata: Metadata = {
  title: "Контакты — ПростоИИ",
  description:
    "Свяжитесь с командой ПростоИИ: поддержка, партнёрство и юридические вопросы.",
  alternates: {
    canonical,
  },
};

export default function ContactPage() {
  return (
    <Layout title={metadata.title as string} description={metadata.description}>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-2xl space-y-6">
          <h1 className="h1 text-white">Контакты и поддержка</h1>
          <p className="lead text-white/80">
            Мы отвечаем на вопросы пользователей, обсуждаем партнёрства и
            помогаем с подключением. Среднее время ответа — 2 часа в рабочие
            дни.
          </p>
          <div className="card space-y-4 rounded-3xl border border-white/10 bg-card/80 p-6">
            <div>
              <h2 className="text-lg font-semibold text-white">E-mail</h2>
              <a
                className="mt-1 inline-flex items-center gap-2 text-sm text-primary-200"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Поддержка</h2>
              <Link
                href={SUPPORT_URL || "#"}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Написать в поддержку
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <CTA />
    </Layout>
  );
}
