import Link from "next/link";
import { listEvents } from "@/lib/repositories/eventsRepository";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const events = await listEvents();
  const photoCount = events.reduce((sum, e) => sum + e.photos.length, 0);

  const modules = [
    {
      href: "/admin/eventos",
      title: "Eventos",
      description: "Cadastre eventos, depoimentos e as fotos do carrossel da galeria.",
      stats: `${events.length} eventos · ${photoCount} fotos`
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {modules.map(module => (
        <Link
          key={module.href}
          href={module.href}
          className="group rounded-tl-[40px] rounded-br-[40px] rounded-tr-2xl rounded-bl-2xl p-8 flex flex-col gap-3 transition-transform hover:-translate-y-1"
          style={{
            border: "2px solid transparent",
            background:
              "linear-gradient(#191919, #191919) padding-box, linear-gradient(135deg, #996A01, #FFB001, #996A01) border-box"
          }}
        >
          <h2 className="display-font text-gold text-xl">{module.title}</h2>
          <p className="display-marcellus text-white-300">{module.description}</p>
          <p className="display-marcellus text-white-300/60 text-sm uppercase tracking-widest mt-auto">
            {module.stats}
          </p>
          <span className="display-marcellus text-gold text-sm group-hover:underline">
            Gerenciar →
          </span>
        </Link>
      ))}
    </div>
  );
}
