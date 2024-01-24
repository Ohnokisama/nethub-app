const apiKey = 'c628747f6087826308d87f326bdaaab1'
const accountId = 20941046

const requests = {
  requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?language=en&page=1&api_key=${apiKey}`,
  requestPopular: `https://api.themoviedb.org/3/movie/popular?language=en&page=1&api_key=${apiKey}`,
  requestRated: `https://api.themoviedb.org/3/movie/top_rated?language=en&page=1&api_key=${apiKey}`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?language=en&page=1&api_key=${apiKey}`
}

export default requests