import clsx from "clsx";
import Card from "./Card";

const headers = [
  "Чат и тексты",
  "Пояснить сложное",
  "Аудио → текст",
  "Изображения",
  "Поиск по своим данным"
];
const rows = [
  { name:"Ясный", checks:[true,true,false,false,false] },
  { name:"Быстрый", checks:[true,false,false,false,false] },
  { name:"Для длинных текстов", checks:[true,true,false,false,false] },
  { name:"Картинки", checks:[false,false,false,true,false] },
  { name:"Поиск", checks:[false,false,false,false,true] }
];

export default function ModelTable() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[640px] w-full text-sm text-neutral-700">
          <thead className="bg-neutral-50/90 backdrop-blur-sm md:sticky md:top-0">
            <tr>
              <th scope="col" className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Модель
              </th>
              {headers.map((h) => (
                <th
                  scope="col"
                  key={h}
                  className="p-4 text-center text-xs font-semibold uppercase tracking-wide text-neutral-500"
                  title={`${h} — подсказка, что умеет модель`}
                  aria-label={`${h}. Описание возможностей модели`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-neutral-100 even:bg-white/60">
                <th scope="row" className="p-4 text-left text-sm font-semibold text-accent">
                  {r.name}
                </th>
                {r.checks.map((c, i) => (
                  <td key={i} className="p-4 text-center">
                    <span
                      className={clsx(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-base",
                        c ? "bg-primary-100 text-primary-600" : "bg-neutral-100 text-neutral-400"
                      )}
                      role="img"
                      aria-label={c ? "Доступно" : "Не поддерживается"}
                    >
                      {c ? "✓" : "—"}
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
