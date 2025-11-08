"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabsNav() {
  const pathname = usePathname();

  const tabs = [
    { id: "general", label: "General", href: "/" },
    { id: "matches", label: "Partidos", href: "/partidos" },
    { id: "roster", label: "Plantilla", href: "/plantilla" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop tabs */}
      <div className="hidden md:flex gap-4 mb-10 flex-wrap justify-center">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href}>
            <Button
              variant={isActive(tab.href) ? "default" : "outline"}
              className={`
                font-bebas text-lg tracking-wider uppercase px-8 py-3
                transition-all duration-300
                ${isActive(tab.href)
                  ? "bg-vice-pink text-white border-vice-pink"
                  : "hover:bg-vice-pink/10"
                }
              `}
            >
              {tab.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile segmented tabs */}
      <div className="md:hidden mb-10 bg-vice-dark border-2 border-vice-pink rounded-lg p-1 flex gap-1">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href} className="flex-1">
            <button
              className={`
                w-full font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md
                transition-all duration-200
                ${isActive(tab.href)
                  ? "bg-vice-pink text-white"
                  : "text-vice-blue hover:bg-vice-pink/20 hover:text-white"
                }
              `}
            >
              {tab.label}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
