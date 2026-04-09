import HeroSectionAbout from "@/components/organisms/HeroSectionAbout";
import SectionOpinion from "@/components/organisms/SectionOpinion";
import SectionService from "@/components/organisms/SectionService";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" noise-bg border  border-r-2 border-l-2 border-yellow-20 bg-black-500">
      {/* Hero Section */}
      <div className="md:w-360 mx-auto">
        <div id="sobre" className=" bg-black-500 ">
          <HeroSectionAbout />
        </div>

        {/* Services Section */}
        <div id="servicos" className="noise-bg    py-60  ">
          <SectionService />
        </div>

        {/* CTA Section */}
        <div id="opiniao" className="  py-60 ">
          <SectionOpinion />
        </div>
      </div>
    </div>
  );
}
