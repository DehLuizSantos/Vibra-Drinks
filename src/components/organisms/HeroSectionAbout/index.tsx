import Divider from "@/components/atoms/divider";
import Image from "next/image";

export default function HeroSectionAbout() {
  return (
    <section className="md:flex items-center justify-between md:p-16 xl:p-24 md:gap-8 border">
      <div className="p-8 text-center md:text-start max-w-lg shrink-0">
        <div className="text-4xl text-gold display-font md:text-5xl">
          <p>VIBRA</p>
          <p>DRINKS</p>
        </div>
        <h1 className="display-marcellus text-2xl mt-8 text-white-300 md:text-4xl">
          SERVIÇO DE BARMAN ESPECIALIZADO EM EVENTOS PESSOAIS E CORPORATIVOS
        </h1>
        <Divider />
        <h2 className="display-marcellus text-[22px]  text-gold">
          Alto padrão não é uma exigência, é o nosso ponto de partida
        </h2>
      </div>
      <div className="relative w-80 h-80 mx-auto md:w-[38vw] md:h-[38vw] xl:w-178 xl:h-178 border-b-2 border-gold rounded-full overflow-hidden">
        <Image
          src="/images/section1.jpg"
          alt="Alto padrão não é uma exigência, é o nosso ponto de partida"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
