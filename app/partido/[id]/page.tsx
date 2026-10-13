import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMatches, getMatch, getSeasonPlayers } from "@/lib/data";
import { fmtDate } from "@/lib/stats";
import { cn, dorsal } from "@/lib/utils";
import { Container, PositionTag, SampleTag, SectionHeading } from "@/components/site/ui";

export function generateStaticParams() {
  return getAllMatches().map(m => ({ id: String(m.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const found = getMatch(Number(id));
  return { title: found ? `${found.match.home ? "vs" : "@"} ${found.match.opponent}` : "Partido" };
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = getMatch(Number(id));
  if (!found) notFound();
  const { match, season } = found;

  const win = match.ourScore > match.oppScore;
  const players = new Map(getSeasonPlayers(season).map(p => [p.id, p]));
  const box = [...match.stats].sort((a, b) => b.points - a.points);
  const top = box[0] ? players.get(box[0].playerId) : undefined;

  const ordered = season.matches;
  const idx = ordered.findIndex(m => m.id === match.id);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];

  const teamT3 = box.reduce((s, x) => s + x.t3Made, 0);
  const teamFtM = box.reduce((s, x) => s + x.ftMade, 0);
  const teamFtA = box.reduce((s, x) => s + x.ftAttempted, 0);

  return (
    <>
      <section className={cn("border-b border-line", win ? "bg-vice-blue text-ink" : "bg-vice-pink text-white")}>
        <Container className="py-10 md:py-16">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <Link href={`/temporada/${season.id}/partidos`} className="opacity-70 hover:opacity-100">← Temporada {season.label}</Link>
            {season.sample && <SampleTag className="bg-black/20 text-current" />}
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] opacity-75">
            {fmtDate(match.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {match.home ? "Local" : "Visitante"}
          </p>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-4 md:gap-10">
            <div>
              <div className="display text-3xl md:text-5xl">BSV Flamingos</div>
              <div className="font-bebas text-[6rem] md:text-[11rem] leading-[0.8]">{match.ourScore}</div>
            </div>
            <div className="display text-5xl md:text-7xl opacity-50 pb-4">–</div>
            <div className="text-right">
              <div className="display text-3xl md:text-5xl truncate">{match.opponent}</div>
              <div className="font-bebas text-[6rem] md:text-[11rem] leading-[0.8] opacity-70">{match.oppScore}</div>
            </div>
          </div>
          <p className="mt-6 display text-4xl">{win ? "Victoria" : "Derrota"} por {Math.abs(match.ourScore - match.oppScore)}</p>
        </Container>
      </section>

      <Container className="py-12 md:py-16 space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="card px-5 py-4">
            <div className="eyebrow">Máximo anotador</div>
            <div className="font-bebas text-4xl mt-2 leading-none">{top?.nickname ?? "—"}</div>
            <div className="text-sm text-white/55">{box[0]?.points ?? 0} puntos</div>
          </div>
          <div className="card px-5 py-4">
            <div className="eyebrow">Triples</div>
            <div className="font-bebas text-4xl mt-2 leading-none">{teamT3}</div>
            <div className="text-sm text-white/55">{teamT3 * 3} puntos</div>
          </div>
          <div className="card px-5 py-4">
            <div className="eyebrow">Tiros libres</div>
            <div className="font-bebas text-4xl mt-2 leading-none">{teamFtA ? Math.round((teamFtM / teamFtA) * 100) : 0}%</div>
            <div className="text-sm text-white/55">{teamFtM}/{teamFtA}</div>
          </div>
          <div className="card px-5 py-4">
            <div className="eyebrow">Jugadores</div>
            <div className="font-bebas text-4xl mt-2 leading-none">{box.filter(b => b.minutes !== "00:00").length}</div>
            <div className="text-sm text-white/55">con minutos</div>
          </div>
        </div>

        <section>
          <SectionHeading eyebrow="Acta" title="Estadísticas del partido" />
          {box.length === 0 ? (
            <p className="text-white/60">No hay estadísticas individuales de este partido.</p>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-line bg-panel">
              <table className="w-full text-[15px] min-w-[720px]">
                <caption className="sr-only">Estadísticas individuales</caption>
                <thead>
                  <tr className="border-b border-line text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                    <th scope="col" className="px-5 py-4 text-left">Jugador</th>
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
                  {box.map(s => {
                    const p = players.get(s.playerId);
                    return (
                      <tr key={s.playerId} className="border-b border-line last:border-0 hover:bg-white/[0.03]">
                        <th scope="row" className="px-5 py-3 text-left font-normal">
                          <div className="flex items-center gap-3">
                            <Link href={`/jugador/${s.playerId}`} className="font-bold hover:text-vice-pink whitespace-nowrap">
                              {p?.nickname ?? `#${s.playerId}`} <span className="text-vice-pink/80">#{dorsal(p?.number)}</span>
                            </Link>
                            {p && <PositionTag position={p.position} className="hidden md:inline-flex" />}
                          </div>
                        </th>
                        <td className="px-3 py-3 text-right text-white/70 tabular-nums">{s.minutes}</td>
                        <td className="px-3 py-3 text-right font-bold tabular-nums">{s.points}</td>
                        <td className="px-3 py-3 text-right text-white/70 tabular-nums">{s.t2Made}</td>
                        <td className="px-3 py-3 text-right text-white/70 tabular-nums">{s.t3Made}</td>
                        <td className="px-3 py-3 text-right text-white/70 tabular-nums">{s.ftMade}/{s.ftAttempted}</td>
                        <td className="px-3 py-3 text-right text-white/70 tabular-nums">{s.fouls}</td>
                        <td className={cn("px-5 py-3 text-right font-bold tabular-nums", s.plusMinus > 0 ? "text-vice-blue" : s.plusMinus < 0 ? "text-vice-pink" : "text-white/60")}>
                          {s.plusMinus > 0 ? "+" : ""}{s.plusMinus}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <nav aria-label="Otros partidos" className="grid sm:grid-cols-2 gap-3">
          {prev ? (
            <Link href={`/partido/${prev.id}`} className="card p-5 hover:border-white/25">
              <div className="eyebrow">← Anterior</div>
              <div className="font-bold text-lg mt-1">{prev.home ? "vs" : "@"} {prev.opponent} · {prev.ourScore}–{prev.oppScore}</div>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/partido/${next.id}`} className="card p-5 text-right hover:border-white/25">
              <div className="eyebrow">Siguiente →</div>
              <div className="font-bold text-lg mt-1">{next.home ? "vs" : "@"} {next.opponent} · {next.ourScore}–{next.oppScore}</div>
            </Link>
          )}
        </nav>
      </Container>
    </>
  );
}
