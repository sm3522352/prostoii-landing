import Section from "./Section";

const items = ["Чат", "Изображения", "Шаблоны", "API", "Поддержка"];

export default function LogoCloud() {
  return (
    <Section className="pt-10">
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-white/10 bg-card/60 px-8 py-6 text-sm text-white/70">
        {items.map((item) => (
          <span key={item} className="badge bg-white/10 text-white/80">
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
}
