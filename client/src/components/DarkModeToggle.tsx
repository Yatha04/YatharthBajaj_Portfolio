import { useDarkMode } from '../context/DarkModeContext';
import { Moon, Sun } from 'lucide-react';

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700 hover:scale-110"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
            isDarkMode 
              ? 'text-yellow-500 opacity-100 rotate-0' 
              : 'text-gray-600 opacity-0 -rotate-90'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
            isDarkMode 
              ? 'text-blue-400 opacity-0 rotate-90' 
              : 'text-gray-600 opacity-100 rotate-0'
          }`}
        />
      </div>
    </button>
  );
}; 