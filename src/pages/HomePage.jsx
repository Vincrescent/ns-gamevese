import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Trophy, Clock, Star, TrendingUp } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import GameCard from '../components/GameCard'
import { SkeletonCard } from '../components/SkeletonCard'
import { useTheme } from '../context/ThemeContext'
import { fetchGames } from '../utils/api'
import { useFeaturedGames } from '../hooks/useGames'

function SectionHeader({ icon: Icon, title, linkTo, color = 'text-neon-blue', isDark }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`}>
          <Icon size={18} className={color} />
        </div>
        <h2 className={`section-title ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      </div>
      <Link
        to={linkTo}
        className={`flex items-center gap-1.5 text-sm font-display font-semibold tracking-wider transition-all ${
          isDark ? 'text-white/50 hover:text-neon-blue' : 'text-gray-400 hover:text-blue-600'
        }`}
      >
        View All <ArrowRight size={14} />
      </Link>
    </div>
  )
}

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const { games: featured, loading: featuredLoading } = useFeaturedGames()

  const [topRated, setTopRated] = useState([])
  const [topLoading, setTopLoading] = useState(true)

  const [newReleases, setNewReleases] = useState([])
  const [newLoading, setNewLoading] = useState(true)

  const [trending, setTrending] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)

  useEffect(() => {
    // Top rated
    fetchGames({ ordering: '-rating', page_size: 10, metacritic: '85,100' })
      .then(d => setTopRated(d.results))
      .finally(() => setTopLoading(false))

    // New releases
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1).toISOString().slice(0, 10)
    const today = now.toISOString().slice(0, 10)
    fetchGames({ ordering: '-released', page_size: 10, dates: `${sixMonthsAgo},${today}` })
      .then(d => setNewReleases(d.results))
      .finally(() => setNewLoading(false))

    // Trending
    fetchGames({ ordering: '-added', page_size: 10 })
      .then(d => setTrending(d.results))
      .finally(() => setTrendingLoading(false))
  }, [])

  const renderCards = (games, loading, count = 5) => {
    if (loading) {
      return Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)
    }
    return games.slice(0, count).map(game => <GameCard key={game.id} game={game} />)
  }

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-dark-950' : 'bg-slate-50'}`}>
      {/* Hero section */}
      <section className={`px-4 sm:px-6 py-8 ${isDark ? 'bg-dark-900' : 'bg-gradient-to-b from-blue-50 to-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <div className="mb-4 flex items-center gap-2">
            <span className={`h-px flex-shrink-0 w-8 ${isDark ? 'bg-neon-blue/40' : 'bg-blue-400'}`} />
            <span className={`text-xs font-mono tracking-[0.3em] font-bold ${isDark ? 'text-neon-blue/70' : 'text-blue-500'}`}>
              DISCOVER · PLAY · EXPLORE
            </span>
          </div>
          <HeroBanner games={featured} loading={featuredLoading} />
        </div>
      </section>

      {/* Stats bar */}
      <section className={`border-y ${isDark ? 'border-white/5 bg-dark-800' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-around gap-4 flex-wrap">
            {[
              { label: 'Games Available', value: '500,000+', icon: '🎮' },
              { label: 'Platforms', value: '50+', icon: '🖥️' },
              { label: 'Genres', value: '19+', icon: '🎯' },
              { label: 'Updated', value: 'Daily', icon: '🔄' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg mb-0.5">{s.icon}</div>
                <div className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                <div className={`text-xs font-mono ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Top Rated */}
        <section>
          <SectionHeader icon={Trophy} title="Top Rated Games" linkTo="/browse?ordering=-rating" color="text-yellow-400" isDark={isDark} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {renderCards(topRated, topLoading, 10)}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <SectionHeader icon={Clock} title="New Releases" linkTo="/browse?ordering=-released" color="text-green-400" isDark={isDark} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {renderCards(newReleases, newLoading, 10)}
          </div>
        </section>

        {/* Trending */}
        <section>
          <SectionHeader icon={TrendingUp} title="Trending Now" linkTo="/browse?ordering=-added" color="text-neon-blue" isDark={isDark} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {renderCards(trending, trendingLoading, 10)}
          </div>
        </section>
      </div>
    </div>
  )
}
