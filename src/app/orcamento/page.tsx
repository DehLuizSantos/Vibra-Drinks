import FormOrcamento from "@/components/organisms/FormOrcamento";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orçamento | Vibra Drinks",
  description: "Solicite um orçamento personalizado para o seu evento.",
};

export default function OrcamentoPage() {

  return (
    <section className="noise-bg  bg-black-500 text-white-500 py-90  relative border-r-2 border-l-2 border-gold md:p-24">
      <div className="border-gradient-bottom text-center md:text-start max-w-3xl" >
        <h1 className="text-start text-2xl px-3 text-pink-100 py-8 display-marcellus md:text-5xl md:w-135  md:px-0">
          Solicite um orçamento em 3 passos
        </h1>
      </div>
      <FormOrcamento />
    </section>
  );
}
