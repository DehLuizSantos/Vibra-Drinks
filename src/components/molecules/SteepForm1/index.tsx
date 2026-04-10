import { Field } from "@/components/atoms/Field";
import { inputClass } from "@/components/organisms/Steeper";

export function StepForm1() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Nome">
        <input
          type="text"
          placeholder="Seu nome completo"
          className={inputClass}
        />
      </Field>
      <Field label="Telefone">
        <input
          type="tel"
          placeholder="(00) 00000-0000"
          className={inputClass}
        />
      </Field>
      <Field label="Email">
        <input
          type="email"
          placeholder="seu@email.com"
          className={inputClass}
        />
      </Field>
    </div>
  );
}
