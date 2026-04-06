import { useAppStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";


export default function NavbarMobile() {
    const { setMenuOpen } = useAppStore();

    return (
        <nav className="border-2 border-gold rounded-md md:hidden bg-black-300 p-30 flex flex-col justify-center gap-15 h-screen fixed top-0 left-0 right-0 text-center">
            <div className="absolute top-12 right-7 flex align-end justify-end" onClick={() => setMenuOpen(false)}>
                <Image src="/icons/close.svg" alt="close" width="30" height="30" />
            </div>
            <div className="flex-col align-center justify-center text-center">

                <Link href="/" className="text-gold font-bold text-xl tracking-widest flex
        justify-center items-center">
                    <Image src={'/Logo-mobile.svg'} alt="Vibra Drinks" width={50} height={89} />
                </Link>
                <p className="text-xs mt-1 display-font text-bold bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)] bg-clip-text text-transparent">Drinks com alma</p>
            </div>
            <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className=" mt-30 text-white-300 display-font hover:text-gold transition-colors text-sm  tracking-wider "
            >
                Sobre nôs
            </Link>
            <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className=" mt-30 text-white-300 display-font hover:text-gold transition-colors text-sm  tracking-wider"
            >
                Nossos serviços
            </Link>
            <Link
                onClick={() => setMenuOpen(false)}
                href="/"
                className=" mt-30 text-white-300 display-font hover:text-gold transition-colors text-sm  tracking-wider"
            >
                Nossos clientes
            </Link>
            <Link
                href="/orcamento"
                onClick={() => setMenuOpen(false)}
                className=" mt-30 bg-black-500 display-font w-50 text-pink-100 py-2 text-sm font-bold hover:outline-1 outline-amber-50 transition-opacity rounded-lg mx-auto"
            >
                Faça um orçamento
            </Link>
        </nav>
    )
}