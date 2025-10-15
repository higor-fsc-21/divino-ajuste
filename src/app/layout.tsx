import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divino Ajuste - Ateliê de Costuras | Ajustes e Consertos de Roupas",
  description:
    "Ateliê de costuras especializado em ajustes e consertos de roupas. Simulador de orçamento online, atendimento personalizado com Elione Bento. Serviços de qualidade em São Paulo.",
  keywords:
    "costura, ateliê, ajustes, consertos, roupas, orçamento, São Paulo, Elione Bento",
  authors: [{ name: "Elione Bento" }],
  openGraph: {
    title: "Divino Ajuste - Ateliê de Costuras",
    description:
      "Ateliê de costuras especializado em ajustes e consertos de roupas. Faça seu orçamento online!",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
