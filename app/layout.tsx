import "./(orpc)/orpc/lib/orpc.server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen | Inteligência em Documentos",
  description:
    "Transforme PDFs extensos em resumos inteligentes em segundos usando IA.",
  keywords: ["PDF", "Resumo", "IA", "Produtividade", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-background
          text-foreground
          selection:bg-primary/20
          selection:text-primary
        `}
      >
        {children}
      </body>
    </html>
  );
}
