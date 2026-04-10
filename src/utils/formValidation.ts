// utils/formValidation.ts (versão corrigida com validação de drinks)

export interface Step1Data {
  nome: string;
  telefone: string;
  email: string;
}

export interface Step2Data {
  tipoEvento: string;
  numeroConvidados: string;
  dataEvento: string;
  duracaoEvento: string;
  possuiLocal: 'sim' | 'nao' | '';
  localEvento: string;
}

export interface Step3Data {
  [key: string]: string;
}

// Função auxiliar para extrair o número da string "X drinks"
const extractDrinkQuantity = (quantityStr: string): number => {
  if (!quantityStr) return 0;
  const match = quantityStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

// Função principal sem overloads, aceitando number
export const validateStep = (
  step: number,
  data: Step1Data | Step2Data | Step3Data
): { isValid: boolean; errors: string[] } => {
  switch (step) {
    case 1: {
      const d = data as Step1Data;
      const errors: string[] = [];
      
      if (!d.nome?.trim()) errors.push('Nome é obrigatório');
      if (!d.telefone?.trim()) errors.push('Telefone é obrigatório');
      else {
        const phoneClean = d.telefone.replace(/\D/g, '');
        if (phoneClean.length < 10 || phoneClean.length > 11) errors.push('Telefone inválido');
      }
      if (!d.email?.trim()) errors.push('E-mail é obrigatório');
      else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(d.email)) errors.push('E-mail inválido');
      }
      
      return { isValid: errors.length === 0, errors };
    }
    
    case 2: {
      const d = data as Step2Data;
      const errors: string[] = [];
      
      if (!d.tipoEvento) errors.push('Tipo de evento é obrigatório');
      if (!d.numeroConvidados) errors.push('Número de convidados é obrigatório');
      else if (parseInt(d.numeroConvidados) <= 0) errors.push('Número de convidados deve ser maior que zero');
      if (!d.dataEvento) errors.push('Data do evento é obrigatória');
      else {
        const selectedDate = new Date(d.dataEvento);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) errors.push('Data do evento não pode ser no passado');
      }
      if (!d.duracaoEvento) errors.push('Duração do evento é obrigatória');
      if (!d.possuiLocal) errors.push('Informe se possui local para o evento');
      if (d.possuiLocal === 'sim' && !d.localEvento?.trim()) {
        errors.push('Local do evento é obrigatório quando possui local');
      }
      
      return { isValid: errors.length === 0, errors };
    }
    
    case 3: {
      const d = data as Step3Data;
      const errors: string[] = [];
      const requiredFields = [
        "Tipo de Copos e Taças",
        "Tipo de Bar",
        "Quantidade de Drinks",
        "Selecione seus Drinks",
        "Tags Personalizadas",
        "Tipo de Xarope / Açúcar"
      ];
      
      // Verifica campos obrigatórios
      requiredFields.forEach(field => {
        if (!d[field] || !d[field].trim()) {
          errors.push(`${field} é obrigatório`);
        }
      });
      
      // Validação específica: quantidade de drinks vs drinks selecionados
      const quantidadeDrinksStr = d["Quantidade de Drinks"];
      const drinksSelecionadosStr = d["Selecione seus Drinks"];
      
      if (quantidadeDrinksStr && drinksSelecionadosStr) {
        const quantidadeEsperada = extractDrinkQuantity(quantidadeDrinksStr);
        const drinksSelecionados = drinksSelecionadosStr.split(",").filter(drink => drink.trim() !== "");
        const quantidadeSelecionada = drinksSelecionados.length;
        
        if (quantidadeEsperada > 0 && quantidadeSelecionada !== quantidadeEsperada) {
          errors.push(
            `Você selecionou ${quantidadeSelecionada} drink${quantidadeSelecionada !== 1 ? 's' : ''}, ` +
            `mas escolheu ${quantidadeEsperada} no campo "Quantidade de Drinks". ` +
            `Por favor, selecione exatamente ${quantidadeEsperada} drink${quantidadeEsperada !== 1 ? 's' : ''}.`
          );
        }
        
        // Verifica se algum drink foi selecionado repetido (opcional, mas útil)
        const drinksUnicos = new Set(drinksSelecionados);
        if (drinksUnicos.size !== drinksSelecionados.length) {
          errors.push("Você selecionou drinks duplicados. Por favor, escolha drinks diferentes.");
        }
      } else if (quantidadeDrinksStr && !drinksSelecionadosStr) {
        const quantidadeEsperada = extractDrinkQuantity(quantidadeDrinksStr);
        if (quantidadeEsperada > 0) {
          errors.push(`Você precisa selecionar exatamente ${quantidadeEsperada} drink${quantidadeEsperada !== 1 ? 's' : ''} no campo "Selecione seus Drinks"`);
        }
      }
      
      return { isValid: errors.length === 0, errors };
    }
    
    default: {
      return { isValid: false, errors: ['Step inválido'] };
    }
  }
};