import Image from "next/image";
import { useId } from "react";
import type { Person } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Retrato del jugador. Mientras no haya foto oficial (`person.photo`) muestra
 * una silueta genérica con camiseta de tirantes, alineada abajo como lo
 * estará la foto recortada.
 */
export function PlayerPortrait({ person, className, sizes = "240px" }: { person: Person; className?: string; sizes?: string }) {
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={person.nickname}
        fill
        sizes={sizes}
        className={cn("object-contain object-bottom", className)}
      />
    );
  }
  return <Silhouette className={className} />;
}

function Silhouette({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 200 220"
      preserveAspectRatio="xMidYMax meet"
      className={cn("absolute inset-0 h-full w-full", className)}
      role="img"
      aria-label="Foto pendiente"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#84C4E9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F72280" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Cabeza, cuello y hombros en una sola forma */}
      <path
        d="M6 220C6 180 14 152 42 140C62 132 76 128 85 119V105C76 98 70 87 70 72C70 50 84 36 100 36C116 36 130 50 130 72C130 87 124 98 115 105V119C124 128 138 132 158 140C186 152 194 180 194 220Z"
        fill={`url(#${id}-body)`}
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.5"
      />
      {/* Escote y sisas de la camiseta de tirantes */}
      <g fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" strokeLinecap="round">
        <path d="M74 126C80 144 89 152 100 152C111 152 120 144 126 126" />
        <path d="M52 138C62 162 62 192 58 220M148 138C138 162 138 192 142 220" />
      </g>
    </svg>
  );
}
