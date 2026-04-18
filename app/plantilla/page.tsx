import { players, matches } from "@/lib/data";
import { RosterTab } from "@/components/roster-tab";

export default function PlantillaPage() {
  return <RosterTab players={players} matches={matches} />;
}
