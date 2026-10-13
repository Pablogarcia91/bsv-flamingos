import type { Standings } from "@/lib/types";
import { fmtDate } from "@/lib/stats";
import { cn } from "@/lib/utils";

/** Clasificación de la liga. `compact` muestra menos columnas (para el resumen). */
export function StandingsTable({ standings, compact = false }: { standings: Standings; compact?: boolean }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-3xl border border-line bg-panel">
        <table className="w-full text-[15px]">
          <caption className="sr-only">Clasificación {standings.division}</caption>
          <thead>
            <tr className="border-b border-line text-xs font-bold uppercase tracking-[0.14em] text-white/55">
              <th scope="col" className="pl-4 sm:pl-5 pr-1 py-4 text-left w-10 sm:w-12">#</th>
              <th scope="col" className="px-3 py-4 text-left">Equipo</th>
              <th scope="col" className="px-2 sm:px-3 py-4 text-right">PJ</th>
              <th scope="col" className="px-2 sm:px-3 py-4 text-right">PG</th>
              <th scope="col" className="px-2 sm:px-3 py-4 text-right">PP</th>
              {!compact && (
                <>
                  <th scope="col" className="hidden sm:table-cell px-3 py-4 text-right">PF</th>
                  <th scope="col" className="hidden sm:table-cell px-3 py-4 text-right">PC</th>
                </>
              )}
              <th scope="col" className="pl-2 pr-4 sm:px-5 py-4 text-right">Dif</th>
            </tr>
          </thead>
          <tbody>
            {standings.rows.map((r, i) => {
              const diff = r.pointsFor - r.pointsAgainst;
              return (
                <tr
                  key={r.team}
                  aria-current={r.us ? "true" : undefined}
                  className={cn("border-b border-line last:border-0", r.us ? "bg-vice-pink/15" : "hover:bg-white/[0.03]")}
                >
                  <td className={cn("pl-4 sm:pl-5 pr-1 py-3 font-bebas text-2xl leading-none", r.us ? "text-vice-pink" : "text-white/45")}>{i + 1}</td>
                  <th scope="row" className={cn("px-2 sm:px-3 py-3 text-left", r.us ? "font-bold text-white" : "font-semibold text-white/85")}>
                    {r.team}
                    {r.us && <span className="hidden sm:inline-flex ml-2 h-5 px-2 rounded-full bg-vice-pink text-white text-[10px] font-bold uppercase tracking-wider items-center align-middle">Nosotros</span>}
                  </th>
                  <td className="px-2 sm:px-3 py-3 text-right tabular-nums text-white/70">{r.played}</td>
                  <td className="px-2 sm:px-3 py-3 text-right tabular-nums font-bold">{r.wins}</td>
                  <td className="px-2 sm:px-3 py-3 text-right tabular-nums text-white/70">{r.losses}</td>
                  {!compact && (
                    <>
                      <td className="hidden sm:table-cell px-3 py-3 text-right tabular-nums text-white/70">{r.pointsFor}</td>
                      <td className="hidden sm:table-cell px-3 py-3 text-right tabular-nums text-white/70">{r.pointsAgainst}</td>
                    </>
                  )}
                  <td className={cn("pl-2 pr-4 sm:px-5 py-3 text-right tabular-nums font-bold", diff > 0 ? "text-vice-blue" : diff < 0 ? "text-vice-pink" : "text-white/60")}>
                    {diff > 0 ? "+" : ""}{diff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-white/45">
        {standings.division} · Actualizada el {fmtDate(standings.updated, { day: "numeric", month: "long" })}
      </p>
    </div>
  );
}
