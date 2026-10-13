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
        <Container className="relative py-16 md:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/80 mb-4">Patrocinio · Temporada {currentSeason.label}</p>
          <h1 className="display text-7xl md:text-[10rem] max-w-5xl">Crece con los Flamingos.</h1>
          <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl text-pretty">
            Somos un equipo amateur con mucha identidad y una comunidad fiel. Buscamos marcas que quieran acompañarnos dentro y fuera de la pista.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href="#contacto" variant="dark" size="lg">Quiero patrocinar</PillLink>
          </div>
        </Container>
      </section>

      <Container className="py-20 md:py-28 space-y-28">
        <section>
          <SectionHeading eyebrow="Por qué" title="Lo que te ofrecemos" />
          <div className="grid md:grid-cols-3 gap-4">
            {reasons.map(r => (
              <div key={r.label} className="card p-8">
                <div className="font-bebas text-8xl leading-none text-vice-pink">{r.value}</div>
                <div className="display text-3xl mt-2">{r.label}</div>
                <p className="text-white/65 mt-2">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Ya confían en nosotros" title="Patrocinadores" />
          <div className="flex flex-wrap gap-4">
            {site.sponsors.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card h-40 px-10 flex flex-col items-center justify-center gap-2 min-w-[300px] hover:border-white/30 transition-colors"
              >
                <SponsorLogo name={s.name} logo={s.logo as SponsorLogoKey} height={72} />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Patrocinador {s.tier.toLowerCase()}</span>
              </a>
            ))}
            <a
              href="#contacto"
              className="flex items-center justify-center rounded-2xl border border-dashed border-vice-pink/50 h-40 min-w-[260px] px-6 text-vice-pink font-bold hover:bg-vice-pink/10 transition-colors"
            >
              + Tu marca aquí
            </a>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-28 rounded-4xl bg-white text-ink px-6 py-8 md:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/55 mb-4">Contacto</p>
          <h2 className="display text-[clamp(1.9rem,8.4vw,6.5rem)] whitespace-nowrap">Hablemos de tu marca</h2>
          <p className="mt-3 text-lg text-ink/70">Escríbenos y te preparamos una propuesta.</p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <PillLink href={mailto("Patrocinio BSV Flamingos")} size="lg" className="self-start">
              <Mail className="h-5 w-5" aria-hidden /> Escríbenos
            </PillLink>
            <a href={`mailto:${site.email}`} className="font-bold text-ink/70 hover:text-vice-pink break-all">
              {site.email}
            </a>
          </div>
        </section>
      </Container>
    </>
  );
}
