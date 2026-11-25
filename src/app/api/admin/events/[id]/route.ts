import { NextResponse, after, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/session";
import { deleteEvent, getEvent, imageUrlsOf, updateEvent } from "@/lib/repositories/eventsRepository";
import { deleteUnreferencedImages } from "@/lib/storage/imageCleanup";
import { validateEventInput } from "@/lib/validation/event";

type Context = { params: Promise<{ id: string }> };

const unauthorized = () => NextResponse.json({ error: "Não autorizado." }, { status: 401 });
const notFound = () => NextResponse.json({ error: "Evento não encontrado." }, { status: 404 });

export async function GET(_request: NextRequest, { params }: Context) {
  if (!(await getAdminSession())) return unauthorized();
  const event = await getEvent((await params).id);
  return event ? NextResponse.json({ event }) : notFound();
}

export async function PUT(request: NextRequest, { params }: Context) {
  if (!(await getAdminSession())) return unauthorized();

  const body = await request.json().catch(() => null);
  const result = validateEventInput(body);
  if (!result.ok) {
    return NextResponse.json({ error: "Dados inválidos.", errors: result.errors }, { status: 422 });
  }

  const { id } = await params;
  const previous = await getEvent(id);
  const event = await updateEvent(id, result.data);
  if (!event) return notFound();

  revalidatePath("/");
  revalidatePath(`/eventos/${id}`);

  // Imagens que saíram do evento (fotos removidas / capa trocada) → apaga do R2 após responder
  if (previous) {
    const kept = new Set(imageUrlsOf(event));
    const removed = imageUrlsOf(previous).filter(url => !kept.has(url));
    if (removed.length) after(() => deleteUnreferencedImages(removed));
  }
  return NextResponse.json({ event });
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const event = await getEvent(id);
  if (!event || !(await deleteEvent(id))) return notFound();

  revalidatePath("/");
  revalidatePath(`/eventos/${id}`);

  // Apaga a capa e as fotos do evento no R2 após responder
  after(() => deleteUnreferencedImages(imageUrlsOf(event)));
  return NextResponse.json({ ok: true });
}
