"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAppStore } from "@/lib/store";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";

const focusOptions = [
  { id: "docs", title: "Документы", description: "Договоры, письма и длинные тексты" },
  { id: "explain", title: "Объяснения", description: "Быстро и простыми словами" },
  { id: "ideas", title: "Идеи", description: "Подборки и сценарии для вдохновения" },
];

const automationOptions = [
  { id: "auto", title: "Авто", description: "Просто рассказываете задачу — мы подберём рецепт", badge: "Рекомендуем" },
  { id: "manual", title: "Вручную", description: "Выбирайте модели и рецепты самостоятельно" },
  { id: "mixed", title: "Комбинировать", description: "Авто + ручной контроль, можно переключаться" },
];

const presets = [
  { id: "teacher", title: "Учителю", description: "Конспекты уроков, сценарии занятий и проверка работ" },
  { id: "manager", title: "Менеджеру", description: "Отчёты, письма клиентам и расшифровка встреч" },
  { id: "family", title: "Для семьи", description: "Рецепты, планирование дел и помощь с документами" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { auth, completeOnboarding, hydrated } = useAppStore();
  const { onboardingDone, user } = auth;

  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>("auto");

  useEffect(() => {
    if (onboardingDone) {
      router.replace("/app");
    }
  }, [onboardingDone, router]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!user) {
      router.replace("/login");
    }
  }, [hydrated, router, user]);

  const totalSteps = 3;
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step]);

  const handleSkip = () => {
    completeOnboarding();
    trackEvent("onboarding_step", { step, action: "skip" });
    router.push("/app");
  };

  const handleNext = () => {
    if (step >= totalSteps - 1) {
      completeOnboarding();
      trackEvent("onboarding_step", { step: totalSteps, action: "complete" });
      router.push("/app");
      return;
    }
    const nextStep = Math.min(step + 1, totalSteps - 1);
    trackEvent("onboarding_step", { step: nextStep + 1, action: "next" });
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handlePreset = (id: string) => {
    completeOnboarding();
    trackEvent("onboarding_step", { step: totalSteps, action: "preset", presetId: id });
    showToast("Пресет добавлен");
    router.push("/app");
  };

  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Добро пожаловать</p>
            <h1 className="mt-2 text-3xl font-semibold text-text">Несколько вопросов для точного старта</h1>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="hidden rounded-xl border border-neutral-200/70 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text sm:inline-flex"
          >
            Пропустить
          </button>
        </header>
        <div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="relative h-2 overflow-hidden rounded-full bg-neutral-100"
          >
            <span className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs font-semibold text-muted">Шаг {step + 1} из {totalSteps}</p>
        </div>
        <section className="flex-1 rounded-3xl border border-neutral-200/70 bg-white/95 p-6 shadow-soft">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-text">Что хотите сделать в первую очередь?</h2>
                <p className="mt-2 text-sm text-muted">Выберите один вариант — мы предложим подходящие рецепты.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {focusOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFocus(option.id)}
                    className={clsx(
                      "flex flex-col gap-2 rounded-2xl border px-4 py-5 text-left transition",
                      focus === option.id
                        ? "border-primary/50 bg-primary/5 text-text shadow-soft"
                        : "border-neutral-200/70 bg-neutral-50/70 text-muted hover:text-text"
                    )}
                  >
                    <span className="text-sm font-semibold text-text">{option.title}</span>
                    <span className="text-xs text-muted">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-text">Как удобнее управлять результатами?</h2>
                <p className="mt-2 text-sm text-muted">Можно переключаться позже в настройках.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {automationOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    className={clsx(
                      "flex flex-col gap-2 rounded-2xl border px-4 py-5 text-left transition",
                      mode === option.id
                        ? "border-primary/50 bg-primary/5 text-text shadow-soft"
                        : "border-neutral-200/70 bg-neutral-50/70 text-muted hover:text-text"
                    )}
                  >
                    <span className="flex items-center justify-between text-sm font-semibold text-text">
                      {option.title}
                      {option.badge && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                          {option.badge}
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-text">Выберите стартовый пресет</h2>
                <p className="mt-2 text-sm text-muted">Можем добавить сразу несколько — начните с одного.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePreset(preset.id)}
                    className="flex flex-col gap-2 rounded-2xl border border-neutral-200/70 bg-neutral-50/70 px-4 py-5 text-left text-muted transition hover:border-primary/40 hover:bg-primary/5 hover:text-text"
                  >
                    <span className="text-sm font-semibold text-text">{preset.title}</span>
                    <span className="text-xs text-muted">{preset.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
        <footer className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex rounded-xl border border-neutral-200/70 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text sm:hidden"
          >
            Пропустить
          </button>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 0}
              className="inline-flex items-center rounded-xl border border-neutral-200/70 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {step === totalSteps - 1 ? "Готово" : "Далее"}
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
