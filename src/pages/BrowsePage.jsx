import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, LayoutGrid, List } from 'lucide-react'
import GameCard from '../components/GameCard'
import SortFilterBar from '../components/SortFilterBar'
import { SkeletonCard, LoadingSpinner } from '../components/SkeletonCard'
import { useTheme } from '../context/ThemeContext'
import { useGames } from '../hooks/useGames'

export default function BrowsePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')

  const initParams = {
    ordering: searchParams.get('ordering') || '-rating',
    search: searchParams.get('search') || undefined,
    page_size: 20,
  }

  const { games, loading, error, totalCount, nextPage, updateParams, loadMore } = useGames(initParams)
  const [filterParams, setFilterParams] = useState(initParams)
  const [viewMode, setViewMode] = useState('grid')

  const handleSearch = (e) => {
    e.preventDefault()
    const newParams = { ...filterParams, search: searchInput.trim() || undefined, page: 1 }
    setFilterParams(newParams)
    updateParams(newParams)
  }

  const handleFilterChange = (changed) => {
    const newParams = { ...filterParams, ...changed, page: 1 }
    setFilterParams(newParams)
    updateParams(newParams)
  }

  const clearSearch = () => {
    setSearchInput('')
    const newParams = { ...filterParams, search: undefined, page: 1 }
    setFilterParams(newParams)
    updateParams(newParams)
  }

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-dark-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-white/5 bg-dark-900' : 'border-gray-200 bg-white'} px-6 py-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`h-px w-6 ${isDark ? 'bg-neon-blue/40' : 'bg-blue-400'}`} />
                <span className={`text-xs font-mono tracking-[0.3em] ${isDark ? 'text-neon-blue/60' : 'text-blue-500'}`}>GAME LIBRARY</span>
              </div>
              <h1 className={`font-display font-bold text-3xl tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Browse Games
                {totalCount > 0 && (
                  <span className={`ml-3 text-lg font-mono ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                    ({totalCount.toLocaleString()})
                  </span>
                )}
              </h1>
            </div>

            {/* View Toggle */}
            <div className={`flex items-center rounded-lg overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all ${viewMode === 'grid' 
                  ? isDark ? 'bg-neon-blue/20 text-neon-blue' : 'bg-blue-50 text-blue-600'
                  : isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all ${viewMode === 'list'
                  ? isDark ? 'bg-neon-blue/20 text-neon-blue' : 'bg-blue-50 text-blue-600'
                  : isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className={`flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all ${
              isDark ? 'bg-dark-800 border-white/10 focus-within:border-neon-blue/50' : 'bg-gray-50 border-gray-200 focus-within:border-blue-400'
            }`}>
              <Search size={16} className={isDark ? 'text-white/30' : 'text-gray-400'} />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search by title, genre, developer..."
                className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-400'}`}
              />
              {searchInput && (
                <button type="button" onClick={clearSearch}>
                  <X size={14} className={isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-600'} />
                </button>
              )}
            </div>
            <button type="submit" className="btn-primary text-sm px-6">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Sort/Filter */}
        <SortFilterBar onFilterChange={handleFilterChange} currentParams={filterParams} />

        {/* Search result label */}
        {filterParams.search && (
          <div className={`mb-4 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            Showing results for: <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>"{filterParams.search}"</span>
            <button onClick={clearSearch} className="ml-2 underline text-xs">Clear</button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">⚠️</div>
            <p className={`font-display font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Failed to load games</p>
            <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{error}</p>
          </div>
        )}

        {/* Grid */}
        {!error && (
          <>
            <div className={`grid gap-4 ${
              viewMode === 'list' 
                ? 'grid-cols-1 sm:grid-cols-2' 
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}>
              {loading && games.length === 0
                ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
                : games.map(game => <GameCard key={game.id} game={game} />)
              }
            </div>

            {/* Empty state */}
            {!loading && games.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🎮</div>
                <p className={`font-display font-bold text-2xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No games found</p>
                <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Try adjusting your filters or search query</p>
              </div>
            )}

            {/* Load more */}
            {nextPage && !loading && (
              <div className="flex justify-center mt-10">
                <button onClick={loadMore} className="btn-ghost text-sm">
                  Load More Games
                </button>
              </div>
            )}

            {/* Loading indicator for load more */}
            {loading && games.length > 0 && (
              <div className="flex justify-center mt-8">
                <LoadingSpinner />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
