"use client";

import ButtonCta from "@/components/molecules/buttonCta";
import MenuOpiniao from "@/components/molecules/menuOpiniao";
import EventSlider from "@/components/organisms/EventSlider";
import { MenuStoreProvider } from "@/store/useMenuStore";
import type { VibraEvent } from "@/types/event";

export default function SectionOpinion({ initialEvents }: { initialEvents: VibraEvent[] }) {
  return (
    <MenuStoreProvider initialEvents={initialEvents}>
      <SectionOpinionContent />
    </MenuStoreProvider>
  );
}

function SectionOpinionContent() {
  return (
    <section className="md:p-16 xl:p-18">
      {/* Título, subtítulo e filtros */}
      <div className="text-center md:text-start">
        <div className="border-gradient-bottom text-center md:text-start">
          <h2 className="text-2xl px-4 text-gold py-8 display-font md:text-4xl xl:text-5xl md:w-full md:px-0">
            A opinião de quem vive a excelência
          </h2>
        </div>
        <p className="px-3.5 py-8 text-white-500 display-marcellus text-2xl md:px-0 md:w-full md:py-3.5">
          Veja o que nossos clientes falam da experiência
        </p>
        <div className="block min-[1360px]:flex justify-center min-[1360px]:justify-between mb-4">
          <MenuOpiniao />
          {/* Botão de cima: só no desktop (≥ 1360px) */}
          <div className="hidden min-[1360px]:block w-150 p-4">
            <ButtonCta />
          </div>
        </div>
      </div>

      {/* Slider de eventos: um slide por evento do filtro selecionado */}
      <div className="mt-4 mb-8">
        <EventSlider />
      </div>
      {/* Botão de baixo: só abaixo de 1360px */}
      <div className="w-full min-[1360px]:hidden p-4">
        <ButtonCta />
      </div>
    </section>
  );
}
