import Link from "next/link";

import Layout from "@/components/Layout";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Layout
      title="Страница не найдена"
      description="Запрошенная страница отсутствует или была перемещена."
    >
      <Section className="pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/60">Ошибка 404</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Страница не найдена
          </h1>
          <p className="mt-4 text-sm text-white/70">
            Проверьте адрес или вернитесь на главную страницу — там собраны все
            ключевые разделы.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5"
            >
              На главную
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
