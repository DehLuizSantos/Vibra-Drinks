import Divider from "@/components/atoms/divider";
import Image from "next/image";

export default function HeroSectionAbout() {
  return (
    <section className="md:flex items-center justify-between md:p-24">
      <div className="p-8 text-center md:text-start max-w-lg">
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
      <div className="relative w-80 h-80 mx-auto md:w-178 md:h-178 border-b-2 border-gold rounded-full">
        <Image
          src="/images/section1.png"
          alt="Alto padrão não é uma exigência, é o nosso ponto de partida"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
