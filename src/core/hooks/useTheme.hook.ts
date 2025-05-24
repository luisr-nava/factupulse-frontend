import { useGlobalStore } from "../store";

export const useTheme = () => {
  const isDarkMode = useGlobalStore((state) => state.isDarkMode);
  const toggleTheme = useGlobalStore((state) => state.toggleTheme);
  const initializeTheme = useGlobalStore((s) => s.initializeTheme);
  const isInitialized = useGlobalStore((s) => s._isInitialized);

  return { isDarkMode, toggleTheme, initializeTheme, isInitialized };
};

