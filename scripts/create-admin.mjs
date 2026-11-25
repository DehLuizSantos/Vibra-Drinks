#!/usr/bin/env node
// Cria (ou atualiza a senha de) um usuário administrador no banco (Neon).
// Uso: npm run create-admin -- --name "Nome" --email admin@exemplo.com --password "senhaForte"

import { randomBytes, scryptSync } from "node:crypto";
import { neon } from "@neondatabase/serverless";

function arg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 ? process.argv[index + 1] : undefined;
}

const name = arg("name");
const email = arg("email")?.trim().toLowerCase();
const password = arg("password");

if (!name || !email || !password) {
  console.error('Uso: npm run create-admin -- --name "Nome" --email admin@exemplo.com --password "senha"');
  process.exit(1);
}
if (password.length < 8) {
  console.warn("⚠ Senha fraca (menos de 8 caracteres). Troque antes de ir para produção.");
}

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não encontrado (confira o .env.local).");
  process.exit(1);
}
const sql = neon(url);

const salt = randomBytes(16).toString("hex");
const passwordHash = `scrypt$${salt}$${scryptSync(password, salt, 64).toString("hex")}`;

const [user] = await sql`
  INSERT INTO users (name, email, role, password_hash)
  VALUES (${name}, ${email}, 'admin', ${passwordHash})
  ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash, role = 'admin'
  RETURNING (xmax = 0) AS inserted`;

console.log(`${user.inserted ? "Criado" : "Atualizado"} administrador: ${name} <${email}>`);
