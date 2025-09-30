'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQItem from "@/components/FAQItem";
import ModelTable from "@/components/ModelTable";
import Pill from "@/components/Pill";
import { type Recipe, recipes, faqs, testimonials } from "@/lib/data";

const recipeFilters: Recipe["category"][] = ["Быт", "Учёба", "Работа"];

const howSteps = [
  { icon: "🎯", title: "Выберите задачу", description: "≤ 8 слов, без жаргона." },
  { icon: "💬", title: "Скажите по‑человечески", description: "≤ 8 слов, без жаргона." },
  { icon: "✨", title: "Получите готовый результат", description: "≤ 8 слов, без жаргона." }
];

const privacyCards = [
  { icon: "🔐", title: "Шифрование — по умолчанию", copy: "Все запросы идут по защищённым каналам." },
  {
    icon: "🧾",
    title: "Храним минимум — вы решаете, что сохранять",
    copy: "Настраивайте историю задач и автосброс в один клик."
  },
  { icon: "🛡️", title: "Все настройки — в один тап", copy: "Быстрые переключатели прямо в Telegram." }
];

const pricingPlans = [
  {
    name: "Фримиум",
    price: "0₽",
    benefit: "Для редких задач",
    features: ["Обычный чат", "5 рецептов в неделю"],
    popular: false
  },
  {
    name: "Семья",
    price: "299₽",
    benefit: "Для семьи и учебы",
    features: ["Все рецепты", "До 4 профилей", "Родительский контроль"],
    popular: true
  },
  {
    name: "Про",
    price: "699₽",
    benefit: "Для частых задач и длинных файлов",
    features: ["Длинные голосовые", "Экспорт в PDF", "Приоритетная поддержка"],
    popular: false
  }
];

export default function Page() {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<Recipe["category"] | null>(null);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadingRecipes(false), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    let direction = 1;
    const interval = window.setInterval(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        direction = -1;
      } else if (el.scrollLeft <= 4) {
        direction = 1;
      }
      el.scrollBy({ left: direction * (el.clientWidth - 40), behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  const filteredRecipes = useMemo(() => {
    let list = recipes;
    if (activeFilter) {
      list = list.filter((recipe) => recipe.category === activeFilter);
    }
    if (searchValue.trim()) {
      const q = searchValue.trim().toLowerCase();
      list = list.filter((recipe) => recipe.title.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, searchValue]);

  const recipeCards = loadingRecipes
    ? Array.from({ length: 6 }).map((_, idx) => <RecipeCard key={`skeleton-${idx}`} title="" benefit="" loading />)
    : filteredRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.title}
          title={recipe.title}
          benefit={recipe.benefit}
          icon={recipe.icon}
        />
      ));

  return (
    <main className="pb-24 md:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pt-28">
        <div className="absolute inset-x-0 top-0 -z-10 flex justify-center">
          <div className="bg-warm-glow glow-veil h-[420px] w-[720px] rounded-full" aria-hidden />
        </div>
        <div className="container-soft grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs">
              <Pill>Личный ИИ‑помощник</Pill>
            </div>
            <h1
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-accent sm:text-5xl"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Один сервис. Все модели. Ноль сложности.
            </h1>
            <p className="mt-3 text-sm font-medium text-neutral-500">
              Уже 1 245 задач решено сегодня
            </p>
            <p className="mt-5 max-w-xl text-base text-neutral-600">
              Скажите по-человечески — мы сделаем: обычный чат и готовые рецепты для реальных задач.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                as="a"
                href="tg://resolve?domain=your_mini_app"
                aria-label="Начать бесплатно в Telegram"
                data-analytics="click_cta_primary"
              >
                Начать бесплатно в Telegram
              </Button>
              <Button
                as="a"
                variant="ghost"
                href="#demo"
                aria-label="Смотреть демо"
                data-analytics="click_cta_secondary"
              >
                Смотреть демо
              </Button>
            </div>
            <p className="mt-3 text-xs font-medium text-neutral-500">
              Без регистрации и карты • 10 действий бесплатно
            </p>
          </div>
          <div className="relative">
            <Card className="relative overflow-hidden rounded-[24px] border border-white/40 p-6 shadow-soft">
              <div className="absolute inset-0 -z-10 rounded-[24px] bg-warm-glow" aria-hidden />
              <div className="absolute inset-x-4 top-4 -z-10 h-40 rounded-[24px] bg-white/60 blur-2xl" aria-hidden />
              <Pill className="bg-white/90 text-accent">Голос • Фото • Текст</Pill>
              <div className="mt-6 space-y-3">
                <div className="max-w-[240px] rounded-[16px] bg-white/90 p-4 text-sm text-neutral-700 shadow-soft">
                  👤 Как объяснить договор аренды?
                </div>
                <div className="ml-auto max-w-[260px] rounded-[16px] bg-primary-500/10 p-4 text-sm text-primary-700 shadow-soft">
                  🤖 Всё по пунктам: права, обязанности и что проверить перед подписью.
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
                  <span>Понятность</span>
                  <span className="text-primary-600">92% понятно</span>
                </div>
                <div
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/60"
                  role="progressbar"
                  aria-label="Понятность ответа"
                  aria-valuenow={92}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full w-[92%] rounded-full bg-primary-500" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-neutral-500">пример результата</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Section id="how" title="Как это работает" subtitle="Три шага — и готово.">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {howSteps.map((step) => (
            <Card key={step.title} className="flex h-full flex-col gap-4 p-6">
              <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-lg">
                {step.icon}
              </span>
              <div>
                <div className="text-lg font-semibold text-accent">{step.title}</div>
                <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="recipes" title="Готовые рецепты" subtitle="Нажмите и запустите — остальное сделаем мы.">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label htmlFor="recipe-search" className="sr-only">
            Поиск рецепта
          </label>
          <div className="relative w-full max-w-xl">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-neutral-400" aria-hidden>
              🔍
            </span>
            <input
              id="recipe-search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Найдите рецепт под вашу задачу"
              className="w-full rounded-[16px] border border-neutral-200 bg-white/90 py-3 pl-12 pr-4 text-sm text-neutral-700 shadow-soft focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
              type="search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {recipeFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(isActive ? null : filter)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${
                    isActive
                      ? "border-primary-300 bg-primary-50 text-primary-600"
                      : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
                  }`}
                  aria-pressed={isActive}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipeCards}
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href="#recipes"
            className="text-sm font-semibold text-primary-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            data-analytics="click_show_more"
          >
            Показать ещё
          </a>
        </div>
      </Section>

      <Section id="demo" title="Обычный чат" subtitle="Говорите голосом или пишите текстом.">
        <Card className="flex flex-col gap-4 rounded-[24px] p-6">
          <label htmlFor="chat-demo-input" className="sr-only">
            Поле ввода задачи
          </label>
          <div className="flex items-center gap-3 rounded-[24px] border border-neutral-200 bg-white/90 px-4 py-5 shadow-soft">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-soft transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              aria-label="Включить голосовой ввод"
            >
              🎙️
            </button>
            <input
              id="chat-demo-input"
              type="text"
              placeholder="Нажмите голосовую кнопку и начинайте говорить…"
              className="w-full border-none bg-transparent text-base text-neutral-600 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
          <p className="text-sm text-neutral-500">Можно прикрепить фото или надиктовать задачу</p>
        </Card>
      </Section>

      <Section id="models" title="Понятные модели — без жаргона" subtitle="Выбираете по задаче, а не по аббревиатурам.">
        <ModelTable />
      </Section>

      <Section id="privacy" title="Приватность" subtitle="Коротко и по делу.">
        <div className="grid gap-4 md:grid-cols-3">
          {privacyCards.map((card) => (
            <Card key={card.title} className="flex h-full flex-col gap-4 p-6 text-neutral-600">
              <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-lg">
                {card.icon}
              </span>
              <div>
                <div className="text-lg font-semibold text-accent">{card.title}</div>
                <p className="mt-2 text-sm text-neutral-600">{card.copy}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="pricing" title="Тарифы" subtitle="Оплата в Telegram Stars и СБП/ЮKassa">
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex h-full flex-col border transition ${
                plan.popular ? "border-primary-200 bg-primary-50/60" : "border-transparent"
              }`}
            >
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-accent">{plan.name}</span>
                  {plan.popular && (
                    <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
                      Популярный
                    </span>
                  )}
                </div>
                <div className="text-3xl font-semibold text-accent" style={{ fontFamily: "var(--font-jost)" }}>
                  {plan.price}
                  <span className="ml-1 align-baseline text-sm font-medium text-neutral-500">/мес</span>
                </div>
                <p className="text-sm font-medium text-primary-600">{plan.benefit}</p>
                <ul className="mt-2 space-y-2 text-sm text-neutral-600">
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto px-6 pb-6">
                <Button
                  className="w-full"
                  data-analytics="click_pricing"
                  aria-label={`Выбрать тариф ${plan.name}`}
                >
                  Выбрать
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="testimonials" title="Отзывы" subtitle="До/после — реальные истории.">
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium text-neutral-500">★ 4,8 (на основе 312 отзывов)</div>
          <div
            ref={testimonialsRef}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4"
            role="region"
            aria-label="Истории пользователей"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={`${t.author}-${i}`} before={t.before} after={t.after} author={t.author} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="faq" title="Вопросы и ответы">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <FAQItem key={`${f.q}-${i}`} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="container-soft flex flex-col gap-3 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} ПростоИИ —
            <span className="ml-1">Политика • Соглашение • Контакты</span>
          </div>
          <nav className="flex flex-wrap gap-4">
            <a href="#" aria-label="Политика конфиденциальности" className="hover:underline">
              Политика
            </a>
            <a href="#" aria-label="Пользовательское соглашение" className="hover:underline">
              Соглашение
            </a>
            <a href="#" aria-label="Контакты" className="hover:underline">
              Контакты
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
