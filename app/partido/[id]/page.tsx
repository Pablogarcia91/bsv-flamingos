"use client";

import { players, matches } from "@/lib/data";
import { Header } from "@/components/header";
import { MatchDetail } from "@/components/match-detail";
import { useRouter, useParams } from "next/navigation";

export default function PartidoPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = parseInt(params.id as string);

  const handlePlayerClick = (playerId: number) => {
    router.push(`/jugador/${playerId}`);
  };

  const handleBack = () => {
    router.back();
  };

  const match = matches.find(m => m.id === matchId);

  if (!match) {
    return (
      <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
        <Header />
        <div className="text-center py-20">
          <p className="text-vice-pink text-2xl">Partido no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
      <Header />
      <MatchDetail
        match={match}
        players={players}
        onPlayerClick={handlePlayerClick}
        onBack={handleBack}
      />
    </div>
  );
}
