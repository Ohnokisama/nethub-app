import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Navbar() {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  function pageScroll() {
    const apex = window.scrollY
    const navbar = document.querySelector('#navBar')

    if(apex > 90) {
      navbar.classList.add('bg-[#121212]')
    } else {
      navbar.classList.remove('bg-[#121212]')
    }
  }
  window.addEventListener('scroll', pageScroll)

  return (
    <nav id='navBar' className='flex px-6 md:px-12 py-3 z-[100] items-center justify-between fixed w-full'>
      <div className="logo">
        <Link to='/'>
          <h1 className="text-red-600 text-3xl font-bold">NetHub</h1>
        </Link> 
      </div>
      {
        user?.email ? 
        <div className='button'>
          <Link to='/account'>
            <button className='text-white py-3 px-6 mr-1 md:mr-3 rounded cursor-pointer'>Account</button>
          </Link>
          <button onClick={handleLogout} className='bg-red-600 py-3 px-6 rounded-1xl text-white rounded cursor-pointer'>Logout</button>
        </div> : 
        <div className='button'>
          <Link to='/sign-up'>
            <button className='text-white py-3 px-6 mr-1 md:mr-3 rounded cursor-pointer'>Sign Up</button>
          </Link>
          <Link to='/login'>
            <button className='bg-red-600 py-3 px-6 rounded-1xl text-white rounded cursor-pointer'>Sign In</button>
          </Link>
          
        </div> 
      }
    </nav>
  )
}

export default Navbar