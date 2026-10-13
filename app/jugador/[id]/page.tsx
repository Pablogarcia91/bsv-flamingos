import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { currentSeason, getPerson, getPlayerCareer, people } from "@/lib/data";
import { fmtDate } from "@/lib/stats";
import { cn, dorsal } from "@/lib/utils";
import { Container, PillLink, PositionTag, SampleTag, SectionHeading, StatTile } from "@/components/site/ui";
import { GameLog, type GameLogRow } from "@/components/player/game-log";

export function generateStaticParams() {
  return people.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getPerson(Number(id));
  return { title: p ? `${p.nickname} · ${p.name}` : "Jugador" };
}

const avg = (v: number, g: number, d = 1) => (g ? (v / g).toFixed(d) : "—");
const pct = (m: number, a: number) => (a ? `${Math.round((m / a) * 100)}%` : "—");

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = getPerson(Number(id));
  if (!person) notFound();

  const career = getPlayerCareer(person.id);
  const latest = career[0];
  const number = latest?.player.number ?? null;
  // Dato principal: la temporada actual si está en la plantilla; si no, su última temporada
  const focus = latest;
  const ft = focus?.totals;

  const logs = career.map(c => ({
    id: c.season.id,
    label: c.season.label,
    rows: [...c.season.matches]
      .reverse()
      .flatMap((m): GameLogRow[] => {
        const s = m.stats.find(x => x.playerId === person.id);
        if (!s) return [];
        return [{
          matchId: m.id,
          date: m.date,
          dateLabel: fmtDate(m.date, { day: "numeric", month: "short" }),
          opponent: m.opponent,
          home: m.home,
          win: m.ourScore > m.oppScore,
          score: `${m.ourScore}–${m.oppScore}`,
          minutes: s.minutes,
          points: s.points,
          t2: s.t2Made,
          t3: s.t3Made,
          ft: `${s.ftMade}/${s.ftAttempted}`,
          fouls: s.fouls,
          plusMinus: s.plusMinus,
        }];
      }),
  }));

  const focusLog = logs.find(l => l.id === focus?.season.id);
  const best = focusLog?.rows.map(r => ({ ...r, season: focusLog.label })).sort((a, b) => b.points - a.points)[0];

  return (
    <>
      <section className="relative overflow-hidden hero-glow border-b border-line">
        <span
          className="pointer-events-none absolute -right-6 md:right-4 top-1/2 -translate-y-1/2 font-bebas text-[18rem] md:text-[30rem] leading-none text-white/[0.04] select-none"
          aria-hidden
        >
          {number ?? ""}
        </span>
        <Container className="relative py-12 md:py-20">
          <Link href={latest ? `/temporada/${latest.season.id}/plantilla` : "/plantilla"} className="text-sm font-bold text-white/55 hover:text-white">← Plantilla {latest?.season.label}</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-bebas text-3xl text-vice-pink leading-none mr-1">#{dorsal(number)}</span>
            <PositionTag position={person.position} />
          </div>
          <h1 className="display text-8xl md:text-[11rem] mt-3">{person.nickname}</h1>
          <p className="text-xl text-white/65 mt-1">{person.name}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {career.map(c => (
              <Link
                key={c.season.id}
                href={`/temporada/${c.season.id}`}
                className="h-8 px-3.5 rounded-full bg-white/[0.07] hover:bg-white/15 text-sm font-bold inline-flex items-center"
              >
                {c.season.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16 space-y-20">
        {focus && ft && (
          <section>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <h2 className="eyebrow">Promedios · Temporada {focus.season.label}</h2>
              {focus.season.sample && <SampleTag />}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <StatTile label="Puntos" value={avg(ft.points, ft.games)} hint="por partido" tone="pink" />
              <StatTile label="Minutos" value={avg(ft.totalMinutes, ft.games)} hint="por partido" />
              <StatTile label="Triples" value={ft.t3Made} hint={`${avg(ft.t3Made, ft.games)} por partido`} />
              <StatTile label="Tiros libres" value={pct(ft.ftMade, ft.ftAttempted)} hint={`${ft.ftMade}/${ft.ftAttempted}`} />
              <StatTile
                label="Más / menos"
                value={`${ft.plusMinus > 0 ? "+" : ""}${ft.plusMinus}`}
                hint={`${ft.games} partidos`}
                tone={ft.plusMinus >= 0 ? "blue" : "default"}
                className="col-span-2 md:col-span-1"
              />
            </div>
          </section>
        )}

        <section>
          <SectionHeading
            eyebrow="Trayectoria"
            title="Temporada a temporada"
            description={career.length > 1 ? "Sus números en cada temporada con los Flamingos." : "Su primera temporada con los Flamingos."}
          />
          <div className="overflow-x-auto rounded-3xl border border-line bg-panel">
            <table className="w-full text-[15px] min-w-[720px]">
              <caption className="sr-only">Estadísticas por temporada</caption>
              <thead>
                <tr className="border-b border-line text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                  <th scope="col" className="px-5 py-4 text-left">Temporada</th>
                  <th scope="col" className="px-3 py-4 text-right">Dorsal</th>
                  <th scope="col" className="px-3 py-4 text-right">PJ</th>
                  <th scope="col" className="px-3 py-4 text-right">MIN</th>
                  <th scope="col" className="px-3 py-4 text-right">PTS</th>
                  <th scope="col" className="px-3 py-4 text-right">PPP</th>
                  <th scope="col" className="px-3 py-4 text-right">T3</th>
                  <th scope="col" className="px-3 py-4 text-right">TL%</th>
                  <th scope="col" className="px-5 py-4 text-right">+/-</th>
                </tr>
              </thead>
              <tbody>
                {career.map(({ season, player, totals: t }) => (
                  <tr key={season.id} className="border-b border-line hover:bg-white/[0.03]">
                    <th scope="row" className="px-5 py-3 text-left">
                      <Link href={`/temporada/${season.id}/estadisticas`} className="font-bold hover:text-vice-pink">{season.label}</Link>
                      {season.id === currentSeason.id && <span className="ml-2 text-xs font-bold text-vice-blue uppercase">Actual</span>}
                    </th>
                    <td className="px-3 py-3 text-right text-white/70">#{dorsal(player.number)}</td>
                    <td className="px-3 py-3 text-right text-white/70 tabular-nums">{t.games}</td>
                    <td className="px-3 py-3 text-right text-white/70 tabular-nums">{avg(t.totalMinutes, t.games)}</td>
                    <td className="px-3 py-3 text-right font-bold tabular-nums">{t.points}</td>
                    <td className="px-3 py-3 text-right text-white/70 tabular-nums">{avg(t.points, t.games)}</td>
                    <td className="px-3 py-3 text-right text-white/70 tabular-nums">{t.t3Made}</td>
                    <td className="px-3 py-3 text-right text-white/70 tabular-nums">{pct(t.ftMade, t.ftAttempted)}</td>
                    <td className={cn("px-5 py-3 text-right font-bold tabular-nums", t.plusMinus > 0 ? "text-vice-blue" : t.plusMinus < 0 ? "text-vice-pink" : "")}>
                      {t.plusMinus > 0 ? "+" : ""}{t.plusMinus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {best && (
          <section className="rounded-4xl bg-vice-pink p-8 md:p-12 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-center">
            <div className="font-bebas text-[7rem] md:text-[9rem] leading-[0.8]">{best.points}</div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/75">Su mejor partido · {best.season}</p>
              <p className="display text-4xl md:text-5xl mt-2">
                {best.home ? "vs" : "@"} {best.opponent}
              </p>
              <p className="text-white/80 mt-1">
                {best.dateLabel} · {best.t3} triples · {best.minutes} min
              </p>
            </div>
            <PillLink href={`/partido/${best.matchId}`} variant="dark">Ver el partido</PillLink>
          </section>
        )}

        <section>
          <SectionHeading eyebrow="Partido a partido" title="Registro de partidos" />
          <GameLog seasons={logs} />
        </section>

        <div className="flex flex-wrap gap-3">
          <PillLink href={`/comparar?a=${person.id}`} variant="ghost">Compararlo con otro jugador</PillLink>
        </div>
      </Container>
    </>
  );
}
