"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQItem from "@/components/FAQItem";
import ModelTable from "@/components/ModelTable";
import {
  type Recipe,
  type RecipeCategory,
  type Testimonial,
  recipeTabs,
  recipes,
  privacyCards,
  plans,
  testimonials,
  faqs
} from "@/lib/data";
import { getDeviceType, setUserProps, trackEvent, trackTimeToValue } from "@/lib/analytics";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { showToast } from "@/lib/toast";
import { useAppStore } from "@/lib/store";

const heroBadges = ["Рекомендовано учителями", "Рекомендовано менеджерами", "Рекомендовано родителями"];
const chatChips = ["Сделай проще", "Объясни как ребёнку", "Списком", "Примеры", "Исправь ошибки"];
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function useFocusTrap(isOpen: boolean, ref: RefObject<HTMLElement | null>, refreshKey?: unknown) {
  useEffect(() => {
    const node = ref.current;

    if (!isOpen || !node) {
      return;
    }

    const focusFirst = () => {
      const elements = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");

      elements[0]?.focus();
    };

    focusFirst();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const elements = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");

      if (elements.length === 0) {
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!activeElement || !node.contains(activeElement) || activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (!activeElement || !node.contains(activeElement) || activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    node.addEventListener("keydown", handleKeyDown);

    return () => {
      node.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, ref, refreshKey]);
}

type OnboardingStage = 0 | 1 | 2 | 3;

export default function Page() {
  const router = useRouter();
  const { auth } = useAppStore();
  const [activeTab, setActiveTab] = useState<RecipeCategory>("Популярные");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebouncedValue(searchValue, 300);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingStage, setOnboardingStage] = useState<OnboardingStage>(0);
  const onboardingStartedAt = useRef<number | null>(null);
  const onboardingTimers = useRef<number[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [fullReviews, setFullReviews] = useState<Testimonial[]>([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [demoResultReady, setDemoResultReady] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);

  const onboardingDialogRef = useRef<HTMLDivElement>(null);
  const planDialogRef = useRef<HTMLDivElement>(null);
  const reviewsDialogRef = useRef<HTMLDivElement>(null);
  const onboardingDialogTitleId = "onboarding-dialog-title";
  const planDialogTitleId = "plan-dialog-title";
  const reviewsDialogTitleId = "reviews-dialog-title";

  const activePlan = plans.find((plan) => plan.id === selectedPlanId) ?? null;

  useEffect(() => {
    setUserProps({ plan: "free", is_new: true, locale: "ru", device: getDeviceType() });
  }, []);

  useEffect(() => {
    return () => {
      onboardingTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const filteredRecipes = useMemo(() => {
    let data = recipes.filter((recipe) => recipe.categories.includes(activeTab));
    if (normalizedSearch) {
      data = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(normalizedSearch) ||
        recipe.description.toLowerCase().includes(normalizedSearch)
      );
    }
    return data;
  }, [activeTab, normalizedSearch]);

  useEffect(() => {
    if (normalizedSearch) {
      trackEvent("search_used", {
        query_len: normalizedSearch.length,
        results_count: filteredRecipes.length
      });
    }
  }, [normalizedSearch, filteredRecipes.length]);

  const suggestions = useMemo(() => {
    const pool = normalizedSearch
      ? recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(normalizedSearch) ||
          recipe.description.toLowerCase().includes(normalizedSearch)
        )
      : recipes.filter((recipe) => recipe.categories.includes("Для новичка"));
    return Array.from(new Set(pool.map((recipe) => recipe.title))).slice(0, 5);
  }, [normalizedSearch]);

  const featuredRecipes = filteredRecipes.slice(0, 4);
  const remainingRecipes = filteredRecipes.slice(4);

  useEffect(() => {
    if (!reviewsModalOpen) {
      return;
    }

    setFullReviews((current) => {
      if (current.length > 0) {
        return current;
      }

      const total = 112;
      return Array.from({ length: total }, (_, index) => {
        const base = testimonials[index % testimonials.length];
        return {
          ...base,
          id: `${base.id}-${index + 1}`
        };
      });
    });
  }, [reviewsModalOpen]);

  const reviewsPerPage = 12;
  const totalReviewPages = fullReviews.length > 0 ? Math.ceil(fullReviews.length / reviewsPerPage) : 1;
  const paginatedReviews = useMemo(() => {
    if (fullReviews.length === 0) {
      return [];
    }
    const start = (reviewsPage - 1) * reviewsPerPage;
    return fullReviews.slice(start, start + reviewsPerPage);
  }, [fullReviews, reviewsPage, reviewsPerPage]);

  useFocusTrap(onboardingOpen, onboardingDialogRef, demoResultReady);
  useFocusTrap(Boolean(activePlan), planDialogRef, selectedPlanId);
  useFocusTrap(reviewsModalOpen, reviewsDialogRef, `${reviewsPage}-${paginatedReviews.length}`);

  const closeOnboarding = useCallback(() => {
    setOnboardingOpen(false);
    onboardingTimers.current.forEach((timer) => window.clearTimeout(timer));
    onboardingTimers.current = [];
    onboardingStartedAt.current = null;
    setDemoResultReady(false);
  }, []);

  useEffect(() => {
    if (!onboardingOpen && !activePlan && !reviewsModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (reviewsModalOpen) {
        setReviewsModalOpen(false);
        return;
      }

      if (activePlan) {
        setSelectedPlanId(null);
        return;
      }

      if (onboardingOpen) {
        closeOnboarding();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePlan, closeOnboarding, onboardingOpen, reviewsModalOpen]);

  const startOnboarding = () => {
    onboardingTimers.current.forEach((timer) => window.clearTimeout(timer));
    onboardingTimers.current = [];
    onboardingStartedAt.current = performance.now();
    setOnboardingStage(0);
    setDemoResultReady(false);
    setOnboardingOpen(true);
    trackEvent("onboarding_started", { source: "hero" });

    onboardingTimers.current.push(
      window.setTimeout(() => setOnboardingStage(1), 500),
      window.setTimeout(() => setOnboardingStage(2), 1200),
      window.setTimeout(() => {
        setOnboardingStage(3);
        setDemoResultReady(true);
        trackTimeToValue(onboardingStartedAt, "first_result_generated", { recipe_id: "demo_recipe" });
        showToast("Готово. Сохраните, поделитесь или запустите следующий рецепт.");
      }, 2000)
    );
  };

  const handleHeroCTA = () => {
    const target = auth.user ? "/app" : "/login";
    trackEvent("hero_cta_clicked", { variant: "primary", device: getDeviceType(), target });
    router.push(target);
  };

  const handleExamplesClick = () => {
    trackEvent("examples_clicked", { device: getDeviceType() });
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLaunchRecipe = (recipe: Recipe, tab: RecipeCategory | "Все") => {
    showToast("Готово. Сохраните, поделитесь или запустите следующий рецепт.");
    trackEvent("recipe_card_clicked", { recipe_id: recipe.id, tab, device: getDeviceType() });
  };

  const handleCopyResult = (recipeId: string) => {
    trackEvent("result_copied", { recipe_id: recipeId });
    showToast("Скопировано. Можно поделиться с коллегами или близкими.");
  };

  const handleSaveResult = (recipeId: string) => {
    trackEvent("result_saved", { recipe_id: recipeId });
    showToast("Сохранено в избранное. Найдёте в истории.");
  };

  const openPlanModal = (planId: string) => {
    setSelectedPlanId(planId);
    trackEvent("paywall_viewed", { position: "pricing", variant: "default" });
  };

  const handleSelectPlan = (planId: string, price: string, method: string) => {
    const priceValue = Number(price.replace(/[^0-9]/g, ""));
    trackEvent("plan_selected", { plan: planId, price_rub: priceValue });
    showToast(`Вы выбрали оплату через ${method}.`);
    setSelectedPlanId(null);
  };

  const handlePresetResume = () => {
    const resumeRecipe = recipes.find((recipe) => recipe.id === "role-tailored-resume");
    if (!resumeRecipe) return;
    setActiveTab("Работа");
    setSearchValue("резюме");
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
    handleLaunchRecipe(resumeRecipe, "Работа");
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("review_submitted", { rating: reviewRating });
    showToast("Спасибо! Отзыв отправлен.");
    setReviewsModalOpen(false);
  };

  return (
    <main className="pb-24 md:pb-0">
      <section id="hero" className="hero-surface relative overflow-hidden pb-12 pt-20 md:pb-16 md:pt-24">
        <div className="container-soft grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary">
              Понятный помощник
            </span>
            <div>
              <h1 className="font-heading text-[44px] font-semibold leading-[1.15] text-text">
                Понятный ИИ. Готовый результат за 60 секунд.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Опишите задачу своими словами — мы подберём рецепт и сделаем за вас. Никаких сложных настроек.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleHeroCTA}
                aria-label={auth.user ? "Перейти в дашборд" : "Начать бесплатно"}
                size="lg"
              >
                {auth.user ? "Перейти в дашборд" : "Начать бесплатно"}
              </Button>
              <Button variant="secondary" size="lg" onClick={startOnboarding} aria-label="Попробовать на примере">
                Попробовать на примере
              </Button>
              <Button variant="link" onClick={handleExamplesClick} aria-label="Посмотреть примеры">
                Посмотреть примеры
              </Button>
            </div>
            <p className="text-sm text-muted">Без карты • 20 запросов в день • Можно отменить в 1 клик</p>
            <p className="text-sm font-semibold text-text">
              12 487 человек за последние 30 дней • Средняя оценка 4,8/5
            </p>
            <div className="flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-muted">
                  <span aria-hidden>✔</span>
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <Card className="relative overflow-hidden border border-white/60 bg-white/90 shadow-[0_24px_60px_-36px_rgba(15,18,34,0.3)]">
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                <span>Рецепт</span>
                <span className="text-success">Готово на 100%</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Поясни договор аренды простыми словами</h3>
                <p className="mt-2 text-sm text-muted">На это ушло 42 секунды</p>
              </div>
              <ol className="space-y-3 text-sm text-text">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary">
                    1
                  </span>
                  Читаем текст
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary">
                    2
                  </span>
                  Выделяем важное
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary">
                    3
                  </span>
                  Объясняем по пунктам
                </li>
              </ol>
              <div className="rounded-[16px] bg-neutral-50 p-4 text-sm leading-relaxed text-text">
                <p className="font-semibold text-primary">Что важно проверить:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                  <li>Срок аренды и условия продления.</li>
                  <li>Размер депозита и сроки возврата.</li>
                  <li>Ответственность сторон за ремонт и коммунальные платежи.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => handleCopyResult("preview_contract")}
                  aria-label="Скопировать результат"
                >
                  Скопировать
                </Button>
                <Button variant="ghost" onClick={() => handleSaveResult("preview_contract")} aria-label="Сохранить результат">
                  Сохранить
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Section
        id="recipes"
        title="Готовые рецепты"
        subtitle="Начните с простого — так быстрее получается."
        spacing="tight"
        tone="surface"
        className="mt-4 md:mt-0"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-xl">
            <label htmlFor="recipe-search" className="sr-only">
              Напишите, что нужно сделать — мы предложим рецепт
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted" aria-hidden>
                🔍
              </span>
              <input
                id="recipe-search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Напишите, что нужно сделать — мы предложим рецепт"
                className="w-full rounded-[20px] border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-text shadow-sm focus:border-primary focus:outline-none"
                type="search"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted" aria-live="polite">
                Подсказки:
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-muted transition hover:border-primary hover:text-primary"
                    onClick={() => setSearchValue(suggestion)}
                    aria-label={`Использовать подсказку ${suggestion}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Категории рецептов">
            {recipeTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id ? "border-primary bg-primary-50 text-primary" : "border-neutral-200 bg-white text-muted hover:border-primary"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="md:col-span-2 xl:col-span-1">
              <RecipeCard recipe={recipe} tab={activeTab} onLaunch={handleLaunchRecipe} variant="featured" />
            </div>
          ))}
          {remainingRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} tab={activeTab} onLaunch={handleLaunchRecipe} />
          ))}
          {filteredRecipes.length === 0 && (
            <Card className="col-span-full bg-white text-center">
              <p className="text-base font-semibold text-text">С чего начнём?</p>
              <p className="mt-2 text-sm text-muted">
                Выберите рецепт или опишите задачу простыми словами.
              </p>
            </Card>
          )}
        </div>
      </Section>

      <Section
        id="chat"
        title="Обычный чат"
        subtitle="Можно говорить голосом или писать текстом."
        spacing="tight"
        tone="muted"
      >
        <Card className="space-y-5">
          <div className="flex items-center gap-3 rounded-[20px] border border-neutral-200 bg-white px-4 py-5">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white"
              aria-label="Включить голосовой ввод"
            >
              🎙️
            </button>
            <input
              type="text"
              placeholder="Нажмите кнопку и скажите, что нужно…"
              className="w-full border-none bg-transparent text-base text-text placeholder:text-muted focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {chatChips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-muted transition hover:border-primary hover:text-primary"
                onClick={() => showToast(`Добавили подсказку: ${chip}`)}
              >
                {chip}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={handlePresetResume} aria-label="Сделать из текста резюме">
            Сделать из текста резюме →
          </Button>
        </Card>
      </Section>

      <Section
        id="models"
        title="Понятные модели — без жаргона"
        subtitle="Если не хотите выбирать — мы сделаем это за вас."
        tone="surface"
      >
        <ModelTable />
      </Section>

      <Section
        id="privacy"
        title="Приватность"
        subtitle="Вы решаете, что хранить."
        spacing="tight"
        tone="muted"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-muted">
          <span aria-hidden>🛡️</span>
          Надёжные провайдеры в ЕС • Совместимо с требованиями РФ
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {privacyCards.map((card) => (
            <Card key={card.title} className="flex h-full flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text">{card.title}</h3>
                <p className="mt-3 text-sm text-muted">{card.description}</p>
              </div>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {card.cta}
                <span aria-hidden>→</span>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <div className="section-divider my-8 md:my-10" />

      <Section
        id="pricing"
        title="Тарифы"
        subtitle="Оплата картой, СБП и МИР. Отмена — в один клик."
        tone="surface"
      >
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex h-full flex-col ${plan.highlight ? "border-primary-300 bg-primary-50" : "bg-white"}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-text">{plan.name}</span>
                  {plan.highlight && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Рекомендуем</span>
                  )}
                </div>
                <div className="text-3xl font-semibold text-text" style={{ fontFamily: "var(--font-jost)" }}>
                  {plan.price}
                  <span className="ml-1 text-sm font-medium text-muted">{plan.period}</span>
                </div>
                <ul className="space-y-2 text-sm text-muted">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto space-y-2 pt-4 md:pt-5">
                <Button className="w-full" onClick={() => openPlanModal(plan.id)} aria-label={`Выбрать тариф ${plan.name}`}>
                  Выбрать
                </Button>
                <p className="text-center text-xs text-muted">{plan.footnote}</p>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">*Защита от злоупотреблений: без капч/скрапинга и т.п.</p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          onClick={() => setComparisonOpen((prev) => !prev)}
        >
          Сравнение — {comparisonOpen ? "скрыть" : "показать"}
        </button>
        {comparisonOpen && (
          <Card className="mt-4 space-y-2 text-sm text-muted">
            <p>Free — чтобы познакомиться и протестировать рецепты.</p>
            <p>Семья — общий доступ, папки и избранное для домашних и учебных задач.</p>
            <p>Про — «разумный безлимит», загрузка файлов и приватные рецепты для работы.</p>
          </Card>
        )}
      </Section>

      <Section
        id="testimonials"
        title="Отзывы"
        subtitle="До и после — коротко и по делу."
        spacing="tight"
        tone="muted"
      >
        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold text-muted">★ 4,8 (за 30 дней)</div>
          <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4" role="region" aria-label="Истории пользователей">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          <button
            type="button"
            className="self-start text-sm font-semibold text-primary underline-offset-4 hover:underline"
            onClick={() => {
              setReviewsModalOpen(true);
              setReviewsPage(1);
            }}
          >
            Смотреть все 112 отзывов →
          </button>
        </div>
      </Section>
      <div className="section-divider my-8 md:my-10" />

      <Section
        id="faq"
        title="FAQ"
        subtitle="Ответы на самые частые вопросы."
        spacing="tight"
        tone="surface"
      >
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} {...faq} />
          ))}
        </div>
      </Section>

      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="container-soft flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} ПростоИИ
            <span className="ml-2">•</span>
            <Link href="/privacy" className="ml-2 underline-offset-4 hover:underline">
              Политика
            </Link>
            <Link href="/data-storage" className="ml-3 underline-offset-4 hover:underline">
              Хранение данных
            </Link>
            <Link href="/settings/privacy" className="ml-3 underline-offset-4 hover:underline">
              Настройки
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="mailto:team@prostoii.ru" className="underline-offset-4 hover:underline">
              team@prostoii.ru
            </Link>
            <Link href="https://t.me/prostoii_support" className="underline-offset-4 hover:underline">
              Поддержка в Telegram
            </Link>
          </div>
        </div>
      </footer>

      {onboardingOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,18,34,0.55)] px-4"
          onClick={closeOnboarding}
        >
          <div
            ref={onboardingDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={onboardingDialogTitleId}
            className="w-full max-w-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <Card className="w-full bg-white">
              <div className="flex items-center justify-between">
                <h3 id={onboardingDialogTitleId} className="text-xl font-semibold text-text">
                  Первый результат
                </h3>
                <button type="button" aria-label="Закрыть" onClick={closeOnboarding} className="text-muted">
                  ✕
                </button>
              </div>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted">Шаг {onboardingStage + 1} из 3</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full rounded-full bg-primary" style={{ width: `${((onboardingStage + 1) / 3) * 100}%` }} />
              </div>
              <div className="rounded-[16px] bg-neutral-50 p-4 text-sm text-text">
                {onboardingStage === 0 && "Загружаем пример задачи и подбираем рецепт."}
                {onboardingStage === 1 && "Подстраиваем тон — чтобы звучало спокойно и без конфликтов."}
                {onboardingStage === 2 && "Проверяем факты и форматируем текст."}
                {onboardingStage === 3 && (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-text">Готово!</p>
                    <p className="text-sm text-muted">
                      Получился пост для ЖКХ: спокойный тон, чёткие шаги и приглашение к диалогу.
                    </p>
                    <div className="rounded-[12px] bg-white p-3 text-sm text-text">
                      Уважаемые соседи! С 12 мая проводим профилактику лифтов. Просим планировать время заранее, чтобы избежать очередей. Если нужна помощь — напишите диспетчеру в чат дома.
                    </div>
                  </div>
                )}
              </div>
              {demoResultReady && (
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={() => handleCopyResult("demo_recipe")}>
                    Скопировать
                  </Button>
                  <Button variant="ghost" onClick={() => handleSaveResult("demo_recipe")}>
                    Сохранить
                  </Button>
                  <Button onClick={closeOnboarding}>Создать ещё</Button>
                </div>
              )}
            </div>
            </Card>
          </div>
        </div>
      )}

      {activePlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,18,34,0.55)] px-4"
          onClick={() => setSelectedPlanId(null)}
        >
          <div
            ref={planDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={planDialogTitleId}
            className="w-full max-w-md"
            onClick={(event) => event.stopPropagation()}
          >
            <Card className="w-full bg-white">
              <div className="flex items-center justify-between">
                <h3 id={planDialogTitleId} className="text-xl font-semibold text-text">
                  Оплата тарифа «{activePlan.name}»
                </h3>
                <button type="button" aria-label="Закрыть" onClick={() => setSelectedPlanId(null)} className="text-muted">
                  ✕
                </button>
              </div>
            <p className="mt-2 text-sm text-muted">Выберите удобный способ оплаты.</p>
            <div className="mt-4 space-y-3">
              {["Карта", "СБП", "МИР"].map((method) => (
                <Button
                  key={method}
                  className="w-full"
                  onClick={() => handleSelectPlan(activePlan.id, activePlan.price, method)}
                  aria-label={`Оплатить тариф ${activePlan.name} через ${method}`}
                >
                  {method}
                </Button>
              ))}
            </div>
            </Card>
          </div>
        </div>
      )}

      {reviewsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,18,34,0.55)] px-4"
          onClick={() => setReviewsModalOpen(false)}
        >
          <div
            ref={reviewsDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={reviewsDialogTitleId}
            className="w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Card className="w-full bg-white">
              <div className="flex items-center justify-between">
                <h3 id={reviewsDialogTitleId} className="text-xl font-semibold text-text">
                  Отзывы пользователей
                </h3>
                <button type="button" aria-label="Закрыть" onClick={() => setReviewsModalOpen(false)} className="text-muted">
                  ✕
                </button>
              </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {paginatedReviews.map((review) => (
                <Card key={review.id} className="bg-neutral-50">
                  <p className="text-sm font-semibold text-text">{review.name}</p>
                  <p className="text-xs text-muted">{review.role}</p>
                  <p className="mt-3 text-sm text-muted">{review.before}</p>
                  <p className="mt-2 text-sm font-medium text-text">{review.after}</p>
                </Card>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-muted hover:border-primary hover:text-primary"
                  onClick={() => setReviewsPage((page) => Math.max(1, page - 1))}
                  disabled={reviewsPage === 1}
                >
                  ← Назад
                </button>
                <span className="text-sm text-muted">
                  Страница {reviewsPage} из {totalReviewPages}
                </span>
                <button
                  type="button"
                  className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-muted hover:border-primary hover:text-primary"
                  onClick={() => setReviewsPage((page) => Math.min(totalReviewPages, page + 1))}
                  disabled={reviewsPage === totalReviewPages}
                >
                  Вперёд →
                </button>
              </div>
              <form className="flex items-center gap-2" onSubmit={handleReviewSubmit}>
                <label htmlFor="review-rating" className="text-sm text-muted">
                  Оцените сервис:
                </label>
                <select
                  id="review-rating"
                  value={reviewRating}
                  onChange={(event) => setReviewRating(Number(event.target.value))}
                  className="rounded-[12px] border border-neutral-200 px-3 py-1 text-sm text-text"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <Button type="submit" variant="secondary">
                  Отправить
                </Button>
              </form>
            </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
