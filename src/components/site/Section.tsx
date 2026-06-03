import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: { eyebrow?: string; title?: string; intro?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <div className="max-w-2xl mb-12">
            {eyebrow && <div className="text-xs uppercase tracking-[0.18em] text-terracotta font-medium mb-3">{eyebrow}</div>}
            {title && <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">{title}</h2>}
            {intro && <p className="mt-4 text-muted-foreground md:text-lg">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
