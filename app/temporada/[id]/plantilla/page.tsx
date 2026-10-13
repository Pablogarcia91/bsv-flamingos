import { notFound } from "next/navigation";
import { getSeason, getSeasonPlayers } from "@/lib/data";
import { RosterGrid } from "@/components/roster/roster-grid";
import { SectionHeading } from "@/components/site/ui";

export default async function SeasonRoster({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  const players = getSeasonPlayers(season);

  return (
    <section>
      <SectionHeading eyebrow={`${players.length} jugadores`} title={`Plantilla ${season.label}`} />
      <RosterGrid season={season} />
    </section>
  );
}
