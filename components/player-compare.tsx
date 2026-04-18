"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Player, Match, PlayerTotals } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { PositionBadge } from "./position-badge";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface PlayerCompareProps {
  players: Player[];
  matches: Match[];
}

const EMPTY = "—";

function fmt(val: number, decimals = 1) {
  return val === 0 ? EMPTY : val.toFixed(decimals);
}

function pct(made: number, attempted: number) {
  if (attempted === 0) return EMPTY;
  return Math.round((made / attempted) * 100) + "%";
}

interface StatRowProps {
  label: string;
  leftVal: string;
  rightVal: string;
  leftNum: number;
  rightNum: number;
  highlight?: "high" | "low";
}

function StatRow({ label, leftVal, rightVal, leftNum, rightNum, highlight = "high" }: StatRowProps) {
  const max = Math.max(leftNum, rightNum);
  const leftPct = max > 0 ? (leftNum / max) * 100 : 0;
  const rightPct = max > 0 ? (rightNum / max) * 100 : 0;

  const leftWins = highlight === "high" ? leftNum > rightNum : leftNum < rightNum;
  const rightWins = highlight === "high" ? rightNum > leftNum : rightNum < leftNum;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-3 border-b border-white/5 last:border-0">
      {/* Left side */}
      <div className="flex flex-col items-end gap-1">
        <span className={cn(
          "font-bebas text-xl md:text-2xl leading-none",
          leftWins ? "text-vice-pink" : "text-white/60"
        )}>
          {leftVal}
        </span>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex justify-end">
          <div
            className={cn("h-full rounded-full transition-all duration-500", leftWins ? "bg-vice-pink" : "bg-white/25")}
            style={{ width: `${leftPct}%` }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="text-[10px] md:text-xs text-white/60 uppercase tracking-widest text-center w-16 md:w-20 shrink-0">
        {label}
      </div>

      {/* Right side */}
      <div className="flex flex-col items-start gap-1">
        <span className={cn(
          "font-bebas text-xl md:text-2xl leading-none",
          rightWins ? "text-vice-blue" : "text-white/60"
        )}>
          {rightVal}
        </span>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", rightWins ? "bg-vice-blue" : "bg-white/25")}
            style={{ width: `${rightPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PlayerCard({
  label,
  color,
  selected,
  totals,
  players,
  onChange,
}: {
  label: string;
  color: "pink" | "blue";
  selected: PlayerTotals | null;
  totals: PlayerTotals[];
  players: Player[];
  onChange: (id: number | null) => void;
}) {
  const isPink = color === "pink";

  return (
    <div className={cn(
      "flex-1 bg-vice-dark border rounded-xl overflow-hidden",
      isPink ? "border-vice-pink/40" : "border-vice-blue/40"
    )}>
      {/* Header */}
      <div className={cn(
        "px-4 py-3 border-b",
        isPink ? "border-vice-pink/20 bg-vice-pink/5" : "border-vice-blue/20 bg-vice-blue/5"
      )}>
        <span className={cn(
          "text-[10px] uppercase tracking-widest font-semibold",
          isPink ? "text-vice-pink" : "text-vice-blue"
        )}>
          {label}
        </span>
      </div>

      {/* Selector */}
      <div className="px-4 py-3">
        <div className="relative">
          <select
            className="w-full appearance-none bg-white/5 border border-white/15 rounded-lg pl-3 pr-9 py-2 text-sm text-white focus:outline-none focus:border-vice-pink/60 cursor-pointer"
            value={selected?.id ?? ""}
            onChange={e => onChange(e.target.value === "" ? null : Number(e.target.value))}
          >
          <option value="" className="bg-[#1a1a1a]">Seleccionar</option>
          {totals
            .filter(p => p.games > 0)
            .sort((a, b) => a.nickname.localeCompare(b.nickname))
            .map(p => (
              <option key={p.id} value={p.id} className="bg-[#1a1a1a]">
                #{p.number} {p.nickname}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Selected player info */}
      {selected ? (
        <div className="px-4 pb-4 flex items-center gap-3">
          <div className={cn("font-bebas text-4xl leading-none", isPink ? "text-vice-pink" : "text-vice-blue")}>
            #{selected.number}
          </div>
          <div className="min-w-0">
            <Link
              href={`/jugador/${selected.id}`}
              className={cn("font-bold text-sm hover:underline truncate block", isPink ? "text-vice-pink" : "text-vice-blue")}
            >
              {selected.nickname}
            </Link>
            <div className="flex items-center gap-2 mt-0.5">
              <PositionBadge position={selected.position} />
              <span className="text-white/50 text-xs">{selected.games} PJ</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-4 text-white/30 text-xs italic">Sin jugador seleccionado</div>
      )}
    </div>
  );
}

export function PlayerCompare({ players, matches }: PlayerCompareProps) {
  const allTotals = useMemo(() => calculatePlayerTotals(players, matches), [players, matches]);

  const [leftId, setLeftId] = useState<number | null>(null);
  const [rightId, setRightId] = useState<number | null>(null);

  const left = leftId != null ? allTotals.find(p => p.id === leftId) ?? null : null;
  const right = rightId != null ? allTotals.find(p => p.id === rightId) ?? null : null;

  const stats = useMemo(() => {
    if (!left || !right) return null;

    const lg = left.games;
    const rg = right.games;

    return [
      {
        label: "PPP",
        lv: lg > 0 ? (left.points / lg).toFixed(1) : EMPTY,
        rv: rg > 0 ? (right.points / rg).toFixed(1) : EMPTY,
        ln: lg > 0 ? left.points / lg : 0,
        rn: rg > 0 ? right.points / rg : 0,
      },
      {
        label: "PTS tot.",
        lv: String(left.points),
        rv: String(right.points),
        ln: left.points,
        rn: right.points,
      },
      {
        label: "MIN/PJ",
        lv: lg > 0 ? (left.totalMinutes / lg).toFixed(1) : EMPTY,
        rv: rg > 0 ? (right.totalMinutes / rg).toFixed(1) : EMPTY,
        ln: lg > 0 ? left.totalMinutes / lg : 0,
        rn: rg > 0 ? right.totalMinutes / rg : 0,
      },
      {
        label: "T2",
        lv: String(left.t2Made),
        rv: String(right.t2Made),
        ln: left.t2Made,
        rn: right.t2Made,
      },
      {
        label: "T3",
        lv: String(left.t3Made),
        rv: String(right.t3Made),
        ln: left.t3Made,
        rn: right.t3Made,
      },
      {
        label: "% TL",
        lv: pct(left.ftMade, left.ftAttempted),
        rv: pct(right.ftMade, right.ftAttempted),
        ln: left.ftAttempted > 0 ? left.ftMade / left.ftAttempted : 0,
        rn: right.ftAttempted > 0 ? right.ftMade / right.ftAttempted : 0,
      },
      {
        label: "Fal/PJ",
        lv: lg > 0 ? (left.fouls / lg).toFixed(1) : EMPTY,
        rv: rg > 0 ? (right.fouls / rg).toFixed(1) : EMPTY,
        ln: lg > 0 ? left.fouls / lg : 0,
        rn: rg > 0 ? right.fouls / rg : 0,
        highlight: "low" as const,
      },
      {
        label: "+/-",
        lv: left.plusMinus > 0 ? `+${left.plusMinus}` : String(left.plusMinus),
        rv: right.plusMinus > 0 ? `+${right.plusMinus}` : String(right.plusMinus),
        ln: left.plusMinus,
        rn: right.plusMinus,
      },
    ];
  }, [left, right]);

  return (
    <div className="animate-neon-fade-in space-y-6">
      <h1 className="font-bebas text-3xl md:text-4xl tracking-wider text-white">
        Comparar Jugadores
      </h1>

      {/* Player selectors */}
      <div className="flex gap-3 md:gap-4">
        <PlayerCard
          label="Jugador A"
          color="pink"
          selected={left}
          totals={allTotals}
          players={players}
          onChange={setLeftId}
        />
        <div className="flex items-center justify-center shrink-0 font-bebas text-xl text-white/30 pt-10">
          VS
        </div>
        <PlayerCard
          label="Jugador B"
          color="blue"
          selected={right}
          totals={allTotals}
          players={players}
          onChange={setRightId}
        />
      </div>

      {/* Comparison */}
      {stats ? (
        <div className="bg-vice-dark border border-white/10 rounded-xl px-4 md:px-6 py-2">
          {stats.map((s) => (
            <StatRow
              key={s.label}
              label={s.label}
              leftVal={s.lv}
              rightVal={s.rv}
              leftNum={s.ln}
              rightNum={s.rn}
              highlight={s.highlight ?? "high"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-14 text-white/30 text-sm border border-dashed border-white/10 rounded-xl">
          Selecciona dos jugadores para ver la comparativa
        </div>
      )}
    </div>
  );
}
