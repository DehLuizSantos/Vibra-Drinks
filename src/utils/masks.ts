import { ChangeEvent } from "react";

  export const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

    if (value.length > 11) {
      value = value.slice(0, 11); // Limita a 11 dígitos
    }

    // Aplica a máscara (00) 00000-0000
    if (value.length <= 2) {
      value = value.replace(/^(\d{0,2})/, "($1");
    } else if (value.length <= 7) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    e.target.value = value;
  };

  export const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas teclas numéricas, backspace, delete, tab, enter, etc.
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "Escape",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End"
    ];

    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };