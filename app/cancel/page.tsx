import type { Metadata } from "next";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import CancelForm from "@/components/CancelForm";
import CTA from "@/components/CTA";
import GoalOnView from "@/components/GoalOnView";

const canonical = "https://prostoii.ru/cancel";

export const metadata: Metadata = {
  title: "Отменить подписку — ПростоИИ",
  description:
    "Отмена автопродления подписки ПростоИИ: оставьте e-mail, и мы отключим списания и пришлём подтверждение.",
  alternates: {
    canonical,
  },
};

export default function CancelPage() {
  return (
    <Layout title={metadata.title as string} description={metadata.description}>
      <GoalOnView name="view_cancel" />
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="h1 text-white">Отменить подписку</h1>
          <p className="mt-4 text-sm text-white/70">
            Укажите почту, на которую оформлена подписка. Мы отключим
            автопродление и пришлём подтверждение с датой окончания доступа.
          </p>
          <CancelForm />
        </div>
      </Section>
      <CTA />
    </Layout>
  );
}
