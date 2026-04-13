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
        accent: "#2563EB",
        whatsapp: "#25D366",
        gold: "#F59E0B"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
