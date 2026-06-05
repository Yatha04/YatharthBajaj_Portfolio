import React, { createContext, useContext, useEffect, useState } from 'react';

interface RippleOrigin {
  x: number;
  y: number;
}

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: (origin: RippleOrigin) => void;
  rippleOrigin: RippleOrigin | null;
  pendingIsDark: boolean | null;
  commitTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: React.ReactNode;
}

function applyThemeToDom(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [rippleOrigin, setRippleOrigin] = useState<RippleOrigin | null>(null);
  const [pendingIsDark, setPendingIsDark] = useState<boolean | null>(null);

  // Apply theme on initial mount (backup for anti-FOUT inline script)
  useEffect(() => {
    applyThemeToDom(isDarkMode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDarkMode = (origin: RippleOrigin) => {
    // Don't touch the DOM yet — just store where the ripple should originate
    // and what the incoming theme will be. commitTheme applies the real switch.
    setRippleOrigin(origin);
    setPendingIsDark(!isDarkMode);
  };

  const commitTheme = () => {
    if (pendingIsDark === null) return;
    // Apply DOM change synchronously so the page is in the new theme
    // before the ripple overlay is removed on the next render.
    applyThemeToDom(pendingIsDark);
    setIsDarkMode(pendingIsDark);
    setPendingIsDark(null);
    setRippleOrigin(null);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, rippleOrigin, pendingIsDark, commitTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
