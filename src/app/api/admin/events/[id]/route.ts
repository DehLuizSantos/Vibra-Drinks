import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/session";
import { deleteEvent, getEvent, updateEvent } from "@/lib/repositories/eventsRepository";
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
  const event = await updateEvent(id, result.data);
  if (event) {
    revalidatePath("/");
    revalidatePath(`/eventos/${id}`);
  }
  return event ? NextResponse.json({ event }) : notFound();
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  if (!(await getAdminSession())) return unauthorized();
  const { id } = await params;
  const deleted = await deleteEvent(id);
  if (deleted) {
    revalidatePath("/");
    revalidatePath(`/eventos/${id}`);
  }
  return deleted ? NextResponse.json({ ok: true }) : notFound();
}
