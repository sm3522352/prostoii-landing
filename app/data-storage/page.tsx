export default function DataStoragePage() {
  return (
    <main className="container-soft py-16">
      <h1 className="text-3xl font-semibold text-text" style={{ fontFamily: "var(--font-jost)" }}>
        Управление историей и файлами
      </h1>
      <ol className="mt-4 space-y-3 text-base leading-relaxed text-muted">
        <li>1. Откройте профиль в приложении ПростоИИ.</li>
        <li>2. Перейдите в раздел «Приватность» и выберите «Удалить историю» или «Очистить файлы».</li>
        <li>3. Подтвердите действие — мы удалим данные моментально и безвозвратно.</li>
      </ol>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
        История по умолчанию хранится 7 дней на бесплатном тарифе и не ограничивается на платных планах. Вы сами управляете сроком хранения.
      </p>
    </main>
  );
}
