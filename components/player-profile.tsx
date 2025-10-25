import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { StatCard } from "./stat-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlayerProfileProps {
  playerId: number;
  players: Player[];
  matches: Match[];
  onBack: () => void;
}

export function PlayerProfile({ playerId, players, matches, onBack }: PlayerProfileProps) {
  const player = players.find(p => p.id === playerId);
  if (!player) return null;

  const playerMatches = matches
    .filter(match => match.stats && match.stats.length > 0)
    .map(match => ({
      ...match,
      playerStat: match.stats.find(s => s.playerId === playerId)
    }))
    .filter(m => m.playerStat)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totals = calculatePlayerTotals(players, matches).find(p => p.id === playerId);
  if (!totals) return null;

  const ppg = totals.games > 0 ? (totals.points / totals.games).toFixed(1) : '0.0';
  const minutesPerGame = totals.games > 0 ? (totals.totalMinutes / totals.games).toFixed(1) : '0.0';

  return (
    <div className="animate-neon-fade-in">
      <Button
        variant="outline"
        className="mb-8 fixed top-6 md:top-8 left-4 md:left-8 z-50 font-bebas text-base tracking-wider uppercase bg-vice-dark"
        onClick={onBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      <div className="text-center py-8 md:py-10 border-b-2 border-vice-pink mb-10 bg-vice-black mt-16 md:mt-0">
        <h1 className="font-bebas text-5xl md:text-6xl tracking-wider text-vice-pink mb-2">
          {player.name}
        </h1>
        <div className="text-vice-blue text-lg uppercase tracking-wide">
          #{player.number} • {player.position}
        </div>
      </div>

      <section className="mb-10">
        <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-4 gap-3 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{totals.games}</div>
              <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Partidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{minutesPerGame}&apos;</div>
              <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Min/Partido</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bebas text-white mb-1">{ppg}</div>
              <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">Pts/Partido</div>
            </div>
            <div className="text-center">
              <div className={cn(
                "text-3xl md:text-5xl font-bebas mb-1",
                totals.plusMinus > 0 ? "text-vice-blue" : totals.plusMinus < 0 ? "text-vice-pink" : "text-white"
              )}>
                {totals.plusMinus > 0 ? '+' : ''}{totals.plusMinus}
              </div>
              <div className="text-[10px] md:text-sm text-vice-blue uppercase tracking-wide">+/- Total</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bebas text-3xl tracking-wider text-vice-pink mb-6 uppercase border-b-2 border-vice-pink pb-2">
          Historial de Partidos
        </h2>

        {playerMatches.length > 0 ? (
          <div className="space-y-4">
            {playerMatches.map((match) => {
              if (!match.playerStat) return null;
              const stat = match.playerStat;
              const result = match.ourScore > match.oppScore ? 'V' : 'D';
              const resultColor = result === 'V' ? 'text-vice-blue' : 'text-vice-pink';

              return (
                <Card key={match.id} className="p-4 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-vice-pink/20">
                    <div className="font-bebas text-lg md:text-xl text-vice-blue tracking-wider">
                      {new Date(match.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="font-bold text-white">
                      {match.home ? 'vs' : '@'} {match.opponent}
                    </div>
                    <div className={cn("font-bold", resultColor)}>
                      {match.ourScore} - {match.oppScore} ({result})
                    </div>
                  </div>

                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-4 text-center">
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">MIN</div>
                      <div className="font-bebas text-xl md:text-2xl">{stat.minutes}</div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">PTS</div>
                      <div className="font-bebas text-xl md:text-2xl">{stat.points}</div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">T2</div>
                      <div className="font-bebas text-xl md:text-2xl">{stat.t2Made}</div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">T3</div>
                      <div className="font-bebas text-xl md:text-2xl">{stat.t3Made}</div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">TL</div>
                      <div className="font-bebas text-base md:text-xl">{stat.ftMade}/{stat.ftAttempted}</div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">FAL</div>
                      <div className="font-bebas text-xl md:text-2xl">{stat.fouls}</div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">+/-</div>
                      <div className={cn(
                        "font-bebas text-xl md:text-2xl",
                        stat.plusMinus > 0 ? "text-vice-blue" : stat.plusMinus < 0 ? "text-vice-pink" : "text-white"
                      )}>
                        {stat.plusMinus > 0 ? '+' : ''}{stat.plusMinus}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-vice-blue text-lg italic bg-vice-blue/5 border border-dashed border-vice-blue rounded-lg">
            Todavía no hay partidos jugados con estadísticas disponibles
          </div>
        )}
      </section>
    </div>
  );
}
