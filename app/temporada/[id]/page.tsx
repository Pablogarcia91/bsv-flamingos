import { notFound } from "next/navigation";
import { getSeason, getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals } from "@/lib/stats";
import { Leaders } from "@/components/season/leaders";
import { StandingsTable } from "@/components/season/standings-table";
import { FixtureCard, ResultCard } from "@/components/season/match-cards";
import { EmptyState, SectionHeading, TextLink } from "@/components/site/ui";

export default async function SeasonOverview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  const totals = calculatePlayerTotals(getSeasonPlayers(season), season.matches);
  const recent = [...season.matches].reverse().slice(0, 3);

  return (
    <div className="space-y-20">
      {season.fixtures.length > 0 && (
        <section>
          <SectionHeading eyebrow="Calendario" title="Próximos partidos" action={<TextLink href={`/temporada/${id}/partidos`}>Calendario completo</TextLink>} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {season.fixtures.slice(0, 4).map((f, i) => <FixtureCard key={f.date} fixture={f} index={i} />)}
          </div>
        </section>
      )}

      <section>
        <SectionHeading
          eyebrow="Líderes"
          title="Quién manda este año"
          action={<TextLink href={`/temporada/${id}/estadisticas`}>Todas las estadísticas</TextLink>}
        />
        {season.matches.length ? <Leaders totals={totals} /> : <EmptyState>Los líderes aparecerán tras el primer partido.</EmptyState>}
      </section>

      {season.standings && (
        <section>
          <SectionHeading
            eyebrow={season.standings.division}
            title="Clasificación"
            action={<TextLink href={`/temporada/${id}/clasificacion`}>Tabla completa</TextLink>}
          />
          <StandingsTable standings={season.standings} compact />
        </section>
      )}

      <section>
        <SectionHeading eyebrow="Resultados" title="Últimos partidos" action={<TextLink href={`/temporada/${id}/partidos`}>Ver todos</TextLink>} />
        {recent.length ? (
          <div className="grid md:grid-cols-3 gap-3 md:gap-4">
            {recent.map(m => <ResultCard key={m.id} match={m} />)}
          </div>
        ) : (
          <EmptyState>Todavía no se ha disputado ningún partido esta temporada.</EmptyState>
        )}
      </section>

    </div>
  );
}
