import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSeasonPlayers, seasons } from "@/lib/data";
import { calculatePlayerTotals, getLeader, summarizeTeam } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { Container, SampleTag } from "@/components/site/ui";

export const metadata: Metadata = { title: "Archivo" };

export default function ArchivoPage() {
  return (
    <>
      <section className="hero-glow border-b border-line">
        <Container className="py-14 md:py-20">
          <p className="eyebrow mb-4">Archivo</p>
          <h1 className="display text-7xl md:text-[10rem] max-w-5xl">
            Cada temporada,<br /><span className="text-vice-pink">guardada.</span>
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl text-pretty">
            Resultados, plantillas y estadísticas de cada temporada de los Flamingos. Elige una para consultarla.
          </p>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <section className="grid md:grid-cols-2 gap-4">
          {seasons.map((s, i) => {
            const t = summarizeTeam(s.matches);
            const top = getLeader(calculatePlayerTotals(getSeasonPlayers(s), s.matches), "ppg");
            const current = s.status === "current";
            return (
              <Link
                key={s.id}
                href={`/temporada/${s.id}`}
                className={cn(
                  "group rounded-4xl p-7 md:p-10 flex flex-col gap-10 min-h-[340px] transition-transform hover:-translate-y-1",
                  i === 0 ? "bg-white text-ink" : "bg-panel border border-line"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className={cn("h-7 px-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center", current ? "bg-vice-pink text-white" : "bg-white/10")}>
                      {current ? "En juego" : "Finalizada"}
                    </span>
                    {s.sample && <SampleTag />}
                  </div>
                  <ArrowUpRight className="h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                </div>
                <div className="display text-8xl md:text-9xl">{s.label}</div>
                <dl className="grid grid-cols-3 gap-4 mt-auto">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">Récord</dt>
                    <dd className="font-bebas text-4xl leading-none mt-1">{t.wins}–{t.losses}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">{current ? "Jugados" : "Posición"}</dt>
                    <dd className="font-bebas text-4xl leading-none mt-1">{current ? t.played : s.finalPosition ? `${s.finalPosition}º` : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">Máx. anotador</dt>
                    <dd className="font-bebas text-4xl leading-none mt-1">{top?.nickname ?? "—"}</dd>
                  </div>
                </dl>
              </Link>
            );
          })}
        </section>

      </Container>
    </>
  );
}
