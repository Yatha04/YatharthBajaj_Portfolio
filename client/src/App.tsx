import { DarkModeProvider } from './context/DarkModeContext'
import { Routes, Route } from 'react-router-dom'
import { Portfolio } from './components/Portfolio'
import { ExploreMore } from './components/ExploreMore'
import { Videos } from './components/Videos'

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/explore" element={<ExploreMore />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </DarkModeProvider>
  )
}

export default App