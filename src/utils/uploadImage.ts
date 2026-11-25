// Envio de imagens do painel admin direto para o Cloudflare R2 (via URL assinada).

/**
 * 1) Pede ao servidor uma URL assinada; 2) envia o arquivo com XHR para acompanhar o progresso.
 * Retorna a URL pública da imagem.
 */
export async function uploadImage(file: File, onProgress?: (percent: number) => void): Promise<string> {
  const res = await fetch("/api/admin/uploads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentType: file.type, size: file.size })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(res.status === 401 ? "Sessão expirada. Entre novamente." : data.error ?? "Falha ao preparar o envio.");
  }

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", data.uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("O armazenamento recusou o envio."));
    xhr.onerror = () => reject(new Error("Falha de conexão durante o envio."));
    xhr.send(file);
  });

  return data.publicUrl as string;
}
