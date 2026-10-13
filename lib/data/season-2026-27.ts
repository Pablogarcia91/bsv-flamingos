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
    { playerId: 66, number: 66 },  // Juancho
    { playerId: 10, number: 10 },  // Jose
    { playerId: 15, number: 15 },  // Sevi
    // Incorporaciones
    { playerId: 100, number: 8 },    // Federico Ballerini
    { playerId: 101, number: 4 },    // Marcos Quiroga
    { playerId: 102, number: 17 },   // Leonel López
    { playerId: 103, number: null }, // Carlos Mondéjar
    { playerId: 104, number: null }, // Marcelo Rodríguez
    { playerId: 105, number: 20 },   // Juan Ramos
    { playerId: 106, number: 22 },   // Pupa
    { playerId: 107, number: null }, // Vlad Vilous
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
  ],
  standings: {
    division: "División Segunda",
    updated: "2026-10-13",
    rows: [
      { team: "Basket Montesion", played: 1, wins: 1, losses: 0, pointsFor: 62, pointsAgainst: 22 },
      { team: "Panthers", played: 1, wins: 1, losses: 0, pointsFor: 78, pointsAgainst: 50 },
      { team: "Underdogs", played: 1, wins: 1, losses: 0, pointsFor: 65, pointsAgainst: 43 },
      { team: "ATC Na Rovella 'A'", played: 1, wins: 1, losses: 0, pointsFor: 65, pointsAgainst: 51 },
      { team: "Secuelas Pías", played: 1, wins: 1, losses: 0, pointsFor: 57, pointsAgainst: 43 },
      { team: "San Jacobo Spurs", played: 1, wins: 1, losses: 0, pointsFor: 49, pointsAgainst: 41 },
      { team: "Teatinas Valencia", played: 1, wins: 1, losses: 0, pointsFor: 55, pointsAgainst: 50 },
      { team: "Flamingos", us: true, played: 1, wins: 0, losses: 1, pointsFor: 50, pointsAgainst: 55 },
      { team: "Rockeros Che de Ale", played: 1, wins: 0, losses: 1, pointsFor: 41, pointsAgainst: 49 },
      { team: "María Inmaculada Raconeta", played: 1, wins: 0, losses: 1, pointsFor: 51, pointsAgainst: 65 },
      { team: "Panathimankos", played: 1, wins: 0, losses: 1, pointsFor: 43, pointsAgainst: 57 },
      { team: "Stop Basket", played: 1, wins: 0, losses: 1, pointsFor: 43, pointsAgainst: 65 },
      { team: "Ponycornios Team", played: 1, wins: 0, losses: 1, pointsFor: 50, pointsAgainst: 78 },
      { team: "Drinkers", played: 1, wins: 0, losses: 1, pointsFor: 22, pointsAgainst: 62 },
    ],
  },
  fixtures: [
    { date: "2026-10-18", time: "11:00", opponent: "María Inmaculada Raconeta", home: true },
    { date: "2026-10-25", time: "12:45", opponent: "ATC Na Rovella 'A'", home: false },
    { date: "2026-10-31", time: "17:00", opponent: "Basket Montesion", home: false },
  ],
};
