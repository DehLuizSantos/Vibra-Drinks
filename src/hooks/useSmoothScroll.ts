// hooks/useSmoothScroll.ts
import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export const useSmoothScroll = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToElement = useCallback(
    (elementId: string, offset: number = 80) => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        return true;
      }
      return false;
    },
    []
  );

  const handleNavigation = useCallback(
    (targetId: string, targetPath: string = "/", offset?: number) => {
      const currentPath = pathname;

      // Se já está na página correta
      if (currentPath === targetPath) {
        scrollToElement(targetId, offset);
      } else {
        // Navega para a página e depois faz o scroll
        router.push(`${targetPath}#${targetId}`);

        // Pequeno delay para garantir que a página carregou
        setTimeout(() => {
          scrollToElement(targetId, offset);
        }, 100);
      }
    },
    [pathname, router, scrollToElement]
  );

  return { handleNavigation, scrollToElement };
};
