/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A1628",
        brandOrange: "#F4811F",
        accent: "#F4811F",
        whatsapp: "#25D366",
        gold: "#F4811F"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
