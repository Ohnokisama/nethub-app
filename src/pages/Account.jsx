import React from 'react'
import Bg from '../assets/pokemon.jpeg'
import SavedShows from '../components/SavedShows'

function Account() {
  return (
    <>
      <div className='w-full text-white h-[500px]'>
        <img className='w-full h-full object-cover' src={Bg} />
        <div className='fixed top-0 left-0 bg-black/50 z-10 w-full h-[500px]'>
          <div className='absolute top-[40%] p-4 md:p-12'>
            <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
          </div>
        </div>
      </div>
      <SavedShows />
    </>
  )
}

export default Account