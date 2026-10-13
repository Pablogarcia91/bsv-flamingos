import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { currentSeason, getPerson, getPlayerCareer, people } from "@/lib/data";
import { fmtDate } from "@/lib/stats";
import { dorsal } from "@/lib/utils";
import { Container, PositionTag } from "@/components/site/ui";
import { PlayerSeasons, type GameLogRow, type PlayerSeasonData } from "@/components/player/player-seasons";

export function generateStaticParams() {
  return people.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getPerson(Number(id));
  return { title: p ? `${p.nickname} · ${p.name}` : "Jugador" };
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = getPerson(Number(id));
  if (!person) notFound();

  // Más reciente primero: si está en la temporada actual, es la que se ve al entrar
  const career = getPlayerCareer(person.id);
  const latest = career[0];
  const number = latest?.player.number ?? null;

  const seasons: PlayerSeasonData[] = career.map(({ season, player, totals: t }) => ({
    id: season.id,
    label: season.label,
    current: season.id === currentSeason.id,
    sample: season.sample,
    number: dorsal(player.number),
    games: t.games,
    points: t.points,
    minutes: t.totalMinutes,
    t3: t.t3Made,
    ftMade: t.ftMade,
    ftAttempted: t.ftAttempted,
    plusMinus: t.plusMinus,
    rows: [...season.matches].reverse().flatMap((m): GameLogRow[] => {
      const s = m.stats.find(x => x.playerId === person.id);
      if (!s) return [];
      return [{
        matchId: m.id,
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

  return (
    <>
      <section className="relative overflow-hidden hero-glow border-b border-line">
        <span
          className="pointer-events-none absolute -right-4 md:right-4 top-1/2 -translate-y-1/2 font-bebas text-[11rem] md:text-[26rem] leading-none text-white/[0.05] select-none"
          aria-hidden
        >
          {number ?? ""}
        </span>
        <Container className="relative py-6 md:py-16">
          <Link
            href={latest ? `/temporada/${latest.season.id}/plantilla` : "/plantilla"}
            className="text-xs md:text-sm font-bold text-white/55 hover:text-white"
          >
            ← Plantilla {latest?.season.label}
          </Link>
          <div className="mt-3 md:mt-6 flex flex-wrap items-center gap-2">
            <span className="font-bebas text-2xl md:text-3xl text-vice-pink leading-none mr-1">#{dorsal(number)}</span>
            <PositionTag position={person.position} />
          </div>
          <h1 className="display text-[3.5rem] sm:text-8xl md:text-[9rem] mt-1 md:mt-3">{person.nickname}</h1>
          <p className="text-sm md:text-xl text-white/65 mt-0.5">{person.name}</p>
        </Container>
      </section>

      <Container className="py-6 md:py-14">
        <PlayerSeasons seasons={seasons} playerId={person.id} />
      </Container>
    </>
  );
}
