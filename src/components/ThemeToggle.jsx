import React from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-amber-400" />
      ) : (
        <Moon size={18} className="text-slate-300" />
      )}
    </button>
  );
};
