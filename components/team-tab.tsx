"use client";

import { useState } from "react";
import { Player, Match } from "@/lib/types";
import { Select } from "@/components/ui/select";
import { StatCard } from "./stat-card";
import { PositionBadge } from "./position-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TeamTabProps {
  players: Player[];
  matches: Match[];
  onPlayerClick: (playerId: number) => void;
  initialMatchId?: number | null;
}

export function TeamTab({ players, matches, onPlayerClick, initialMatchId }: TeamTabProps) {
  const [selectedMatchId, setSelectedMatchId] = useState(initialMatchId || matches[0]?.id || 1);
  const selectedMatch = matches.find(m => m.id === selectedMatchId);

  if (!selectedMatch) return null;

  const result = selectedMatch.ourScore > selectedMatch.oppScore ? "VICTORIA" : "DERROTA";
  const hasStats = selectedMatch.stats && selectedMatch.stats.length > 0;

  return (
    <div className="animate-neon-fade-in">
      <div className="text-center mb-8">
        <Select
          value={selectedMatchId.toString()}
          onChange={(e) => setSelectedMatchId(parseInt(e.target.value))}
        >
          {matches.map(match => (
            <option key={match.id} value={match.id}>
              {new Date(match.date).toLocaleDateString('es-ES')} - {match.home ? 'LOCAL' : 'VISITANTE'} vs {match.opponent} ({match.ourScore}-{match.oppScore} {match.ourScore > match.oppScore ? 'V' : 'D'})
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <StatCard label="Resultado" value={`${selectedMatch.ourScore}-${selectedMatch.oppScore}`} />
        <StatCard label="Estado" value={result} />
      </div>

      {hasStats ? (
        <div className="overflow-x-auto">
          <Table className="bg-vice-dark/60 border-2 border-vice-pink rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead>Jugador</TableHead>
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
              {selectedMatch.stats
                .sort((a, b) => b.points - a.points)
                .map((stat) => {
                  const player = players.find(p => p.id === stat.playerId);
                  if (!player) return null;

                  return (
                    <TableRow key={stat.playerId} className="cursor-pointer">
                      <TableCell>
                        <button
                          onClick={() => onPlayerClick(player.id)}
                          className="text-vice-blue font-bold hover:text-vice-pink transition-all hover:translate-x-1 inline-block"
                        >
                          {player.name}
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
                        stat.plusMinus > 0 && "text-vice-blue neon-glow-blue",
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
