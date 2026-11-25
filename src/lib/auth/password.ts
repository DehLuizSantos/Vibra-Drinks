import "server-only";
import { scrypt, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

function scryptAsync(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, KEY_LENGTH, (err, key) => (err ? reject(err) : resolve(key)))
  );
}

/** Formato: scrypt$<salt>$<hash> (gerado por scripts/create-admin.mjs). */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = await scryptAsync(password, salt);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

// Hash fixo usado quando o e-mail não existe, para o tempo de resposta não revelar isso.
export const DUMMY_HASH = `scrypt$${"0".repeat(32)}$${"0".repeat(KEY_LENGTH * 2)}`;
