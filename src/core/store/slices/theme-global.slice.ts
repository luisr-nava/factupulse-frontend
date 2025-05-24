import { StateCreator } from "zustand";
import { ThemeEntityGlobal } from "../types/theme-global.entity";

const THEME_STORAGE_KEY = "theme-mode";

export const useThemeSlice: StateCreator<
  ThemeEntityGlobal,
  [["zustand/devtools", never]],
  [],
  ThemeEntityGlobal
> = (set, get) => ({
  isDarkMode: false,
  _isInitialized: false,

  initializeTheme: () => {
    // Solo ejecutar en cliente y si no está inicializado
    if (typeof window === "undefined" || get()._isInitialized) return;

    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const resolved =
      saved === "dark" ? true : saved === "light" ? false : prefersDark;

    // Aplicar cambios al DOM primero
    document.documentElement.classList.toggle("dark", resolved);
    document.documentElement.style.colorScheme = resolved ? "dark" : "light";

    // Actualizar estado sin disparar efectos adicionales
    set({
      isDarkMode: resolved,
      _isInitialized: true,
    });
  },

  toggleTheme: () => {
    const newValue = !get().isDarkMode;

    // Actualiza el DOM primero
    document.documentElement.classList.toggle("dark", newValue);
    document.documentElement.style.colorScheme = newValue ? "dark" : "light";
    localStorage.setItem("theme-mode", newValue ? "dark" : "light");

    // Luego actualiza el estado
    set({ isDarkMode: newValue });
  },

  setDarkMode: (value: boolean) => {
    set({ isDarkMode: value });
    document.documentElement.classList.toggle("dark", value);
    document.documentElement.style.colorScheme = value ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, value ? "dark" : "light");
  },
});

