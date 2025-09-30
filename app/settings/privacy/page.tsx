import Link from "next/link";

export default function PrivacySettingsPage() {
  return (
    <main className="container-soft py-16">
      <h1 className="text-3xl font-semibold text-text" style={{ fontFamily: "var(--font-jost)" }}>
        Настройки приватности
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
        Здесь вы можете включить или отключить автосохранение истории, выбрать модели вручную и управлять командным доступом.
      </p>
      <ul className="mt-6 space-y-3 text-base leading-relaxed text-muted">
        <li>• Автовыбор модели — нажмите тумблер, чтобы перейти на ручной выбор.</li>
        <li>• История — включите автосохранение или задайте срок хранения.</li>
        <li>
          • Команда — назначайте роли и отправляйте приглашения. Если нужна помощь, напишите в <Link href="https://t.me/prostoii_support" className="text-primary underline-offset-4 hover:underline">поддержку</Link>.
        </li>
      </ul>
    </main>
  );
}
