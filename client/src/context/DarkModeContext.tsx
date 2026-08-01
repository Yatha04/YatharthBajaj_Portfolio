import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

interface RippleOrigin {
  x: number;
  y: number;
}

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: (origin: RippleOrigin) => void;
}

// The View Transitions API is not in every browser's lib types yet, and we
// feature-detect it at runtime anyway. This narrows the shape we rely on.
type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

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

// Largest distance from the origin to any viewport corner — the radius the
// circle must reach to fully cover the screen.
function coverRadius(x: number, y: number) {
  return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
}

// Everything is expressed as a percentage of the pseudo-element's own box
// rather than in px. The snapshot is not always laid out in CSS pixels — on a
// HiDPI screen it can be sized in device pixels, which drags a px-based centre
// to half its intended position (a bottom-right button ripples from the middle
// left). Percentages resolve against whatever box the browser used, so the
// circle stays pinned to the button either way.
function circleAt(origin: RippleOrigin, radius: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // A percentage <shape-radius> resolves against sqrt(w² + h²) / sqrt(2).
  const reference = Math.hypot(w, h) / Math.SQRT2;
  const pct = (n: number) => `${n * 100}%`;
  return `circle(${pct(radius / reference)} at ${pct(origin.x / w)} ${pct(origin.y / h)})`;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  // Apply theme on initial mount (backup for anti-FOUT inline script)
  useEffect(() => {
    applyThemeToDom(isDarkMode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDarkMode = (origin: RippleOrigin) => {
    const nextIsDark = !isDarkMode;
    const doc = document as ViewTransitionDocument;

    const swap = () => {
      // flushSync forces React to commit synchronously inside the transition
      // callback so the snapshot the browser captures is already the new theme
      // (icon, canvas colors, and the .dark class all settled).
      flushSync(() => {
        applyThemeToDom(nextIsDark);
        setIsDarkMode(nextIsDark);
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No View Transitions support (or the user opted out of motion): swap instantly.
    if (!doc.startViewTransition || prefersReducedMotion) {
      swap();
      return;
    }

    // Going dark, the OLD (light) snapshot must sit above the new dark page so
    // its shrink toward the button is what's visible. The CSS keys off this
    // class. Set/clear it deterministically so rapid alternating toggles never
    // leave a stale override stacking the snapshots the wrong way.
    const root = document.documentElement;
    root.classList.toggle('vt-to-dark', nextIsDark);

    const transition = doc.startViewTransition(swap);

    transition.ready.then(() => {
      const atOrigin = circleAt(origin, 0);
      const covering = circleAt(origin, coverRadius(origin.x, origin.y));

      if (nextIsDark) {
        // Collapse: the outgoing light snapshot shrinks from full screen back
        // into the button, revealing the dark page from the edges inward.
        root.animate(
          { clipPath: [covering, atOrigin] },
          { duration: 750, easing: 'ease-in-out', pseudoElement: '::view-transition-old(root)' },
        );
      } else {
        // Expand: the incoming light snapshot grows from the button outward.
        root.animate(
          { clipPath: [atOrigin, covering] },
          { duration: 750, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' },
        );
      }
    });

    transition.finished.finally(() => {
      root.classList.remove('vt-to-dark');
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
