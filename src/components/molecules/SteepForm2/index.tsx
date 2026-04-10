import { Field } from "@/components/atoms/Field";

export const inputClass =
  "w-full bg-black-300 rounded-lg px-4 py-3 text-white-500 display-marcellus text-sm focus:outline-none focus:border-gold transition-colors";

export function StepForm2() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Tipo de Evento">
        <select className={inputClass}>
          <option value="">Selecione...</option>
          <option value="casamento">Casamento</option>
          <option value="corporativo">Corporativo</option>
          <option value="intimo">Íntimo</option>
        </select>
      </Field>
      <Field label="Número de Convidados">
        <input type="number" placeholder="Ex: 150" className={inputClass} />
      </Field>
      <Field label="Data do Evento">
        <input type="date" className={inputClass} />
      </Field>
      <Field label="Duração do Evento">
        <input type="text" placeholder="Ex: 4 horas" className={inputClass} />
      </Field>
      <Field label="Possui Local para o Evento">
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 display-marcellus text-white-500 text-sm cursor-pointer">
            <input
              type="radio"
              name="hasVenue"
              value="sim"
              className="accent-gold"
            />
            Sim
          </label>
          <label className="flex items-center gap-2 display-marcellus text-white-500 text-sm cursor-pointer">
            <input
              type="radio"
              name="hasVenue"
              value="nao"
              className="accent-gold"
            />
            Não
          </label>
        </div>
      </Field>
    </div>
  );
}
