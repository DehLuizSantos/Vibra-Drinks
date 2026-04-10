import { CardItem } from "@/components/molecules/cardClientOpinion";
import { create } from "zustand";

const items: CardItem[] = [
    {
      description:
        "Contratamos a Vibra Drinks para o nosso casamento e foi a melhor decisão! Além dos drinks estarem impecáveis e muito equilibrados, a equipe foi extremamente educada com todos os convidados. O balcão estava lindo e virou um ponto de encontro na festa. Recomendo de olhos fechados",
      image: "/images/Gabriela_e_lucas.png",
      name: "Juliana Martins",
      type: "casamento",
      eventDescription: 'Casamento Elegante'
    },
    {
      description:
        "Festa animal! O bar não parou um segundo e, mesmo assim, não tinha fila. O Moscow Mule deles é diferenciado e o atendimento dos bartenders é nota 10, super animados. Com certeza vou chamar para os próximos eventos da turma",
      image: "/images/Gabriela_e_lucas.png",
      name: "Ricardo Fonseca",
      type: "intimos",
      eventDescription: 'Aniversário de 30 Anos'

    },
    {
      description:
        "Serviço extremamente profissional. Contratamos para a festa de final de ano da empresa e o feedback dos colaboradores foi excelente. Pontualidade total na montagem e um cardápio variado que agradou a todos, desde os drinks clássicos até as opções sem álcool.",
      image: "/images/Gabriela_e_lucas.png",
      name: " Beatriz Souza",
      type: "corporativos",
      eventDescription: 'Evento Corporativo / Confraternização'

    },
    {
      description:"A Vibra Drinks deu um show na nossa formatura. Os drinks autorais são muito criativos e a apresentação (copos e guarnições) é de alto nível. Só não dou 5 estrelas porque a noite passou rápido demais e eu queria ter provado o cardápio inteiro! Sensacional",
      image: "/images/Gabriela_e_lucas.png",
      name: "Lucas Oliveira",
      type: "intimos",
      eventDescription: 'Festa de Formatura'

    },
    {
      description:"Fizeram o bar do meu chá de revelação e foi tudo perfeito. Criaram drinks personalizados com as cores do tema e foram super atenciosos com os detalhes. É um serviço que eleva o nível da festa e deixa a gente muito tranquila como anfitriã. Adorei!",
      image: "/images/Gabriela_e_lucas.png",
      name: "Mariana Costa",
      type: "intimos",
      eventDescription: 'Chá de Revelação / Evento Familiar'

    },

  ];

interface AppState {
  items: CardItem[];
  setItems: (open: CardItem[]) => void;
  menuType: "casamento" | "corporativos" | "intimos";
  setMenuType: (menu: "casamento" | "corporativos" | "intimos") => void;
}

export const useAppMenuStore = create<AppState>((set) => ({
  items: items,
  menuType:  "casamento",
  setItems: (newItems) => set({ items: newItems }),
  setMenuType:(menu) => {
    const filteredItems = items.filter((item) => item.type === menu)
    set({menuType: menu, items: filteredItems})
  } ,
}));
