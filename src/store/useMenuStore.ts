import { CardItem } from "@/components/molecules/cardClientOpinion";
import { create } from "zustand";

const items: CardItem[] = [
    {
      description:
        "Vocês foram incríveis, desde meu primeiro contato com a Débora (que fiquei muito feliz dela ter ido tb! ) Fui atendida de forma excelente! Os drinks estavam maravilhosos recebi muitos elogios dos convidados. Queria agradecer muito a equipe toda, muito obrigada pelo trabalho e dedicação de vocês estou muito feliz com todo resultado! (Eu mesma aproveitei muito não parava copo vazio na minha mão)",
      image: "/images/Gabriela_e_lucas.png",
      name: "Gabriela e Lucas",
      type: "casamento"
    },
    {
      description:
        "Vocês foram , desde meu primeiro contato com a Débora (que fiquei muito feliz dela ter ido tb! ) Fui atendida de forma excelente! Os drinks estavam maravilhosos recebi muitos elogios dos convidados. Queria agradecer muito a equipe toda, muito obrigada pelo trabalho e dedicação de vocês estou muito feliz com todo resultado! (Eu mesma aproveitei muito não parava copo vazio na minha mão)",
      image: "/images/Gabriela_e_lucas.png",
      name: "Alauane e André",
      type: "corporativos"
    },
    {
      description:
        "Vocês foram , desde meu primeiro contato com a Débora (que fiquei muito feliz dela ter ido tb! ) Fui atendida de forma excelente! Os drinks estavam maravilhosos recebi muitos elogios dos convidados. Queria agradecer muito a equipe toda, muito obrigada pelo trabalho e dedicação de vocês estou muito feliz com todo resultado! (Eu mesma aproveitei muito não parava copo vazio na minha mão)",
      image: "/images/Gabriela_e_lucas.png",
      name: "Alauane e Giovany",
      type: "intimos"
    },
    {
      description:"10/10, tudo perfeito!",
      image: "/images/Gabriela_e_lucas.png",
      name: "Giovana e André",
      type: "intimos"
    },
    {
      description:"10/10, tudo perfeito!",
      image: "/images/Gabriela_e_lucas.png",
      name: "João e Eduarda",
      type: "intimos"
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
