import Section from "./Section";

const steps = [
  "Создаёте аккаунт и активируете trial за 1 ₽.",
  "Пишете в чат или генерируете изображения — лимиты отображаются в интерфейсе.",
  "Продлеваете за 949 ₽/7 дней или покупаете пакеты картинок.",
];

export default function HowItWorks() {
  return (
    <Section className="bg-black/20">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Как это работает
        </h2>
        <p className="text-base text-white/70">
          Простая onboarding-последовательность: подключайтесь за минуту и сразу
          получайте контент.
        </p>
        <div className="grid gap-4 text-left sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="card h-full rounded-3xl border border-white/10 bg-card/80 p-6"
            >
              <div className="flex flex-col gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-base font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-white/75">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
