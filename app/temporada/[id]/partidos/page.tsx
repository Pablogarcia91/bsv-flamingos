import { notFound } from "next/navigation";
import { getSeason } from "@/lib/data";
import { FixtureCard, ResultRow } from "@/components/season/match-cards";
import { EmptyState, SectionHeading } from "@/components/site/ui";

export default async function SeasonMatches({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  const byMonth = new Map<string, typeof season.matches>();
  for (const m of [...season.matches].reverse()) {
    const key = new Date(`${m.date}T12:00:00`).toLocaleDateString("es-ES", { month: "long", year: "numeric" });
    byMonth.set(key, [...(byMonth.get(key) ?? []), m]);
  }

  return (
    <div className="space-y-16">
      {season.fixtures.length > 0 && (
        <section>
          <SectionHeading eyebrow="Calendario" title="Por jugar" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {season.fixtures.map((f, i) => <FixtureCard key={f.date} fixture={f} index={i} />)}
          </div>
        </section>
      )}

      <section>
        <SectionHeading eyebrow={`${season.matches.length} partidos`} title="Resultados" />
        {season.matches.length === 0 && <EmptyState>Todavía no se ha disputado ningún partido esta temporada.</EmptyState>}
        <div className="space-y-10">
          {[...byMonth].map(([month, ms]) => (
            <div key={month}>
              <h3 className="eyebrow mb-2 capitalize">{month}</h3>
              <div>{ms.map(m => <ResultRow key={m.id} match={m} />)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
