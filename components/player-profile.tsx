"use client";

import { useState } from "react";
import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
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
  const [activeTab, setActiveTab] = useState<"stats" | "records">("stats");

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

  const ppg = totals.games > 0 ? (totals.points / totals.games).toFixed(1) : "0.0";
  const fpg = totals.games > 0 ? (totals.fouls / totals.games).toFixed(1) : "0.0";
  const ftPct = totals.ftAttempted > 0 ? ((totals.ftMade / totals.ftAttempted) * 100).toFixed(1) : "0.0";

  // Calculate records
  const maxPoints = playerMatches.reduce((max, m) => m.playerStat && m.playerStat.points > max ? m.playerStat.points : max, 0);
  const maxMinutes = playerMatches.reduce((max, m) => {
    if (!m.playerStat) return max;
    const mins = parseInt(m.playerStat.minutes);
    return mins > max ? mins : max;
  }, 0);
  const maxFtPct = playerMatches.reduce((max, m) => {
    if (!m.playerStat || m.playerStat.ftAttempted === 0) return max;
    const pct = (m.playerStat.ftMade / m.playerStat.ftAttempted) * 100;
    return pct > max ? pct : max;
  }, 0);
  const maxPlusMinus = playerMatches.reduce((max, m) => m.playerStat && m.playerStat.plusMinus > max ? m.playerStat.plusMinus : max, -999);

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

      {/* Hero Section */}
      <div className="text-center py-12 md:py-16 border-b-4 border-vice-pink mb-10 mt-16 md:mt-0">
        <div className="text-vice-blue text-xl md:text-2xl uppercase tracking-wider mb-2">
          #{player.number}
        </div>
        <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-white mb-3">
          {player.name}
        </h1>
        <div className="text-vice-pink text-2xl md:text-3xl uppercase tracking-wide font-bebas">
          {player.position}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab("stats")}
          className={cn(
            "font-bebas text-2xl md:text-3xl uppercase tracking-wider px-6 py-3 transition-all",
            activeTab === "stats"
              ? "text-vice-pink border-b-4 border-vice-pink"
              : "text-white/50 hover:text-white"
          )}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveTab("records")}
          className={cn(
            "font-bebas text-2xl md:text-3xl uppercase tracking-wider px-6 py-3 transition-all",
            activeTab === "records"
              ? "text-vice-pink border-b-4 border-vice-pink"
              : "text-white/50 hover:text-white"
          )}
        >
          Records
        </button>
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="space-y-10">
          {/* Season Quick Stats */}
          <section>
            <h2 className="font-bebas text-3xl md:text-4xl tracking-wider text-vice-pink mb-6 uppercase">
              Temporada 2024-25
            </h2>
            <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bebas text-vice-pink mb-2">
                    {ppg}
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    Puntos/Partido
                  </div>
                </div>
                <div className="text-center">
                  <div className={cn(
                    "text-4xl md:text-6xl font-bebas mb-2",
                    totals.plusMinus > 0 ? "text-vice-blue" : "text-vice-pink"
                  )}>
                    {totals.plusMinus > 0 ? "+" : ""}{totals.plusMinus}
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    +/- Acumulado
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bebas text-vice-pink mb-2">
                    {fpg}
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    Faltas/Partido
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bebas text-vice-pink mb-2">
                    {ftPct}%
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    % TL
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Match History */}
          <section>
            <h2 className="font-bebas text-2xl md:text-3xl tracking-wider text-vice-pink mb-6 uppercase border-b-2 border-vice-pink pb-2">
              Historial de Partidos
            </h2>
            {playerMatches.length > 0 ? (
              <div className="space-y-4">
                {playerMatches.map((match) => {
                  if (!match.playerStat) return null;
                  const stat = match.playerStat;
                  const result = match.ourScore > match.oppScore ? "V" : "D";
                  const resultColor = result === "V" ? "text-vice-blue" : "text-vice-pink";
                  const ftPctMatch = stat.ftAttempted > 0 ? ((stat.ftMade / stat.ftAttempted) * 100).toFixed(0) : "0";

                  return (
                    <Card key={match.id} className="p-4 md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-vice-pink/20">
                        <div className="font-bebas text-lg md:text-xl text-vice-blue tracking-wider">
                          {new Date(match.date).toLocaleDateString("es-ES")}
                        </div>
                        <div className="font-bold text-white">
                          {match.home ? "vs" : "@"} {match.opponent}
                        </div>
                        <div className={cn("font-bebas text-xl md:text-2xl", resultColor)}>
                          {match.ourScore} - {match.oppScore} ({result})
                        </div>
                      </div>

                      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 text-center">
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">MIN</div>
                          <div className="font-bebas text-lg md:text-xl">{stat.minutes}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">PTS</div>
                          <div className="font-bebas text-lg md:text-xl text-vice-pink">{stat.points}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">T2</div>
                          <div className="font-bebas text-base md:text-lg">{stat.t2Made}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">T3</div>
                          <div className="font-bebas text-base md:text-lg">{stat.t3Made}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">TL</div>
                          <div className="font-bebas text-base md:text-lg">{stat.ftMade}/{stat.ftAttempted} ({ftPctMatch}%)</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">FAL</div>
                          <div className="font-bebas text-lg md:text-xl">{stat.fouls}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-vice-blue uppercase mb-1">+/-</div>
                          <div className={cn(
                            "font-bebas text-lg md:text-xl",
                            stat.plusMinus > 0 ? "text-vice-blue" : stat.plusMinus < 0 ? "text-vice-pink" : "text-white"
                          )}>
                            {stat.plusMinus > 0 ? "+" : ""}{stat.plusMinus}
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
      )}

      {/* Records Tab */}
      {activeTab === "records" && (
        <section>
          <h2 className="font-bebas text-3xl md:text-4xl tracking-wider text-vice-pink mb-6 uppercase">
            Récords Personales
          </h2>
          {playerMatches.length > 0 ? (
            <div className="bg-vice-dark border-2 border-vice-pink rounded-lg p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bebas text-vice-pink mb-2">
                    {maxPoints}
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    Puntos Máximos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bebas text-vice-pink mb-2">
                    {maxMinutes}'
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    Minutos Máximos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bebas text-vice-pink mb-2">
                    {maxFtPct.toFixed(0)}%
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    % TL Máximo
                  </div>
                </div>
                <div className="text-center">
                  <div className={cn(
                    "text-4xl md:text-6xl font-bebas mb-2",
                    maxPlusMinus > 0 ? "text-vice-blue" : "text-vice-pink"
                  )}>
                    {maxPlusMinus > 0 ? "+" : ""}{maxPlusMinus}
                  </div>
                  <div className="text-xs md:text-sm text-vice-blue uppercase tracking-wide">
                    +/- Máximo
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-vice-blue text-lg italic bg-vice-blue/5 border border-dashed border-vice-blue rounded-lg">
              Todavía no hay partidos jugados para calcular récords
            </div>
          )}
        </section>
      )}
    </div>
  );
}
