import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GoldParticles from "@/components/atoms/GoldParticles";
import EventMasonry from "@/components/organisms/EventMasonry";
import { getEvent } from "@/lib/repositories/eventsRepository";
import { EVENT_TYPE_LABELS } from "@/types/event";

// Regenerada a cada 60s (e na hora, quando o admin edita/exclui o evento).
export const revalidate = 60;

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await getEvent((await params).id);
  if (!event) return { title: "Evento não encontrado | Vibra Drinks" };
  return {
    title: `${event.eventDescription} | Vibra Drinks`,
    description: `Fotos do evento ${event.eventDescription} (${EVENT_TYPE_LABELS[event.type]}) com a Vibra Drinks.`,
    openGraph: { images: [event.image] }
  };
}

export default async function EventPhotosPage({ params }: PageProps) {
  const event = await getEvent((await params).id);
  if (!event) notFound();

  const photoCount = event.photos.length;

  return (
    <div className="noise-bg border-r-2 border-l-2 border-gold bg-black-500 text-white-500">
      {/* Capa */}
      <section className="relative overflow-hidden">
        <div className="vd-kenburns absolute inset-0">
          <Image src={event.image} alt={event.eventDescription} fill sizes="100vw" priority className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black-500 via-black-500/60 to-black-500/30" />
        <GoldParticles />

        <div className="relative z-10 mx-auto flex max-w-360 flex-col gap-4 px-6 pt-8 pb-12 md:px-16 md:pt-10 md:pb-16 xl:px-24">
          {/* Topo da capa: voltar (esquerda) + CTA (direita, só no desktop) */}
          <div className="mb-6 flex items-center justify-between gap-4 md:mb-10">
            <Link
              href="/#opiniao"
              className="display-marcellus text-sm text-white-300 transition-colors hover:text-gold"
            >
              ← Voltar para o site
            </Link>
            <Link
              href="/orcamento"
              className="display-font hidden rounded-2xl border-2 border-white bg-gold px-6 py-3 text-sm text-white drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] transition-transform hover:scale-105 md:inline-block"
            >
              QUERO UM EVENTO ASSIM
            </Link>
          </div>

          <span className="display-marcellus text-xs uppercase tracking-[0.3em] text-gold md:text-sm">
            {EVENT_TYPE_LABELS[event.type]}
          </span>
          <h1 className="display-marcellus text-4xl leading-tight md:text-6xl">{event.eventDescription}</h1>
          <div className="h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          <p className="display-marcellus max-w-2xl text-sm italic text-white-300/90 md:text-lg">
            &ldquo;{event.description}&rdquo;
          </p>
          <p className="display-font text-sm">
            {event.name} <span className="ml-2 tracking-widest text-gold">★★★★★</span>
          </p>
        </div>
      </section>

      {/* Galeria */}
      <section className="mx-auto max-w-360 px-4 py-16 md:px-16 xl:px-24">
        <div className="border-gradient-bottom mb-10 flex flex-wrap items-end justify-between gap-4 pb-6">
          <h2 className="display-font text-2xl text-gold md:text-4xl">Galeria do evento</h2>
          <p className="display-marcellus text-sm uppercase tracking-widest text-white-300">
            {photoCount} {photoCount === 1 ? "foto" : "fotos"}
          </p>
        </div>

        {photoCount > 0 ? (
          <EventMasonry photos={event.photos} />
        ) : (
          <p className="display-marcellus text-white-300">Este evento ainda não tem fotos.</p>
        )}

        {/* CTA no final: só no mobile (no desktop ele fica no topo) */}
        <div className="mt-16 flex justify-center md:hidden">
          <Link
            href="/orcamento"
            className="display-font rounded-2xl border-2 border-white bg-gold px-8 py-5 text-white drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] md:text-xl"
          >
            QUERO UM EVENTO ASSIM
          </Link>
        </div>
      </section>
    </div>
  );
}
