"use client";

import { useAppStore } from "@/store/useStore";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useActiveSection } from "@/hooks/useActiveSection";
import Image from "next/image";
import Link from "next/link";

export default function NavbarMobile() {
  const { setMenuOpen } = useAppStore();
  const { handleNavigation } = useSmoothScroll();
  const activeSection = useActiveSection({
    sections: ["sobre", "servicos", "opiniao"],
    offset: 100
  });

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    handleNavigation(targetId, "/", 80);
  };

  const getLinkClass = (sectionId: string) => {
    const baseClass =
      "text-white-300 display-font hover:text-gold transition-colors text-sm tracking-wider cursor-pointer";
    const activeClass =
      activeSection === sectionId
        ? "text-gold border-b-2 border-gold pb-2 w-[150px] mx-auto"
        : "";

    return `${baseClass} ${activeClass}`;
  };

  return (
    <nav className="border-2 border-gold rounded-md md:hidden bg-black-300 p-30 flex flex-col justify-center gap-15 h-full fixed top-0 left-0 right-0 text-center z-50">
      <div
        className="absolute top-12 right-7 flex align-end justify-end"
        onClick={() => setMenuOpen(false)}
      >
        <Image src="/icons/close.svg" alt="close" width="30" height="30" />
      </div>
      <div className="flex-col align-center justify-center text-center ">
        <Link
          href="/"
          className="text-gold font-bold text-xl tracking-widest flex justify-center items-center"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={"/Logo-mobile.svg"}
            alt="Vibra Drinks"
            width={50}
            height={89}
          />
        </Link>
        <p className="text-xs mt-1 display-font text-bold bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)] bg-clip-text text-transparent">
          Drinks com alma
        </p>
      </div>
      <a
        href="#sobre"
        onClick={e => handleClick(e, "sobre")}
        className={`${getLinkClass("sobre")} my-8 md:my-0`}
      >
        Sobre nós
      </a>
      <a
        href="#servicos"
        onClick={e => handleClick(e, "servicos")}
        className={`${getLinkClass("servicos")} my-8 md:my-0`}
      >
        Nossos serviços
      </a>
      <a
        href="#opiniao"
        onClick={e => handleClick(e, "opiniao")}
        className={`${getLinkClass("opiniao")} my-8 md:my-0`}

      >
        Nossos clientes
      </a>
      <Link
        href="/orcamento"
        onClick={() => setMenuOpen(false)}
        className="mt-30 bg-gold display-font w-50 text-white-500 py-2 text-sm font-bold hover:outline-1 outline-amber-50 transition-opacity rounded-lg mx-auto"
      >
        Faça um orçamento
      </Link>
    </nav>
  );
}
