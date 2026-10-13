import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import escudo from "@/public/brand/escudo.png";
import wordmark from "@/public/brand/flamingos-wordmark.svg";
import masqueingenieros from "@/public/brand/sponsors/masqueingenieros.svg";
import { cn } from "@/lib/utils";
import type { SponsorLogoKey } from "@/lib/site";

/** Escudo oficial del club. */
export function BrandMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <Image
      src={escudo}
      alt=""
      width={size}
      height={Math.round(size * (escudo.height / escudo.width))}
      className={cn("shrink-0", className)}
      priority
    />
  );
}

/** Logotipo «Flamingos» (rotulado). */
export function Wordmark({ className, height = 28, alt = "" }: { className?: string; height?: number; alt?: string }) {
  return (
    <Image
      src={wordmark}
      alt={alt}
      height={height}
      width={Math.round(height * (wordmark.width / wordmark.height))}
      className={cn("shrink-0", className)}
      priority
    />
  );
}

export function Brand({ compact = false, subtitle }: { compact?: boolean; subtitle?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="BSV Flamingos, inicio">
      <BrandMark size={compact ? 36 : 42} className="transition-transform group-hover:-rotate-6" />
      <span className="leading-none">
        <Wordmark height={compact ? 26 : 30} />
        {!compact && subtitle && (
          <span className="hidden md:block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 mt-1 pl-1">
            {subtitle}
          </span>
        )}
      </span>
    </Link>
  );
}

const sponsorLogos: Record<SponsorLogoKey, StaticImageData> = {
  masqueingenieros,
};

/** Logo de un patrocinador (versión en blanco, pensada para fondo oscuro). */
export function SponsorLogo({ name, logo, className, height = 48 }: { name: string; logo: SponsorLogoKey; className?: string; height?: number }) {
  const img = sponsorLogos[logo];
  return (
    <Image
      src={img}
      alt={name}
      height={height}
      width={Math.round(height * (img.width / img.height))}
      className={cn("shrink-0", className)}
    />
  );
}
