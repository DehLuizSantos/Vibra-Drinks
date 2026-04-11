import AnimateOnScroll from "@/components/atoms/FadeInSection";
import HeroSectionAbout from "@/components/organisms/HeroSectionAbout";
import SectionOpinion from "@/components/organisms/SectionOpinion";
import SectionService from "@/components/organisms/SectionService";

export default function Home() {
  return (
    <div className="noise-bg border border-r-2 border-l-2 border-yellow-20 bg-black-500">
      <div className="md:w-360 mx-auto">
        {/* Hero Section - Entrada Dramática */}
        <section id="sobre" className="bg-black-500 scroll-mt-20">
          <AnimateOnScroll
            variant="dramatic"
            duration={900}
            threshold={0.2}
            delay={100}
            once={false} // Anima toda vez que entrar
          >
            <HeroSectionAbout />
          </AnimateOnScroll>
        </section>

        { }
        <section id="servicos" className="noise-bg py-60 scroll-mt-20">
          <AnimateOnScroll
            variant="fade"
            duration={800}
            delay={100}
            threshold={0.3}
            once={false}
          >
            <SectionService />
          </AnimateOnScroll>
        </section>

        {/* CTA Section - Scale com bounce */}
        <section id="opiniao" className="py-60 scroll-mt-20">
          <AnimateOnScroll
            variant="fade"
            duration={500}
            delay={100}
            threshold={0.25}
            once={true}
          >
            <SectionOpinion />
          </AnimateOnScroll>
        </section>
      </div>
    </div>
  );
}
