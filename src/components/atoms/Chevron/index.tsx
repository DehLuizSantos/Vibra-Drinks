// Seta em SVG — fica centralizada de verdade dentro dos botões (caracteres como ‹ › não ficam).

type ChevronProps = {
  direction: "left" | "right" | "up" | "down";
  size?: number;
  className?: string;
};

const ROTATION = { right: 0, down: 90, left: 180, up: 270 };

export default function Chevron({ direction, size = 20, className = "" }: ChevronProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`block ${className}`}
      style={{ transform: `rotate(${ROTATION[direction]}deg)` }}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
