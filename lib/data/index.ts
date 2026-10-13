import { Match, Person, Player, Season } from "../types";
import { people } from "./people";
import { season2025 } from "./season-2025-26";
import { season2026 } from "./season-2026-27";
import { calculatePlayerTotals } from "../stats";

/** Todas las temporadas, de la más reciente a la más antigua. */
export const seasons: Season[] = [season2026, season2025];

export const currentSeason: Season = seasons.find(s => s.status === "current") ?? seasons[0];

const peopleById = new Map(people.map(p => [p.id, p]));

export function getPerson(id: number): Person | undefined {
  return peopleById.get(id);
}

export function getSeason(id: string): Season | undefined {
  return seasons.find(s => s.id === id);
}

export function getPreviousSeason(season: Season): Season | undefined {
  const i = seasons.findIndex(s => s.id === season.id);
  return i >= 0 ? seasons[i + 1] : undefined;
}

/** Jugadores de una temporada con su dorsal de esa temporada. */
export function getSeasonPlayers(season: Season): Player[] {
  return season.roster.flatMap(r => {
    const person = peopleById.get(r.playerId);
    return person ? [{ ...person, number: r.number }] : [];
  });
}

export function getAllMatches(): (Match & { seasonId: string })[] {
  return seasons.flatMap(s => s.matches.map(m => ({ ...m, seasonId: s.id })));
}

export function getMatch(id: number) {
  for (const season of seasons) {
    const match = season.matches.find(m => m.id === id);
    if (match) return { match, season };
  }
  return undefined;
}

/** Historial de un jugador temporada a temporada (más reciente primero). */
export function getPlayerCareer(playerId: number) {
  return seasons.flatMap(season => {
    const player = getSeasonPlayers(season).find(p => p.id === playerId);
    if (!player) return [];
    const totals = calculatePlayerTotals([player], season.matches)[0];
    return [{ season, player, totals }];
  });
}

/** Posición del equipo en la clasificación (actual o final). */
export function getPosition(season: Season): { position: number; of: number } | undefined {
  if (season.standings) {
    const i = season.standings.rows.findIndex(r => r.us);
    if (i >= 0) return { position: i + 1, of: season.standings.rows.length };
  }
  if (season.finalPosition) return { position: season.finalPosition, of: season.teamsInLeague ?? 0 };
  return undefined;
}

export { people };
