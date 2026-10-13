import type { Metadata } from "next";
import Link from "next/link";
import { currentSeason, seasons } from "@/lib/data";
import { Container, SampleTag } from "@/components/site/ui";
import { RosterGrid } from "@/components/roster/roster-grid";

export const metadata: Metadata = { title: "Plantilla" };

export default function PlantillaPage() {
  const past = seasons.filter(s => s.id !== currentSeason.id);

  return (
    <>
      <section className="hero-glow border-b border-line">
        <Container className="py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="eyebrow">Plantilla {currentSeason.label}</span>
            {currentSeason.sample && <SampleTag />}
          </div>
          <h1 className="display text-7xl md:text-[10rem] max-w-5xl">
            {currentSeason.roster.length} flamencos.<br />
            <span className="text-vice-pink">Una misma bandada.</span>
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl text-pretty">
            Los jugadores de la temporada {currentSeason.label}. Pulsa en cualquiera para ver su ficha y sus números.
          </p>
        </Container>
      </section>

      <Container className="py-14 md:py-20 space-y-12">
        <RosterGrid season={currentSeason} />

        {past.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="text-white/55">Plantillas anteriores:</span>
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
