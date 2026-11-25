// Balão de erro de validação, ancorado logo abaixo do campo.
// O elemento pai precisa ter `position: relative` (classe `relative`).

type FieldErrorTooltipProps = {
  message?: string;
  id?: string;
};

export default function FieldErrorTooltip({ message, id }: FieldErrorTooltipProps) {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      data-field-error
      className="vd-fade-in absolute left-0 top-full z-20 mt-2 flex max-w-[min(20rem,100%)] items-start gap-2 rounded-lg border border-red-400/70 bg-black-300 px-3 py-2 shadow-xl shadow-black/40"
    >
      {/* Setinha apontando para o campo */}
      <span
        aria-hidden="true"
        className="absolute -top-[5px] left-4 h-2.5 w-2.5 rotate-45 border-l border-t border-red-400/70 bg-black-300"
      />
      <span
        aria-hidden="true"
        className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-400 text-[10px] font-bold leading-none text-black-500"
      >
        !
      </span>
      <span className="display-marcellus text-xs leading-snug text-red-300">{message}</span>
    </div>
  );
}
