import React, { createContext, useContext, useEffect } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
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

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Always apply dark mode
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode: true }}>
      {children}
    </DarkModeContext.Provider>
  );
};