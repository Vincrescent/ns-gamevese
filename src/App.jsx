import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import GameDetailPage from './pages/GameDetailPage'
import WishlistPage from './pages/WishlistPage'

function AppContent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`${isDark ? 'bg-dark-950 text-white' : 'bg-slate-50 text-gray-900'} min-h-screen flex flex-col transition-colors duration-300`}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/game/:slug" element={<GameDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          {/* 404 */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
              <div className="text-8xl font-display font-black opacity-20 mb-4">404</div>
              <h2 className={`font-display font-bold text-2xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Page not found</h2>
              <a href="/" className="btn-primary mt-6 text-sm">Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </ThemeProvider>
  )
}
