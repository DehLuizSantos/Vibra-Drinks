import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipos para o Step 1
interface Step1Data {
  nome: string;
  telefone: string;
  email: string;
}

// Tipos para o Step 2
interface Step2Data {
  tipoEvento: string;
  numeroConvidados: string;
  dataEvento: string;
  duracaoEvento: string;
  possuiLocal: "sim" | "nao" | "";
  localEvento: string; // 👈 Novo campo
}

// Tipos para o Step 3 (dinâmico)
interface Step3Data {
  [key: string]: string; // Chave dinâmica para cada campo
}

// Estado global do formulário
interface FormState {
  // Dados de cada step
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;

  // Step atual
  currentStep: number;

  // Ações
  updateStep1: (data: Partial<Step1Data>) => void;
  updateStep2: (data: Partial<Step2Data>) => void;
  updateStep3: (field: string, value: string) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  getFormData: () => { step1: Step1Data; step2: Step2Data; step3: Step3Data };
  stepErrors: {
    [key: number]: string[];
  };

  // Novas ações
  setStepErrors: (step: number, errors: string[]) => void;
  clearStepErrors: (step: number) => void;
}

// Valores iniciais
const initialStep1: Step1Data = {
  nome: "",
  telefone: "",
  email: ""
};

const initialStep2: Step2Data = {
  tipoEvento: "",
  numeroConvidados: "",
  dataEvento: "",
  duracaoEvento: "",
  possuiLocal: "nao",
  localEvento: "" // 👈 Novo campo
};

const initialStep3: Step3Data = {
  "Tipo de Copos e Taças": "",
  "Tipo de Bar": "",
  "Quantidade de Drinks": "",
  "Selecione seus Drinks": "",
  "Tags Personalizadas": "",
  "Tipo de Xarope / Açúcar": ""
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      step1: initialStep1,
      step2: initialStep2,
      step3: initialStep3,
      currentStep: 1,

      updateStep1: data =>
        set(state => ({
          step1: { ...state.step1, ...data }
        })),

      updateStep2: data =>
        set(state => ({
          step2: { ...state.step2, ...data }
        })),

      updateStep3: (field, value) =>
        set(state => ({
          step3: { ...state.step3, [field]: value }
        })),

      setCurrentStep: step => set({ currentStep: step }),

      resetForm: () =>
        set({
          step1: initialStep1,
          step2: initialStep2,
          step3: initialStep3,
          currentStep: 1
        }),

      getFormData: () => ({
        step1: get().step1,
        step2: get().step2,
        step3: get().step3
      }),
      stepErrors: {},

      setStepErrors: (step, errors) =>
        set(state => ({
          stepErrors: { ...state.stepErrors, [step]: errors }
        })),

      clearStepErrors: step =>
        set(state => {
          const newErrors = { ...state.stepErrors };
          delete newErrors[step];
          return { stepErrors: newErrors };
        })
    }),
    {
      name: "event-form-storage", // Nome no localStorage
      partialize: state => ({
        step1: state.step1,
        step2: state.step2,
        step3: state.step3,
        currentStep: state.currentStep,
        stepErrors: state.stepErrors
      })
    }
  )
);
