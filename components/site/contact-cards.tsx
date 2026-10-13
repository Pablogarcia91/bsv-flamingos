import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Instagram + correo en tarjetas horizontales compactas. */
export function ContactCards({ className }: { className?: string }) {
  const items = [
    {
      href: site.instagram.url,
      external: true,
      icon: Instagram,
      label: "Instagram",
      value: site.instagram.handle,
      hint: "Resultados, fotos y día a día",
      tone: "bg-vice-pink text-white",
      hover: "hover:border-vice-pink/60",
    },
    {
      href: `mailto:${site.email}`,
      external: false,
      icon: Mail,
      label: "Correo",
      value: site.email,
      hint: "Para jugar, patrocinar o un amistoso",
      tone: "bg-vice-blue text-ink",
      hover: "hover:border-vice-blue/60",
    },
  ];

  return (
    <div className={cn("grid md:grid-cols-2 gap-2.5 md:gap-4", className)}>
      {items.map(({ href, external, icon: Icon, label, value, hint, tone, hover }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn("group card !rounded-2xl md:!rounded-3xl p-4 md:p-6 flex items-center gap-4 transition-colors", hover)}
        >
          <span className={cn("h-11 w-11 md:h-14 md:w-14 rounded-full inline-flex items-center justify-center shrink-0", tone)}>
            <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">{label}</span>
            <span className="block font-bold text-[15px] md:text-lg leading-tight truncate">{value}</span>
            <span className="block text-xs md:text-sm text-white/50 truncate">{hint}</span>
          </span>
          <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-white shrink-0" aria-hidden />
        </a>
      ))}
    </div>
  );
}
