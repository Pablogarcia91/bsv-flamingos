import Link from "next/link";
import type { PlayerTotals } from "@/lib/types";
import { formatLeader, getLeader, type LeaderKey } from "@/lib/stats";
import { cn, dorsal } from "@/lib/utils";

const categories: { key: LeaderKey; label: string; unit: string }[] = [
  { key: "ppg", label: "Puntos", unit: "por partido" },
  { key: "t3", label: "Triples", unit: "anotados" },
  { key: "ftPct", label: "Tiros libres", unit: "acierto (mín. 4 int.)" },
  { key: "plusMinus", label: "Más / menos", unit: "acumulado" },
];

export function Leaders({ totals }: { totals: PlayerTotals[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {categories.map((c, i) => {
        const p = getLeader(totals, c.key);
        if (!p) return null;
        return (
          <Link
            key={c.key}
            href={`/jugador/${p.id}`}
            className={cn(
              "group relative overflow-hidden rounded-4xl p-5 md:p-6 flex flex-col justify-between min-h-[220px] transition-transform hover:-translate-y-1",
              i === 0 ? "bg-vice-pink text-white" : "bg-panel border border-line"
            )}
          >
            <div>
              <div className={cn("text-xs font-bold uppercase tracking-[0.16em]", i === 0 ? "text-white/80" : "text-white/55")}>{c.label}</div>
              <div className={cn("text-sm", i === 0 ? "text-white/70" : "text-white/40")}>{c.unit}</div>
            </div>
            <div className="font-bebas text-6xl md:text-7xl leading-none">{formatLeader(p, c.key)}</div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg">{p.nickname}</span>
              <span className={cn("text-sm font-semibold", i === 0 ? "text-white/70" : "text-vice-pink")}>#{dorsal(p.number)}</span>
            </div>
            <span
              className={cn(
                "pointer-events-none absolute -right-3 -top-6 font-bebas text-[9rem] leading-none select-none",
                i === 0 ? "text-black/10" : "text-white/[0.03]"
              )}
              aria-hidden
            >
              {p.number ?? ""}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
