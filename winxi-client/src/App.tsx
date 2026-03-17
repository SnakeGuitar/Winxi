import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Home />
      </main>
    </ThemeProvider>
  )
}

export default App
