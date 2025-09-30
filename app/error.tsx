"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="container-soft py-16 text-center">
      <h1 className="text-3xl font-semibold text-text">Что-то пошло не так</h1>
      <p className="mt-3 text-muted">Мы уже разбираемся. Попробуйте обновить страницу.</p>
      <pre className="mt-4 text-xs text-muted/80">{error.message}</pre>
      <Link href="/" className="mt-6 inline-block underline text-primary">
        На главную →
      </Link>
    </main>
  );
}
