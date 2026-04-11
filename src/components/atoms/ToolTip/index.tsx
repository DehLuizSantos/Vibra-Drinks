// components/atoms/Tooltip.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface TooltipProps {
    message: string;
    children?: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export default function Tooltip({
    message,
    children,
    position = "top",
    className = ""
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let top = 0;
            let left = 0;

            switch (position) {
                case "top":
                    top = triggerRect.top - tooltipRect.height - 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case "bottom":
                    top = triggerRect.bottom + 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case "left":
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.left - tooltipRect.width - 8;
                    break;
                case "right":
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.right + 8;
                    break;
            }

            // Garantir que não saia da tela
            const padding = 10;
            if (left < padding) left = padding;
            if (left + tooltipRect.width > window.innerWidth - padding) {
                left = window.innerWidth - tooltipRect.width - padding;
            }
            if (top < padding) top = padding;
            if (top + tooltipRect.height > window.innerHeight - padding) {
                top = window.innerHeight - tooltipRect.height - padding;
            }

            setTooltipPosition({ top, left });
        }
    }, [isVisible, position]);

    const positionClasses = {
        top: "-translate-x-1/2",
        bottom: "-translate-x-1/2",
        left: "-translate-y-1/2",
        right: "-translate-y-1/2"
    };

    return (
        <div className="relative inline-block">
            <div
                ref={triggerRef}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
                className="cursor-help inline-flex items-center justify-center"
            >
                {children || (
                    <div className="w-5 h-5 rounded-full bg-yellow-20/20 border border-yellow-20/50 text-yellow-20 text-xs flex items-center justify-center hover:bg-yellow-20/30 transition-colors mb-2">
                        ?
                    </div>
                )}
            </div>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`
            fixed z-50
            px-3 py-2
            bg-black-500/95 backdrop-blur-sm
            border border-yellow-20/30
            rounded-lg
            text-white-300 text-sm
            max-w-xs
            shadow-xl
            pointer-events-none
            ${className}
          `}
                    style={{
                        top: `${tooltipPosition.top}px`,
                        left: `${tooltipPosition.left}px`,
                    }}
                >
                    <div className="relative">
                        {message}
                        {/* Seta do tooltip */}

                    </div>
                </div>
            )}
        </div>
    );
}