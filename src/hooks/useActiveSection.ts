// hooks/useActiveSection.ts
"use client";

import { useState, useEffect } from "react";

interface UseActiveSectionProps {
  sections: string[];
  offset?: number;
}

export const useActiveSection = ({
  sections,
  offset = 100
}: UseActiveSectionProps) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(
    () => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + offset;

        // Encontra a seção atual baseada na posição do scroll
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionBottom
            ) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      };

      handleScroll(); // Executa uma vez ao montar
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    },
    [sections, offset]
  );

  return activeSection;
};
