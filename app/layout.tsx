import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clima Simples",
  description: "Login simples + consulta de clima por cidade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
