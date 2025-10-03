"use client";

import { FormEvent, useState } from "react";

import { CONTACT_EMAIL } from "@/lib/env";

export default function CancelForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encodedEmail = encodeURIComponent(email.trim());
    const body = encodedEmail ? `Email:%20${encodedEmail}` : "Email:%20";
    const mailto = `mailto:${CONTACT_EMAIL}?subject=Отмена%20подписки&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="cancel-email"
          className="text-sm font-medium text-white/80"
        >
          Электронная почта аккаунта
        </label>
        <input
          id="cancel-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5 hover:shadow-[0_32px_90px_-40px_rgba(255,255,255,0.55)]"
      >
        Отправить запрос на отмену
      </button>
      <p className="text-sm text-white/65">
        После отправки заявки также можно отменить подписку в личном кабинете —
        мы пришлём инструкции на почту.
      </p>
    </form>
  );
}
