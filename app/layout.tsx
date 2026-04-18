import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "BSV FLAMINGO'S STATS • Miami Vice Edition",
  description: "Liga Segunda Alquiería del bàsquet • Temporada 2025-26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦩</text></svg>" />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="container max-w-7xl mx-auto px-3 md:px-5 py-4 md:py-6 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
