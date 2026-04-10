// utils/formValidation.ts

// Interface para os dados de cada step
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

// Função para validar Step 1
export const validateStep1 = (data: Step1Data): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.nome.trim()) {
    errors.push('Nome é obrigatório');
  }

  if (!data.telefone.trim()) {
    errors.push('Telefone é obrigatório');
  } else {
    const phoneClean = data.telefone.replace(/\D/g, '');
    if (phoneClean.length < 10 || phoneClean.length > 11) {
      errors.push('Telefone inválido');
    }
  }

  if (!data.email.trim()) {
    errors.push('E-mail é obrigatório');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('E-mail inválido');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Função para validar Step 2
export const validateStep2 = (data: Step2Data): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.tipoEvento) {
    errors.push('Tipo de evento é obrigatório');
  }

  if (!data.numeroConvidados) {
    errors.push('Número de convidados é obrigatório');
  } else if (parseInt(data.numeroConvidados) <= 0) {
    errors.push('Número de convidados deve ser maior que zero');
  }

  if (!data.dataEvento) {
    errors.push('Data do evento é obrigatória');
  } else {
    const selectedDate = new Date(data.dataEvento);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.push('Data do evento não pode ser no passado');
    }
  }

  if (!data.duracaoEvento) {
    errors.push('Duração do evento é obrigatória');
  }

  if (!data.possuiLocal) {
    errors.push('Informe se possui local para o evento');
  }

  if (data.possuiLocal === 'sim' && !data.localEvento?.trim()) {
    errors.push('Local do evento é obrigatório quando possui local');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Função para validar Step 3
export const validateStep3 = (data: Step3Data): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  const requiredFields = [
    "Tipo de Copos e Taças",
    "Tipo de Bar",
    "Quantidade de Drinks",
    "Selecione seus Drinks",
    "Tags Personalizadas",
    "Tipo de Xarope / Açúcar"
  ];

  requiredFields.forEach(field => {
    if (!data[field] || !data[field].trim()) {
      errors.push(`${field} é obrigatório`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Função principal que chama a validação correta baseada no step
export const validateStep = (step: number, data: any): { isValid: boolean; errors: string[] } => {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    default:
      return { isValid: false, errors: ['Step inválido'] };
  }
};