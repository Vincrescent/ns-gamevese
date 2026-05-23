import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Heart, Search, Menu, X, Gamepad2, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useWishlist } from '../context/WishlistContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { wishlist } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse' },
    { to: '/wishlist', label: 'Wishlist' },
  ]

  const isDark = theme === 'dark'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDark 
        ? 'bg-dark-950/90 backdrop-blur-md border-b border-neon-blue/10' 
        : 'bg-white/90 backdrop-blur-md border-b border-blue-200/60 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className={`p-1.5 rounded ${isDark ? 'bg-neon-blue/10 border border-neon-blue/30' : 'bg-blue-100 border border-blue-300'} group-hover:scale-105 transition-transform`}>
              <Gamepad2 size={20} className={isDark ? 'text-neon-blue' : 'text-blue-600'} />
            </div>
            <span className={`font-display font-bold text-xl tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
              NS <span className={isDark ? 'text-neon-blue' : 'text-blue-600'}>GameVerse</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded font-display font-semibold tracking-wider text-sm transition-all duration-200 ${
                  location.pathname === link.to
                    ? isDark ? 'text-neon-blue bg-neon-blue/10' : 'text-blue-600 bg-blue-50'
                    : isDark ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
                {link.label === 'Wishlist' && wishlist.length > 0 && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-mono ${
                    isDark ? 'bg-neon-blue/20 text-neon-blue' : 'bg-blue-100 text-blue-600'
                  }`}>{wishlist.length}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-auto hidden sm:block">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 ${
              searchFocused 
                ? isDark ? 'border-neon-blue/60 bg-dark-800 shadow-lg shadow-neon-blue/10' : 'border-blue-400 bg-white shadow-lg shadow-blue-200'
                : isDark ? 'border-white/10 bg-dark-800/60' : 'border-gray-200 bg-gray-50'
            }`}>
              <Search size={15} className={isDark ? 'text-white/40' : 'text-gray-400'} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search games..."
                className={`flex-1 bg-transparent text-sm outline-none font-body ${
                  isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10' : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
              }`}
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`relative p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-white/60 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-mono leading-none">
                  {wishlist.length > 9 ? '9+' : wishlist.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg ${isDark ? 'text-white/70' : 'text-gray-600'}`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden py-3 border-t animate-fade-in ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <form onSubmit={handleSearch} className="mb-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                isDark ? 'border-white/10 bg-dark-800/60' : 'border-gray-200 bg-gray-50'
              }`}>
                <Search size={15} className={isDark ? 'text-white/40' : 'text-gray-400'} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className={`flex-1 bg-transparent text-sm outline-none ${
                    isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </form>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg mb-1 font-display font-semibold tracking-wider text-sm ${
                  isDark ? 'text-white/80 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
                {link.label === 'Wishlist' && wishlist.length > 0 && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-mono">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
