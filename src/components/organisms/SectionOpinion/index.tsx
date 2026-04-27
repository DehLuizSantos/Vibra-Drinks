"use client";

import ButtonCta from "@/components/molecules/buttonCta";
import CardClientOpinion from "@/components/molecules/cardClientOpinion";
import MenuOpiniao from "@/components/molecules/menuOpiniao";

export default function SectionOpinion() {
  return (
    <section className="md:p-16 xl:p-18">
      <div className="md:flex align-center justify-center text-center flex-wrap  md:text-start gap-10">
        <div className="">
          <div className="border-gradient-bottom text-center md:text-start">
            <h2 className="text-2xl px-4 text-gold py-8 display-font md:text-4xl xl:text-5xl md:w-full md:px-0">
              A opinião de quem vive a excelência
            </h2>
          </div>
          <p className="px-3.5 py-8 text-white-500 display-marcellus text-2xl md:px-0 md:w-full md:py-3.5">
            Veja o que nossos clientes falam da experiência
          </p>
          <div className=" flex justify-center 2xl:justify-start">
            <MenuOpiniao />
          </div>
          <div className="hidden w-full p-4 max-w-148 2xl:flex justify-start">
            <ButtonCta />
          </div>
        </div>
        <div className="">
          <div className="flex justify-center p-5">
            <CardClientOpinion />
          </div>

          <div className="w-full p-4   2xl:hidden">
            <ButtonCta />
          </div>
        </div>
      </div>
    </section>
  );
}
