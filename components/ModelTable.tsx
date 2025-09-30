"use client";

import clsx from "clsx";
import Card from "./Card";
import { useAppStore } from "@/lib/store";

const headers = [
  "Лучше объясняет",
  "Пишет длинные тексты",
  "Помогает с таблицами/кодом",
  "Дешевле"
];

const rows = [
  { name: "Ясный", bestFor: "Объяснения и адаптация", checks: [true, true, false, false] },
  { name: "Длинный", bestFor: "Большие документы", checks: [false, true, true, false] },
  { name: "Практик", bestFor: "Таблицы и расчёты", checks: [false, false, true, false] },
  { name: "Экономный", bestFor: "Повседневные ответы", checks: [true, false, false, true] }
];

export default function ModelTable() {
  const { preferences, setAutoModel } = useAppStore();
  const autoModel = preferences.autoModel;

  return (
    <Card className="overflow-hidden p-0" size="lg">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">Подбор модели</p>
          <p className="text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
            Выбирайте вручную или доверьтесь автоподбору.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoModel}
          onClick={() => setAutoModel(!autoModel)}
          className={clsx(
            "flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition",
            autoModel
              ? "border-[color-mix(in_srgb,var(--success)_55%,transparent)] text-[var(--success)]"
              : "border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
          )}
          title="Подбираем лучший вариант под задачу. Можно отключить."
        >
          Автовыбор модели — {autoModel ? "Включён" : "Выключен"}
          <span
            aria-hidden
            className={clsx(
              "inline-flex h-6 w-11 items-center rounded-full border transition",
              autoModel
                ? "border-[color-mix(in_srgb,var(--success)_55%,transparent)] bg-[color-mix(in_srgb,var(--success)_20%,transparent)]"
                : "border-[var(--muted-border)] bg-[color-mix(in_srgb,var(--text)_8%,transparent)]"
            )}
          >
            <span
              className={clsx(
                "mx-1 h-4 w-4 rounded-full bg-[var(--surface)] shadow-sm transition",
                autoModel ? "translate-x-5" : "translate-x-0"
              )}
            />
          </span>
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[640px] w-full border-t border-[color-mix(in_srgb,var(--text)_6%,transparent)] text-left text-sm text-[var(--text)]">
          <thead className="bg-[color-mix(in_srgb,var(--text)_4%,transparent)]">
            <tr>
              <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                Модель
              </th>
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header}
                  className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--text)_55%,transparent)]"
                  title={`${header}. Описание возможностей модели.`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-[color-mix(in_srgb,var(--text)_6%,transparent)]">
                <th scope="row" className="px-5 py-4 text-left text-sm font-semibold text-[var(--text)]">
                  <span>{row.name}</span>
                  <p className="mt-1 text-xs text-[color-mix(in_srgb,var(--text)_55%,transparent)]">{row.bestFor}</p>
                </th>
                {row.checks.map((check, index) => (
                  <td key={`${row.name}-${index}`} className="px-4 py-4 text-center">
                    <span
                      className={clsx(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full text-base",
                        check
                          ? "bg-[color-mix(in_srgb,var(--success)_22%,transparent)] text-[var(--success)]"
                          : "bg-[color-mix(in_srgb,var(--text)_8%,transparent)] text-[color-mix(in_srgb,var(--text)_55%,transparent)]"
                      )}
                      aria-label={check ? "Подходит" : "Не специализируется"}
                    >
                      {check ? "✓" : "—"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
