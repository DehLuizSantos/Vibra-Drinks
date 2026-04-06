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
      }
    }
  },
  plugins: []
};
