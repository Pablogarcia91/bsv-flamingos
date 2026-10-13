import { Player, Match, PlayerTotals, TeamGameStats } from "./types";

export function calculatePlayerTotals(players: Player[], matches: Match[]): PlayerTotals[] {
  const totals: Record<number, PlayerTotals> = {};

  players.forEach(player => {
    totals[player.id] = {
      ...player,
      games: 0,
      totalMinutes: 0,
      t2Made: 0,
      t2Attempted: 0,
      t3Made: 0,
      t3Attempted: 0,
      ftMade: 0,
      ftAttempted: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
      points: 0,
      plusMinus: 0
    };
  });

  matches.forEach(match => {
    if (match.stats && match.stats.length > 0) {
      match.stats.forEach(stat => {
        const player = totals[stat.playerId];
        if (player) {
          player.games++;
          // Convert minutes from string "MM:SS" to number
          if (stat.minutes) {
            const [min, sec] = stat.minutes.split(':').map(Number);
            player.totalMinutes += min + (sec / 60);
          }
          player.t2Made += stat.t2Made || 0;
          player.t2Attempted += stat.t2Attempted || 0;
          player.t3Made += stat.t3Made || 0;
          player.t3Attempted += stat.t3Attempted || 0;
          player.ftMade += stat.ftMade || 0;
          player.ftAttempted += stat.ftAttempted || 0;
          player.rebounds += stat.rebounds || 0;
          player.assists += stat.assists || 0;
          player.steals += stat.steals || 0;
          player.blocks += stat.blocks || 0;
          player.turnovers += stat.turnovers || 0;
          player.fouls += stat.fouls || 0;
          player.points += stat.points || 0;
          player.plusMinus += stat.plusMinus || 0;
        }
      });
    }
  });

  return Object.values(totals);
}

export function calculateTeamTotals(matches: Match[]): TeamGameStats[] {
  return matches.map(match => {
    const totals: TeamGameStats = {
      id: match.id,
      date: match.date,
      opponent: match.opponent,
      home: match.home,
      ourScore: match.ourScore,
      oppScore: match.oppScore,
      result: match.ourScore > match.oppScore ? 'V' : 'D',
      t2Made: 0,
      t3Made: 0,
      ftMade: 0,
      ftAttempted: 0,
      fouls: 0,
      hasData: match.stats && match.stats.length > 0
    };

    if (match.stats && match.stats.length > 0) {
      match.stats.forEach(stat => {
        totals.t2Made += stat.t2Made || 0;
        totals.t3Made += stat.t3Made || 0;
        totals.ftMade += stat.ftMade || 0;
        totals.ftAttempted += stat.ftAttempted || 0;
        totals.fouls += stat.fouls || 0;
      });
    }

    return totals;
  });
}

export interface TeamSummary {
  played: number;
  wins: number;
  losses: number;
  avgFor: number;
  avgAgainst: number;
  diff: number;
  /** Racha actual, p. ej. "V2" o "D1". */
  streak: string;
  form: ("V" | "D")[];
}

export function summarizeTeam(matches: Match[]): TeamSummary {
  const played = matches.length;
  const wins = matches.filter(m => m.ourScore > m.oppScore).length;
  const totalFor = matches.reduce((s, m) => s + m.ourScore, 0);
  const totalAgainst = matches.reduce((s, m) => s + m.oppScore, 0);
  const form = [...matches]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(m => (m.ourScore > m.oppScore ? "V" : "D") as "V" | "D");

  let streak = "";
  if (form.length) {
    const last = form[form.length - 1];
    let n = 0;
    for (let i = form.length - 1; i >= 0 && form[i] === last; i--) n++;
    streak = `${last}${n}`;
  }

  return {
    played,
    wins,
    losses: played - wins,
    avgFor: played ? totalFor / played : 0,
    avgAgainst: played ? totalAgainst / played : 0,
    diff: played ? (totalFor - totalAgainst) / played : 0,
    streak,
    form: form.slice(-5),
  };
}

export type LeaderKey = "ppg" | "t3" | "ftPct" | "plusMinus" | "mpg";

export function leaderValue(p: PlayerTotals, key: LeaderKey): number {
  switch (key) {
    case "ppg": return p.games ? p.points / p.games : 0;
    case "mpg": return p.games ? p.totalMinutes / p.games : 0;
    case "t3": return p.t3Made;
    case "ftPct": return p.ftAttempted >= 4 ? p.ftMade / p.ftAttempted : 0;
    case "plusMinus": return p.plusMinus;
  }
}

export function getLeader(totals: PlayerTotals[], key: LeaderKey) {
  const ranked = totals
    .filter(p => p.games > 0)
    .sort((a, b) => leaderValue(b, key) - leaderValue(a, key));
  return ranked[0];
}

export function formatLeader(p: PlayerTotals, key: LeaderKey): string {
  const v = leaderValue(p, key);
  switch (key) {
    case "ppg":
    case "mpg": return v.toFixed(1);
    case "ftPct": return `${Math.round(v * 100)}%`;
    case "plusMinus": return `${v > 0 ? "+" : ""}${v}`;
    default: return String(v);
  }
}

export const fmtDate = (d: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", opts);
