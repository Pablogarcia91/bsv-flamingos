"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Match } from "@/lib/types";
import { calculateTeamTotals } from "@/lib/stats";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MatchesTabProps {
  matches: Match[];
}

interface SortButtonProps {
  field: string;
  children: React.ReactNode;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

function SortButton({ field, children, sortField, sortDirection, onSort }: SortButtonProps) {
  const isActive = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
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
}

export function MatchesTab({ matches }: MatchesTabProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedGames = useMemo(() => {
    const teamTotals = calculateTeamTotals(matches);
    return [...teamTotals].sort((a, b) => {
      if (!sortField) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      let aValue: number | string = a[sortField as keyof typeof a] as number | string;
      let bValue: number | string = b[sortField as keyof typeof b] as number | string;

      if (sortField === 'date') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      return sortDirection === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  }, [matches, sortField, sortDirection]);

  return (
    <div className="animate-neon-fade-in overflow-x-auto">
      <Table aria-label="Partidos de la temporada" className="bg-vice-dark border-2 border-vice-pink rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="sticky left-0 z-20 w-24 md:w-36 bg-gradient-to-r from-vice-pink to-vice-pink/80 text-white font-bebas tracking-wider">
              <SortButton field="date" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Fecha</SortButton>
            </TableHead>
            <TableHead>Rival</TableHead>
            <TableHead className="hidden sm:table-cell">L/V</TableHead>
            <TableHead>
              <SortButton field="ourScore" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Res.</SortButton>
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <SortButton field="t2Made" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>T2</SortButton>
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <SortButton field="t3Made" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>T3</SortButton>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <SortButton field="ftMade" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>TL</SortButton>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <SortButton field="fouls" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Faltas</SortButton>
            </TableHead>
            <TableHead>V/D</TableHead>
            <TableHead><span className="sr-only">Acciones</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGames.map((game) => {
            const displayScore = game.home
              ? `${game.ourScore}-${game.oppScore}`
              : `${game.oppScore}-${game.ourScore}`;

            return (
              <TableRow key={game.id} className="border-l-2 border-l-transparent hover:border-l-vice-pink hover:bg-vice-pink/5 transition-colors odd:bg-[#0d0d0d] even:bg-vice-dark">
                <TableCell className="sticky left-0 z-10 w-24 md:w-36 bg-vice-dark">
                  {new Date(game.date).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell className="font-bold truncate max-w-[100px] md:max-w-none">{game.opponent}</TableCell>
                <TableCell className="hidden sm:table-cell">{game.home ? 'LOCAL' : 'VIS'}</TableCell>
                <TableCell className="font-bold">{displayScore}</TableCell>
                {game.hasData ? (
                  <>
                    <TableCell className="hidden sm:table-cell">{game.t2Made}</TableCell>
                    <TableCell className="hidden sm:table-cell">{game.t3Made}</TableCell>
                    <TableCell className="hidden md:table-cell">{game.ftMade}/{game.ftAttempted}</TableCell>
                    <TableCell className="hidden md:table-cell">{game.fouls}</TableCell>
                  </>
                ) : (
                  <TableCell colSpan={4} className="hidden sm:table-cell text-center italic text-vice-blue">
                    <span aria-hidden="true">⏳</span> Procesando...
                  </TableCell>
                )}
                <TableCell>
                  <span className={game.result === 'V' ? "chip-win" : "chip-loss"}>
                    {game.result === 'V' ? 'V' : 'D'}
                  </span>
                </TableCell>
                <TableCell>
                  {game.hasData && (
                    <Link href={`/partido/${game.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-xs whitespace-nowrap")}>
                      <span className="hidden sm:inline">Ver </span>Stats
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
