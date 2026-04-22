import { DarkModeProvider } from './context/DarkModeContext'
import { Routes, Route } from 'react-router-dom'
import { Portfolio } from './components/Portfolio'
import { ExploreMore } from './components/ExploreMore'
import { Videos } from './components/Videos'
import { HonorsPortfolio } from './components/HonorsPortfolio'
import { Blog } from './components/Blog'
import { BlogPost } from './components/BlogPost'
import { useEffect } from 'react'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/explore" element={<ExploreMore />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/honors" element={<HonorsPortfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </DarkModeProvider>
  )
}

export default App