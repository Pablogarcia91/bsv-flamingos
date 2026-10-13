import type { Season } from "@/lib/types";
import { getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals } from "@/lib/stats";
import { PlayerCard } from "./player-card";
import { byNumber } from "@/lib/utils";

/** Plantilla de una temporada con los promedios de esa misma temporada. */
export function RosterGrid({ season, limit, scroll = false }: { season: Season; limit?: number; scroll?: boolean }) {
  const players = getSeasonPlayers(season).sort(byNumber);
  const totals = new Map(calculatePlayerTotals(players, season.matches).map(t => [t.id, t]));
  const meta = (id: number) => {
    const t = totals.get(id);
    if (!t?.games) return "Sin minutos todavía";
    return `${t.games} PJ · ${(t.points / t.games).toFixed(1)} PPP`;
  };

  return (
    <div
      className={
        scroll
          // Móvil: fila deslizable; desde md: cuadrícula
          ? "flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
          : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4"
      }
    >
      {(limit ? players.slice(0, limit) : players).map(p => (
        <div key={p.id} className={scroll ? "w-[42%] sm:w-[30%] md:w-auto shrink-0 snap-start" : undefined}>
          <PlayerCard player={p} meta={meta(p.id)} seasonId={season.id} />
        </div>
      ))}
    </div>
  );
}
