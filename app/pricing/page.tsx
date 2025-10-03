import type { Metadata } from "next";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import PricingTable from "@/components/PricingTable";
import CTA from "@/components/CTA";
import GoalOnView from "@/components/GoalOnView";

const canonical = "https://prostoii.ru/pricing";

export const metadata: Metadata = {
  title: "Тарифы ПростоИИ",
  description:
    "Сравните Free и PRO-подписку ПростоИИ: прозрачные лимиты, пробный доступ 1 ₽, автопродление 949 ₽ каждые 7 дней и пакеты изображений.",
  alternates: {
    canonical,
  },
};

export default function PricingPage() {
  return (
    <Layout title="Тарифы ПростоИИ" description={metadata.description}>
      <GoalOnView name="view_pricing" />
      <Section className="pb-12 pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="h1 text-white">Прозрачные тарифы без сюрпризов</h1>
          <p className="lead">
            Оставайтесь на Free или переходите в PRO. Все цены в рублях,
            автопродление можно отключить в любой момент.
          </p>
        </div>
      </Section>
      <PricingTable showImagePacks title="" description="" />
      <CTA />
    </Layout>
  );
}
