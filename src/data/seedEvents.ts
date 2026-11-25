import type { VibraEvent } from "@/types/event";

const seedDate = "2026-01-01T00:00:00.000Z";

/** Eventos iniciais — usados para popular o banco na primeira execução. */
export const seedEvents: VibraEvent[] = [
  {
    id: "seed-casamento-juliana",
    description:
      "Contratamos a Vibra Drinks para o nosso casamento e foi a melhor decisão! Além dos drinks estarem impecáveis e muito equilibrados, a equipe foi extremamente educada com todos os convidados. O balcão estava lindo e virou um ponto de encontro na festa. Recomendo de olhos fechados",
    image: "/images/casamento1.jpg",
    name: "Juliana Martins",
    type: "casamento",
    eventDescription: "Casamento Elegante",
    photos: [],
    createdAt: seedDate,
    updatedAt: seedDate
  },
  {
    id: "seed-aniversario-ricardo",
    description:
      "Festa animal! O bar não parou um segundo e, mesmo assim, não tinha fila. O Moscow Mule deles é diferenciado e o atendimento dos bartenders é nota 10, super animados. Com certeza vou chamar para os próximos eventos da turma",
    image: "/images/festa1.jpg",
    name: "Ricardo Fonseca",
    type: "aniversarios",
    eventDescription: "Aniversário de 30 Anos",
    photos: [],
    createdAt: seedDate,
    updatedAt: seedDate
  },
  {
    id: "seed-corporativo-carla",
    description:
      "Serviço extremamente profissional. Sem comentarios sobre como fomos bem tratados. Nos agradou, desde os drinks clássicos até as opções sem álcool.",
    image: "/images/corporativo1.jpg",
    name: "Carla",
    type: "corporativos",
    eventDescription: "Evento Corporativo ",
    photos: [],
    createdAt: seedDate,
    updatedAt: seedDate
  },
  {
    id: "seed-corporativo-beatriz",
    description:
      "Serviço extremamente profissional. Contratamos para a festa de final de ano da empresa e o feedback dos colaboradores foi excelente. Pontualidade total na montagem e um cardápio variado que agradou a todos, desde os drinks clássicos até as opções sem álcool.",
    image: "/images/corporativo2.jpg",
    name: "Beatriz Souza",
    type: "corporativos",
    eventDescription: "Confraternização",
    photos: [],
    createdAt: seedDate,
    updatedAt: seedDate
  },
  {
    id: "seed-aniversario-lucas",
    description:
      "A Vibra Drinks deu um show na nossa formatura. Os drinks autorais são muito criativos e a apresentação (copos e guarnições) é de alto nível. Só não dou 5 estrelas porque a noite passou rápido demais e eu queria ter provado o cardápio inteiro! Sensacional",
    image: "/images/Gabriela_e_lucas.png",
    name: "Lucas Oliveira",
    type: "aniversarios",
    eventDescription: "Festa de Formatura",
    photos: [],
    createdAt: seedDate,
    updatedAt: seedDate
  }
];
