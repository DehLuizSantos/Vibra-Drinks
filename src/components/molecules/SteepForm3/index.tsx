import { Field } from "@/components/atoms/Field";
import { MultiSelect } from "@/components/atoms/MultiSelect";
import { inputClass } from "@/components/organisms/Steeper";
import { drinksDescriptions, drinksFieldTooltipMessage } from "@/constants";
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

  // Lista de drinks com suas descrições
  const drinksOptions = [
    { name: "Vibrante (Autoral)", description: drinksDescriptions["Vibrante (Autoral)"] },
    { name: "Aperol Spritz", description: drinksDescriptions["Aperol Spritz"] },
    { name: "Cosmopolitan", description: drinksDescriptions["Cosmopolitan"] },
    { name: "Fitzgerald", description: drinksDescriptions["Fitzgerald"] },
    { name: "OLD FASHIONED", description: drinksDescriptions["OLD FASHIONED"] },
    { name: "Mojito", description: drinksDescriptions["Mojito"] },
    { name: "Muscle Mule", description: drinksDescriptions["Muscle Mule"] },
    { name: "Negroni", description: drinksDescriptions["Negroni"] },
    { name: "Sex on the Beach", description: drinksDescriptions["Sex on the Beach"] },
    { name: "Whiskey Sour", description: drinksDescriptions["Whiskey Sour"] },
    { name: "Batidas", description: drinksDescriptions["Batidas"] },
    { name: "Espanhola", description: drinksDescriptions["Espanhola"] },
    { name: "Maracujack", description: drinksDescriptions["Maracujack"] },
    { name: "Piña Colada", description: drinksDescriptions["Piña Colada"] },
    { name: "Gin & Tônica Tradicional", description: drinksDescriptions["Gin & Tônica Tradicional"] },
    { name: "Gin & Tônica Frutas Vermelhas", description: drinksDescriptions["Gin & Tônica Frutas Vermelhas"] },
    { name: "Gin & Tônica Cítrico", description: drinksDescriptions["Gin & Tônica Cítrico"] },
    { name: "Gin & Tônica Lichia", description: drinksDescriptions["Gin & Tônica Lichia"] },
    { name: "Gin & Tônica Maçã Verde", description: drinksDescriptions["Gin & Tônica Maçã Verde"] },
    { name: "Gin & Tônica Tinto", description: drinksDescriptions["Gin & Tônica Tinto"] },
    { name: "Caipirinha", description: drinksDescriptions["Caipirinha"] }
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
    <div className="w-full">
      {/* Tipo de Copos e Taças */}
      <div className="md:flex w-full gap-4 my-4">
        <Field label="Tipo de Copos e Taças">
          <select
            className={inputClass}
            value={step3["Tipo de Copos e Taças"] || ""}
            onChange={e => handleChange("Tipo de Copos e Taças", e.target.value)}
          >
            <option value="">Selecione...</option>
            {coposOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        {/* Tipo de Bar */}
        <Field label="Modelo de bar">
          <select
            className={inputClass}
            value={step3["Tipo de Bar"] || ""}
            onChange={e => handleChange("Tipo de Bar", e.target.value)}
          >
            <option value="">Selecione...</option>
            {barOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
            {quantidadeDrinksOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        {/* Tags Personalizadas */}
        <Field label="Tags Personalizadas" hasTooltip tooltipMessage="Frases divertidas que enfeitam os copos e taças" tooltipPosition="left">
          <div className="flex gap-6 mt-2">
            {tagsOptions.map(option => (
              <label
                key={option}
                className="flex items-center gap-2 display-marcellus text-white-500 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="tagsPersonalizadas"
                  value={option}
                  checked={step3["Tags Personalizadas"] === option}
                  onChange={e => handleChange("Tags Personalizadas", e.target.value)}
                  className="accent-gold"
                />
                {option}
              </label>
            ))}
          </div>
        </Field>
      </div>

      <div className="md:flex gap-4 my-4 w-full">
        <Field label="Tipo de Xarope / Açúcar">
          <select
            className={inputClass}
            value={step3["Tipo de Xarope / Açúcar"] || ""}
            onChange={e => handleChange("Tipo de Xarope / Açúcar", e.target.value)}
          >
            <option value="">Selecione...</option>
            {acucarOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        {/* Selecione seus Drinks - MultiSelect */}
        <MultiSelect
          label="Selecione seus Drinks"
          options={drinksOptions}
          value={selectedDrinks}
          onChange={handleMultiSelectChange}
          placeholder="Buscar e selecionar drinks..."
          tooltipMessage={drinksFieldTooltipMessage}
        />
      </div>

      {/* Observações */}
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