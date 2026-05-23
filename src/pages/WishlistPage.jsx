import { Link } from 'react-router-dom'
import { Heart, Trash2, ArrowRight, BookmarkX } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import GameCard from '../components/GameCard'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-dark-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`border-b px-6 py-8 ${isDark ? 'border-white/5 bg-dark-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className={`h-px w-6 ${isDark ? 'bg-red-400/40' : 'bg-red-400'}`} />
            <span className={`text-xs font-mono tracking-[0.3em] ${isDark ? 'text-red-400/60' : 'text-red-400'}`}>MY COLLECTION</span>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Heart size={28} className="text-red-400 fill-red-400" />
              <h1 className={`font-display font-bold text-3xl tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
                My Wishlist
                <span className={`ml-3 text-xl font-mono ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                  ({wishlist.length})
                </span>
              </h1>
            </div>
            {wishlist.length > 0 && (
              <Link to="/browse" className="btn-ghost text-sm flex items-center gap-2">
                Find More Games <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {wishlist.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className={`p-8 rounded-full mb-6 ${isDark ? 'bg-dark-800' : 'bg-gray-100'}`}>
              <BookmarkX size={48} className={isDark ? 'text-white/20' : 'text-gray-300'} />
            </div>
            <h2 className={`font-display font-bold text-2xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your wishlist is empty
            </h2>
            <p className={`text-sm mb-8 max-w-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              Browse games and click the heart icon to save them to your wishlist.
            </p>
            <Link to="/browse" className="btn-primary flex items-center gap-2">
              Browse Games <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist summary */}
            <div className={`mb-6 p-4 rounded-xl border flex items-center gap-4 flex-wrap ${
              isDark ? 'bg-dark-800/50 border-red-500/10' : 'bg-red-50 border-red-100'
            }`}>
              <Heart size={18} className="text-red-400 fill-red-400 flex-shrink-0" />
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                You have <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{wishlist.length} game{wishlist.length !== 1 ? 's' : ''}</span> saved to your wishlist.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {wishlist.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Clear all */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => {
                  if (confirm('Remove all games from wishlist?')) {
                    wishlist.forEach(g => removeFromWishlist(g.id))
                  }
                }}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all ${
                  isDark ? 'text-red-400/60 hover:text-red-400 hover:bg-red-400/10 border border-red-400/10 hover:border-red-400/30' : 'text-red-400 hover:bg-red-50 border border-red-200 hover:border-red-300'
                }`}
              >
                <Trash2 size={14} />
                Clear Wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
