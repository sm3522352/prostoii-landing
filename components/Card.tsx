import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "card rounded-[20px] border border-[var(--muted-border)] bg-[var(--surface)] p-4 transition-transform hover:-translate-y-0.5 md:p-5",
        className
      )}
      style={{
        boxShadow: "0 24px 48px -36px color-mix(in srgb, var(--text) 18%, transparent)",
        ...style,
      }}
      {...props}
    />
  );
}
