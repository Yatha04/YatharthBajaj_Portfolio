import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useDarkMode } from '../context/DarkModeContext';

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleDarkMode({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full h-10 w-10 p-0 flex items-center justify-center transition-all duration-200"
    >
      {isDarkMode ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </Button>
  );
};
