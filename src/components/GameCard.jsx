import { Link } from 'react-router-dom'
import { Heart, Star, Gamepad2, Calendar } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'

const PLATFORM_ICONS = {
  pc: '🖥️',
  playstation: '🎮',
  xbox: '🟩',
  nintendo: '🔴',
  ios: '📱',
  android: '🤖',
  mac: '🍎',
  linux: '🐧',
}

function getPlatformIcon(slug) {
  for (const [key, icon] of Object.entries(PLATFORM_ICONS)) {
    if (slug?.includes(key)) return icon
  }
  return '🎯'
}

function MetacriticBadge({ score }) {
  if (!score) return null
  const color = score >= 75 ? 'text-green-400 border-green-400/40 bg-green-400/10'
    : score >= 50 ? 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'
    : 'text-red-400 border-red-400/40 bg-red-400/10'
  return (
    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded border ${color}`}>
      {score}
    </span>
  )
}

export default function GameCard({ game, size = 'normal' }) {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const wishlisted = isWishlisted(game.id)

  const isLarge = size === 'large'

  return (
    <div className={`group relative rounded-xl overflow-hidden game-card-hover cursor-pointer ${
      isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200 shadow-sm'
    } ${isLarge ? 'h-full' : ''}`}>
      {/* Image */}
      <Link to={`/game/${game.slug}`} className={`block relative overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
        {game.background_image ? (
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`}>
            <Gamepad2 size={40} className={isDark ? 'text-white/20' : 'text-gray-300'} />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist button */}
        <button
          onClick={e => { e.preventDefault(); toggleWishlist(game) }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-sm transition-all duration-200 z-10
            ${wishlisted 
              ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/40' 
              : 'bg-black/40 text-white/70 hover:bg-red-500/70 hover:text-white opacity-0 group-hover:opacity-100'
            }`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Metacritic */}
        {game.metacritic && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <MetacriticBadge score={game.metacritic} />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className={`p-3.5 ${isLarge ? 'p-5' : ''}`}>
        {/* Platforms */}
        <div className="flex items-center gap-1 mb-2 text-sm">
          {game.platforms?.slice(0, 4).map(p => (
            <span key={p.platform.id} title={p.platform.name} className="text-sm leading-none">
              {getPlatformIcon(p.platform.slug)}
            </span>
          ))}
          {game.platforms?.length > 4 && (
            <span className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>+{game.platforms.length - 4}</span>
          )}
        </div>

        {/* Title */}
        <Link to={`/game/${game.slug}`}>
          <h3 className={`font-display font-bold leading-tight mb-2 line-clamp-2 hover:text-neon-blue transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          } ${isLarge ? 'text-xl' : 'text-base'}`}>
            {game.name}
          </h3>
        </Link>

        {/* Meta row */}
        <div className={`flex items-center justify-between text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400" fill="currentColor" />
            <span className="font-mono">{game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
            {game.ratings_count > 0 && (
              <span className="opacity-60">({game.ratings_count.toLocaleString()})</span>
            )}
          </div>
          {game.released && (
            <div className="flex items-center gap-1">
              <Calendar size={10} />
              <span className="font-mono">{game.released.slice(0,4)}</span>
            </div>
          )}
        </div>

        {/* Genres */}
        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {game.genres.slice(0, 3).map(g => (
              <span key={g.id} className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                isDark ? 'bg-neon-blue/10 text-neon-blue/80 border border-neon-blue/15' : 'bg-blue-50 text-blue-600 border border-blue-200'
              }`}>
                {g.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
