import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import MovieDetails from './pages/MovieDetails'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path='movie-details/:id' element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
