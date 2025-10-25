export interface Player {
  id: number;
  name: string;
  nickname: string;
  number: number;
  position: "Base" | "Alero" | "Pívot";
}

export interface PlayerStats {
  playerId: number;
  minutes: string;
  points: number;
  t2Made: number;
  t3Made: number;
  ftMade: number;
  ftAttempted: number;
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
  stats: PlayerStats[];
}

export interface PlayerTotals extends Player {
  games: number;
  totalMinutes: number;
  t2Made: number;
  t3Made: number;
  ftMade: number;
  ftAttempted: number;
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
