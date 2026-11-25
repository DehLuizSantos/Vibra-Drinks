#!/usr/bin/env node
// Envia para o R2 as imagens de eventos que ainda apontam para arquivos locais (/images/...)
// e atualiza os eventos no banco com as URLs novas. Os arquivos em public/ não são apagados.
//
// Uso:
//   npm run images:to-r2            → só LISTA o que seria enviado
//   npm run images:to-r2 -- --apply → envia e atualiza o banco

import { randomUUID } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { neon } from "@neondatabase/serverless";

const apply = process.argv.includes("--apply");
const CONTENT_TYPES = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif" };

for (const name of ["DATABASE_URL", "R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_PUBLIC_URL"]) {
  if (!process.env[name]) {
    console.error(`${name} não encontrado (confira o .env.local).`);
    process.exit(1);
  }
}

const sql = neon(process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL);
const publicBase = process.env.R2_PUBLIC_URL.replace(/\/+$/, "");
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY }
});

const isLocal = url => typeof url === "string" && url.startsWith("/") && !url.startsWith("//");

const events = await sql`SELECT id, event_description, image, photos FROM events`;
const localPaths = new Set();
for (const e of events) {
  if (isLocal(e.image)) localPaths.add(e.image);
  for (const p of e.photos) if (isLocal(p.url)) localPaths.add(p.url);
}

if (localPaths.size === 0) {
  console.log("Nenhuma imagem local encontrada — tudo já está no R2.");
  process.exit(0);
}

const publicDir = path.join(process.cwd(), "public");
const now = new Date();
const folder = `eventos/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
const mapping = new Map(); // caminho local → URL no R2

for (const localPath of localPaths) {
  const file = path.join(publicDir, decodeURIComponent(localPath));
  if (!file.startsWith(publicDir + path.sep)) throw new Error(`Caminho inválido: ${localPath}`);
  const ext = path.extname(file).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) throw new Error(`Formato não suportado: ${localPath}`);
  const key = `${folder}/${randomUUID()}${ext === ".jpeg" ? ".jpg" : ext}`;
  const size = statSync(file).size;

  console.log(`${localPath} (${(size / 1024).toFixed(0)} KB) → ${key}`);
  if (apply) {
    await s3.send(
      new PutObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key, Body: readFileSync(file), ContentType: contentType })
    );
  }
  mapping.set(localPath, `${publicBase}/${key}`);
}

if (!apply) {
  console.log("\nNada foi enviado. Para enviar e atualizar o banco: npm run images:to-r2 -- --apply");
  process.exit(0);
}

let updated = 0;
for (const e of events) {
  const image = mapping.get(e.image) ?? e.image;
  const photos = e.photos.map(p => ({ ...p, url: mapping.get(p.url) ?? p.url }));
  if (image === e.image && JSON.stringify(photos) === JSON.stringify(e.photos)) continue;
  await sql`
    UPDATE events SET image = ${image}, photos = ${JSON.stringify(photos)}::jsonb, updated_at = now()
    WHERE id = ${e.id}`;
  updated += 1;
  console.log(`✓ ${e.event_description}`);
}
console.log(`\n${mapping.size} imagem(ns) enviada(s) ao R2, ${updated} evento(s) atualizado(s).`);
console.log("O site publicado mostra as novas URLs em até ~60s (cache da página).");
