import HeroSectionAbout from "@/components/organisms/HeroSectionAbout";
import SectionService from "@/components/organisms/SectionService";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div id="sobre" className="noise-bg bg-black-500 text-white-500   border-r-2 border-l-2 border-gold">
        <HeroSectionAbout />
      </div>

      {/* Services Section */}
      <div id="servicos" className="noise-bg  bg-black-500 text-white-500 py-60  relative border-r-2 border-l-2 border-gold">
        <SectionService />

      </div>

      {/* CTA Section */}
      <section id="opiniao" className="noise-bg  bg-black-500 text-white-500 py-60 px-30 relative border-r-2 border-l-2 border-gold">
      <h2>Sessão 3</h2>
      </section>
    </>
  );
}
