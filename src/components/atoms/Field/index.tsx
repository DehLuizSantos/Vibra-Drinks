// components/molecules/Field.tsx (ou onde estiver)

import Tooltip from "../ToolTip";

const labelClass =
  "display-marcellus text-white-300 text-xs uppercase tracking-widest mb-1 mt-6 md:mt-0";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  hasTooltip?: boolean;
  tooltipMessage?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export function Field({
  label,
  children,
  hasTooltip = false,
  tooltipMessage = "",
  tooltipPosition = "top"
}: FieldProps) {
  return (
    <div className={`flex flex-col display-font text-white-500 w-full md:w-full` }>
      <div className={`flex items-center justify-between`}>
        <label className={labelClass}>
          {label}
        </label>
        {hasTooltip && tooltipMessage && (
          <Tooltip message={tooltipMessage} position={tooltipPosition} />
        )}
      </div>
      {children}
    </div>
  );
}