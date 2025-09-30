import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Pill({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/70 px-4 py-1.5 text-xs font-medium text-primary-600",
        className
      )}
      {...props}
    />
  );
}
