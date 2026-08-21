import { useState, useEffect } from 'react';
import { storageService } from '../services';

/**
 * Hook for theme management
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState(() => storageService.getTheme());

  useEffect(() => {
    storageService.setTheme(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, setTheme: setThemeState };
};
