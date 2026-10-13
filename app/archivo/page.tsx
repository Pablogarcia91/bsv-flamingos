import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSeasonPlayers, seasons } from "@/lib/data";
import { calculatePlayerTotals, getLeader, summarizeTeam } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { Container, PageHero, SampleTag } from "@/components/site/ui";

export const metadata: Metadata = { title: "Archivo" };

export default function ArchivoPage() {
  return (
    <>
      <PageHero
        eyebrow={<span className="eyebrow">Archivo</span>}
        title={<>Todas las <span className="text-vice-pink">temporadas</span></>}
      />

      <Container className="py-8 md:py-14">
        <section className="grid md:grid-cols-2 gap-3 md:gap-4">
          {seasons.map((s, i) => {
            const t = summarizeTeam(s.matches);
            const top = getLeader(calculatePlayerTotals(getSeasonPlayers(s), s.matches), "ppg");
            const current = s.status === "current";
            return (
              <Link
                key={s.id}
                href={`/temporada/${s.id}`}
                className={cn(
                  "group rounded-3xl md:rounded-4xl p-5 md:p-10 flex flex-col gap-5 md:gap-10 md:min-h-[340px] transition-transform hover:-translate-y-1",
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
                  <ArrowUpRight className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                </div>
                <div className="display text-6xl md:text-9xl">{s.label}</div>
                <dl className="grid grid-cols-3 gap-3 md:gap-4 mt-auto">
                  <div>
                    <dt className="text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] md:tracking-[0.14em] opacity-60">Récord</dt>
                    <dd className="font-bebas text-3xl md:text-4xl leading-none mt-1">{t.wins}–{t.losses}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] md:tracking-[0.14em] opacity-60">{current ? "Jugados" : "Posición"}</dt>
                    <dd className="font-bebas text-3xl md:text-4xl leading-none mt-1">{current ? t.played : s.finalPosition ? `${s.finalPosition}º` : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] md:tracking-[0.14em] opacity-60">Máx. anotador</dt>
                    <dd className="font-bebas text-3xl md:text-4xl leading-none mt-1">{top?.nickname ?? "—"}</dd>
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
