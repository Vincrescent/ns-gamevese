import { useState, useEffect, useCallback } from 'react'
import { fetchGames } from '../utils/api'

export function useGames(initialParams = {}) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [nextPage, setNextPage] = useState(null)
  const [params, setParams] = useState(initialParams)

  const loadGames = useCallback(async (fetchParams, append = false) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchGames({ page_size: 20, ...fetchParams })
      setGames(prev => append ? [...prev, ...data.results] : data.results)
      setTotalCount(data.count)
      setNextPage(data.next)
    } catch (err) {
      setError(err.message || 'Failed to fetch games')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGames(params)
  }, [params, loadGames])

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams, page: 1 }))
  }, [])

  const loadMore = useCallback(() => {
    if (!nextPage) return
    const url = new URL(nextPage)
    const page = url.searchParams.get('page')
    loadGames({ ...params, page }, true)
  }, [nextPage, params, loadGames])

  return { games, loading, error, totalCount, nextPage, updateParams, loadMore }
}

export function useFeaturedGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames({ page_size: 5, ordering: '-rating', metacritic: '80,100' })
      .then(data => setGames(data.results))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { games, loading }
}
