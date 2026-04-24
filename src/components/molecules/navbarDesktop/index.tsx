"use client";

import Link from "next/link";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function NavbarDesktop() {
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
    handleNavigation(targetId, "/", 80);
  };

  const getLinkClass = (sectionId: string) => {
    const baseClass =
      "text-white-300 display-marcellus hover:text-gold transition-colors text-lg tracking-wider cursor-pointer pb-2";
    const activeClass =
      activeSection === sectionId
        ? "text-gold border-b-2 border-gold"
        : "border-b-2 border-transparent hover:border-gold/50";

    return `${baseClass} ${activeClass}`;
  };

  return (
    <nav className="hidden md:flex items-center gap-20">
      <a
        href="#sobre"
        onClick={e => handleClick(e, "sobre")}
        className={getLinkClass("sobre")}
      >
        Sobre nós
      </a>
      <a
        href="#servicos"
        onClick={e => handleClick(e, "servicos")}
        className={getLinkClass("servicos")}
      >
        Nossos serviços
      </a>
      <a
        href="#opiniao"
        onClick={e => handleClick(e, "opiniao")}
        className={getLinkClass("opiniao")}
      >
        Nossos clientes
      </a>
      <Link
        href="/orcamento"
        className="bg-black-500 display-marcellus text-white px-6 py-2 text-lg font-bold hover:outline-1 outline-amber-50 transition-opacity rounded-2xl"
      >
        Solicitar Orçamento
      </Link>
    </nav>
  );
}
