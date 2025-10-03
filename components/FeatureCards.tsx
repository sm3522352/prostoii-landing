import Section from "./Section";

const features = [
  {
    title: "Быстро и просто",
    description: "Минимум настроек, максимум результата.",
  },
  {
    title: "Гибкие модели",
    description: "Под капотом дешёвые и точные LLM через API.",
  },
  {
    title: "Честные лимиты",
    description: "Ежедневные квоты в Free, безлимит в PRO + anti-abuse.",
  },
  {
    title: "Оплата в РФ",
    description: "Прозрачная оферта, безопасные платежи.",
  },
];

export default function FeatureCards() {
  return (
    <Section>
      <div className="space-y-10 text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Преимущества ПростоИИ
          </h2>
          <p className="text-base text-white/70">
            Всё, что нужно для комфортной работы с генерацией текстов и
            изображений — в одном тарифе по подписке.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card h-full rounded-3xl border border-white/10 bg-card/80 p-8 text-left"
            >
              <div className="flex h-full flex-col gap-3">
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
