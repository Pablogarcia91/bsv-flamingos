"use client";

import { players, matches } from "@/lib/data";
import { PlayerProfile } from "@/components/player-profile";
import { useRouter, useParams } from "next/navigation";

export default function JugadorPage() {
  const router = useRouter();
  const params = useParams();
  const playerId = parseInt(params.id as string);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
      <PlayerProfile
        playerId={playerId}
        players={players}
        matches={matches}
        onBack={handleBack}
      />
    </div>
  );
}
