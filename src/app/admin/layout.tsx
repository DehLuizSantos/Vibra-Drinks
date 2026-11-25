import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import LogoutButton from "@/components/molecules/logoutButton";

export const metadata: Metadata = {
  title: "Painel administrativo | Vibra Drinks",
  robots: { index: false, follow: false }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminSession();
  // Sem sessão, responde como página inexistente para não revelar o endereço do login.
  if (!user) notFound();

  return (
    <section className="noise-bg bg-black-500 text-white-500 min-h-[70vh] pb-40 relative border-r-2 border-l-2 border-gold px-4 py-10 md:px-16 md:py-16 xl:px-24">
      <div className="max-w-360 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-gradient-bottom pb-6 mb-10">
          <div>
            <Link href="/admin" className="display-font text-gold text-2xl md:text-4xl">
              Painel administrativo
            </Link>
            <p className="display-marcellus text-white-300 mt-2">Olá, {user.name}</p>
          </div>
          <LogoutButton />
        </div>
        {children}
      </div>
    </section>
  );
}
