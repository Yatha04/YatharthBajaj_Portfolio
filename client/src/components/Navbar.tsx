import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Home, FileText, Briefcase, Code2, Music } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: (className?: string) => React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: (cls) => <Home className={cls} /> },
  { id: 'about', label: 'About', icon: (cls) => <FileText className={cls} /> },
  { id: 'work', label: 'Work', icon: (cls) => <Briefcase className={cls} /> },
  { id: 'projects', label: 'Projects', icon: (cls) => <Code2 className={cls} /> },
  { id: 'menu', label: 'Skills', icon: (cls) => <Music className={cls} /> },
];

export const Navbar = () => {
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
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-100">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2 p-2 bg-white/5 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 shadow-black/5">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => scrollToSection(item.id)}
            className="rounded-full h-10 px-4 flex items-center justify-center transition-all duration-200 space-x-2"
            title={item.label}
          >
            {item.icon("w-5 h-5 mr-2")}
            <span className="text-sm font-medium">{item.label}</span>
          </Button>
        ))}
      </div>

      {/* Mobile Navigation - Horizontal icon pill bar */}
      <div className="flex md:hidden items-center gap-1 p-1.5 bg-white/5 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 shadow-black/5">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => scrollToSection(item.id)}
            className="rounded-full h-10 w-10 p-0 flex items-center justify-center transition-all duration-200"
            title={item.label}
            aria-label={item.label}
          >
            {item.icon("w-[18px] h-[18px]")}
          </Button>
        ))}
      </div>
    </nav>
  );
};