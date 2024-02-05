import React, { useState, useEffect } from 'react'
import requests from '../Request'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function Main() {
  const [movies, setMovies] = useState([])
  const [like, setLike] = useState(false)
  const {user} = UserAuth()
  const [saved, setSaved] = useState(false)

  const movie = movies[Math.floor(Math.random() * movies.length)]

  useEffect(() => {
    axios.get(requests.requestNowPlaying)
    .then(response => {
      setMovies(response.data.results)
    })
    .catch()
  }, [])

  const movieID = doc(db, 'users',`${user?.email}`) 
  const saveShow = async () => {
    if(user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie?.id,
          title: movie?.title,
          img: movie?.backdrop_path
        })
      })
    } else {
      alert('Please log in to save a movie')
    }
  }
  const value = `/movie-details/${movie?.id}`

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
            <button className='py-3 px-6 border text-white border-white-300 hover:bg-white hover:text-black' onClick={saveShow}>Watch Later</button>
          </div>
          <p className='text-gray-400 mb-3'>Released on {movie?.release_date}</p>
          <p className='w-full md:w-[70%] lg:w-[50%]'>{truncateString(movie?.overview, 180)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main