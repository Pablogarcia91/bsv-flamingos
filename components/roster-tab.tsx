import Link from "next/link";
import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { PositionBadge } from "./position-badge";
import { ChevronRight } from "lucide-react";

interface RosterTabProps {
  players: Player[];
  matches: Match[];
}

export function RosterTab({ players, matches }: RosterTabProps) {
  const playerTotals = calculatePlayerTotals(players, matches);

  return (
    <div className="animate-neon-fade-in bg-vice-dark border border-vice-pink/25 rounded-xl overflow-hidden divide-y divide-vice-pink/10">
      {playerTotals.map((player) => {
        const ppg = player.games > 0 ? (player.points / player.games).toFixed(1) : '0.0';

        return (
          <Link
            key={player.id}
            href={`/jugador/${player.id}`}
            className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 hover:bg-vice-pink/5 transition-colors group"
          >
            <div className="font-bebas text-3xl text-vice-pink w-14 shrink-0 text-center leading-none">
              #{player.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white group-hover:text-vice-blue transition-colors">
                {player.nickname}
              </div>
              <div className="mt-1">
                <PositionBadge position={player.position} />
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              <div className="text-right">
                <div className="text-[10px] text-white/75 uppercase tracking-widest">PPP</div>
                <div className="font-bebas text-xl text-vice-blue leading-none">{ppg}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/75 uppercase tracking-widest">PJ</div>
                <div className="font-bebas text-xl text-white leading-none">{player.games}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/25 group-hover:text-vice-pink transition-colors" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
