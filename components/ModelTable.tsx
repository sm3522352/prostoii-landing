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
  const { autoModel, setAutoModel } = useAppStore();

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-text">Подбор модели</p>
          <p className="text-sm text-muted">Выбирайте вручную или доверьтесь автоподбору.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoModel}
          onClick={() => setAutoModel(!autoModel)}
          className={clsx(
            "flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition",
            autoModel ? "border-success text-success" : "border-neutral-200 text-muted"
          )}
          title="Подбираем лучший вариант под задачу. Можно отключить."
        >
          Автовыбор модели — {autoModel ? "Включён" : "Выключен"}
          <span
            aria-hidden
            className="inline-flex h-6 w-11 items-center rounded-full border transition"
            style={{
              borderColor: autoModel ? "var(--success)" : "var(--muted-border)",
              backgroundColor: autoModel ? "rgba(16,185,129,0.12)" : "rgba(15,18,34,0.06)"
            }}
          >
            <span
              className={clsx(
                "mx-1 h-4 w-4 rounded-full bg-white shadow transition",
                autoModel ? "translate-x-5" : "translate-x-0"
              )}
            />
          </span>
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[720px] w-full border-t border-neutral-100 text-left text-sm text-text">
          <thead className="bg-neutral-50/80">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">
                Модель
              </th>
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header}
                  className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest text-muted"
                  title={`${header}. Описание возможностей модели.`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-neutral-100">
                <th scope="row" className="px-6 py-4 text-left text-sm font-semibold text-text">
                  <span>{row.name}</span>
                  <p className="mt-1 text-xs text-muted">{row.bestFor}</p>
                </th>
                {row.checks.map((check, index) => (
                  <td key={`${row.name}-${index}`} className="px-6 py-4 text-center">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base"
                      style={{
                        backgroundColor: check ? "rgba(16,185,129,0.14)" : "rgba(15,18,34,0.05)",
                        color: check ? "var(--success)" : "var(--muted-text)"
                      }}
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
