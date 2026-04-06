import type { Metadata } from "next";
import { Dela_Gothic_One, Marcellus } from "next/font/google";
import "./globals.css";
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";

// Configuração da fonte Dela Gothic One
const delaGothicOne = Dela_Gothic_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dela-gothic', // Define a variável CSS
  display: 'swap',
});

// Configuração da fonte Marcellus
const marcellus = Marcellus({
  weight: '400', // Marcellus só tem o peso 400
  subsets: ['latin'],
  variable: '--font-marcellus', // Define a variável CSS
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vibra Drinks",
  description: "Experiências únicas em bebidas para o seu evento.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${delaGothicOne.variable} ${marcellus.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}