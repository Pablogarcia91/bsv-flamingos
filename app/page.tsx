"use client";

import { useState } from "react";
import { players, matches } from "@/lib/data";
import { Header } from "@/components/header";
import { TabsNav } from "@/components/tabs-nav";
import { GeneralTab } from "@/components/general-tab";
import { MatchesTab } from "@/components/matches-tab";
import { RosterTab } from "@/components/roster-tab";
import { PlayerProfile } from "@/components/player-profile";
import { MatchDetail } from "@/components/match-detail";

export default function Home() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const handlePlayerClick = (playerId: number) => {
    setSelectedPlayerId(playerId);
  };

  const handleMatchSelect = (matchId: number) => {
    setSelectedMatchId(matchId);
  };

  const handleBackToMain = () => {
    setSelectedPlayerId(null);
  };

  const handleBackToMatches = () => {
    setSelectedMatchId(null);
  };

  // Vista de perfil de jugador
  if (selectedPlayerId !== null) {
    return (
      <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
        <PlayerProfile
          playerId={selectedPlayerId}
          players={players}
          matches={matches}
          onBack={handleBackToMain}
        />
      </div>
    );
  }

  // Vista de detalle de partido
  if (selectedMatchId !== null) {
    const selectedMatch = matches.find(m => m.id === selectedMatchId);
    if (selectedMatch) {
      return (
        <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
          <Header />
          <MatchDetail
            match={selectedMatch}
            players={players}
            onPlayerClick={handlePlayerClick}
            onBack={handleBackToMatches}
          />
        </div>
      );
    }
  }

  // Vista principal con tabs
  return (
    <div className="container max-w-7xl mx-auto px-5 py-5 relative z-10">
      <Header />
      <TabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "general" && (
        <GeneralTab
          players={players}
          matches={matches}
          onPlayerClick={handlePlayerClick}
          onMatchSelect={handleMatchSelect}
        />
      )}

      {activeTab === "matches" && (
        <MatchesTab matches={matches} onMatchSelect={handleMatchSelect} />
      )}

      {activeTab === "roster" && (
        <RosterTab
          players={players}
          matches={matches}
          onPlayerClick={handlePlayerClick}
        />
      )}
    </div>
  );
}
