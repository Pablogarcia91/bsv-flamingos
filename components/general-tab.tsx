"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { PositionBadge } from "./position-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface GeneralTabProps {
  players: Player[];
  matches: Match[];
}

interface SortButtonProps {
  field: string;
  children: React.ReactNode;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

function SortButton({ field, children, sortField, sortDirection, onSort }: SortButtonProps) {
  const isActive = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        "flex items-center gap-1 hover:text-vice-blue transition-colors whitespace-nowrap",
        isActive ? "text-white" : "text-white/60"
      )}
    >
      {children}
      {isActive && (
        sortDirection === 'desc'
          ? <ArrowDown className="h-3 w-3" />
          : <ArrowUp className="h-3 w-3" />
      )}
    </button>
  );
}

const POSITIONS = ["Todos", "Base", "Alero", "Pívot"] as const;

export function GeneralTab({ players, matches }: GeneralTabProps) {
  const [sortField, setSortField] = useState<string>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [posFilter, setPosFilter] = useState<string>("Todos");

  const teamStats = useMemo(() => {
    const wins = matches.filter(m => m.ourScore > m.oppScore).length;
    const losses = matches.length - wins;
    const totalOur = matches.reduce((s, m) => s + m.ourScore, 0);
    const totalOpp = matches.reduce((s, m) => s + m.oppScore, 0);
    return {
      wins,
      losses,
      avgOur: (totalOur / matches.length).toFixed(1),
      avgOpp: (totalOpp / matches.length).toFixed(1),
    };
  }, [matches]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = useMemo(() => {
    return calculatePlayerTotals(players, matches)
      .filter(p => p.games > 0)
      .filter(p => posFilter === "Todos" || p.position === posFilter)
      .sort((a, b) => {
        let av: number = a[sortField as keyof typeof a] as number;
        let bv: number = b[sortField as keyof typeof b] as number;
        if (sortField === 'totalMinutes') {
          av = a.games > 0 ? a.totalMinutes / a.games : 0;
          bv = b.games > 0 ? b.totalMinutes / b.games : 0;
        }
        return sortDirection === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
      });
  }, [players, matches, sortField, sortDirection, posFilter]);

  const lastMatch = matches.length > 0 ? matches[matches.length - 1] : null;
  const isWin = lastMatch ? lastMatch.ourScore > lastMatch.oppScore : false;

  return (
    <div className="animate-neon-fade-in space-y-6">

      {/* ── TOP ROW: tres cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Último partido */}
        {lastMatch ? (
          <div className="bg-vice-dark border border-vice-pink/25 rounded-xl flex flex-col overflow-hidden">
            <div className="px-5 pt-3 pb-2 border-b border-vice-pink/15">
              <span className="text-[10px] text-white/75 uppercase tracking-widest">Último partido</span>
            </div>
            <div className="px-4 md:px-5 py-4 flex-1 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2 font-bebas text-2xl md:text-3xl leading-none min-w-0">
                <span className="text-white text-base shrink-0">BSV</span>
                <span className={isWin ? "text-vice-blue" : "text-vice-pink"}>{lastMatch.ourScore}</span>
                <span className="text-white/65">—</span>
                <span className={!isWin ? "text-vice-blue" : "text-vice-pink"}>{lastMatch.oppScore}</span>
                <span className="text-white text-base truncate max-w-[100px] sm:max-w-[160px]">{lastMatch.opponent}</span>
              </div>
              <div className="flex items-center gap-3 ml-auto shrink-0">
                <span className={isWin ? "chip-win" : "chip-loss"}>{isWin ? "V" : "D"}</span>
                <Link
                  href={`/partido/${lastMatch.id}`}
                  className="text-xs text-white/75 hover:text-vice-blue transition-colors whitespace-nowrap"
                >
                  Ver stats →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-vice-dark border border-vice-pink/25 rounded-xl flex flex-col overflow-hidden">
            <div className="px-5 pt-3 pb-2 border-b border-vice-pink/15">
              <span className="text-[10px] text-white/75 uppercase tracking-widest">Último partido</span>
            </div>
            <div className="px-5 flex-1 flex items-center">
              <span className="text-white/65 text-sm">Sin partidos</span>
            </div>
          </div>
        )}

        {/* Posición */}
        <div className="bg-vice-dark border border-vice-pink/25 rounded-xl flex flex-col overflow-hidden">
          <div className="px-5 pt-3 pb-2 border-b border-vice-pink/15">
            <span className="text-[10px] text-white/75 uppercase tracking-widest">Clasificación</span>
          </div>
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="text-center">
              <div className="font-bebas text-4xl md:text-5xl text-vice-pink leading-none">7º</div>
              <div className="text-[10px] text-white/75 uppercase tracking-widest mt-1">Posición final</div>
            </div>
          </div>
        </div>

        {/* Récords del equipo */}
        <div className="bg-vice-dark border border-vice-pink/25 rounded-xl flex flex-col overflow-hidden">
          <div className="px-5 pt-3 pb-2 border-b border-vice-pink/15">
            <span className="text-[10px] text-white/75 uppercase tracking-widest">Récord del equipo Temp 25-26</span>
          </div>
          <div className="grid grid-cols-4 divide-x divide-vice-pink/15 flex-1">
            <div className="px-1 md:px-3 py-3 text-center flex flex-col justify-center">
              <div className="font-bebas text-xl md:text-3xl text-white leading-none">{matches.length}</div>
              <div className="text-[10px] text-white/75 uppercase tracking-widest mt-0.5">PJ</div>
            </div>
            <div className="px-1 md:px-3 py-3 text-center flex flex-col justify-center">
              <div className="font-bebas text-xl md:text-3xl text-vice-blue leading-none">{teamStats.wins}-{teamStats.losses}</div>
              <div className="text-[10px] text-white/75 uppercase tracking-widest mt-0.5">Record</div>
            </div>
            <div className="px-1 md:px-3 py-3 text-center flex flex-col justify-center">
              <div className="font-bebas text-xl md:text-3xl text-vice-pink leading-none">{teamStats.avgOur}</div>
              <div className="text-[10px] text-white/75 uppercase tracking-widest mt-0.5">PPP F</div>
            </div>
            <div className="px-1 md:px-3 py-3 text-center flex flex-col justify-center">
              <div className="font-bebas text-xl md:text-3xl text-white leading-none">{teamStats.avgOpp}</div>
              <div className="text-[10px] text-white/75 uppercase tracking-widest mt-0.5">PPP C</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA: filtros + columnas ── */}
      <div>
        {/* Filtros de posición */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs text-white/75 uppercase tracking-widest mr-1">Filtrar:</span>
          {POSITIONS.map(pos => (
            <button
              key={pos}
              onClick={() => setPosFilter(pos)}
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border transition-colors",
                posFilter === pos
                  ? "bg-vice-pink border-vice-pink text-white"
                  : "border-white/15 text-white/80 hover:border-vice-pink/50 hover:text-white"
              )}
            >
              {pos}
            </button>
          ))}
          <span className="ml-auto text-xs text-white/65">{sortedPlayers.length} jugadores</span>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Estadísticas de jugadores" className="bg-vice-dark border border-vice-pink/30 rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent bg-vice-pink/10">
                <TableHead className="sticky left-0 z-20 w-28 bg-[#1a0a12] text-vice-pink font-bebas tracking-wider text-sm">Jugador</TableHead>
                <TableHead className="text-white/80 text-xs w-12">Pos</TableHead>
                <TableHead className="text-white/80 text-xs w-10">
                  <SortButton field="games" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>PJ</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-12">
                  <SortButton field="totalMinutes" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>MIN</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-10">
                  <SortButton field="points" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>PTS</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-10">
                  <SortButton field="t2Made" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>T2</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-10">
                  <SortButton field="t3Made" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>T3</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-28 whitespace-nowrap">
                  <SortButton field="ftMade" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>TL</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-12">
                  <SortButton field="fouls" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Faltas</SortButton>
                </TableHead>
                <TableHead className="text-white/80 text-xs w-10">
                  <SortButton field="plusMinus" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>+/-</SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlayers.map((player) => {
                const avgMin = player.games > 0 ? (player.totalMinutes / player.games).toFixed(1) : '0.0';
                const ftPct = player.ftAttempted > 0 ? Math.round((player.ftMade / player.ftAttempted) * 100) : 0;
                return (
                  <TableRow key={player.id} className="border-l-2 border-l-transparent hover:border-l-vice-pink hover:bg-vice-pink/5 transition-colors odd:bg-[#0d0d0d] even:bg-vice-dark">
                    <TableCell className="sticky left-0 z-10 w-28 bg-inherit py-2">
                      <Link
                        href={`/jugador/${player.id}`}
                        className="text-vice-blue font-semibold hover:text-vice-pink transition-colors"
                      >
                        {player.nickname} <span className="text-vice-pink/70 font-normal">#{player.number}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="py-2">
                      <PositionBadge position={player.position} />
                    </TableCell>
                    <TableCell className="py-2 text-white/70">{player.games}</TableCell>
                    <TableCell className="py-2 text-white/70">{avgMin}&apos;</TableCell>
                    <TableCell className="py-2 font-bold text-white">{player.points}</TableCell>
                    <TableCell className="py-2 text-white/70">{player.t2Made}</TableCell>
                    <TableCell className="py-2 text-white/70">{player.t3Made}</TableCell>
                    <TableCell className="py-2 text-white/70 whitespace-nowrap">{player.ftMade}/{player.ftAttempted} ({ftPct}%)</TableCell>
                    <TableCell className="py-2 text-white/70">{player.fouls}</TableCell>
                    <TableCell className={cn(
                      "py-2 font-bold",
                      player.plusMinus > 0 ? "text-vice-blue" : player.plusMinus < 0 ? "text-vice-pink" : "text-white/80"
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
    </div>
  );
}
