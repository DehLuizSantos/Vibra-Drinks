import Link from "next/link";

export default function NavbarDesktop() {
  return (
    <nav className="hidden md:flex items-center gap-20">
      <Link
        href="#sobre"
        className="text-white-300 display-font hover:text-gold transition-colors text-sm  tracking-wider "
      >
        Sobre nôs
      </Link>
      <Link
        href="#servicos"
        className="text-white-300 display-font hover:text-gold transition-colors text-sm  tracking-wider"
      >
        Nossos serviços
      </Link>
      <Link
        href="#opiniao"
        className="text-white-300 display-font hover:text-gold transition-colors text-sm  tracking-wider"
      >
        Nossos clientes
      </Link>
      <Link
        href="/orcamento"
        className="bg-black-500 display-font text-pink-100 p-15 text-sm font-bold   hover:outline-1 outline-amber-50 transition-opacity rounded-2xl"
      >
        Solicitar Orçamento
      </Link>
    </nav>
  );
}
