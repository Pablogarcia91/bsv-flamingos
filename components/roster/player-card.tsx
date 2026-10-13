import Link from "next/link";
import type { Player } from "@/lib/types";
import { cn, dorsal } from "@/lib/utils";
import { PositionTag } from "@/components/site/ui";

export function PlayerCard({ player, meta }: { player: Player; meta?: React.ReactNode }) {
  return (
    <Link
      href={`/jugador/${player.id}`}
      className={cn(
        "group relative overflow-hidden card p-5 flex flex-col gap-6 min-h-[200px] transition-[transform,border-color] hover:-translate-y-1 hover:border-white/25"
      )}
    >
      <div className="flex items-start justify-between gap-2 relative z-10">
        <PositionTag position={player.position} />
        <span className="font-bebas text-2xl leading-none text-vice-pink">#{dorsal(player.number)}</span>
      </div>
      <div className="relative z-10 mt-auto">
        <div className="display text-4xl md:text-5xl group-hover:text-vice-pink transition-colors">{player.nickname}</div>
        <div className="text-sm text-white/55 truncate">{player.name}</div>
        {meta && <div className="mt-2 text-sm text-white/70">{meta}</div>}
      </div>
      <span
        className="pointer-events-none absolute -right-2 -bottom-8 font-bebas text-[10rem] leading-none text-white/[0.05] group-hover:text-vice-pink/15 transition-colors select-none"
        aria-hidden
      >
        {player.number ?? ""}
      </span>
    </Link>
  );
}
