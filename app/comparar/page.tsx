import { players, matches } from "@/lib/data";
import { PlayerCompare } from "@/components/player-compare";

export default function CompararPage() {
  return <PlayerCompare players={players} matches={matches} />;
}
