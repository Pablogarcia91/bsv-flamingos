import Image from "next/image";
import Link from "next/link";
import equipo from "@/public/brand/equipo-2026-27.webp";
import { ArrowRight, Instagram, Mail } from "lucide-react";
import { currentSeason, getPosition, getPreviousSeason, getSeasonPlayers } from "@/lib/data";
import { calculatePlayerTotals, summarizeTeam } from "@/lib/stats";
import { site } from "@/lib/site";
import { Container, EmptyState, PillLink, SampleTag, SectionHeading, TextLink } from "@/components/site/ui";
import { FixtureCard, ResultCard } from "@/components/season/match-cards";
import { Leaders } from "@/components/season/leaders";
import { RosterGrid } from "@/components/roster/roster-grid";
import { Wordmark } from "@/components/site/brand";

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
          className="absolute -z-20 bottom-0 left-1/2 -translate-x-1/2 w-[135%] max-w-none sm:w-[110%] lg:left-auto lg:translate-x-0 lg:-right-[4%] lg:w-[68%] h-auto select-none pointer-events-none"
        />
        {/* Oscurece la foto donde va el texto para que se lea bien */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#0B0B0D_0%,rgba(11,11,13,0.82)_45%,rgba(11,11,13,0.15)_75%,rgba(11,11,13,0.55)_100%)] lg:bg-[linear-gradient(to_right,#0B0B0D_0%,rgba(11,11,13,0.9)_35%,rgba(11,11,13,0.2)_65%,rgba(11,11,13,0.1)_100%)]"
        />
        <Container className="pt-14 md:pt-24 pb-[84vw] sm:pb-[62vw] lg:pb-24 lg:min-h-[620px] flex items-center">
          <div className="animate-rise max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="eyebrow text-white/75">
                <span className="h-2 w-2 rounded-full bg-vice-blue animate-pulse" aria-hidden />
                Temporada {season.label}{t.played > 0 ? ` · Jornada ${t.played}` : " · Arranca la liga"}
              </span>
              {season.sample && <SampleTag />}
            </div>
            <h1 className="display text-[4.5rem] sm:text-[7rem] lg:text-[9rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              Somos los
              <span className="sr-only"> Flamingos</span>
              <Wordmark height={150} className="block mt-2 w-[min(100%,34rem)] h-auto -rotate-2" />
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/85 max-w-xl text-pretty drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Liga Segunda - Alquería del Bàsquet. Cada partido, cada canasta y cada jugador, temporada a temporada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href={`/temporada/${season.id}`} size="lg">Ver temporada {season.label}</PillLink>
              <PillLink href="/plantilla" variant="ghost" size="lg" className="bg-ink/40 backdrop-blur">Conoce la plantilla</PillLink>
            </div>
          </div>
        </Container>
        </div>

        {/* Franja de récord */}
        <div className="border-y border-line bg-black/40">
          <Container className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
            {[
              { label: "Récord", value: `${t.wins}–${t.losses}` },
              {
                label: "Clasificación",
                value: pos ? (
                  <Link href={`/temporada/${season.id}/clasificacion`} className="hover:text-vice-pink transition-colors">
                    {pos.position}º <span className="text-white/40 text-2xl md:text-3xl">/ {pos.of}</span>
                  </Link>
                ) : "—",
              },
              { label: "Puntos / partido", value: t.played ? t.avgFor.toFixed(1) : "—" },
              { label: "Recibidos / partido", value: t.played ? t.avgAgainst.toFixed(1) : "—" },
            ].map(s => (
              <div key={s.label} className="py-6 px-4 md:px-8 first:pl-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">{s.label}</div>
                <div className="font-bebas text-4xl md:text-5xl leading-none mt-2 h-12 flex items-center">{s.value}</div>
              </div>
            ))}
          </Container>
        </div>
      </section>

      <Container className="py-20 md:py-28 space-y-28">
        {/* ── PARTIDOS: último resultado + próximos ── */}
        {(last || season.fixtures.length > 0) && (
          <section>
            <SectionHeading
              eyebrow="Calendario"
              title="Partidos"
              description="Ven a vernos. Se juega mejor con la grada en rosa."
              action={<TextLink href={`/temporada/${season.id}/partidos`}>Calendario completo</TextLink>}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {last && <ResultCard match={last} />}
              {season.fixtures.slice(0, last ? 3 : 4).map((f, i) => <FixtureCard key={f.date} fixture={f} index={i} />)}
            </div>
          </section>
        )}

        {/* ── LÍDERES ── */}
        <section>
          <SectionHeading
            eyebrow={`Líderes ${season.label}`}
            title="Los que tiran del carro"
            action={<TextLink href={`/temporada/${season.id}/estadisticas`}>Todas las estadísticas</TextLink>}
          />
          {t.played > 0 ? <Leaders totals={totals} /> : <EmptyState>Los líderes aparecerán tras el primer partido de la temporada.</EmptyState>}
        </section>

        {/* ── PLANTILLA ── */}
        <section>
          <SectionHeading
            eyebrow={`Plantilla ${season.label}`}
            title="La bandada"
            action={<TextLink href="/plantilla">Ver plantilla</TextLink>}
          />
          <RosterGrid season={season} />
        </section>

        {/* ── ARCHIVO (discreto: lo principal es la temporada actual) ── */}
        {prev && (
          <Link
            href="/archivo"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl border border-line px-6 py-5 hover:border-white/25 transition-colors"
          >
            <span className="text-white/70">
              ¿Buscas temporadas anteriores? <span className="text-white font-bold">Consulta la {prev.label} y el resto en el archivo.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-vice-blue group-hover:text-white">
              Ir al archivo <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        )}
      </Container>

      {/* ── PATROCINIO (bloque de color plano al estilo Wise) ── */}
      <section className="bg-vice-pink text-white relative overflow-hidden">
        <div className="absolute inset-0 stripes opacity-60" aria-hidden />
        <Container className="relative py-20 md:py-28 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/80 mb-4">Patrocinio</p>
            <h2 className="display text-7xl md:text-[9rem]">Pon tu marca<br />en la pista.</h2>
            <p className="mt-6 text-xl text-white/85 max-w-xl text-pretty">
              Camisetas, redes y presencia en cada partido de la temporada. Buscamos marcas que quieran crecer con nosotros.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <PillLink href="/patrocinio" variant="dark" size="lg">Quiero patrocinar</PillLink>
          </div>
        </Container>
      </section>

      {/* ── CONTACTO ── */}
      <Container className="py-20 md:py-28">
        <SectionHeading eyebrow="Contacto" title="Hablemos" />
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group card p-8 md:p-10 flex flex-col gap-10 min-h-[260px] hover:border-vice-pink/60 transition-colors"
          >
            <Instagram className="h-10 w-10 text-vice-pink" aria-hidden />
            <div className="mt-auto">
              <p className="eyebrow">Instagram</p>
              <p className="display text-[clamp(1.75rem,7.5vw,3.25rem)] mt-2 group-hover:text-vice-pink transition-colors break-words">{site.instagram.handle}</p>
              <p className="text-white/60 mt-2">Resultados, fotos y el día a día del equipo.</p>
            </div>
          </a>
          <Link href="/contacto" className="group card p-8 md:p-10 flex flex-col gap-10 min-h-[260px] hover:border-vice-blue/60 transition-colors">
            <Mail className="h-10 w-10 text-vice-blue" aria-hidden />
            <div className="mt-auto">
              <p className="eyebrow">Correo</p>
              <p className="font-bold text-[clamp(1.05rem,4.6vw,1.75rem)] leading-tight mt-2 group-hover:text-vice-blue transition-colors break-all">{site.email}</p>
              <p className="text-white/60 mt-2">Para jugar, patrocinar o retarnos a un amistoso.</p>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}
