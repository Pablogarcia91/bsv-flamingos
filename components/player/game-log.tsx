"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GameLogRow {
  matchId: number;
  date: string;
  dateLabel: string;
  opponent: string;
  home: boolean;
  win: boolean;
  score: string;
  minutes: string;
  points: number;
  t2: number;
  t3: number;
  ft: string;
  fouls: number;
  plusMinus: number;
}

export function GameLog({ seasons }: { seasons: { id: string; label: string; rows: GameLogRow[] }[] }) {
  const [active, setActive] = useState(seasons[0]?.id);
  const current = seasons.find(s => s.id === active) ?? seasons[0];
  if (!current) return null;

  return (
    <div>
      {seasons.length > 1 && (
        <div role="tablist" aria-label="Temporada" className="inline-flex p-1 rounded-full bg-panel border border-line mb-5">
          {seasons.map(s => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === current.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-bold transition-colors",
                s.id === current.id ? "bg-white text-ink" : "text-white/70 hover:text-white"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-3xl border border-line bg-panel" role="tabpanel">
        <table className="w-full text-[15px] min-w-[720px]">
          <caption className="sr-only">Partidos de la temporada {current.label}</caption>
          <thead>
            <tr className="border-b border-line text-xs font-bold uppercase tracking-[0.14em] text-white/55">
              <th scope="col" className="px-5 py-4 text-left">Fecha</th>
              <th scope="col" className="px-3 py-4 text-left">Rival</th>
              <th scope="col" className="px-3 py-4 text-left">Resultado</th>
              <th scope="col" className="px-3 py-4 text-right">MIN</th>
              <th scope="col" className="px-3 py-4 text-right">PTS</th>
              <th scope="col" className="px-3 py-4 text-right">T2</th>
              <th scope="col" className="px-3 py-4 text-right">T3</th>
              <th scope="col" className="px-3 py-4 text-right">TL</th>
              <th scope="col" className="px-3 py-4 text-right">FAL</th>
              <th scope="col" className="px-5 py-4 text-right">+/-</th>
            </tr>
          </thead>
          <tbody>
            {current.rows.map(r => (
              <tr key={r.matchId} className="border-b border-line last:border-0 hover:bg-white/[0.03]">
                <td className="px-5 py-3 text-white/60 whitespace-nowrap">{r.dateLabel}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <Link href={`/partido/${r.matchId}`} className="font-bold hover:text-vice-pink">
                    <span className="text-white/45 font-normal mr-1">{r.home ? "vs" : "@"}</span>{r.opponent}
                  </Link>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={cn("mr-2", r.win ? "chip-win" : "chip-loss")}>{r.win ? "V" : "D"}</span>
                  <span className="text-white/70 tabular-nums">{r.score}</span>
                </td>
                <td className="px-3 py-3 text-right text-white/70 tabular-nums">{r.minutes}</td>
                <td className="px-3 py-3 text-right font-bold tabular-nums">{r.points}</td>
                <td className="px-3 py-3 text-right text-white/70 tabular-nums">{r.t2}</td>
                <td className="px-3 py-3 text-right text-white/70 tabular-nums">{r.t3}</td>
                <td className="px-3 py-3 text-right text-white/70 tabular-nums whitespace-nowrap">{r.ft}</td>
                <td className="px-3 py-3 text-right text-white/70 tabular-nums">{r.fouls}</td>
                <td className={cn("px-5 py-3 text-right font-bold tabular-nums", r.plusMinus > 0 ? "text-vice-blue" : r.plusMinus < 0 ? "text-vice-pink" : "text-white/60")}>
                  {r.plusMinus > 0 ? "+" : ""}{r.plusMinus}
                </td>
              </tr>
            ))}
            {current.rows.length === 0 && (
              <tr><td colSpan={10} className="px-5 py-10 text-center text-white/55">Todavía no ha jugado esta temporada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
