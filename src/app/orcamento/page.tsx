import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orçamento | Vibra Drinks",
  description: "Solicite um orçamento personalizado para o seu evento.",
};

export default function OrcamentoPage() {
  return (
    <section className="bg-white-500 py-60 px-30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-45">
          <h1 className="text-3xl md:text-4xl font-bold text-black-500">
            Solicitar <span className="text-gold">Orçamento</span>
          </h1>
          <p className="text-black-100 mt-15">
            Preencha o formulário abaixo e entraremos em contato em até 24 horas
            com uma proposta personalizada.
          </p>
        </div>

        <form className="flex flex-col gap-30">
          {/* Nome */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="nome"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 placeholder:text-black-100 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 placeholder:text-black-100 transition-colors"
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="telefone"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              Telefone / WhatsApp
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 placeholder:text-black-100 transition-colors"
            />
          </div>

          {/* Tipo de evento */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="evento"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              Tipo de evento
            </label>
            <select
              id="evento"
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Selecione...</option>
              <option value="casamento">Casamento</option>
              <option value="aniversario">Aniversário</option>
              <option value="corporativo">Evento Corporativo</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Data do evento */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="data"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              Data do evento
            </label>
            <input
              id="data"
              type="date"
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 transition-colors"
            />
          </div>

          {/* Número de convidados */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="convidados"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              Número de convidados (aprox.)
            </label>
            <input
              id="convidados"
              type="number"
              placeholder="Ex: 150"
              min={1}
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 placeholder:text-black-100 transition-colors"
            />
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-15">
            <label
              htmlFor="mensagem"
              className="text-sm font-semibold text-black-300 uppercase tracking-wider"
            >
              Mensagem (opcional)
            </label>
            <textarea
              id="mensagem"
              rows={5}
              placeholder="Conte-nos mais sobre o seu evento..."
              className="bg-white-300 border border-white-300 focus:border-gold outline-none px-30 py-15 text-black-500 placeholder:text-black-100 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-gold text-black-500 px-45 py-15 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity self-start cursor-pointer"
          >
            Enviar Solicitação
          </button>
        </form>
      </div>
    </section>
  );
}
