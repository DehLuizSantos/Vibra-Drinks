import HeroSectionAbout from "@/components/organisms/HeroSectionAbout";
import SectionOpinion from "@/components/organisms/SectionOpinion";
import SectionService from "@/components/organisms/SectionService";

export default function Home() {
  return (
    <div className="noise-bg border border-r-2 border-l-2 border-yellow-20 bg-black-500">
      <div className="md:w-360 mx-auto">
        {/* Hero Section */}
        <section id="sobre" className="bg-black-500 scroll-mt-20">
          <HeroSectionAbout />
        </section>

        {/* Services Section */}
        <section id="servicos" className="noise-bg py-60 scroll-mt-20">
          <SectionService />
        </section>

        {/* CTA Section */}
        <section id="opiniao" className="py-60 scroll-mt-20">
          <SectionOpinion />
        </section>
      </div>
    </div>
  );
}
