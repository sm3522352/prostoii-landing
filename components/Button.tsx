"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type Props = (ButtonAsButton | ButtonAsAnchor) & {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "md" | "lg";
};

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-primary text-white shadow-soft hover:brightness-[1.04] active:brightness-[0.96]",
  secondary: "border border-primary-200 text-primary bg-white hover:bg-primary-50 active:bg-primary-100",
  ghost: "border border-transparent bg-transparent text-primary hover:bg-primary-50 active:bg-primary-100",
  link: "bg-transparent text-primary underline-offset-4 hover:underline"
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  md: "min-h-[44px] px-5 py-3 text-sm",
  lg: "min-h-[52px] px-6 py-4 text-base"
};

export default function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2";
  const composed = clsx(base, variantClasses[variant], sizeClasses[size], className);

  if ((props as ButtonAsAnchor).as === "a") {
    const { as: _as, ...anchorProps } = props as ButtonAsAnchor;
    return <a {...anchorProps} className={composed} />;
  }

  return <button {...(props as ButtonAsButton)} className={composed} />;
}
