import "server-only";
import { randomUUID } from "node:crypto";
import { db, toIso } from "@/lib/db/neon";
import type { EventInput, EventPhoto, EventType, VibraEvent } from "@/types/event";

type EventRow = {
  id: string;
  name: string;
  type: EventType;
  event_description: string;
  image: string;
  description: string;
  photos: EventPhoto[];
  created_at: string | Date;
  updated_at: string | Date;
};

function toEvent(row: Record<string, unknown>): VibraEvent {
  const r = row as EventRow;
  return {
    id: r.id,
    name: r.name,
    type: r.type,
    eventDescription: r.event_description,
    image: r.image,
    description: r.description,
    photos: r.photos ?? [],
    createdAt: toIso(r.created_at),
    updatedAt: toIso(r.updated_at)
  };
}

function photosJson(input: EventInput): string {
  return JSON.stringify(input.photos.map(photo => ({ id: randomUUID(), ...photo })));
}

export async function listEvents(type?: EventType): Promise<VibraEvent[]> {
  const sql = db();
  const rows = type
    ? await sql`SELECT * FROM events WHERE type = ${type} ORDER BY created_at DESC`
    : await sql`SELECT * FROM events ORDER BY created_at DESC`;
  return rows.map(toEvent);
}

export async function getEvent(id: string): Promise<VibraEvent | null> {
  const rows = await db()`SELECT * FROM events WHERE id = ${id}`;
  return rows[0] ? toEvent(rows[0]) : null;
}

export async function createEvent(input: EventInput): Promise<VibraEvent> {
  const rows = await db()`
    INSERT INTO events (id, name, type, event_description, image, description, photos)
    VALUES (${randomUUID()}, ${input.name}, ${input.type}, ${input.eventDescription},
            ${input.image}, ${input.description}, ${photosJson(input)}::jsonb)
    RETURNING *`;
  return toEvent(rows[0]);
}

export async function updateEvent(id: string, input: EventInput): Promise<VibraEvent | null> {
  const rows = await db()`
    UPDATE events SET
      name = ${input.name},
      type = ${input.type},
      event_description = ${input.eventDescription},
      image = ${input.image},
      description = ${input.description},
      photos = ${photosJson(input)}::jsonb,
      updated_at = now()
    WHERE id = ${id}
    RETURNING *`;
  return rows[0] ? toEvent(rows[0]) : null;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const rows = await db()`DELETE FROM events WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
