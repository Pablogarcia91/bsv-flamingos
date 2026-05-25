"use client";

import Link from "next/link";
import { Player, Match } from "@/lib/types";
import { PositionBadge } from "./position-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface MatchDetailProps {
  match: Match;
  players: Player[];
}

export function MatchDetail({ match, players }: MatchDetailProps) {
  const result = match.ourScore > match.oppScore ? "VICTORIA" : "DERROTA";
  const hasStats = match.stats && match.stats.length > 0;

  return (
    <div className="animate-neon-fade-in">
      <Link href="/partidos" className={cn(buttonVariants({ variant: "outline" }), "mb-6 inline-flex")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Partidos
      </Link>

      {/* Summary banner — left: info, right: score + result */}
      <div className="flex items-center justify-between gap-2 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-vice-dark border border-vice-pink/25 rounded-xl mb-8">
        {/* Left group */}
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/75 uppercase tracking-widest border border-white/20 rounded px-1.5 py-0.5 shrink-0">
              {match.home ? 'LOCAL' : 'VIS'}
            </span>
            <h2 className="font-bebas text-xl md:text-2xl text-white tracking-wide truncate">
              {match.home ? 'vs' : '@'} {match.opponent}
            </h2>
          </div>
          <div className="text-xs text-white/75">
            {new Date(match.date).toLocaleDateString('es-ES', {
              weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
            })}
          </div>
        </div>

        {/* Right group */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="font-bebas text-2xl md:text-3xl leading-none">
            <span className={result === "VICTORIA" ? "text-vice-blue" : "text-white"}>{match.ourScore}</span>
            <span className="text-white/25 mx-1">-</span>
            <span className={result === "DERROTA" ? "text-vice-blue" : "text-white"}>{match.oppScore}</span>
          </div>
          <span className={result === "VICTORIA" ? "chip-win" : "chip-loss"}>
            {result}
          </span>
        </div>
      </div>

      {hasStats ? (
        <div className="overflow-x-auto">
          <Table aria-label="Estadísticas del partido" className="bg-vice-dark border-2 border-vice-pink rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="sticky left-0 z-20 w-28 bg-gradient-to-r from-vice-pink to-vice-pink/80 text-white font-bebas tracking-wider">Jugador</TableHead>
                <TableHead>Pos</TableHead>
                <TableHead>MIN</TableHead>
                <TableHead>PTS</TableHead>
                <TableHead>T2</TableHead>
                <TableHead>T3</TableHead>
                <TableHead>TL</TableHead>
                <TableHead>Faltas</TableHead>
                <TableHead>+/-</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {match.stats
                .sort((a, b) => b.points - a.points)
                .map((stat) => {
                  const player = players.find(p => p.id === stat.playerId);
                  if (!player) return null;

                  return (
                    <TableRow key={stat.playerId} className="border-l-2 border-l-transparent hover:border-l-vice-pink hover:bg-vice-pink/5 transition-colors odd:bg-[#0d0d0d] even:bg-vice-dark">
                      <TableCell className="sticky left-0 z-10 w-28 bg-vice-dark">
                        <Link
                          href={`/jugador/${player.id}`}
                          className="text-vice-blue font-bold hover:text-vice-pink transition-all hover:translate-x-1 inline-block"
                        >
                          {player.nickname}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <PositionBadge position={player.position} />
                      </TableCell>
                      <TableCell>{stat.minutes}</TableCell>
                      <TableCell className="font-bold">{stat.points}</TableCell>
                      <TableCell>{stat.t2Made}</TableCell>
                      <TableCell>{stat.t3Made}</TableCell>
                      <TableCell>{stat.ftMade}/{stat.ftAttempted}</TableCell>
                      <TableCell>{stat.fouls}</TableCell>
                      <TableCell className={cn(
                        "font-bold",
                        stat.plusMinus > 0 && "text-vice-blue",
                        stat.plusMinus < 0 && "text-vice-pink"
                      )}>
                        {stat.plusMinus > 0 ? '+' : ''}{stat.plusMinus}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 text-vice-blue text-lg italic bg-vice-blue/5 border border-dashed border-vice-blue rounded-lg">
          <span aria-hidden="true">⏳</span> Todavía se están procesando los datos de este partido
        </div>
      )}
    </div>
  );
}
