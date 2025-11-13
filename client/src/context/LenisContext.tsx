import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within LenisProvider');
  }
  return context;
};

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lenisInstanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ensure DOM is ready before initializing Lenis
    if (typeof window === 'undefined') return;

    const initLenis = () => {
      // Double-check DOM is ready
      if (!document.body) {
        requestAnimationFrame(initLenis);
        return;
      }

      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisInstanceRef.current = lenisInstance;
      setLenis(lenisInstance);

      function raf(time: number) {
        lenisInstance.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    };

    // Initialize on next frame to ensure React has finished rendering
    requestAnimationFrame(initLenis);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisInstanceRef.current) {
        lenisInstanceRef.current.destroy();
        lenisInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};