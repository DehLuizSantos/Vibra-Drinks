"use client";

import { useState } from "react";
import AdminEventForm from "@/components/organisms/AdminEventForm";
import { EVENT_TYPE_LABELS, type VibraEvent } from "@/types/event";

type Mode = { kind: "list" } | { kind: "create" } | { kind: "edit"; event: VibraEvent };

export default function AdminEventsManager({ initialEvents }: { initialEvents: VibraEvent[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [mode, setMode] = useState<Mode>({ kind: "list" });
  const [message, setMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSaved = (saved: VibraEvent) => {
    setEvents(prev => {
      const exists = prev.some(e => e.id === saved.id);
      return exists ? prev.map(e => (e.id === saved.id ? saved : e)) : [saved, ...prev];
    });
    setMessage(mode.kind === "edit" ? "Evento atualizado." : "Evento cadastrado.");
    setMode({ kind: "list" });
  };

  const handleDelete = async (event: VibraEvent) => {
    if (!window.confirm(`Excluir o evento "${event.eventDescription}" de ${event.name}?`)) return;
    setDeletingId(event.id);
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setEvents(prev => prev.filter(e => e.id !== event.id));
      setMessage("Evento excluído.");
    } catch {
      setMessage("Não foi possível excluir o evento.");
    } finally {
      setDeletingId(null);
    }
  };

  if (mode.kind !== "list") {
    return (
      <AdminEventForm
        key={mode.kind === "edit" ? mode.event.id : "new"}
        event={mode.kind === "edit" ? mode.event : null}
        onSaved={handleSaved}
        onCancel={() => setMode({ kind: "list" })}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="display-font text-gold text-xl md:text-2xl">Eventos</h2>
        <button
          onClick={() => {
            setMessage(null);
            setMode({ kind: "create" });
          }}
          className="cursor-pointer border-2 border-white bg-gold px-6 py-3 text-white rounded-2xl display-font text-sm drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)]"
        >
          + ADICIONAR EVENTO
        </button>
      </div>

      {message && (
        <p role="status" className="display-marcellus text-gold text-sm">
          {message}
        </p>
      )}

      {events.length === 0 ? (
        <p className="display-marcellus text-white-300">Nenhum evento cadastrado.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {events.map(event => (
            <li
              key={event.id}
              className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-gold/40 bg-black-300/60 p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- URL cadastrada pelo admin */}
              <img
                src={event.image}
                alt=""
                className="h-20 w-full md:w-28 object-cover rounded-lg border border-gold/30"
              />
              <div className="flex-1 min-w-0">
                <p className="display-marcellus text-gold text-xs uppercase tracking-widest">
                  {EVENT_TYPE_LABELS[event.type]}
                </p>
                <p className="display-font text-white-500 truncate">{event.eventDescription}</p>
                <p className="display-marcellus text-white-300 text-sm">
                  {event.name} · {event.photos.length} {event.photos.length === 1 ? "foto" : "fotos"}
                </p>
              </div>
              <div className="flex gap-3 display-marcellus text-sm">
                <button
                  onClick={() => {
                    setMessage(null);
                    setMode({ kind: "edit", event });
                  }}
                  className="cursor-pointer text-gold border border-gold rounded-full px-4 py-1.5 hover:bg-gold/10"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(event)}
                  disabled={deletingId === event.id}
                  className="cursor-pointer text-pink-100 border border-pink-100/50 rounded-full px-4 py-1.5 hover:bg-pink-100/10 disabled:opacity-50"
                >
                  {deletingId === event.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
