"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillLink, SampleTag, StatTile } from "@/components/site/ui";

export interface GameLogRow {
  matchId: number;
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

export interface PlayerSeasonData {
  id: string;
  label: string;
  current: boolean;
  sample?: boolean;
  number: string;
  games: number;
  points: number;
  minutes: number;
  t3: number;
  ftMade: number;
  ftAttempted: number;
  plusMinus: number;
  rows: GameLogRow[];
}

const avg = (v: number, g: number) => (g ? (v / g).toFixed(1) : "—");
const pct = (m: number, a: number) => (a ? `${Math.round((m / a) * 100)}%` : "—");
const signed = (v: number) => `${v > 0 ? "+" : ""}${v}`;
const hashFor = (id: string) => `#t-${id}`;

/**
 * Datos del jugador temporada a temporada. Elegir una temporada (arriba o en la
 * tabla) cambia promedios, mejor partido y registro de partidos de ESTE jugador.
 */
export function PlayerSeasons({ seasons, playerId }: { seasons: PlayerSeasonData[]; playerId: number }) {
  const [active, setActive] = useState(seasons[0]?.id);
  const topRef = useRef<HTMLDivElement>(null);

  // Permite enlazar a una temporada concreta: /jugador/6#t-2025-26
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace("#t-", "");
      if (seasons.some(s => s.id === id)) setActive(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [seasons]);

  const select = (id: string, scroll = false) => {
    setActive(id);
    history.replaceState(null, "", hashFor(id));
    if (scroll) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const s = seasons.find(x => x.id === active) ?? seasons[0];
  if (!s) return null;
  const best = [...s.rows].sort((a, b) => b.points - a.points)[0];

  return (
    <div className="space-y-10 md:space-y-16">
      {/* Selector de temporada + promedios */}
      <section ref={topRef} className="scroll-mt-24">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 md:mb-6">
          {seasons.length > 1 ? (
            <div role="tablist" aria-label="Temporada" className="inline-flex p-1 rounded-full bg-panel border border-line">
              {seasons.map(x => (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={x.id === s.id}
                  onClick={() => select(x.id)}
                  className={cn(
                    "h-8 md:h-9 px-3.5 md:px-4 rounded-full text-sm font-bold transition-colors",
                    x.id === s.id ? "bg-white text-ink" : "text-white/70 hover:text-white"
                  )}
                >
                  {x.label}
                </button>
              ))}
            </div>
          ) : (
            <h2 className="eyebrow">Temporada {s.label}</h2>
          )}
          <div className="flex items-center gap-2 text-sm text-white/55">
            {s.sample && <SampleTag />}
            <span>Dorsal <span className="text-vice-pink font-bold">#{s.number}</span></span>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          <StatTile label="Puntos" value={avg(s.points, s.games)} hint="por partido" tone="pink" />
          <StatTile label="Minutos" value={avg(s.minutes, s.games)} hint="por partido" />
          <StatTile label="Partidos" value={s.games} hint={`${s.points} pts total`} />
          <StatTile label="Triples" value={s.t3} hint={`${avg(s.t3, s.games)} por partido`} />
          <StatTile label="Tiros libres" value={pct(s.ftMade, s.ftAttempted)} hint={`${s.ftMade}/${s.ftAttempted}`} />
          <StatTile label="+/-" value={signed(s.plusMinus)} hint="acumulado" tone={s.plusMinus >= 0 ? "blue" : "default"} />
        </div>
      </section>

      {/* Mejor partido de esa temporada */}
      {best && (
        <section className="rounded-3xl md:rounded-4xl bg-vice-pink px-5 py-5 md:p-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="font-bebas text-[4.5rem] md:text-[8rem] leading-[0.8]">{best.points}</div>
          <div className="flex-1 min-w-[10rem]">
            <p className="text-[10px] md:text-sm font-bold uppercase tracking-[0.16em] text-white/75">Mejor partido · {s.label}</p>
            <p className="display text-2xl md:text-5xl mt-1">{best.home ? "vs" : "@"} {best.opponent}</p>
            <p className="text-sm md:text-base text-white/80">{best.dateLabel} · {best.t3} triples · {best.minutes} min</p>
          </div>
          <PillLink href={`/partido/${best.matchId}`} variant="dark" size="sm" className="md:h-11 md:px-6">Ver partido</PillLink>
        </section>
      )}

      {/* Registro de partidos de esa temporada */}
      <section>
        <h2 className="display text-[2.25rem] sm:text-5xl md:text-6xl mb-4 md:mb-6">Partidos {s.label}</h2>
        {s.rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-white/55">Todavía no ha jugado esta temporada.</p>
        ) : (
          <>
            {/* Móvil: lista compacta */}
            <ul className="md:hidden card !rounded-2xl divide-y divide-line overflow-hidden">
              {s.rows.map(r => (
                <li key={r.matchId}>
                  <Link href={`/partido/${r.matchId}`} className="grid grid-cols-[1fr_auto] gap-x-3 px-4 py-3 hover:bg-white/[0.03]">
                    <span className="min-w-0 font-bold truncate">
                      <span className="text-white/45 font-semibold mr-1">{r.home ? "vs" : "@"}</span>{r.opponent}
                    </span>
                    <span className="font-bebas text-2xl leading-none row-span-2 self-center text-right">
                      {r.points}<span className="text-xs font-rajdhani font-bold text-white/45 ml-1">PTS</span>
                    </span>
                    <span className="text-xs text-white/50">
                      {r.dateLabel} · <span className={r.win ? "text-vice-blue" : "text-vice-pink"}>{r.win ? "V" : "D"} {r.score}</span> · {r.minutes} min · T3 {r.t3} · {signed(r.plusMinus)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Escritorio: tabla completa */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-panel">
              <table className="w-full text-[15px]">
                <caption className="sr-only">Partidos de la temporada {s.label}</caption>
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
                  {s.rows.map(r => (
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
                        {signed(r.plusMinus)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* Temporada a temporada: cada fila abre esa temporada del jugador */}
      {seasons.length > 1 && (
        <section>
          <h2 className="display text-[2.25rem] sm:text-5xl md:text-6xl">Temporada a temporada</h2>
          <p className="mt-1 mb-4 md:mb-6 text-sm md:text-base text-white/55">Pulsa una temporada para ver sus números.</p>
          <div className="card !rounded-2xl md:!rounded-3xl overflow-hidden">
            <div className="grid grid-cols-[1fr_repeat(4,3.25rem)] md:grid-cols-[1fr_repeat(6,5rem)] px-4 md:px-5 py-3 border-b border-line text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] text-white/50">
              <span>Temporada</span>
              <span className="text-right">PJ</span>
              <span className="text-right">PPP</span>
              <span className="text-right hidden md:block">MIN</span>
              <span className="text-right">T3</span>
              <span className="text-right hidden md:block">TL%</span>
              <span className="text-right">+/-</span>
            </div>
            {seasons.map(x => (
              <button
                key={x.id}
                onClick={() => select(x.id, true)}
                aria-pressed={x.id === s.id}
                className={cn(
                  "w-full grid grid-cols-[1fr_repeat(4,3.25rem)] md:grid-cols-[1fr_repeat(6,5rem)] items-center px-4 md:px-5 py-3 text-left text-sm md:text-[15px] border-b border-line last:border-0 transition-colors tabular-nums",
                  x.id === s.id ? "bg-vice-pink/10" : "hover:bg-white/[0.04]"
                )}
              >
                <span className="font-bold">
                  {x.label}
                  {x.current && <span className="ml-2 text-[10px] font-bold text-vice-blue uppercase">Actual</span>}
                </span>
                <span className="text-right text-white/70">{x.games}</span>
                <span className="text-right font-bold">{avg(x.points, x.games)}</span>
                <span className="text-right text-white/70 hidden md:block">{avg(x.minutes, x.games)}</span>
                <span className="text-right text-white/70">{x.t3}</span>
                <span className="text-right text-white/70 hidden md:block">{pct(x.ftMade, x.ftAttempted)}</span>
                <span className={cn("text-right font-bold", x.plusMinus > 0 ? "text-vice-blue" : x.plusMinus < 0 ? "text-vice-pink" : "text-white/60")}>
                  {signed(x.plusMinus)}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <PillLink href={`/comparar?a=${playerId}`} variant="ghost" size="sm" className="md:h-11 md:px-6">Compararlo con otro jugador</PillLink>
    </div>
  );
}
