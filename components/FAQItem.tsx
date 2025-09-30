"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Card from "./Card";
import { trackEvent } from "@/lib/analytics";

export type FAQProps = {
  id: string;
  q: string;
  a: string;
  linkLabel?: string;
  href?: string;
};

export default function FAQItem({ id, q, a, linkLabel, href }: FAQProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentId = useId();

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setMaxHeight(open ? el.scrollHeight : 0);
  }, [open]);

  useEffect(() => {
    if (open) {
      trackEvent("faq_opened", { question_id: id });
    }
  }, [open, id]);

  const link = linkLabel && href ? (
    <Link
      href={href}
      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
    >
      {linkLabel}
      <span aria-hidden>→</span>
    </Link>
  ) : null;

  return (
    <Card>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-text"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{q}</span>
        <span aria-hidden className="text-2xl leading-none text-primary">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={contentId}
        ref={contentRef}
        style={{ maxHeight }}
        className="grid overflow-hidden transition-all duration-300 ease-out"
      >
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>{a}</p>
          {link}
        </div>
      </div>
    </Card>
  );
}
