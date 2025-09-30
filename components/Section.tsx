import { ReactNode } from "react";
import clsx from "clsx";

type SectionSpacing = "normal" | "tight";

type SectionTone = "default" | "muted" | "surface";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  tone?: SectionTone;
};

const spacingClasses: Record<SectionSpacing, string> = {
  normal: "py-16 lg:py-24",
  tight: "py-12 lg:py-20"
};

const headerSpacing: Record<SectionSpacing, string> = {
  normal: "mb-12",
  tight: "mb-8"
};

export default function Section({
  id,
  title,
  subtitle,
  eyebrow,
  children,
  className,
  spacing = "normal",
  tone = "default"
}: Props) {
  return (
    <section
      id={id}
      className={clsx(
        "section-wrap",
        spacingClasses[spacing],
        tone === "muted" && "section--muted",
        tone === "surface" && "section--surface",
        className
      )}
    >
      <div className="container-soft">
        <div className={clsx("max-w-3xl", headerSpacing[spacing])}>
          {eyebrow && <span className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</span>}
          <h2 className="mt-3 text-[32px] font-semibold leading-[1.2] text-text md:text-4xl" style={{ fontFamily: "var(--font-jost)" }}>
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
