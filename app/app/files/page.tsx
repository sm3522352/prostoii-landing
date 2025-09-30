"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import clsx from "clsx";

type FileItem = {
  id: string;
  name: string;
  type: "doc" | "table" | "audio";
  size: string;
  updatedAt: string;
  owner: string;
  pinned?: boolean;
};

const files: FileItem[] = [
  { id: "1", name: "Коммерческое предложение.pdf", type: "doc", size: "1.2 МБ", updatedAt: "5 мин назад", owner: "Вы", pinned: true },
  { id: "2", name: "Сводка затрат.xlsx", type: "table", size: "480 КБ", updatedAt: "Вчера", owner: "Анна" },
  { id: "3", name: "Расшифровка звонка.m4a", type: "audio", size: "2.1 МБ", updatedAt: "3 дня назад", owner: "Вы" },
];

const typeLabels: Record<FileItem["type"], string> = {
  doc: "Документ",
  table: "Таблица",
  audio: "Аудио",
};

export default function FilesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleUpload = () => {
    showToast("Выберите файл для загрузки");
    trackEvent("file_upload", { source: "files" });
  };

  return (
    <div className="space-y-8">
      <header className="scroll-reveal space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-text">Файлы</h1>
            <p className="text-sm text-muted">Загружайте документы, таблицы и аудио — мы расшифруем и подскажем действия.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUpload}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Загрузить файл
            </button>
            <div className="rounded-xl border border-neutral-200/70 p-1 text-sm font-semibold text-muted">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={clsx(
                  "rounded-lg px-3 py-1",
                  view === "grid" ? "bg-white text-text shadow-soft" : "hover:text-text"
                )}
              >
                Плитка
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={clsx(
                  "rounded-lg px-3 py-1",
                  view === "list" ? "bg-white text-text shadow-soft" : "hover:text-text"
                )}
              >
                Таблица
              </button>
            </div>
          </div>
        </div>
      </header>

      {view === "grid" ? (
        <section className="scroll-reveal grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <Card key={file.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                  {file.type === "doc" && "📄"}
                  {file.type === "table" && "📊"}
                  {file.type === "audio" && "🎧"}
                  {file.name}
                </span>
                {file.pinned && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    Закреплено
                  </span>
                )}
              </div>
              <p className="text-sm text-muted">{typeLabels[file.type]} · {file.size}</p>
              <div className="mt-auto flex items-center justify-between text-xs text-muted">
                <span>{file.updatedAt}</span>
                <span>{file.owner}</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => showToast("Открываем файл")}
                  className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                >
                  Открыть
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Поделились ссылкой")}
                  className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                >
                  Поделиться
                </button>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <section className="scroll-reveal overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/95 shadow-soft">
          <table className="min-w-full divide-y divide-neutral-200/70 text-left text-sm">
            <thead className="bg-neutral-50/80 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Файл</th>
                <th scope="col" className="px-6 py-3 font-semibold">Тип</th>
                <th scope="col" className="px-6 py-3 font-semibold">Размер</th>
                <th scope="col" className="px-6 py-3 font-semibold">Обновлено</th>
                <th scope="col" className="px-6 py-3 font-semibold">Владелец</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={`row-${file.id}`} className="border-t border-neutral-200/70">
                  <td className="px-6 py-4 text-sm font-semibold text-text">{file.name}</td>
                  <td className="px-6 py-4 text-sm text-muted">{typeLabels[file.type]}</td>
                  <td className="px-6 py-4 text-sm text-muted">{file.size}</td>
                  <td className="px-6 py-4 text-sm text-muted">{file.updatedAt}</td>
                  <td className="px-6 py-4 text-sm text-muted">{file.owner}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      type="button"
                      onClick={() => showToast("Открываем файл")}
                      className="rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                    >
                      Открыть
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
