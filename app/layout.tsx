
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta",
  description: "A tua rede social, feita para conectar pessoas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
