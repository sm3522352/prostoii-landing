"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center text-white">
      <div className="max-w-xl space-y-4">
        <p className="text-sm font-medium text-white/60">Что-то пошло не так</p>
        <h1 className="text-4xl font-semibold">Мы уже разбираемся</h1>
        <p className="text-sm text-white/70">
          Попробуйте обновить страницу или вернитесь на главную.
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-xs text-white/60">
          {error.message}
        </pre>
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
