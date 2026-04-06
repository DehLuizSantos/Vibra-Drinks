import { create } from "zustand";

interface AppState {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
