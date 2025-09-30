"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";

type FileItem = {
  id: string;
  name: string;
  type: "doc" | "table" | "audio";
  size: number;
  updatedAt: string;
  owner: string;
  pinned?: boolean;
  scope: "team" | "personal";
};

const files: FileItem[] = [
  { id: "1", name: "Коммерческое предложение.pdf", type: "doc", size: 1.2, updatedAt: "5 мин назад", owner: "Вы", pinned: true, scope: "team" },
  { id: "2", name: "Сводка затрат.xlsx", type: "table", size: 0.48, updatedAt: "Вчера", owner: "Анна", scope: "team" },
  { id: "3", name: "Расшифровка звонка.m4a", type: "audio", size: 2.1, updatedAt: "3 дня назад", owner: "Вы", scope: "personal" },
  { id: "4", name: "План урока.docx", type: "doc", size: 0.3, updatedAt: "1 неделю назад", owner: "Вы", scope: "personal" },
];

const typeLabels: Record<FileItem["type"], string> = {
  doc: "Документ",
  table: "Таблица",
  audio: "Аудио",
};

export default function FilesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [scope, setScope] = useState<"team" | "personal">("team");

  const scopedFiles = useMemo(() => files.filter((file) => file.scope === scope), [scope]);

  const handleUpload = () => {
    showToast("Выберите файл для загрузки");
    trackEvent("file_upload", { source: "files" });
  };

  const formatSize = (size: number) => `${size.toFixed(2)} МБ`;

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-semibold leading-7 text-[var(--text)]">Файлы</h1>
            <p className="text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
              Храните документы и делитесь с командой. Перетащите файл, чтобы загрузить его мгновенно.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUpload}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--white)]"
            >
              Загрузить файл
            </button>
            <div className="flex items-center rounded-full border border-[var(--muted-border)] p-1 text-sm">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={clsx(
                  "rounded-full px-3 py-1",
                  view === "grid"
                    ? "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]"
                    : "text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-[var(--text)]"
                )}
              >
                Плитка
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={clsx(
                  "rounded-full px-3 py-1",
                  view === "list"
                    ? "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]"
                    : "text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-[var(--text)]"
                )}
              >
                Таблица
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setScope("team")}
            className={clsx(
              "inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm font-semibold",
              scope === "team"
                ? "border-[color-mix(in_srgb,var(--primary)_45%,transparent)] text-[var(--primary)]"
                : "border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-[var(--text)]"
            )}
          >
            Командные
          </button>
          <button
            type="button"
            onClick={() => setScope("personal")}
            className={clsx(
              "inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm font-semibold",
              scope === "personal"
                ? "border-[color-mix(in_srgb,var(--primary)_45%,transparent)] text-[var(--primary)]"
                : "border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-[var(--text)]"
            )}
          >
            Мои
          </button>
        </div>
      </header>

      <Card className="border-dashed" size="lg">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
          <span className="text-2xl" aria-hidden>
            ⬆️
          </span>
          <p className="text-[16px] font-semibold text-[var(--text)]">Перетащите файлы сюда</p>
          <p>или</p>
          <button
            type="button"
            onClick={handleUpload}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--muted-border)] px-5 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_70%,transparent)]"
          >
            Выберите на компьютере
          </button>
        </div>
      </Card>

      {view === "grid" ? (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {scopedFiles.map((file) => (
            <Card key={file.id} className="group relative flex flex-col gap-3" size="sm" interactive>
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold leading-5 text-[var(--text)]">
                  {file.type === "doc" && "📄"}
                  {file.type === "table" && "📊"}
                  {file.type === "audio" && "🎧"}
                  {file.name}
                </span>
                {file.pinned && (
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                    PIN
                  </span>
                )}
              </div>
              <p className="text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                {typeLabels[file.type]} · {formatSize(file.size)}
              </p>
              <div className="mt-auto flex items-center justify-between text-xs text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                <span>{file.updatedAt}</span>
                <span>{file.owner}</span>
              </div>
              <div className="flex items-center justify-end gap-2 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => showToast("Скопировали ссылку")}
                  className="inline-flex h-8 items-center rounded-full border border-[var(--muted-border)] px-3 text-xs font-semibold text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
                >
                  Поделиться
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Открываем файл")}
                  className="inline-flex h-8 items-center rounded-full bg-[var(--primary)] px-4 text-xs font-semibold text-[var(--white)]"
                >
                  Открыть
                </button>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-[var(--muted-border)]">
          <table className="min-w-full text-left text-sm text-[var(--text)]">
            <thead className="bg-[color-mix(in_srgb,var(--text)_4%,transparent)] text-xs uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
              <tr>
                <th scope="col" className="px-4 py-3">Файл</th>
                <th scope="col" className="px-4 py-3">Тип</th>
                <th scope="col" className="px-4 py-3 text-right">Размер</th>
                <th scope="col" className="px-4 py-3">Обновлено</th>
                <th scope="col" className="px-4 py-3">Владелец</th>
                <th scope="col" className="px-4 py-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {scopedFiles.map((file) => (
                <tr key={`row-${file.id}`} className="border-t border-[color-mix(in_srgb,var(--text)_6%,transparent)]">
                  <td className="px-4 py-3 font-semibold">{file.name}</td>
                  <td className="px-4 py-3 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{typeLabels[file.type]}</td>
                  <td className="px-4 py-3 text-right text-[color-mix(in_srgb,var(--text)_65%,transparent)]">{formatSize(file.size)}</td>
                  <td className="px-4 py-3 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{file.updatedAt}</td>
                  <td className="px-4 py-3 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{file.owner}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => showToast("Открываем файл")}
                      className="inline-flex h-8 items-center rounded-full border border-[var(--muted-border)] px-3 text-xs font-semibold text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
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
