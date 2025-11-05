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
      <div className="flex flex-col gap-3">
        <h3 className="text-sm text-vice-blue uppercase tracking-wide font-bold">Último Partido</h3>
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
        <button
          onClick={() => onViewDetails(match.id)}
          className="text-vice-blue text-sm hover:text-vice-pink transition-colors underline text-left"
        >
          Ver estadísticas completas →
        </button>
      </div>
    </div>
  );
}
