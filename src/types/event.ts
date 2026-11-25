export const EVENT_TYPES = ["casamento", "corporativos", "aniversarios"] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  casamento: "Casamentos",
  corporativos: "Corporativos",
  aniversarios: "Aniversários"
};

/** Foto do carrossel da galeria. */
export type EventPhoto = {
  id: string;
  title: string;
  phrase: string;
  url: string;
};

/** Evento cadastrado pelo administrador (alimenta depoimentos + galeria). */
export type VibraEvent = {
  id: string;
  name: string;
  type: EventType;
  eventDescription: string;
  image: string;
  description: string;
  photos: EventPhoto[];
  createdAt: string;
  updatedAt: string;
};

export type EventInput = Omit<VibraEvent, "id" | "createdAt" | "updatedAt" | "photos"> & {
  photos: Omit<EventPhoto, "id">[];
};
