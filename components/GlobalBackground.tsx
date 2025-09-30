"use client";

import { useEffect } from "react";

export default function GlobalBackground() {
  useEffect(() => {
    document.documentElement.dataset.bgready = "true";
  }, []);

  return <div aria-hidden className="site-bg" data-theme="peach" />;
}
