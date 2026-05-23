import { Link } from 'react-router-dom'
import { Gamepad2, Heart, Github } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <footer className={`mt-20 border-t ${isDark ? 'border-white/5 bg-dark-950' : 'border-gray-200 bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 size={18} className={isDark ? 'text-neon-blue' : 'text-blue-600'} />
              <span className={`font-display font-bold text-lg tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                NS <span className={isDark ? 'text-neon-blue' : 'text-blue-600'}>GameVerse</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              Your ultimate destination for discovering, tracking, and building your dream game library. Powered by RAWG API.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`font-display font-bold tracking-wider text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>NAVIGATION</h4>
            <div className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/browse', label: 'Browse Games' },
                { to: '/wishlist', label: 'My Wishlist' },
              ].map(link => (
                <Link key={link.to} to={link.to} className={`block text-sm transition-colors ${
                  isDark ? 'text-white/40 hover:text-neon-blue' : 'text-gray-500 hover:text-blue-600'
                }`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Credits */}
          <div>
            <h4 className={`font-display font-bold tracking-wider text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>CREDITS</h4>
            <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              Game data provided by{' '}
              <a href="https://rawg.io" target="_blank" rel="noopener noreferrer" className={isDark ? 'text-neon-blue hover:underline' : 'text-blue-600 hover:underline'}>
                RAWG.io
              </a>
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              Built with React + Vite + Tailwind CSS
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
          <p className={`text-xs font-mono ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
            © 2026 NS GameVerse. Built for educational purposes.
          </p>
          <p className={`text-xs flex items-center gap-1 ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
            Made with <Heart size={11} className="text-red-400 fill-red-400" /> by <span className="font-semibold">Arvigi Team</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
