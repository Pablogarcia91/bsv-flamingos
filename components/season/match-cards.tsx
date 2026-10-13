import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Fixture, Match } from "@/lib/types";
import { fmtDate } from "@/lib/stats";
import { cn } from "@/lib/utils";

export function ResultCard({ match, featured = false }: { match: Match; featured?: boolean }) {
  const win = match.ourScore > match.oppScore;
  return (
    <Link
      href={`/partido/${match.id}`}
      className={cn(
        "group card relative flex flex-col gap-4 p-5 md:p-6 transition-colors hover:border-white/25",
        featured && "md:p-8"
      )}
    >
      <div className="flex items-center justify-between text-sm text-white/55">
        <span className="font-semibold">
          {fmtDate(match.date, { weekday: "short", day: "numeric", month: "short" })} · {match.home ? "Local" : "Visitante"}
        </span>
        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </div>
      <div className="grid grid-cols-[1fr_auto] items-center gap-y-1">
        <span className="font-bold text-lg">BSV Flamingos</span>
        <span className={cn("font-bebas leading-none text-right", featured ? "text-6xl md:text-7xl" : "text-4xl", win ? "text-white" : "text-white/50")}>
          {match.ourScore}
        </span>
        <span className="font-bold text-lg text-white/70 truncate">{match.opponent}</span>
        <span className={cn("font-bebas leading-none text-right", featured ? "text-6xl md:text-7xl" : "text-4xl", !win ? "text-white" : "text-white/50")}>
          {match.oppScore}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={win ? "chip-win" : "chip-loss"}>{win ? "Victoria" : "Derrota"}</span>
        <span className="text-sm text-white/55">
          {win ? "+" : ""}{match.ourScore - match.oppScore}
        </span>
      </div>
    </Link>
  );
}

export function FixtureCard({ fixture, index }: { fixture: Fixture; index?: number }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{index === 0 ? "Siguiente" : fmtDate(fixture.date, { weekday: "long" })}</span>
        <span className={cn(
          "h-6 px-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider inline-flex items-center",
          fixture.home ? "bg-vice-pink/15 text-vice-pink" : "bg-white/10 text-white/70"
        )}>
          {fixture.home ? "Local" : "Fuera"}
        </span>
      </div>
      <div className="font-bebas text-5xl leading-none">
        {fmtDate(fixture.date, { day: "numeric" })}{" "}
        <span className="text-white/45">{fmtDate(fixture.date, { month: "short" }).replace(".", "")}</span>
      </div>
      <div>
        <div className="font-bold text-lg leading-tight">{fixture.home ? "vs" : "@"} {fixture.opponent}</div>
        {fixture.time && <div className="text-sm text-white/55">{fixture.time} h</div>}
      </div>
    </div>
  );
}

export function ResultRow({ match }: { match: Match }) {
  const win = match.ourScore > match.oppScore;
  return (
    <Link
      href={`/partido/${match.id}`}
      className="group grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 md:gap-5 py-4 px-2 border-b border-line hover:bg-white/[0.03] transition-colors rounded-xl"
    >
      <span className="w-14 text-sm text-white/55 font-semibold">{fmtDate(match.date)}</span>
      <span className="min-w-0">
        <span className="text-white/45 mr-1.5">{match.home ? "vs" : "@"}</span>
        <span className="font-bold truncate">{match.opponent}</span>
      </span>
      <span className="font-bebas text-2xl leading-none tabular-nums">
        <span className={win ? "text-white" : "text-white/50"}>{match.ourScore}</span>
        <span className="text-white/30 mx-1">–</span>
        <span className={!win ? "text-white" : "text-white/50"}>{match.oppScore}</span>
      </span>
      <span className={win ? "chip-win" : "chip-loss"}>{win ? "V" : "D"}</span>
    </Link>
  );
}
