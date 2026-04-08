import ListServiceItem from "@/components/atoms/ListServiceItem";
import ButtonCta from "@/components/molecules/buttonCta";
import Image from "next/image";

export default function SectionService() {
  const serviceList = [
    "Mais de dez drinks em seu cardápio exclusivo",
    "Nossa equipe é treinada para ser o ponto alto da hospitalidade do seu evento",
    "Copos e taças personalizadas que compõem a estética da sua festa",
    "Menor preço hora do setor",
    "Criação de um drink exclusivo e uma performace especial, para marcar o drink principal",
    "Maxima entrega, com investimento inteligente"
  ];
  return (
    <section>
      <div className="text-center">
        <div className="border-gradient-bottom text-center">
          <h2 className="text-2xl px-4 text-pink-100 py-8 display-font">
            Valor acessível Qualidade de excelencia
          </h2>
        </div>
        <p className="px-3.5 py-8  display-marcellus">
          Flexibilizamos para você fechar negocio sem preocupações
        </p>
        <div className="w-full h-55 relative">
          <Image
            src="/images/section2.png"
            alt="drinks com alma"
            fill
            className="object-contain"
          />
        </div>
        <div className="p-7 ">
          <h3 className="my-3 text-3xl text-white-500 display-marcellus">
            Nosso jeito de servir
          </h3>
          <ol className="my-3.5">
            {serviceList.map(list =>
              <ListServiceItem key={list} item={list} />
            )}
          </ol>
          <ButtonCta />
        </div>
      </div>
    </section>
  );
}
