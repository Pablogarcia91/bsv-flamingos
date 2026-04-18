"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "General", href: "/" },
  { label: "Partidos", href: "/partidos" },
  { label: "Plantilla", href: "/plantilla" },
  { label: "Comparar", href: "/comparar" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-vice-black/95 backdrop-blur border-b border-vice-pink/20">
      <div className="container max-w-7xl mx-auto px-4 md:px-5">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <span aria-hidden="true" className="text-xl">🦩</span>
            <div>
              <div className="font-bebas text-xl md:text-2xl tracking-wider text-vice-pink leading-none">
                BSV Flamingos
              </div>
              <div className="hidden md:block text-[10px] text-white/75 uppercase tracking-widest leading-none mt-0.5">
                Liga 2ª Alquiería • 2025-26
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "font-bebas text-base tracking-widest uppercase px-5 py-2 rounded transition-colors duration-200",
                  isActive(link.href)
                    ? "text-white bg-vice-pink/20 border border-vice-pink/40"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(o => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-vice-pink/40 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <nav
          aria-label="Navegación móvil"
          className="md:hidden border-t border-vice-pink/20 bg-vice-black/98"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "flex items-center font-bebas text-base tracking-widest uppercase px-5 py-4 border-b border-white/5 transition-colors",
                isActive(link.href)
                  ? "text-vice-pink bg-vice-pink/5 border-l-2 border-l-vice-pink"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
