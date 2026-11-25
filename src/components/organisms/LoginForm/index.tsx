"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field } from "@/components/atoms/Field";
import { inputClass } from "@/components/organisms/Steeper";
import { useSessionStore } from "@/store/useSessionStore";

function safeRedirect(target: string | null): string {
  // Só permite caminhos internos, evitando redirecionamento para outros sites.
  return target && target.startsWith("/") && !target.startsWith("//") ? target : "/admin";
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useSessionStore(state => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Não foi possível entrar.");
        return;
      }
      setUser(data.user);
      router.replace(safeRedirect(searchParams.get("next")));
      router.refresh();
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-107.5 flex flex-col gap-6 px-4 md:px-0" noValidate>
      <Field label="E-mail">
        <input
          type="email"
          autoComplete="username"
          placeholder="seu@email.com"
          className={inputClass}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
        />
      </Field>
      <Field label="Senha">
        <input
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </Field>

      {error && (
        <p role="alert" className="display-marcellus text-pink-100 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer border-2 border-white bg-gold py-4 text-white rounded-2xl w-full drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] display-font disabled:opacity-60 disabled:cursor-wait"
      >
        {loading ? "ENTRANDO..." : "ENTRAR"}
      </button>
    </form>
  );
}
