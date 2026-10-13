import type { Metadata } from "next";
import { Instagram, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Container, TextLink } from "@/components/site/ui";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <>
      <section className="hero-glow border-b border-line">
        <Container className="py-14 md:py-20">
          <p className="eyebrow mb-4">Contacto</p>
          <h1 className="display text-7xl md:text-[10rem]">¿Hablamos?</h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl">
            Para jugar con nosotros, proponer un amistoso o patrocinar al equipo.
          </p>
        </Container>
      </section>

      <Container className="py-14 md:py-20 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <div className="space-y-4">
          <a href={`mailto:${site.email}`} className="group card p-7 flex items-center gap-5 hover:border-vice-blue/60 transition-colors">
            <span className="h-14 w-14 rounded-full bg-vice-blue text-ink inline-flex items-center justify-center shrink-0">
              <Mail className="h-6 w-6" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="eyebrow block">Correo</span>
              <span className="block font-bold text-xl mt-1 break-all group-hover:text-vice-blue">{site.email}</span>
            </span>
          </a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="group card p-7 flex items-center gap-5 hover:border-vice-pink/60 transition-colors">
            <span className="h-14 w-14 rounded-full bg-vice-pink text-white inline-flex items-center justify-center shrink-0">
              <Instagram className="h-6 w-6" aria-hidden />
            </span>
            <span>
              <span className="eyebrow block">Instagram</span>
              <span className="block font-bold text-xl mt-1 group-hover:text-vice-pink">{site.instagram.handle}</span>
            </span>
          </a>
          <div className="card p-7">
            <p className="eyebrow">¿Eres una marca?</p>
            <p className="mt-2 text-white/70">Mira las opciones de patrocinio para esta temporada.</p>
            <TextLink href="/patrocinio" className="mt-3">Patrocinio</TextLink>
          </div>
        </div>
        <ContactForm email={site.email} defaultReason="Otro" />
      </Container>
    </>
  );
}
