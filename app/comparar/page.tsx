import type { Metadata } from "next";
import { Suspense } from "react";
import { getPlayerCareer, people, seasons } from "@/lib/data";
import type { PlayerTotals } from "@/lib/types";
import { Container, PageHero } from "@/components/site/ui";
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
      <PageHero
        eyebrow={<span className="eyebrow">Comparador</span>}
        title="Cara a cara"
        description="Dos jugadores de la misma temporada."
      />
      <Container className="py-8 md:py-14">
        <Suspense fallback={<div className="h-96" />}>
          <Compare players={players} scopes={scopes} />
        </Suspense>
      </Container>
    </>
  );
}
