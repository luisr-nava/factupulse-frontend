import { create } from "zustand";
import { persist } from "zustand/middleware";

declare global {
  interface Window {
    __lastClickX?: number;
    __lastClickY?: number;
  }
}

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme: Theme) => {
        set({ theme });
        document.documentElement.classList.toggle("dark", theme === "dark");
      },
      toggleTheme: () => {
        const nextTheme = get().theme === "light" ? "dark" : "light";

        // Agregamos las coords del click al root para animar desde ahí
        const html = document.documentElement;
        const x = window.__lastClickX || window.innerWidth / 2;
        const y = window.__lastClickY || window.innerHeight / 2;

        document.body.style.setProperty("--blur-x", `${x}px`);
        document.body.style.setProperty("--blur-y", `${y}px`);
        document.body.classList.add("theme-transition");

        setTimeout(() => {
          html.classList.toggle("dark", nextTheme === "dark");
          set({ theme: nextTheme });

          // Eliminamos la clase cuando termine
          setTimeout(() => {
            document.body.classList.remove("theme-transition");
          }, 400); // Match con la duración de la animación
        }, 10);
      },
      initializeTheme: () => {
        const savedTheme = get().theme;

        const isSytemDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;

        const themeToApply = savedTheme || (isSytemDark ? "dark" : "light");
        
        set({ theme: themeToApply });
      },
    }),
    {
      name: "theme",
    },
  ),
);


