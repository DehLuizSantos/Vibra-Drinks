/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... suas outras configurações (content, etc.)
  theme: {
    extend: {
      backgroundImage: {
        "text-gradient": "linear-gradient(180deg, #996A01 100%, #FFB001 10%)"
      },
      fontFamily: {
        display: ["var(--font-dela-gothic)", "cursive"],
        body: ["var(--font-marcellus)", "serif"],
        // Você pode adicionar outras e sobrescrever as padrão, se quiser
        sans: ["var(--font-marcellus)", "system-ui", "sans-serif"]
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
