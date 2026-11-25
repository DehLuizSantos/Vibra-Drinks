import "server-only";
import { findReferencedImageUrls } from "@/lib/repositories/eventsRepository";
import { deleteR2Objects, r2KeyFromUrl } from "@/lib/storage/r2";

/**
 * Apaga do R2 as imagens informadas que NÃO são mais usadas por nenhum evento.
 *
 * Proteções:
 *  - só considera arquivos do nosso bucket, dentro de "eventos/" (imagens locais como
 *    /images/... e URLs externas são ignoradas);
 *  - confere no banco antes de apagar — se outro evento usa a mesma imagem, ela fica.
 *
 * Nunca lança erro: uma falha na limpeza não deve quebrar o salvamento do evento.
 */
export async function deleteUnreferencedImages(urls: string[]): Promise<number> {
  try {
    const candidates = new Map<string, string>(); // url → key
    for (const url of urls) {
      const key = r2KeyFromUrl(url);
      if (key) candidates.set(url, key);
    }
    if (candidates.size === 0) return 0;

    const stillUsed = await findReferencedImageUrls([...candidates.keys()]);
    const keys = [...candidates].filter(([url]) => !stillUsed.has(url)).map(([, key]) => key);
    if (keys.length === 0) return 0;

    return await deleteR2Objects(keys);
  } catch (err) {
    console.error("Falha ao apagar imagens do R2:", err);
    return 0;
  }
}
