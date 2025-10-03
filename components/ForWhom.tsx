import Section from "./Section";

const audiences = [
  {
    title: "Маркетологам",
    description: "Быстрый контент-план и тексты под кампании.",
  },
  {
    title: "Предпринимателям",
    description: "Описание товаров, рассылки и коммерческие предложения.",
  },
  {
    title: "Студентам",
    description: "Рефераты, конспекты и подготовка к экзаменам.",
  },
  {
    title: "SMM/Дизайнерам",
    description: "ТЗ для визуалов, подписи и идеи для публикаций.",
  },
];

export default function ForWhom() {
  return (
    <Section>
      <div className="space-y-10">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Для кого Подходит ПростоИИ
          </h2>
          <p className="text-base text-white/70">
            Мы учитываем разные сценарии использования: от личной продуктивности
            до роста продаж.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="card h-full rounded-3xl border border-white/10 bg-card/80 p-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {audience.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
