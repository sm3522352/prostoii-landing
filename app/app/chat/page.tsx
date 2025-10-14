"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import { useAppStore } from "@/lib/store";

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
  "Сделай проще",
  "Объясни как ребёнку",
  "Списком",
  "Добавь примеры",
  "Сформулируй вопрос",
  "Попроси уточнения",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("Нужно перенести дедлайн на пятницу, сохранив доверие.");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    ui: { promptDraft },
    setPromptDraft,
  } = useAppStore();

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
    window.requestAnimationFrame(resizeInput);
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
    setInputValue((prev) => (prev ? `${prev} ${chip}` : chip));
    showToast(`Добавили подсказку: ${chip}`);
  };

  const resizeInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    const newHeight = Math.min(inputRef.current.scrollHeight, 6 * 24);
    inputRef.current.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    resizeInput();
  }, [resizeInput]);

  useEffect(() => {
    if (!promptDraft) {
      return;
    }

    setInputValue(promptDraft);
    window.requestAnimationFrame(resizeInput);
    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    setPromptDraft("");
  }, [promptDraft, resizeInput, setPromptDraft]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold leading-7 text-[var(--text)]">Чат</h1>
        <span className="text-sm text-[color-mix(in_srgb,var(--text)_55%,transparent)]">История хранится 30 дней</span>
      </div>

      <section className="space-y-4">
        <div className="-mx-1 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2 px-1">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChip(chip)}
                className="inline-flex h-10 items-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-medium text-[color-mix(in_srgb,var(--text)_70%,transparent)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <Card className="flex h-[500px] flex-col gap-4" size="lg">
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {lastMessages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                  message.role === "assistant"
                    ? "bg-[color-mix(in_srgb,var(--text)_4%,transparent)] text-[var(--text)]"
                    : "ml-auto bg-[var(--primary)] text-[var(--white)]"
                )}
                aria-label={message.role === "assistant" ? "Сообщение ассистента" : "Ваше сообщение"}
              >
                <p>{message.text}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                  <span>{message.time}</span>
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
                        onClick={() => showToast("Скопировали ответ")}
                      >
                        ⧉ Копировать
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
                        onClick={() => showToast("Сохранили в рецептах")}
                      >
                        ★ Сохранить
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
                        onClick={() => showToast("Дополнительные действия скоро будут")}
                      >
                        ⋯ Ещё
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--muted-border)] bg-[var(--surface)] px-4 py-3">
            <div className="flex items-end gap-3">
              <button
                type="button"
                onClick={() => showToast("Голосовой ввод скоро будет доступен")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_60%,transparent)]"
                aria-label="Голосовой ввод"
              >
                🎙️
              </button>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  resizeInput();
                }}
                onFocus={resizeInput}
                placeholder="Напишите, что нужно сделать"
                rows={1}
                className="flex-1 resize-none rounded-md border-0 bg-transparent text-sm leading-6 text-[var(--text)] placeholder:text-[color-mix(in_srgb,var(--text)_55%,transparent)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--white)] disabled:opacity-60"
              >
                Отправить
              </button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
