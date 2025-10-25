"use client";

import { useState } from "react";
import { Match } from "@/lib/types";
import { calculateTeamTotals } from "@/lib/stats";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MatchesTabProps {
  matches: Match[];
  onMatchSelect?: (matchId: number) => void;
}

export function MatchesTab({ matches, onMatchSelect }: MatchesTabProps) {
  const [sortField, setSortField] = useState<string | null>(null);
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

  const teamTotals = calculateTeamTotals(matches);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedGames = [...teamTotals].sort((a, b) => {
    if (!sortField) {
      // Default: ordenar por fecha descendente (más reciente primero)
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    }

    let aValue: any = a[sortField as keyof typeof a];
    let bValue: any = b[sortField as keyof typeof b];

    if (sortField === 'date') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="animate-neon-fade-in overflow-x-auto">
      <Table className="bg-vice-dark border-2 border-vice-pink rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="border-none hover:bg-vice-pink/10">
            <TableHead className="sticky left-0 z-20 bg-vice-pink">
              <SortButton field="date">Fecha</SortButton>
            </TableHead>
            <TableHead>Rival</TableHead>
            <TableHead>L/V</TableHead>
            <TableHead>
              <SortButton field="ourScore">Resultado</SortButton>
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
            <TableHead>V/D</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGames.map((game) => {
            // Formato correcto: si somos visitantes, nuestro score va segundo
            const displayScore = game.home
              ? `${game.ourScore}-${game.oppScore}`
              : `${game.oppScore}-${game.ourScore}`;

            return (
              <TableRow
                key={game.id}
                className={cn(
                  "hover:bg-vice-pink/5",
                  game.hasData && onMatchSelect && "cursor-pointer"
                )}
                onClick={() => {
                  if (game.hasData && onMatchSelect) {
                    onMatchSelect(game.id);
                  }
                }}
              >
                <TableCell className="sticky left-0 z-10 bg-vice-dark">{new Date(game.date).toLocaleDateString('es-ES')}</TableCell>
                <TableCell className="font-bold">{game.opponent}</TableCell>
                <TableCell>{game.home ? 'LOCAL' : 'VIS'}</TableCell>
                <TableCell className="font-bold">{displayScore}</TableCell>
                {game.hasData ? (
                  <>
                    <TableCell>{game.t2Made}</TableCell>
                    <TableCell>{game.t3Made}</TableCell>
                    <TableCell>{game.ftMade}/{game.ftAttempted}</TableCell>
                    <TableCell>{game.fouls}</TableCell>
                  </>
                ) : (
                  <TableCell colSpan={4} className="text-center italic text-vice-blue">
                    ⏳ Procesando datos...
                  </TableCell>
                )}
                <TableCell className={cn(
                  "font-bold",
                  game.result === 'V' ? "text-vice-blue" : "text-vice-pink"
                )}>
                  {game.result}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {game.hasData && onMatchSelect && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onMatchSelect(game.id)}
                      className="text-xs"
                    >
                      Ver Estadísticas
                    </Button>
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
