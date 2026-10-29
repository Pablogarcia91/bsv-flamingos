import { Person } from "../types";

// Registro único de jugadores (actuales e históricos).
// Un jugador mantiene su id en todas las temporadas: así se enlaza su historial.
export const people: Person[] = [
  { id: 1, name: "Gregorio Freda", nickname: "Grego", position: "Base" },
  { id: 4, name: "Raul Mestre Lleida", nickname: "Raúl", position: "Pívot" },
  { id: 5, name: "Francisco Jesús Puertollano García", nickname: "Jesús", position: "Alero" },
  { id: 6, name: "Pau Bas Sanjuan", nickname: "Pau", position: "Alero" },
  { id: 7, name: "Carlos Aparicio Nieto", nickname: "Carlos", position: "Base" },
  { id: 9, name: "Federico Juanicotena", nickname: "Pepi", position: "Alero" },
  { id: 10, name: "Jose Fernando Rodriguez Guerra", nickname: "Jose", position: "Pívot" },
  { id: 11, name: "Ricardo César Juanicotena", nickname: "Riky", position: "Base" },
  { id: 15, name: "Jose Vicente González Cabrera", nickname: "Sevi", position: "Alero" },
  { id: 19, name: "Pablo Garcia Pedro", nickname: "Pablo", position: "Pívot" },
  { id: 21, name: "Hernán Martín D'Amelio Acuña", nickname: "Martín", position: "Alero" },
  { id: 24, name: "Nicolas Arias", nickname: "Nico", position: "Alero" },
  { id: 27, name: "Claudio Castellazzi", nickname: "Claudio", position: "Base" },
  { id: 31, name: "Oleksandr Sukhovyi", nickname: "Sasha", position: "Alero" },
  { id: 44, name: "Dmytro Khomenko", nickname: "Dyma", position: "Alero" },
  { id: 46, name: "Sergei Kostromin", nickname: "Sergei", position: "Pívot" },
  { id: 66, name: "Juan Ignacio Vieytes", nickname: "Juancho", position: "Pívot" },

  // ── Incorporaciones 2026-27 ──
  { id: 100, name: "Federico Ballerini", nickname: "Federico", position: "Base" },
  { id: 101, name: "Marcos Quiroga", nickname: "Marcos", position: "Pívot" },
  { id: 102, name: "Leonel López", nickname: "Leonel", position: "Alero" },
  { id: 103, name: "Carlos Mondéjar", nickname: "Mondéjar", position: "Alero" },
  { id: 104, name: "Carlos Marcelo Rodighiero", nickname: "Marcelo", position: "Alero" },
  { id: 105, name: "Juan Ramos", nickname: "Juan", position: "Base" },
  { id: 106, name: "Edwin Andrés Coloma Martínez", nickname: "Pupa", position: "Base" },
  { id: 107, name: "Volodymyr Bilous", nickname: "Vlad", position: "Pívot" },
  { id: 108, name: "Josué Macías García", nickname: "Josué", position: "Alero" },
];
