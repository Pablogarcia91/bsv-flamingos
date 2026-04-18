import { players, matches } from "@/lib/data";
import { MatchDetail } from "@/components/match-detail";

export function generateStaticParams() {
  return matches.map(m => ({ id: String(m.id) }));
}

export default async function PartidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = matches.find(m => m.id === parseInt(id));

  if (!match) {
    return (
      <div className="text-center py-20">
        <p className="text-vice-pink text-2xl">Partido no encontrado</p>
      </div>
    );
  }

  return <MatchDetail match={match} players={players} />;
}
