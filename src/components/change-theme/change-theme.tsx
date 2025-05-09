
import { AppButton } from "@/components/ui/button";
import { useThemeStore } from "@/src/core/store/theme-store";
import { Moon, Sun } from "lucide-react";

export default function ChangeTheme() {
  const { theme, toggleTheme } = useThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));
  return (
    <AppButton
      onClick={toggleTheme}
      className="bg-transparent border-none hover:!bg-transparent shadow-none p-1 w-10 h-10 flex items-center justify-center">
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </AppButton>
  );
}

