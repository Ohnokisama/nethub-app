import React,  {useState} from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function Movie({item}) {
  const [like, setLike] = useState(false)
  const {user} = UserAuth()
  const [saved, setSaved] = useState(false)

  const movieID = doc(db, 'users',`${user?.email}`) 
  const saveShow = async () => {
    if(user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path
        })
      })
    } else {
      alert('Please log in to save a movie')
    }
  }
  const value = `/movie-details/${item?.id}`

  const truncateString = (str, num) => {
    if(str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img className='w-full h-full block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
      <div className='absolute top-0 left-0 w-full h-full hover: bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <Link to={value}>
          <p className='white-space-normal flex justify-center items-center h-full'>{truncateString(item?.title, 25)}</p>
        </Link>
        <p onClick={saveShow}>
          {like ? <FaHeart className='absolute top-4 left-4 text-white' /> : <FaRegHeart className='absolute top-4 left-4 text-white' />}
        </p>
      </div>
    </div>
  )
}

export default Movie