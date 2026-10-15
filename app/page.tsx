import Image from "next/image";
import Link from "next/link";
import equipo from "@/public/brand/equipo-2026-27.webp";
import { ArrowRight } from "lucide-react";
import { currentSeason, getPosition, getPreviousSeason, getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals, summarizeTeam } from "@/lib/stats";
import { Container, EmptyState, PillLink, SampleTag, SectionHeading, TextLink } from "@/components/site/ui";
import { MatchesBlock } from "@/components/season/match-cards";
import { ContactCards } from "@/components/site/contact-cards";
import { Leaders } from "@/components/season/leaders";
import { RosterGrid } from "@/components/roster/roster-grid";
import { NeonWordmark } from "@/components/site/neon-wordmark";

export default function Home() {
  const season = currentSeason;
  const prev = getPreviousSeason(season);
  const t = summarizeTeam(season.matches);
  const last = season.matches.at(-1);
  const pos = getPosition(season);
  const totals = calculatePlayerTotals(getSeasonPlayers(season), season.matches);

  return (
    <>
      {/* ── HERO: foto del equipo de fondo ── */}
      <section className="relative overflow-hidden hero-glow">
        <div className="relative isolate">
          <Image
            src={equipo}
            alt={`Plantilla de los Flamingos, temporada ${season.label}`}
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="absolute -z-20 bottom-0 left-1/2 -translate-x-1/2 w-[125%] max-w-none sm:w-[105%] lg:left-auto lg:translate-x-0 lg:-right-[4%] lg:w-[64%] h-auto select-none pointer-events-none"
          />
          {/* Oscurece la foto donde va el texto para que se lea bien */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#0B0B0D_0%,rgba(11,11,13,0.85)_40%,rgba(11,11,13,0.1)_70%,rgba(11,11,13,0.5)_100%)] lg:bg-[linear-gradient(to_right,#0B0B0D_0%,rgba(11,11,13,0.9)_35%,rgba(11,11,13,0.2)_65%,rgba(11,11,13,0.1)_100%)]"
          />
          <Container className="pt-8 md:pt-20 pb-[70vw] sm:pb-[56vw] lg:pb-20 lg:min-h-[560px] flex items-center">
            <div className="animate-rise max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-5">
                <span className="eyebrow text-[11px] md:text-xs text-white/75">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-vice-blue animate-pulse" aria-hidden />
                  Temporada {season.label}{t.played > 0 ? ` · Jornada ${t.played}` : " · Arranca la liga"}
                </span>
                {season.sample && <SampleTag />}
              </div>
              <h1 className="display text-[3.25rem] sm:text-[6rem] lg:text-[8rem]">
                {/* La sombra va solo en el texto para no apagar el halo del neón */}
                <span className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">Somos los</span>
                <span className="sr-only"> Flamingos</span>
                <NeonWordmark className="mt-1 w-[78%] sm:w-[min(100%,30rem)] -rotate-2" />
              </h1>
              <p className="mt-3 md:mt-5 text-[15px] md:text-xl text-white/85 max-w-md md:max-w-xl text-pretty drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Liga Segunda - Alquería del Bàsquet. Cada partido, cada canasta y cada jugador, temporada a temporada.
              </p>
              <div className="mt-5 md:mt-8 flex flex-wrap gap-2.5">
                <PillLink href={`/temporada/${season.id}`} className="md:h-14 md:px-8 md:text-base">Ver temporada</PillLink>
                <PillLink href="/plantilla" variant="ghost" className="bg-ink/40 backdrop-blur md:h-14 md:px-8 md:text-base">Plantilla</PillLink>
              </div>
            </div>
          </Container>
        </div>

        {/* Franja de récord: 4 cifras en una fila también en móvil */}
        <div className="border-y border-line bg-black/40">
          <Container className="grid grid-cols-4 divide-x divide-line">
            {[
              { label: "Récord", value: `${t.wins}–${t.losses}` },
              {
                label: "Puesto",
                value: pos ? (
                  <Link href={`/temporada/${season.id}/clasificacion`} className="hover:text-vice-pink transition-colors">
                    {pos.position}º<span className="text-white/40 text-lg md:text-3xl"> /{pos.of}</span>
                  </Link>
                ) : "—",
              },
              { label: "A favor", value: t.played ? t.avgFor.toFixed(1) : "—" },
              { label: "En contra", value: t.played ? t.avgAgainst.toFixed(1) : "—" },
            ].map(s => (
              <div key={s.label} className="py-3.5 md:py-6 px-2.5 md:px-8 first:pl-0">
                <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] md:tracking-[0.16em] text-white/50 truncate">{s.label}</div>
                <div className="font-bebas text-[1.75rem] md:text-5xl leading-none mt-1 md:mt-2">{s.value}</div>
              </div>
            ))}
          </Container>
        </div>
      </section>

      <Container className="py-10 md:py-20 space-y-12 md:space-y-20">
        {/* ── PARTIDOS ── */}
        {(last || season.fixtures.length > 0) && (
          <section>
            <SectionHeading
              title="Partidos"
              action={<TextLink href={`/temporada/${season.id}/partidos`}>Calendario</TextLink>}
            />
            <MatchesBlock last={last} fixtures={season.fixtures} />
          </section>
        )}

        {/* ── LÍDERES ── */}
        <section>
          <SectionHeading
            title="Líderes"
            action={<TextLink href={`/temporada/${season.id}/estadisticas`}>Estadísticas</TextLink>}
          />
          {t.played > 0 ? <Leaders totals={totals} seasonId={season.id} /> : <EmptyState>Los líderes aparecerán tras el primer partido.</EmptyState>}
        </section>

        {/* ── PLANTILLA ── */}
        <section>
          <SectionHeading
            title="Plantilla"
            action={<TextLink href="/plantilla">Ver todos</TextLink>}
          />
          <RosterGrid season={season} scroll />
          <p className="md:hidden mt-2 text-xs text-white/40">Desliza para ver los {season.roster.length} jugadores →</p>
        </section>

        {/* ── ARCHIVO (discreto: lo principal es la temporada actual) ── */}
        {prev && (
          <Link
            href="/archivo"
            className="group flex items-center justify-between gap-3 rounded-2xl md:rounded-3xl border border-line px-4 md:px-6 py-3.5 md:py-5 hover:border-white/25 transition-colors"
          >
            <span className="text-sm md:text-base text-white/70">
              Temporadas anteriores: <span className="text-white font-bold">{prev.label} y más</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm md:text-base font-bold text-vice-blue group-hover:text-white shrink-0">
              Archivo <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        )}
      </Container>

      {/* ── PATROCINIO (bloque de color plano al estilo Wise) ── */}
      <section className="bg-vice-pink text-white relative overflow-hidden">
        <div className="absolute inset-0 stripes opacity-60" aria-hidden />
        <Container className="relative py-10 md:py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 md:gap-8">
          <div>
            <p className="text-[11px] md:text-sm font-bold uppercase tracking-[0.18em] text-white/80 mb-2 md:mb-4">Patrocinio</p>
            <h2 className="display text-[2.75rem] sm:text-7xl md:text-8xl">Pon tu marca en la pista.</h2>
            <p className="mt-2 md:mt-4 text-[15px] md:text-xl text-white/85 max-w-xl text-pretty">
              Camisetas, redes y presencia en cada partido de la temporada.
            </p>
          </div>
          <PillLink href="/patrocinio" variant="dark" className="self-start lg:self-auto md:h-14 md:px-8 md:text-base">Quiero patrocinar</PillLink>
        </Container>
      </section>

      {/* ── CONTACTO ── */}
      <Container className="pt-10 md:pt-20">
        <SectionHeading title="Contacto" />
        <ContactCards />
      </Container>
    </>
  );
}
