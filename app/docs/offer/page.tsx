import type { Metadata } from "next";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

const canonical = "https://prostoii.ru/docs/offer";

export const metadata: Metadata = {
  title: "Договор оферты — ПростоИИ",
  description:
    "Публичная оферта сервиса ПростоИИ: условия подписки, порядок оплаты и ответственность сторон.",
  alternates: {
    canonical,
  },
};

export default function OfferPage() {
  return (
    <Layout title={metadata.title as string} description={metadata.description}>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="h1 text-white">Договор оферты</h1>
          <p className="text-sm text-white/60">
            Дата вступления в силу: 28.11.2024
          </p>
          <div className="space-y-6 text-sm leading-relaxed text-white/75">
            <p>
              Настоящая публичная оферта определяет условия использования
              сервиса «ПростоИИ» и заключает договор между Пользователем и ООО
              «ПростоИИ». Совершая оплату, Пользователь подтверждает согласие со
              всеми пунктами оферты.
            </p>
            <p>
              Услуга предоставляется по подписной модели с пробным периодом.
              Актуальные тарифы, лимиты и условия оплаты указаны на страницах
              «Главная» и «Тарифы». Оплата производится через безопасные
              платёжные шлюзы, повторные списания выполняются согласно
              выбранному плану.
            </p>
            <p>
              Пользователь обязуется использовать сервис в рамках
              законодательства РФ и не передавать учётные данные третьим лицам.
              Сервис обеспечивает сохранность данных и предоставляет инструменты
              для их экспорта по запросу. Подробные положения о защите
              персональных данных изложены в Политике конфиденциальности.
            </p>
            <p>
              По всем вопросам, включая расторжение договора и возврат средств,
              необходимо обращаться в службу поддержки по адресу
              <a
                className="ml-1 underline hover:text-primary-200"
                href="mailto:support@prostoii.ru"
              >
                support@prostoii.ru
              </a>
              . Обращения рассматриваются в течение 3 рабочих дней.
            </p>
          </div>
        </div>
      </Section>
      <CTA />
    </Layout>
  );
}
