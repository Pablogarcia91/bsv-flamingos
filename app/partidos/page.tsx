"use client";

import { matches } from "@/lib/data";
import { Header } from "@/components/header";
import { TabsNav } from "@/components/tabs-nav";
import { MatchesTab } from "@/components/matches-tab";
import { useRouter } from "next/navigation";

export default function PartidosPage() {
  const router = useRouter();

  const handleMatchSelect = (matchId: number) => {
    router.push(`/partido/${matchId}`);
  };

  return (
    <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
      <Header />
      <TabsNav />
      <MatchesTab matches={matches} onMatchSelect={handleMatchSelect} />
    </div>
  );
}
