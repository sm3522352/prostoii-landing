"use client";

import { FormEvent, useMemo, useState } from "react";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import clsx from "clsx";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    text: "Здравствуйте! Чем сегодня помочь? Могу подсказать рецепт, разобрать документ или подсобрать идеи.",
    time: "09:32",
  },
  {
    id: "2",
    role: "user",
    text: "Привет! Нужен план письма клиенту, чтобы мягко перенести дедлайн.",
    time: "09:33",
  },
  {
    id: "3",
    role: "assistant",
    text: "Собрала структуру: 1) поблагодарить, 2) честно сказать о причине, 3) предложить новые сроки и бонус. Могу развернуть?",
    time: "09:33",
  },
];

const chips = [
  "Сделай короче",
  "Добавь конкретику",
  "Списком",
  "Попроси уточнения",
  "На «ты»",
];

const formatActions = [
  { id: "bold", label: "Жирный", symbol: "B" },
  { id: "list", label: "Список", symbol: "•" },
  { id: "quote", label: "Цитата", symbol: "❝" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("Нужно перенести дедлайн на пятницу, сохранив доверие.");
  const [isSending, setIsSending] = useState(false);

  const lastMessages = useMemo(() => messages.slice(-6), [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value) return;

    setIsSending(true);
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: value,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    showToast("Сообщение отправлено");
    trackEvent("chat_send", { length: value.length });

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Записала. Подготовлю письмо на мягкий перенос и добавлю два варианта бонуса.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsSending(false);
    }, 800);
  };

  const handleChip = (chip: string) => {
    setInputValue((prev) => (prev ? `${prev}. ${chip}` : chip));
  };

  const handleFormat = (id: string) => {
    showToast(`Применили формат «${id}»`);
  };

  return (
    <div className="space-y-8">
      <header className="scroll-reveal space-y-2">
        <h1 className="text-3xl font-semibold text-text">Чат</h1>
        <p className="text-sm text-muted">Задавайте вопросы простыми словами, мы уточним и подготовим готовый ответ.</p>
      </header>

      <section className="scroll-reveal space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChip(chip)}
              className="rounded-full border border-neutral-200/70 bg-white/95 px-3 py-1 text-sm font-semibold text-muted transition hover:text-text"
            >
              {chip}
            </button>
          ))}
        </div>
        <Card className="flex h-[420px] flex-col gap-4 overflow-hidden bg-white/95">
          <div className="flex-1 space-y-3 overflow-y-auto rounded-[14px] bg-neutral-50/70 p-4">
            {lastMessages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  "max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "bg-white text-text shadow-soft"
                    : "ml-auto bg-primary text-white"
                )}
                aria-label={message.role === "assistant" ? "Сообщение ассистента" : "Ваше сообщение"}
              >
                <p>{message.text}</p>
                <span className="mt-2 block text-xs opacity-70">{message.time}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              {formatActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleFormat(action.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/70 text-sm font-semibold text-muted transition hover:text-text"
                  aria-label={action.label}
                >
                  {action.symbol}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast("Голосовой ввод скоро будет доступен")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/70 text-muted transition hover:text-text"
                  aria-label="Голосовой ввод"
                >
                  🎙️
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast("Загрузка файла");
                    trackEvent("file_upload", { source: "chat" });
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/70 text-muted transition hover:text-text"
                  aria-label="Прикрепить файл"
                >
                  📎
                </button>
              </div>
            </div>
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Опишите, что нужно сделать"
              rows={3}
              className="w-full rounded-2xl border border-neutral-200/70 bg-white/95 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Ответ придёт за пару секунд. Можно задавать follow-up.</span>
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
              >
                Отправить
                <span aria-hidden>↗</span>
              </button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
