import Link from "next/link";
import { Match } from "@/lib/types";

interface LastMatchHighlightProps {
  match: Match;
}

export function LastMatchHighlight({ match }: LastMatchHighlightProps) {
  const isWin = match.ourScore > match.oppScore;

  return (
    <div className="relative bg-vice-dark border border-vice-pink/40 rounded-xl p-5 mb-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background: isWin
            ? 'radial-gradient(ellipse at center, rgba(0,206,209,0.3) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(255,20,147,0.3) 0%, transparent 70%)'
        }}
      />

      <div className="relative flex flex-col gap-3 items-center text-center">
        <div className="text-xs text-white/80 uppercase tracking-widest font-semibold">Último Partido</div>

        {/* Score row */}
        <div className="flex items-center gap-4 font-bebas text-3xl md:text-4xl">
          <span className="text-white/80 text-lg">BSV</span>
          <span className={isWin ? "text-vice-blue" : "text-vice-pink"}>
            {match.ourScore}
          </span>
          <span className="text-white/75 text-xl">—</span>
          <span className={!isWin ? "text-vice-blue" : "text-vice-pink"}>
            {match.oppScore}
          </span>
          <span className="text-white/80 text-lg">{match.opponent}</span>
        </div>

        {/* Result chip + link */}
        <div className="flex items-center gap-3">
          <span className={isWin ? "chip-win" : "chip-loss"}>
            {isWin ? "VICTORIA" : "DERROTA"}
          </span>
          <Link
            href={`/partido/${match.id}`}
            className="text-white/80 text-xs hover:text-vice-blue transition-colors"
          >
            Ver estadísticas →
          </Link>
        </div>
      </div>
    </div>
  );
}
