export default function PrivacyPage() {
  return (
    <main className="container-soft py-16">
      <h1 className="text-3xl font-semibold text-text" style={{ fontFamily: "var(--font-jost)" }}>
        Политика конфиденциальности
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
        Мы шифруем запросы и ответы, используем только проверенных провайдеров в ЕС и соблюдаем требования законодательства РФ.
        Вы можете удалить историю и файлы в любой момент — перейдите в настройки приватности и выберите, что оставить.
      </p>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
        Для вопросов о данных напишите нам на <a href="mailto:data@prostoii.ru" className="text-primary underline-offset-4 hover:underline">data@prostoii.ru</a>.
      </p>
    </main>
  );
}
