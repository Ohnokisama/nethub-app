import React, {useState, useEffect} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md' 
import { AiOutlineClose } from 'react-icons/ai' 
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'

function SavedShows() {
  const {user} = UserAuth()
  const [movies, setMovies] = useState([])

  const slideLeft = () => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows)
    })
  }, [user?.email])
 
  const movieRef = doc(db, 'users',  `${user?.email}`)
  
  const deleteShow = async(passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID)
      await updateDoc(movieRef, {
        savedShows: result
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='px-6 md:px-12'>
        <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
        <div className="relative flex items-center group">
          <MdChevronLeft size={40} className='bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 left-3 cursor-pointer z-10 hidden group-hover:block' onClick={slideLeft} />
          <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
            {
              movies.map((item, id) => (
                <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' key={id}>
                  <img className='w-full h-full block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                  <div className='absolute top-0 left-0 w-full h-full hover: bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <p className='white-space-normal flex justify-center items-center h-full'>{item?.title}</p>
                    <p className='absolute top-4 right-4 text-white' onClick={() => deleteShow(item.id)}><AiOutlineClose/></p>
                  </div>
                </div>
              ))
            }
          </div>
          <MdChevronRight size={40} className='bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 right-3 cursor-pointer z-10 hidden group-hover:block' onClick={slideRight} />
        </div>
      </div>
    </>
  )
}

export default SavedShows