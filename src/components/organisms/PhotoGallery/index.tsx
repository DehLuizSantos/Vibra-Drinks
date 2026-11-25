"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppMenuStore } from "@/store/useMenuStore";

const AUTOPLAY_MS = 5000;

const goldBorder = {
  border: "2px solid transparent",
  background:
    "linear-gradient(#191919, #191919) padding-box, linear-gradient(135deg, #996A01, #FFB001, #996A01) border-box"
};

export default function PhotoGallery() {
  const { galleryPhotos, currentEventId } = useAppMenuStore();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = galleryPhotos.length;
  const photo = galleryPhotos[index];

  // Volta para a primeira foto sempre que o depoimento exibido (evento) mudar.
  useEffect(() => setIndex(0), [currentEventId]);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  };

  return (
    <div className="w-full max-w-148 mx-auto md:mx-0 px-4 md:px-0 mb-9">
      <div className="flex items-center justify-between mb-4">
        <h3 className="display-marcellus text-white-500 text-xl md:text-2xl">
          Galeria de eventos
        </h3>
      </div>

      <div
        className="relative w-full aspect-[4/3] rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl overflow-hidden"
        style={goldBorder}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={e => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carrossel"
        aria-label="Galeria de fotos dos eventos"
      >
        {total === 0 ? (
          <div className="flex h-full items-center justify-center px-6">
            <p className="text-white-300 text-center display-marcellus">
              Este evento ainda não tem fotos na galeria.
            </p>
          </div>
        ) : (
          <>
            {galleryPhotos.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- URLs externas cadastradas pelo admin
              <img
                key={p.id}
                src={p.url}
                alt={p.title}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={i !== index}
              />
            ))}

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black-500/95 via-black-500/60 to-transparent px-6 pt-16 pb-9 text-start">
              <p className="display-font text-gold text-base md:text-xl">{photo.title}</p>
              {photo.phrase && (
                <p className="display-marcellus text-white-500 text-sm md:text-base mt-1">
                  {photo.phrase}
                </p>
              )}
              <p className="display-marcellus text-white-300/70 text-xs uppercase tracking-widest mt-2">
                {photo.eventDescription}
              </p>
            </div>

            {total > 1 && (
              <>
                <button
                  onClick={() => goTo(index - 1)}
                  className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 z-20 text-gold text-4xl leading-none hover:opacity-80"
                  aria-label="Foto anterior"
                >
                  ‹
                </button>
                <button
                  onClick={() => goTo(index + 1)}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 z-20 text-gold text-4xl leading-none hover:opacity-80"
                  aria-label="Próxima foto"
                >
                  ›
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {galleryPhotos.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? "bg-gold w-4" : "w-2 bg-white-300/50 hover:bg-gold/50"
                      }`}
                      aria-label={`Ir para foto ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
