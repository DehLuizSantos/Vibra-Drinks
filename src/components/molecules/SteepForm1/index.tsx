import { Field } from "@/components/atoms/Field";
import { handlePhoneChange, handlePhoneKeyDown } from "@/utils/masks";
import { useEffect, useRef } from "react";
import { useFormStore } from "@/store/useFormOrcamentoStore";
import { inputClass } from "@/components/organisms/Steeper";
import Link from "next/link";

export function StepForm1() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { step1, updateStep1 } = useFormStore();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStep1({ nome: e.target.value });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneChange(e);
    updateStep1({ telefone: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStep1({ email: e.target.value });
  };

  return (
    <div className="w-full">
      <div className="w-full md:flex gap-4 md:w-107.5">
        <Field label="Nome">
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Seu nome completo"
            className={inputClass}
            value={step1.nome}
            onChange={handleNomeChange}
          />
        </Field>
        <Field label="Telefone">
          <input
            type="tel"
            placeholder="(00) 00000-0000"
            className={inputClass}
            value={step1.telefone}
            onChange={handleTelefoneChange}
            onKeyDown={handlePhoneKeyDown}
            maxLength={15}
          />
        </Field>
      </div>
      <div className="md:mt-8 md:md:w-107.5">
        <Field label="Email">
          <input
            type="email"
            placeholder="seu@email.com"
            className={inputClass}
            value={step1.email}
            onChange={handleEmailChange}
          />
        </Field>
      </div>
    
    </div>
  );
}