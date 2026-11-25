"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/useSessionStore";

export default function LogoutButton() {
  const router = useRouter();
  const logout = useSessionStore(state => state.logout);

  return (
    <button
      onClick={async () => {
        await logout();
        router.replace("/");
        router.refresh();
      }}
      className="cursor-pointer display-marcellus text-sm text-white-300 border border-white-300/40 rounded-full px-4 py-1.5 hover:border-gold hover:text-gold transition-colors"
    >
      Sair
    </button>
  );
}
