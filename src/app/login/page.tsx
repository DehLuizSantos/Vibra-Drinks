import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/organisms/LoginForm";
import { getAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Entrar | Vibra Drinks",
  robots: { index: false, follow: false }
};

export default async function LoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <section className="noise-bg bg-black-500 text-white-500 pb-40 md:pb-70 relative border-r-2 border-l-2 border-gold md:p-24">
      <div className="max-w-360 mx-auto">
        <div className="border-gradient-bottom text-center md:text-start max-w-3xl mb-10">
          <h1 className="text-start text-2xl px-3 text-gold py-8 display-marcellus md:text-5xl md:px-0">
            Área administrativa
          </h1>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
