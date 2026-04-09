export default function MenuOpiniao() {
  const menuOptions = [
    {
      value: "casamentos",
      label: "CASAMENTOS"
    },
    {
      value: "corporativos",
      label: "EVENTOS CORPORATIVOS"
    },
    {
      value: "intimos",
      label: "EVENTOS INTIMOS"
    }
  ];

  return (
    <div className="flex items-center justify-around my-3.5">
      {menuOptions.map(menu =>
        <div
          className="rounded-full border border-gold w-23 h-23 md:w-36.5 md:h-36.5 flex items-center justify-center"
          key={menu.value}
        >
          <p className="text-xs display-marcellus text-gold text-center  p-1">
            {menu.label}
          </p>
        </div>
      )}
    </div>
  );
}
