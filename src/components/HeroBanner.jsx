import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Play, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import { SkeletonBanner } from './SkeletonCard'

export default function HeroBanner({ games, loading }) {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    if (games.length === 0) return
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [games.length, current])

  const handlePrev = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(p => (p - 1 + games.length) % games.length)
      setTransitioning(false)
    }, 200)
  }

  const handleNext = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(p => (p + 1) % games.length)
      setTransitioning(false)
    }, 200)
  }

  if (loading) return <SkeletonBanner />
  if (!games.length) return null

  const game = games[current]
  const wishlisted = isWishlisted(game.id)

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '21/9', maxHeight: 520 }}>
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${game.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Grid noise texture */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,212,255,0.1) 40px, rgba(0,212,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,212,255,0.1) 40px, rgba(0,212,255,0.1) 41px)' }} />

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col justify-end p-8 sm:p-12 transition-all duration-500 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {/* Tags */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {game.genres?.slice(0, 3).map(g => (
            <span key={g.id} className="text-xs font-mono px-2 py-0.5 rounded-sm border border-neon-blue/40 text-neon-blue bg-neon-blue/10 backdrop-blur-sm">
              {g.name}
            </span>
          ))}
          {game.metacritic && (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm border border-green-400/40 text-green-400 bg-green-400/10">
              MC: {game.metacritic}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight mb-2 max-w-lg tracking-wide drop-shadow-lg">
          {game.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={14} className={i <= Math.round(game.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
            ))}
          </div>
          <span className="text-white/80 text-sm font-mono">{game.rating?.toFixed(1)}</span>
          <span className="text-white/40 text-xs">({game.ratings_count?.toLocaleString()} ratings)</span>
          {game.released && (
            <span className="text-white/40 text-xs ml-2">· {game.released}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to={`/game/${game.slug}`}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Info size={15} />
            View Details
          </Link>
          <button
            onClick={() => toggleWishlist(game)}
            className={`btn-ghost flex items-center gap-2 text-sm ${wishlisted ? 'border-red-500/60 text-red-400' : ''}`}
          >
            <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
            {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/60 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/60 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 flex gap-1.5">
        {games.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-neon-blue' : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
