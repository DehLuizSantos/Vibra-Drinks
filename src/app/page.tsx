import AnimateOnScroll from "@/components/atoms/FadeInSection";
import HeroSectionAbout from "@/components/organisms/HeroSectionAbout";
import SectionOpinion from "@/components/organisms/SectionOpinion";
import SectionService from "@/components/organisms/SectionService";
import { siteMetadata } from "./seo";
import { listEvents } from "@/lib/repositories/eventsRepository";
import type { VibraEvent } from "@/types/event";

export const metadata = siteMetadata;

// Página estática regenerada a cada 60s (e na hora, quando o admin salva/exclui um evento).
export const revalidate = 60;

async function loadEvents(): Promise<VibraEvent[]> {
  try {
    return await listEvents();
  } catch (err) {
    console.error("Falha ao carregar eventos do banco:", err);
    return [];
  }
}

export default async function Home() {
  const events = await loadEvents();

  return (
    <div className="noise-bg border border-r-2 border-l-2 border-gold bg-black-500">
      <div className=" mx-auto">
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

        {}
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
            <SectionOpinion initialEvents={events} />
          </AnimateOnScroll>
        </section>
      </div>
    </div>
  );
}
