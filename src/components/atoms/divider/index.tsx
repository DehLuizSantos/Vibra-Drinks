import Image from "next/image";

export default function Divider() {
  return (
    <div className="flex items-center justify-between gap-1 my-3.5">
      <div className="w-full  h-0.5 bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)]" />
      <Image src="/icons/flor.svg" alt="divisão" width={48} height="26" />
      <div className="w-full  h-0.5 bg-[linear-gradient(180deg,#996A01_100%,#FFB001_10%)]" />
    </div>
  );
}
