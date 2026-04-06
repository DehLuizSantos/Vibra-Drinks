type MenuBurguerProps = {
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

export default function MenuBurguer({
  isMenuOpen,
  toggleMenu
}: MenuBurguerProps) {
  return (
    <button
      className="md:hidden flex flex-col gap-1.25 p-15 cursor-pointer"
      onClick={toggleMenu}
      aria-label="Menu"
    >
      <span
        className={`block w-6 h-0.5 bg-white-500 transition-transform duration-300 ${isMenuOpen
          ? "rotate-45 translate-y-[1.75]"
          : ""}`}
      />
      <span
        className={`block w-6 h-0.5 bg-white-500 transition-opacity duration-300 ${isMenuOpen
          ? "opacity-0"
          : ""}`}
      />
      <span
        className={`block w-6 h-0.5 bg-white-500 transition-transform duration-300 ${isMenuOpen
          ? "-rotate-45 -translate-y-[1.75]"
          : ""}`}
      />
    </button>
  );
}
