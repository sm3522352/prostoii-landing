"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";

const TELEGRAM_BOT = "prostoii_bot";

type TelegramAuthPayload = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  hash: string;
  auth_date: string;
};

declare global {
  interface Window {
    __prostoiiTelegramAuth?: (user: TelegramAuthPayload) => void;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { auth, setUser } = useAppStore();
  const { onboardingDone } = auth;

  useEffect(() => {
    window.__prostoiiTelegramAuth = (user) => {
      setUser({
        id: String(user.id),
        name: [user.first_name, user.last_name].filter(Boolean).join(" ") || user.first_name,
        username: user.username,
        avatarUrl: user.photo_url,
      });
      trackEvent("login_success", { user_id: user.id });
      showToast("Готово. Мы никому ничего не публикуем.");
      const nextRoute = onboardingDone ? "/app" : "/onboarding";
      router.push(nextRoute);
    };

    return () => {
      delete window.__prostoiiTelegramAuth;
    };
  }, [onboardingDone, router, setUser]);

  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-neutral-200/70 bg-white/95 p-8 shadow-soft-lg">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">ПростоИИ</p>
            <h1 className="mt-3 text-3xl font-semibold text-text">Войдите через Telegram</h1>
            <p className="mt-3 text-sm text-muted">
              Мы используем Telegram только для авторизации. Ничего не публикуем и не пишем вашим контактам.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <div id="telegram-login" className="flex justify-center">
                <Script
                  src="https://telegram.org/js/telegram-widget.js?22"
                  data-telegram-login={TELEGRAM_BOT}
                  data-size="large"
                  data-userpic="false"
                  data-request-access="write"
                  data-onauth="window.__prostoiiTelegramAuth && window.__prostoiiTelegramAuth(user)"
                  strategy="afterInteractive"
                />
              </div>
            </div>
            <Link
              href={`https://t.me/${TELEGRAM_BOT}?start=webapp`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              target="_blank"
              rel="noreferrer"
            >
              Открыть в Telegram
              <span aria-hidden>↗</span>
            </Link>
            <p className="text-center text-xs text-muted">
              Если кнопка выше не работает, откройте @prostoii_bot и нажмите «Открыть веб-версию».
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
