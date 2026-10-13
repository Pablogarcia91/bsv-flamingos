import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { site, type SponsorLogoKey } from "@/lib/site";
import { currentSeason } from "@/lib/data";
import { BrandMark, SponsorLogo, Wordmark } from "./brand";
import { Container } from "./ui";

const columns = [
  {
    title: "Equipo",
    links: [
      { label: `Temporada ${currentSeason.label}`, href: `/temporada/${currentSeason.id}` },
      { label: "Plantilla", href: "/plantilla" },
      { label: "Comparar jugadores", href: "/comparar" },
      { label: "Archivo de temporadas", href: "/archivo" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "Patrocinio", href: "/patrocinio" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-12 md:mt-24 border-t border-line bg-black">
      {/* Patrocinadores */}
      <Container className="py-6 md:py-10 border-b border-line">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
          <p className="eyebrow shrink-0">Con el apoyo de</p>
          <div className="flex flex-wrap items-center gap-4 flex-1">
            {site.sponsors.map(s => {
              const logo = <SponsorLogo name={s.name} logo={s.logo as SponsorLogoKey} height={44} className="md:h-14 md:w-auto" />;
              return s.url ? (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">{logo}</a>
              ) : (
                <span key={s.name} className="opacity-90">{logo}</span>
              );
            })}
            <Link
              href="/patrocinio"
              className="flex items-center justify-center rounded-2xl border border-dashed border-vice-pink/50 px-4 md:px-6 h-12 md:h-16 text-sm md:text-base text-vice-pink font-bold hover:bg-vice-pink/10 transition-colors"
            >
              + Tu marca aquí
            </Link>
          </div>
        </div>
      </Container>

      <Container className="py-8 md:py-14 grid grid-cols-2 gap-x-6 gap-y-8 md:gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <BrandMark size={52} />
            <Wordmark height={34} alt="Flamingos" />
          </div>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-white/60 max-w-xs">
            {currentSeason.league}. Baloncesto amateur en {site.city}. Cada partido, cada canasta, temporada a temporada.
          </p>
        </div>

        {columns.map(col => (
          <div key={col.title}>
            <h3 className="eyebrow mb-3 md:mb-4">{col.title}</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {col.links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-vice-pink transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-1">
          <h3 className="eyebrow mb-3 md:mb-4">Síguenos</h3>
          <ul className="space-y-2.5 text-sm md:text-base">
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-white/80 hover:text-vice-pink transition-colors">
                <Instagram className="h-5 w-5" aria-hidden /> {site.instagram.handle}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-white/80 hover:text-vice-pink transition-colors break-all">
                <Mail className="h-5 w-5 shrink-0" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="py-5 md:py-6 border-t border-line flex flex-col sm:flex-row gap-1 justify-between text-xs md:text-sm text-white/45">
        <span>© {new Date().getFullYear()} BSV Flamingos</span>
        <span>Estadísticas extraídas de las actas oficiales de partido</span>
      </Container>
    </footer>
  );
}
