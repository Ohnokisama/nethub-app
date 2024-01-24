import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Movie from './Movie'

function Row({title, fetchURL, rowID}) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get(fetchURL)
    .then(response => {
      setMovies(response.data.results)
    })
    .catch()
  }, [fetchURL])

  const slideLeft = () => {
    const slider = document.getElementById('slider' + rowID)
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    const slider = document.getElementById('slider' + rowID)
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <div className='px-6 md:px-12'>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft size={40} className='bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 left-3 cursor-pointer z-10 hidden group-hover:block' onClick={slideLeft} />
        <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {
            movies.map((item, id) => (
              <Movie item={item} key={id} />
            ))
          }
        </div>
        <MdChevronRight size={40} className='bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 right-3 cursor-pointer z-10 hidden group-hover:block' onClick={slideRight} />
      </div>
    </div>
  )
}

export default Row