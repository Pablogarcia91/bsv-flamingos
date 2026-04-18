import { matches } from "@/lib/data";
import { MatchesTab } from "@/components/matches-tab";

export default function PartidosPage() {
  return <MatchesTab matches={matches} />;
}
