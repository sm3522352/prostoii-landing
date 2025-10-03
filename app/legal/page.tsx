import type { Metadata } from "next";
import Link from "next/link";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

const canonical = "https://prostoii.ru/legal";

export const metadata: Metadata = {
  title: "Юридические документы — ПростоИИ",
  description:
    "Оферта, политика конфиденциальности и инструкция по отмене подписки сервиса ПростоИИ.",
  alternates: {
    canonical,
  },
};

const documents = [
  {
    href: "/docs/offer",
    title: "Договор оферты",
    description: "Условия подписки и оказания услуг.",
  },
  {
    href: "/docs/privacy",
    title: "Политика конфиденциальности",
    description: "Правила обработки и защиты персональных данных.",
  },
  {
    href: "/cancel",
    title: "Отменить подписку",
    description: "Форма для отключения автопродления.",
  },
];

export default function LegalPage() {
  return (
    <Layout title={metadata.title as string} description={metadata.description}>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="h1 text-white">Юридические документы</h1>
          <p className="text-sm text-white/70">
            Здесь собраны ключевые документы и инструкции, регулирующие
            использование сервиса ПростоИИ.
          </p>
          <div className="space-y-4">
            {documents.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="block rounded-3xl border border-white/10 bg-card/70 p-6 transition hover:border-primary-400/60 hover:bg-white/5"
              >
                <h2 className="text-lg font-semibold text-white">
                  {doc.title}
                </h2>
                <p className="mt-2 text-sm text-white/70">{doc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <CTA />
    </Layout>
  );
}
