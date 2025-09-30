'use client';

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
};

type Props = (ButtonProps | AnchorProps) & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", className, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-600 btn-glow hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-white/80 text-accent border border-neutral-200 hover:border-neutral-300 hover:bg-white focus-visible:ring-neutral-300"
  } satisfies Record<NonNullable<Props["variant"]>, string>;
  if (props.as === "a") {
    const { as, ...rest } = props as AnchorProps;
    return <a {...rest} className={clsx(base, variants[variant], className)} />;
  }
  return <button {...props} className={clsx(base, variants[variant], className)} />;
}
