/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/antd/**/*.js",
    "./node_modules/@ant-design/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00ADB4",
          50: "#E6F7F8",
          100: "#B3E8EB",
          200: "#80D9DE",
          300: "#4DCAD1",
          400: "#26BEC6",
          500: "#00ADB4",
          600: "#008C92",
          700: "#006B70",
          800: "#004A4E",
          900: "#00292C",
        },
        // Elimina la paleta 'dark' para usar los colores predeterminados
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),

    require("tailwindcss-autofill"),
  ],
  corePlugins: {
    preflight: false, // Desactiva los estilos base de Tailwind para evitar conflictos con Ant Design
  },
};

