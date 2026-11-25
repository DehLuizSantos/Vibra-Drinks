"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Chevron from "@/components/atoms/Chevron";
import type { EventPhoto } from "@/types/event";

type EventPresentationProps = {
  photos: EventPhoto[];
  startIndex: number | null; // null = fechado
  onClose: () => void;
};

const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Painel de apresentação em tela cheia com todas as fotos do evento:
 * 2 por "linha" no desktop, 1 no celular, rolagem vertical com encaixe
 * e controles (fechar / subir / descer) empilhados no canto inferior direito.
 */
export default function EventPresentation({ photos, startIndex, onClose }: EventPresentationProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [row, setRow] = useState(0);
  const [columns, setColumns] = useState(1);
  const open = startIndex !== null;

  const rowCount = Math.ceil(photos.length / columns);

  // 1 ou 2 colunas conforme a largura da tela
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setColumns(media.matches ? 2 : 1);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const scrollToRow = useCallback(
    (target: number, behavior: ScrollBehavior = "smooth") => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const clamped = Math.min(Math.max(target, 0), rowCount - 1);
      const item = scroller.querySelector<HTMLElement>(`[data-photo="${clamped * columns}"]`);
      item?.scrollIntoView({ behavior, block: "start" });
    },
    [rowCount, columns]
  );

  // Ao abrir: posiciona na foto clicada
  useEffect(() => {
    if (startIndex === null) return;
    const target = Math.floor(startIndex / columns);
    setRow(target);
    requestAnimationFrame(() => scrollToRow(target, "auto"));
  }, [startIndex, columns, scrollToRow]);

  // Teclado + trava a rolagem da página por trás
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        scrollToRow(row + 1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        scrollToRow(row - 1);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, row, onClose, scrollToRow]);

  // Atualiza a linha atual conforme o usuário rola
  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setRow(Math.round(scroller.scrollTop / scroller.clientHeight));
  };

  if (!open) return null;

  const controlClass =
    "cursor-pointer flex h-14 w-14 items-center justify-center transition-colors disabled:cursor-default disabled:opacity-40";

  // Portal no <body>: fica fora do "isolation: isolate" da página (que prendia o painel
  // atrás do header e do footer) e cobre a tela inteira.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Apresentação das fotos" className="vd-fade-in fixed inset-0 z-[70] bg-black-500">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="h-full snap-y snap-mandatory overflow-y-auto overscroll-contain"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {photos.map((photo, i) => (
            <figure
              key={photo.id}
              data-photo={i}
              className="relative h-[100svh] snap-start p-1.5 md:p-2 md:[&:last-child:nth-child(odd)]:col-span-2"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes={columns === 2 ? "50vw" : "100vw"}
                  priority={startIndex !== null && Math.abs(i - startIndex) <= 1}
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black-500/85 to-transparent p-5 pr-20 md:p-8">
                  <p className="display-font text-sm text-gold md:text-base">{photo.title}</p>
                  {photo.phrase && (
                    <p className="display-marcellus mt-1 text-sm text-white-300 md:text-base">{photo.phrase}</p>
                  )}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Contador */}
      <p className="display-marcellus pointer-events-none absolute left-5 top-5 rounded-full bg-black-500/60 px-3 py-1 text-xs tracking-widest text-white-300 md:left-8 md:top-8">
        <span className="text-gold">{String(row + 1).padStart(2, "0")}</span> / {String(rowCount).padStart(2, "0")}
      </p>

      {/* Controles: fechar, subir, descer */}
      <div className="absolute bottom-0 right-0 flex flex-col shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar apresentação"
          className={`${controlClass} bg-gold text-black-500 hover:bg-white-500`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollToRow(row - 1)}
          disabled={row <= 0}
          aria-label="Fotos anteriores"
          className={`${controlClass} border-b border-black-300/20 bg-white-500 text-black-500 hover:bg-white-300`}
        >
          <Chevron direction="up" />
        </button>
        <button
          type="button"
          onClick={() => scrollToRow(row + 1)}
          disabled={row >= rowCount - 1}
          aria-label="Próximas fotos"
          className={`${controlClass} bg-white-500 text-black-500 hover:bg-white-300`}
        >
          <Chevron direction="down" />
        </button>
      </div>
    </div>,
    document.body
  );
}
