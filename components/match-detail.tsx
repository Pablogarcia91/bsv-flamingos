"use client";

import { Player, Match } from "@/lib/types";
import { StatCard } from "./stat-card";
import { PositionBadge } from "./position-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface MatchDetailProps {
  match: Match;
  players: Player[];
  onPlayerClick: (playerId: number) => void;
  onBack: () => void;
}

export function MatchDetail({ match, players, onPlayerClick, onBack }: MatchDetailProps) {
  const result = match.ourScore > match.oppScore ? "VICTORIA" : "DERROTA";
  const hasStats = match.stats && match.stats.length > 0;

  return (
    <div className="animate-neon-fade-in">
      <Button
        variant="outline"
        className="mb-6"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Partidos
      </Button>

      <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-6 mb-10">
        <div className="text-center mb-6">
          <h2 className="font-bebas text-3xl text-white mb-2">
            {match.home ? 'vs' : '@'} {match.opponent}
          </h2>
          <div className="text-vice-blue text-sm">
            {new Date(match.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bebas text-white mb-1">{match.ourScore}-{match.oppScore}</div>
            <div className="text-sm text-vice-blue uppercase">Resultado</div>
          </div>
          <div className="text-center">
            <div className={cn(
              "text-5xl font-bebas mb-1",
              result === "VICTORIA" ? "text-vice-blue" : "text-vice-pink"
            )}>
              {result}
            </div>
            <div className="text-sm text-vice-blue uppercase">Estado</div>
          </div>
        </div>
      </div>

      {hasStats ? (
        <div className="overflow-x-auto">
          <Table className="bg-vice-dark border-2 border-vice-pink rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow className="border-none hover:bg-vice-pink/10">
                <TableHead className="sticky left-0 z-20 bg-vice-pink">Jugador</TableHead>
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
                    <TableRow key={stat.playerId} className="cursor-pointer hover:bg-vice-pink/5">
                      <TableCell className="sticky left-0 z-10 bg-vice-dark">
                        <button
                          onClick={() => onPlayerClick(player.id)}
                          className="text-vice-blue font-bold hover:text-vice-pink transition-all hover:translate-x-1 inline-block"
                        >
                          {player.nickname}
                        </button>
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
          ⏳ Todavía se están procesando los datos de este partido
        </div>
      )}
    </div>
  );
}
