import { notFound } from "next/navigation";
import { getPosition, getSeason, seasons } from "@/lib/data";
import { summarizeTeam } from "@/lib/stats";
import { Container, FormDots, SampleTag, StatTile } from "@/components/site/ui";
import { SeasonSwitcher, SeasonTabs } from "@/components/season/season-nav";

export function generateStaticParams() {
  return seasons.map(s => ({ id: s.id }));
}

export default async function SeasonLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const season = getSeason(id);
  if (!season) notFound();

  const t = summarizeTeam(season.matches);
  const isCurrent = season.status === "current";
  const pos = getPosition(season);

  return (
    <>
      <section className="hero-glow border-b border-line">
        <Container className="pt-10 md:pt-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="animate-rise">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="eyebrow">
                  <span className={isCurrent ? "h-2 w-2 rounded-full bg-vice-blue animate-pulse" : "h-2 w-2 rounded-full bg-white/40"} aria-hidden />
                  {isCurrent ? "En juego" : "Finalizada"}
                </span>
                {season.sample && <SampleTag />}
              </div>
              <h1 className="display text-7xl md:text-9xl">
                Temporada <span className="text-vice-pink">{season.label}</span>
              </h1>
              <p className="mt-3 text-lg text-white/65">{season.league}</p>
            </div>
            <SeasonSwitcher
              seasonId={season.id}
              seasons={seasons.map(s => ({ id: s.id, label: s.label, current: s.status === "current" }))}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10">
            <StatTile
              label="Récord"
              value={`${t.wins}–${t.losses}`}
              hint={t.played ? <FormDots form={t.form} /> : "sin partidos aún"}
              tone="blue"
            />
            <StatTile
              label={isCurrent ? "Clasificación" : "Posición final"}
              value={pos ? `${pos.position}º` : "—"}
              hint={pos?.of ? `de ${pos.of} equipos` : undefined}
              tone="pink"
            />
            <StatTile label="Puntos a favor" value={t.played ? t.avgFor.toFixed(1) : "—"} hint="por partido" />
            <StatTile label="Puntos en contra" value={t.played ? t.avgAgainst.toFixed(1) : "—"} hint="por partido" />
            <StatTile
              label="Diferencia"
              value={t.played ? `${t.diff > 0 ? "+" : ""}${t.diff.toFixed(1)}` : "—"}
              hint="por partido"
              className="col-span-2 md:col-span-1"
            />
          </div>

          <div className="mt-8">
            <SeasonTabs seasonId={season.id} />
          </div>
        </Container>
      </section>
      <Container className="py-10 md:py-14">{children}</Container>
    </>
  );
}
