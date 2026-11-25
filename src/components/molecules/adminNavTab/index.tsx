"use client";

import Link from "next/link";
import { useSessionStore } from "@/store/useSessionStore";

type AdminNavTabProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

/** Aba exibida ao lado do "Solicitar Orçamento" quando há um administrador logado. */
export default function AdminNavTab({ variant = "desktop", onNavigate }: AdminNavTabProps) {
  const user = useSessionStore(state => state.user);
  if (user?.role !== "admin") return null;

  const isMobile = variant === "mobile";

  return (
    <Link
      href="/admin"
      onClick={onNavigate}
      className={`group flex flex-col border border-gold rounded-2xl px-4 py-1.5 hover:bg-gold/10 transition-colors ${
        isMobile ? "items-center mx-auto w-50" : "items-start"
      }`}
    >
      <span className="display-marcellus text-white-500 text-sm leading-tight max-w-40 truncate">
        {user.name}
      </span>
      <span className="display-marcellus text-gold text-xs leading-tight group-hover:underline">
        Ver menu administrativo
      </span>
    </Link>
  );
}
