import { Field } from "@/components/atoms/Field";
import { inputClass } from "@/components/organisms/Steeper";
import { useFormStore } from "@/store/useFormOrcamentoStore";

export function StepForm2() {
  const { step2, updateStep2 } = useFormStore();

  const handleChange = (field: keyof typeof step2, value: string) => {
    updateStep2({ [field]: value });
  };

  const duracaoOptions = ["1", "2", "3", "4","5","6","7","8","9", "10","11", "12"];

  return (
    <div className="md:flex flex-wrap max-w-160 gap-3.5">
      {/* Linha 1: Tipo de Evento + Número de Convidados */}
      <div className="md:flex w-full gap-5">
        <Field label="Tipo de Evento">
          <select
            className={inputClass}
            value={step2.tipoEvento}
            onChange={e => handleChange("tipoEvento", e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="casamento">Casamento</option>
            <option value="corporativo">Corporativo</option>
            <option value="intimo">Íntimo</option>
          </select>
        </Field>

        <Field label="Número de Convidados">
          <input
            type="number"
            placeholder="Ex: 150"
            className={inputClass}
            value={step2.numeroConvidados}
            onChange={e => handleChange("numeroConvidados", e.target.value)}
            min="0"
            step="1"
          />
        </Field>
      </div>

      {/* Linha 2: Data do Evento + Duração do Evento (Select) */}
      <div className="md:flex w-full gap-5">
        <Field label="Data do Evento">
          <input
            type="date"
            className={inputClass}
            value={step2.dataEvento}
            onChange={e => handleChange("dataEvento", e.target.value)}
          />
        </Field>

        <Field label="Duração do Evento (horas)">
          <select
            className={inputClass}
            value={step2.duracaoEvento}
            onChange={e => handleChange("duracaoEvento", e.target.value)}
          >
            <option value="">Selecione...</option>
            {duracaoOptions.map(horas =>
              <option key={horas} value={horas}>
                {horas} horas
              </option>
            )}
          </select>
        </Field>
      </div>
      <div className="md:flex flex-col-reverse-reverse items-center w-full gap-5 ">
        {/* Linha 3: Possui Local para o Evento + Local (bloqueado se "não") */}
        <Field label="Possui Local para o Evento">
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 display-marcellus text-white-500 text-sm cursor-pointer">
              <input
                type="radio"
                name="hasVenue"
                value="sim"
                checked={step2.possuiLocal === "sim"}
                onChange={e => {
                  handleChange("possuiLocal", e.target.value);
                  // Se marcar "não", limpa o campo Local
                  if (e.target.value === "nao") {
                    handleChange("localEvento", "");
                  }
                }}
                className="accent-gold"
              />
              Sim
            </label>
            <label className="flex items-center gap-2 display-marcellus text-white-500 text-sm cursor-pointer">
              <input
                type="radio"
                name="hasVenue"
                value="nao"
                checked={step2.possuiLocal === "nao"}
                onChange={e => {
                  handleChange("possuiLocal", e.target.value);
                  // Se marcar "não", limpa o campo Local
                  if (e.target.value === "nao") {
                    handleChange("localEvento", "");
                  }
                }}
                className="accent-gold"
              />
              Não
            </label>
          </div>
        </Field>

        <Field label="Local do Evento">
          <input
            type="text"
            placeholder="Ex: Salão de festas, Buffet, Casa própria..."
            className={inputClass}
            value={step2.localEvento || ""}
            onChange={e => handleChange("localEvento", e.target.value)}
            disabled={step2.possuiLocal === "nao"}
            style={{
              opacity: step2.possuiLocal === "nao" ? 0.5 : 1,
              cursor: step2.possuiLocal === "nao" ? "not-allowed" : "text"
            }}
          />
        </Field>
      </div>
    </div>
  );
}
