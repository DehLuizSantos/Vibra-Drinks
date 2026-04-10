"use client";

import { StepForm1 } from "@/components/molecules/SteepForm1";
import { StepForm2 } from "@/components/molecules/SteepForm2";
import { StepForm3 } from "@/components/molecules/SteepForm3";
import Image from "next/image";
import { useState, useRef } from "react";
import { validateStep } from "@/utils/formValidation";
import { useFormStore } from "@/store/useFormOrcamentoStore";
import { sendToWhatsApp } from "@/utils/sendTowhatsApp";

export const inputClass =
  "w-full rounded-lg px-4 py-3 border-2 border-gold text-white-500 display-marcellus text-sm transition-colors";

const steps = [
  { number: 1, label: "Informações pessoais" },
  { number: 2, label: "Informações evento" },
  { number: 3, label: "Variáveis do evento" }
];

const stepForms = [
  <StepForm1 key={1} />,
  <StepForm2 key={2} />,
  <StepForm3 key={3} />
];

export default function Steeper() {
  const { currentStep, setCurrentStep, step1, step2, step3, stepErrors, setStepErrors, clearStepErrors } = useFormStore();
  const scrollContainerRef = useRef(null);
  const [showErrors, setShowErrors] = useState(false);

  const readImage = () => {
    const images = [
      {
        image: "/images/orcamento/section1.png",
        alt: "Drinks"
      },
      {
        image: "/images/orcamento/section2.png",
        alt: "Drinks"
      },
      {
        image: "/images/orcamento/section3.png",
        alt: "Drinks"
      }
    ];

    return images[currentStep - 1];
  };

  // Função para validar e mudar de step
  const handleStepChange = (targetStep: number) => {
    // Se for voltar, não precisa validar
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      setShowErrors(false);
      clearStepErrors(currentStep);
      return;
    }

    // Se for avançar, valida o step atual
    const currentStepData = getCurrentStepData();
    const validation = validateStep(currentStep, currentStepData);
    
    if (validation.isValid) {
      setCurrentStep(targetStep);
      setShowErrors(false);
      clearStepErrors(currentStep);
    } else {
      setStepErrors(currentStep, validation.errors);
      setShowErrors(true);
      // Scroll para o topo do formulário para mostrar os erros
      document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Função para pegar os dados do step atual
  const getCurrentStepData = () => {
    switch (currentStep) {
      case 1:
        return step1;
      case 2:
        return step2;
      case 3:
        return step3;
      default:
        return {};
    }
  };

  // Função para o botão "Próximo"
 const handleNext = () => {
  if (currentStep < steps.length) {
    handleStepChange(currentStep + 1);
  } else {
    // Se for o último step, validar e enviar
    const finalValidation = validateStep(3, step3);
    if (finalValidation.isValid) {
      // Envia os dados para o WhatsApp
      const formData = { step1, step2, step3 };
      sendToWhatsApp(formData);
    } else {
      setStepErrors(3, finalValidation.errors);
      setShowErrors(true);
    }
  }
};

   // Verifica se o step atual tem erros
  const hasErrors = stepErrors[currentStep] && stepErrors[currentStep].length > 0;

  return (
    <div className="w-full relative md:flex md:flex-row-reverse">
      <div className="mx-auto relative w-82.5 h-82.5 md:w-140 md:h-140 md:bottom-35 md:left-35">
        <Image
          src={readImage().image}
          fill
          alt={readImage().alt}
          className="mx-auto my-8"
        />
      </div>
      <div className="mt-12">
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-4 overflow-x-auto p-4 md:p-0 md:mb-12"
          style={{
            WebkitOverflowScrolling: "touch"
          }}
        >
          {steps.map((step, index) => {
            const isStepValid = () => {
              switch (step.number) {
                case 1:
                  return validateStep(1, step1).isValid;
                case 2:
                  return validateStep(2, step2).isValid;
                case 3:
                  return validateStep(3, step3).isValid;
                default:
                  return false;
              }
            };

            return (
              <div
                key={step.number}
                className="flex items-start gap-4"
                style={{ flexShrink: 0 }}
              >
                <button
                  onClick={() => handleStepChange(step.number)}
                  className="text-left cursor-pointer group"
                >
                  <p
                    className={`display-font text-xs transition-colors ${
                      currentStep === step.number
                        ? "text-gold"
                        : "text-white-500"
                    }`}
                  >
                    Passo {step.number}
                  </p>
                  <p
                    className={`display-marcellus text-sm transition-colors ${
                      currentStep === step.number
                        ? "text-gold"
                        : isStepValid() && step.number < currentStep
                        ? "text-green-500"
                        : "text-white-500"
                    }`}
                  >
                    {step.label}
                    {isStepValid() && step.number < currentStep && (
                      <span className="ml-2">✓</span>
                    )}
                  </p>
                </button>

                {index < steps.length - 1 &&
                  <span className="text-white-300 text-xl mt-1 select-none">
                    ›
                  </span>}
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="p-8 md:p-0 form-container">
          {/* Exibição de erros */}
          {showErrors && hasErrors && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 font-bold mb-2">Por favor, corrija os seguintes erros:</p>
              <ul className="list-disc list-inside">
                {stepErrors[currentStep]?.map((error, idx) => (
                  <li key={idx} className="text-red-400 text-sm">{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {stepForms[currentStep - 1]}
          
          {/* Botões de navegação */}
          <div className="flex justify-between mt-8 gap-4 w-full">         
            
            <button
              onClick={handleNext}
              className={`border cursor-pointer border-gold bg-pink-300 p-6 text-white-500 rounded-2xl w-full flex text-center drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] md:h-20 ${
                currentStep === steps.length
                  ? 'bg-green-600 hover:border-2 text-white'
                  : 'bg-gold hover:border-2 text-black'
              }`}
            >
              <p className="w-full text-center text-2xl display-font">{currentStep === steps.length ? 'Enviar' : 'Próximo Passo'}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}