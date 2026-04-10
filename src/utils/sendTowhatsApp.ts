// utils/sendToWhatsApp.ts

interface Step1Data {
  nome: string;
  telefone: string;
  email: string;
}

interface Step2Data {
  tipoEvento: string;
  numeroConvidados: string;
  dataEvento: string;
  duracaoEvento: string;
  possuiLocal: "sim" | "nao" | "";
  localEvento: string;
}

interface Step3Data {
  [key: string]: string;
}

interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

// Função para formatar a data (YYYY-MM-DD para DD/MM/YYYY)
const formatDate = (dateString: string): string => {
  if (!dateString) return "Não informada";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

// Função para formatar o telefone (remover máscara e deixar só números)
const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return "Não informado";
  return phone;
};

// Função principal para gerar a mensagem
export const generateWhatsAppMessage = (data: FormData): string => {
  const { step1, step2, step3 } = data;

  // Formatação da mensagem
  let message = "🍸 *NOVO ORÇAMENTO - HOUSI BAR* 🍸\n\n";
  message += "━─━─━━─━─━━─━─━─━─\n";
  message += "*📋 INFORMAÇÕES PESSOAIS*\n";
  message += "━─━─━━─━─━━─━─━─━─\n";
  message += `👤 *Nome:* ${step1.nome || "Não informado"}\n`;
  message += `📞 *Telefone:* ${formatPhoneForDisplay(step1.telefone)}\n`;
  message += `✉️ *E-mail:* ${step1.email || "Não informado"}\n\n`;

  message += "━─━─━━─━─━━─━─━─━─\n";
  message += "*🎉 INFORMAÇÕES DO EVENTO*\n";
  message += "━─━─━━─━─━━─━─━─━─\n";

  // Tipo de Evento
  const tipoEventoMap: { [key: string]: string } = {
    casamento: "Casamento",
    corporativo: "Corporativo",
    intimo: "Íntimo"
  };
  message += `🎭 *Tipo de Evento:* ${tipoEventoMap[step2.tipoEvento] ||
    step2.tipoEvento ||
    "Não informado"}\n`;

  message += `👥 *Número de Convidados:* ${step2.numeroConvidados ||
    "Não informado"}\n`;
  message += `📅 *Data do Evento:* ${formatDate(step2.dataEvento)}\n`;
  message += `⏱️ *Duração do Evento:* ${step2.duracaoEvento
    ? `${step2.duracaoEvento} horas`
    : "Não informado"}\n`;
  message += `📍 *Possui Local:* ${step2.possuiLocal === "sim"
    ? "Sim"
    : step2.possuiLocal === "nao" ? "Não" : "Não informado"}\n`;

  if (step2.possuiLocal === "sim" && step2.localEvento) {
    message += `🏠 *Local do Evento:* ${step2.localEvento}\n`;
  }
  message += "\n";

  message += "━─━─━━─━─━━─━─━─━─\n";
  message += "*🍹 VARIÁVEIS DO EVENTO*\n";
  message += "━─━─━━─━─━━─━─━─━─\n";

  // Tipo de Copos e Taças
  if (step3["Tipo de Copos e Taças"]) {
    message += `🥂 *Tipo de Copos e Taças:* ${step3[
      "Tipo de Copos e Taças"
    ]}\n`;
  }

  // Tipo de Bar
  if (step3["Tipo de Bar"]) {
    message += `🍾 *Tipo de Bar:* ${step3["Tipo de Bar"]}\n`;
  }

  // Quantidade de Drinks
  if (step3["Quantidade de Drinks"]) {
    message += `🍹 *Quantidade de Drinks:* ${step3["Quantidade de Drinks"]}\n`;
  }

  // Tags Personalizadas
  if (step3["Tags Personalizadas"]) {
    message += `🏷️ *Tags Personalizadas:* ${step3["Tags Personalizadas"]}\n`;
  }

  // Tipo de Xarope / Açúcar
  if (step3["Tipo de Xarope / Açúcar"]) {
    message += `🍬 *Tipo de Xarope/Açúcar:* ${step3[
      "Tipo de Xarope / Açúcar"
    ]}\n`;
  }

  // Drinks Selecionados
  if (step3["Selecione seus Drinks"] && step3["Selecione seus Drinks"] !== "") {
    const drinks = step3["Selecione seus Drinks"].split(",");
    message += `\n🍸 *DRINKS SELECIONADOS:* (${drinks.length} drinks)\n`;
    message += "─━─━─━─━─━─━─━─━─━─\n";
    drinks.forEach((drink, index) => {
      // Pega apenas o nome principal do drink (antes dos dois pontos)
      const drinkName = drink.split(":")[0];
      message += `${index + 1}. ${drinkName}\n`;
    });
  }

  // Observações
  if (step3["Observações"] && step3["Observações"].trim() !== "") {
    message += `\n━─━─━━─━─━━─━─━─━─\n`;
    message += "*📝 OBSERVAÇÕES ADICIONAIS*\n";
    message += "━─━─━━─━─━━─━─━─━─\n";
    message += `${step3["Observações"]}\n`;
  }

  message += "\n━─━─━━─━─━━─━─━─━─\n";
  message += "✨ *Solicitação enviada via site* ✨\n";
  message += "━─━─━━─━─━━─━─━─━─";

  return encodeURIComponent(message);
};

// Função para enviar para o WhatsApp
export const sendToWhatsApp = (data: FormData): void => {
  const phoneNumber = "5511946419170";
  const message = generateWhatsAppMessage(data);
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;

  // Abre o WhatsApp em uma nova aba
  window.open(whatsappUrl, "_blank");

  // Redireciona para a página de obrigado após 1 segundo
  setTimeout(() => {
    window.location.href = "/obrigado";
  }, 1000);
};
