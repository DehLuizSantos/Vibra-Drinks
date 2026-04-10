const labelClass =
  "display-marcellus text-white-300 text-xs uppercase tracking-widest mb-1 mt-6 md:mt-0";
export function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col display-font text-white-500 w-full md:w-full">
      <label className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
