"use client";

import Image from "next/image";
import { useState } from "react";
import EventPresentation from "@/components/organisms/EventPresentation";
import type { EventPhoto } from "@/types/event";

/** Galeria em colunas de alturas variadas (masonry); clicar abre o painel de apresentação. */
export default function EventMasonry({ photos }: { photos: EventPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Ampliar foto: ${photo.title}`}
            className="cursor-pointer group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white-300/10 transition-colors hover:border-gold"
          >
            <Image
              src={photo.url}
              alt={photo.title}
              width={800}
              height={600}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black-500/90 via-black-500/20 to-transparent p-5 text-start opacity-100 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="display-font text-sm text-gold md:text-base">{photo.title}</span>
              {photo.phrase && (
                <span className="display-marcellus mt-1 text-sm text-white-300">{photo.phrase}</span>
              )}
            </span>
          </button>
        ))}
      </div>

      <EventPresentation photos={photos} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
    </>
  );
}
