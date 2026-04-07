import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black-500 text-white-300 noise-bg border-2 border-gold bt-white-300 p-7">
      <section className="">
        <h3 className="display-marcellus text-white-300">Redes sociais</h3>
        <div className="border-white-500 border w-full my-4" />
        <div className="flex justify-start gap-6">
          <Image
            src="/icons/redes-sociais/facebook.svg"
            alt="facebook"
            width={30}
            height={30}
          />
          <Image
            src="/icons/redes-sociais/instagram.svg"
            alt="facebook"
            width={30}
            height={30}
          />
          <Image
            src="/icons/redes-sociais/linkedin.svg"
            alt="facebook"
            width={30}
            height={30}
          />
        </div>
      </section>
      <section className="mt-9">
        <h3 className="display-marcellus text-white-300">Contatos</h3>
        <div className="border-white-500 border w-full my-4" />
        <div className="">
          <div className="">
            <span className="text-gold display-marcellus text-sm">
              TELEFONE:{" "}
            </span>
            <span className="text-white-500 display-marcellus text-sm">
              +55 11 991857180
            </span>
          </div>
          <div className="my-4">
            <span className="text-gold display-marcellus text-sm">EMAIL: </span>
            <span className="text-white-500 display-marcellus text-sm">
              vibradrinks@outlook.com
            </span>
          </div>
          <div className="">
            <span className="text-gold display-marcellus text-sm">
              ENDEREÇO:{" "}
            </span>
            <span className="text-white-500 display-marcellus text-sm">
              alameda olga 180, barra funda SP/SP
            </span>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-start mt-14 gap-3">
        <Image
          src="/Logo.svg"
          alt="Vibra Drinks, elevando o nível de seu evento"
          width={50}
          height={89}
        />
        <h2 className="bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)] bg-clip-text text-transparent text-sm display-font">
          Elevando o nível de seu evento
        </h2>
      </section>
    </footer>
  );
}
