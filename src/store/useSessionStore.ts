import { create } from "zustand";
import type { SessionUser } from "@/types/user";

interface SessionState {
  user: SessionUser | null;
  loaded: boolean;
  fetchSession: () => Promise<void>;
  setUser: (user: SessionUser | null) => void;
  logout: () => Promise<void>;
}

export const useSessionStore = create<SessionState>(set => ({
  user: null,
  loaded: false,

  fetchSession: async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      set({ user: data.user ?? null, loaded: true });
    } catch {
      set({ user: null, loaded: true });
    }
  },

  setUser: user => set({ user, loaded: true }),

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    set({ user: null, loaded: true });
  }
}));
