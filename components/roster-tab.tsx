import { Player, Match } from "@/lib/types";
import { calculatePlayerTotals } from "@/lib/stats";
import { Card } from "@/components/ui/card";
import { PositionBadge } from "./position-badge";

interface RosterTabProps {
  players: Player[];
  matches: Match[];
  onPlayerClick: (playerId: number) => void;
}

export function RosterTab({ players, matches, onPlayerClick }: RosterTabProps) {
  const playerTotals = calculatePlayerTotals(players, matches);

  return (
    <div className="animate-neon-fade-in">
      {/* Desktop: Cards Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playerTotals.map((player) => {
          const ppg = player.games > 0 ? (player.points / player.games).toFixed(1) : '0.0';

          return (
            <Card
              key={player.id}
              className="cursor-pointer text-center p-6 transition-all hover:transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,0,110,0.5),0_10px_60px_rgba(0,245,255,0.3)] relative overflow-hidden group"
              onClick={() => onPlayerClick(player.id)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-vice-pink to-vice-blue blur-xl -z-10" />

              <div className="font-bebas text-6xl text-vice-pink mb-3">
                #{player.number}
              </div>

              <div className="text-xl font-bold mb-3">
                {player.nickname}
              </div>

              <div className="flex justify-center mb-4">
                <PositionBadge position={player.position} />
              </div>

              <div className="mt-4 pt-4 border-t border-vice-pink/30 space-y-2">
                <div className="text-vice-blue text-sm">
                  PPP: <span className="font-bold">{ppg}</span>
                </div>
                <div className="text-vice-blue text-sm">
                  PJ: <span className="font-bold">{player.games}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Mobile: List View */}
      <div className="md:hidden bg-vice-dark border-2 border-vice-pink rounded-lg overflow-hidden divide-y divide-vice-pink/20">
        {playerTotals.map((player) => {
          const ppg = player.games > 0 ? (player.points / player.games).toFixed(1) : '0.0';

          return (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-vice-pink/5 transition-colors active:bg-vice-pink/10"
              onClick={() => onPlayerClick(player.id)}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="font-bebas text-3xl text-vice-pink w-12 text-center">
                  #{player.number}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white mb-1">{player.nickname}</div>
                  <div className="flex items-center gap-2">
                    <PositionBadge position={player.position} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-vice-blue text-xs uppercase mb-1">PPP</div>
                <div className="font-bebas text-2xl text-white">{ppg}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
