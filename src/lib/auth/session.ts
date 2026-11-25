import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { SessionUser } from "@/types/user";

export const SESSION_COOKIE = "vibra_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 horas

type SessionPayload = SessionUser & { exp: number };

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET não configurado (mínimo 32 caracteres).");
  }
  return "dev-only-insecure-secret-change-me-please-0000";
}

function sign(data: string): string {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function createSessionToken(user: SessionUser): string {
  const payload: SessionPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function verifySessionToken(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = Buffer.from(sign(data));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { id: payload.id, name: payload.name, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS
};

/** Usuário logado na requisição atual (Server Components / Route Handlers). */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function getAdminSession(): Promise<SessionUser | null> {
  const session = await getSession();
  return session?.role === "admin" ? session : null;
}
