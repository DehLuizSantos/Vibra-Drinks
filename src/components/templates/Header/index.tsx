"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useStore";
import Image from "next/image";
import MenuBurguer from "@/components/atoms/menuBurguer";
import NavbarMobile from "@/components/molecules/navbarMobile";
import NavbarDesktop from "@/components/molecules/navbarDesktop";
import { useEffect, useState } from "react";

export default function Header() {
  const { isMenuOpen, toggleMenu } = useAppStore();
   const [, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
      // Adiciona CSS custom property para o offset
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
  }, []);


  return (
    <header className="bg-black-300 text-white-500 sticky top-0 rouded-lg z-50 border-gold border-2 ">
      <div className="max-w-9xl p-15 flex items-center justify-around">
        <Link href="/" className="text-gold font-bold text-xl tracking-widest flex
        justify-center items-center">
          <Image src={'/Logo.svg'} alt="Vibra Drinks" width={50} height={89} />
          <p className="text-xs  display-font text-bold bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)] bg-clip-text text-transparent">
            Drinks com alma
          </p>
         
        </Link>

        {/* Desktop nav */}
        <NavbarDesktop />

        {/* Mobile hamburger */}
        <MenuBurguer isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <NavbarMobile />
      )}
    </header>
  );
}
