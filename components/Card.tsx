import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";

type CardSize = "sm" | "md" | "lg";

const sizeMap: Record<CardSize, string> = {
  sm: "p-5",
  md: "p-6",
  lg: "p-7",
};

type CardProps = HTMLAttributes<HTMLDivElement> & {
  size?: CardSize;
  interactive?: boolean;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, style, size = "md", interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "card rounded-[18px] border border-[var(--muted-border)] bg-[var(--surface)] text-left transition-colors",
          sizeMap[size],
          interactive

            ? "cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--primary)_45%,transparent)] motion-reduce:hover:translate-y-0 motion-reduce:transition-none"

            : "",
          "[box-shadow:0_4px_16px_color-mix(in_srgb,var(--text)_10%,transparent)]",
          className
        )}
        style={{
          ...style,
        }}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;
