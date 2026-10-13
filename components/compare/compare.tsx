"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Position } from "@/lib/types";
import { cn, dorsal } from "@/lib/utils";
import { PositionTag } from "@/components/site/ui";

export interface CompareStats {
  games: number;
  ppg: number;
  mpg: number;
  t3: number;
  t2: number;
  ftPct: number;
  fpg: number;
  plusMinus: number;
}

export interface ComparePlayer {
  id: number;
  nickname: string;
  name: string;
  position: Position;
  numbers: Record<string, number | null>;
  stats: Record<string, CompareStats | undefined>;
}

const ROWS: { key: keyof CompareStats; label: string; fmt: (v: number) => string; lowerIsBetter?: boolean }[] = [
  { key: "games", label: "Partidos", fmt: v => String(v) },
  { key: "ppg", label: "Puntos / p.", fmt: v => v.toFixed(1) },
  { key: "mpg", label: "Minutos / p.", fmt: v => v.toFixed(1) },
  { key: "t2", label: "Tiros de 2", fmt: v => String(v) },
  { key: "t3", label: "Triples", fmt: v => String(v) },
  { key: "ftPct", label: "TL %", fmt: v => (v < 0 ? "—" : `${Math.round(v * 100)}%`) },
  { key: "fpg", label: "Faltas / p.", fmt: v => v.toFixed(1), lowerIsBetter: true },
  { key: "plusMinus", label: "+/-", fmt: v => `${v > 0 ? "+" : ""}${v}` },
];

function Picker({ value, onChange, players, scope, label, accent }: { value: number; onChange: (id: number) => void; players: ComparePlayer[]; scope: string; label: string; accent: "pink" | "blue" }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={cn(
          "appearance-none w-full h-14 pl-5 pr-12 rounded-full bg-panel border-2 font-bold text-lg cursor-pointer",
          accent === "pink" ? "border-vice-pink" : "border-vice-blue"
        )}
      >
        {players.map(p => <option key={p.id} value={p.id}>{p.nickname} · #{dorsal(p.numbers[scope])}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" aria-hidden />
    </label>
  );
}

export function Compare({ players, scopes }: { players: ComparePlayer[]; scopes: { id: string; label: string }[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [scope, setScope] = useState(scopes[0].id);

  // Solo jugadores de la plantilla de la temporada elegida
  const inScope = useMemo(() => players.filter(p => scope in p.numbers), [players, scope]);
  const pick = (id: number | undefined, exclude?: number) =>
    inScope.find(p => p.id === id)?.id ?? inScope.find(p => p.id !== exclude)?.id ?? inScope[0].id;

  const [a, setA] = useState(() => pick(Number(params.get("a")) || undefined));
  const [b, setB] = useState(() => pick(undefined, a));

  // Si un jugador no estaba en la temporada elegida, se sustituye por otro de esa plantilla
  const aId = pick(a);
  const bId = pick(b, aId);
  const pa = inScope.find(p => p.id === aId)!;
  const pb = inScope.find(p => p.id === bId)!;
  const sa = pa.stats[scope];
  const sb = pb.stats[scope];

  const setAndSync = (which: "a" | "b", id: number) => {
    if (which === "a") {
      setA(id);
      router.replace(`/comparar?a=${id}`, { scroll: false });
    } else setB(id);
  };

  return (
    <div className="space-y-8">
      <div role="radiogroup" aria-label="Periodo" className="inline-flex flex-wrap p-1 rounded-full bg-panel border border-line">
        {scopes.map(s => (
          <button
            key={s.id}
            role="radio"
            aria-checked={scope === s.id}
            onClick={() => setScope(s.id)}
            className={cn("h-10 px-5 rounded-full text-sm font-bold transition-colors", scope === s.id ? "bg-white text-ink" : "text-white/70 hover:text-white")}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <Picker value={aId} onChange={id => setAndSync("a", id)} players={inScope} scope={scope} label="Jugador A" accent="pink" />
        <span className="display text-4xl text-center text-white/40">vs</span>
        <Picker value={bId} onChange={id => setAndSync("b", id)} players={inScope} scope={scope} label="Jugador B" accent="blue" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[{ p: pa, tone: "text-vice-pink" }, { p: pb, tone: "text-vice-blue text-right" }].map(({ p, tone }, i) => (
          <Link key={i} href={`/jugador/${p.id}`} className={cn("card p-6 md:p-8 hover:border-white/25", i === 1 && "text-right")}>
            <div className={cn("font-bebas text-5xl leading-none", tone)}>#{dorsal(p.numbers[scope])}</div>
            <div className="display text-5xl md:text-7xl mt-2">{p.nickname}</div>
            <div className={cn("mt-3 flex", i === 1 && "justify-end")}><PositionTag position={p.position} /></div>
          </Link>
        ))}
      </div>

      <div className="card p-4 md:p-8">
        {ROWS.map(r => {
          const va = sa?.[r.key];
          const vb = sb?.[r.key];
          const has = va !== undefined && vb !== undefined;
          const max = has ? Math.max(Math.abs(va), Math.abs(vb)) || 1 : 1;
          const aWins = has && (r.lowerIsBetter ? va < vb : va > vb);
          const bWins = has && (r.lowerIsBetter ? vb < va : vb > va);
          return (
            <div key={r.key} className="grid grid-cols-[1fr_6.5rem_1fr] md:grid-cols-[1fr_9rem_1fr] items-center gap-3 py-4 border-b border-line last:border-0">
              <div className="flex flex-col items-end gap-1.5">
                <span className={cn("font-bebas text-3xl md:text-4xl leading-none", aWins ? "text-vice-pink" : "text-white/50")}>{va !== undefined ? r.fmt(va) : "—"}</span>
                <span className="w-full h-1.5 rounded-full bg-white/[0.06] flex justify-end overflow-hidden">
                  <span className={cn("h-full rounded-full", aWins ? "bg-vice-pink" : "bg-white/20")} style={{ width: `${has ? (Math.abs(va) / max) * 100 : 0}%` }} />
                </span>
              </div>
              <span className="text-center text-xs font-bold uppercase tracking-[0.14em] text-white/55">{r.label}</span>
              <div className="flex flex-col items-start gap-1.5">
                <span className={cn("font-bebas text-3xl md:text-4xl leading-none", bWins ? "text-vice-blue" : "text-white/50")}>{vb !== undefined ? r.fmt(vb) : "—"}</span>
                <span className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <span className={cn("block h-full rounded-full", bWins ? "bg-vice-blue" : "bg-white/20")} style={{ width: `${has ? (Math.abs(vb) / max) * 100 : 0}%` }} />
                </span>
              </div>
            </div>
          );
        })}
        {(!sa || !sb) && (
          <p className="text-center text-white/55 pt-4">
            {!sa ? pa.nickname : pb.nickname} todavía no ha jugado esta temporada.
          </p>
        )}
      </div>
    </div>
  );
}
