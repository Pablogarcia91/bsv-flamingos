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
        "group card !rounded-3xl relative flex flex-col gap-3 p-5 transition-colors hover:border-white/25",
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
      <div>
        <span className={win ? "chip-win" : "chip-loss"}>{win ? "Victoria" : "Derrota"}</span>
      </div>
    </Link>
  );
}

export function FixtureCard({ fixture, index }: { fixture: Fixture; index?: number }) {
  return (
    <div className="card !rounded-3xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{index === 0 ? "Siguiente" : fmtDate(fixture.date, { weekday: "long" })}</span>
        <span className={cn(
          "h-6 px-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider inline-flex items-center",
          fixture.home ? "bg-vice-pink/15 text-vice-pink" : "bg-white/10 text-white/70"
        )}>
          {fixture.home ? "Local" : "Fuera"}
        </span>
      </div>
      <div className="font-bebas text-4xl leading-none">
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

/** Fila compacta de un partido por jugar (móvil). */
export function FixtureRow({ fixture, next = false }: { fixture: Fixture; next?: boolean }) {
  return (
    <div className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-3 py-3 px-4">
      <span className="text-center leading-none">
        <span className="block font-bebas text-[1.75rem]">{fmtDate(fixture.date, { day: "numeric" })}</span>
        <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50">
          {fmtDate(fixture.date, { month: "short" }).replace(".", "")}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block font-bold truncate">
          <span className="text-white/45 font-semibold mr-1">{fixture.home ? "vs" : "@"}</span>{fixture.opponent}
        </span>
        <span className="block text-xs text-white/50">
          {fmtDate(fixture.date, { weekday: "short" })}{fixture.time && ` · ${fixture.time} h`}
          {next && <span className="ml-2 text-vice-blue font-bold uppercase tracking-wider">Siguiente</span>}
        </span>
      </span>
      <span className={cn(
        "h-6 px-2 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center",
        fixture.home ? "bg-vice-pink/15 text-vice-pink" : "bg-white/10 text-white/70"
      )}>
        {fixture.home ? "Local" : "Fuera"}
      </span>
    </div>
  );
}

/** Fila compacta de un resultado (móvil). */
export function ResultRowCompact({ match, caption }: { match: Match; caption?: string }) {
  const win = match.ourScore > match.oppScore;
  return (
    <Link href={`/partido/${match.id}`} className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-3 py-3 px-4 hover:bg-white/[0.03]">
      <span className="text-center leading-none">
        <span className="block font-bebas text-[1.75rem]">{fmtDate(match.date, { day: "numeric" })}</span>
        <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50">
          {fmtDate(match.date, { month: "short" }).replace(".", "")}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block font-bold truncate">
          <span className="text-white/45 font-semibold mr-1">{match.home ? "vs" : "@"}</span>{match.opponent}
        </span>
        <span className="block text-xs text-white/50">{caption ?? (match.home ? "Local" : "Visitante")}</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="font-bebas text-2xl leading-none tabular-nums">
          {match.ourScore}<span className="text-white/30">–</span>{match.oppScore}
        </span>
        <span className={win ? "chip-win" : "chip-loss"}>{win ? "V" : "D"}</span>
      </span>
    </Link>
  );
}

/** Último resultado + próximos partidos: lista compacta en móvil, tarjetas en pantallas grandes. */
export function MatchesBlock({ last, fixtures }: { last?: Match; fixtures: Fixture[] }) {
  const upcoming = fixtures.slice(0, last ? 3 : 4);
  return (
    <>
      <div className="sm:hidden card !rounded-3xl divide-y divide-line overflow-hidden">
        {last && <ResultRowCompact match={last} caption="Último resultado" />}
        {upcoming.map((f, i) => <FixtureRow key={f.date} fixture={f} next={i === 0} />)}
      </div>
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {last && <ResultCard match={last} />}
        {upcoming.map((f, i) => <FixtureCard key={f.date} fixture={f} index={i} />)}
      </div>
    </>
  );
}
