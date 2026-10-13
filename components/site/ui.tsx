import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Position } from "@/lib/types";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export const pill = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-[transform,background-color,color,border-color] duration-200 active:scale-[0.97] whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-vice-pink text-white hover:bg-[#ff3ba7]",
        light: "bg-white text-ink hover:bg-white/90",
        dark: "bg-ink text-white hover:bg-black",
        ghost: "border border-white/20 text-white hover:border-white/60 hover:bg-white/5",
        "ghost-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export function PillLink({
  href,
  className,
  children,
  external,
  ...variants
}: VariantProps<typeof pill> & { href: string; className?: string; children: React.ReactNode; external?: boolean }) {
  const cls = cn(pill(variants), className);
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-bold text-vice-blue hover:text-white transition-colors",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 md:mb-10", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow mb-3">
            <span className="h-2 w-2 rounded-full bg-vice-pink" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2 className="display text-5xl md:text-7xl text-balance">{title}</h2>
        {description && <p className="mt-3 text-lg text-white/70 text-pretty">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

const positionStyles: Record<Position, string> = {
  Base: "text-vice-blue border-vice-blue/40",
  Alero: "text-vice-purple border-vice-purple/50",
  Pívot: "text-vice-yellow border-vice-yellow/40",
};

export function PositionTag({ position, className }: { position: Position; className?: string }) {
  return (
    <span className={cn("inline-flex items-center h-6 px-2.5 rounded-full border text-[11px] font-bold uppercase tracking-wider", positionStyles[position], className)}>
      {position}
    </span>
  );
}

export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-vice-yellow/15 text-vice-yellow text-[11px] font-bold uppercase tracking-wider", className)}
      title="Prueba de concepto: datos ficticios"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-vice-yellow" aria-hidden />
      Datos de ejemplo
    </span>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: "default" | "pink" | "blue";
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl bg-panel border border-line px-5 py-4", className)}>
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div
        className={cn(
          "font-bebas text-4xl md:text-5xl leading-none mt-2",
          tone === "pink" && "text-vice-pink",
          tone === "blue" && "text-vice-blue"
        )}
      >
        {value}
      </div>
      {hint && <div className="text-sm text-white/55 mt-1">{hint}</div>}
    </div>
  );
}

export function FormDots({ form }: { form: ("V" | "D")[] }) {
  return (
    <span className="inline-flex gap-1" aria-label={`Últimos resultados: ${form.join(", ")}`}>
      {form.map((r, i) => (
        <span key={i} className={r === "V" ? "chip-win" : "chip-loss"}>{r}</span>
      ))}
    </span>
  );
}

export function EmptyState({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-dashed border-white/15 px-6 py-12 text-center text-white/55", className)}>
      {children}
    </div>
  );
}
