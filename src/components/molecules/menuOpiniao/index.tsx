"use client";
import { useAppMenuStore } from "@/store/useMenuStore";
import { useStore } from "zustand";

type MenuOpiniaoProp = {
  value: "casamento" | "corporativos" | "intimos";
  label: string;
};

export default function MenuOpiniao() {
  const menuOptions: MenuOpiniaoProp[] = [
    { value: "casamento", label: "CASAMENTOS" },
    { value: "corporativos", label: "EVENTOS CORPORATIVOS" },
    { value: "intimos", label: "EVENTOS INTIMOS" }
  ];

  const { menuType, setMenuType } = useStore(useAppMenuStore);

  return (
    <div className="flex items-center justify-around my-3.5">
      {menuOptions.map(menu =>
        <div
          className={`rounded-full
            cursor-pointer
            ${menuType === menu.value ? "border-3" : "border"}
            ${menuType === menu.value &&
              "drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)]"}
             border-gold w-23 h-23 md:w-36.5 md:h-36.5 flex items-center justify-center   `}
          key={menu.value}
          onClick={() => setMenuType(menu.value)}
        >
          <p className="text-xs display-marcellus text-gold text-center  p-1">
            {menu.label}
          </p>
        </div>
      )}
    </div>
  );
}
