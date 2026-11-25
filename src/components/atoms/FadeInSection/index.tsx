// components/atoms/AnimateOnScroll.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type AnimationVariant = "fade" | "slide" | "scale" | "blur" | "dramatic";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  className = "",
  variant = "dramatic",
  delay = 0,
  duration = 900,
  threshold = 0.25,
  once = false
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const element = elementRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Seções mais altas que a tela nunca atingem uma porcentagem alta de visibilidade;
          // por isso também consideramos visível quando a seção ocupa boa parte da viewport.
          const coversViewport =
            entry.rootBounds !== null &&
            entry.intersectionRect.height >= entry.rootBounds.height * threshold;
          const visible =
            entry.isIntersecting && (entry.intersectionRatio >= threshold || coversViewport);

          if (visible && once) {
            setIsVisible(true);
            observer.disconnect(); // "once": anima uma vez e permanece visível
            return;
          }
          setIsVisible(visible);
        },
        {
          // Vários pontos de checagem para reavaliar a visibilidade durante a rolagem
          threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: "0px 0px -15% 0px"
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    },
    [threshold, once]
  );

  // Estados de animação baseado na variante escolhida
  const animationStates = {
    fade: {
      visible: "opacity-100",
      hidden: "opacity-0"
    },
    slide: {
      visible: "opacity-100 translate-x-0",
      hidden: "opacity-0 -translate-x-16"
    },
    scale: {
      visible: "opacity-100 scale-100",
      hidden: "opacity-0 scale-75"
    },
    blur: {
      visible: "opacity-100 blur-0",
      hidden: "opacity-0 blur-md"
    },
    dramatic: {
      visible: "opacity-100 translate-y-0 scale-100 rotate-0 blur-0",
      hidden: "opacity-0 translate-y-20 scale-90 rotate-1 blur-sm"
    }
  };

  const timingFunctions = {
    fade: "cubic-bezier(0.4, 0, 0.2, 1)",
    slide: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    scale: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", // Back ease out
    blur: "cubic-bezier(0.4, 0, 0.2, 1)",
    dramatic: "cubic-bezier(0.34, 1.56, 0.64, 1)" // Spring-like
  };

  return (
    <div
      ref={elementRef}
      className={`
        transform transition-all
        ${isVisible
          ? animationStates[variant].visible
          : animationStates[variant].hidden}
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: timingFunctions[variant],
        willChange: "transform, opacity, filter"
      }}
    >
      {children}
    </div>
  );
}
