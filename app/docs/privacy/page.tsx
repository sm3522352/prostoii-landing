import type { Metadata } from "next";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

const canonical = "https://prostoii.ru/docs/privacy";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — ПростоИИ",
  description:
    "Политика обработки персональных данных сервиса ПростоИИ в соответствии с 152-ФЗ: цели, состав данных, правовые основания и меры защиты.",
  alternates: {
    canonical,
  },
};

export default function PrivacyPage() {
  return (
    <Layout title={metadata.title as string} description={metadata.description}>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="h1 text-white">Политика конфиденциальности</h1>
          <p className="text-sm text-white/60">
            Разработана в соответствии с требованиями 152-ФЗ «О персональных
            данных».
          </p>
          <div className="space-y-8 text-sm leading-relaxed text-white/75">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                1. Цели обработки
              </h2>
              <p>
                Персональные данные используются для регистрации и
                аутентификации пользователей, предоставления доступа к
                функционалу сервиса, оформления подписки и обработки платежей, а
                также для коммуникации с пользователями по вопросам работы
                сервиса.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                2. Состав персональных данных
              </h2>
              <p>
                Мы обрабатываем фамилию и имя пользователя, адрес электронной
                почты, номер телефона (при указании), платёжные реквизиты,
                историю действий в сервисе, техническую информацию об
                устройствах и cookies.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                3. Правовые основания
              </h2>
              <p>
                Обработка персональных данных осуществляется на основании
                соглашения (оферты) с пользователем, необходимости исполнения
                договора, требований законодательства РФ, а также согласия
                пользователя при оформлении подписки.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                4. Меры защиты
              </h2>
              <p>
                Мы применяем организационные и технические меры для защиты
                данных: шифрование при передаче, ограничение доступа, аудит
                логов, резервное копирование и регулярное тестирование на
                уязвимости.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                5. Права субъекта
              </h2>
              <p>
                Пользователь имеет право на получение информации об обработке
                данных, их уточнение, блокирование или уничтожение, отзыв
                согласия, а также на обращение в уполномоченный орган по защите
                прав субъектов персональных данных.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                6. Контакты оператора
              </h2>
              <p>
                Оператор персональных данных: ООО «ПростоИИ». По вопросам
                обработки и защиты данных обращайтесь по адресу
                <a
                  className="ml-1 underline hover:text-primary-200"
                  href="mailto:support@prostoii.ru"
                >
                  support@prostoii.ru
                </a>
                . Ответ предоставляется в течение 3 рабочих дней.
              </p>
            </section>
          </div>
        </div>
      </Section>
      <CTA />
    </Layout>
  );
}
