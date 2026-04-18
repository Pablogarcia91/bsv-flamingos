import { players, matches } from "@/lib/data";
import { PlayerProfile } from "@/components/player-profile";

export function generateStaticParams() {
  return players.map(p => ({ id: String(p.id) }));
}

export default async function JugadorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlayerProfile playerId={parseInt(id)} players={players} matches={matches} />;
}
