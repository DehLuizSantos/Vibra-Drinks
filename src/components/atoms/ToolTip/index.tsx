"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

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
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isVisible || isMobile || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const padding = 10;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 8;
        break;
    }

    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));

    setCoords({ top, left });
  }, [isVisible, position, isMobile]);

  useEffect(() => {
    if (!isVisible) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !tooltipRef.current?.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible((v) => !v);
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => { if (!isMobile) setIsVisible(true); }}
        onMouseLeave={() => { if (!isMobile) setIsVisible(false); }}
        onFocus={() => { if (!isMobile) setIsVisible(true); }}
        onBlur={() => { if (!isMobile) setIsVisible(false); }}
        onClick={handleClick}
        className="cursor-help inline-flex items-center justify-center"
        role="button"
        tabIndex={0}
        aria-describedby={isVisible ? "tooltip-content" : undefined}
      >
        {children || (
          <div className="w-5 h-5 rounded-full bg-yellow-20/20 border border-yellow-20/50 text-yellow-20 text-xs flex items-center justify-center hover:bg-yellow-20/30 transition-colors mb-2">
            ?
          </div>
        )}
      </div>

      {isVisible && mounted && createPortal(
        <>
          {isMobile && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsVisible(false)}
            />
          )}
          <div
            ref={tooltipRef}
            id="tooltip-content"
            role="tooltip"
            className={`
              fixed z-50
              px-3 py-2
              bg-black-500/95 backdrop-blur-sm
              border border-yellow-20/30
              rounded-lg
              text-white-300 text-sm
              shadow-xl
              ${isMobile
                ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-xs"
                : "max-w-xs pointer-events-none"
              }
              ${className}
            `}
            style={!isMobile ? { top: `${coords.top}px`, left: `${coords.left}px` } : {}}
          >
            {message}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
