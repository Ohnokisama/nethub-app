import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { FaRegClock } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

function MovieDetails() {
  const param = useParams()
  const paramId = param.id

  const [movie, setMovie] = useState([])
  const [companies, setCompanies] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${paramId}?language=en&api_key=${import.meta.env.VITE_MAIN_API_KEY}`)
    .then(response => {
      console.log(response.data);
      setMovie(response.data)
      setCompanies(response.data.production_companies)
      setGenres(response.data.genres)
    })
    .catch()
  }, [])

  return (
    <>
      <div className='w-full h-[65vh] text-white relative'>
        <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="" className='w-full h-full object-cover' />
        <div className='absolute top-0 left-0 w-full h-[65vh] bg-black/60 z-10'>
          <div className='absolute top-[30%] p-6 md:p-12'>
            <h1 className='text-3xl md:text-5xl font-bold text-white'>{movie?.title}</h1>
            <p className='italic my-2'>{movie?.tagline}</p>
            <p className="text-gray-300 my-3">Released on:- {movie?.release_date}</p>
            <div className="my-3">
              <p>Genres:-</p>
              {
                genres.map(genre => (
                  <span className='text-white mr-2' key={genre?.id}>{genre?.name}.</span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className='px-6 md:px-12 py-12 text-white'>
        <h1 className='text-3xl font-bold'>Synopsis</h1>
        <p className="my-3">
          {movie?.overview}
        </p>
        <div className='my-6'>
          <p className="font-bold">Runtime:-</p>
          <p className='flex items-center'><span className='mr-2'><FaRegClock /></span>{movie?.runtime} minutes</p>
        </div>
        <div className="my-6">
          <p className="font-bold">Produced by:-</p>
          <div className="flex flex-wrap my-4">
            {
              companies.map(company => (
                <div className='w-[40%] md:w-[15%] h-[200px] mr-6' key={company?.id}>
                  <img src={`https://image.tmdb.org/t/p/original/${company?.logo_path}`} alt={company?.name} className='w-full h-[70%] object-contain' />
                  <p className='text-center'>{company?.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetails