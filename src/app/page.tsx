import HeroSectionAbout from "@/components/organisms/HeroSectionAbout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="sobre" className="noise-bg bg-black-500 text-white-500   border-r-2 border-l-2 border-gold">
        <HeroSectionAbout />
      </section>

      {/* Services Section */}
      <section id="servicos" className="noise-bg  bg-black-500 text-white-500 py-60 px-30 relative border-r-2 border-l-2 border-gold">
        <h2>Sessão 2</h2>

      </section>

      {/* CTA Section */}
      <section id="opiniao" className="noise-bg  bg-black-500 text-white-500 py-60 px-30 relative border-r-2 border-l-2 border-gold">
      <h2>Sessão 3</h2>
      </section>
    </>
  );
}
