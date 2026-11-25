import "server-only";
import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ALLOWED_IMAGE_TYPES } from "@/lib/storage/imageRules";


let client: S3Client | null = null;

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} não configurado.`);
  return value;
}

function r2(): S3Client {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${env("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env("R2_ACCESS_KEY_ID"),
        secretAccessKey: env("R2_SECRET_ACCESS_KEY")
      }
    });
  }
  return client;
}

/**
 * Gera uma URL assinada (válida por 5 min) para o navegador enviar a imagem
 * direto ao R2 — sem passar pelo servidor da Vercel (que limita o corpo a ~4,5 MB).
 */
export async function createImageUpload(contentType: string) {
  const ext = ALLOWED_IMAGE_TYPES[contentType];
  const now = new Date();
  const key = `eventos/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;

  const uploadUrl = await getSignedUrl(
    r2(),
    new PutObjectCommand({ Bucket: env("R2_BUCKET"), Key: key, ContentType: contentType }),
    { expiresIn: 300 }
  );

  const publicUrl = `${env("R2_PUBLIC_URL").replace(/\/+$/, "")}/${key}`;
  return { uploadUrl, publicUrl };
}
