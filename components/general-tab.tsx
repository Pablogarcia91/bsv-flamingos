"use client";

import { useState } from "react";
import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { PositionBadge } from "./position-badge";
import { LastMatchHighlight } from "./last-match-highlight";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface GeneralTabProps {
  players: Player[];
  matches: Match[];
  onPlayerClick: (playerId: number) => void;
  onMatchSelect: (matchId: number) => void;
}

export function GeneralTab({ players, matches, onPlayerClick, onMatchSelect }: GeneralTabProps) {
  const [sortField, setSortField] = useState<string>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => {
    const isActive = sortField === field;
    return (
      <button
        onClick={() => handleSort(field)}
        className={cn(
          "flex items-center gap-1 hover:text-vice-blue transition-colors",
          isActive && "text-white"
        )}
      >
        {children}
        {isActive && (
          sortDirection === 'desc' ?
            <ArrowDown className="h-3.5 w-3.5" /> :
            <ArrowUp className="h-3.5 w-3.5" />
        )}
      </button>
    );
  };

  const wins = matches.filter(m => m.ourScore > m.oppScore).length;
  const losses = matches.length - wins;
  const totalOurPoints = matches.reduce((sum, m) => sum + m.ourScore, 0);
  const totalOppPoints = matches.reduce((sum, m) => sum + m.oppScore, 0);
  const avgOurPoints = (totalOurPoints / matches.length).toFixed(1);
  const avgOppPoints = (totalOppPoints / matches.length).toFixed(1);

  const playerTotals = calculatePlayerTotals(players, matches).filter(p => p.games > 0);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...playerTotals].sort((a, b) => {
    let aValue: any = a[sortField as keyof typeof a];
    let bValue: any = b[sortField as keyof typeof b];

    if (sortField === 'totalMinutes') {
      aValue = a.games > 0 ? a.totalMinutes / a.games : 0;
      bValue = b.games > 0 ? b.totalMinutes / b.games : 0;
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const lastMatch = matches.length > 0 ? matches[matches.length - 1] : null;

  return (
    <div className="animate-neon-fade-in">
      {/* Last Match Highlight */}
      {lastMatch && (
        <LastMatchHighlight
          match={lastMatch}
          players={players}
          onViewDetails={onMatchSelect}
        />
      )}

      <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-4 md:p-6 mb-10">
        <div className="grid grid-cols-4 gap-3 md:gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{matches.length}</div>
            <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Partidos Jugados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{wins}-{losses}</div>
            <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Récord</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{avgOurPoints}</div>
            <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Promedio Favor</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{avgOppPoints}</div>
            <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Promedio Contra</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="bg-vice-dark border-2 border-vice-pink rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="border-none hover:bg-vice-pink/10">
              <TableHead className="sticky left-0 z-20 bg-vice-pink">Jugador</TableHead>
              <TableHead>Pos</TableHead>
              <TableHead>
                <SortButton field="games">PJ</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="totalMinutes">MIN</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="points">PTS</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="t2Made">T2</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="t3Made">T3</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="ftMade">TL</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="fouls">Faltas</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="plusMinus">+/-</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player) => {
              const avgMinutes = player.games > 0 ? (player.totalMinutes / player.games).toFixed(1) : '0.0';
              const ftPct = player.ftAttempted > 0 ? Math.round((player.ftMade / player.ftAttempted) * 100) : 0;

              return (
                <TableRow key={player.id} className="cursor-pointer hover:bg-vice-pink/5">
                  <TableCell className="sticky left-0 z-10 bg-vice-dark">
                    <button
                      onClick={() => onPlayerClick(player.id)}
                      className="text-vice-blue font-bold hover:text-vice-pink transition-all hover:translate-x-1 inline-block"
                    >
                      {player.nickname} <span className="text-vice-pink">#{player.number}</span>
                    </button>
                  </TableCell>
                  <TableCell>
                    <PositionBadge position={player.position} />
                  </TableCell>
                  <TableCell>{player.games}</TableCell>
                  <TableCell>{avgMinutes}&apos;</TableCell>
                  <TableCell className="font-bold">{player.points}</TableCell>
                  <TableCell>{player.t2Made}</TableCell>
                  <TableCell>{player.t3Made}</TableCell>
                  <TableCell>{player.ftMade}/{player.ftAttempted} ({ftPct}%)</TableCell>
                  <TableCell>{player.fouls}</TableCell>
                  <TableCell className={cn(
                    "font-bold",
                    player.plusMinus > 0 && "text-vice-blue",
                    player.plusMinus < 0 && "text-vice-pink"
                  )}>
                    {player.plusMinus > 0 ? '+' : ''}{player.plusMinus}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
