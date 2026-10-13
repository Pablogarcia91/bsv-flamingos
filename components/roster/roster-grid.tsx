import type { Season } from "@/lib/types";
import { getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals } from "@/lib/stats";
import { PlayerCard } from "./player-card";
import { byNumber } from "@/lib/utils";

/** Plantilla de una temporada con los promedios de esa misma temporada. */
export function RosterGrid({ season, limit }: { season: Season; limit?: number }) {
  const players = getSeasonPlayers(season).sort(byNumber);
  const totals = new Map(calculatePlayerTotals(players, season.matches).map(t => [t.id, t]));
  const meta = (id: number) => {
    const t = totals.get(id);
    if (!t?.games) return "Sin minutos todavía";
    return `${t.games} PJ · ${(t.points / t.games).toFixed(1)} PPP`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {(limit ? players.slice(0, limit) : players).map(p => (
        <PlayerCard key={p.id} player={p} meta={meta(p.id)} />
      ))}
    </div>
  );
}
