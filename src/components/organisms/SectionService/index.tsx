import ListServiceItem from "@/components/atoms/ListServiceItem";
import ButtonCta from "@/components/molecules/buttonCta";
import Image from "next/image";

export default function SectionService() {
  const serviceList = [
    "Mais de dez drinks em seu cardápio exclusivo",
    "Nossa equipe é treinada para ser o ponto alto da hospitalidade do seu evento",
    "Copos e taças personalizadas que compõem a estética da sua festa",
    "Destilados de marcas consagradas e frutas selecionadas para um perfil sensorial impecável",
    "Criação de um drink exclusivo e uma performace especial, para marcar o drink principal",
    "Maxima entrega, com investimento inteligente"
  ];
  return (
    <section className="md:p-16 xl:p-24">
      <div className="md:flex align-center justify-between gap-10 text-center md:text-start">
        <div className="text-center md:text-start md:flex-1 md:min-w-0">
          <div className="border-gradient-bottom ">
            <h2 className="text-2xl px-4 text-gold py-8 display-font md:text-4xl md:w-full md:px-0">
              Valor acessível Qualidade de excelencia
            </h2>
          </div>
          <p className="px-3.5 py-8 text-white-500 display-marcellus md:text-2xl md:px-0 md:py-3.5">
            Flexibilizamos para você fechar negocio sem preocupações
          </p>
          <div className="w-full h-55 relative md:h-[38vw] xl:h-112.5">
            <Image
              src="/images/section2.png"
              alt="drinks com alma"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="p-7 md:flex flex-col align-start justify-between column md:flex-1 md:min-w-0">
          <div className="">
            <h3 className="my-3 text-3xl text-white-500 display-marcellus">
              Nosso jeito de servir
            </h3>
            <ol className="my-3.5">
              {serviceList.map(list =>
                <ListServiceItem key={list} item={list} />
              )}
            </ol>
          </div>
          <ButtonCta />
        </div>
      </div>
    </section>
  );
}
