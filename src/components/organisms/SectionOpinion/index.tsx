import ButtonCta from "@/components/molecules/buttonCta";
import CardClientOpinion, {
  CardItem
} from "@/components/molecules/cardClientOpinion";
import MenuOpiniao from "@/components/molecules/menuOpiniao";

export default function SectionOpinion() {
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
      type: "casamento"
    }
  ];
  return (
    <section className="md:p-24">
      <div className="md:flex align-center justify-around text-center md:text-start gap-10">
        <div className="">
          <div className="border-gradient-bottom text-center md:text-start">
            <h2 className="text-2xl px-4 text-pink-100 py-8 display-font md:text-5xl md:w-135  md:px-0">
              A opinião de quem vive a excelência
            </h2>
          </div>
          <p className="px-3.5 py-8 text-white-500  display-marcellus text-2xl md:text-2xl md:px-0 md:w-135md:py-3.5">
            Veja o que nossos clientes falam da experiência
          </p>
          <div className="w-full  md:h-112.5 md:w-170">
            <MenuOpiniao />
            <div className="hidden md:block mt-8">
              <ButtonCta />
            </div>
          </div>
        </div>

        <div className="p-7 md:flex flex-col align-start justify-between column ">
          <CardClientOpinion items={items} />
        </div>

        <div className="md:hidden p-4">
          <ButtonCta />
        </div>
      </div>
    </section>
  );
}
