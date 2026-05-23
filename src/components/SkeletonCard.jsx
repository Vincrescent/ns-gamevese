import { useTheme } from '../context/ThemeContext'

export function SkeletonCard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-dark-800 border border-white/5' : 'bg-white border border-gray-200'}`}>
      <div className={`aspect-[3/2] shimmer-bg ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`} />
      <div className="p-3.5 space-y-2.5">
        <div className={`h-3 rounded shimmer-bg ${isDark ? 'bg-dark-700' : 'bg-gray-100'} w-3/4`} />
        <div className={`h-4 rounded shimmer-bg ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`} />
        <div className={`h-4 rounded shimmer-bg ${isDark ? 'bg-dark-700' : 'bg-gray-100'} w-2/3`} />
        <div className="flex gap-1.5 pt-1">
          <div className={`h-5 w-14 rounded shimmer-bg ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`} />
          <div className={`h-5 w-16 rounded shimmer-bg ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonBanner() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div className={`w-full aspect-[21/9] max-h-[520px] rounded-2xl shimmer-bg ${isDark ? 'bg-dark-800' : 'bg-gray-200'}`} />
  )
}

export function LoadingSpinner({ size = 'md' }) {
  const sizeClass = size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-5 h-5' : 'w-8 h-8'
  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClass} border-2 border-neon-blue/20 border-t-neon-blue rounded-full animate-spin`} />
    </div>
  )
}
