"use client";

import { Match, Player } from "@/lib/types";
import { Trophy, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LastMatchHighlightProps {
  match: Match;
  players: Player[];
  onViewDetails: (matchId: number) => void;
}

export function LastMatchHighlight({ match, players, onViewDetails }: LastMatchHighlightProps) {
  const isWin = match.ourScore > match.oppScore;
  const topScorers = [...match.stats]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3)
    .map(stat => ({
      ...stat,
      player: players.find(p => p.id === stat.playerId)
    }));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-6 mb-10 animate-neon-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bebas text-white uppercase tracking-wide">
            Último Partido
          </h2>
          {isWin && <Trophy className="h-6 w-6 text-vice-blue animate-pulse" />}
        </div>
        <button
          onClick={() => onViewDetails(match.id)}
          className="px-4 py-2 bg-vice-pink text-vice-dark font-bold rounded hover:bg-vice-blue hover:text-white transition-all transform hover:scale-105"
        >
          Ver Detalles
        </button>
      </div>

      {/* Match Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2 text-vice-blue">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">{formatDate(match.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-vice-blue">
          <MapPin className="h-5 w-5" />
          <span className="text-sm">{match.home ? 'Local' : 'Visitante'}</span>
        </div>
      </div>

      {/* Score */}
      <div className="bg-black/30 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bebas text-white mb-1">BSV FLAMINGOS</div>
            <div className={cn(
              "text-5xl md:text-6xl font-bebas",
              isWin ? "text-vice-blue" : "text-vice-pink"
            )}>
              {match.ourScore}
            </div>
          </div>

          <div className="text-center">
            <div className={cn(
              "text-3xl md:text-4xl font-bebas uppercase",
              isWin ? "text-vice-blue" : "text-vice-pink"
            )}>
              {isWin ? 'Victoria' : 'Derrota'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl md:text-2xl font-bebas text-white mb-1">{match.opponent}</div>
            <div className={cn(
              "text-5xl md:text-6xl font-bebas",
              !isWin ? "text-vice-blue" : "text-vice-pink"
            )}>
              {match.oppScore}
            </div>
          </div>
        </div>
      </div>

      {/* Top Scorers */}
      <div>
        <h3 className="text-lg md:text-xl font-bebas text-vice-pink mb-4 uppercase tracking-wide">
          Máximos Anotadores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topScorers.map((scorer, index) => (
            <div
              key={scorer.playerId}
              className="bg-black/30 rounded-lg p-4 border border-vice-pink/20 hover:border-vice-pink/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-vice-blue font-bold">
                  {scorer.player?.nickname || 'Unknown'} #{scorer.player?.number}
                </div>
                <div className="text-2xl font-bebas text-white">{scorer.points}</div>
              </div>
              <div className="text-xs text-vice-blue/60">
                T2: {scorer.t2Made} | T3: {scorer.t3Made} | TL: {scorer.ftMade}/{scorer.ftAttempted}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
