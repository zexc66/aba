import React, { forwardRef } from "react";

export const Section = forwardRef<HTMLElement, { id?: string; children: React.ReactNode; className?: string }>(
    ({ id, children, className = "" }, ref) => (
        <section ref={ref} id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
    )
);

Section.displayName = "Section";

export const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur">
        {children}
    </span>
);
