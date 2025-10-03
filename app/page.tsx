import type { Metadata } from "next";

import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import ForWhom from "@/components/ForWhom";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

const baseUrl = "https://prostoii.ru";

export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl,
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ПростоИИ",
    url: baseUrl,
    logo: `${baseUrl}/og.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@prostoii.ru",
      contactType: "customer support",
      availableLanguage: ["Russian"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ПростоИИ",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Какие лимиты по Free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "30 000 символов/день и 20 изображений/день.",
        },
      },
      {
        "@type": "Question",
        name: "Что в PRO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Безлимит сообщений (с защитой от злоупотреблений), быстрый доступ к моделям, отдельные пакеты для картинок.",
        },
      },
      {
        "@type": "Question",
        name: "Как отключить автопродление?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "На странице «Отменить подписку» по e-mail; списаний после отмены не будет.",
        },
      },
      {
        "@type": "Question",
        name: "Есть ли корпоративный доступ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Напишите нам — подберём тариф под нагрузку.",
        },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <Layout jsonLd={structuredData}>
      <Hero />
      <LogoCloud />
      <FeatureCards />
      <HowItWorks />
      <ForWhom />
      <PricingTable
        id="pricing"
        title="Тарифы ПростоИИ"
        showImagePacks={false}
      />
      <FAQ />
      <CTA />
    </Layout>
  );
}
