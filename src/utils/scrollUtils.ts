// utils/scrollUtils.ts
"use client";

export const handleHashOnLoad = () => {
  if (typeof window === "undefined") return;

  const hash = window.location.hash;
  if (hash) {
    const elementId = hash.replace("#", "");
    const element = document.getElementById(elementId);

    if (element) {
      setTimeout(() => {
        const offset = 80; // Altura do header fixo
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 100); // Delay para garantir que a página carregou
    }
  }
};
