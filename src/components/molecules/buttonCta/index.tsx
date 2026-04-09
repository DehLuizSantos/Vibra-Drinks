import Link from "next/link";

export default function ButtonCta() {
  return (
    <Link
      href={"/orcamento"}
      className="border border-gold bg-pink-300 p-6 text-white-500 rounded-2xl w-full flex text-center drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] md:h-20"
    >
      <p className="mx-auto display-font md:text-2xl">FAÇA UM ORÇAMENTO JÁ</p>
    </Link>
  );
}
