import type { Metadata } from "next";
import { Suspense } from "react";
import { getPlayerCareer, people, seasons } from "@/lib/data";
import type { PlayerTotals } from "@/lib/types";
import { Container } from "@/components/site/ui";
import { Compare, type ComparePlayer, type CompareStats } from "@/components/compare/compare";

export const metadata: Metadata = { title: "Comparar jugadores" };

function toStats(t: PlayerTotals | undefined): CompareStats | undefined {
  if (!t || !t.games) return undefined;
  const g = t.games;
  return {
    games: g,
    ppg: t.points / g,
    mpg: t.totalMinutes / g,
    t2: t.t2Made,
    t3: t.t3Made,
    ftPct: t.ftAttempted ? t.ftMade / t.ftAttempted : -1,
    fpg: t.fouls / g,
    plusMinus: t.plusMinus,
  };
}

export default function CompararPage() {
  // Cada temporada por separado: no se acumulan estadísticas entre temporadas
  const players: ComparePlayer[] = people
    .map(p => {
      const career = getPlayerCareer(p.id);
      return {
        id: p.id,
        nickname: p.nickname,
        name: p.name,
        position: p.position,
        numbers: Object.fromEntries(career.map(c => [c.season.id, c.player.number])),
        stats: Object.fromEntries(career.map(c => [c.season.id, toStats(c.totals)])),
      };
    })
    .sort((a, b) => a.nickname.localeCompare(b.nickname, "es"));

  const scopes = seasons.map(s => ({ id: s.id, label: s.label }));

  return (
    <>
      <section className="hero-glow border-b border-line">
        <Container className="py-14 md:py-20">
          <p className="eyebrow mb-4">Comparador</p>
          <h1 className="display text-7xl md:text-[10rem]">Cara a cara</h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl">
            Compara a dos jugadores de la misma temporada. Por defecto, la temporada actual.
          </p>
        </Container>
      </section>
      <Container className="py-12 md:py-16">
        <Suspense fallback={<div className="h-96" />}>
          <Compare players={players} scopes={scopes} />
        </Suspense>
      </Container>
    </>
  );
}
