import React, {useState} from 'react'
import Bg from '../assets/bg.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user, signUp} = UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signUp(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img src={Bg} alt="" className='w-full h-full object-cover' />
        <div className='fixed bg-black/60 w-full h-full top-0 left-0'>
          <div className='py-24'>
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 text-white rounded-2xl'>
              <div className='max-w-[320px] mx-auto py-16'>
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                <form action="" onSubmit={handleSubmit} className='my-4'>
                  <input type="email" className='w-full h-[50px] bg-gray-700 px-3 rounded my-2' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" className='w-full h-[50px] bg-gray-700 px-3 rounded my-2' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} />
                  <button className='bg-red-600 text-white py-3 w-full rounded my-4'>Sign Up</button>
                  <div className='flex justify-between items-center text-gray-500 my-4'>
                    <p>
                      <input type="checkbox" />  Remember Me
                    </p>
                    <p>
                      Need help?
                    </p>
                  </div>
                  <p className="py-4 text-center">
                    Already subscribed to NetHub? <Link to='/login' className='text-red-600 font-bold'>Sign In</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp