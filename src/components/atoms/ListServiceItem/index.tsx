import Image from "next/image";

type ListServiceProps = {
  item: string;
};

export default function ListServiceItem({ item }: ListServiceProps) {
  return (
    <div className="flex items-center justify-start gap-3">
      <Image src="/icons/flor2.svg" alt="marcação" width={30} height={30} />
      <p className="text-gold display-marcellus text-start my-3.5">
        {item}
      </p>
    </div>
  );
}
