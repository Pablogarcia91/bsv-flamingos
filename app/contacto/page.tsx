import type { Metadata } from "next";
import { Container, PageHero, TextLink } from "@/components/site/ui";
import { ContactCards } from "@/components/site/contact-cards";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow={<span className="eyebrow">Contacto</span>}
        title="¿Hablamos?"
        description="Para jugar con nosotros, proponer un amistoso o patrocinar al equipo."
      />

      <Container className="py-8 md:py-14 space-y-2.5 md:space-y-4 max-w-3xl">
        <ContactCards className="md:grid-cols-1" />
        <div className="card !rounded-2xl md:!rounded-3xl p-4 md:p-6 flex items-center justify-between gap-3">
          <p className="text-sm md:text-base text-white/70">¿Eres una marca?</p>
          <TextLink href="/patrocinio" className="text-sm md:text-base">Patrocinio</TextLink>
        </div>
      </Container>
    </>
  );
}
