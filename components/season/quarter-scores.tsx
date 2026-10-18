import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";

const label = (i: number) => (i < 4 ? `P${i + 1}` : `PR${i > 4 ? i - 3 : ""}`);

/** Marcador por cuartos en una sola tarjeta, con el parcial de cada cuarto. */
export function QuarterScores({ match, quarters }: { match: Match; quarters: NonNullable<Match["quarters"]> }) {
  const { us, them } = quarters;
  const rows = [
    { name: "BSV Flamingos", scores: us, other: them, total: match.ourScore, us: true },
    { name: match.opponent, scores: them, other: us, total: match.oppScore, us: false },
  ];

  return (
    <div className="card !rounded-2xl md:!rounded-3xl px-3.5 py-3 md:px-6 md:py-5">
      <div className="eyebrow text-[10px] md:text-xs mb-1 md:mb-2">Por cuartos</div>
      <table className="w-full table-fixed tabular-nums">
        <caption className="sr-only">Puntos por cuarto</caption>
        <colgroup>
          <col />
          {us.map((_, i) => <col key={i} className="w-10 md:w-24" />)}
          <col className="w-14 md:w-28" />
        </colgroup>
        <thead>
          <tr className="text-[10px] md:text-xs font-bold uppercase tracking-[0.14em] text-white/45">
            <th scope="col" className="text-left font-bold py-1.5"><span className="sr-only">Equipo</span></th>
            {us.map((_, i) => (
              <th key={i} scope="col" className="text-center font-bold py-1.5">{label(i)}</th>
            ))}
            <th scope="col" className="border-l border-line text-right font-bold py-1.5">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name} className="border-t border-line">
              <th scope="row" className="text-left py-2 md:py-3 pr-2">
                <span className={cn("block truncate display text-lg md:text-3xl", r.us ? "text-white" : "text-white/70")} title={r.name}>
                  {r.name}
                </span>
              </th>
              {r.scores.map((v, i) => (
                <td
                  key={i}
                  className={cn(
                    "text-center font-bebas text-2xl md:text-4xl leading-none",
                    v > r.other[i] ? "text-white" : "text-white/35"
                  )}
                >
                  {v}
                </td>
              ))}
              <td className={cn("border-l border-line text-right font-bebas text-3xl md:text-5xl leading-none", r.total > (r.us ? match.oppScore : match.ourScore) ? "text-white" : "text-white/45")}>
                {r.total}
              </td>
            </tr>
          ))}
          {/* Parcial de cada cuarto desde nuestro lado */}
          <tr className="border-t border-line text-xs md:text-sm font-bold">
            <th scope="row" className="text-left py-2 md:py-2.5 text-[10px] md:text-xs uppercase tracking-[0.14em] text-white/45">Parcial</th>
            {us.map((v, i) => {
              const d = v - them[i];
              return (
                <td key={i} className={cn("text-center", d > 0 ? "text-vice-blue" : d < 0 ? "text-vice-pink" : "text-white/50")}>
                  {d > 0 ? "+" : ""}{d}
                </td>
              );
            })}
            <td className={cn("border-l border-line text-right", match.ourScore >= match.oppScore ? "text-vice-blue" : "text-vice-pink")}>
              {match.ourScore - match.oppScore > 0 ? "+" : ""}{match.ourScore - match.oppScore}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
