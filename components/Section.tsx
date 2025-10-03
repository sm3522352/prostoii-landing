import clsx from "clsx";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

export default function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={clsx("py-16 sm:py-20 lg:py-24", className)} {...props}>
      <div className={clsx("container", containerClassName)}>{children}</div>
    </section>
  );
}
