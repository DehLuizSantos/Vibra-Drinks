import { Field } from "@/components/atoms/Field";
import { MultiSelect } from "@/components/atoms/MultiSelect";
import { inputClass } from "@/components/organisms/Steeper";
import { useFormStore } from "@/store/useFormOrcamentoStore";

export function StepForm3() {
  const { step3, updateStep3 } = useFormStore();

  // Opções para Tipo de Copos e Taças
  const coposOptions = [
    "Copos de Acrílico (descartável)",
    "Copos e Taças de Vidro",
    "Copos e taças de Acrílico personalizados",
    "Copos e taças de vidro personalizados"
  ];

  // Opções para Tipo de Bar
  const barOptions = [
    "Bar Basic (Madeira simples)",
    "Bar Plus (Acolchoado)",
    "Bar Premium (Madeira envernizada e com melhor acabamento)"
  ];

  // Opções para Quantidade de Drinks (1 a 12)
  const quantidadeDrinksOptions = Array.from(
    { length: 12 },
    (_, i) => `${i + 1} drink${i + 1 > 1 ? "s" : ""}`
  );

  // Opções para Tags Personalizadas
  const tagsOptions = ["Sim", "Não"];

  // Opções para Tipo de Xarope / Açúcar
  const acucarOptions = [
    "Açúcar refinado",
    "Açúcar Demerara"
  ];

  // Lista completa de drinks (sem categorias)
  const drinksOptions = [
    "Vibrante (Autoral)",
    "Aperol Spritz",
    "Cosmopolitan",
    "Fitzgerald",
    "Margarita",
    "Mojito",
    "Muscle Mule",
    "Negroni",
    "Sex on the Beach",
    "Whiskey Sour",
    "Batidas",
    "Espanhola",
    "Maracujack",
    "Piña Colada",
    "Gin & Tônica Tradicional",
    "Gin & Tônica Frutas Vermelhas",
    "Gin & Tônica Cítrico",
    "Gin & Tônica Lichia",
    "Gin & Tônica Maçã Verde",
    "Gin & Tônica Tinto",
    "Caipirinha"
  ];

  const handleChange = (field: string, value: string) => {
    updateStep3(field, value);
  };

  const handleMultiSelectChange = (selected: string[]) => {
    updateStep3("Selecione seus Drinks", selected.join(","));
  };

  // Recupera os drinks selecionados do store
  const selectedDrinks = step3["Selecione seus Drinks"]
    ? step3["Selecione seus Drinks"].split(",").filter(Boolean)
    : [];

  return (
    <div className="w-full ">
      {/* Tipo de Copos e Taças */}
      <div className="md:flex w-full gap-4 my-4">
        <Field label="Tipo de Copos e Taças">
          <select
            className={inputClass}
            value={step3["Tipo de Copos e Taças"] || ""}
            onChange={e =>
              handleChange("Tipo de Copos e Taças", e.target.value)}
          >
            <option value="">Selecione...</option>
            {coposOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </Field>

        {/* Tipo de Bar */}
        <Field label="Tipo de Bar">
          <select
            className={inputClass}
            value={step3["Tipo de Bar"] || ""}
            onChange={e => handleChange("Tipo de Bar", e.target.value)}
          >
            <option value="">Selecione...</option>
            {barOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </Field>
      </div>

      {/* Quantidade de Drinks */}
      <div className="md:flex gap-4 my-4 w-full">
        <Field label="Quantidade de Drinks">
          <select
            className={inputClass}
            value={step3["Quantidade de Drinks"] || ""}
            onChange={e => handleChange("Quantidade de Drinks", e.target.value)}
          >
            <option value="">Selecione...</option>
            {quantidadeDrinksOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </Field>

        {/* Tags Personalizadas */}
        <Field label="Tags Personalizadas">
          <div className="flex gap-6 mt-2">
            {tagsOptions.map(option =>
              <label
                key={option}
                className="flex items-center gap-2 display-marcellus text-white-500 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="tagsPersonalizadas"
                  value={option}
                  checked={step3["Tags Personalizadas"] === option}
                  onChange={e =>
                    handleChange("Tags Personalizadas", e.target.value)}
                  className="accent-gold"
                />
                {option}
              </label>
            )}
          </div>
        </Field>
      </div>
      <div className="md:flex gap-4 my-4 w-full">
        <Field label="Tipo de Xarope / Açúcar">
          <select
            className={inputClass}
            value={step3["Tipo de Xarope / Açúcar"] || ""}
            onChange={e =>
              handleChange("Tipo de Xarope / Açúcar", e.target.value)}
          >
            <option value="">Selecione...</option>
            {acucarOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </Field>

        {/* Selecione seus Drinks - MultiSelect (ocupa as duas colunas) */}

        <MultiSelect
          label="Selecione seus Drinks"
          options={drinksOptions}
          value={selectedDrinks}
          onChange={handleMultiSelectChange}
          placeholder="Buscar e selecionar drinks..."
        />
      </div>
      {/* Tipo de Xarope / Açúcar */}

      <div className="w-full">
        <Field label="Observações">
          <textarea
            className={`${inputClass} w-full`}
            style={{ height: "135px" }}
            placeholder="Digite aqui observações adicionais sobre o evento, preferências especiais, restrições, etc."
            value={step3["Observações"] || ""}
            onChange={e => handleChange("Observações", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
