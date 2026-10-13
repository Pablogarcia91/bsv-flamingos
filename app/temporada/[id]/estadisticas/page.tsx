import { notFound } from "next/navigation";
import { getSeason, getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals } from "@/lib/stats";
import { StatsTable } from "@/components/season/stats-table";
import { SectionHeading } from "@/components/site/ui";

export default async function SeasonStats({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  const rows = calculatePlayerTotals(getSeasonPlayers(season), season.matches);

  return (
    <section>
      <SectionHeading
        title="Estadísticas"
        description="Ordena por columna o pulsa un jugador para ver su ficha."
      />
      <StatsTable rows={rows} seasonId={season.id} />
    </section>
  );
}
