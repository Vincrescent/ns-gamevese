import axios from 'axios'

const API_KEY = '25f290ebbf3d4fd2b081d41b760950d0'
const BASE_URL = 'https://api.rawg.io/api'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
})

// Fetch games list with optional filters
export const fetchGames = async (params = {}) => {
  const response = await api.get('/games', { params })
  return response.data
}

// Fetch single game detail
export const fetchGameDetail = async (slug) => {
  const response = await api.get(`/games/${slug}`)
  return response.data
}

// Fetch game screenshots
export const fetchGameScreenshots = async (slug) => {
  const response = await api.get(`/games/${slug}/screenshots`)
  return response.data
}

// Fetch genres list
export const fetchGenres = async () => {
  const response = await api.get('/genres')
  return response.data
}

// Fetch platforms list
export const fetchPlatforms = async () => {
  const response = await api.get('/platforms')
  return response.data
}

export default api
