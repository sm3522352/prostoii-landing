"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "prostoii-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="card w-full max-w-3xl rounded-3xl border border-white/10 bg-card/90 p-6 shadow-soft-border backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Мы используем cookie</p>
            <p>
              Они помогают нам анализировать трафик и улучшать продукт.
              Продолжая пользоваться сайтом, вы соглашаетесь с условиями
              обработки данных.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.setItem(STORAGE_KEY, "accepted");
              }
              setVisible(false);
            }}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
