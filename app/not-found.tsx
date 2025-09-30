import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-soft py-16 text-center">
      <h1 className="text-3xl font-semibold text-text" style={{ fontFamily: "var(--font-jost)" }}>
        Страница не найдена
      </h1>
      <p className="mt-3 text-muted">Проверьте адрес или вернитесь на главную.</p>
      <Link href="/" className="mt-6 inline-block underline text-primary">
        На главную →
      </Link>
    </main>
  );
}
