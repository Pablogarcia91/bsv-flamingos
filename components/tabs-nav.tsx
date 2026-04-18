"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General", href: "/" },
  { id: "matches", label: "Partidos", href: "/partidos" },
  { id: "roster", label: "Plantilla", href: "/plantilla" }
];

export function TabsNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav aria-label="Navegación principal">
      {/* Desktop tabs */}
      <div className="hidden md:flex gap-4 mb-10 flex-wrap justify-center">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={isActive(tab.href) ? "page" : undefined}
            className={cn(
              "font-bebas text-lg tracking-wider uppercase px-8 py-3 rounded-md border-2 transition-all duration-300",
              isActive(tab.href)
                ? "bg-vice-pink text-white border-vice-pink"
                : "text-white border-white/20 hover:bg-vice-pink/10 hover:border-vice-pink/50"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Mobile segmented tabs */}
      <div className="md:hidden mb-10 bg-vice-dark border-2 border-vice-pink rounded-lg p-1 flex gap-1">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={isActive(tab.href) ? "page" : undefined}
            className={cn(
              "flex-1 text-center font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md transition-all duration-200",
              isActive(tab.href)
                ? "bg-vice-pink text-white"
                : "text-vice-blue hover:bg-vice-pink/20 hover:text-white"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
