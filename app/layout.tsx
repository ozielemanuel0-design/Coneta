import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta",
  description: "A tua comunidade começa aqui.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
