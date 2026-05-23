import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Star, Calendar, Globe, Clock, Users, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchGameDetail, fetchGameScreenshots } from '../utils/api'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import { LoadingSpinner } from '../components/SkeletonCard'

const PLATFORM_ICONS = {
  pc: '🖥️', playstation: '🎮', xbox: '🟩', nintendo: '🔴',
  ios: '📱', android: '🤖', mac: '🍎', linux: '🐧',
}
function getPlatformIcon(slug) {
  for (const [k, v] of Object.entries(PLATFORM_ICONS)) {
    if (slug?.includes(k)) return v
  }
  return '🎯'
}

function RatingBar({ label, percent, color, count }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="capitalize font-medium">{label}</span>
        <span className="font-mono opacity-60">{count}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default function GameDetailPage() {
  const { slug } = useParams()
  const { theme } = useTheme()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const isDark = theme === 'dark'

  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      fetchGameDetail(slug),
      fetchGameScreenshots(slug).catch(() => ({ results: [] }))
    ])
      .then(([gameData, ssData]) => {
        setGame(gameData)
        setScreenshots(ssData.results || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${isDark ? 'bg-dark-950' : 'bg-slate-50'}`}>
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className={`mt-4 text-sm font-mono ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Loading game data...</p>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${isDark ? 'bg-dark-950' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className="text-5xl mb-4">💔</div>
          <p className={`font-display font-bold text-2xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Game not found</p>
          <p className={`text-sm mb-6 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{error}</p>
          <Link to="/browse" className="btn-primary text-sm">Back to Browse</Link>
        </div>
      </div>
    )
  }

  const wishlisted = isWishlisted(game.id)
  const ratingColors = ['text-green-400 bg-green-400', 'text-blue-400 bg-blue-400', 'text-yellow-400 bg-yellow-400', 'text-red-400 bg-red-400']

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-dark-950' : 'bg-slate-50'}`}>
      {/* Hero backdrop */}
      <div className="relative h-[55vh] min-h-[350px] max-h-[500px] overflow-hidden">
        {game.background_image && (
          <>
            <img src={game.background_image} alt={game.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-dark-950' : 'from-slate-50'} via-transparent to-transparent`} style={{ height: '60%', top: 'auto', bottom: 0 }} />
          </>
        )}

        {/* Back button */}
        <div className="absolute top-4 left-6">
          <Link to="/browse" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-display font-semibold backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-lg transition-all">
            <ArrowLeft size={14} />
            Browse
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-24 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title block */}
            <div>
              {/* Tags */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {game.genres?.slice(0, 4).map(g => (
                  <span key={g.id} className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${
                    isDark ? 'border-neon-blue/30 text-neon-blue/80 bg-neon-blue/10' : 'border-blue-300 text-blue-600 bg-blue-50'
                  }`}>{g.name}</span>
                ))}
              </div>

              <h1 className={`font-display font-bold text-4xl sm:text-5xl tracking-wide leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {game.name}
              </h1>

              {/* Rating & meta */}
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className={i <= Math.round(game.rating) ? 'text-yellow-400 fill-yellow-400' : isDark ? 'text-white/20' : 'text-gray-200'} />
                  ))}
                  <span className={`ml-1 font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{game.rating?.toFixed(1)}</span>
                </div>
                {game.metacritic && (
                  <div className={`flex items-center gap-1.5 text-sm font-mono font-bold px-3 py-1 rounded border ${
                    game.metacritic >= 75 ? 'border-green-500/40 text-green-400 bg-green-400/10' : 'border-yellow-500/40 text-yellow-400 bg-yellow-400/10'
                  }`}>
                    Metacritic: {game.metacritic}
                  </div>
                )}
                {game.released && (
                  <div className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    <Calendar size={13} />
                    {new Date(game.released).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => toggleWishlist(game)}
                className={`flex items-center gap-2 text-sm ${
                  wishlisted
                    ? 'bg-red-500 text-white px-6 py-2.5 rounded font-display font-bold tracking-wider shadow-lg shadow-red-500/30'
                    : 'btn-ghost'
                }`}
              >
                <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              {game.website && (
                <a href={game.website} target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-2 text-sm">
                  <Globe size={14} />
                  Official Site
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Description */}
            {game.description_raw && (
              <div>
                <h2 className={`font-display font-bold text-xl tracking-wider mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>About</h2>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'} line-clamp-6`}>
                  {game.description_raw}
                </p>
              </div>
            )}

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div>
                <h2 className={`font-display font-bold text-xl tracking-wider mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Screenshots
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {screenshots.slice(0, 9).map((ss, i) => (
                    <button
                      key={ss.id}
                      onClick={() => setLightboxIdx(i)}
                      className="aspect-video rounded-lg overflow-hidden group relative"
                    >
                      <img src={ss.image} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings breakdown */}
            {game.ratings?.length > 0 && (
              <div>
                <h2 className={`font-display font-bold text-xl tracking-wider mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Player Ratings
                </h2>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200'}`}>
                  {game.ratings.map((r, i) => (
                    <RatingBar
                      key={r.id}
                      label={r.title}
                      percent={r.percent}
                      count={r.count}
                      color={[
                        'bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'
                      ][i % 4]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar info */}
          <div className="space-y-4 lg:pt-8">
            {/* Platforms */}
            <div className={`p-5 rounded-xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
              <h3 className={`font-display font-bold tracking-wider text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>PLATFORMS</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms?.map(p => (
                  <span key={p.platform.id} className={`flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-lg border ${
                    isDark ? 'border-white/10 bg-white/5 text-white/70' : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}>
                    <span>{getPlatformIcon(p.platform.slug)}</span>
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className={`p-5 rounded-xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
              <h3 className={`font-display font-bold tracking-wider text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>STATS</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Users, label: 'Ratings', value: game.ratings_count?.toLocaleString() },
                  { icon: Clock, label: 'Playtime', value: game.playtime ? `${game.playtime}h avg` : 'N/A' },
                  { icon: Star, label: 'Rating', value: game.rating?.toFixed(2) },
                ].map(s => (
                  <div key={s.label} className={`flex items-center justify-between text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <s.icon size={13} className={isDark ? 'text-white/30' : 'text-gray-400'} />
                      {s.label}
                    </div>
                    <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {game.tags?.length > 0 && (
              <div className={`p-5 rounded-xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <h3 className={`font-display font-bold tracking-wider text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>TAGS</h3>
                <div className="flex flex-wrap gap-1.5">
                  {game.tags?.slice(0, 12).map(t => (
                    <span key={t.id} className={`text-xs font-mono px-2 py-0.5 rounded ${
                      isDark ? 'bg-white/5 text-white/40 hover:text-white/70' : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                    } transition-colors`}>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Developers */}
            {game.developers?.length > 0 && (
              <div className={`p-5 rounded-xl ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <h3 className={`font-display font-bold tracking-wider text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>DEVELOPER</h3>
                <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
                  {game.developers.map(d => d.name).join(', ')}
                </p>
                {game.publishers?.length > 0 && (
                  <>
                    <h3 className={`font-display font-bold tracking-wider text-sm mt-3 mb-2 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>PUBLISHER</h3>
                    <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
                      {game.publishers.map(p => p.name).join(', ')}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + screenshots.length) % screenshots.length) }}
            className="absolute left-4 p-2 text-white/70 hover:text-white"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={screenshots[lightboxIdx]?.image}
            alt="Screenshot"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % screenshots.length) }}
            className="absolute right-4 p-2 text-white/70 hover:text-white"
          >
            <ChevronRight size={32} />
          </button>
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-sm font-mono"
            onClick={() => setLightboxIdx(null)}
          >
            {lightboxIdx + 1} / {screenshots.length} · ESC to close
          </button>
        </div>
      )}
    </div>
  )
}
