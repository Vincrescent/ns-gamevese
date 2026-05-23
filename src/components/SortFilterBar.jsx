import { useState } from 'react'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const SORT_OPTIONS = [
  { value: '-rating', label: 'Highest Rated' },
  { value: '-added', label: 'Most Popular' },
  { value: '-released', label: 'Newest First' },
  { value: 'released', label: 'Oldest First' },
  { value: '-metacritic', label: 'Metacritic Score' },
  { value: 'name', label: 'Name A-Z' },
  { value: '-name', label: 'Name Z-A' },
]

const GENRE_OPTIONS = [
  { value: '', label: 'All Genres' },
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'role-playing-games-rpg', label: 'RPG' },
  { value: 'shooter', label: 'Shooter' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'simulation', label: 'Simulation' },
  { value: 'sports', label: 'Sports' },
  { value: 'racing', label: 'Racing' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'indie', label: 'Indie' },
]

const PLATFORM_OPTIONS = [
  { value: '', label: 'All Platforms' },
  { value: '4', label: 'PC' },
  { value: '187', label: 'PlayStation 5' },
  { value: '18', label: 'PlayStation 4' },
  { value: '1', label: 'Xbox One' },
  { value: '7', label: 'Nintendo Switch' },
]

export default function SortFilterBar({ onFilterChange, currentParams = {} }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [open, setOpen] = useState(false)

  const activeFiltersCount = [
    currentParams.genres,
    currentParams.platforms,
    currentParams.dates,
  ].filter(Boolean).length

  const handleChange = (key, value) => {
    onFilterChange({ [key]: value || undefined })
  }

  const clearAll = () => {
    onFilterChange({ genres: undefined, platforms: undefined, dates: undefined, ordering: '-rating' })
  }

  return (
    <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Sort by */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <span className={`text-xs font-mono font-bold tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>SORT</span>
          <div className="relative flex-1">
            <select
              value={currentParams.ordering || '-rating'}
              onChange={e => handleChange('ordering', e.target.value)}
              className={`w-full appearance-none text-sm font-body rounded-lg px-3 py-2 pr-8 outline-none transition-all cursor-pointer ${
                isDark 
                  ? 'bg-dark-700 border border-white/10 text-white hover:border-neon-blue/40 focus:border-neon-blue/60' 
                  : 'bg-gray-50 border border-gray-200 text-gray-900 hover:border-blue-300 focus:border-blue-400'
              }`}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Genre filter */}
        <div className="flex items-center gap-2 flex-1 min-w-[160px]">
          <span className={`text-xs font-mono font-bold tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>GENRE</span>
          <div className="relative flex-1">
            <select
              value={currentParams.genres || ''}
              onChange={e => handleChange('genres', e.target.value)}
              className={`w-full appearance-none text-sm font-body rounded-lg px-3 py-2 pr-8 outline-none transition-all cursor-pointer ${
                isDark 
                  ? 'bg-dark-700 border border-white/10 text-white hover:border-neon-blue/40 focus:border-neon-blue/60' 
                  : 'bg-gray-50 border border-gray-200 text-gray-900 hover:border-blue-300 focus:border-blue-400'
              }`}
            >
              {GENRE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Platform filter */}
        <div className="flex items-center gap-2 flex-1 min-w-[160px]">
          <span className={`text-xs font-mono font-bold tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>PLATFORM</span>
          <div className="relative flex-1">
            <select
              value={currentParams.platforms || ''}
              onChange={e => handleChange('platforms', e.target.value)}
              className={`w-full appearance-none text-sm font-body rounded-lg px-3 py-2 pr-8 outline-none transition-all cursor-pointer ${
                isDark 
                  ? 'bg-dark-700 border border-white/10 text-white hover:border-neon-blue/40 focus:border-neon-blue/60' 
                  : 'bg-gray-50 border border-gray-200 text-gray-900 hover:border-blue-300 focus:border-blue-400'
              }`}
            >
              {PLATFORM_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Clear filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAll}
            className={`flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg transition-all ${
              isDark ? 'text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-400/20' : 'text-red-500 bg-red-50 hover:bg-red-100 border border-red-200'
            }`}
          >
            <X size={12} />
            Clear ({activeFiltersCount})
          </button>
        )}
      </div>
    </div>
  )
}
