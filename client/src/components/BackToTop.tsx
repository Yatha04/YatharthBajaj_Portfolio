import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handler = () => {
      const threshold = document.getElementById('home')?.offsetHeight ?? window.innerHeight
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const variants = {
    initial: { opacity: 0, y: prefersReduced ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: prefersReduced ? 0 : 10 },
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[100]"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
              'h-11 w-11 rounded-full',
              'bg-white/5 backdrop-blur-xl shadow-2xl border border-white/20',
              'hover:bg-white/10 text-white'
            )}
          >
            <ArrowUp className="size-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
