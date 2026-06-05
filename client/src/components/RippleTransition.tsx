import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

// Hardcoded background values matching the CSS variables so the ripple
// shows the incoming theme's color while the page still shows the old one.
const DARK_BG = 'oklch(0.145 0 0)';
const LIGHT_BG = 'oklch(0.97 0 0)';

export const RippleTransition = () => {
  const { rippleOrigin, pendingIsDark, commitTheme } = useDarkMode();

  return (
    <AnimatePresence>
      {rippleOrigin && pendingIsDark !== null && (
        <motion.div
          key={`${rippleOrigin.x}-${rippleOrigin.y}`}
          initial={{ clipPath: `circle(0px at ${rippleOrigin.x}px ${rippleOrigin.y}px)` }}
          animate={{ clipPath: `circle(200vmax at ${rippleOrigin.x}px ${rippleOrigin.y}px)` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={commitTheme}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            backgroundColor: pendingIsDark ? DARK_BG : LIGHT_BG,
          }}
        />
      )}
    </AnimatePresence>
  );
};
