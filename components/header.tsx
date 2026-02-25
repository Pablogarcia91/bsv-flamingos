import Link from "next/link";

export function Header() {
  return (
    <header className="text-center py-6 md:py-8 border-b-2 border-vice-pink mb-10">
      <Link href="/">
        <h1 className="font-bebas text-3xl md:text-5xl lg:text-6xl tracking-wider text-vice-pink flex items-center justify-center gap-3 md:gap-4 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-2xl md:text-4xl">🦩</span>
          BSV FLAMINGOS
          <span className="text-2xl md:text-4xl">🦩</span>
        </h1>
      </Link>
      <div className="text-vice-blue text-xs md:text-sm font-semibold tracking-wide uppercase mt-2">
        Liga Segunda Alquiería del bàsquet • Temporada 2025-26
      </div>
    </header>
  );
}
