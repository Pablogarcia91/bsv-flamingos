import Link from "next/link";
import type { Player } from "@/lib/types";
import { cn, dorsal, playerHref } from "@/lib/utils";
import { PositionTag } from "@/components/site/ui";
import { PlayerPortrait } from "@/components/player/player-portrait";

export function PlayerCard({ player, meta, seasonId }: { player: Player; meta?: React.ReactNode; seasonId?: string }) {
  return (
    <Link
      href={playerHref(player.id, seasonId)}
      className={cn(
        "group relative overflow-hidden card h-full !rounded-2xl md:!rounded-4xl !p-0 flex flex-col transition-[transform,border-color] hover:-translate-y-1 hover:border-white/25"
      )}
    >
      {/* Retrato: foto oficial o silueta, sobre el dorsal en grande */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,rgba(247,34,128,0.16),transparent_70%)]">
        <span
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-bebas text-[6.5rem] md:text-[10rem] leading-none text-white/[0.05] group-hover:text-vice-pink/15 transition-colors select-none"
          aria-hidden
        >
          {player.number ?? ""}
        </span>
        <PlayerPortrait
          person={player}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="pt-8 md:pt-10 origin-bottom transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5 md:p-5">
          <PositionTag position={player.position} />
          <span className="font-bebas text-xl md:text-2xl leading-none text-vice-pink">#{dorsal(player.number)}</span>
        </div>
      </div>
      <div className="relative mt-auto p-3.5 pt-2.5 md:p-5 md:pt-3">
        <div className="display text-[1.75rem] md:text-5xl group-hover:text-vice-pink transition-colors truncate">{player.nickname}</div>
        <div className="text-xs md:text-sm text-white/55 truncate">{player.name}</div>
        {meta && <div className="mt-1 md:mt-2 text-xs md:text-sm text-white/70">{meta}</div>}
      </div>
    </Link>
  );
}
