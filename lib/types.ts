export type Position = "Base" | "Alero" | "Pívot";

/** Persona: datos que no cambian entre temporadas. */
export interface Person {
  id: number;
  name: string;
  nickname: string;
  position: Position;
  /** Foto oficial recortada (ruta en /public). Sin ella se muestra una silueta. */
  photo?: string;
}

/** Jugador dentro de una temporada concreta (el dorsal puede cambiar). */
export interface Player extends Person {
  /** null = dorsal pendiente de asignar */
  number: number | null;
}

export interface RosterEntry {
  playerId: number;
  /** null = dorsal pendiente de asignar */
  number: number | null;
}

export interface Fixture {
  date: string;
  time?: string;
  opponent: string;
  home: boolean;
  venue?: string;
}

export type SeasonStatus = "current" | "finished";

export interface StandingRow {
  team: string;
  /** true = es nuestro equipo */
  us?: boolean;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
}

export interface Standings {
  division: string;
  /** Fecha de la última actualización (YYYY-MM-DD) */
  updated: string;
  /** Ordenada por posición */
  rows: StandingRow[];
}

export interface Season {
  id: string;
  label: string;
  league: string;
  status: SeasonStatus;
  finalPosition?: number;
  teamsInLeague?: number;
  /** Datos de ejemplo (POC) — se sustituirán por actas reales. */
  sample?: boolean;
  roster: RosterEntry[];
  matches: Match[];
  fixtures: Fixture[];
  standings?: Standings;
}

export interface PlayerStats {
  playerId: number;
  minutes: string;
  points: number;
  t2Made: number;
  t2Attempted?: number;
  t3Made: number;
  t3Attempted?: number;
  ftMade: number;
  ftAttempted: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls: number;
  plusMinus: number;
}

export interface Match {
  id: number;
  date: string;
  opponent: string;
  home: boolean;
  ourScore: number;
  oppScore: number;
  /** Puntos por cuarto (4 + prórrogas, si las hay). */
  quarters?: { us: number[]; them: number[] };
  stats: PlayerStats[];
}

export interface PlayerTotals extends Player {
  games: number;
  totalMinutes: number;
  t2Made: number;
  t2Attempted: number;
  t3Made: number;
  t3Attempted: number;
  ftMade: number;
  ftAttempted: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  points: number;
  plusMinus: number;
}

export interface TeamGameStats {
  id: number;
  date: string;
  opponent: string;
  home: boolean;
  ourScore: number;
  oppScore: number;
  result: "V" | "D";
  t2Made: number;
  t3Made: number;
  ftMade: number;
  ftAttempted: number;
  fouls: number;
  hasData: boolean;
}
