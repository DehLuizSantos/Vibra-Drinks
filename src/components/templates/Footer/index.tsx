import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black-500 text-white-300 noise-bg border-2 border-gold bt-white-300">
      <div className="max-w-7xl mx-auto px-30 py-60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-45">
          {/* Brand */}
          <div className="flex flex-col gap-15">
            <span className="text-gold font-bold text-xl tracking-widest uppercase">
              Vibra Drinks
            </span>
            <p className="text-sm text-black-100 leading-relaxed">
              Experiências únicas em bebidas para o seu evento.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-15">
            <span className="text-white-500 text-sm font-semibold uppercase tracking-wider">
              Navegação
            </span>
            <Link
              href="/"
              className="text-black-100 hover:text-gold transition-colors text-sm"
            >
              Início
            </Link>
            <Link
              href="/orcamento"
              className="text-black-100 hover:text-gold transition-colors text-sm"
            >
              Solicitar Orçamento
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-15">
            <span className="text-white-500 text-sm font-semibold uppercase tracking-wider">
              Contato
            </span>
            <span className="text-black-100 text-sm">
              contato@vibradrinks.com.br
            </span>
            <span className="text-black-100 text-sm">(11) 99999-9999</span>
          </div>
        </div>

        <div className="border-t border-black-300 mt-45 pt-30 text-center">
          <p className="text-black-100 text-xs">
            © {new Date().getFullYear()} Vibra Drinks. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
