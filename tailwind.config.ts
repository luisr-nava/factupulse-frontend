import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "hsl(var(--primary-50) / <alpha-value>)",
          100: "hsl(var(--primary-100) / <alpha-value>)",
          200: "hsl(var(--primary-200) / <alpha-value>)",
          300: "hsl(var(--primary-300) / <alpha-value>)",
          400: "hsl(var(--primary-400) / <alpha-value>)",
          500: "hsl(var(--primary-500) / <alpha-value>)",
          600: "hsl(var(--primary-600) / <alpha-value>)",
          700: "hsl(var(--primary-700) / <alpha-value>)",
          800: "hsl(var(--primary-800) / <alpha-value>)",
          900: "hsl(var(--primary-900) / <alpha-value>)",
          950: "hsl(var(--primary-950) / <alpha-value>)",
        },
        secondary: {
          50: "hsl(var(--secondary-50) / <alpha-value>)",
          100: "hsl(var(--secondary-100) / <alpha-value>)",
          200: "hsl(var(--secondary-200) / <alpha-value>)",
          300: "hsl(var(--secondary-300) / <alpha-value>)",
          400: "hsl(var(--secondary-400) / <alpha-value>)",
          500: "hsl(var(--secondary-500) / <alpha-value>)",
          600: "hsl(var(--secondary-600) / <alpha-value>)",
          700: "hsl(var(--secondary-700) / <alpha-value>)",
          800: "hsl(var(--secondary-800) / <alpha-value>)",
          900: "hsl(var(--secondary-900) / <alpha-value>)",
          950: "hsl(var(--secondary-950) / <alpha-value>)",
        },
        factuCyan: "#00ADB4",
      },
    },
  },
  plugins: [],
};

export default config;

