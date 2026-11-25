#!/usr/bin/env node
// Encontra (e opcionalmente apaga) imagens do R2 que nenhum evento usa mais.
//
// Uso:
//   npm run r2:cleanup            → só LISTA os arquivos órfãos (não apaga nada)
//   npm run r2:cleanup -- --apply → apaga os arquivos órfãos
//   npm run r2:cleanup -- --apply --include-recent → inclui também os enviados nas últimas 24h
//
// Só considera arquivos dentro de "eventos/". Por padrão ignora envios das últimas 24h
// (podem ser de um formulário aberto que ainda não foi salvo).

import { DeleteObjectsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { neon } from "@neondatabase/serverless";

const PREFIX = "eventos/";
const GRACE_MS = 24 * 60 * 60 * 1000;
const apply = process.argv.includes("--apply");
const includeRecent = process.argv.includes("--include-recent");

for (const name of ["DATABASE_URL", "R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_PUBLIC_URL"]) {
  if (!process.env[name]) {
    console.error(`${name} não encontrado (confira o .env.local).`);
    process.exit(1);
  }
}

const sql = neon(process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL);
const bucket = process.env.R2_BUCKET;
const publicBase = process.env.R2_PUBLIC_URL.replace(/\/+$/, "");
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY }
});

// 1) Imagens usadas pelos eventos
const rows = await sql`
  SELECT image AS url FROM events
  UNION
  SELECT p->>'url' FROM events, jsonb_array_elements(photos) AS p`;
const used = new Set(
  rows
    .map(r => r.url)
    .filter(url => typeof url === "string" && url.startsWith(`${publicBase}/`))
    .map(url => decodeURIComponent(url.slice(publicBase.length + 1)))
);

// 2) Arquivos no bucket
const objects = [];
let token;
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: PREFIX, ContinuationToken: token }));
  objects.push(...(page.Contents ?? []));
  token = page.IsTruncated ? page.NextContinuationToken : undefined;
} while (token);

const cutoff = includeRecent ? Infinity : Date.now() - GRACE_MS;
const orphans = objects.filter(o => !used.has(o.Key) && new Date(o.LastModified).getTime() < cutoff);
const recent = objects.filter(o => !used.has(o.Key) && new Date(o.LastModified).getTime() >= cutoff);
const bytes = orphans.reduce((sum, o) => sum + (o.Size ?? 0), 0);

console.log(`Arquivos no bucket (${PREFIX}): ${objects.length}`);
console.log(`Em uso por eventos: ${objects.length - orphans.length - recent.length}`);
console.log(`Órfãos recentes (< 24h, ignorados): ${recent.length}`);
console.log(`Órfãos para apagar: ${orphans.length} (${(bytes / 1024 / 1024).toFixed(2)} MB)`);
for (const o of orphans) console.log(`  - ${o.Key}`);

if (!apply) {
  if (orphans.length) console.log('\nNada foi apagado. Para apagar, rode: npm run r2:cleanup -- --apply');
  process.exit(0);
}

for (let i = 0; i < orphans.length; i += 1000) {
  const batch = orphans.slice(i, i + 1000);
  const result = await s3.send(
    new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: batch.map(o => ({ Key: o.Key })), Quiet: true } })
  );
  if (result.Errors?.length) console.error("Falhas:", result.Errors);
}
console.log(`\n✓ ${orphans.length} arquivo(s) apagado(s).`);
