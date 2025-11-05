"use client";

import { Match } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LastMatchHighlightProps {
  match: Match;
  onViewDetails: (matchId: number) => void;
}

export function LastMatchHighlight({ match, onViewDetails }: LastMatchHighlightProps) {
  const isWin = match.ourScore > match.oppScore;

  return (
    <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-4 mb-6 animate-neon-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-vice-blue uppercase tracking-wide">Último Partido:</span>
          <div className="flex items-center gap-2 text-white font-bebas text-xl">
            <span>BSV</span>
            <span className={cn(
              "font-bold",
              isWin ? "text-vice-blue" : "text-vice-pink"
            )}>
              {match.ourScore}
            </span>
            <span className="text-vice-blue">-</span>
            <span className={cn(
              "font-bold",
              !isWin ? "text-vice-blue" : "text-vice-pink"
            )}>
              {match.oppScore}
            </span>
            <span>{match.opponent}</span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(match.id)}
          className="px-4 py-2 bg-vice-pink text-vice-dark font-bold text-sm rounded hover:bg-vice-blue hover:text-white transition-all transform hover:scale-105 whitespace-nowrap"
        >
          Ver Estadísticas
        </button>
      </div>
    </div>
  );
}
