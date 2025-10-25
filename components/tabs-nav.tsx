"use client";

import { Button } from "@/components/ui/button";

interface TabsNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabsNav({ activeTab, onTabChange }: TabsNavProps) {
  const tabs = [
    { id: "general", label: "General" },
    { id: "matches", label: "Partidos" },
    { id: "roster", label: "Plantilla" }
  ];

  return (
    <>
      {/* Desktop tabs */}
      <div className="hidden md:flex gap-4 mb-10 flex-wrap justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            className={`
              font-bebas text-lg tracking-wider uppercase px-8 py-3
              transition-all duration-300
              ${activeTab === tab.id
                ? "bg-vice-pink text-white border-vice-pink"
                : "hover:bg-vice-pink/10"
              }
            `}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Mobile segmented tabs */}
      <div className="md:hidden mb-10 bg-vice-dark border-2 border-vice-pink rounded-lg p-1 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              flex-1 font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md
              transition-all duration-200
              ${activeTab === tab.id
                ? "bg-vice-pink text-white"
                : "text-vice-blue hover:text-white"
              }
            `}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}
