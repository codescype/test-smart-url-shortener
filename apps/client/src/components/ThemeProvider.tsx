'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }

        set({ theme });
      },
    }),
    {
      name: 'theme-storage', // Key for localStorage
    }
  )
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  // Apply the theme on initial load
  if (typeof window !== 'undefined') {
    setTheme(theme);
  }

  return <>{children}</>;
}

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    </div>
  );
}
