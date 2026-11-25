import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/** Cliente SQL do Neon (HTTP — ideal para funções serverless da Vercel). */
export function db(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL não configurado.");
    client = neon(url);
  }
  return client;
}

export function toIso(value: unknown): string {
  return new Date(value as string | Date).toISOString();
}
