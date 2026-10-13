"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, GitCompareArrows, Home, Library, Mail, Menu, Users, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";
import { pill } from "./ui";

type NavLink = { label: string; href: string; match: string; icon: LucideIcon };

const getLinks = (seasonId: string): NavLink[] => [
  { label: "Temporada", href: `/temporada/${seasonId}`, match: "/temporada", icon: CalendarDays },
  { label: "Plantilla", href: "/plantilla", match: "/plantilla", icon: Users },
  { label: "Archivo", href: "/archivo", match: "/archivo", icon: Library },
  { label: "Comparar", href: "/comparar", match: "/comparar", icon: GitCompareArrows },
  { label: "Contacto", href: "/contacto", match: "/contacto", icon: Mail },
];

export function Navbar({ seasonId, seasonLabel }: { seasonId: string; seasonLabel: string }) {
  const links = getLinks(seasonId);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Menú móvil a pantalla completa: bloquea el scroll de la página y cierra con Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (match: string) => (match === "/" ? pathname === "/" : pathname.startsWith(match));
  const mobileLinks: NavLink[] = [{ label: "Inicio", href: "/", match: "/", icon: Home }, ...links];

  return (
    <>
    <header className="sticky top-0 z-50 bg-ink/85 backdrop-blur-xl border-b border-line">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
        <Brand subtitle={`Temporada ${seasonLabel}`} />

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.match) ? "page" : undefined}
              className={cn(
                "px-4 h-10 inline-flex items-center rounded-full text-[15px] font-bold transition-colors",
                isActive(l.match) ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/patrocinio" className={cn(pill({ size: "sm" }), "hidden sm:inline-flex")}>
            Patrocina
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label="Abrir menú"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/5"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div
          id="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="lg:hidden fixed inset-0 z-[60] h-dvh bg-ink flex flex-col overscroll-contain"
        >
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between border-b border-line shrink-0">
            <Brand compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              autoFocus
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            <ul className="flex flex-col gap-1">
              {mobileLinks.map(l => {
                const active = isActive(l.match);
                const Icon = l.icon;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-4 h-14 px-3 rounded-2xl text-lg font-bold transition-colors",
                        active ? "bg-vice-pink/10 text-vice-pink" : "text-white hover:bg-white/5"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0",
                          active ? "bg-vice-pink text-white" : "bg-white/[0.06] text-white/80"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="flex-1">{l.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-40" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-4 sm:px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-line shrink-0">
            <Link href="/patrocinio" onClick={() => setOpen(false)} className={cn(pill({ size: "lg" }), "w-full")}>
              Quiero patrocinar
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
