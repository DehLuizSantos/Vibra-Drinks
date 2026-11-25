// Regras de upload compartilhadas entre o servidor (rota de upload) e o navegador (validação prévia).

export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif"
};

export const ACCEPT_IMAGE_ATTR = Object.keys(ALLOWED_IMAGE_TYPES).join(",");

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

/** Retorna a mensagem de erro, ou null se o arquivo for válido. */
export function validateImageFile(file: { type: string; size: number }): string | null {
  if (!ALLOWED_IMAGE_TYPES[file.type]) return "Formato não suportado (use JPG, PNG, WEBP, AVIF ou GIF).";
  if (file.size > MAX_UPLOAD_BYTES) return "Arquivo maior que 10 MB.";
  return null;
}
