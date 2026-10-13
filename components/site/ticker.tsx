import Link from "next/link";
import { currentSeason } from "@/lib/data";
import { fmtDate } from "@/lib/stats";

/** Barra superior tipo NBA: último resultado + próximo partido. */
export function Ticker() {
  const last = currentSeason.matches.at(-1);
  const next = currentSeason.fixtures[0];
  if (!last && !next) return null;

  return (
    <div className="bg-black text-[13px] border-b border-line">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 h-9 flex items-center gap-5 overflow-x-auto whitespace-nowrap">
        {last && (
          <Link href={`/partido/${last.id}`} className="inline-flex items-center gap-2 text-white/70 hover:text-white">
            <span className="font-bold uppercase tracking-wider text-white/40">Último</span>
            <span className={last.ourScore > last.oppScore ? "chip-win !h-5" : "chip-loss !h-5"}>
              {last.ourScore > last.oppScore ? "V" : "D"}
            </span>
            <span className="font-semibold text-white">
              BSV {last.ourScore}–{last.oppScore} {last.opponent}
            </span>
          </Link>
        )}
        {next && (
          <span className="inline-flex items-center gap-2 text-white/70">
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <span className="font-bold uppercase tracking-wider text-white/40">Próximo</span>
            <span className="text-white font-semibold">
              {next.home ? "vs" : "@"} {next.opponent}
            </span>
            <span>
              {fmtDate(next.date, { weekday: "short", day: "numeric", month: "short" })}
              {next.time && ` · ${next.time}`}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
