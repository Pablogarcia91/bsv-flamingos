import { notFound } from "next/navigation";
import { getSeason, getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals } from "@/lib/stats";
import { Leaders } from "@/components/season/leaders";
import { StandingsTable } from "@/components/season/standings-table";
import { MatchesBlock, ResultCard, ResultRowCompact } from "@/components/season/match-cards";
import { EmptyState, SectionHeading, TextLink } from "@/components/site/ui";

export default async function SeasonOverview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  const totals = calculatePlayerTotals(getSeasonPlayers(season), season.matches);
  const recent = [...season.matches].reverse().slice(0, 3);

  return (
    <div className="space-y-10 md:space-y-20">
      {season.fixtures.length > 0 && (
        <section>
          <SectionHeading title="Próximos partidos" action={<TextLink href={`/temporada/${id}/partidos`}>Calendario</TextLink>} />
          <MatchesBlock fixtures={season.fixtures} />
        </section>
      )}

      <section>
        <SectionHeading
          title="Líderes"
          action={<TextLink href={`/temporada/${id}/estadisticas`}>Estadísticas</TextLink>}
        />
        {season.matches.length ? <Leaders totals={totals} seasonId={season.id} /> : <EmptyState>Los líderes aparecerán tras el primer partido.</EmptyState>}
      </section>

      {season.standings && (
        <section>
          <SectionHeading
            eyebrow={season.standings.division}
            title="Clasificación"
            action={<TextLink href={`/temporada/${id}/clasificacion`}>Completa</TextLink>}
          />
          <StandingsTable standings={season.standings} compact />
        </section>
      )}

      <section>
        <SectionHeading title="Resultados" action={<TextLink href={`/temporada/${id}/partidos`}>Todos</TextLink>} />
        {recent.length ? (
          <>
            <div className="sm:hidden card !rounded-3xl divide-y divide-line overflow-hidden">
              {recent.map(m => <ResultRowCompact key={m.id} match={m} />)}
            </div>
            <div className="hidden sm:grid md:grid-cols-3 gap-3 md:gap-4">
              {recent.map(m => <ResultCard key={m.id} match={m} />)}
            </div>
          </>
        ) : (
          <EmptyState>Todavía no se ha disputado ningún partido esta temporada.</EmptyState>
        )}
      </section>

    </div>
  );
}
