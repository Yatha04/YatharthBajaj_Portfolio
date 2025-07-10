import { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Button } from './ui/button';
import { Moon, Sun, Home, FileText, Briefcase, Code2, GraduationCap, Command } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5 mr-2" /> },
  { id: 'about', label: 'About', icon: <FileText className="w-5 h-5 mr-2" /> },
  { id: 'work', label: 'Work', icon: <Briefcase className="w-5 h-5 mr-2" /> },
  { id: 'projects', label: 'Projects', icon: <Code2 className="w-5 h-5 mr-2" /> },
  { id: 'menu', label: 'Skills', icon: <Command className="w-5 h-5 mr-2" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5 mr-2" /> },
];

export const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeSection, setActiveSection] = useState('home');
  const [isUserClicking, setIsUserClicking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section if user just clicked a button
      if (isUserClicking) return;
      
      const sections = ['home', 'about', 'work', 'projects', 'education', 'menu'];
      const scrollPosition = window.scrollY + 200;
      
      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUserClicking]);

  const scrollToSection = (sectionId: string) => {
    // Set user clicking flag to prevent scroll interference
    setIsUserClicking(true);
    
    // Immediately set the active section when button is clicked
    setActiveSection(sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Reset the flag after a delay to allow scroll detection to resume
    setTimeout(() => {
      setIsUserClicking(false);
    }, 1000);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => scrollToSection(item.id)}
            className="rounded-full h-10 px-4 flex items-center justify-center transition-all duration-200 space-x-2"
            title={item.label}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Button>
        ))}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="rounded-full h-10 w-10 p-0 flex items-center justify-center transition-all duration-200"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
          <div className="relative w-4 h-4">
            <Sun
              className={`absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out ${
                isDarkMode
                  ? 'text-yellow-500 opacity-100 rotate-0'
                  : 'text-gray-600 opacity-0 -rotate-90'
              }`}
            />
            <Moon
              className={`absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out ${
                isDarkMode
                  ? 'text-blue-400 opacity-0 rotate-90'
                  : 'text-gray-600 opacity-100 rotate-0'
              }`}
            />
          </div>
        </Button>
      </div>
    </nav>
  );
}; 