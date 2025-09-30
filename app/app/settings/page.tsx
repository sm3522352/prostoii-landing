"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { useAppStore } from "@/lib/store";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import clsx from "clsx";

export default function SettingsPage() {
  const {
    preferences: { autoModel },
    setAutoModel,
  } = useAppStore();
  const [privateMode, setPrivateMode] = useState(true);
  const [historyRetention, setHistoryRetention] = useState("30");

  const handleTogglePrivate = () => {
    setPrivateMode((prev) => !prev);
    showToast("Обновили приватный режим");
    trackEvent("privacy_change", { setting: "private_mode", value: !privateMode });
  };

  const handleRetentionChange = (value: string) => {
    setHistoryRetention(value);
    showToast("Срок хранения обновлён");
    trackEvent("privacy_change", { setting: "retention_days", value });
  };

  const handlePlanUpgrade = () => {
    showToast("Переключаем на оплату");
    trackEvent("plan_upgrade", { source: "settings" });
  };

  return (
    <div className="space-y-8">
      <header className="scroll-reveal space-y-2">
        <h1 className="text-3xl font-semibold text-text">Настройки</h1>
        <p className="text-sm text-muted">Управляйте приватностью, сроком хранения и подпиской.</p>
      </header>

      <section className="scroll-reveal grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold text-text">Приватность</h2>
            <p className="text-sm text-muted">Запросы шифруются. Можно отключить сохранение истории.</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-neutral-200/70 bg-neutral-50/80 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-text">Приватный режим</p>
              <p className="text-xs text-muted">Не сохраняем запросы после завершения сессии.</p>
            </div>
            <button
              type="button"
              onClick={handleTogglePrivate}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/95 px-3 py-1 text-sm font-semibold text-text"
              aria-pressed={privateMode}
            >
              <span
                className={clsx(
                  "inline-flex h-5 w-10 items-center rounded-full",
                  privateMode ? "bg-primary/30" : "bg-neutral-200"
                )}
              >
                <span
                  className={clsx(
                    "ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-soft transition",
                    privateMode ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </span>
              {privateMode ? "Включён" : "Выключен"}
            </button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text" htmlFor="history-retention">
              Срок хранения истории
            </label>
            <select
              id="history-retention"
              value={historyRetention}
              onChange={(event) => handleRetentionChange(event.target.value)}
              className="w-full rounded-xl border border-neutral-200/70 bg-white/95 px-4 py-2 text-sm font-semibold text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="7">7 дней</option>
              <option value="30">30 дней</option>
              <option value="90">90 дней</option>
            </select>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold text-text">Автовыбор модели</h2>
            <p className="text-sm text-muted">Мы сами подбираем подходящую модель под запрос.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAutoModel(!autoModel);
              showToast(autoModel ? "Автовыбор отключён" : "Автовыбор включён");
              trackEvent("privacy_change", { setting: "auto_model", value: !autoModel });
            }}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/95 px-3 py-1 text-sm font-semibold text-text",
              autoModel && "ring-2 ring-primary/30"
            )}
            aria-pressed={autoModel}
          >
            <span
              className={clsx(
                "inline-flex h-5 w-10 items-center rounded-full",
                autoModel ? "bg-primary/30" : "bg-neutral-200"
              )}
            >
              <span
                className={clsx(
                  "ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-soft transition",
                  autoModel ? "translate-x-5" : "translate-x-0"
                )}
              />
            </span>
            {autoModel ? "Включён" : "Выключен"}
          </button>
          <p className="text-xs text-muted">Можно переключить в любой момент прямо из чата или рецептов.</p>
        </Card>
      </section>

      <section className="scroll-reveal">
        <Card className="flex flex-col gap-4 bg-gradient-to-r from-primary/8 via-primary/6 to-primary/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-text">Тариф «Команда»</h2>
              <p className="mt-1 text-sm text-muted">200 генераций в день, общие папки, до 5 участников, приоритетная поддержка.</p>
            </div>
            <button
              type="button"
              onClick={handlePlanUpgrade}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Обновить до 699 ₽/мес
            </button>
          </div>
          <p className="text-xs text-muted">Отменить можно в любой момент. Напомним за три дня до списания.</p>
        </Card>
      </section>
    </div>
  );
}
