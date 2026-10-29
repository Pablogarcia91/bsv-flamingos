import { Season } from "../types";

// Temporada 2026-27 — plantilla oficial.
// number: null = dorsal pendiente de asignar.
export const season2026: Season = {
  id: "2026-27",
  label: "2026-27",
  league: "Liga Quirónsalud Alquería Masculina",
  status: "current",
  teamsInLeague: 14,
  roster: [
    // Continúan de la 2025-26
    { playerId: 6, number: 16 },   // Pau (antes 6)
    { playerId: 9, number: 9 },    // Pepi
    { playerId: 11, number: 11 },  // Riky
    { playerId: 19, number: 19 },  // Pablo
    { playerId: 5, number: 5 },    // Jesús
    { playerId: 7, number: 7 },    // Carlos
    { playerId: 24, number: 13 },  // Nico (antes 24)
    { playerId: 21, number: 3 },   // Martín (antes 21)
    { playerId: 66, number: 6 },   // Juancho
    { playerId: 10, number: 10 },  // Jose
    { playerId: 15, number: 15 },  // Sevi
    // Incorporaciones
    { playerId: 100, number: 8 },    // Federico Ballerini
    { playerId: 101, number: 4 },    // Marcos Quiroga
    { playerId: 102, number: 17 },   // Leonel López
    { playerId: 103, number: 1 },    // Carlos Mondéjar
    { playerId: 104, number: 28 },   // Marcelo Rodighiero
    { playerId: 105, number: 20 },   // Juan Ramos
    { playerId: 106, number: 22 },   // Pupa
    { playerId: 107, number: 23 },   // Vlad (Volodymyr Bilous)
    { playerId: 108, number: 12 },   // Josué Macías
  ],
  matches: [
    {
      id: 101,
      date: "2026-10-03",
      opponent: "Teatinas Valencia",
      home: false,
      ourScore: 50,
      oppScore: 55,
      stats: [
        { playerId: 21, minutes: "10:42", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 19 },
        { playerId: 101, minutes: "17:01", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -16 },
        { playerId: 66, minutes: "17:51", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 5, plusMinus: -9 },
        { playerId: 7, minutes: "24:41", points: 9, t2Made: 1, t3Made: 1, ftMade: 4, ftAttempted: 9, fouls: 3, plusMinus: 7 },
        { playerId: 100, minutes: "14:47", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 4, fouls: 3, plusMinus: -16 },
        { playerId: 10, minutes: "24:08", points: 10, t2Made: 5, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: 6 },
        { playerId: 108, minutes: "12:28", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -18 },
        { playerId: 24, minutes: "10:35", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: -6 },
        { playerId: 6, minutes: "22:01", points: 10, t2Made: 3, t3Made: 1, ftMade: 1, ftAttempted: 4, fouls: 2, plusMinus: 10 },
        { playerId: 102, minutes: "21:41", points: 10, t2Made: 1, t3Made: 1, ftMade: 5, ftAttempted: 9, fouls: 0, plusMinus: 21 },
        { playerId: 105, minutes: "15:27", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -19 },
        { playerId: 106, minutes: "08:38", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -4 },
      ],
    },
    {
      id: 102,
      date: "2026-10-18",
      opponent: "María Inmaculada Raconeta",
      home: true,
      ourScore: 37,
      oppScore: 58,
      quarters: { us: [4, 14, 15, 4], them: [16, 12, 14, 16] },
      stats: [
        { playerId: 103, minutes: "13:32", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 1, plusMinus: -23 },
        { playerId: 21, minutes: "14:31", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -14 },
        { playerId: 101, minutes: "06:51", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 2 },
        { playerId: 66, minutes: "24:33", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 6, fouls: 4, plusMinus: -1 },
        { playerId: 100, minutes: "16:04", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 10 },
        { playerId: 11, minutes: "24:54", points: 13, t2Made: 4, t3Made: 1, ftMade: 2, ftAttempted: 5, fouls: 3, plusMinus: -21 },
        { playerId: 24, minutes: "18:03", points: 8, t2Made: 0, t3Made: 2, ftMade: 2, ftAttempted: 5, fouls: 3, plusMinus: -2 },
        { playerId: 6, minutes: "21:57", points: 7, t2Made: 3, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 3, plusMinus: -13 },
        { playerId: 102, minutes: "25:50", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: -10 },
        { playerId: 19, minutes: "11:18", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -10 },
        { playerId: 107, minutes: "10:44", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -20 },
        { playerId: 104, minutes: "11:43", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -3 },
      ],
    },
    {
      id: 103,
      date: "2026-10-25",
      opponent: "ATC Na Rovella 'A'",
      home: false,
      ourScore: 36,
      oppScore: 42,
      quarters: { us: [7, 13, 11, 5], them: [8, 7, 14, 13] },
      stats: [
        { playerId: 5, minutes: "07:39", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 8 },
        { playerId: 66, minutes: "21:45", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 7 },
        { playerId: 100, minutes: "17:07", points: 3, t2Made: 0, t3Made: 0, ftMade: 3, ftAttempted: 4, fouls: 1, plusMinus: -13 },
        { playerId: 9, minutes: "17:19", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -13 },
        { playerId: 10, minutes: "27:45", points: 4, t2Made: 1, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 4, plusMinus: -8 },
        { playerId: 11, minutes: "14:29", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 1 },
        { playerId: 108, minutes: "10:44", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 4 },
        { playerId: 102, minutes: "29:39", points: 14, t2Made: 6, t3Made: 0, ftMade: 2, ftAttempted: 5, fouls: 0, plusMinus: -5 },
        { playerId: 19, minutes: "18:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -8 },
        { playerId: 106, minutes: "11:18", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -3 },
        { playerId: 107, minutes: "12:11", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 2 },
        { playerId: 104, minutes: "12:04", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -2 },
      ],
    },
  ],
  standings: {
    division: "División Segunda",
    updated: "2026-10-29",
    rows: [
      { team: "ATC Na Rovella 'A'", played: 3, wins: 3, losses: 0, pointsFor: 174, pointsAgainst: 136 },
      { team: "Secuelas Pías", played: 3, wins: 3, losses: 0, pointsFor: 181, pointsAgainst: 154 },
      { team: "Basket Montesion", played: 3, wins: 2, losses: 1, pointsFor: 152, pointsAgainst: 98 },
      { team: "Panthers", played: 3, wins: 2, losses: 1, pointsFor: 209, pointsAgainst: 183 },
      { team: "Teatinas Valencia", played: 3, wins: 2, losses: 1, pointsFor: 160, pointsAgainst: 155 },
      { team: "Drinkers", played: 3, wins: 2, losses: 1, pointsFor: 147, pointsAgainst: 175 },
      { team: "Underdogs", played: 3, wins: 1, losses: 2, pointsFor: 177, pointsAgainst: 160 },
      { team: "San Jacobo Spurs", played: 2, wins: 2, losses: 0, pointsFor: 109, pointsAgainst: 97 },
      { team: "Rockeros Che de Ale", played: 3, wins: 1, losses: 2, pointsFor: 165, pointsAgainst: 169 },
      { team: "María Inmaculada Raconeta", played: 3, wins: 1, losses: 2, pointsFor: 143, pointsAgainst: 155 },
      { team: "Panathimankos", played: 3, wins: 1, losses: 2, pointsFor: 133, pointsAgainst: 147 },
      { team: "Flamingos", us: true, played: 3, wins: 0, losses: 3, pointsFor: 123, pointsAgainst: 155 },
      { team: "Ponycornios Team", played: 3, wins: 0, losses: 3, pointsFor: 138, pointsAgainst: 187 },
      { team: "Stop Basket", played: 2, wins: 0, losses: 2, pointsFor: 92, pointsAgainst: 132 },
    ],
  },
  fixtures: [
    { date: "2026-10-31", time: "17:00", opponent: "Basket Montesion", home: false },
  ],
};
