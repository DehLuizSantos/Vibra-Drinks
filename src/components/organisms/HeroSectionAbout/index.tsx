import Divider from "@/components/atoms/divider";
import Image from "next/image";

export default function HeroSectionAbout() {
  return (
    <section className="md:flex items-center justify-between p-24">
      <div className="p-8 text-center md:text-start max-w-lg">
        <div className="text-4xl text-pink-100 display-font md:text-5xl">
          <p>VIBRA</p>
          <p>Drinks</p>
        </div>
        <h1 className="display-marcellus text-2xl mt-8 text-white-300 md:text-4xl">
          SERVIÇO DE BARMAN ESPECIALIZADO EM EVENTOS PESSOAIS E CORPORATIVOS
        </h1>
        <Divider />
        <h2 className="display-marcellus text-[22px] bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)] bg-clip-text text-transparent ">
          Alto padrão não é uma exigência, é o nosso ponto de partida
        </h2>
      </div>
      <div className="relative w-80 h-80 mx-auto md:w-[712px] md:h-[712px] border-b-2 border-gold rounded-full">
        <Image
          src="/images/secction1.png"
          alt="Alto padrão não é uma exigência, é o nosso ponto de partida"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
