// app/obrigado/page.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orçamento Enviado - VibraDrinks",
  description:
    "Seu orçamento foi enviado com sucesso! Em breve entraremos em contato.",
  openGraph: {
    title: "🍸 Orçamento VibraDrinks - Em breve retornamos!",
    description:
      "Recebemos sua solicitação de orçamento. Nosso time entrará em contato em até 24h.",
    images: [
      {
        url: "/Logo-mobile.svg",
        width: 800,
        height: 400,
        alt: "VibraDrinks - Drinks exclusivos"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "🍸 Orçamento Vibra Drinks",
    description: "Solicitação recebida com sucesso!",
    images: ["/Logo-mobile.svg"]
  }
};

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🍸</div>
        <h1 className="text-3xl font-bold text-gold mb-4">
          Orçamento Enviado!
        </h1>
        <p className="text-white-500 mb-6">
          Seu orçamento foi recebido com sucesso. Em breve, nossa equipe entrará
          em contato para personalizar ainda mais sua experiência.
        </p>
        <Link
          href="/"
          className={`border cursor-pointer border-gold bg-pink-300 p-6 text-white-500 rounded-2xl w-full flex text-center drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] md:h-20`}
        >
          <p className="w-full text-center text-2xl display-font">
            Voltar para o site
          </p>
        </Link>
      </div>
    </div>
  );
}
