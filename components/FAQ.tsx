import Section from "./Section";

const faqs = [
  {
    question: "Какие лимиты по Free?",
    answer: "30 000 символов/день и 20 изображений/день.",
  },
  {
    question: "Что в PRO?",
    answer:
      "Безлимит сообщений (с защитой от злоупотреблений), быстрый доступ к моделям, отдельные пакеты для картинок.",
  },
  {
    question: "Как отключить автопродление?",
    answer:
      "На странице «Отменить подписку» по e-mail; списаний после отмены не будет.",
  },
  {
    question: "Есть ли корпоративный доступ?",
    answer: "Напишите нам — подберём тариф под нагрузку.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl space-y-10 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Вопросы и ответы
          </h2>
          <p className="text-base text-white/70">
            Если не нашли ответ — напишите в поддержку, мы подключимся в течение
            рабочего дня.
          </p>
        </div>
        <dl className="space-y-6 text-left">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="card rounded-3xl border border-white/10 bg-card/80 p-6"
            >
              <dt className="text-lg font-semibold text-white">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/70">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
