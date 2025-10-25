import { Player, Match, PlayerTotals, TeamGameStats } from "./types";

export function calculatePlayerTotals(players: Player[], matches: Match[]): PlayerTotals[] {
  const totals: Record<number, PlayerTotals> = {};

  players.forEach(player => {
    totals[player.id] = {
      ...player,
      games: 0,
      totalMinutes: 0,
      t2Made: 0,
      t3Made: 0,
      ftMade: 0,
      ftAttempted: 0,
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
          player.t3Made += stat.t3Made || 0;
          player.ftMade += stat.ftMade || 0;
          player.ftAttempted += stat.ftAttempted || 0;
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
