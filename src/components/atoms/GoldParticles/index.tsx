// Partículas douradas que sobem lentamente (efeito "poeira/pétalas" do slider).
// Valores fixos (não aleatórios) para o HTML do servidor e do navegador serem idênticos.

const PARTICLES = [
  { left: 4, size: 6, duration: 14, delay: 0, drift: 30 },
  { left: 11, size: 3, duration: 18, delay: 3, drift: -20 },
  { left: 19, size: 5, duration: 12, delay: 6, drift: 25 },
  { left: 27, size: 2, duration: 20, delay: 1, drift: -35 },
  { left: 34, size: 4, duration: 16, delay: 8, drift: 15 },
  { left: 42, size: 7, duration: 22, delay: 4, drift: -25 },
  { left: 49, size: 3, duration: 13, delay: 10, drift: 40 },
  { left: 56, size: 5, duration: 17, delay: 2, drift: -15 },
  { left: 63, size: 2, duration: 19, delay: 7, drift: 20 },
  { left: 70, size: 6, duration: 15, delay: 11, drift: -30 },
  { left: 77, size: 3, duration: 21, delay: 5, drift: 35 },
  { left: 84, size: 4, duration: 14, delay: 9, drift: -20 },
  { left: 90, size: 5, duration: 18, delay: 1.5, drift: 10 },
  { left: 96, size: 3, duration: 16, delay: 6.5, drift: -40 }
];

export default function GoldParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="vd-particle"
          style={
            {
              left: `${p.left}%`,
              width: p.size * 2,
              height: p.size * 2,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--vd-drift": `${p.drift}px`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
