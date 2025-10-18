import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDarkMode: true, // Default: dark mode

      toggleTheme: () =>
        set(state => {
          const newIsDark = !state.isDarkMode;
          // Aplica a classe no documento
          if (newIsDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newIsDark };
        }),

      setTheme: (isDark: boolean) =>
        set(() => {
          // Aplica a classe no documento
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: isDark };
        }),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => state => {
        // Aplica o tema salvo ao carregar
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    },
  ),
);
