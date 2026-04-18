import { players, matches } from "@/lib/data";
import { GeneralTab } from "@/components/general-tab";

export default function Home() {
  return <GeneralTab players={players} matches={matches} />;
}
