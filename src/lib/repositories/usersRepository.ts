import "server-only";
import { db, toIso } from "@/lib/db/neon";
import type { StoredUser } from "@/types/user";

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const rows = await db()`
    SELECT id, name, email, role, password_hash, created_at
    FROM users WHERE email = ${email.trim().toLowerCase()}`;
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    passwordHash: row.password_hash,
    createdAt: toIso(row.created_at)
  };
}
