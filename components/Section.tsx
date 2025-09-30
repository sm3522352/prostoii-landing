import { ReactNode } from "react";
import clsx from "clsx";

type SectionSpacing = "normal" | "tight";
type SectionTone = "default" | "muted";

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
  normal: "py-14 md:py-20",
  tight: "py-10 md:py-14"
};

const headerSpacing: Record<SectionSpacing, string> = {
  normal: "mb-12",
  tight: "mb-8"
};

const toneClasses: Record<SectionTone, string> = {
  default: "",
  muted: "bg-muted"
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
    <section id={id} className={clsx(spacingClasses[spacing], toneClasses[tone], className)}>
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
