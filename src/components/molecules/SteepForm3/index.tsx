import { Field } from "@/components/atoms/Field";
import { inputClass } from "../SteepForm2";

export function StepForm3() {
  const fields = [
    "Tipo de Copos e Taças",
    "Tipo de Bar",
    "Quantidade de Drinks",
    "Selecione seus Drinks",
    "Tags Personalizadas",
    "Tipo de Xarope / Açúcar"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map(label =>
        <Field key={label} label={label}>
          <select className={inputClass}>
            <option value="">Selecione...</option>
          </select>
        </Field>
      )}
    </div>
  );
}
