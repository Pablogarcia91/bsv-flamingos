import { Player, Match } from "./types";

export const players: Player[] = [
  { id: 1, name: "Gregorio Freda", nickname: "Grego", number: 1, position: "Base" },
  { id: 4, name: "Raul Mestre Lleida", nickname: "Raúl", number: 4, position: "Pívot" },
  { id: 5, name: "Francisco Jesús Puertollano García", nickname: "Jesús", number: 5, position: "Alero" },
  { id: 6, name: "Pau Bas Sanjuan", nickname: "Pau", number: 6, position: "Alero" },
  { id: 7, name: "Carlos Aparicio Nieto", nickname: "Carlos", number: 7, position: "Base" },
  { id: 9, name: "Federico Juanicotena", nickname: "Pepi", number: 9, position: "Alero" },
  { id: 10, name: "Jose Fernando Rodriguez Guerra", nickname: "Jose", number: 10, position: "Pívot" },
  { id: 11, name: "Ricardo César Juanicotena", nickname: "Riky", number: 11, position: "Base" },
  { id: 15, name: "Jose Vicente González Cabrera", nickname: "Sevi", number: 15, position: "Alero" },
  { id: 19, name: "Pablo Garcia Pedro", nickname: "Pablo Rodillas", number: 19, position: "Pívot" },
  { id: 21, name: "Hernán Martín D'Amelio Acuña", nickname: "Martín", number: 21, position: "Alero" },
  { id: 24, name: "Nicolas Arias", nickname: "Nico", number: 24, position: "Alero" },
  { id: 27, name: "Claudio Castellazzi", nickname: "Claudio", number: 27, position: "Base" },
  { id: 31, name: "Oleksandr Sukhovyi", nickname: "Sasha", number: 31, position: "Alero" },
  { id: 44, name: "Dmytro Khomenko", nickname: "Dyma", number: 44, position: "Alero" },
  { id: 46, name: "Sergei Kostromin", nickname: "Sergei", number: 46, position: "Pívot" },
  { id: 66, name: "Juan Ignacio Vieytes", nickname: "Juancho", number: 66, position: "Pívot" }
];

export const matches: Match[] = [
  {
    id: 1,
    date: "2025-09-28",
    opponent: "Secuelas Pías",
    home: false,
    ourScore: 54,
    oppScore: 47,
    stats: [
      { playerId: 4, minutes: "24:27", points: 4, t2Made: 1, t3Made: 0, ftMade: 2, ftAttempted: 4, fouls: 0, plusMinus: 1 },
      { playerId: 5, minutes: "10:40", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 3, plusMinus: -6 },
      { playerId: 6, minutes: "18:58", points: 6, t2Made: 2, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 3, plusMinus: 6 },
      { playerId: 7, minutes: "19:32", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 1, plusMinus: 0 },
      { playerId: 10, minutes: "17:39", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 2, plusMinus: 7 },
      { playerId: 11, minutes: "19:20", points: 14, t2Made: 1, t3Made: 3, ftMade: 3, ftAttempted: 4, fouls: 3, plusMinus: 13 },
      { playerId: 1, minutes: "13:02", points: 2, t2Made: 0, t3Made: 0, ftMade: 2, ftAttempted: 4, fouls: 2, plusMinus: 5 },
      { playerId: 15, minutes: "15:51", points: 7, t2Made: 3, t3Made: 0, ftMade: 1, ftAttempted: 1, fouls: 3, plusMinus: 2 },
      { playerId: 21, minutes: "15:21", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: -1 },
      { playerId: 24, minutes: "00:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 27, minutes: "23:13", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: 5 },
      { playerId: 44, minutes: "21:57", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 3 }
    ]
  },
  {
    id: 2,
    date: "2025-10-05",
    opponent: "Panathimankos",
    home: true,
    ourScore: 52,
    oppScore: 60,
    stats: [
      { playerId: 1, minutes: "29:58", points: 10, t2Made: 3, t3Made: 0, ftMade: 4, ftAttempted: 8, fouls: 1, plusMinus: 0 },
      { playerId: 9, minutes: "15:04", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: 0 },
      { playerId: 11, minutes: "35:02", points: 9, t2Made: 2, t3Made: 1, ftMade: 2, ftAttempted: 4, fouls: 4, plusMinus: 0 },
      { playerId: 15, minutes: "24:38", points: 9, t2Made: 4, t3Made: 0, ftMade: 1, ftAttempted: 5, fouls: 0, plusMinus: 0 },
      { playerId: 19, minutes: "00:30", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 21, minutes: "22:31", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 0 },
      { playerId: 31, minutes: "19:49", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: 0 },
      { playerId: 44, minutes: "23:30", points: 16, t2Made: 6, t3Made: 1, ftMade: 1, ftAttempted: 3, fouls: 3, plusMinus: 0 },
      { playerId: 46, minutes: "28:58", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 0, plusMinus: 0 }
    ]
  },
  {
    id: 3,
    date: "2025-10-12",
    opponent: "Drinkers",
    home: false,
    ourScore: 49,
    oppScore: 35,
    stats: [
      { playerId: 1, minutes: "21:32", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 14 },
      { playerId: 4, minutes: "25:15", points: 10, t2Made: 5, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 5 },
      { playerId: 5, minutes: "15:01", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 10 },
      { playerId: 10, minutes: "17:57", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 0 },
      { playerId: 11, minutes: "32:49", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 6 },
      { playerId: 15, minutes: "14:02", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -4 },
      { playerId: 24, minutes: "19:02", points: 9, t2Made: 4, t3Made: 0, ftMade: 1, ftAttempted: 4, fouls: 1, plusMinus: 15 },
      { playerId: 44, minutes: "22:18", points: 11, t2Made: 0, t3Made: 3, ftMade: 2, ftAttempted: 2, fouls: 2, plusMinus: 1 },
      { playerId: 46, minutes: "12:49", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 11 },
      { playerId: 66, minutes: "19:15", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: 12 }
    ]
  },
  {
    id: 4,
    date: "2025-10-19",
    opponent: "ATC Na Rovella",
    home: true,
    ourScore: 61,
    oppScore: 63,
    stats: [
      { playerId: 4, minutes: "23:35", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 7 },
      { playerId: 5, minutes: "09:21", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -7 },
      { playerId: 6, minutes: "18:53", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -15 },
      { playerId: 7, minutes: "19:32", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: -14 },
      { playerId: 10, minutes: "19:22", points: 9, t2Made: 4, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: 4 },
      { playerId: 11, minutes: "23:42", points: 9, t2Made: 0, t3Made: 3, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 4 },
      { playerId: 15, minutes: "15:40", points: 7, t2Made: 2, t3Made: 1, ftMade: 0, ftAttempted: 2, fouls: 1, plusMinus: 18 },
      { playerId: 21, minutes: "09:55", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 1 },
      { playerId: 24, minutes: "18:51", points: 5, t2Made: 0, t3Made: 0, ftMade: 5, ftAttempted: 12, fouls: 0, plusMinus: 10 },
      { playerId: 27, minutes: "05:04", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 1, fouls: 0, plusMinus: 3 },
      { playerId: 44, minutes: "26:44", points: 18, t2Made: 5, t3Made: 2, ftMade: 2, ftAttempted: 4, fouls: 0, plusMinus: 4 },
      { playerId: 66, minutes: "09:21", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 2, fouls: 0, plusMinus: 1 }
    ]
  },
  {
    id: 5,
    date: "2025-10-26",
    opponent: "Stop Basket",
    home: true,
    ourScore: 63,
    oppScore: 55,
    stats: [
      { playerId: 1, minutes: "27:05", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 5, plusMinus: 14 },
      { playerId: 6, minutes: "22:15", points: 8, t2Made: 3, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 2, plusMinus: 2 },
      { playerId: 9, minutes: "13:31", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -6 },
      { playerId: 10, minutes: "13:55", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 1, fouls: 3, plusMinus: 11 },
      { playerId: 11, minutes: "20:24", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 4, fouls: 3, plusMinus: -7 },
      { playerId: 21, minutes: "17:28", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 1 },
      { playerId: 24, minutes: "17:02", points: 9, t2Made: 1, t3Made: 2, ftMade: 1, ftAttempted: 2, fouls: 0, plusMinus: 12 },
      { playerId: 27, minutes: "19:27", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 6 },
      { playerId: 44, minutes: "18:49", points: 23, t2Made: 2, t3Made: 5, ftMade: 4, ftAttempted: 8, fouls: 2, plusMinus: 13 },
      { playerId: 46, minutes: "19:36", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -1 },
      { playerId: 66, minutes: "10:28", points: 4, t2Made: 0, t3Made: 1, ftMade: 1, ftAttempted: 2, fouls: 5, plusMinus: 10 }
    ]
  },
  {
    id: 6,
    date: "2025-11-02",
    opponent: "BBT 1QBT",
    home: false,
    ourScore: 70,
    oppScore: 67,
    stats: [
      { playerId: 1, minutes: "18:41", points: 12, t2Made: 3, t3Made: 2, ftMade: 0, ftAttempted: 2, fouls: 3, plusMinus: 0 },
      { playerId: 4, minutes: "00:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 6, minutes: "22:44", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 3, fouls: 1, plusMinus: 9 },
      { playerId: 7, minutes: "26:08", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 1, plusMinus: 10 },
      { playerId: 10, minutes: "23:07", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 1, fouls: 2, plusMinus: 18 },
      { playerId: 21, minutes: "12:23", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -9 },
      { playerId: 24, minutes: "20:43", points: 13, t2Made: 4, t3Made: 0, ftMade: 5, ftAttempted: 10, fouls: 4, plusMinus: -4 },
      { playerId: 27, minutes: "13:09", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 7 },
      { playerId: 31, minutes: "12:17", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -11 },
      { playerId: 44, minutes: "25:09", points: 23, t2Made: 7, t3Made: 1, ftMade: 6, ftAttempted: 10, fouls: 0, plusMinus: 17 },
      { playerId: 46, minutes: "10:09", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -9 },
      { playerId: 66, minutes: "15:30", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -13 }
    ]
  },
  {
    id: 7,
    date: "2025-11-09",
    opponent: "Manises Eliseo A",
    home: false,
    ourScore: 62,
    oppScore: 52,
    stats: [
      { playerId: 7, minutes: "15:54", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 3 },
      { playerId: 9, minutes: "12:25", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 1, fouls: 1, plusMinus: 0 },
      { playerId: 10, minutes: "15:15", points: 8, t2Made: 3, t3Made: 0, ftMade: 2, ftAttempted: 4, fouls: 4, plusMinus: -5 },
      { playerId: 11, minutes: "27:44", points: 13, t2Made: 3, t3Made: 1, ftMade: 4, ftAttempted: 5, fouls: 3, plusMinus: 8 },
      { playerId: 15, minutes: "14:53", points: 4, t2Made: 0, t3Made: 1, ftMade: 1, ftAttempted: 2, fouls: 3, plusMinus: 7 },
      { playerId: 19, minutes: "09:32", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -3 },
      { playerId: 21, minutes: "10:07", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -4 },
      { playerId: 24, minutes: "22:11", points: 14, t2Made: 4, t3Made: 0, ftMade: 6, ftAttempted: 6, fouls: 3, plusMinus: 7 },
      { playerId: 31, minutes: "09:41", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 10 },
      { playerId: 44, minutes: "23:23", points: 12, t2Made: 2, t3Made: 1, ftMade: 5, ftAttempted: 6, fouls: 4, plusMinus: 21 },
      { playerId: 46, minutes: "19:10", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 11 },
      { playerId: 66, minutes: "19:45", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -5 }
    ]
  },
  {
    id: 8,
    date: "2025-11-16",
    opponent: "Los Halcones",
    home: false,
    ourScore: 64,
    oppScore: 87,
    stats: [
      { playerId: 1, minutes: "19:47", points: 6, t2Made: 1, t3Made: 0, ftMade: 4, ftAttempted: 4, fouls: 5, plusMinus: -23 },
      { playerId: 4, minutes: "19:52", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -12 },
      { playerId: 6, minutes: "28:05", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 2, plusMinus: -9 },
      { playerId: 9, minutes: "20:55", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -15 },
      { playerId: 10, minutes: "23:19", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 3, plusMinus: -13 },
      { playerId: 15, minutes: "00:41", points: 5, t2Made: 1, t3Made: 0, ftMade: 3, ftAttempted: 4, fouls: 1, plusMinus: -10 },
      { playerId: 19, minutes: "11:06", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -16 },
      { playerId: 24, minutes: "21:49", points: 22, t2Made: 2, t3Made: 3, ftMade: 9, ftAttempted: 11, fouls: 1, plusMinus: -13 },
      { playerId: 27, minutes: "01:38", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -15 },
      { playerId: 44, minutes: "34:35", points: 11, t2Made: 4, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -15 },
      { playerId: 46, minutes: "03:06", points: 5, t2Made: 0, t3Made: 1, ftMade: 2, ftAttempted: 2, fouls: 0, plusMinus: -10 },
      { playerId: 66, minutes: "15:07", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -16 }
    ]
  },
  {
    id: 9,
    date: "2025-11-23",
    opponent: "Dfincas Alfara A",
    home: true,
    ourScore: 64,
    oppScore: 73,
    stats: [
      { playerId: 5, minutes: "10:27", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 6 },
      { playerId: 6, minutes: "22:17", points: 5, t2Made: 1, t3Made: 0, ftMade: 3, ftAttempted: 6, fouls: 0, plusMinus: 1 },
      { playerId: 7, minutes: "25:20", points: 24, t2Made: 6, t3Made: 2, ftMade: 6, ftAttempted: 11, fouls: 3, plusMinus: -3 },
      { playerId: 10, minutes: "17:23", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -13 },
      { playerId: 15, minutes: "22:12", points: 5, t2Made: 1, t3Made: 0, ftMade: 3, ftAttempted: 7, fouls: 2, plusMinus: -5 },
      { playerId: 19, minutes: "11:44", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -8 },
      { playerId: 21, minutes: "13:15", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 5, plusMinus: -17 },
      { playerId: 24, minutes: "14:40", points: 6, t2Made: 0, t3Made: 1, ftMade: 3, ftAttempted: 10, fouls: 3, plusMinus: -6 },
      { playerId: 27, minutes: "17:07", points: 6, t2Made: 1, t3Made: 1, ftMade: 1, ftAttempted: 4, fouls: 1, plusMinus: 2 },
      { playerId: 31, minutes: "13:45", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: -1 },
      { playerId: 46, minutes: "17:11", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 0 },
      { playerId: 66, minutes: "14:39", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 3, plusMinus: -1 }
    ]
  },
  {
    id: 10,
    date: "2025-12-21",
    opponent: "María Inmaculada",
    home: false,
    ourScore: 51,
    oppScore: 70,
    stats: [
      { playerId: 1, minutes: "00:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 4, minutes: "14:25", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -6 },
      { playerId: 5, minutes: "17:02", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: -15 },
      { playerId: 6, minutes: "00:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 7, minutes: "36:31", points: 8, t2Made: 2, t3Made: 0, ftMade: 4, ftAttempted: 9, fouls: 2, plusMinus: -15 },
      { playerId: 9, minutes: "00:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 10, minutes: "00:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 0 },
      { playerId: 27, minutes: "31:57", points: 7, t2Made: 2, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -1 },
      { playerId: 31, minutes: "34:23", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -11 },
      { playerId: 44, minutes: "33:00", points: 25, t2Made: 5, t3Made: 3, ftMade: 6, ftAttempted: 11, fouls: 2, plusMinus: -13 },
      { playerId: 46, minutes: "32:42", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: -9 }
    ]
  },
  {
    id: 11,
    date: "2026-01-11",
    opponent: "Sanfrantoko9ers",
    home: false,
    ourScore: 50,
    oppScore: 67,
    stats: [
      { playerId: 4, minutes: "28:22", points: 11, t2Made: 4, t3Made: 0, ftMade: 3, ftAttempted: 4, fouls: 3, plusMinus: -11 },
      { playerId: 5, minutes: "10:19", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -4 },
      { playerId: 6, minutes: "29:41", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 4, fouls: 1, plusMinus: -13 },
      { playerId: 7, minutes: "37:35", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 4, fouls: 1, plusMinus: -9 },
      { playerId: 9, minutes: "13:02", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -6 },
      { playerId: 10, minutes: "11:39", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 1, plusMinus: -3 },
      { playerId: 11, minutes: "06:22", points: 9, t2Made: 3, t3Made: 1, ftMade: 0, ftAttempted: 2, fouls: 0, plusMinus: 0 },
      { playerId: 15, minutes: "25:16", points: 9, t2Made: 4, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: -5 },
      { playerId: 21, minutes: "15:12", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -9 },
      { playerId: 44, minutes: "22:32", points: 11, t2Made: 5, t3Made: 0, ftMade: 1, ftAttempted: 1, fouls: 1, plusMinus: -25 }
    ]
  },
  {
    id: 12,
    date: "2026-01-18",
    opponent: "Xuloplastika",
    home: true,
    ourScore: 47,
    oppScore: 68,
    stats: [
      { playerId: 4, minutes: "17:27", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 0, plusMinus: -8 },
      { playerId: 6, minutes: "22:40", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 3, fouls: 2, plusMinus: -10 },
      { playerId: 7, minutes: "26:58", points: 13, t2Made: 1, t3Made: 3, ftMade: 2, ftAttempted: 2, fouls: 3, plusMinus: -9 },
      { playerId: 9, minutes: "17:20", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -11 },
      { playerId: 10, minutes: "24:54", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -10 },
      { playerId: 15, minutes: "19:24", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 2, plusMinus: -9 },
      { playerId: 19, minutes: "14:04", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -8 },
      { playerId: 27, minutes: "18:15", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -15 },
      { playerId: 44, minutes: "29:39", points: 7, t2Made: 1, t3Made: 1, ftMade: 2, ftAttempted: 4, fouls: 1, plusMinus: -17 },
      { playerId: 46, minutes: "09:19", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -8 }
    ]
  },
  {
    id: 13,
    date: "2026-01-25",
    opponent: "Secuelas Pías",
    home: true,
    ourScore: 45,
    oppScore: 55,
    stats: [
      { playerId: 6, minutes: "27:40", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 3, plusMinus: -11 },
      { playerId: 7, minutes: "35:18", points: 14, t2Made: 2, t3Made: 3, ftMade: 1, ftAttempted: 2, fouls: 0, plusMinus: -9 },
      { playerId: 10, minutes: "29:22", points: 4, t2Made: 1, t3Made: 0, ftMade: 2, ftAttempted: 6, fouls: 0, plusMinus: -8 },
      { playerId: 15, minutes: "23:58", points: 7, t2Made: 2, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 1 },
      { playerId: 19, minutes: "22:48", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 2, plusMinus: -5 },
      { playerId: 21, minutes: "11:38", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 3 },
      { playerId: 31, minutes: "11:54", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 0 },
      { playerId: 44, minutes: "24:37", points: 12, t2Made: 6, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -9 },
      { playerId: 46, minutes: "12:45", points: 1, t2Made: 0, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 1, plusMinus: -12 }
    ]
  },
  {
    id: 14,
    date: "2026-02-01",
    opponent: "Panathimankos",
    home: false,
    ourScore: 54,
    oppScore: 51,
    stats: [
      { playerId: 4, minutes: "23:03", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -2 },
      { playerId: 6, minutes: "14:48", points: 2, t2Made: 0, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 0, plusMinus: -1 },
      { playerId: 7, minutes: "29:22", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 4, fouls: 2, plusMinus: 1 },
      { playerId: 10, minutes: "15:01", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -6 },
      { playerId: 11, minutes: "23:14", points: 14, t2Made: 1, t3Made: 2, ftMade: 6, ftAttempted: 11, fouls: 3, plusMinus: 9 },
      { playerId: 15, minutes: "12:39", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 3, plusMinus: -3 },
      { playerId: 19, minutes: "11:41", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 7 },
      { playerId: 21, minutes: "13:42", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 4 },
      { playerId: 24, minutes: "12:38", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 2 },
      { playerId: 44, minutes: "17:41", points: 13, t2Made: 4, t3Made: 1, ftMade: 2, ftAttempted: 2, fouls: 1, plusMinus: 2 },
      { playerId: 46, minutes: "04:55", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -7 },
      { playerId: 66, minutes: "21:16", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 4, fouls: 2, plusMinus: 9 }
    ]
  },
  {
    id: 15,
    date: "2026-02-08",
    opponent: "Drinkers",
    home: true,
    ourScore: 54,
    oppScore: 62,
    stats: [
      { playerId: 1, minutes: "20:45", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 5, plusMinus: -5 },
      { playerId: 6, minutes: "23:06", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -5 },
      { playerId: 7, minutes: "24:36", points: 15, t2Made: 2, t3Made: 3, ftMade: 2, ftAttempted: 5, fouls: 2, plusMinus: 3 },
      { playerId: 9, minutes: "14:22", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 3 },
      { playerId: 10, minutes: "27:58", points: 11, t2Made: 5, t3Made: 0, ftMade: 1, ftAttempted: 3, fouls: 3, plusMinus: -5 },
      { playerId: 11, minutes: "10:39", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: -10 },
      { playerId: 27, minutes: "15:23", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 1 },
      { playerId: 44, minutes: "24:17", points: 20, t2Made: 6, t3Made: 1, ftMade: 5, ftAttempted: 7, fouls: 1, plusMinus: -11 },
      { playerId: 46, minutes: "20:53", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -9 },
      { playerId: 66, minutes: "18:01", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: -2 }
    ]
  },
  {
    id: 16,
    date: "2026-02-15",
    opponent: "ATC Na Rovella",
    home: false,
    ourScore: 67,
    oppScore: 55,
    stats: [
      { playerId: 4, minutes: "03:38", points: 6, t2Made: 2, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 0, plusMinus: -5 },
      { playerId: 5, minutes: "21:21", points: 4, t2Made: 0, t3Made: 0, ftMade: 4, ftAttempted: 8, fouls: 2, plusMinus: 4 },
      { playerId: 7, minutes: "30:04", points: 14, t2Made: 3, t3Made: 1, ftMade: 5, ftAttempted: 10, fouls: 1, plusMinus: 12 },
      { playerId: 19, minutes: "19:38", points: 2, t2Made: 0, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 4, plusMinus: 5 },
      { playerId: 21, minutes: "31:20", points: 5, t2Made: 1, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 9 },
      { playerId: 44, minutes: "36:32", points: 29, t2Made: 4, t3Made: 5, ftMade: 6, ftAttempted: 8, fouls: 2, plusMinus: 16 },
      { playerId: 46, minutes: "29:05", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 4 },
      { playerId: 66, minutes: "28:22", points: 7, t2Made: 2, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 15 }
    ]
  },
  {
    id: 17,
    date: "2026-02-22",
    opponent: "San Pedro Pascual 'B'",
    home: true,
    ourScore: 61,
    oppScore: 40,
    stats: [
      { playerId: 5, minutes: "16:14", points: 7, t2Made: 1, t3Made: 1, ftMade: 2, ftAttempted: 4, fouls: 0, plusMinus: 21 },
      { playerId: 7, minutes: "22:00", points: 11, t2Made: 4, t3Made: 1, ftMade: 0, ftAttempted: 1, fouls: 1, plusMinus: 25 },
      { playerId: 9, minutes: "19:17", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 1 },
      { playerId: 10, minutes: "17:02", points: 5, t2Made: 2, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 0, plusMinus: -7 },
      { playerId: 11, minutes: "18:00", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 1, fouls: 0, plusMinus: -4 },
      { playerId: 19, minutes: "17:30", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 4, plusMinus: 22 },
      { playerId: 31, minutes: "19:27", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -4 },
      { playerId: 44, minutes: "20:04", points: 25, t2Made: 0, t3Made: 8, ftMade: 1, ftAttempted: 1, fouls: 0, plusMinus: 22 },
      { playerId: 46, minutes: "25:45", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: -4 },
      { playerId: 66, minutes: "24:41", points: 3, t2Made: 0, t3Made: 0, ftMade: 3, ftAttempted: 6, fouls: 2, plusMinus: 33 }
    ]
  },
  {
    id: 18,
    date: "2026-03-08",
    opponent: "Stop Basket",
    home: false,
    ourScore: 68,
    oppScore: 34,
    stats: [
      { playerId: 7, minutes: "17:52", points: 15, t2Made: 4, t3Made: 1, ftMade: 4, ftAttempted: 7, fouls: 1, plusMinus: 17 },
      { playerId: 9, minutes: "27:00", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 25 },
      { playerId: 10, minutes: "19:58", points: 8, t2Made: 4, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 21 },
      { playerId: 11, minutes: "26:45", points: 7, t2Made: 2, t3Made: 1, ftMade: 0, ftAttempted: 1, fouls: 1, plusMinus: 15 },
      { playerId: 19, minutes: "23:06", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 15 },
      { playerId: 21, minutes: "22:15", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 11 },
      { playerId: 24, minutes: "17:56", points: 12, t2Made: 1, t3Made: 3, ftMade: 1, ftAttempted: 2, fouls: 1, plusMinus: 30 },
      { playerId: 44, minutes: "23:24", points: 15, t2Made: 3, t3Made: 3, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 31 },
      { playerId: 46, minutes: "21:44", points: 8, t2Made: 4, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 5 }
    ]
  },
  {
    id: 19,
    date: "2026-03-22",
    opponent: "BBT 1QBT",
    home: true,
    ourScore: 62,
    oppScore: 68,
    stats: [
      { playerId: 4, minutes: "32:10", points: 12, t2Made: 5, t3Made: 0, ftMade: 2, ftAttempted: 4, fouls: 2, plusMinus: -6 },
      { playerId: 9, minutes: "19:36", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 2, fouls: 1, plusMinus: 2 },
      { playerId: 10, minutes: "22:44", points: 4, t2Made: 1, t3Made: 0, ftMade: 2, ftAttempted: 2, fouls: 4, plusMinus: -4 },
      { playerId: 15, minutes: "26:24", points: 4, t2Made: 0, t3Made: 1, ftMade: 1, ftAttempted: 2, fouls: 3, plusMinus: -9 },
      { playerId: 21, minutes: "16:37", points: 3, t2Made: 0, t3Made: 1, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: 7 },
      { playerId: 31, minutes: "14:06", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 2, plusMinus: -13 },
      { playerId: 44, minutes: "37:52", points: 35, t2Made: 9, t3Made: 5, ftMade: 2, ftAttempted: 2, fouls: 1, plusMinus: -2 },
      { playerId: 66, minutes: "30:31", points: 2, t2Made: 1, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: -5 }
    ]
  },
  {
    id: 20,
    date: "2026-03-29",
    opponent: "Manises Eliseo A",
    home: true,
    ourScore: 59,
    oppScore: 46,
    stats: [
      { playerId: 5, minutes: "19:24", points: 6, t2Made: 3, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 3, plusMinus: 9 },
      { playerId: 7, minutes: "22:40", points: 3, t2Made: 1, t3Made: 0, ftMade: 1, ftAttempted: 2, fouls: 2, plusMinus: 3 },
      { playerId: 9, minutes: "16:46", points: 6, t2Made: 0, t3Made: 2, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 3 },
      { playerId: 10, minutes: "18:04", points: 12, t2Made: 6, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 0, plusMinus: 1 },
      { playerId: 11, minutes: "26:02", points: 4, t2Made: 0, t3Made: 1, ftMade: 1, ftAttempted: 1, fouls: 0, plusMinus: 13 },
      { playerId: 15, minutes: "17:45", points: 12, t2Made: 3, t3Made: 2, ftMade: 0, ftAttempted: 2, fouls: 2, plusMinus: 2 },
      { playerId: 19, minutes: "20:22", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 5, plusMinus: 18 },
      { playerId: 24, minutes: "02:48", points: 0, t2Made: 0, t3Made: 0, ftMade: 0, ftAttempted: 0, fouls: 1, plusMinus: 0 },
      { playerId: 31, minutes: "10:03", points: 4, t2Made: 0, t3Made: 1, ftMade: 1, ftAttempted: 2, fouls: 5, plusMinus: 6 },
      { playerId: 44, minutes: "18:52", points: 8, t2Made: 2, t3Made: 1, ftMade: 1, ftAttempted: 4, fouls: 0, plusMinus: -2 },
      { playerId: 66, minutes: "27:14", points: 4, t2Made: 2, t3Made: 0, ftMade: 0, ftAttempted: 4, fouls: 3, plusMinus: 12 }
    ]
  }
];
