import Card from "./Card";

const headers = ["Чат и тексты","Пояснить сложное","Аудио → текст","Изображения","Поиск по своим данным"];
const rows = [
  { name:"Ясный", checks:[true,true,false,false,false] },
  { name:"Быстрый", checks:[true,false,false,false,false] },
  { name:"Для длинных текстов", checks:[true,true,false,false,false] },
  { name:"Картинки", checks:[false,false,false,true,false] },
  { name:"Поиск", checks:[false,false,false,false,true] }
];

export default function ModelTable(){
  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50">
            <th className="text-left p-3">Модель</th>
            {headers.map(h=> <th key={h} className="text-left p-3">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.name} className="border-t border-neutral-200">
              <td className="p-3 font-medium">{r.name}</td>
              {r.checks.map((c,i)=> <td key={i} className="p-3">{c ? "✔︎" : "—"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
