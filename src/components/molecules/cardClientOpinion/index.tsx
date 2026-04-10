"use client";

import Image from "next/image";
import Divider from "@/components/atoms/divider";
import { useAppMenuStore } from "@/store/useMenuStore";

export type CardItem = {
  name: string;
  type: "casamento" | "corporativos" | "intimos";
  eventDescription: string;
  image: string;
  description: string;
};

export default function CardClientOpinion() {
  const {
    filteredItems,
    currentIndex,
    next,
    prev,
    setCurrentIndex
  } = useAppMenuStore();

  const card = filteredItems[currentIndex];
  const hasItems = filteredItems.length > 0;

  if (!hasItems) {
    return (
      <div
        className="relative w-full h-110 rounded-tl-[90px] rounded-tr-[90px] rounded-br-[60px] rounded-bl-[60px] overflow-hidden md:w-155 md:h-130 flex items-center justify-center"
        style={{
          border: "2px solid transparent",
          background:
            "linear-gradient(#191919, #191919) padding-box, linear-gradient(135deg, #996A01, #FFB001, #996A01) border-box"
        }}
      >
        <p className="text-white-500 text-center display-marcellus px-4">
          Nenhum depoimento disponível para este tipo de evento.
        </p>
      </div>
    );
  }

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
        src={card.image}
        alt={card.name}
        fill
        className="object-cover opacity-40"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black-500/60 z-1" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 py-6">
        <div className="text-center">
          <p className="display-font text-white-500 text-base">
            {card.name}
          </p>
          <Divider />
          <p className="display-marcellus text-gold text-sm uppercase tracking-widest">
            {card.eventDescription}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) =>
              <span key={i} className="text-gold text-sm">
                ★
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 flex items-center justify-center pt-8">
          <p className="display-marcellus text-white-500 text-center text-xs leading-relaxed max-w-[90%] md:text-lg">
            &ldquo;{card.description}&rdquo;
          </p>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className={`absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 z-20 text-gold text-4xl leading-none transition-opacity ${filteredItems.length <=
        1
          ? "opacity-30 cursor-not-allowed"
          : "hover:opacity-80"}`}
        aria-label="Anterior"
        disabled={filteredItems.length <= 1}
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className={`absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 text-gold text-4xl leading-none transition-opacity ${filteredItems.length <=
        1
          ? "opacity-30 cursor-not-allowed"
          : "hover:opacity-80"}`}
        aria-label="Próximo"
        disabled={filteredItems.length <= 1}
      >
        ›
      </button>

      {/* Indicador de página */}
      {filteredItems.length > 1 &&
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {filteredItems.map((_, idx) =>
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx ===
              currentIndex
                ? "bg-gold w-4"
                : "bg-white-300/50 hover:bg-gold/50"}`}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          )}
        </div>}
    </div>
  );
}
