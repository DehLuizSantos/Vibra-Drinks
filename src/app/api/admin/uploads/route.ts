import { NextResponse, type NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { createImageUpload } from "@/lib/storage/r2";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/storage/imageRules";

/** Admin: pede uma URL assinada para enviar uma imagem ao Cloudflare R2. */
export async function POST(request: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const contentType = typeof body?.contentType === "string" ? body.contentType : "";
  const size = typeof body?.size === "number" ? body.size : 0;

  if (!ALLOWED_IMAGE_TYPES[contentType]) {
    return NextResponse.json(
      { error: "Formato não suportado. Use JPG, PNG, WEBP, AVIF ou GIF." },
      { status: 400 }
    );
  }
  if (size <= 0 || size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "A imagem deve ter no máximo 10 MB." }, { status: 400 });
  }

  try {
    return NextResponse.json(await createImageUpload(contentType));
  } catch (err) {
    console.error("Erro ao gerar upload no R2:", err);
    return NextResponse.json({ error: "Armazenamento de imagens indisponível." }, { status: 500 });
  }
}
