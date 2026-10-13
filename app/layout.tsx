import type { Metadata } from "next";
import { Bebas_Neue, Rajdhani } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Ticker } from "@/components/site/ticker";
import { Footer } from "@/components/site/footer";
import { currentSeason } from "@/lib/data";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const rajdhani = Rajdhani({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-rajdhani", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "BSV Flamingos · Estadísticas",
    template: "%s · BSV Flamingos",
  },
  description: `Estadísticas, partidos y plantilla del BSV Flamingos · ${currentSeason.league} · Temporada ${currentSeason.label}`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bebas.variable} ${rajdhani.variable}`}>
      <body className="antialiased min-h-dvh flex flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-vice-pink focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Saltar al contenido
        </a>
        <Ticker />
        <Navbar seasonId={currentSeason.id} seasonLabel={currentSeason.label} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
