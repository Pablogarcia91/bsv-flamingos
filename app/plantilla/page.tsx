import type { Metadata } from "next";
import Link from "next/link";
import { currentSeason, seasons } from "@/lib/data";
import { Container, PageHero, SampleTag } from "@/components/site/ui";
import { RosterGrid } from "@/components/roster/roster-grid";

export const metadata: Metadata = { title: "Plantilla" };

export default function PlantillaPage() {
  const past = seasons.filter(s => s.id !== currentSeason.id);

  return (
    <>
      <PageHero
        eyebrow={<>
          <span className="eyebrow">{currentSeason.roster.length} jugadores</span>
          {currentSeason.sample && <SampleTag />}
        </>}
        title={<>Plantilla <span className="text-vice-pink">{currentSeason.label}</span></>}
      />

      <Container className="py-8 md:py-14 space-y-8">
        <RosterGrid season={currentSeason} />

        {past.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="text-sm text-white/55">Plantillas anteriores:</span>
            {past.map(s => (
              <Link
                key={s.id}
                href={`/temporada/${s.id}/plantilla`}
                className="h-9 px-4 rounded-full border border-white/15 hover:border-white/40 text-sm font-bold inline-flex items-center"
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
