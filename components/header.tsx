import Link from "next/link";

export function Header() {
  return (
    <header className="text-center py-8 md:py-12 mb-10 relative">
      <Link href="/" className="relative inline-block hover:opacity-90 transition-opacity">
        <h1 className="font-bebas text-4xl md:text-6xl lg:text-7xl tracking-wider flex items-center justify-center gap-3 md:gap-4 bg-gradient-to-r from-vice-pink via-white to-vice-blue bg-clip-text text-transparent">
          <span className="text-3xl md:text-5xl" aria-hidden="true">🦩</span>
          BSV FLAMINGOS
          <span className="text-3xl md:text-5xl" aria-hidden="true">🦩</span>
        </h1>
      </Link>

      <div className="text-white/70 text-xs md:text-sm font-semibold tracking-widest uppercase mt-3">
        Liga Segunda Alquiería del bàsquet • Temporada 2025-26
      </div>

      {/* Neon divider */}
      <div className="mt-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-vice-pink to-transparent opacity-80" />
        <div className="h-px bg-gradient-to-r from-transparent via-vice-blue to-transparent opacity-40 mt-0.5" />
      </div>
    </header>
  );
}
