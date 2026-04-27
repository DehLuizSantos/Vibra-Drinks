import AnimateOnScroll from "@/components/atoms/FadeInSection";
import FormOrcamento from "@/components/organisms/FormOrcamento";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orçamento | Vibra Drinks",
  description: "Solicite um orçamento personalizado para o seu evento.",
};

export default function OrcamentoPage() {

  return (

    <section className="noise-bg  bg-black-500 text-white-500 pb-40 md:pb-70  relative border-r-2 border-l-2 border-gold md:p-24 ">
      <AnimateOnScroll
        variant="dramatic"
        duration={1000}
        threshold={0.2}
        once={false} // Anima toda vez que entrar
      >
        <div className="max-w-360 mx-auto">
          <div className="border-gradient-bottom text-center md:text-start max-w-3xl" >
            <h1 className="text-start text-2xl px-3 text-gold py-8 display-marcellus md:text-5xl md:w-135  md:px-0">
              Solicite um orçamento
            </h1>
          </div>
          <FormOrcamento />
        </div>
      </AnimateOnScroll>
    </section>
  );
}
