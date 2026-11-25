import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/session";
import { createEvent, listEvents } from "@/lib/repositories/eventsRepository";
import { validateEventInput } from "@/lib/validation/event";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json({ events: await listEvents() });
}

export async function POST(request: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const result = validateEventInput(body);
  if (!result.ok) {
    return NextResponse.json({ error: "Dados inválidos.", errors: result.errors }, { status: 422 });
  }

  const event = await createEvent(result.data);
  revalidatePath("/");
  return NextResponse.json({ event }, { status: 201 });
}
