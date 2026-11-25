import { NextResponse, type NextRequest } from "next/server";
import { listEvents } from "@/lib/repositories/eventsRepository";
import { isEventType } from "@/lib/validation/event";

export const dynamic = "force-dynamic";

/** Público: lista eventos (depoimentos + fotos da galeria). Filtro opcional ?type= */
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (type !== null && !isEventType(type)) {
    return NextResponse.json({ error: "Tipo de evento inválido." }, { status: 400 });
  }
  const events = await listEvents(type ?? undefined);
  return NextResponse.json({ events });
}
