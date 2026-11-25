import { EVENT_TYPES, type EventInput, type EventType } from "@/types/event";

export const MAX_PHOTOS_PER_EVENT = 30;

type ValidationResult =
  | { ok: true; data: EventInput }
  | { ok: false; errors: Record<string, string> };

export function isEventType(value: unknown): value is EventType {
  return typeof value === "string" && (EVENT_TYPES as readonly string[]).includes(value);
}

/** Aceita URL http(s) absoluta ou caminho local começando com "/" (ex.: /images/foto.jpg). */
export function isValidImageUrl(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateEventInput(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const input = (body ?? {}) as Record<string, unknown>;

  const name = str(input.name);
  const eventDescription = str(input.eventDescription);
  const image = str(input.image);
  const description = str(input.description);
  const type = input.type;

  if (!name) errors.name = "Informe o nome do cliente.";
  else if (name.length > 120) errors.name = "Máximo de 120 caracteres.";

  if (!isEventType(type)) errors.type = "Selecione o tipo de evento.";

  if (!eventDescription) errors.eventDescription = "Informe a descrição do evento.";
  else if (eventDescription.length > 120) errors.eventDescription = "Máximo de 120 caracteres.";

  if (!image) errors.image = "Envie a imagem de capa.";
  else if (!isValidImageUrl(image)) errors.image = "URL inválida (use http(s):// ou /caminho).";

  if (!description) errors.description = "Informe o depoimento.";
  else if (description.length > 1000) errors.description = "Máximo de 1000 caracteres.";

  const rawPhotos = Array.isArray(input.photos) ? input.photos : [];
  if (rawPhotos.length > MAX_PHOTOS_PER_EVENT) {
    errors.photos = `Máximo de ${MAX_PHOTOS_PER_EVENT} fotos por evento.`;
  }

  const photos = rawPhotos.slice(0, MAX_PHOTOS_PER_EVENT).map((raw, index) => {
    const photo = (raw ?? {}) as Record<string, unknown>;
    const title = str(photo.title);
    const phrase = str(photo.phrase);
    const url = str(photo.url);

    if (!title) errors[`photos.${index}.title`] = "Informe o título.";
    else if (title.length > 80) errors[`photos.${index}.title`] = "Máximo de 80 caracteres.";
    if (phrase.length > 200) errors[`photos.${index}.phrase`] = "Máximo de 200 caracteres.";
    if (!url) errors[`photos.${index}.url`] = "Foto não enviada.";
    else if (!isValidImageUrl(url)) errors[`photos.${index}.url`] = "URL inválida.";

    return { title, phrase, url };
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, type: type as EventType, eventDescription, image, description, photos }
  };
}
