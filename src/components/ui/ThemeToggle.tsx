
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className="rounded-full p-2 transition-colors hover:bg-emerald-700 focus:outline-none"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-white transition-transform duration-300 ease-in-out hover:rotate-12" />
      ) : (
        <Sun className="h-5 w-5 text-white transition-transform duration-300 ease-in-out hover:rotate-12" />
      )}
    </button>
  );
};
