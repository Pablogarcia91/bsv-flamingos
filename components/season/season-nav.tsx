"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Resumen", slug: "" },
  { label: "Partidos", slug: "partidos" },
  { label: "Estadísticas", slug: "estadisticas" },
  { label: "Plantilla", slug: "plantilla" },
  { label: "Clasificación", slug: "clasificacion" },
];

function useSlug(seasonId: string) {
  const pathname = usePathname();
  const rest = pathname.split(`/temporada/${seasonId}`)[1] ?? "";
  return rest.replace(/^\/|\/$/g, "");
}

export function SeasonSwitcher({ seasonId, seasons }: { seasonId: string; seasons: { id: string; label: string; current: boolean }[] }) {
  const router = useRouter();
  const slug = useSlug(seasonId);
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Cambiar de temporada</span>
      <select
        value={seasonId}
        onChange={e => router.push(`/temporada/${e.target.value}${slug ? `/${slug}` : ""}`)}
        className="appearance-none h-11 pl-5 pr-11 rounded-full bg-white text-ink font-bold text-[15px] cursor-pointer focus-visible:outline-vice-blue"
      >
        {seasons.map(s => (
          <option key={s.id} value={s.id}>
            Temporada {s.label}{s.current ? " (actual)" : ""}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-ink" aria-hidden />
    </label>
  );
}

export function SeasonTabs({ seasonId }: { seasonId: string }) {
  const slug = useSlug(seasonId);
  const navRef = useRef<HTMLElement>(null);

  // En móvil las pestañas no caben: centra la activa para que siempre se vea
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return;
    nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
  }, [slug]);

  return (
    <nav ref={navRef} aria-label="Secciones de la temporada" className="-mb-px -mx-4 px-4 sm:mx-0 sm:px-0 flex sm:gap-1 overflow-x-auto no-scrollbar">
      {tabs.map(t => {
        const active = slug === t.slug;
        return (
          <Link
            key={t.slug}
            href={`/temporada/${seasonId}${t.slug ? `/${t.slug}` : ""}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative shrink-0 px-3 sm:px-4 py-4 text-sm sm:text-[15px] font-bold whitespace-nowrap transition-colors",
              active ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            {t.label}
            <span
              className={cn("absolute inset-x-2 sm:inset-x-3 bottom-0 h-[3px] rounded-full transition-colors", active ? "bg-vice-pink" : "bg-transparent")}
              aria-hidden
            />
          </Link>
        );
      })}
    </nav>
  );
}
