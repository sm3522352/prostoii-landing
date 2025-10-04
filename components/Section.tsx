import { ReactNode } from 'react';

/**
 * Section is a simple wrapper that provides consistent padding and
 * constrains content to a maximum width. It helps align sections
 * across the landing pages and dashboard while keeping responsive
 * behaviour encapsulated in one place.
 */
export default function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}