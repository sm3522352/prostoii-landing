import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, title, subtitle, eyebrow, children, className }: Props) {
  return (
    <section id={id} className={clsx("py-16 lg:py-24", className)}>
      <div className="container-soft">
        <div className="mb-10 max-w-3xl">
          {eyebrow && <span className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</span>}
          <h2 className="mt-3 text-[32px] font-semibold leading-[1.2] text-text md:text-4xl" style={{ fontFamily: "var(--font-jost)" }}>
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-lg leading-relaxed text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
