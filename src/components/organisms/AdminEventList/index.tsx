"use client";

import { useCallback, useState } from "react";
import AdminEventForm from "@/components/organisms/AdminEventForm";
import ConfirmDialog from "@/components/molecules/confirmDialog";
import { EVENT_TYPE_LABELS, type VibraEvent } from "@/types/event";

type Mode = { kind: "list" } | { kind: "create" } | { kind: "edit"; event: VibraEvent };

export default function AdminEventsManager({ initialEvents }: { initialEvents: VibraEvent[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [mode, setMode] = useState<Mode>({ kind: "list" });
  const [message, setMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<VibraEvent | null>(null);
  const closeDeleteDialog = useCallback(() => setToDelete(null), []);

  const handleSaved = (saved: VibraEvent) => {
    setEvents(prev => {
      const exists = prev.some(e => e.id === saved.id);
      return exists ? prev.map(e => (e.id === saved.id ? saved : e)) : [saved, ...prev];
    });
    setMessage(mode.kind === "edit" ? "Evento atualizado." : "Evento cadastrado.");
    setMode({ kind: "list" });
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const event = toDelete;
    setDeletingId(event.id);
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setEvents(prev => prev.filter(e => e.id !== event.id));
      setMessage(`Evento "${event.eventDescription}" excluído.`);
      setToDelete(null);
    } catch {
      setMessage("Não foi possível excluir o evento. Tente novamente.");
      setToDelete(null);
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
                  onClick={() => setToDelete(event)}
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

      <ConfirmDialog
        open={toDelete !== null}
        title="Excluir evento?"
        confirmLabel="Excluir evento"
        danger
        loading={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      >
        {toDelete && (
          <>
            <div className="flex items-center gap-4 rounded-xl border border-white-300/15 bg-black-500/60 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- miniatura da capa */}
              <img
                src={toDelete.image}
                alt=""
                className="h-14 w-20 shrink-0 rounded-lg border border-gold/30 object-cover"
              />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-gold">{EVENT_TYPE_LABELS[toDelete.type]}</p>
                <p className="truncate text-white-500">{toDelete.eventDescription}</p>
                <p className="text-xs text-white-300/70">
                  {toDelete.name} · {toDelete.photos.length} {toDelete.photos.length === 1 ? "foto" : "fotos"}
                </p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed">
              O depoimento sai do site e a capa e as fotos do carrossel são apagadas do armazenamento.{" "}
              <strong className="text-red-300">Essa ação não pode ser desfeita.</strong>
            </p>
          </>
        )}
      </ConfirmDialog>
    </div>
  );
}
