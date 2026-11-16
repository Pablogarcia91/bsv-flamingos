import { Season } from "../types";

// Temporada 2026-27 — plantilla oficial.
// number: null = dorsal pendiente de asignar.
export const season2026: Season = {
  id: "2026-27",
  label: "2026-27",
  teamName: "Flamingos",
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
    {
      id: 104,
      date: "2026-10-31",
      opponent: "Basket Montesion",
      home: false,
      ourScore: 43,
      oppScore: 45,
      quarters: { us: [12, 6, 13, 12], them: [2, 15, 7, 21] },
      stats: [
        { playerId: 21, minutes: "15:07", points: 6, t2Made: 0, t3Made: 2, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 2 },
        { playerId: 101, minutes: "11:30", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -1 },
        { playerId: 66, minutes: "17:12", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 3, plusMinus: -5 },
        { playerId: 7, minutes: "23:28", points: 11, t2Made: 5, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: 6 },
        { playerId: 10, minutes: "19:28", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 8 },
        { playerId: 11, minutes: "16:04", points: 3, t2Made: 0, t3Made: 0, ftMade: 3, ftAttempted: 4, fouls: 3, plusMinus: -12 },
        { playerId: 108, minutes: "09:24", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 0, plusMinus: -6 },
        { playerId: 24, minutes: "14:17", points: 4, t2Made: 0, t3Made: 1, ftMade: 1, ftAttempted: 2, fouls: 0, plusMinus: -3 },
        { playerId: 6, minutes: "28:12", points: 3, t2Made: 0, t3Made: 0, ftMade: 3, ftAttempted: 8, fouls: 1, plusMinus: 3 },
        { playerId: 19, minutes: "16:59", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: 1 },
        { playerId: 105, minutes: "11:12", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 0 },
        { playerId: 106, minutes: "17:07", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -3 },
      ],
    },
    {
      id: 105,
      date: "2026-11-08",
      opponent: "Panthers",
      home: true,
      ourScore: 55,
      oppScore: 65,
      quarters: { us: [11, 9, 15, 20], them: [18, 20, 9, 18] },
      stats: [
        { playerId: 103, minutes: "12:11", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -4 },
        { playerId: 101, minutes: "21:26", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 1 },
        { playerId: 5, minutes: "08:57", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 3 },
        { playerId: 7, minutes: "19:42", points: 13, t2Made: 4, t3Made: 1, ftMade: 2, ftAttempted: 2, fouls: 0, plusMinus: 3 },
        { playerId: 100, minutes: "10:20", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -13 },
        { playerId: 9, minutes: "12:55", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -5 },
        { playerId: 108, minutes: "13:24", points: 8, t2Made: 4, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 2 },
        { playerId: 6, minutes: "25:07", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 8, fouls: 0, plusMinus: -6 },
        { playerId: 102, minutes: "25:48", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -10 },
        { playerId: 105, minutes: "20:46", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -3 },
        { playerId: 106, minutes: "15:36", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -9 },
        { playerId: 107, minutes: "13:48", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 1, plusMinus: -9 },
      ],
    },
    {
      id: 106,
      date: "2026-11-15",
      opponent: "Panathimankos",
      home: false,
      ourScore: 37,
      oppScore: 25,
      quarters: { us: [12, 12, 4, 9], them: [5, 7, 8, 5] },
      stats: [
        { playerId: 101, minutes: "16:06", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 7 },
        { playerId: 66, minutes: "20:52", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 2, plusMinus: 10 },
        { playerId: 7, minutes: "17:23", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 2 },
        { playerId: 100, minutes: "18:06", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 9 },
        { playerId: 9, minutes: "07:14", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -5 },
        { playerId: 10, minutes: "24:03", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 1 },
        { playerId: 108, minutes: "23:15", points: 8, t2Made: 2, t3Made: 1, ftMade: 1, ftAttempted: 2, fouls: 1, plusMinus: 10 },
        { playerId: 102, minutes: "24:30", points: 6, t2Made: 1, t3Made: 1, ftMade: 1, ftAttempted: 4, fouls: 0, plusMinus: 6 },
        { playerId: 19, minutes: "12:05", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
        { playerId: 105, minutes: "14:32", points: 13, t2Made: 4, t3Made: 1, ftMade: 2, ftAttempted: 2, fouls: 2, plusMinus: 7 },
        { playerId: 106, minutes: "11:17", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 7 },
        { playerId: 104, minutes: "10:37", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 6 },
      ],
    },
  ],
  standings: {
    division: "División Segunda",
    updated: "2026-11-16",
    rows: [
      { team: "Teatinas Valencia", played: 6, wins: 5, losses: 1, pointsFor: 336, pointsAgainst: 283 },
      { team: "Basket Montesion", played: 6, wins: 4, losses: 2, pointsFor: 293, pointsAgainst: 237 },
      { team: "San Jacobo Spurs", played: 5, wins: 5, losses: 0, pointsFor: 303, pointsAgainst: 250 },
      { team: "ATC Na Rovella 'A'", played: 6, wins: 4, losses: 2, pointsFor: 339, pointsAgainst: 314 },
      { team: "Drinkers", played: 6, wins: 4, losses: 2, pointsFor: 305, pointsAgainst: 317 },
      { team: "María Inmaculada Raconeta", played: 6, wins: 3, losses: 3, pointsFor: 350, pointsAgainst: 294 },
      { team: "Secuelas Pías", played: 5, wins: 4, losses: 1, pointsFor: 287, pointsAgainst: 263 },
      { team: "Rockeros Che de Ale", played: 6, wins: 3, losses: 3, pointsFor: 346, pointsAgainst: 333 },
      { team: "Panthers", played: 6, wins: 3, losses: 3, pointsFor: 368, pointsAgainst: 362 },
      { team: "Underdogs", played: 6, wins: 2, losses: 4, pointsFor: 332, pointsAgainst: 345 },
      { team: "Flamingos", us: true, played: 6, wins: 1, losses: 5, pointsFor: 258, pointsAgainst: 290 },
      { team: "Ponycornios Team", played: 6, wins: 1, losses: 5, pointsFor: 289, pointsAgainst: 356 },
      { team: "Panathimankos", played: 6, wins: 1, losses: 5, pointsFor: 216, pointsAgainst: 308 },
      { team: "Stop Basket", played: 4, wins: 0, losses: 4, pointsFor: 164, pointsAgainst: 234 },
    ],
  },
  fixtures: [
    { date: "2026-11-22", time: "11:00", opponent: "Rockeros Che de Ale", home: true },
  ],
};
