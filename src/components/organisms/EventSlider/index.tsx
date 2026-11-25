"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Chevron from "@/components/atoms/Chevron";
import GoldParticles from "@/components/atoms/GoldParticles";
import { useAppMenuStore } from "@/store/useMenuStore";
import { EVENT_TYPE_LABELS } from "@/types/event";

const AUTOPLAY_MS = 7000;

const pad = (n: number) => String(n).padStart(2, "0");

const goldBorder = {
  border: "2px solid transparent",
  background:
    "linear-gradient(#020202, #020202) padding-box, linear-gradient(135deg, #996A01, #FFB001, #996A01) border-box"
};

/** Classe de entrada escalonada do texto do slide ativo. */
function reveal(active: boolean) {
  return `transition-all duration-700 ease-out ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
}

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Evento anterior" : "Próximo evento"}
      className="cursor-pointer flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-black-500/40 text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-black-500 md:h-12 md:w-12"
    >
      <Chevron direction={direction === "prev" ? "left" : "right"} />
    </button>
  );
}

export default function EventSlider() {
  const { filteredItems, currentIndex, menuType, next, prev, setCurrentIndex } = useAppMenuStore();
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = filteredItems.length;
  const nextEvent = total > 1 ? filteredItems[(currentIndex + 1) % total] : null;

  if (total === 0) {
    return (
      <div
        className="mx-4 md:mx-0 grid h-80 place-items-center rounded-tl-[40px] rounded-br-[40px] rounded-tr-2xl rounded-bl-2xl px-6"
        style={goldBorder}
      >
        <p className="display-marcellus text-white-300 text-center">
          Nenhum depoimento disponível para este tipo de evento.
        </p>
      </div>
    );
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative mx-4 md:mx-0 h-[680px] sm:h-[620px] md:h-[78vh] md:min-h-[600px] md:max-h-[860px] overflow-hidden rounded-tl-[40px] rounded-br-[40px] rounded-tr-xl rounded-bl-xl md:rounded-tl-[80px] md:rounded-br-[80px] md:rounded-tr-2xl md:rounded-bl-2xl outline-none"
      style={goldBorder}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onKeyDown={e => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Eventos e depoimentos dos clientes"
    >
      {/* Slides (crossfade) */}
      {filteredItems.map((event, i) => {
        const active = i === currentIndex;
        const photoCount = event.photos.length;
        return (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!active}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
          >
            <div className={`absolute inset-0 ${active ? "vd-kenburns" : ""}`}>
              <Image
                src={event.image}
                alt={event.eventDescription}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>

            {/* Escurecimento para leitura do texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black-500 via-black-500/70 to-black-500/20 md:bg-gradient-to-r md:from-black-500/95 md:via-black-500/60 md:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black-500/90 to-transparent" />

            {/* Conteúdo do evento */}
            <div className="relative flex h-full flex-col justify-end gap-4 px-6 pb-28 pt-10 text-start md:max-w-3xl md:justify-center md:px-14 md:pb-24 lg:px-20">
              <span
                className={`display-marcellus text-xs uppercase tracking-[0.3em] text-gold md:text-sm ${reveal(active)}`}
                style={{ transitionDelay: active ? "200ms" : "0ms" }}
              >
                {EVENT_TYPE_LABELS[event.type]}
              </span>

              <h3
                className={`display-marcellus text-3xl leading-tight text-white-500 md:text-5xl lg:text-6xl ${reveal(active)}`}
                style={{ transitionDelay: active ? "350ms" : "0ms" }}
              >
                {event.eventDescription}
              </h3>

              <div
                className={`h-px w-20 bg-gradient-to-r from-gold to-transparent ${reveal(active)}`}
                style={{ transitionDelay: active ? "450ms" : "0ms" }}
              />

              <p
                className={`display-marcellus max-w-xl text-sm italic leading-relaxed text-white-300/90 line-clamp-5 md:text-lg md:line-clamp-4 ${reveal(active)}`}
                style={{ transitionDelay: active ? "550ms" : "0ms" }}
              >
                &ldquo;{event.description}&rdquo;
              </p>

              <div
                className={`flex flex-wrap items-center gap-x-6 gap-y-4 ${reveal(active)}`}
                style={{ transitionDelay: active ? "700ms" : "0ms" }}
              >
                <div>
                  <p className="display-font text-sm text-white-500 md:text-base">{event.name}</p>
                  <p className="mt-1 text-sm tracking-widest text-gold" aria-label="5 estrelas">
                    ★★★★★
                  </p>
                </div>

                {photoCount > 0 && (
                  <Link
                    href={`/eventos/${event.id}`}
                    tabIndex={active ? 0 : -1}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gold/80 px-7 text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-black-500"
                  >
                    <span className="display-marcellus text-xs uppercase leading-none tracking-[0.3em]">
                      Ver fotos
                    </span>
                    <Chevron direction="right" size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <GoldParticles className="z-20" />

      {/* Navegação numerada vertical (desktop) */}
      {total > 1 && (
        <nav
          className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-10"
          aria-label="Selecionar evento"
        >
          {filteredItems.map((event, i) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ir para ${event.eventDescription}`}
              aria-current={i === currentIndex}
              className={`cursor-pointer group flex items-center justify-end gap-3 display-marcellus text-sm transition-colors ${
                i === currentIndex ? "text-gold" : "text-white-300/60 hover:text-white-500"
              }`}
            >
              <span
                className={`h-px bg-gold transition-all duration-500 ${
                  i === currentIndex ? "w-10" : "w-0 group-hover:w-4"
                }`}
              />
              {pad(i + 1)}
            </button>
          ))}
        </nav>
      )}

      {/* Barra inferior: progresso, próximo evento e setas */}
      {total > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 px-6 pb-6 md:px-14 lg:px-20">
          {/* Bolinhas (mobile) */}
          <div className="flex gap-2 md:hidden">
            {filteredItems.map((event, i) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir para o evento ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-6 bg-gold" : "w-2 bg-white-300/50"
                }`}
              />
            ))}
          </div>

          {/* Contador (desktop) */}
          <p className="display-marcellus hidden text-sm tracking-widest text-white-300 md:block">
            <span className="text-gold">{pad(currentIndex + 1)}</span> / {pad(total)}
          </p>

          <div className="flex items-center gap-4">
            {nextEvent && (
              <button
                type="button"
                onClick={next}
                className="cursor-pointer group hidden items-center gap-3 rounded-xl border border-white-300/20 bg-black-500/50 p-2 pr-4 text-start backdrop-blur-sm transition-colors hover:border-gold lg:flex"
              >
                <span className="relative h-12 w-16 overflow-hidden rounded-lg">
                  <Image src={nextEvent.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span>
                  <span className="display-marcellus block text-[10px] uppercase tracking-[0.25em] text-gold">
                    Próximo
                  </span>
                  <span className="display-marcellus block max-w-44 truncate text-sm text-white-500">
                    {nextEvent.eventDescription}
                  </span>
                </span>
              </button>
            )}
            <ArrowButton direction="prev" onClick={prev} />
            <ArrowButton direction="next" onClick={next} />
          </div>
        </div>
      )}

      {/* Progresso do autoplay — ao terminar, avança para o próximo evento */}
      {total > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white-300/10">
          <div
            key={`${menuType}-${currentIndex}`}
            className="vd-progress h-full bg-gold"
            style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
            onAnimationEnd={next}
          />
        </div>
      )}
    </div>
  );
}
