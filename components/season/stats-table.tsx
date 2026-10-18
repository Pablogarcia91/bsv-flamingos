"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { PlayerTotals } from "@/lib/types";
import { cn, dorsal, playerHref } from "@/lib/utils";
import { PositionTag } from "@/components/site/ui";

type Row = PlayerTotals;
type Mode = "total" | "avg";
type Col = { key: string; label: string; title: string; get: (p: Row, mode: Mode) => number; fmt?: (v: number, p: Row) => string };

const per = (v: number, p: Row, mode: Mode) => (mode === "avg" && p.games ? v / p.games : v);
const num = (mode: Mode) => (v: number) => (mode === "avg" ? v.toFixed(1) : String(Math.round(v)));

function columns(mode: Mode): Col[] {
  return [
    { key: "games", label: "PJ", title: "Partidos jugados", get: p => p.games, fmt: v => String(v) },
    { key: "min", label: "MIN", title: "Minutos por partido", get: p => (p.games ? p.totalMinutes / p.games : 0), fmt: v => v.toFixed(1) },
    { key: "pts", label: "PTS", title: "Puntos", get: (p, m) => per(p.points, p, m), fmt: num(mode) },
    { key: "t2", label: "T2", title: "Tiros de 2 anotados", get: (p, m) => per(p.t2Made, p, m), fmt: num(mode) },
    { key: "t3", label: "T3", title: "Triples anotados", get: (p, m) => per(p.t3Made, p, m), fmt: num(mode) },
    {
      key: "ft", label: "TL", title: "Tiros libres (anotados/intentados y %)",
      get: p => (p.ftAttempted ? p.ftMade / p.ftAttempted : -1),
      fmt: (_, p) => (p.ftAttempted ? `${p.ftMade}/${p.ftAttempted} · ${Math.round((p.ftMade / p.ftAttempted) * 100)}%` : "—"),
    },
    { key: "pf", label: "FAL", title: "Faltas personales", get: (p, m) => per(p.fouls, p, m), fmt: num(mode) },
    {
      key: "pm", label: "+/-", title: "Más/menos", get: (p, m) => per(p.plusMinus, p, m),
      fmt: v => `${v > 0 ? "+" : ""}${mode === "avg" ? v.toFixed(1) : v}`,
    },
  ];
}

const POSITIONS = ["Todos", "Base", "Alero", "Pívot"] as const;

export function StatsTable({ rows, seasonId }: { rows: Row[]; seasonId?: string }) {
  const [mode, setMode] = useState<Mode>("avg");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "pts", dir: "desc" });
  const [pos, setPos] = useState<(typeof POSITIONS)[number]>("Todos");

  const cols = useMemo(() => columns(mode), [mode]);

  const sorted = useMemo(() => {
    const col = cols.find(c => c.key === sort.key) ?? cols[2];
    return rows
      .filter(r => r.games > 0 && (pos === "Todos" || r.position === pos))
      .sort((a, b) => {
        const d = col.get(a, mode) - col.get(b, mode);
        return sort.dir === "desc" ? -d : d;
      });
  }, [rows, cols, sort, pos, mode]);

  const onSort = (key: string) =>
    setSort(s => (s.key === key ? { key, dir: s.dir === "desc" ? "asc" : "desc" } : { key, dir: "desc" }));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div role="radiogroup" aria-label="Tipo de estadística" className="inline-flex p-1 rounded-full bg-panel border border-line">
          {([["avg", "Por partido"], ["total", "Totales"]] as const).map(([m, label]) => (
            <button
              key={m}
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-bold transition-colors",
                mode === m ? "bg-white text-ink" : "text-white/70 hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {POSITIONS.map(p => (
            <button
              key={p}
              onClick={() => setPos(p)}
              aria-pressed={pos === p}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-bold border transition-colors",
                pos === p ? "bg-vice-pink border-vice-pink text-white" : "border-white/15 text-white/70 hover:text-white hover:border-white/40"
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-white/50">{sorted.length} jugadores</span>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-line bg-panel">
        <table className="w-max min-w-full text-[15px] border-collapse">
          <caption className="sr-only">Estadísticas de jugadores</caption>
          <thead>
            <tr className="border-b border-line text-left">
              <th scope="col" className="sticky-col pl-4 pr-3 md:px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                Jugador
              </th>
              {cols.map(c => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={sort.key === c.key ? (sort.dir === "desc" ? "descending" : "ascending") : undefined}
                  className="px-3 py-4 text-right"
                >
                  <button
                    onClick={() => onSort(c.key)}
                    title={c.title}
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] transition-colors",
                      sort.key === c.key ? "text-vice-pink" : "text-white/55 hover:text-white"
                    )}
                  >
                    {c.label}
                    {sort.key === c.key && (sort.dir === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.id} className="group border-b border-line last:border-0 hover:bg-white/[0.03]">
                <th scope="row" className="sticky-col group-hover:bg-[#19191c] pl-4 pr-3 md:px-5 py-3 text-left font-normal">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="w-4 md:w-5 text-sm text-white/35 tabular-nums">{i + 1}</span>
                    <Link href={playerHref(p.id, seasonId)} className="font-bold hover:text-vice-pink transition-colors whitespace-nowrap">
                      {p.nickname} <span className="text-vice-pink/80 font-semibold">#{dorsal(p.number)}</span>
                    </Link>
                    <PositionTag position={p.position} className="hidden md:inline-flex" />
                  </div>
                </th>
                {cols.map(c => {
                  const v = c.get(p, mode);
                  return (
                    <td
                      key={c.key}
                      className={cn(
                        "px-3 py-3 text-right tabular-nums whitespace-nowrap",
                        c.key === "pts" ? "font-bold text-white" : "text-white/75",
                        c.key === "pm" && (v > 0 ? "text-vice-blue font-bold" : v < 0 ? "text-vice-pink font-bold" : ""),
                        sort.key === c.key && "bg-white/[0.03]"
                      )}
                    >
                      {c.fmt ? c.fmt(v, p) : v}
                    </td>
                  );
                })}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={cols.length + 1} className="px-5 py-12 text-center text-white/55">
                  Sin estadísticas todavía: aparecerán tras el primer partido.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
