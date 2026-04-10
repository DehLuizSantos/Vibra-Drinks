"use client";

import { useState } from "react";
import Image from "next/image";
import Divider from "@/components/atoms/divider";
import { useStore } from "zustand";
import { useAppMenuStore } from "@/store/useMenuStore";

export type CardItem = {
  name: string;
  type: "casamento" | "corporativos" | "intimos";
  eventDescription:string;
  image: string;
  description: string;
};

const typeLabels: Record<CardItem["type"], string> = {
  casamento: "Casamento",
  corporativos: "Corporativos",
  intimos: "Íntimos"
};

export default function CardClientOpinion() {
  const [current, setCurrent] = useState(0);
  const { items } = useStore(useAppMenuStore);

  const prev = () => setCurrent(i => (i - 1 + items.length) % items.length);
  const next = () => setCurrent(i => (i + 1) % items.length);

  const card = items[current];

  return (
    <div
      className="relative w-full h-110 rounded-tl-[90px] rounded-tr-[90px] rounded-br-[60px] rounded-bl-[60px] overflow-hidden md:w-155 md:h-130"
      style={{
        border: "2px solid transparent",
        background:
          "linear-gradient(#191919, #191919) padding-box, linear-gradient(135deg, #996A01, #FFB001, #996A01) border-box"
      }}
    >
      {/* Background image */}
      <Image
        src={card?.image}
        alt={card?.name}
        fill
        className="object-cover opacity-40"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black-500/60 z-1" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 py-6">
        <div className="text-center">
          {/* Name / Divider / Type */}
          <p className="display-font text-white-500 text-base">
            {card?.name}
          </p>
          <Divider />
          <p className="display-marcellus text-gold text-sm uppercase tracking-widest">
            {card?.eventDescription}
          </p>
          <p>⭐⭐⭐⭐⭐</p>         
        </div>
        {/* Description — vertically centered */}
        <div className="flex-1 flex items-start pt-8 justify-center">
          <p className="display-marcellus text-white-500 text-center text-xs leading-relaxed">
            &ldquo;{card?.description}&rdquo;
          </p>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 z-20 text-gold text-4xl leading-none hover:opacity-80 transition-opacity"
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 text-gold text-4xl leading-none hover:opacity-80 transition-opacity"
        aria-label="Próximo"
      >
        ›
      </button>
    </div>
  );
}
