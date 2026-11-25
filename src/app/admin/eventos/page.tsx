import { listEvents } from "@/lib/repositories/eventsRepository";
import AdminEventsManager from "@/components/organisms/AdminEventList";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await listEvents();
  return <AdminEventsManager initialEvents={events} />;
}
