import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lupia - Asistente Comercial IA",
  description: "Copiloto de IA para crear y negociar propuestas comerciales en tiempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
