import { Field } from "@/components/atoms/Field";
import { inputClass } from "@/components/organisms/Steeper";
import { useFormStore } from "@/store/useFormOrcamentoStore";

export function StepForm3() {
  const { step3, updateStep3 } = useFormStore();

  const fields = [
    "Tipo de Copos e Taças",
    "Tipo de Bar",
    "Quantidade de Drinks",
    "Selecione seus Drinks",
    "Tags Personalizadas",
    "Tipo de Xarope / Açúcar"
  ];

  const handleChange = (field: string, value: string) => {
    updateStep3(field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map(label =>
        <Field key={label} label={label}>
          <select
            className={inputClass}
            value={step3[label] || ""}
            onChange={e => handleChange(label, e.target.value)}
          >
            <option value="">Selecione...</option>
            {/* Opções dinâmicas podem ser adicionadas aqui */}
          </select>
        </Field>
      )}
    </div>
  );
}
