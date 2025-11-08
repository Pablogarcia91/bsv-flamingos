"use client";

import { players, matches } from "@/lib/data";
import { Header } from "@/components/header";
import { TabsNav } from "@/components/tabs-nav";
import { RosterTab } from "@/components/roster-tab";
import { useRouter } from "next/navigation";

export default function PlantillaPage() {
  const router = useRouter();

  const handlePlayerClick = (playerId: number) => {
    router.push(`/jugador/${playerId}`);
  };

  return (
    <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
      <Header />
      <TabsNav />
      <RosterTab
        players={players}
        matches={matches}
        onPlayerClick={handlePlayerClick}
      />
    </div>
  );
}
