import { DarkModeProvider } from './context/DarkModeContext'
import { LenisProvider } from './context/LenisContext'
import { Routes, Route } from 'react-router-dom'
import { Portfolio } from './components/Portfolio'
import { ExploreMore } from './components/ExploreMore'
import { CustomCursor } from './components/CustomCursor'

function App() {
  return (
    <LenisProvider>
      <DarkModeProvider>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/explore" element={<ExploreMore />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </DarkModeProvider>
    </LenisProvider>
  )
}

export default App