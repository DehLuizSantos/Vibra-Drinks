#!/usr/bin/env node
// Cria as tabelas no Neon e importa os dados iniciais. Pode rodar várias vezes (idempotente).
// Uso: npm run db:migrate
//
// Importa, se existirem:
//   - data/users.json  → usuários admin criados antes da migração
//   - data/events.json → eventos cadastrados antes da migração
// Se a tabela de eventos estiver vazia e não houver data/events.json, usa os depoimentos iniciais do site.

import { readFileSync } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { seedEvents } from "../src/data/seedEvents.ts";

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não encontrado. Rode com: npm run db:migrate (carrega o .env.local).");
  process.exit(1);
}
const sql = neon(url);

const dataDir = path.resolve(process.env.DATA_DIR ?? path.join(process.cwd(), "data"));
function readJson(file) {
  try {
    return JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

console.log("→ Criando tabelas...");
await sql`
  CREATE TABLE IF NOT EXISTS users (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name          text NOT NULL,
    email         text NOT NULL UNIQUE,
    role          text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
    password_hash text NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now()
  )`;
await sql`
  CREATE TABLE IF NOT EXISTS events (
    id                text PRIMARY KEY,
    name              text NOT NULL,
    type              text NOT NULL CHECK (type IN ('casamento', 'corporativos', 'aniversarios')),
    event_description text NOT NULL,
    image             text NOT NULL,
    description       text NOT NULL,
    photos            jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now()
  )`;
await sql`CREATE INDEX IF NOT EXISTS events_type_created_idx ON events (type, created_at DESC)`;

// Usuários
const users = readJson("users.json") ?? [];
for (const u of users) {
  await sql`
    INSERT INTO users (id, name, email, role, password_hash, created_at)
    VALUES (${u.id}, ${u.name}, ${u.email.toLowerCase()}, ${u.role}, ${u.passwordHash}, ${u.createdAt})
    ON CONFLICT (email) DO NOTHING`;
}
console.log(`→ Usuários importados de data/users.json: ${users.length}`);

// Eventos
const [{ count }] = await sql`SELECT count(*)::int AS count FROM events`;
const localEvents = readJson("events.json");
const toImport = localEvents ?? (count === 0 ? seedEvents : []);
for (const e of toImport) {
  await sql`
    INSERT INTO events (id, name, type, event_description, image, description, photos, created_at, updated_at)
    VALUES (${e.id}, ${e.name}, ${e.type}, ${e.eventDescription}, ${e.image}, ${e.description},
            ${JSON.stringify(e.photos ?? [])}::jsonb, ${e.createdAt}, ${e.updatedAt})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(
  `→ Eventos importados: ${toImport.length} ${localEvents ? "(de data/events.json)" : count === 0 ? "(depoimentos iniciais)" : "(banco já tinha eventos)"}`
);

const [totals] = await sql`
  SELECT (SELECT count(*)::int FROM users) AS users, (SELECT count(*)::int FROM events) AS events`;
console.log(`✓ Pronto. No banco: ${totals.users} usuário(s), ${totals.events} evento(s).`);
