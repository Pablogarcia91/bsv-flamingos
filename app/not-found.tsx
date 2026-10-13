import { Container, PillLink } from "@/components/site/ui";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="display text-8xl md:text-[11rem]">Air ball.</h1>
      <p className="mt-4 text-xl text-white/70">Esta página no existe o se ha movido.</p>
      <PillLink href="/" size="lg" className="mt-8">Volver al inicio</PillLink>
    </Container>
  );
}
