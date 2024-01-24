import React, { useState, useEffect } from 'react'
import requests from '../Request'
import axios from 'axios'

function Main() {
  const [movies, setMovies] = useState([])

  const movie = movies[Math.floor(Math.random() * movies.length)]

  useEffect(() => {
    axios.get(requests.requestNowPlaying)
    .then(response => {
      setMovies(response.data.results)
    })
    .catch()
  }, [])
  // console.log(movie);

  const truncateString = (str, num) => {
    if(str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  return (
    <div className='w-full h-[80vh] text-white'>
      <div className="w-full h-full relative">
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-black"></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        <div className='absolute top-[35%] w-full px-6 md:px-12'>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{movie?.title}</h2>
          <div className='my-4'>
            <button className='py-3 px-6 bg-white border mr-3 border-white-300 text-black hover:bg-gray-800 hover:border-gray-800 hover:text-white'>Play</button>
            <button className='py-3 px-6 border text-white border-white-300 hover:bg-white hover:text-black'>Watch Later</button>
          </div>
          <p className='text-gray-400 mb-3'>Released on {movie?.release_date}</p>
          <p className='w-full md:w-[70%] lg:w-[50%]'>{truncateString(movie?.overview, 180)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main