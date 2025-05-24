export interface ThemeEntityGlobal {
  isDarkMode: boolean;
  _isInitialized: boolean;
  initializeTheme: () => void;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
}
