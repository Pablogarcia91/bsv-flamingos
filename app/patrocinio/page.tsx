import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { currentSeason, getPreviousSeason } from "@/lib/data";
import { mailto, site, type SponsorLogoKey } from "@/lib/site";
import { Container, PillLink, SectionHeading } from "@/components/site/ui";
import { SponsorLogo } from "@/components/site/brand";

export const metadata: Metadata = { title: "Patrocinio" };

const prev = getPreviousSeason(currentSeason);
const reasons = [
  { value: String(prev?.matches.length ?? "—"), label: "partidos por temporada", text: "Liga regular completa, en casa y fuera." },
  { value: String(currentSeason.roster.length), label: "jugadores", text: "Tu marca en cada camiseta, calentador y foto de equipo." },
  { value: "365", label: "días en redes", text: "Visibilidad continua en la web e Instagram, también fuera de temporada." },
];

export default function PatrocinioPage() {
  return (
    <>
      <section className="bg-vice-pink relative overflow-hidden">
        <div className="absolute inset-0 stripes opacity-60" aria-hidden />
        <Container className="relative py-10 md:py-24">
          <p className="text-[11px] md:text-sm font-bold uppercase tracking-[0.18em] text-white/80 mb-2 md:mb-4">Patrocinio · Temporada {currentSeason.label}</p>
          <h1 className="display text-[3rem] sm:text-7xl md:text-8xl max-w-4xl">Crece con los Flamingos.</h1>
          <p className="mt-3 md:mt-5 text-[15px] md:text-2xl text-white/90 max-w-2xl text-pretty">
            Buscamos marcas que quieran acompañarnos dentro y fuera de la pista.
          </p>
          <div className="mt-5 md:mt-8 flex flex-wrap gap-3">
            <PillLink href="#contacto" variant="dark" className="md:h-14 md:px-8 md:text-base">Quiero patrocinar</PillLink>
          </div>
        </Container>
      </section>

      <Container className="py-10 md:py-20 space-y-12 md:space-y-20">
        <section>
          <SectionHeading title="Qué ofrecemos" />
          <div className="grid md:grid-cols-3 gap-2.5 md:gap-4">
            {reasons.map(r => (
              <div key={r.label} className="card !rounded-2xl md:!rounded-4xl p-4 md:p-8 flex md:block items-center gap-4">
                <div className="font-bebas text-5xl md:text-8xl leading-none text-vice-pink w-16 md:w-auto shrink-0 text-center md:text-left">{r.value}</div>
                <div>
                  <div className="display text-xl md:text-3xl md:mt-2">{r.label}</div>
                  <p className="text-sm md:text-base text-white/65 mt-0.5 md:mt-2">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Patrocinadores" />
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 md:gap-4">
            {site.sponsors.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card !rounded-2xl md:!rounded-3xl h-28 md:h-40 px-4 md:px-10 flex flex-col items-center justify-center gap-2 sm:min-w-[300px] hover:border-white/30 transition-colors"
              >
                <SponsorLogo name={s.name} logo={s.logo as SponsorLogoKey} height={72} className="h-12 md:h-[72px] w-auto" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.14em] text-white/45 text-center">Patrocinador {s.tier.toLowerCase()}</span>
              </a>
            ))}
            <a
              href="#contacto"
              className="flex items-center justify-center rounded-2xl border border-dashed border-vice-pink/50 h-28 md:h-40 sm:min-w-[260px] px-4 text-sm md:text-base text-vice-pink font-bold hover:bg-vice-pink/10 transition-colors"
            >
              + Tu marca aquí
            </a>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-28 rounded-3xl md:rounded-4xl bg-white text-ink px-5 py-6 md:p-14">
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-ink/55 mb-2 md:mb-4">Contacto</p>
          <h2 className="display text-[clamp(1.9rem,8.4vw,6.5rem)] whitespace-nowrap">Hablemos de tu marca</h2>
          <p className="mt-2 md:mt-3 text-[15px] md:text-lg text-ink/70">Escríbenos y te preparamos una propuesta.</p>
          <div className="mt-5 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <PillLink href={mailto("Patrocinio BSV Flamingos")} className="self-start md:h-14 md:px-8 md:text-base">
              <Mail className="h-5 w-5" aria-hidden /> Escríbenos
            </PillLink>
            <a href={`mailto:${site.email}`} className="text-sm md:text-base font-bold text-ink/70 hover:text-vice-pink break-all">
              {site.email}
            </a>
          </div>
        </section>
      </Container>
    </>
  );
}
