// components/molecules/menuOpiniao.tsx
"use client";

import { useAppMenuStore } from "@/store/useMenuStore";

const menuItems = [
  { id: "casamento", label: "Casamentos" },
  { id: "corporativos", label: "Corporativos" },
  { id: "intimos", label: "Íntimos" }
] as const;

export default function MenuOpiniao() {
  const { menuType, setMenuType } = useAppMenuStore();

  return (
    <div className="flex justify-center md:justify-start gap-2 md:gap-4 flex-wrap my-9">
      {menuItems.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setMenuType(id)}
          className={`cursor-pointer w-29 md:w-50
            px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300
            display-marcellus text-sm md:text-base font-medium
            ${menuType === id
              ? "bg-gold text-black-300 shadow-lg shadow-gold/20"
              : "bg-transparent border border-gold text-gold hover:bg-gold/10 hover:scale-105"
            }
          `}
        >

          {label}
        </button>
      ))}
    </div>
  );
}