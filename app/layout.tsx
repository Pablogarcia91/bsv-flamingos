import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
