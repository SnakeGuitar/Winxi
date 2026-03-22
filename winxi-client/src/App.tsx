import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './features/auth/context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <main>
          <Home />
        </main>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
