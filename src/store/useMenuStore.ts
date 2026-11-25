// store/useMenuStore.ts
"use client";

import { createContext, createElement, useContext, useState } from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import type { EventPhoto, EventType, VibraEvent } from "@/types/event";

/** Foto da galeria com o contexto do evento ao qual pertence. */
export type GalleryPhoto = EventPhoto & { eventName: string; eventDescription: string };

/** Fotos de UM evento — a galeria mostra só as fotos do depoimento exibido no momento. */
function photosOfEvent(event?: VibraEvent): GalleryPhoto[] {
  if (!event) return [];
  return event.photos.map(photo => ({
    ...photo,
    eventName: event.name,
    eventDescription: event.eventDescription
  }));
}

/** Estado derivado do evento selecionado (índice dentro do filtro atual). */
function selectEvent(filteredItems: VibraEvent[], index: number) {
  const currentEvent = filteredItems[index];
  return {
    currentIndex: index,
    currentEventId: currentEvent?.id ?? null,
    galleryPhotos: photosOfEvent(currentEvent)
  };
}

function deriveFor(allItems: VibraEvent[], menu: EventType) {
  const filteredItems = allItems.filter(item => item.type === menu);
  return { filteredItems, ...selectEvent(filteredItems, 0) };
}

interface AppState {
  allItems: VibraEvent[];
  filteredItems: VibraEvent[];
  galleryPhotos: GalleryPhoto[];
  currentEventId: string | null;
  currentIndex: number;
  menuType: EventType;
  setMenuType: (menu: EventType) => void;
  setCurrentIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
}

function createMenuStore(initialEvents: VibraEvent[]) {
  return createStore<AppState>((set, get) => ({
    allItems: initialEvents,
    ...deriveFor(initialEvents, "casamento"),
    menuType: "casamento",

    setMenuType: menu => {
      set({
        menuType: menu,
        ...deriveFor(get().allItems, menu) // Reseta para o primeiro evento do tipo
      });
    },

    setCurrentIndex: index => {
      const { filteredItems } = get();
      if (index >= 0 && index < filteredItems.length) {
        set(selectEvent(filteredItems, index));
      }
    },

    next: () => {
      const { filteredItems, currentIndex } = get();
      if (filteredItems.length === 0) return;
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      set(selectEvent(filteredItems, nextIndex));
    },

    prev: () => {
      const { filteredItems, currentIndex } = get();
      if (filteredItems.length === 0) return;
      const prevIndex =
        (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      set(selectEvent(filteredItems, prevIndex));
    }
  }));
}

const MenuStoreContext = createContext<StoreApi<AppState> | null>(null);

/**
 * Cria a store com os eventos vindos do banco (renderizados no servidor),
 * assim os depoimentos e a galeria já chegam prontos no HTML.
 */
export function MenuStoreProvider({
  initialEvents,
  children
}: {
  initialEvents: VibraEvent[];
  children: React.ReactNode;
}) {
  const [store] = useState(() => createMenuStore(initialEvents));
  return createElement(MenuStoreContext.Provider, { value: store }, children);
}

export function useAppMenuStore(): AppState;
export function useAppMenuStore<T>(selector: (state: AppState) => T): T;
export function useAppMenuStore<T>(selector?: (state: AppState) => T) {
  const store = useContext(MenuStoreContext);
  if (!store) throw new Error("useAppMenuStore precisa estar dentro de <MenuStoreProvider>.");
  return useStore(store, selector ?? ((state: AppState) => state as unknown as T));
}
