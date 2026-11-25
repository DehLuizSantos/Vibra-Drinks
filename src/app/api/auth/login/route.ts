import { NextResponse, type NextRequest } from "next/server";
import { findUserByEmail } from "@/lib/repositories/usersRepository";
import { DUMMY_HASH, verifyPassword } from "@/lib/auth/password";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth/session";
import { isRateLimited, resetRateLimit } from "@/lib/auth/rateLimit";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limitKey = `${ip}:${email}`;
  if (isRateLimited(limitKey)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 }
    );
  }

  const user = await findUserByEmail(email);
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !valid) {
    return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 });
  }

  resetRateLimit(limitKey);
  const sessionUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  const response = NextResponse.json({ user: sessionUser });
  response.cookies.set(SESSION_COOKIE, createSessionToken(sessionUser), sessionCookieOptions);
  return response;
}
