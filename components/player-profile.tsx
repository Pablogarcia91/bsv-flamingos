"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { PositionBadge } from "./position-badge";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PlayerProfileProps {
  playerId: number;
  players: Player[];
  matches: Match[];
}

function StatCircle({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-vice-pink/50 flex items-center justify-center bg-vice-dark">
        <span className="font-bebas text-lg md:text-2xl text-white leading-none">{value}</span>
      </div>
      <span className="text-[9px] md:text-[10px] text-white/75 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
}

export function PlayerProfile({ playerId, players, matches }: PlayerProfileProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "records">("stats");

  const player = players.find(p => p.id === playerId);

  const derived = useMemo(() => {
    if (!player) return null;

    const playerMatches = matches
      .filter(m => m.stats?.length > 0)
      .map(m => ({ ...m, playerStat: m.stats.find(s => s.playerId === playerId) }))
      .filter(m => m.playerStat)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totals = calculatePlayerTotals(players, matches).find(p => p.id === playerId);
    if (!totals) return null;

    const g = totals.games;
    const ppg  = g > 0 ? (totals.points / g).toFixed(1) : "0.0";
    const fpg  = g > 0 ? (totals.fouls / g).toFixed(1) : "0.0";
    const minPg = g > 0 ? (totals.totalMinutes / g).toFixed(1) : "0.0";
    const ftPct = totals.ftAttempted > 0
      ? ((totals.ftMade / totals.ftAttempted) * 100).toFixed(0)
      : "—";
    const plusMinusStr = (totals.plusMinus > 0 ? "+" : "") + totals.plusMinus;

    // Records: value + match details
    const recordPoints = playerMatches.reduce(
      (best, m) => (m.playerStat!.points > (best?.playerStat?.points ?? -1) ? m : best),
      null as typeof playerMatches[0] | null
    );
    const recordMinutes = playerMatches.reduce(
      (best, m) => (parseInt(m.playerStat!.minutes) > parseInt(best?.playerStat?.minutes ?? "-1") ? m : best),
      null as typeof playerMatches[0] | null
    );
    const recordFtMade = playerMatches.reduce(
      (best, m) => (m.playerStat!.ftMade > (best?.playerStat?.ftMade ?? -1) ? m : best),
      null as typeof playerMatches[0] | null
    );
    const recordPlusMinus = playerMatches.reduce(
      (best, m) => (m.playerStat!.plusMinus > (best?.playerStat?.plusMinus ?? -999) ? m : best),
      null as typeof playerMatches[0] | null
    );
    const recordT2 = playerMatches.reduce(
      (best, m) => (m.playerStat!.t2Made > (best?.playerStat?.t2Made ?? -1) ? m : best),
      null as typeof playerMatches[0] | null
    );
    const recordT3 = playerMatches.reduce(
      (best, m) => (m.playerStat!.t3Made > (best?.playerStat?.t3Made ?? -1) ? m : best),
      null as typeof playerMatches[0] | null
    );

    return {
      playerMatches, totals,
      ppg, fpg, minPg, ftPct, plusMinusStr,
      records: { recordPoints, recordMinutes, recordFtMade, recordPlusMinus, recordT2, recordT3 },
    };
  }, [playerId, players, matches, player]);

  if (!player || !derived) return null;

  const { playerMatches, totals, ppg, fpg, minPg, ftPct, plusMinusStr, records } = derived;
  const g = totals.games;

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

  const fmtMatch = (m: typeof playerMatches[0]) =>
    `${m.home ? "vs" : "@"} ${m.opponent}`;

  return (
    <div className="animate-neon-fade-in">

      {/* Back button — siempre encima del hero */}
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "self-start text-xs px-3 py-1.5 h-auto mb-4 inline-flex")}>
        <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Volver
      </Link>

      {/* ── HERO ── */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pb-6 mb-0 border-b border-white/10">
        {/* Number */}
        <div className="font-bebas text-5xl md:text-8xl text-vice-pink leading-none shrink-0">
          #{player.number}
        </div>

        {/* Name + position */}
        <div className="flex-1 min-w-0">
          <h1 className="font-bebas text-3xl md:text-5xl tracking-wider text-white leading-tight">
            {player.name}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <PositionBadge position={player.position} />
            <span className="text-white/75 text-sm">Temporada 2025-26</span>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div role="tablist" className="flex gap-0 border-b border-white/10 mb-8">
        {(["stats", "records"] as const).map(tab => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "font-bebas text-sm md:text-base tracking-widest uppercase px-4 md:px-6 py-2.5 md:py-3 border-b-2 transition-colors duration-150 -mb-px",
              activeTab === tab
                ? "border-vice-pink text-vice-pink"
                : "border-transparent text-white/75 hover:text-white"
            )}
          >
            {tab === "stats" ? "Estadísticas" : "Récords"}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          STATS TAB
      ══════════════════════════════════════════ */}
      {activeTab === "stats" && (
        <div className="space-y-10">

          {/* Stat circles */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-10">
            <StatCircle value={ppg}        label="PPP" />
            <StatCircle value={minPg + "'"} label="Min/PJ" />
            <StatCircle value={plusMinusStr} label="+/-" />
            <StatCircle value={ftPct + (ftPct !== "—" ? "%" : "")} label="% TL" />
            <StatCircle value={fpg}         label="Fal/PJ" />
          </div>

          {/* Season totals table */}
          <section>
            <h2 className="font-bebas text-xl tracking-wider text-white mb-3 uppercase">
              Temporada 2025-26
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5 text-white/75 text-xs uppercase tracking-widest">
                    <td className="px-4 py-2 font-semibold w-20"></td>
                    <td className="px-3 py-2 text-center">PJ</td>
                    <td className="px-3 py-2 text-center">MIN</td>
                    <td className="px-3 py-2 text-center">PTS</td>
                    <td className="px-3 py-2 text-center">T2</td>
                    <td className="px-3 py-2 text-center">T3</td>
                    <td className="px-3 py-2 text-center">TL</td>
                    <td className="px-3 py-2 text-center">FAL</td>
                    <td className="px-3 py-2 text-center">+/-</td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-vice-dark">
                    <td className="px-4 py-2.5 text-white/75 text-xs uppercase tracking-widest font-semibold">Total</td>
                    <td className="px-3 py-2.5 text-center text-white">{totals.games}</td>
                    <td className="px-3 py-2.5 text-center text-white">{totals.totalMinutes.toFixed(1)}'</td>
                    <td className="px-3 py-2.5 text-center font-bold text-white">{totals.points}</td>
                    <td className="px-3 py-2.5 text-center text-white">{totals.t2Made}</td>
                    <td className="px-3 py-2.5 text-center text-white">{totals.t3Made}</td>
                    <td className="px-3 py-2.5 text-center text-white">{totals.ftMade}/{totals.ftAttempted}</td>
                    <td className="px-3 py-2.5 text-center text-white">{totals.fouls}</td>
                    <td className={cn("px-3 py-2.5 text-center font-bold",
                      totals.plusMinus > 0 ? "text-vice-blue" : totals.plusMinus < 0 ? "text-vice-pink" : "text-white"
                    )}>
                      {totals.plusMinus > 0 ? "+" : ""}{totals.plusMinus}
                    </td>
                  </tr>
                  <tr className="bg-[#0d0d0d]">
                    <td className="px-4 py-2.5 text-white/75 text-xs uppercase tracking-widest font-semibold">Media</td>
                    <td className="px-3 py-2.5 text-center text-white/75">{g}</td>
                    <td className="px-3 py-2.5 text-center text-white/75">{minPg}'</td>
                    <td className="px-3 py-2.5 text-center font-bold text-vice-pink">{ppg}</td>
                    <td className="px-3 py-2.5 text-center text-white/75">{g > 0 ? (totals.t2Made/g).toFixed(1) : "—"}</td>
                    <td className="px-3 py-2.5 text-center text-white/75">{g > 0 ? (totals.t3Made/g).toFixed(1) : "—"}</td>
                    <td className="px-3 py-2.5 text-center text-white/75">{g > 0 ? (totals.ftMade/g).toFixed(1) : "—"}</td>
                    <td className="px-3 py-2.5 text-center text-white/75">{fpg}</td>
                    <td className="px-3 py-2.5 text-center text-white/75">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Game log */}
          <section>
            <h2 className="font-bebas text-xl tracking-wider text-white mb-3 uppercase">
              Partidos
            </h2>
            {playerMatches.length > 0 ? (
              <div className="overflow-x-auto">
                <Table aria-label="Partidos del jugador" className="bg-vice-dark border border-white/10 rounded-lg overflow-hidden text-sm">
                  <TableHeader>
                    <TableRow className="border-none hover:bg-transparent bg-white/5">
                      <TableHead className="hidden sm:table-cell text-white/75 text-xs w-8 text-center">#</TableHead>
                      <TableHead className="text-white/75 text-xs sticky left-0 w-24 md:w-36 bg-white/5">Rival</TableHead>
                      <TableHead className="hidden sm:table-cell text-white/75 text-xs">Fecha</TableHead>
                      <TableHead className="text-white/75 text-xs">Res.</TableHead>
                      <TableHead className="hidden md:table-cell text-white/75 text-xs">MIN</TableHead>
                      <TableHead className="text-white/75 text-xs">PTS</TableHead>
                      <TableHead className="hidden sm:table-cell text-white/75 text-xs">T2</TableHead>
                      <TableHead className="hidden sm:table-cell text-white/75 text-xs">T3</TableHead>
                      <TableHead className="hidden md:table-cell text-white/75 text-xs">TL</TableHead>
                      <TableHead className="hidden md:table-cell text-white/75 text-xs">FAL</TableHead>
                      <TableHead className="text-white/75 text-xs">+/-</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...playerMatches].reverse().map((match, i) => {
                      const s = match.playerStat!;
                      const isWin = match.ourScore > match.oppScore;
                      return (
                        <TableRow key={match.id} className="border-l-2 border-l-transparent hover:border-l-vice-pink hover:bg-vice-pink/5 transition-colors odd:bg-[#0d0d0d] even:bg-vice-dark">
                          <TableCell className="hidden sm:table-cell text-center text-white/40 text-xs py-2">{i + 1}</TableCell>
                          <TableCell className="py-2 sticky left-0 w-24 md:w-36 bg-inherit font-semibold text-white truncate max-w-[96px] md:max-w-none">
                            {match.home ? "vs" : "@"} {match.opponent}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell py-2 text-white/75 whitespace-nowrap">
                            {new Date(match.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                          </TableCell>
                          <TableCell className="py-2">
                            <span className={isWin ? "chip-win" : "chip-loss"}>
                              {match.ourScore}-{match.oppScore}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell py-2 text-white/75">{s.minutes}'</TableCell>
                          <TableCell className="py-2 font-bold text-white">{s.points}</TableCell>
                          <TableCell className="hidden sm:table-cell py-2 text-white/75">{s.t2Made}</TableCell>
                          <TableCell className="hidden sm:table-cell py-2 text-white/75">{s.t3Made}</TableCell>
                          <TableCell className="hidden md:table-cell py-2 text-white/75">{s.ftMade}/{s.ftAttempted}</TableCell>
                          <TableCell className="hidden md:table-cell py-2 text-white/75">{s.fouls}</TableCell>
                          <TableCell className={cn("py-2 font-bold",
                            s.plusMinus > 0 ? "text-vice-blue" : s.plusMinus < 0 ? "text-vice-pink" : "text-white/75"
                          )}>
                            {s.plusMinus > 0 ? "+" : ""}{s.plusMinus}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-white/75 italic py-8 text-center border border-dashed border-white/15 rounded-lg">
                Sin partidos disponibles
              </p>
            )}
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════
          RECORDS TAB
      ══════════════════════════════════════════ */}
      {activeTab === "records" && (
        <section>
          <h2 className="font-bebas text-xl tracking-wider text-white mb-4 uppercase">
            Mejores marcas personales
          </h2>

          {playerMatches.length > 0 ? (
            <div className="border border-white/10 rounded-lg overflow-hidden">
              {[
                {
                  label: "Puntos",
                  match: records.recordPoints,
                  value: records.recordPoints?.playerStat?.points ?? 0,
                  display: String(records.recordPoints?.playerStat?.points ?? "—"),
                },
                {
                  label: "Minutos",
                  match: records.recordMinutes,
                  value: parseInt(records.recordMinutes?.playerStat?.minutes ?? "0"),
                  display: (records.recordMinutes?.playerStat?.minutes ?? "—") + "'",
                },
                {
                  label: "Tiros de 2",
                  match: records.recordT2,
                  value: records.recordT2?.playerStat?.t2Made ?? 0,
                  display: String(records.recordT2?.playerStat?.t2Made ?? "—"),
                },
                {
                  label: "Tiros de 3",
                  match: records.recordT3,
                  value: records.recordT3?.playerStat?.t3Made ?? 0,
                  display: String(records.recordT3?.playerStat?.t3Made ?? "—"),
                },
                {
                  label: "Tiros libres",
                  match: records.recordFtMade,
                  value: records.recordFtMade?.playerStat?.ftMade ?? 0,
                  display: records.recordFtMade
                    ? `${records.recordFtMade.playerStat?.ftMade}/${records.recordFtMade.playerStat?.ftAttempted}`
                    : "—",
                },
                {
                  label: "+/-",
                  match: records.recordPlusMinus,
                  value: records.recordPlusMinus?.playerStat?.plusMinus ?? 0,
                  display: records.recordPlusMinus
                    ? (records.recordPlusMinus.playerStat!.plusMinus > 0 ? "+" : "") + records.recordPlusMinus.playerStat!.plusMinus
                    : "—",
                },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={cn(
                    "grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[180px_80px_160px_1fr] items-center gap-x-4 md:gap-x-8 px-4 md:px-6 py-3 border-b border-white/5 last:border-0",
                    i % 2 === 0 ? "bg-vice-dark" : "bg-[#0d0d0d]"
                  )}
                >
                  {/* Categoría */}
                  <span className="text-sm text-white/75">{row.label}</span>

                  {/* Valor */}
                  <span className="font-bebas text-2xl text-white tabular-nums text-right md:text-left">
                    {row.display}
                  </span>

                  {/* Fecha */}
                  <span className="text-xs text-white/65 whitespace-nowrap hidden md:block">
                    {row.match ? fmtDate(row.match.date) : "—"}
                  </span>

                  {/* Partido */}
                  <span className="text-xs text-white/75 hidden md:block">
                    {row.match ? (
                      <>
                        <span className="font-semibold text-white">BSV</span>
                        <span className="text-white/50 mx-1">{row.match.home ? "vs" : "@"}</span>
                        <span className="font-semibold text-white">{row.match.opponent}</span>
                      </>
                    ) : "—"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/75 italic py-8 text-center border border-dashed border-white/15 rounded-lg">
              Sin partidos disponibles para calcular récords
            </p>
          )}
        </section>
      )}
    </div>
  );
}
