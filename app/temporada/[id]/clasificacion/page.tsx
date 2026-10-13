import { notFound } from "next/navigation";
import { getSeason } from "@/lib/data";
import { EmptyState, SectionHeading } from "@/components/site/ui";
import { StandingsTable } from "@/components/season/standings-table";

export default async function SeasonStandings({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  return (
    <section>
      <SectionHeading eyebrow={season.standings?.division ?? "Liga"} title="Clasificación" />
      {season.standings ? (
        <StandingsTable standings={season.standings} />
      ) : (
        <EmptyState>
          {season.finalPosition
            ? `No tenemos la tabla completa de esta temporada. Terminamos en ${season.finalPosition}ª posición${season.teamsInLeague ? ` de ${season.teamsInLeague} equipos` : ""}.`
            : "La clasificación aparecerá cuando se dispute la primera jornada."}
        </EmptyState>
      )}
    </section>
  );
}
